require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8080;

// 임시 인증번호 저장소
const verificationCodes = {};

app.use(cors());
app.use(express.json());

// 정적 파일 서빙 (HTML, CSS, 이미지 등)
app.use(express.static(__dirname));

// Gemini API 연동 (사연 작사 모드)
app.post('/api/story', async (req, res) => {
    try {
        const { story } = req.body;
        if (!story) {
            return res.status(400).json({ error: "사연 내용이 없습니다." });
        }

        const systemPromptText = `당신은 대중가요 및 K-Pop 최고의 작사가입니다.
[가장 중요한 규칙]: 반드시 사용자가 입력한 '사연 내용'을 바탕으로, 사연에 등장하는 특정 단어, 핵심 상황, 감정을 가사 속에 직접적으로 100% 반영하여 작사해야 합니다! 사용자의 사연과 무관한 엉뚱한 이야기(예: 사연에 없는 이별 등)를 절대 지어내지 마세요.

대중음악 구조에 맞게 [Verse 1] -> [Chorus 1] -> [Verse 2] -> [Chorus 2] -> [Bridge] -> [Outro] 구조로 세련되게 작성하세요.
응답은 절대로 다른 설명 없이 오직 순수한 JSON 문자열로만 반환하세요.

JSON 구조:
{
  "lyrics": "(Verse 1)\\n...\\n\\n(Chorus 1)\\n...\\n\\n(Verse 2)\\n...\\n\\n(Chorus 2)\\n...\\n\\n(Bridge)\\n...\\n\\n(Outro)\\n...",
  "prompt": "사연에 어울리는 영문 작곡 프롬프트 (예: emotional indie pop, delicate piano, clear vocal)",
  "genreLabel": "어울리는 한국어 장르명 (예: 감성 인디 팝)"
}

[사연 내용]: `;

        const fullPrompt = systemPromptText + story;
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_TOKEN}`;

        console.log("-> Calling Google Gemini API...");
        const fetchResponse = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: fullPrompt }] }]
            })
        });

        const data = await fetchResponse.json();
        if (!fetchResponse.ok) {
            throw new Error(data.error?.message || "Gemini API 요청 실패");
        }

        const rawText = data.candidates[0].content.parts[0].text;
        
        // 정규식으로 순수 JSON 객체만 추출
        const jsonMatch = rawText.match(/(\{[\s\S]*\})/);
        let cleanedText = "";
        if (jsonMatch) {
            cleanedText = jsonMatch[1].trim();
        } else {
            cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        console.log("-> [SUCCESS] Gemini Analysis Complete.");
        
        // 브라우저로 JSON 그대로 응답
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.send(cleanedText);

    } catch (error) {
        console.error("-> [Gemini API Error]", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Suno v5.0 API 연동 (EvoLink 비공식 API)
app.post('/api/music', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "프롬프트가 없습니다." });
        }

        console.log("[Request Received] Starting Suno music generation...");

        const evoKey = process.env.EVOLINK_API_TOKEN;
        if (!evoKey) {
            throw new Error("EVOLINK_API_TOKEN이 서버에 설정되지 않았습니다.");
        }

        // EvoLink 비동기 생성 요청 (Suno v5-beta)
        const initResponse = await fetch("https://api.evolink.ai/v1/audios/generations", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${evoKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt, // 클라이언트에서 보낸 장르+가사 전체 텍스트
                model: "suno-v5-beta",
                custom_mode: true, // EvoLink 전용 파라미터 (커스텀 가사 모드)
                style: "k-pop, high quality, masterpiece", // EvoLink 전용 장르 태그 파라미터
                title: "GILS SOUND Original"
            })
        });

        const initData = await initResponse.json();
        if (!initResponse.ok || !initData.id) {
            throw new Error(initData.error?.message || "Suno API 생성 요청 실패");
        }

        const taskId = initData.id;
        let status = initData.status;

        console.log(" -> Generating Suno audio (takes about 60 to 120 seconds)...");
        
        let pollData = null;
        let finalAudioUrl = null;
        
        // 상태가 성공(completed/succeeded), 실패, 취소가 될 때까지 5초마다 상태 확인 (Suno는 보통 1분 이상 걸림)
        while (status !== "completed" && status !== "succeeded" && status !== "failed" && status !== "canceled" && status !== "error") {
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            const pollResponse = await fetch(`https://api.evolink.ai/v1/tasks/${taskId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${evoKey}`
                }
            });
            pollData = await pollResponse.json();
            status = pollData.status;
            
            const progress = pollData.progress || 0;
            console.log(`    Status: ${status} (Progress: ${progress}%)`);
            
            if (status === "completed" || status === "succeeded") {
                if (pollData.result_data && pollData.result_data.length > 0) {
                    // 첫 번째 생성된 곡의 MP3 주소 추출
                    finalAudioUrl = pollData.result_data[0].audio_url || pollData.result_data[0].stream_audio_url;
                }
            }
        }

        if ((status === "completed" || status === "succeeded") && finalAudioUrl) {
            console.log(" -> [SUCCESS] Audio URL:", finalAudioUrl);
            res.json({
                status: "success",
                audioUrl: finalAudioUrl
            });
        } else {
            console.log(" -> [ERROR] Generation failed on Suno AI server.");
            throw new Error("Suno AI 서버에서 음악 생성에 실패했습니다.");
        }

    } catch (error) {
        console.error("-> [Suno API Error]", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 이메일 인증코드 발송 API
app.post('/api/send-code', async (req, res) => {
    const { email } = req.body;
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        return res.status(500).json({ success: false, message: '서버에 이메일 발송 설정이 되어있지 않습니다 (.env 확인 필요)' });
    }
    try {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        // 백엔드 메모리에 저장
        verificationCodes[email] = code;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        const mailOptions = {
            from: `"GILS SOUND" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: '[GILS SOUND] 회원가입 이메일 인증번호입니다.',
            html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #D4AF37;">GILS SOUND</h2>
                    <p>안녕하세요. 프리미엄 AI 뮤직 스튜디오 GILS SOUND에 가입해 주셔서 감사합니다.</p>
                    <p>아래 인증번호를 가입 화면에 입력해 주세요.</p>
                    <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0; border-radius: 8px;">
                        ${code}
                    </div>
                    <p style="font-size: 12px; color: #888;">본 메일은 발신 전용입니다.</p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: '인증번호 발송 완료' });
    } catch (error) {
        console.error('메일 발송 오류:', error);
        res.status(500).json({ success: false, message: '이메일 발송에 실패했습니다. 이메일 주소나 서버 설정을 확인해주세요.' });
    }
});

// 이메일 인증 검증 API
app.post('/api/verify-code', (req, res) => {
    const { email, code } = req.body;
    if (verificationCodes[email] && verificationCodes[email] === code) {
        delete verificationCodes[email]; // 검증 성공 시 폐기
        res.json({ success: true, message: '인증 완료' });
    } else {
        res.json({ success: false, message: '인증번호가 일치하지 않습니다.' });
    }
});

// 404 폴백 라우팅 (모든 경로를 index로 - React/SPA 구조 확장 대비)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 GILS SOUND Node.js Server is running!`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`=========================================`);
});
