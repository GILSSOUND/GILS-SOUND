require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const fs = require('fs');

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
    planType: { type: String, default: 'none' }, // 'none', 'single', 'monthly', 'yearly'
    planEndDate: { type: Date }, // 플랜 전체 만료일
    planResetDate: { type: Date }, // 연플랜의 다음 크레딧 리셋 날짜
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

// [유틸] 유저 플랜 지연 평가 (Lazy Evaluation)
// 접속하거나 동작할 때마다 만료/리셋 여부를 검사하여 처리합니다.
async function evaluateUserPlan(user) {
    if (!user) return null;
    const now = new Date();
    let isModified = false;

    // 1. 만료 체크 (월플랜/연플랜 공통)
    if (user.planType !== 'none' && user.planEndDate && now > user.planEndDate) {
        user.planType = 'none';
        user.planEndDate = undefined;
        user.planResetDate = undefined;
        user.credits = 0; // 플랜 만료 시 남은 크레딧 전액 소멸 (이월 불가 원칙)
        isModified = true;
        console.log(`[Plan Expired] User: ${user.userId}`);
    } 
    // 2. 리셋 체크 (연플랜 전용, 아직 만료 전일 경우)
    else if (user.planType === 'yearly' && user.planResetDate && now > user.planResetDate) {
        // 현재 시간이 리셋 날짜를 여러 달 지났을 수도 있으므로, 현재 시점보다 미래가 될 때까지 30일씩 더함
        while (now > user.planResetDate && user.planResetDate < user.planEndDate) {
            user.planResetDate = new Date(user.planResetDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        }
        user.credits = 100; // 무조건 100으로 덮어쓰기 (이월 절대 불가)
        isModified = true;
        console.log(`[Plan Reset] User: ${user.userId} - 100 credits refilled. Next reset: ${user.planResetDate}`);
    }

    if (isModified) {
        await user.save();
    }
    return user;
}

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
            // 기존 유저 닉네임 업데이트 및 플랜 평가
            if (nickname && user.nickname !== nickname) {
                user.nickname = nickname;
                await user.save();
            }
            user = await evaluateUserPlan(user);
            console.log(`[DB] Existing User Synced: ${userId} (Credits: ${user.credits}, Plan: ${user.planType})`);
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

        let fetchResponse;
        let data;
        let retries = 3; // 최대 3번 시도
        let delayMs = 1500; // 1.5초 대기 후 재시도

        for (let i = 0; i < retries; i++) {
            console.log(`-> Calling Google Gemini API... (Attempt ${i + 1}/${retries})`);
            fetchResponse = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }]
                })
            });

            data = await fetchResponse.json();
            
            if (fetchResponse.ok) {
                break; // 성공 시 반복문 탈출
            }
            
            // 마지막 시도이거나, 503(과부하) 에러가 아닌 경우에는 바로 에러 던짐
            if (i === retries - 1 || fetchResponse.status !== 503) {
                throw new Error(data.error?.message || "Gemini API 요청 실패");
            }
            
            console.log(`[Gemini API] 503 Error. Retrying in ${delayMs}ms...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
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
사용자가 입력한 다음 '음악 정보(장르, 분위기 또는 작곡 프롬프트)'의 내용을 100% 반영하여, 그 주제와 분위기에 완벽하게 어울리는 한국어 가사를 창작해 주세요. 
특히 사용자가 특정 키워드, 스토리, 또는 곡의 의도를 제공했다면 그 내용이 가사 스토리에 자연스럽게 녹아들도록 랜덤 생성해 주셔야 합니다.
대중음악 구조에 맞게 [Verse 1] -> [Chorus] -> [Verse 2] -> [Chorus] -> [Bridge] -> [Outro] 형식으로 세련되게 작성하세요.
응답은 다른 설명 일절 없이 오직 "순수한 텍스트 가사 내용"만 출력하세요.

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
        if (!fetchResponse.ok) {
            let errorMsg = data.error?.message || "Gemini API 요청 실패";
            if (fetchResponse.status === 429 || errorMsg.toLowerCase().includes("quota")) {
                errorMsg = "AI 서버 무료 할당량이 일시적으로 초과되었습니다. (구글 정책상 1분당 15회 제한). 약 1분 뒤에 다시 버튼을 눌러주세요!";
            }
            throw new Error(errorMsg);
        }

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
            let user = await User.findOne({ userId });
            if (user) {
                user = await evaluateUserPlan(user);
                if (user.credits < 1) {
                    return res.status(403).json({ error: "크레딧이 부족합니다. 결제가 필요합니다." });
                }
            } else {
                return res.status(403).json({ error: "유저를 찾을 수 없습니다." });
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

        // ============================================
        // 앨범 아트(이미지) 비동기 생성 요청 (z-image-turbo)
        // ============================================
        let finalImageUrl = imageUrl || '2.한국인/여자/woman_influencer_2.png';
        const imagePrompt = `A beautiful and aesthetic album cover art, purely visual, NO TEXT, NO LETTERS, NO WORDS, NO TITLE, NO LOGOS, masterpiece, high quality, 4k. Genre or Mood: ${genreLabel || style || 'Pop'}. Theme: ${title || 'Music'}.`;
        
        const imageGenerationPromise = fetch("https://api.evolink.ai/v1/images/generations", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${evoKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "z-image-turbo",
                prompt: imagePrompt,
                n: 1,
                size: "1024x1024"
            })
        }).then(res => res.json()).then(async (initImgData) => {
            console.log(" -> [DEBUG] Image Init Response:", JSON.stringify(initImgData));
            
            // 1. 만약 비동기(Task) 방식이라면 (id 반환)
            if (initImgData.id) {
                let imgStatus = initImgData.status;
                let imgPollData = null;
                while (imgStatus !== "completed" && imgStatus !== "succeeded" && imgStatus !== "failed" && imgStatus !== "canceled" && imgStatus !== "error") {
                    await new Promise(r => setTimeout(r, 4000));
                    const pollRes = await fetch(`https://api.evolink.ai/v1/tasks/${initImgData.id}`, {
                        headers: { 'Authorization': `Bearer ${evoKey}` }
                    });
                    imgPollData = await pollRes.json();
                    imgStatus = imgPollData.status;
                }
                if ((imgStatus === "completed" || imgStatus === "succeeded") && imgPollData.result_data && imgPollData.result_data.length > 0) {
                    return imgPollData.result_data[0].url || imgPollData.result_data[0].image_url;
                }
                console.error(" -> [DEBUG] Image Polling Failed:", JSON.stringify(imgPollData));
                return null;
            } 
            // 2. 만약 동기(Sync) 방식이라면 (data.url 반환)
            else if (initImgData.data && initImgData.data.length > 0) {
                return initImgData.data[0].url;
            } 
            // 3. 에러 발생 시
            else {
                console.error(" -> [DEBUG] Image generation error response.");
                return null;
            }
        }).catch(err => {
            console.error("Image generation request error:", err);
            return null;
        });
        // ============================================

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
            
            // 이미지 생성이 다 될 때까지 기다림 (보통 음악보다 빨리 끝남)
            try {
                const imgResult = await imageGenerationPromise;
                if (typeof imgResult === 'string' && imgResult.startsWith('http')) {
                    finalImageUrl = imgResult;
                    console.log(" -> [SUCCESS] Image URL:", finalImageUrl);
                }
            } catch (e) {
                console.log(" -> [WARNING] Failed to fetch generated image:", e.message);
            }

            // [DB 연동] 크레딧 차감 및 노래 보관함 저장
            let updatedCredits = null;
            let newSongId = null;
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
                        imageUrl: finalImageUrl
                    });
                    await newSong.save();
                    newSongId = newSong._id;
                    console.log(`[DB] Song saved and credit deducted for ${userId}. Remaining credits: ${updatedCredits}`);
                }
            }

            res.json({
                status: "success",
                audioUrl: finalAudioUrl,
                imageUrl: finalImageUrl,
                remaining_credits: updatedCredits,
                trackId: newSongId
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



// ==========================================
// 💰 포트원(PortOne) 결제 검증 및 크레딧 충전 API
// ==========================================
app.post('/api/payment/verify', async (req, res) => {
    try {
        const { imp_uid, merchant_uid, planName, expectedPrice, creditsToAdd, userId, isSubscription } = req.body;
        
        // 1. 포트원 API 서버에서 엑세스 토큰(Access Token) 발급 받기
        const tokenResponse = await fetch('https://api.iamport.kr/users/getToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imp_key: process.env.PORTONE_API_KEY,
                imp_secret: process.env.PORTONE_API_SECRET
            })
        });
        
        const tokenData = await tokenResponse.json();
        if (tokenData.code !== 0) {
            console.error("포트원 토큰 발급 실패:", tokenData.message);
            return res.status(401).json({ success: false, error: "결제 서버 토큰 발급에 실패했습니다." });
        }
        
        const accessToken = tokenData.response.access_token;

        // 2. 발급받은 토큰으로 imp_uid를 이용해 실제 결제 정보 조회
        const paymentResponse = await fetch(`https://api.iamport.kr/payments/${imp_uid}`, {
            method: 'GET',
            headers: { 'Authorization': accessToken }
        });
        
        const paymentData = await paymentResponse.json();
        if (paymentData.code !== 0) {
            console.error("포트원 결제내역 조회 실패:", paymentData.message);
            return res.status(400).json({ success: false, error: "결제 내역을 찾을 수 없습니다." });
        }
        
        const paymentInfo = paymentData.response;

        // 3. 보안 검증 (클라이언트 요청 금액과 포트원 실제 결제 금액 대조)
        if (paymentInfo.amount === expectedPrice && paymentInfo.status === 'paid') {
            // 결제 금액이 일치하고 정상 결제 승인된 경우 DB 크레딧 충전 진행
            let user = await User.findOne({ userId });
            
            if (!user) {
                // 비정상 케이스이나 혹시 유저 DB가 없으면 생성
                user = new User({ userId, platform: '소셜', nickname: userId, credits: 3 });
            }
            
            // 만약 기존 플랜이 있다면 평가 후 처리
            user = await evaluateUserPlan(user);

            const now = new Date();
            if (planName === '연플랜') {
                user.planType = 'yearly';
                user.planEndDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 365일 뒤 만료
                user.planResetDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30일 뒤 리셋
                user.credits = 100; // 결제 즉시 100크레딧 (이월 안 됨)
                console.log(`[결제성공] 연플랜(1년구독권) - 유저: ${userId}, 100크레딧 지급`);
            } else if (planName === '월플랜') {
                user.planType = 'monthly';
                user.planEndDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30일 뒤 만료
                user.planResetDate = undefined;
                user.credits = 100; // 결제 즉시 100크레딧 (이월 안 됨)
                console.log(`[결제성공] 월플랜(1달이용권) - 유저: ${userId}, 100크레딧 지급`);
            } else {
                // 일반 단건 결제 (싱글 체험 팩 / 스타터 패키지)
                user.planType = 'single';
                user.planEndDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 365일 뒤 자동 소멸
                user.planResetDate = undefined;
                user.credits += creditsToAdd;
                console.log(`[결제성공] 단건결제 - 유저: ${userId}, 상품: ${planName}, 충전량: ${creditsToAdd}곡 (12개월 유효)`);
            }
            
            await user.save();
            
            res.json({ success: true, newCredits: user.credits });
        } else {
            // 위조된 결제 시도: 금액이 다르거나 paid 상태가 아님
            console.error(`[결제위조 의심] 유저: ${userId}, 요청금액: ${expectedPrice}, 실제결제: ${paymentInfo.amount}`);
            res.status(400).json({ success: false, error: "결제 금액이 위조되었거나 정상 승인되지 않았습니다." });
        }

    } catch (error) {
        console.error("결제 검증 서버 에러:", error);
        res.status(500).json({ success: false, error: "서버 오류로 인해 결제 검증에 실패했습니다." });
    }
});

