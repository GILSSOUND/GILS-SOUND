// translations.js
const translations = {
    ko: {
        // 공통
        "logo_title": "GILS SOUND",
        "lang_ko": "한국어",
        "lang_en": "English",
        "lang_ja": "日本語",
        "lang_zh": "中文",
        "commercial_use": "상업적 이용 100% 허용",

        // index.html (메인 랜딩)
        "main_hero_badge": "AI MUSIC STUDIO",
        "main_hero_title": "단 몇 초 만에,<br>당신의 상상이 음악이 됩니다.",
        "main_hero_subtitle": "작곡 지식이 없어도 괜찮습니다. 장르, 분위기, 그리고 짧은 사연만 입력하세요.<br>GILS SOUND의 AI가 스튜디오급 고음질 음원을 즉시 만들어드립니다.",
        "btn_signup_now": "지금 회원가입하기",
        "plan_title": "GILS SOUND 요금제 (플랜) 안내",
        "plan_single_title": "싱글 체험 팩 (단건)",
        "plan_single_price": "₩990 <span style='font-size:14px; color:#9ca3af;'>/ 1곡</span>",
        "plan_single_desc1": "1곡 생성 크레딧 충전",
        "plan_single_desc2": "가사 자동 생성 AI",
        "plan_starter_title": "스타터 패키지 (단건)",
        "plan_starter_price": "₩5,990 <span style='font-size:14px; color:#9ca3af;'>/ 10곡</span>",
        "plan_starter_desc1": "총 10곡 생성 크레딧 충전",
        "plan_pro_badge": "월플랜 (한달이용권)",
        "plan_pro_title": "프로 크리에이터 팩",
        "plan_pro_price": "₩19,900 <span style='font-size:14px; color:#9ca3af;'>/ 30일</span>",
        "plan_pro_desc1": "총 100곡 생성 크레딧 제공",
        "plan_pro_desc2": "결제일로부터 30일간 유효",
        "plan_master_badge": "연플랜 (1년구독권)",
        "plan_master_title": "VVIP 마스터 플랜",
        "plan_master_price": "₩99,000 <span style='font-size:14px; color:#9ca3af;'>/ 365일</span>",
        "plan_master_desc1": "매달 100곡 리필 (총 1,200곡)",
        "plan_master_desc2": "VVIP 초고음질 음원 제공",
        "plan_master_desc3": "최우선 생성 대기열 배정",
        "plan_master_desc4": "무제한 고음질 다운로드",
        "footer_company_info": "상호명: 길스유통 | 대표자: 손길동 | 사업자등록번호: 293-45-01112<br>통신판매업신고번호: 제2025-부산북구-0059호<br>사업장소재지: 부산광역시 북구 팽성로127번길 5 1층<br>연락처: 010-9929-4199 | 이메일: sgd41990@gmail.com",
        "footer_terms": "이용약관 (환불정책 포함)",
        "footer_privacy": "개인정보처리방침",
        "footer_notice1": "* GILS SOUND에서 생성된 저작물 및 판매하는 모든 상품은 GILS SOUND에서 책임지고 있습니다.",
        "footer_notice2": "* 민원 담당자: 손길동 / 연락처: 010-9929-4199",
        "footer_copyright": "© 2026 GILS SOUND. All rights reserved.",

        // login.html
        "login_subtitle": "프리미엄 AI 뮤직 스튜디오<br>단 1초 만에 로그인하세요.",
        "login_kakao": "카카오 계정으로 시작하기",
        "login_naver": "네이버 계정으로 시작하기",
        "login_google": "구글 계정으로 시작하기",

        // music_maker.html
        "top_notice": "📢 상업적 이용 및 공지사항",
        "btn_logout": "🚪 로그아웃",
        "credit_left": "잔여 크레딧:",
        "btn_mypage": "👤 마이페이지",
        "btn_library": "🎵 내 보관함",
        "btn_store": "👑 GILS 스토어",
        "sidebar_title": "🎶 실시간 작업 리스트",
        "sidebar_subtitle": "내가 만든 음악 모아보기",
        "sidebar_empty": "아직 창작된 곡이 없습니다.<br>나만의 첫 음악을 완성해 보세요!",
        "library_empty": "아직 창작된 곡이 없습니다. 나만의 첫 음악을 완성해 보세요!",
        "studio_subtitle": "프리미엄 AI 뮤직 스튜디오",
        "tab_story": "📖 사연 스토리 작사 (Story)",
        "tab_easy": "✨ 간편 생성 (Easy)",
        "tab_pro": "🎛️ 전문가 (Pro)",
        "step1_genre": "곡의 무드를 선택하세요",
        "step1_pro": "세부 작곡 프롬프트(명령어) 직접 입력",
        "step1_story": "본인의 사연(스토리)을 편하게 들려주세요",
        "step2_lyrics": "가사를 입력하세요",
        "step3_mood": "곡의 세부 감성을 선택하세요",
        "step4_title": "곡의 제목을 정해주세요",
        "step5_gender": "보컬 성별을 선택하세요",
        "btn_create": "작품 완성하기 (Create)",
        "btn_create_next": "✍️ AI 가사 초안 생성 및 확인 (Next)",
        "gemini_active": "✨ 통합 백엔드 AI (Gemini 연동 가동 중)",
        "placeholder_pro": "원하시는 음악 장르, 악기 구성, 분위기, 보컬 스타일 등을 영어 또는 한글로 자유롭게 적어주세요.\n예) 120 BPM synthwave, heavy synth bass, ethereal female vocal, futuristic pop",
        "tip_pro": "💡 팁: 세부 악기와 무드를 쉼표(,)로 나열할수록 더욱 풍성하고 독창적인 사운드가 완성됩니다.",
        "placeholder_story": "오늘 있었던 일, 누군가에게 전하고 싶은 마음, 잊지 못할 추억 등 어떤 이야기든 편하게 입력하세요.\nGILS SOUND만의 독창성과 창작성으로 트렌디하고 감동적인 가사가 창작됩니다",
        "draft_title": "📜 AI 작사 초안 확인",
        "analyzing": "분석 중",
        "btn_remake_lyrics": "🔄 가사 다시 만들기",
        "tip_story": "💡 서버 과부하 시 오류가 날 수도 있어요. 잠시 후 다시 시도해 주시면 정상적으로 작동합니다.",
        "btn_auto_lyrics_top": "✨ AI 가사 자동 생성",
        "placeholder_lyrics": "아름다운 노랫말을 적어주세요.\n우측 상단의 'AI 가사 자동 생성' 버튼을 누르시면, 선택하신 장르나 프롬프트에 딱 맞는 가사를 제미나이가 자동으로 써드립니다!",
        "placeholder_title": "나만의 특별한 제목",
        "gen_time_notice": "(노래 생성에는 약 1~2분 정도 소요됩니다)",

        // 모달 (마이페이지, 스토어, 결제, 보관함)
        "mypage_subtitle": "내 계정 정보 및 결제 내역",
        "mypage_guest": "게스트 님",
        "mypage_join_date": "가입일: -",
        "mypage_current_plan": "현재 요금제",
        "mypage_credits_left": "잔여 크레딧",
        "mypage_songs_created": "생성한 곡 수",
        "btn_logout_mypage": "로그아웃",
        "plan_basic": "기본 플랜",
        "store_subtitle": "합리적인 종량제 및 맞춤형 크레딧 충전으로 나만의 AI 스튜디오를 누리세요.",
        "plan_single_desc_sub": "가볍게 한 곡 만들기",
        "plan_common_hq": "초고음질 MP3 파일 다운로드",
        "btn_pay": "결제하기",
        "plan_starter_desc_sub": "기존가 ₩9,900 → 40% 특별 할인",
        "plan_common_fast": "우선 생성 대기열 고속 처리",
        "btn_pay_recharge": "충전 결제하기",
        "plan_pro_desc_sub": "대용량 크리에이터 맞춤형",
        "btn_pay_monthly": "월플랜 시작하기",
        "plan_master_desc_sub": "최고의 선택, 프리미엄 혜택",
        "btn_pay_yearly": "연플랜 혜택받기",
        "payment_method_title": "결제 수단 선택",
        "payment_card": "💳 신용카드 / 체크카드",
        "payment_notice1": "* PG사(KG이니시스) 충전업종 규정에 따라 신용/체크카드 결제만 지원합니다. (간편/휴대폰 결제 불가)",
        "payment_notice2": "안전한 전자결제를 위해 KG이니시스(PortOne) 시스템을 사용합니다.",
        "library_modal_title": "🎵 내 보관함 (My Library)",
        "library_modal_subtitle": "내가 창작한 소중한 AI 음악 목록입니다. 언제든 다시 듣고 확인하세요.",

        // 보관함 옵션
        "menu_options": "··· 옵션",
        "menu_download": "다운로드",
        "menu_share": "공유하기",
        "menu_prompt": "상세 프롬프트 보기",
        "menu_delete": "삭제",

        // 단위 및 기타 텍스트
        "unit_songs": "곡",
        "unlimited": "∞ 무제한",

        // 보컬 성별
        "gender_female": "👩 여성 보컬",
        "gender_male": "👨 남성 보컬",
        "gender_duet": "👫 남녀 듀엣",
        "gender_none": "🚫 보컬 없음 (연주곡)",
        "pro_genre_label": "직접 입력 아트 팝",
        "inst_suffix": " (연주곡)",

        // 장르 및 분위기 (Mood) 번역
        "genre_ballad": "발라드",
        "genre_acoustic": "어쿠스틱",
        "genre_hiphop": "힙합",
        "genre_indiepop": "인디 팝",
        "genre_dancepop": "댄스 팝",
        "genre_rnb": "R&B",
        "genre_modernrock": "모던 록",
        "genre_lofi": "로파이",
        "genre_jazz": "재즈",
        "genre_cinematic": "시네마틱",
        "btn_more_genres": "👇 더 많은 장르 보기 (텍스트 전용)",
        "btn_close_genres": "👆 더보기 숨기기",
        "more_genres_desc": "원하시는 장르 텍스트를 클릭하시면 선택됩니다.",
        "genre_text_kpop": "K-Pop 아이돌",
        "genre_text_trot": "트로트",
        "genre_text_edm": "EDM / 일렉트로닉",
        "genre_text_retro": "레트로 시티팝",
        "genre_text_folk": "어쿠스틱 포크",
        "genre_text_punk": "펑크 록",
        "genre_text_alt": "얼터너티브 록",
        "genre_text_blues": "블루스",
        "genre_text_bossa": "보사노바",
        "genre_text_reggae": "레게",
        "genre_text_latin": "라틴 팝",
        "genre_text_orchestra": "오케스트라",
        "genre_text_newage": "뉴에이지 피아노",
        "genre_text_cyberpunk": "사이버펑크",
        "genre_text_musical": "뮤지컬 넘버",
        "genre_text_metal": "헤비 메탈",
        "genre_text_disco": "디스코",
        "genre_text_gospel": "가스펠 / CCM",
        "genre_text_gugak": "국악 퓨전",
        "genre_text_children": "동요",
        "genre_text_ambient": "앰비언트",
        "genre_text_rocknroll": "로큰롤",
        "genre_text_trap": "트랩 힙합",
        "genre_text_boombap": "붐뱁 힙합",
        "genre_text_futurebass": "퓨처 베이스",
        "genre_text_house": "하우스",
        "genre_text_techno": "테크노",
        
        "mood_happy": "😄 신나는",
        "mood_sad": "😢 슬픈",
        "mood_angry": "😡 화나는",
        "mood_emotional": "🥺 감성적인",
        "mood_dreamy": "🌌 몽환적인",
        "mood_peaceful": "😌 평온한",
        "mood_hopeful": "🌟 희망찬",
        "mood_intense": "🔥 강렬한",
        "mood_tense": "😬 긴장감 있는",
        "mood_depressed": "🌧️ 우울한",
        "mood_romantic": "💕 로맨틱한",
        "mood_refreshing": "🌊 시원한",
        "mood_dark": "🌑 어두운"
    },
    en: {
        // Common
        "logo_title": "GILS SOUND",
        "lang_ko": "한국어",
        "lang_en": "English",
        "lang_ja": "日本語",
        "lang_zh": "中文",
        "commercial_use": "100% Commercial Use Allowed",

        // index.html
        "main_hero_badge": "AI MUSIC STUDIO",
        "main_hero_title": "In just a few seconds,<br>your imagination becomes music.",
        "main_hero_subtitle": "No composition skills required. Just enter a genre, mood, and a short story.<br>GILS SOUND's AI will instantly generate studio-quality audio.",
        "btn_signup_now": "Sign Up Now",
        "plan_title": "GILS SOUND Pricing Plans",
        "plan_single_title": "Single Trial Pack",
        "plan_single_price": "₩990 <span style='font-size:14px; color:#9ca3af;'>/ 1 song</span>",
        "plan_single_desc1": "Charge 1 generation credit",
        "plan_single_desc2": "Auto Lyrics AI",
        "plan_starter_title": "Starter Package",
        "plan_starter_price": "₩5,990 <span style='font-size:14px; color:#9ca3af;'>/ 10 songs</span>",
        "plan_starter_desc1": "Charge 10 generation credits",
        "plan_pro_badge": "Monthly Plan",
        "plan_pro_title": "Pro Creator Pack",
        "plan_pro_price": "₩19,900 <span style='font-size:14px; color:#9ca3af;'>/ 30 days</span>",
        "plan_pro_desc1": "Provides 100 credits/mo",
        "plan_pro_desc2": "Valid for 30 days from payment",
        "plan_master_badge": "Yearly Plan",
        "plan_master_title": "VVIP Master Plan",
        "plan_master_price": "₩99,000 <span style='font-size:14px; color:#9ca3af;'>/ 365 days</span>",
        "plan_master_desc1": "100 credits refill monthly (total 1,200)",
        "plan_master_desc2": "VVIP ultra high-quality audio",
        "plan_master_desc3": "Top priority generation queue",
        "plan_master_desc4": "Unlimited HQ downloads",
        "footer_company_info": "Company: GILS SOUND | CEO: Son Gil-dong | Business Reg No: 293-45-01112<br>Address: 1F, 5, Paengseong-ro 127beon-gil, Buk-gu, Busan, Republic of Korea<br>Contact: 010-9929-4199 | Email: sgd41990@gmail.com",
        "footer_terms": "Terms of Service",
        "footer_privacy": "Privacy Policy",
        "footer_notice1": "* All content generated and products sold are managed by GILS SOUND.",
        "footer_notice2": "* CS Manager: Son Gil-dong / Contact: 010-9929-4199",
        "footer_copyright": "© 2026 GILS SOUND. All rights reserved.",

        // login.html
        "login_subtitle": "Premium AI Music Studio<br>Log in in just 1 second.",
        "login_kakao": "Continue with Kakao",
        "login_naver": "Continue with Naver",
        "login_google": "Continue with Google",

        // music_maker.html
        "top_notice": "📢 Commercial Use & Notices",
        "btn_logout": "🚪 Logout",
        "credit_left": "Credits Left:",
        "btn_mypage": "👤 My Page",
        "btn_library": "🎵 My Library",
        "btn_store": "👑 GILS Store",
        "sidebar_title": "🎶 Live Workspace",
        "sidebar_subtitle": "View your created music",
        "sidebar_empty": "No songs created yet.<br>Complete your first music track!",
        "library_empty": "No songs created yet. Complete your first music track!",
        "studio_subtitle": "Premium AI Music Studio",
        "tab_story": "📖 Story Lyrics (Story)",
        "tab_easy": "✨ Easy Generate (Easy)",
        "tab_pro": "🎛️ Professional (Pro)",
        "step1_genre": "Select song mood",
        "step1_pro": "Enter detailed composing prompt directly",
        "step1_story": "Tell us your story comfortably",
        "step2_lyrics": "Enter lyrics",
        "step3_mood": "Select detailed vibe",
        "step4_title": "Set your song title",
        "step5_gender": "Select vocal gender",
        "btn_create": "Create Music (Create)",
        "btn_create_next": "✍️ Generate AI Lyrics Draft (Next)",
        "gemini_active": "✨ Integrated Backend AI (Gemini Connected)",
        "placeholder_pro": "Freely describe your desired genre, instruments, mood, and vocal style in English or Korean.\nEx) 120 BPM synthwave, heavy synth bass, ethereal female vocal, futuristic pop",
        "tip_pro": "💡 Tip: Listing detailed instruments and moods with commas (,) creates richer, more unique sounds.",
        "placeholder_story": "Write about what happened today, what you want to say to someone, or unforgettable memories comfortably.\nGILS SOUND's unique creativity will craft trendy and moving lyrics.",
        "draft_title": "📜 AI Lyrics Draft Preview",
        "analyzing": "Analyzing",
        "btn_remake_lyrics": "🔄 Re-generate Lyrics",
        "tip_story": "💡 Temporary errors may occur during high server loads. Please try again after a moment.",
        "btn_auto_lyrics_top": "✨ Auto Generate AI Lyrics",
        "placeholder_lyrics": "Please write beautiful lyrics.\nClick the 'Auto Generate AI Lyrics' button on the top right, and Gemini will automatically write lyrics that perfectly match your selected genre or prompt!",
        "placeholder_title": "My special song title",
        "gen_time_notice": "(Generating the song takes about 1~2 minutes)",
        
        // Modal translations
        "mypage_subtitle": "My account info & payment history",
        "mypage_guest": "Guest",
        "mypage_join_date": "Joined: -",
        "mypage_current_plan": "Current Plan",
        "mypage_credits_left": "Credits Left",
        "mypage_songs_created": "Songs Created",
        "btn_logout_mypage": "Logout",
        "plan_basic": "Basic Plan",
        "store_subtitle": "Enjoy your own AI studio with reasonable pay-as-you-go and custom credit recharges.",
        "plan_single_desc_sub": "Lightly make one song",
        "plan_common_hq": "Ultra-high quality MP3 download",
        "btn_pay": "Pay Now",
        "plan_starter_desc_sub": "Orig. ₩9,900 → 40% Special Discount",
        "plan_common_fast": "Priority fast processing queue",
        "btn_pay_recharge": "Recharge Now",
        "plan_pro_desc_sub": "Custom for high-volume creators",
        "btn_pay_monthly": "Start Monthly Plan",
        "plan_master_desc_sub": "The Best Choice, Premium Benefits",
        "btn_pay_yearly": "Get Yearly Benefits",
        "payment_method_title": "Select Payment Method",
        "payment_card": "💳 Credit / Debit Card",
        "payment_notice1": "* Due to PG (KG Inicis) regulations, only Credit/Debit card payments are supported. (Easy/Mobile payments not allowed)",
        "payment_notice2": "We use the KG Inicis (PortOne) system for secure electronic payments.",
        "library_modal_title": "🎵 My Library",
        "library_modal_subtitle": "List of your precious created AI music. Listen and check anytime.",

        // Library Options
        "menu_options": "··· Options",
        "menu_download": "Download",
        "menu_share": "Share",
        "menu_prompt": "View detailed prompt",
        "menu_delete": "Delete",

        // Units & Other Texts
        "unit_songs": "songs",
        "unlimited": "∞ Unlimited",

        // Vocal Gender
        "gender_female": "👩 Female Vocal",
        "gender_male": "👨 Male Vocal",
        "gender_duet": "👫 Duet",
        "gender_none": "🚫 No Vocal (Inst.)",
        "pro_genre_label": "Custom Art Pop",
        "inst_suffix": " (Inst.)",

        // Genres & Moods
        "genre_ballad": "Ballad",
        "genre_acoustic": "Acoustic",
        "genre_hiphop": "Hip-hop",
        "genre_indiepop": "Indie Pop",
        "genre_dancepop": "Dance Pop",
        "genre_rnb": "R&B",
        "genre_modernrock": "Modern Rock",
        "genre_lofi": "Lo-Fi",
        "genre_jazz": "Jazz",
        "genre_cinematic": "Cinematic",
        "btn_more_genres": "👇 View more genres (Text only)",
        "btn_close_genres": "👆 Hide more genres",
        "more_genres_desc": "Click the text of the genre you want to select.",
        "genre_text_kpop": "K-Pop Idol",
        "genre_text_trot": "Trot",
        "genre_text_edm": "EDM / Electronic",
        "genre_text_retro": "Retro City Pop",
        "genre_text_folk": "Acoustic Folk",
        "genre_text_punk": "Punk Rock",
        "genre_text_alt": "Alternative Rock",
        "genre_text_blues": "Blues",
        "genre_text_bossa": "Bossa Nova",
        "genre_text_reggae": "Reggae",
        "genre_text_latin": "Latin Pop",
        "genre_text_orchestra": "Orchestra",
        "genre_text_newage": "New Age Piano",
        "genre_text_cyberpunk": "Cyberpunk",
        "genre_text_musical": "Musical Number",
        "genre_text_metal": "Heavy Metal",
        "genre_text_disco": "Disco",
        "genre_text_gospel": "Gospel / CCM",
        "genre_text_gugak": "Gugak Fusion",
        "genre_text_children": "Children's Song",
        "genre_text_ambient": "Ambient",
        "genre_text_rocknroll": "Rock 'n' Roll",
        "genre_text_trap": "Trap Hip-hop",
        "genre_text_boombap": "Boom Bap",
        "genre_text_futurebass": "Future Bass",
        "genre_text_house": "House",
        "genre_text_techno": "Techno",
        "mood_happy": "😄 Happy",
        "mood_sad": "😢 Sad",
        "mood_angry": "😡 Angry",
        "mood_emotional": "🥺 Emotional",
        "mood_dreamy": "🌌 Dreamy",
        "mood_peaceful": "😌 Peaceful",
        "mood_hopeful": "🌟 Hopeful",
        "mood_intense": "🔥 Intense",
        "mood_tense": "😬 Tense",
        "mood_depressed": "🌧️ Depressed",
        "mood_romantic": "💕 Romantic",
        "mood_refreshing": "🌊 Refreshing",
        "mood_dark": "🌑 Dark"
    },
    ja: {
        // Common
        "logo_title": "GILS SOUND",
        "lang_ko": "한국어",
        "lang_en": "English",
        "lang_ja": "日本語",
        "lang_zh": "中文",
        "commercial_use": "商用利用100%可能",

        // index.html
        "main_hero_badge": "AI MUSIC STUDIO",
        "main_hero_title": "たった数秒で、<br>あなたの想像が音楽になります。",
        "main_hero_subtitle": "作曲の知識がなくても大丈夫です。ジャンル、雰囲気、短いストーリーを入力するだけ。<br>GILS SOUNDのAIがスタジオ品質の高音質音源を即座に作成します。",
        "btn_signup_now": "今すぐ登録する",
        "plan_title": "GILS SOUND 料金プランのご案内",
        "plan_single_title": "シングルトライアルパック",
        "plan_single_price": "₩990 <span style='font-size:14px; color:#9ca3af;'>/ 1曲</span>",
        "plan_single_desc1": "1曲作成クレジットチャージ",
        "plan_single_desc2": "自動作詞AI",
        "plan_starter_title": "スターターパッケージ",
        "plan_starter_price": "₩5,990 <span style='font-size:14px; color:#9ca3af;'>/ 10曲</span>",
        "plan_starter_desc1": "10曲作成クレジットチャージ",
        "plan_pro_badge": "月額プラン",
        "plan_pro_title": "プロクリエイターパック",
        "plan_pro_price": "₩19,900 <span style='font-size:14px; color:#9ca3af;'>/ 30日</span>",
        "plan_pro_desc1": "毎月100クレジット提供",
        "plan_pro_desc2": "決済日から30日間有効",
        "plan_master_badge": "年額プラン",
        "plan_master_title": "VVIPマスタープラン",
        "plan_master_price": "₩99,000 <span style='font-size:14px; color:#9ca3af;'>/ 365日</span>",
        "plan_master_desc1": "毎月100曲リフィル (合計1,200曲)",
        "plan_master_desc2": "VVIP超高音質音源提供",
        "plan_master_desc3": "最優先作成キュー適用",
        "plan_master_desc4": "高音質ダウンロード無制限",
        "footer_company_info": "会社名: ギルス流通 | 代表者: ソン・ギルドン | 事業者登録番号: 293-45-01112<br>所在地: 釜山広域市北区ペンスン路127番道 5, 1階<br>連絡先: 010-9929-4199 | メール: sgd41990@gmail.com",
        "footer_terms": "利用規約",
        "footer_privacy": "プライバシーポリシー",
        "footer_notice1": "* GILS SOUNDで作成された著作物および販売されるすべての商品はGILS SOUNDが責任を負います。",
        "footer_notice2": "* 顧客対応担当: ソン・ギルドン / 連絡先: 010-9929-4199",
        "footer_copyright": "© 2026 GILS SOUND. All rights reserved.",

        // login.html
        "login_subtitle": "プレミアムAIミュージックスタジオ<br>たった1秒でログインできます。",
        "login_kakao": "Kakaoでログイン",
        "login_naver": "Naverでログイン",
        "login_google": "Googleでログイン",

        // music_maker.html
        "top_notice": "📢 商用利用およびお知らせ",
        "btn_logout": "🚪 ログアウト",
        "credit_left": "残りクレジット:",
        "btn_mypage": "👤 マイページ",
        "btn_library": "🎵 マイライブラリ",
        "btn_store": "👑 GILSストア",
        "sidebar_title": "🎶 リアルタイム作業リスト",
        "sidebar_subtitle": "作成した音楽を見る",
        "sidebar_empty": "まだ作成された曲はありません。<br>初めての音楽を完成させましょう！",
        "library_empty": "まだ作成された曲はありません。初めての音楽を完成させましょう！",
        "studio_subtitle": "プレミアムAIミュージックスタジオ",
        "tab_story": "📖 ストーリー作詞 (Story)",
        "tab_easy": "✨ 簡単作成 (Easy)",
        "tab_pro": "🎛️ プロフェッショナル (Pro)",
        "step1_genre": "曲のムードを選択してください",
        "step1_pro": "作曲プロンプトを直接入力",
        "step1_story": "あなたのストーリーをお聞かせください",
        "step2_lyrics": "歌詞を入力してください",
        "step3_mood": "詳細な雰囲気を選択してください",
        "step4_title": "曲のタイトルを決めてください",
        "step5_gender": "ボーカルの性別を選択してください",
        "btn_create": "作品を完成させる (Create)",
        "btn_create_next": "✍️ AI歌詞ドラフト作成 (Next)",
        "gemini_active": "✨ 統合バックエンドAI (Gemini連動中)",
        "placeholder_pro": "希望する音楽ジャンル、楽器構成、雰囲気、ボーカルスタイルなどを英語または韓国語で自由に入力してください。\n例) 120 BPM synthwave, heavy synth bass, ethereal female vocal, futuristic pop",
        "tip_pro": "💡 ヒント: 詳細な楽器やムードをカンマ(,)で並べるほど、より豊かで独創的なサウンドが完成します。",
        "placeholder_story": "今日あった出来事、誰かに伝えたい気持ち、忘れられない思い出など、どんなお話でもお気軽に入力してください。\nGILS SOUNDならではの独創性でトレンディな歌詞が創作されます。",
        "draft_title": "📜 AI作詞ドラフト確認",
        "analyzing": "分析中",
        "btn_remake_lyrics": "🔄 歌詞を作り直す",
        "tip_story": "💡 サーバー過負荷時にエラーが発生することがあります。しばらくしてからもう一度お試しください。",
        "btn_auto_lyrics_top": "✨ AI歌詞自動生成",
        "placeholder_lyrics": "美しい歌詞を書いてください。\n右上の「AI歌詞自動生成」ボタンを押すと、選択したジャンルやプロンプトにぴったりの歌詞をGeminiが自動で作成します！",
        "placeholder_title": "私だけの特別なタイトル",
        "gen_time_notice": "(曲の作成には約1〜2分かかります)",
        
        // Modal translations
        "mypage_subtitle": "アカウント情報および決済履歴",
        "mypage_guest": "ゲスト 様",
        "mypage_join_date": "登録日: -",
        "mypage_current_plan": "現在のプラン",
        "mypage_credits_left": "残りクレジット",
        "mypage_songs_created": "作成した曲数",
        "btn_logout_mypage": "ログアウト",
        "plan_basic": "基本プラン",
        "store_subtitle": "合理的な従量制とカスタムクレジットチャージで自分だけのAIスタジオをお楽しみください。",
        "plan_single_desc_sub": "気軽に1曲作る",
        "plan_common_hq": "超高音質MP3ファイルのダウンロード",
        "btn_pay": "決済する",
        "plan_starter_desc_sub": "従来価格 ₩9,900 → 40% 特別割引",
        "plan_common_fast": "優先作成キューの高速処理",
        "btn_pay_recharge": "チャージ決済する",
        "plan_pro_desc_sub": "大容量クリエイター向け",
        "btn_pay_monthly": "月額プランを始める",
        "plan_master_desc_sub": "最高の選択、プレミアム特典",
        "btn_pay_yearly": "年間プランの特典を受ける",
        "payment_method_title": "決済手段の選択",
        "payment_card": "💳 クレジット / デビットカード",
        "payment_notice1": "* PG社(KGイニシス)の規定により、クレジット/デビットカード決済のみ対応しています。(簡易/携帯電話決済不可)",
        "payment_notice2": "安全な電子決済のためにKGイニシス(PortOne)システムを使用しています。",
        "library_modal_title": "🎵 マイライブラリ",
        "library_modal_subtitle": "作成した大切なAI音楽のリストです。いつでも聞き直して確認できます。",

        // Library Options
        "menu_options": "··· オプション",
        "menu_download": "ダウンロード",
        "menu_share": "共有する",
        "menu_prompt": "詳細プロンプトを見る",
        "menu_delete": "削除",

        // Units & Other Texts
        "unit_songs": "曲",
        "unlimited": "∞ 無制限",

        // Vocal Gender
        "gender_female": "👩 女性ボーカル",
        "gender_male": "👨 男性ボーカル",
        "gender_duet": "👫 デュエット",
        "gender_none": "🚫 ボーカルなし (インスト)",
        "pro_genre_label": "カスタムアートポップ",
        "inst_suffix": " (インスト)",

        // Genres & Moods
        "genre_ballad": "バラード",
        "genre_acoustic": "アコースティック",
        "genre_hiphop": "ヒップホップ",
        "genre_indiepop": "インディ・ポップ",
        "genre_dancepop": "ダンス・ポップ",
        "genre_rnb": "R&B",
        "genre_modernrock": "モダンロック",
        "genre_lofi": "ローファイ",
        "genre_jazz": "ジャズ",
        "genre_cinematic": "シネマティック",
        "btn_more_genres": "👇 もっと多くのジャンルを見る（テキストのみ）",
        "btn_close_genres": "👆 もっと見るを隠す",
        "more_genres_desc": "希望のジャンルのテキストをクリックして選択します。",
        "genre_text_kpop": "K-Popアイドル",
        "genre_text_trot": "トロット",
        "genre_text_edm": "EDM / エレクトロニック",
        "genre_text_retro": "レトロ・シティポップ",
        "genre_text_folk": "アコースティック・フォーク",
        "genre_text_punk": "パンクロック",
        "genre_text_alt": "オルタナティヴ・ロック",
        "genre_text_blues": "ブルース",
        "genre_text_bossa": "ボサノヴァ",
        "genre_text_reggae": "レゲエ",
        "genre_text_latin": "ラテン・ポップ",
        "genre_text_orchestra": "オーケストラ",
        "genre_text_newage": "ニューエイジ・ピアノ",
        "genre_text_cyberpunk": "サイバーパンク",
        "genre_text_musical": "ミュージカルナンバー",
        "genre_text_metal": "ヘヴィメタル",
        "genre_text_disco": "ディスコ",
        "genre_text_gospel": "ゴスペル / CCM",
        "genre_text_gugak": "国楽フュージョン",
        "genre_text_children": "童謡",
        "genre_text_ambient": "アンビエント",
        "genre_text_rocknroll": "ロックンロール",
        "genre_text_trap": "トラップ・ヒップホップ",
        "genre_text_boombap": "ブーンバップ",
        "genre_text_futurebass": "フューチャーベース",
        "genre_text_house": "ハウス",
        "genre_text_techno": "テクノ",
        "mood_happy": "😄 楽しい",
        "mood_sad": "😢 悲しい",
        "mood_angry": "😡 怒り",
        "mood_emotional": "🥺 エモーショナル",
        "mood_dreamy": "🌌 夢幻的",
        "mood_peaceful": "😌 穏やか",
        "mood_hopeful": "🌟 希望に満ちた",
        "mood_intense": "🔥 強烈な",
        "mood_tense": "😬 緊張感のある",
        "mood_depressed": "🌧️ 憂鬱な",
        "mood_romantic": "💕 ロマンチック",
        "mood_refreshing": "🌊 爽やかな",
        "mood_dark": "🌑 暗い"
    },
    zh: {
        // Common
        "logo_title": "GILS SOUND",
        "lang_ko": "한국어",
        "lang_en": "English",
        "lang_ja": "日本語",
        "lang_zh": "中文",
        "commercial_use": "允许100%商业用途",

        // index.html
        "main_hero_badge": "AI MUSIC STUDIO",
        "main_hero_title": "只需几秒钟，<br>您的想象就会变成音乐。",
        "main_hero_subtitle": "不需要作曲知识。只需输入流派、氛围和简短的故事。<br>GILS SOUND的AI将立即为您生成工作室级别的高音质音频。",
        "btn_signup_now": "立即注册",
        "plan_title": "GILS SOUND 定价计划",
        "plan_single_title": "单曲体验包",
        "plan_single_price": "₩990 <span style='font-size:14px; color:#9ca3af;'>/ 1首</span>",
        "plan_single_desc1": "充值 1 首生成积分",
        "plan_single_desc2": "自动作词 AI",
        "plan_starter_title": "初学者套餐",
        "plan_starter_price": "₩5,990 <span style='font-size:14px; color:#9ca3af;'>/ 10首</span>",
        "plan_starter_desc1": "充值 10 首生成积分",
        "plan_pro_badge": "包月套餐",
        "plan_pro_title": "专业创作者包",
        "plan_pro_price": "₩19,900 <span style='font-size:14px; color:#9ca3af;'>/ 30天</span>",
        "plan_pro_desc1": "每月提供 100 积分",
        "plan_pro_desc2": "自付款之日起 30 天内有效",
        "plan_master_badge": "年度套餐",
        "plan_master_title": "VVIP 尊享计划",
        "plan_master_price": "₩99,000 <span style='font-size:14px; color:#9ca3af;'>/ 365天</span>",
        "plan_master_desc1": "每月补充 100 首 (共 1,200 首)",
        "plan_master_desc2": "提供 VVIP 超高音质音频",
        "plan_master_desc3": "优先生成队列",
        "plan_master_desc4": "无限高音质下载",
        "footer_company_info": "公司名称: GILS SOUND | 代表人: 孙吉东 | 商业注册号: 293-45-01112<br>地址: 釜山广域市北区彭城路127番街 5, 1楼<br>联系方式: 010-9929-4199 | 邮箱: sgd41990@gmail.com",
        "footer_terms": "服务条款",
        "footer_privacy": "隐私政策",
        "footer_notice1": "* GILS SOUND生成的所有内容和销售的产品由GILS SOUND负责。",
        "footer_notice2": "* 客服代表: 孙吉东 / 联系方式: 010-9929-4199",
        "footer_copyright": "© 2026 GILS SOUND. All rights reserved.",

        // login.html
        "login_subtitle": "高级AI音乐工作室<br>仅需1秒即可登录。",
        "login_kakao": "使用 Kakao 登录",
        "login_naver": "使用 Naver 登录",
        "login_google": "使用 Google 登录",

        // music_maker.html
        "top_notice": "📢 商业用途和通知",
        "btn_logout": "🚪 登出",
        "credit_left": "剩余积分:",
        "btn_mypage": "👤 我的主页",
        "btn_library": "🎵 我的曲库",
        "btn_store": "👑 GILS 商店",
        "sidebar_title": "🎶 实时工作列表",
        "sidebar_subtitle": "查看您创作的音乐",
        "sidebar_empty": "尚未创作任何歌曲。<br>完成您的第一首音乐吧！",
        "library_empty": "尚未创作任何歌曲。完成您的第一首音乐吧！",
        "studio_subtitle": "高级AI音乐工作室",
        "tab_story": "📖 故事作词 (Story)",
        "tab_easy": "✨ 简单生成 (Easy)",
        "tab_pro": "🎛️ 专家模式 (Pro)",
        "step1_genre": "选择歌曲氛围",
        "step1_pro": "直接输入作曲提示语",
        "step1_story": "请说出您的故事",
        "step2_lyrics": "输入歌词",
        "step3_mood": "选择详细氛围",
        "step4_title": "设置歌曲标题",
        "step5_gender": "选择主唱性别",
        "btn_create": "完成作品 (Create)",
        "btn_create_next": "✍️ 生成AI歌词草稿 (Next)",
        "gemini_active": "✨ 统一后台 AI (Gemini 联动中)",
        "placeholder_pro": "请用英语或韩语自由描述您想要的音乐流派、乐器、氛围、声乐风格等。\n例) 120 BPM synthwave, heavy synth bass, ethereal female vocal, futuristic pop",
        "tip_pro": "💡 提示：用逗号(,)列出详细乐器和氛围，可以创造更丰富独特的声音。",
        "placeholder_story": "今天发生的事情，想对某人说的话，难忘的回忆等，请随意输入。\nGILS SOUND 独创性将为您谱写出感人至深的歌词。",
        "draft_title": "📜 AI 歌词草稿预览",
        "analyzing": "分析中",
        "btn_remake_lyrics": "🔄 重新生成歌词",
        "tip_story": "💡 服务器负载高时可能会发生错误。请稍后重试。",
        "btn_auto_lyrics_top": "✨ AI 自动生成歌词",
        "placeholder_lyrics": "请写下美丽的歌词。\n点击右上角的“AI 自动生成歌词”按钮，Gemini将自动为您写出符合所选流派或提示语的歌词！",
        "placeholder_title": "我专属的特别标题",
        "gen_time_notice": "(生成歌曲大约需要1~2分钟)",
        
        // Modal translations
        "mypage_subtitle": "我的账户信息及付款历史",
        "mypage_guest": "访客",
        "mypage_join_date": "加入日期: -",
        "mypage_current_plan": "当前套餐",
        "mypage_credits_left": "剩余积分",
        "mypage_songs_created": "已创作歌曲数",
        "btn_logout_mypage": "登出",
        "plan_basic": "基本套餐",
        "store_subtitle": "通过合理的按量付费和定制积分充值，享受属于您的AI工作室。",
        "plan_single_desc_sub": "轻松制作一首歌曲",
        "plan_common_hq": "超高音质MP3下载",
        "btn_pay": "立即付款",
        "plan_starter_desc_sub": "原价 ₩9,900 → 40% 特别折扣",
        "plan_common_fast": "优先生成队列快速处理",
        "btn_pay_recharge": "充值付款",
        "plan_pro_desc_sub": "为大容量创作者量身定制",
        "btn_pay_monthly": "开始包月计划",
        "plan_master_desc_sub": "最佳选择，尊享福利",
        "btn_pay_yearly": "获取包年福利",
        "payment_method_title": "选择付款方式",
        "payment_card": "💳 信用卡 / 借记卡",
        "payment_notice1": "* 根据PG(KG Inicis)规定，仅支持信用卡/借记卡支付。（不支持快捷/手机支付）",
        "payment_notice2": "我们使用KG Inicis (PortOne)系统进行安全的电子支付。",
        "library_modal_title": "🎵 我的曲库",
        "library_modal_subtitle": "您创作的珍贵AI音乐列表。可随时收听和查看。",

        // Library Options
        "menu_options": "··· 选项",
        "menu_download": "下载",
        "menu_share": "分享",
        "menu_prompt": "查看详细提示语",
        "menu_delete": "删除",

        // Units & Other Texts
        "unit_songs": "首",
        "unlimited": "∞ 无限",

        // Vocal Gender
        "gender_female": "👩 女声",
        "gender_male": "👨 男声",
        "gender_duet": "👫 男女对唱",
        "gender_none": "🚫 无人声 (纯音乐)",
        "pro_genre_label": "自定义艺术流行",
        "inst_suffix": " (纯音乐)",

        // Genres & Moods
        "genre_ballad": "民谣",
        "genre_acoustic": "原声",
        "genre_hiphop": "嘻哈",
        "genre_indiepop": "独立流行",
        "genre_dancepop": "舞曲",
        "genre_rnb": "R&B",
        "genre_modernrock": "现代摇滚",
        "genre_lofi": "低保真",
        "genre_jazz": "爵士乐",
        "genre_cinematic": "电影配乐",
        "btn_more_genres": "👇 查看更多流派（仅文本）",
        "btn_close_genres": "👆 隐藏更多流派",
        "more_genres_desc": "点击所需的流派文本即可选择。",
        "genre_text_kpop": "K-Pop 偶像",
        "genre_text_trot": "Trot（韩国演歌）",
        "genre_text_edm": "EDM / 电子乐",
        "genre_text_retro": "复古城市流行",
        "genre_text_folk": "原声民谣",
        "genre_text_punk": "朋克摇滚",
        "genre_text_alt": "另类摇滚",
        "genre_text_blues": "蓝调",
        "genre_text_bossa": "巴萨诺瓦",
        "genre_text_reggae": "雷鬼",
        "genre_text_latin": "拉丁流行",
        "genre_text_orchestra": "管弦乐",
        "genre_text_newage": "新世纪钢琴",
        "genre_text_cyberpunk": "赛博朋克",
        "genre_text_musical": "音乐剧",
        "genre_text_metal": "重金属",
        "genre_text_disco": "迪斯科",
        "genre_text_gospel": "福音 / CCM",
        "genre_text_gugak": "国乐融合",
        "genre_text_children": "儿歌",
        "genre_text_ambient": "氛围音乐",
        "genre_text_rocknroll": "摇滚",
        "genre_text_trap": "陷阱嘻哈",
        "genre_text_boombap": "Boom Bap",
        "genre_text_futurebass": "未来贝斯",
        "genre_text_house": "House",
        "genre_text_techno": "Techno",
        "mood_happy": "😄 快乐的",
        "mood_sad": "😢 悲伤的",
        "mood_angry": "😡 愤怒的",
        "mood_emotional": "🥺 感性的",
        "mood_dreamy": "🌌 梦幻的",
        "mood_peaceful": "😌 平静的",
        "mood_hopeful": "🌟 充满希望的",
        "mood_intense": "🔥 强烈的",
        "mood_tense": "😬 紧张的",
        "mood_depressed": "🌧️ 忧郁的",
        "mood_romantic": "💕 浪漫的",
        "mood_refreshing": "🌊 清爽的",
        "mood_dark": "🌑 黑暗的"
    }
};

