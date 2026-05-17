require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

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

// Replicate API 연동 (음악 생성)
app.post('/api/music', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "프롬프트가 없습니다." });
        }

        console.log("[Request Received] Starting music generation...");
        console.log(" -> Prompt:", prompt);

        // 이전 PowerShell 프록시에서 확실하게 성공했던 방식을 그대로 적용 (버전 해시 + 폴링)
        const initResponse = await fetch("https://api.replicate.com/v1/predictions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
                input: {
                    prompt: prompt,
                    model_version: "stereo-large",
                    output_format: "mp3"
                }
            })
        });

        const initData = await initResponse.json();
        if (!initResponse.ok) {
            throw new Error(initData.detail || "Replicate API 생성 요청 실패");
        }

        const statusUrl = initData.urls.get;
        let status = initData.status;

        console.log(" -> Generating audio (takes about 30 to 60 seconds)...");
        
        let pollData = null;
        // status가 'succeeded', 'failed', 'canceled'가 될 때까지 3초마다 폴링 확인
        while (status !== "succeeded" && status !== "failed" && status !== "canceled") {
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const pollResponse = await fetch(statusUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`
                }
            });
            pollData = await pollResponse.json();
            status = pollData.status;
            console.log("    Status:", status);
        }

        if (status === "succeeded") {
            console.log(" -> [SUCCESS] Audio URL:", pollData.output);
            res.json({
                status: "success",
                audioUrl: pollData.output
            });
        } else {
            console.log(" -> [ERROR] Generation failed on AI server.");
            throw new Error("AI 서버에서 음악 생성에 실패했습니다.");
        }

    } catch (error) {
        console.error("-> [Replicate API Error]", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 404 폴백 라우팅 (모든 경로를 index로 - React/SPA 구조 확장 대비)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'music_maker.html'));
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 GILS SOUND Node.js Server is running!`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`=========================================`);
});
