// Hindi (hi) copy catalog for the consumer landing page.
// Mirrors the exact shape of journaling.en.ts; `JournalingCopy` enforces
// key parity at compile time. Values only are translated; keys, `key`/`from`
// fields, times, phone numbers, {phone} tokens and link paths are unchanged.

import type { JournalingCopy } from './journaling.en';

export const journalingHi: JournalingCopy = {
  seo: {
    title: 'Empath - वो Journal जो आप छोड़ेंगे नहीं',
    description:
      'एक नंबर है जिस पर आप बस journal कर सकते हैं। WhatsApp करें, Telegram करें, call करें, या वो ख़ुद आपको call कर ले। न app, न साइन-अप, न खाली page। आपकी entries mood patterns और insights बन जाती हैं जो आपको सच में दिखते हैं।',
    keywords:
      'text से journaling, voice journaling, बिना app के journal, WhatsApp journal, phone call से journaling, mood tracking, mood tracker, डायरी app, डायरी लिखना, journal कैसे लिखें, AI journaling assistant, chat journaling, journaling habit, journaling plan',
  },

  header: {
    features: 'Features',
    howItWorks: 'कैसे काम करता है',
    faq: 'FAQ',
    blog: 'Blog',
    download: 'Download',
  },

  hero: {
    h1Pre: 'वो journal जो आप',
    h1Highlight: 'कभी नहीं छोड़ेंगे.',
    sub: 'क्योंकि ये वहीं रहता है जहाँ आप हैं: जब भी मन में कुछ हो, बस message कर दीजिए या call कर लीजिए। Empath आपको journal करने और अपने मन को समझने में मदद करता है, और वक़्त के साथ आपके patterns सामने लाता है।',
    mobileLead: 'अभी से journaling शुरू करें। बस call या message कीजिए।',
    call: 'Call करें',
    text: 'Text करें',
    orFavoriteApp: 'या अपने पसंदीदा app पर journal करें',
    phoneMeta: '24/7 उपलब्ध • साइन-अप की ज़रूरत नहीं',
    wantInsights: 'Mood trends और insights चाहिए?',
    getApp: 'Free App डाउनलोड करें',
    appBenefits: 'Mood charts, pattern detection, Apple Health sync',
    desktopLead: 'एक call या message से अभी journaling शुरू कीजिए। न कोई app download करना है, न कोई साइन-अप।',
    textToJournal: 'Text करके journal करें',
    callAndTalk: 'Call करें और बस बोलें',
    textUsAt: 'हमें text करें',
    callUsAt: 'हमें call करें',
    availability: '24/7 उपलब्ध • Free • किसी भी फ़ोन से',
    preferTyping: 'डेस्क पर बैठकर type करना पसंद है?',
    openDashboard: 'Web dashboard खोलें',
  },

  trust: {
    hipaa: 'HIPAA सुरक्षित',
    ai: 'AI-Powered Insights',
    loved: 'हज़ारों लोगों का भरोसा',
  },

  whatsappSection: {
    badge: 'Journaling, सीधे आपके DMs में',
    title: 'असल में ये दिखता कैसा है',
    sub: 'रात 2 बजे की overthinking, वो voice note जो type करने की energy नहीं, एक बुरा दिन। आप वैसे ही भेजते हैं जैसे किसी दोस्त को text करते हैं। Empath सुनता है, जवाब देता है, और चुपचाप उसे journal entry बनाकर save कर लेता है।',
    cta: 'WhatsApp पर journal करें',
    phoneNote: 'या {phone} पर Telegram, Messenger या Instagram से message करें। नीचे example conversations हैं।',
    examples: [
      {
        key: 'late-night',
        title: 'रात 2:47 की भड़ास',
        caption: 'जब दिमाग़ चुप नहीं होता और घर में सब सो चुके होते हैं।',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'पता है बहुत रात हो गई है. manager वाली बात बार-बार दिमाग़ में घूम रही है और समझ नहीं आ रहा मैंने overreact किया या नहीं. किसी को जगाने का मन नहीं था तो तुम्हें लिख दिया',
            time: '2:47 AM',
          },
          {
            from: 'empath',
            text: 'ये आज रात ही सुलझाना ज़रूरी नहीं। कोई बात बार-बार दिमाग़ में चलती है तो अक्सर मतलब ये होता है कि वो तुम्हारे लिए मायने रखती थी, ये नहीं कि तुमने overreact किया। इसे सुबह तक सँभालकर रखूँ?',
            time: '2:47 AM',
          },
          { from: 'user', text: 'रख लो. thank you', time: '2:48 AM' },
          { from: 'empath', text: 'हमेशा। सुबह उठते ही ये यहीं मिलेगा। अब सोने की कोशिश करो 💛', time: '2:48 AM' },
        ],
      },
      {
        key: 'voice-note',
        title: 'Type करने की energy नहीं',
        caption: 'Voice note भेज दीजिए। ये सच में सुनता है।',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          { from: 'user', voice: true, duration: '1:47', time: '11:12 PM' },
          {
            from: 'empath',
            text: 'लंबा दिन था, आवाज़ से ही पता चल गया। दोपहर से पहले ही तीन चीज़ें एक साथ आ गिरीं, फिर भी तुमने अपनी बहन का call लिया। तुमने दो बार कहा कि "और बेहतर handle करना चाहिए था"। धीरे से कहूँ तो: तुमने handle कर लिया। Save हो गया।',
            time: '11:13 PM',
          },
          { from: 'user', text: 'तुम हर चीज़ को इतना survivable कैसे बना देते हो', time: '11:14 PM' },
          { from: 'empath', text: 'क्योंकि कहानी तो तुम्हारी ही ज़ुबानी है। Good night.', time: '11:14 PM' },
        ],
      },
      {
        key: 'mom',
        title: 'रोज़-रोज़ की guilt',
        caption: 'एक journal जिसे याद रहता है कि आप क्या बेहतर करना चाह रहे हैं।',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'आज फिर मम्मी से चिढ़कर बोल दिया और अब बहुत बुरा लग रहा है. वो तो बस trip के बारे में पूछ रही थीं',
            time: '6:03 PM',
          },
          {
            from: 'empath',
            text: 'ये बात तुम्हें इतनी चुभ रही है, यही दिखाता है कि उनकी तुम्हें कितनी परवाह है। मंगलवार से तुम पर काफ़ी load चल रहा है। चिढ़कर बोलना बस उसका छलक जाना है, ये सच नहीं कि तुम उनके लिए क्या हो। उसके बाद बात हुई?',
            time: '6:04 PM',
          },
          { from: 'user', text: 'अभी नहीं. शायद कल', time: '6:06 PM' },
          { from: 'empath', text: 'कल ठीक है। मुझे याद रहेगा कि ये तुम्हारे मन में था।', time: '6:06 PM' },
        ],
      },
      {
        key: 'no-app',
        title: '"रुको, कोई app ही नहीं?"',
        caption: 'न app। न साइन-अप। बस नंबर पर message कीजिए।',
        contactName: '+1 (888) 366-3082',
        unknownAvatar: true,
        messages: [
          { from: 'user', text: 'रुको, मतलब बस इस नंबर पर text करके journal कर सकते हैं? कोई app नहीं?', time: '9:14 AM' },
          {
            from: 'empath',
            text: 'बस इतना ही। न app, न साइन-अप, न कोई खाली page तुम्हें घूरता हुआ। बताओ आज का दिन कैसा जा रहा है, एक लाइन भी काफ़ी है।',
            time: '9:14 AM',
          },
          { from: 'user', text: 'ok. सच बताऊँ तो सुबह के 9 बजे हैं और अभी से थकान हो रही है', time: '9:15 AM' },
          { from: 'empath', text: 'तो यही आज की पहली entry है, save हो गई। आज सुबह सबसे ज़्यादा energy किस चीज़ में जा रही है?', time: '9:15 AM' },
        ],
      },
    ],
    chatUi: {
      today: 'आज',
      online: 'online',
      inputPlaceholder: 'मैसेज',
    },
  },

  crossChannel: {
    badge: 'एक journal, हर app पर',
    title: 'कहीं से भी शुरू करें। हर जगह जारी रखें।',
    sub: 'Empath वहीं रहता है जहाँ आप पहले से हैं। रात को journal कीजिए, सुबह चाय के साथ WhatsApp पर उसी बारे में पूछिए, काम के बाद Telegram पर गहराई में जाइए, scroll करते-करते Instagram से बात पूरी कर लीजिए। हर channel उसी एक journal से जुड़ा है, और उसी एक memory से।',
    pickApp: 'जो app पहले से खुला है, वही चुन लीजिए',
    journalStep: {
      time: 'मंगलवार 9:41 PM',
      channel: 'Voice journal',
      cardTitle: 'Presentation से एक रात पहले',
      cardSub: 'Voice journal · 2 min',
      quote:
        '"बार-बार intro rehearse कर रहा हूँ। कल सबके सामने दिमाग़ blank हो गया तो? पता है कि team में ये material मुझसे बेहतर कोई नहीं जानता, पर दिमाग़ मानने को तैयार ही नहीं..."',
    },
    steps: [
      {
        key: 'whatsapp',
        time: 'बुधवार 8:04 AM',
        channel: 'WhatsApp',
        userMsg: 'morning. कल रात मैंने कुछ ज़्यादा ही drama कर दिया क्या?',
        empathMsg:
          'थोड़ा सा 💛 तुमने intro चार बार rehearse किया। पर तुमने ये भी कहा था कि ये material तुमसे बेहतर कोई नहीं जानता। आज बस वही बात पकड़कर रखना।',
      },
      {
        key: 'telegram',
        time: 'बुधवार 2:37 PM',
        channel: 'Telegram',
        userMsg: 'presentation हो गया, सब ठीक रहा. पर हर बार एक रात पहले ही ये spiral क्यों होता है मेरे साथ?',
        empathMsg:
          'मई से तुम्हारे journal में ये तीसरा night-before spiral है, और तीनों बार अगला दिन ठीक ही गया। Pattern spiral का है, fail होने का नहीं।',
      },
      {
        key: 'instagram',
        time: 'बुधवार 11:20 PM',
        channel: 'Instagram',
        userMsg: 'नींद नहीं आ रही. imposter syndrome पर एक reel देखी और लगा जैसे सीधा मेरे बारे में ही है',
        empathMsg:
          'आज की entry में जोड़ रहा हूँ। और एक बात, तुम्हारा अपना journal उस reel से सहमत नहीं है: इस महीने तुम्हारा score तीन में से तीन है।',
      },
    ],
  },

  channelRow: {
    /** aria-label prefix: "Journal on WhatsApp" */
    journalOn: 'Journal करें:',
  },

  callsYou: {
    badge: 'नया: Empath आपको call करता है',
    title: 'Dial करने का मन नहीं? हम आपको call कर देंगे.',
    sub: 'अपना नंबर डालिए और कुछ ही सेकंड में आपका फ़ोन बजेगा। दोस्त से बात करने जैसे अपने दिन के बारे में बोलिए, call काटिए, और वो journal entry बनकर save भी हो चुकी होगी: transcribe की हुई, title के साथ, बिल्कुल private। चाहें तो call बाद के लिए schedule भी कर सकते हैं।',
  },

  callMeForm: {
    ringingTitle: '📞 आपको अभी call कर रहे हैं, उठाइए!',
    ringingSub: 'अपने दिन के बारे में बात कीजिए, call काटिए, और वो आपकी पहली journal entry बनकर save हो जाएगी।',
    phoneAria: 'आपका फ़ोन नंबर (US)',
    dialing: 'Call लगा रहे हैं…',
    callMeNow: 'मुझे अभी call करें',
    errorGeneric: 'Call नहीं लग पाई। थोड़ी देर में फिर से try कीजिए।',
    errorNetwork: 'कुछ गड़बड़ हो गई। आप सीधे {phone} पर भी call कर सकते हैं।',
    disclaimer: 'सिर्फ़ US नंबर। एक automated call, standard rates लागू।',
    scheduleLink: 'बाद के लिए schedule करें या और जानें →',
  },

  feature1: {
    badge: 'WhatsApp, Telegram या Call',
    title: 'वही Apps इस्तेमाल कीजिए जो आप पहले से खोलते हैं',
    body: 'जैसे ही कोई ख़याल आए, एक message या voice note भेज दीजिए, या बस call करके बोल डालिए। ये वैसा ही है जैसे किसी दोस्त के सामने दिल हल्का करना, बस यहाँ वो चुपचाप आपका journal बन जाता है। न कोई नया app सीखना, न किसी खाली page का सामना।',
    items: [
      { title: 'AI Transcription', desc: 'एकदम सटीक। आपके शब्द, ठीक वैसे ही जैसे आपने कहे।' },
      {
        title: 'Voice Analysis',
        desc: 'सुनिए आप असल में कैसे लग रहे थे। हर voice entry से tone, energy और रफ़्तार पढ़कर।',
      },
      {
        title: 'Photos और Scans',
        desc: 'एक photo भेजिए, Empath उसे पढ़ लेगा, हाथ से लिखे पन्ने भी, सीधे आपके journal में।',
      },
    ],
    mockVoiceTitle: 'Voice Journal',
    mockVoiceTime: '2 मिनट पहले',
    mockVoiceText:
      '"आज therapy में एक ज़बरदस्त breakthrough हुआ। आख़िरकार समझ आ गया कि उन मुश्किल बातचीतों से बचते रहने की असली वजह क्या थी..."',
    mockPhotoLabel: 'Photo Analysis',
    mockPhotoCaption: 'AI ने पहचाना: शांत outdoor जगह, nature walk, धूप वाला दिन',
  },

  feature2: {
    badge: 'AI Intelligence',
    title: '"रुको, ये feeling शुरू कब हुई थी?"',
    sub: 'App खोलिए और बस पूछ लीजिए। आपका भेजा हर message, call और ख़याल याद रखा जाता है और सेकंडों में सामने आ जाता है।',
    memoryTitle: 'Smart Memory Search',
    memoryBody: 'कोई भी पल, कोई भी feeling, कोई भी insight ढूँढिए। हमारा AI context समझता है और ठीक वही निकालकर देता है जो आप ढूँढ रहे हैं।',
    memoryItems: [
      'Emotion, topic या date से search करें',
      'AI-powered semantic समझ',
      'ज़रूरी पलों की instant recall',
      'अपने सफ़र का timeline view',
    ],
    patternsTitle: 'Pattern Recognition',
    patternsBody: 'वो patterns देखिए जिन पर कभी ध्यान ही नहीं गया। हमारा AI आपके अनुभवों में triggers, cycles और connections पहचानता है।',
    patternsItems: [
      'Emotional triggers पहचानें',
      'व्यवहार के patterns समझें',
      'समय के साथ progress track करें',
      'Personalized insights और सुझाव',
    ],
    peopleTitle: 'People Insights',
    peopleBody:
      'Empath देखता है कि आपके journals में बार-बार कौन आता है, और उनके ज़िक्र पर आप आम तौर पर कैसा महसूस करते हैं।',
    peopleItems: [
      'जिन लोगों के बारे में आप लिखते हैं, सब एक जगह',
      'हर व्यक्ति के साथ जुड़ी feelings',
      'हर ज़िक्र, दोबारा पढ़ने के लिए तैयार',
      'किसी को भी कभी भी edit कीजिए या हटाइए',
    ],
  },

  feature3: {
    badge: 'Analytics',
    title: 'देखिए, आपके Mood पर असल में असर क्या डालता है',
    body: 'आपको ऐसी चीज़ें दिखने लगेंगी जैसे "जिस दिन walk होती है, mood बेहतर रहता है" या "हर गुरुवार को work deadlines मेरी anxiety बढ़ा देती हैं।" ये आपका ही data है, बस सीधे-सादे तरीक़े से दिखाया हुआ।',
    mockTitle: 'Mood Trends',
    mockRange: 'पिछले 30 दिन',
    moods: [
      { label: 'खुश' },
      { label: 'शांत' },
      { label: 'बेचैन' },
      { label: 'उदास' },
    ],
    insightLabel: 'Insight',
    insightText: 'Exercise वाले दिनों में आपका mood 40% बेहतर रहता है। सुबह की walk try कीजिए!',
    items: [
      { title: 'Daily Mood Tracking', desc: 'आपके journals से अपने आप sentiment analysis' },
      { title: 'Correlation Analysis', desc: 'जानिए कौन सी activities आपका mood बेहतर करती हैं' },
      { title: 'जगहें और मौसम', desc: 'देखिए घर पर, काम पर और बादल वाले दिनों में आप कैसा महसूस करते हैं' },
      { title: 'Long-term Trends', desc: 'हफ़्तों और महीनों में अपनी progress देखिए' },
    ],
  },

  feature4: {
    badge: 'पूरी सेहत की तस्वीर',
    title: 'जानिए मन ठीक क्यों नहीं लग रहा',
    sub: 'Empath आपका Apple Health data पढ़ता है और कड़ियाँ जोड़ता है। नींद ख़राब रही? Workout छूट गए? आपको साफ़ दिखेगा कि आपका mood किस वजह से गिर रहा है।',
    cards: [
      {
        title: 'Activity और Exercise',
        desc: 'देखिए movement आपके mood और energy पर कैसे असर डालती है।',
        metrics: ['Steps', 'Workouts', 'Active minutes'],
      },
      {
        title: 'नींद और Recovery',
        desc: 'नींद की quality और आपकी mental clarity पर उसका असर track कीजिए।',
        metrics: ['कितनी नींद', 'Heart rate', 'Blood pressure'],
      },
      {
        title: 'रोज़ की आदतें',
        desc: 'दिन की वो छोटी-छोटी चीज़ें जो चुपचाप आपका mood बदल देती हैं।',
        metrics: ['Caffeine', 'पानी', 'Daylight', 'Mindful minutes'],
      },
    ],
    calloutTitle: 'अपने आप मिलने वाली Health Insights',
    calloutBody:
      'Empath, Apple Health से दस categories पढ़ता है और उन्हें आपके journals के साथ मिलाकर देखता है और गहरे connections सामने लाता है। "जिन दिनों आप 7+ घंटे सोते हैं, आपकी anxiety 35% कम रहती है।" ऐसी insights आपको बेहतर फ़ैसले लेने में मदद करती हैं।',
  },

  feature5: {
    badge: 'AI Powered',
    title: 'अपने Journals से बात कीजिए',
    sub: 'आपका personal AI companion आपकी पूरी history जानता है। कभी भी सवाल पूछिए, insights पाइए और personalized guidance लीजिए।',
    companionTitle: 'आपका AI Companion',
    exchanges: [
      {
        q: '"मुझे हर Monday को anxiety क्यों होती है?"',
        a: 'आपके journals के हिसाब से, आप Sunday रात को कम सोते हैं और Monday सुबह breakfast छोड़ देते हैं। ये pattern आपकी पिछली 10 में से 8 Monday entries में दिखता है।',
      },
      {
        q: '"Stress में मुझे किस चीज़ से बेहतर महसूस होता है?"',
        a: 'आपके सबसे असरदार stress-busters: दोस्तों से बात करना (23 बार ज़िक्र), walk पर जाना (18 बार), और music सुनना (15 बार)।',
      },
    ],
    askTitle: 'कुछ भी पूछिए',
    askItems: [
      'अपने behavior के patterns ढूँढें',
      'अपने triggers समझें',
      'Entries के बीच जो ज़रूरी है, वो याद रखता है',
      'आपकी bio और जिन लोगों के बारे में आप लिखते हैं, उन्हें जानता है',
      'कोई ख़ास memory याद करें',
      'Therapy sessions की तैयारी करें',
    ],
    privacyTitle: '100% Private और सुरक्षित',
    privacyBody: 'आपकी बातचीत encrypted रहती है और कभी भी AI models को train करने में इस्तेमाल नहीं होती। आपकी privacy हमारी प्राथमिकता है।',
  },

  featureGrid: {
    badge: 'और बाक़ी सब',
    title: 'App में और क्या-क्या है',
    sub: 'वो छोटी-छोटी चीज़ें जो इसे आपका बना देती हैं।',
    items: [
      {
        title: 'Biometric Journal Lock',
        desc: 'अपनी सबसे निजी entries को Face ID या Touch ID के पीछे रखिए।',
      },
      {
        title: 'Journal Assistant',
        desc: 'Entry के बीच अटक गए? कोई सवाल, एक धक्का, या शब्द ढूँढने में मदद माँग लीजिए।',
      },
      {
        title: 'ख़ुद को जानिए',
        desc: 'आपके ही journals से निकले सवाल, उन दिनों के लिए जब गहरे उतरना हो।',
      },
      {
        title: 'Home Screen Widgets',
        desc: 'एक tap में mood, और दिन का quote, app खोले बिना।',
      },
      {
        title: 'आपकी Bio',
        desc: 'अपना context Empath को एक बार बता दीजिए। उसके बाद हर insight ज़्यादा अपना लगेगा।',
      },
      {
        title: 'पुरानी जुड़ी Entries',
        desc: 'एक entry पढ़ते ही वो पुरानी entries सामने आ जाती हैं जो उससे मिलती हैं।',
      },
      {
        title: 'Import और Export',
        desc: 'अपने पुराने journals ले आइए। जब चाहें सब कुछ साथ ले जाइए।',
      },
      {
        title: 'Offline Journaling',
        desc: 'Signal न हो तो भी लिखिए। जैसे ही वापस आते हैं, sync हो जाता है।',
      },
    ],
  },

  feature6: {
    badge: 'Therapy भी चल रही है?',
    title: 'हर Session को और असरदार बनाइए',
    sub: 'अगर आप किसी therapist के पास जाते हैं, तो Empath आपका हफ़्ता अपने आप उनके साथ share कर सकता है। फिर कभी "तो, क्या-क्या हुआ?" से शुरुआत नहीं। आपके sessions सीधे काम की बात से शुरू होते हैं।',
    cardTitle: 'अपने Therapist को अपने मन तक पहुँच दीजिए',
    cardBody:
      'जब आप Empath के ज़रिए अपने therapist से जुड़ते हैं, तो उन्हें आपके पूरे हफ़्ते की तस्वीर मिलती है, सिर्फ़ वो नहीं जो session में याद रह जाता है।',
    items: [
      {
        title: 'Session से पहले Summaries',
        desc: 'आपके therapist हर session से पहले AI की बनाई summaries देख लेते हैं। Recap में वक़्त बर्बाद नहीं।',
      },
      {
        title: 'गहरी Insights',
        desc: 'आपके therapist वो patterns पकड़ लेते हैं जो शायद आपसे छूट जाएँ, और सही दिशा में काम की तैयारी करते हैं।',
      },
      {
        title: 'तेज़ Progress',
        desc: 'इधर-उधर की बातें छोड़िए। पहले ही मिनट से असली काम पर आइए।',
      },
    ],
    mockTitle: 'Weekly Summary',
    mockSub: 'आपके therapist के लिए तैयार',
    mockMoodLabel: 'Mood Overview',
    mockMoodText:
      'Client को हफ़्ते के बीच में बढ़ी हुई anxiety महसूस हुई, जो work deadlines से जुड़ी थी। Friday के therapy session के बाद काफ़ी सुधार।',
    mockMomentsLabel: 'अहम पल',
    mockMoments: [
      'Tuesday: रिश्तों के patterns को लेकर एक बड़ी realization',
      'Thursday: नई coping strategies कामयाबी से आज़माईं',
    ],
    mockFocusLabel: 'सुझाया गया Focus',
    mockFocusText: 'काम से जुड़ी anxiety के patterns और Tuesday की relationship insights पर बात करें।',
    privacyTitle: 'आपकी Privacy, आपका Control',
    privacyBody:
      'क्या share करना है और कब, ये आप तय करते हैं। जब चाहें therapist से जुड़िए या disconnect कर दीजिए। आपका data हमेशा आपका ही रहता है।',
    privacyBadges: ['HIPAA Compliant', 'End-to-end Encrypted', 'Access आपके हाथ में', 'कभी भी Disconnect करें'],
  },

  howItWorks: {
    title: 'Message या Call से लिखिए। App में मुड़कर देखिए।',
    sub: 'न कोई setup, न कोई नई आदत बनानी है। जैसे दोस्तों से बात करते हैं, वैसे ही journal कीजिए।',
    stepLabel: 'Step',
    steps: [
      {
        title: 'Message करें या Call',
        desc: 'जब भी कोई ख़याल या feeling आए, Empath को WhatsApp, Telegram या call कर दीजिए, जैसे किसी दोस्त को message करते हैं। न app, न साइन-अप, न खाली page।',
      },
      {
        title: 'Empath उसे सँभाल लेता है',
        desc: 'हर message और call अपने आप journal entry बन जाती है: transcribed, organized और saved। आप बस अपनी ज़िंदगी जीते रहिए।',
      },
      {
        title: 'मुड़कर देखने के लिए App खोलिए',
        desc: 'जब पीछे मुड़कर देखना हो, कोई memory दोबारा जीनी हो, या अपने mood patterns और trends देखने हों, तो सब app में आपका इंतज़ार कर रहा है।',
      },
    ],
  },

  iosCallout: {
    kicker: 'iOS app उपलब्ध',
    title: 'पीछे मुड़कर देखना है? App ले लीजिए',
    body: 'Journal आप message और call से करते हैं। App वो जगह है जहाँ आप सब कुछ पढ़ सकते हैं, पुरानी entries search कर सकते हैं और अपने mood patterns को खुलते देख सकते हैं।',
    button: 'App Store से Download करें',
  },

  socialProof: {
    title: 'लोग क्या कह रहे हैं',
    featured: 'App Store पर Featured',
    testimonials: [
      {
        quote:
          'मैंने 5 journaling apps try कीं और हर एक छोड़ दी। Empath इसलिए टिक गया क्योंकि मन में कुछ हो तो मैं बस text कर देता हूँ। न app खोलना, न खाली page।',
        author: 'Alex M.',
        role: '2024 से user',
      },
      {
        quote:
          'Empath ने मुझे दिखाया कि हर Sunday रात को, काम से पहले, मुझे anxiety होती है। कागज़ पर 3 साल journaling करके भी मैं ये कड़ियाँ कभी नहीं जोड़ पाई।',
        author: 'Jordan K.',
        role: '2023 से user',
      },
      {
        quote:
          'मुझे ये बहुत पसंद है कि मैं बस call करके बोल सकती हूँ। इतना natural लगता है, journaling हमेशा से इतनी आसान होनी चाहिए थी।',
        author: 'Sam R.',
        role: '2024 से user',
      },
    ],
  },

  faq: {
    title: 'आम सवाल',
    items: [
      {
        q: 'क्या journal करने के लिए app download करना ज़रूरी है?',
        a: 'बिल्कुल नहीं। आप पूरी तरह WhatsApp, Telegram या phone call से journal कर सकते हैं। न app चाहिए, न साइन-अप। iOS app optional है: वहाँ आप अपनी entries पढ़ते हैं, पुराने पल search करते हैं और समय के साथ अपने mood patterns देखते हैं।',
      },
      {
        q: 'क्या Empath सच में free है?',
        a: 'हाँ! Empath पूरी तरह free है। Message, call या app से journaling, साथ में AI transcription, mood tracking और insights, सब कुछ बिना किसी क़ीमत के शामिल है।',
      },
      {
        q: 'AI काम कैसे करता है?',
        a: 'हमारा AI advanced natural language processing से आपकी आवाज़ transcribe करता है, sentiment analyze करता है, patterns पहचानता है और insights बनाता है। पूरी processing सुरक्षित और HIPAA compliant है।',
      },
      {
        q: 'क्या बिना therapist के इस्तेमाल कर सकते हैं?',
        a: 'बिल्कुल! Empath अपने आप में journaling और self-reflection का बढ़िया tool है। चाहें तो बाद में किसी therapist से जुड़ सकते हैं।',
      },
      {
        q: 'क्या मेरा data private और सुरक्षित है?',
        a: 'हाँ। आपका सारा data end-to-end encrypted है, HIPAA compliant है, और कभी भी AI models को train करने में इस्तेमाल नहीं होता। Access किसे मिले ये आप तय करते हैं, और जब चाहें सब कुछ delete कर सकते हैं।',
      },
      {
        q: 'और Android का क्या?',
        a: 'फ़िलहाल app सिर्फ़ iOS पर है, पर आप किसी भी device से phone call या WhatsApp के ज़रिए journal कर ही सकते हैं! Android app पर काम चल रहा है।',
      },
      {
        q: 'अपने therapist से कैसे जुड़ें?',
        a: 'अगर आपके therapist Empath इस्तेमाल करते हैं, तो वो आपको invite भेज सकते हैं। अगर नहीं, तो आप निजी तौर पर journal कर सकते हैं और अपनी insights ख़ुद share कर सकते हैं, या उन्हें Empath पर invite कर सकते हैं।',
      },
      {
        q: 'क्या अपने journals export किए जा सकते हैं?',
        a: 'हाँ! आप अपने सारे journals, insights और data कभी भी export कर सकते हैं। आपका data हमेशा आपका ही है।',
      },
      {
        q: 'अगर समझ न आए कि लिखूँ क्या?',
        a: 'आप बातचीत करते-करते entry तक पहुँच सकते हैं। Empath का AI journaling assistant आपसे एक-एक करके नरम सवाल पूछता है, फिर पूरी बातचीत को आपकी ही आवाज़ में एक journal entry बना देता है। खाली page से पार पाने का ये सबसे आसान तरीक़ा है।',
        link: { text: 'जानिए chat journaling कैसे काम करती है', to: '/app/blog/chat-journaling' },
      },
      {
        q: 'क्या Empath journaling की आदत बनाने में मदद कर सकता है?',
        a: 'हाँ। एक Journaling Plan set कीजिए: रोज़ाना या हफ़्ते के हिसाब से, ऐसी streaks जो एक दिन छूट जाने पर भी नहीं टूटतीं, और push या email से smart reminders जो उस दिन ख़ुद skip हो जाते हैं जब आप journal कर चुके होते हैं।',
        link: { text: 'देखिए टिकने वाला journaling plan कैसे बनता है', to: '/app/blog/journaling-plan' },
      },
    ],
  },

  finalCta: {
    title: 'आपकी अगली Journal Entry बस एक Message दूर है',
    sub: 'न कोई app सीखना, न खाली page को घूरना। जैसे दोस्त को करते हैं वैसे ही message या call कीजिए, और महीनों नहीं, कुछ ही दिनों में अपने patterns दिखने लगेंगे।',
    downloadFree: 'App Store से Free Download करें',
    justSayHi: 'न app, न साइन-अप। बस hi बोल दीजिए',
    preferTyping: 'Type करना पसंद है? Web dashboard खोलें →',
    noCreditCard: 'कोई credit card नहीं',
    freeForever: 'हमेशा के लिए free',
    fastSetup: '30 सेकंड का setup',
  },

  footer: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    support: 'Support',
  },

  floating: {
    downloadFree: 'Free Download करें',
    text: 'Text से journal करें',
    call: 'Call करें',
    webApp: 'Web app',
  },
};