// 언어 적용 함수
function applyLanguage(lang) {
    if (!translations[lang]) lang = 'ko'; // 기본값
    
    // 언어 설정 저장
    localStorage.setItem('gils_lang', lang);
    
    // HTML 문서 언어 속성 변경
    document.documentElement.lang = lang;
    
    // data-i18n 속성을 가진 모든 요소 찾아서 텍스트 변경
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // data-i18n-placeholder 속성을 가진 요소의 placeholder 텍스트 변경
    const placeElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // 동적으로 설정되는 텍스트(예: 무제한) 업데이트 로직
    const userCreditsEl = document.getElementById('user-credits');
    const mypageCreditsEl = document.getElementById('mypage-credits');
    const unlimitedText = translations[lang]['unlimited'] || '∞ 무제한';
    
    // 로컬 스토리지 또는 전역 변수에서 현재 크레딧을 읽어와서 무제한일 경우 텍스트 업데이트
    const savedCredits = localStorage.getItem('gils_credits');
    if (savedCredits) {
        const parsedCredits = parseInt(savedCredits, 10);
        if (parsedCredits === 9999) {
            if (userCreditsEl) userCreditsEl.innerText = unlimitedText;
            if (mypageCreditsEl) mypageCreditsEl.innerText = unlimitedText;
        }
    }
}

