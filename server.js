require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Mongoose Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Mongoose Schemas
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    platform: { type: String },
    nickname: { type: String },
    credits: { type: Number, default: 3 }, // 기본 가입 축하 코인 3개
    createdAt: { type: Date, default: Date.now }
});

const songSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    genreLabel: { type: String },
    stylePrompt: { type: String },
    lyrics: { type: String },
    audioUrl: { type: String },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Song = mongoose.model('Song', songSchema);
const app = express();
const PORT = process.env.PORT || 8080;



app.use(cors());
app.use(express.json());

// 정적 파일 서빙 (HTML, CSS, 이미지 등)
app.use(express.static(__dirname));

// [DB] 로그인 및 정보 동기화 (최초 로그인 시 DB 등록, 기존 유저면 DB 정보 반환)
app.post('/api/user/sync', async (req, res) => {
    try {
        const { userId, platform, nickname } = req.body;
        if (!userId) return res.status(400).json({ error: "userId is required" });

        let user = await User.findOne({ userId });
        if (!user) {
            // 첫 가입 3크레딧 지급
            user = new User({ userId, platform, nickname, credits: 3 });
            await user.save();
            console.log(`[DB] New User Created: ${userId} (${platform})`);
        } else {
            // 기존 유저 닉네임 업데이트 (필요 시)
            if (nickname && user.nickname !== nickname) {
                user.nickname = nickname;
                await user.save();
            }
            console.log(`[DB] Existing User Synced: ${userId} (Credits: ${user.credits})`);
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error("DB Sync Error:", error);
        res.status(500).json({ error: "DB Sync Failed" });
    }
});

// [DB] 보관함 리스트 불러오기
app.get('/api/user/library', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ error: "userId is required" });

        const songs = await Song.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, songs });
    } catch (error) {
        console.error("Fetch Library Error:", error);
        res.status(500).json({ error: "Fetch Library Failed" });
    }
});

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
  "title": "사연에 어울리는 감성적이고 짧은 노래 제목 (예: 밤하늘의 별처럼)",
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

// Gemini API 연동 (일반/프로 모드 가사 자동 생성)
app.post('/api/auto-lyrics', async (req, res) => {
    try {
        const { context } = req.body;
        if (!context) return res.status(400).json({ error: "음악 정보(컨텍스트)가 없습니다." });

        const systemPromptText = `당신은 대중가요 및 K-Pop 최고의 작사가입니다.
사용자가 입력한 다음 '음악 정보(장르, 분위기 또는 프롬프트)'에 완벽하게 어울리는 감성적인 한국어 가사를 창작해주세요.
대중음악 구조에 맞게 [Verse 1] -> [Chorus] -> [Verse 2] -> [Chorus] -> [Bridge] -> [Outro] 형식으로 세련되게 작성하세요.
응답은 JSON 형태나 다른 설명은 일절 빼고 오직 "순수한 텍스트 가사 내용"만 출력하세요.

[음악 정보]: ${context}
[작사할 가사]:`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_TOKEN}`;

        const fetchResponse = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPromptText }] }]
            })
        });

        const data = await fetchResponse.json();
        if (!fetchResponse.ok) throw new Error(data.error?.message || "Gemini API 요청 실패");

        const lyrics = data.candidates[0].content.parts[0].text.trim();
        res.json({ lyrics });

    } catch (error) {
        console.error("-> [Gemini Auto-Lyrics Error]", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Suno v5.0 API 연동 (EvoLink 비공식 API)
app.post('/api/music', async (req, res) => {
    try {
        const { userId, lyrics, style, title, imageUrl, genreLabel } = req.body;
        if (!style && !lyrics) {
            return res.status(400).json({ error: "음악 생성 데이터가 없습니다." });
        }
        
        if (userId) {
            const user = await User.findOne({ userId });
            if (!user || user.credits < 1) {
                return res.status(403).json({ error: "크레딧이 부족합니다. 결제가 필요합니다." });
            }
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
                prompt: lyrics || "", // custom_mode에서는 prompt가 '가사'를 의미함
                tags: style || "k-pop, high quality", // 작곡 프롬프트(장르, 악기 등)는 tags에 넣어야 함
                style: style || "k-pop, high quality", // EvoLink 호환을 위해 style도 함께 전달
                title: title || "GILS SOUND Original",
                model: "suno-v5-beta",
                custom_mode: true
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
            
            // [DB 연동] 크레딧 차감 및 노래 보관함 저장
            let updatedCredits = null;
            if (userId) {
                const user = await User.findOne({ userId });
                if (user && user.credits >= 1) {
                    user.credits -= 1;
                    await user.save();
                    updatedCredits = user.credits;
                    
                    // 노래 데이터 저장
                    const newSong = new Song({
                        userId: userId,
                        title: title || "GILS SOUND Original",
                        genreLabel: genreLabel || style || "AI Music",
                        stylePrompt: style || "",
                        lyrics: lyrics || "",
                        audioUrl: finalAudioUrl,
                        imageUrl: imageUrl || '2.한국인/여자/woman_influencer_2.png'
                    });
                    await newSong.save();
                    console.log(`[DB] Song saved and credit deducted for ${userId}. Remaining credits: ${updatedCredits}`);
                }
            }

            res.json({
                status: "success",
                audioUrl: finalAudioUrl,
                remaining_credits: updatedCredits
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