// [DB] 특정 곡 정보 API (공유 페이지용)
app.get('/api/track/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ error: "곡을 찾을 수 없습니다." });
        res.json({ success: true, song });
    } catch (e) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// 동적 공유 페이지 (Open Graph 메타 태그 렌더링)
app.get('/track/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.redirect('/');
        }
        
        let html = fs.readFileSync(path.join(__dirname, 'track_template.html'), 'utf8');
        html = html.replace(/__OG_TITLE__/g, song.title || 'GILS SOUND Original');
        html = html.replace(/__OG_DESCRIPTION__/g, 'GILS SOUND에서 AI로 창작된 프리미엄 음악입니다. 지금 바로 들어보세요!');
        
        // 커버 이미지 절대 경로로 변환 (상대 경로일 경우 대비)
        let safeImageUrl = song.imageUrl || '2.한국인/여자/woman_influencer_2.png';
        if (safeImageUrl && !safeImageUrl.startsWith('http')) {
            safeImageUrl = 'https://gilssound.com/' + safeImageUrl;
        }
        html = html.replace(/__OG_IMAGE__/g, safeImageUrl);
        html = html.replace(/__OG_URL__/g, `https://gilssound.com/track/${req.params.id}`);
        html = html.replace(/__TRACK_ID__/g, req.params.id);
        
        res.send(html);
    } catch(e) {
        res.redirect('/');
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