// 브라우저 언어 감지 또는 저장된 언어 불러오기
function initLanguage() {
    let savedLang = localStorage.getItem('gils_lang');
    if (!savedLang) {
        // 브라우저 기본 언어 감지
        const browserLang = navigator.language.slice(0, 2);
        if (['ko', 'en', 'ja', 'zh'].includes(browserLang)) {
            savedLang = browserLang;
        } else {
            savedLang = 'en'; // 글로벌 기본
        }
    }
    applyLanguage(savedLang);
    
    // 언어 선택기 UI 업데이트 (존재하는 경우)
    const langSelect = document.getElementById('lang-selector');
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
        });
    }
}

// 스크립트가 로드되면 즉시 실행
document.addEventListener('DOMContentLoaded', initLanguage);

// 동적 조합 텍스트 (장르, 분위기)를 번역하는 함수
function translateDynamicText(text, lang) {
    if (!text || lang === 'ko' || !translations[lang]) return text;
    
    let translated = text;
    const koDict = translations['ko'];
    const targetDict = translations[lang];
    
    // koDict의 키들을 순회하며 포함된 한글을 매칭해서 대상 언어로 변경
    for (const key in koDict) {
        if (koDict[key] && translated.includes(koDict[key])) {
            translated = translated.replace(koDict[key], targetDict[key]);
        }
    }
    return translated;
}
