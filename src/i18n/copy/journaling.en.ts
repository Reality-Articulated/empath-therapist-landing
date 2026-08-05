// Master (English) copy catalog for the consumer landing page (JournalingPage
// + WhatsAppExamples + CrossChannelStory + CallMeForm + channel row).
// Every locale file in this directory must export the same shape: the
// `JournalingCopy` type is derived from this object, so a missing key in a
// translation is a compile error.
//
// PURE DATA ONLY (no JSX): this module is also transpile-loaded by
// scripts/prerender.mjs and scripts/generate-sitemap.mjs at build time.
//
// Translation notes:
// - Keep product/brand names (Empath, WhatsApp, Telegram, Instagram, Apple
//   Health, App Store) untranslated.
// - Chat messages: user texts are deliberately lowercase/casual; keep that
//   register. Empath replies are warm but plain; never clinical.
// - Say the local equivalent of "no sign-up", NOT "no account" (an account
//   is auto-created server-side; "no sign-up" is the claim that holds).

export interface ChatMessage {
  from: 'user' | 'empath';
  text?: string;
  /** voice-note message instead of text */
  voice?: boolean;
  duration?: string;
  time: string;
}

export const journalingEn = {
  seo: {
    title: "Empath - The Journal You Won't Quit",
    description:
      "There's a number you can just journal at. WhatsApp it, Telegram it, call it, or have it call you. No app, no sign-up, no blank page. Your entries become mood patterns and insights you can actually see.",
    keywords:
      'journal by text, voice journaling, journal without an app, text journaling, WhatsApp journal, journaling by phone call, mood tracking, chat journaling, AI journaling assistant, conversational journaling, journaling plan, journaling habit tracker',
  },

  header: {
    features: 'Features',
    howItWorks: 'How It Works',
    faq: 'FAQ',
    blog: 'Blog',
    download: 'Download',
  },

  hero: {
    h1Pre: 'The journal you',
    h1Highlight: "won't quit.",
    sub: "Because it lives wherever you go: just message or call whenever something's on your mind. Empath helps you journal and explore your mind, revealing your patterns over time.",
    mobileLead: 'Start journaling right now. Just call or send a message.',
    call: 'Call',
    text: 'Text',
    orFavoriteApp: 'Or journal on your favorite app',
    phoneMeta: 'Available 24/7 • No account needed',
    wantInsights: 'Want mood trends & insights?',
    getApp: 'Get the Free App',
    appBenefits: 'Mood charts, pattern detection, Apple Health sync',
    desktopLead: 'Start journaling right now with a call or a message. No app to download, no account to create.',
    textToJournal: 'Text to journal',
    callAndTalk: 'Call & just talk',
    textUsAt: 'Text us at',
    callUsAt: 'Call us at',
    availability: 'Available 24/7 • Free • Works from any phone',
    preferTyping: 'Prefer typing at your desk?',
    openDashboard: 'Open the web dashboard',
  },

  trust: {
    hipaa: 'HIPAA Secure',
    ai: 'AI-Powered Insights',
    loved: 'Loved by Thousands',
  },

  whatsappSection: {
    badge: 'Journaling in your DMs',
    title: 'What It Actually Looks Like',
    sub: "A 2 AM spiral, a voice note you're too tired to type, a rough day. You send it like you'd text a friend. Empath listens, responds, and quietly saves it as a journal entry.",
    cta: 'Journal on WhatsApp',
    phoneNote: 'Or message {phone} on Telegram, Messenger, or Instagram. Example conversations shown.',
    examples: [
      {
        key: 'late-night',
        title: 'The 2:47 AM vent',
        caption: "For when your brain won't shut up and everyone's asleep.",
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: "i know it's late. i keep replaying that conversation with my manager and i can't tell if i overreacted. didn't want to wake anyone so i'm telling you",
            time: '2:47 AM',
          },
          {
            from: 'empath',
            text: "You don't have to settle that tonight. Replaying it usually means it mattered, not that you overreacted. Should I hold onto this until morning?",
            time: '2:47 AM',
          },
          { from: 'user', text: 'hold onto it. thank you', time: '2:48 AM' },
          { from: 'empath', text: "Always. It'll be here when you wake up. Try to sleep 💛", time: '2:48 AM' },
        ] as ChatMessage[],
      },
      {
        key: 'voice-note',
        title: 'Too tired to type',
        caption: 'Send a voice note. It actually listens.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          { from: 'user', voice: true, duration: '1:47', time: '11:12 PM' },
          {
            from: 'empath',
            text: 'Long day. I heard it. Three things stacked before noon, and you still showed up for your sister\'s call. You said you "should have handled it better" twice. Gently: you handled it. Saved.',
            time: '11:13 PM',
          },
          { from: 'user', text: 'how do you always make it sound survivable', time: '11:14 PM' },
          { from: 'empath', text: "Because you're the one telling the story. Goodnight.", time: '11:14 PM' },
        ] as ChatMessage[],
      },
      {
        key: 'mom',
        title: 'The everyday guilt',
        caption: "A journal that remembers what you're trying to do better.",
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'snapped at my mom again today and i feel terrible. she was just asking about the trip',
            time: '6:03 PM',
          },
          {
            from: 'empath',
            text: "The fact that it's sitting with you this heavily shows how much you care. You've been stretched thin since Tuesday. Snapping is the overflow, not the truth about who you are to her. Have you talked since?",
            time: '6:04 PM',
          },
          { from: 'user', text: 'not yet. maybe tomorrow', time: '6:06 PM' },
          { from: 'empath', text: "Tomorrow's good. I'll remember you wanted to.", time: '6:06 PM' },
        ] as ChatMessage[],
      },
      {
        key: 'no-app',
        title: '"Wait, no app?"',
        caption: 'No app. No sign-up. You just message the number.',
        contactName: '+1 (888) 366-3082',
        unknownAvatar: true,
        messages: [
          { from: 'user', text: 'wait so i can journal by just texting this number? no app?', time: '9:14 AM' },
          {
            from: 'empath',
            text: "That's it. No app, no sign-up, no blank page staring at you. Tell me about your day. One sentence is plenty.",
            time: '9:14 AM',
          },
          { from: 'user', text: "ok. honestly already exhausted and it's 9am", time: '9:15 AM' },
          { from: 'empath', text: "Then that's today's first entry, saved. What's taking the most energy this morning?", time: '9:15 AM' },
        ] as ChatMessage[],
      },
    ],
    chatUi: {
      today: 'Today',
      online: 'online',
      inputPlaceholder: 'Message',
    },
  },

  crossChannel: {
    badge: 'One journal, every app',
    title: 'Start Anywhere. Continue Everywhere.',
    sub: 'Empath lives wherever you already are. Journal tonight, ask about it on WhatsApp over coffee, dig deeper on Telegram after work, close the loop from Instagram while you scroll. Every channel talks to the same journal, and the same memory.',
    pickApp: "Pick whichever app you're already in",
    journalStep: {
      time: 'Tuesday 9:41 PM',
      channel: 'Voice journal',
      cardTitle: 'Night before the presentation',
      cardSub: 'Voice journal · 2 min',
      quote:
        '"I keep rehearsing the intro. What if I just blank out in front of everyone tomorrow? I know this material better than anyone on the team, but my brain won\'t accept it..."',
    },
    steps: [
      {
        key: 'whatsapp',
        time: 'Wednesday 8:04 AM',
        channel: 'WhatsApp',
        userMsg: 'morning. was i being dramatic last night?',
        empathMsg:
          'A little 💛 You rehearsed the intro four times. But you also said you know this material better than anyone. Hold onto that part today.',
      },
      {
        key: 'telegram',
        time: 'Wednesday 2:37 PM',
        channel: 'Telegram',
        userMsg: 'presentation done, it went fine. why do i always spiral the night before?',
        empathMsg:
          "That's the third night-before spiral in your journal since May, and all three went fine the next day. The pattern is the spiral, not the failing.",
      },
      {
        key: 'instagram',
        time: 'Wednesday 11:20 PM',
        channel: 'Instagram',
        userMsg: "can't sleep. saw a reel about imposter syndrome and felt extremely seen",
        empathMsg:
          "Adding it to today's entry. For what it's worth, your own journal disagrees with the reel: you're three for three this month.",
      },
    ],
  },

  channelRow: {
    /** aria-label prefix: "Journal on WhatsApp" */
    journalOn: 'Journal on',
  },

  callsYou: {
    badge: 'New: Empath calls you',
    title: "Don't feel like dialing? We'll call you.",
    sub: "Type your number and your phone rings within seconds. Talk about your day like you would with a friend, hang up, and it's already saved as a journal entry: transcribed, titled, and private. You can even schedule the call for later.",
  },

  callMeForm: {
    ringingTitle: '📞 Calling you now. Pick up!',
    ringingSub: "Talk about your day, hang up, and it's saved as your first journal entry.",
    phoneAria: 'Your phone number (US)',
    dialing: 'Dialing…',
    callMeNow: 'Call me now',
    errorGeneric: "We couldn't place the call. Please try again in a moment.",
    errorNetwork: 'Something went wrong. You can always dial {phone} directly.',
    disclaimer: 'US numbers only. One automated call, standard rates.',
    scheduleLink: 'Schedule for later or learn more →',
  },

  feature1: {
    badge: 'WhatsApp, Telegram, or Call',
    title: 'Use the Apps You Already Open',
    body: "The moment a thought hits, fire off a message or voice note, or just call and talk it out. It's the same thing you'd do venting to a friend, except here it quietly becomes your journal. No new app to learn, no blank page to face.",
    items: [
      { title: 'AI Transcription', desc: 'Perfect accuracy. Your words, captured exactly as you say them.' },
      {
        title: 'Voice Analysis',
        desc: 'Hear how you really sounded. Tone, energy, and pace, read back from every spoken entry.',
      },
      {
        title: 'Photos & Scans',
        desc: "Send a photo and Empath reads it, handwritten pages included, straight into your journal.",
      },
    ],
    mockVoiceTitle: 'Voice Journal',
    mockVoiceTime: '2 minutes ago',
    mockVoiceText:
      '"Just had an amazing breakthrough in therapy today. I finally understand why I\'ve been avoiding those difficult conversations..."',
    mockPhotoLabel: 'Photo Analysis',
    mockPhotoCaption: 'AI detected: Peaceful outdoor setting, nature walk, sunny day',
  },

  feature2: {
    badge: 'AI Intelligence',
    title: '"Wait, When Did I Start Feeling This Way?"',
    sub: "Open the app and just ask. Every message, call, and thought you've sent is remembered and surfaced in seconds.",
    memoryTitle: 'Smart Memory Search',
    memoryBody: "Find any moment, any feeling, any insight. Our AI understands context and surfaces exactly what you're looking for.",
    memoryItems: [
      'Search by emotion, topic, or date',
      'Semantic search, so you can search by feeling',
      'Instant recall of important moments',
      'Timeline view of your journey',
    ],
    patternsTitle: 'Pattern Recognition',
    patternsBody: 'Discover patterns you never noticed. Our AI identifies triggers, cycles, and connections in your experiences.',
    patternsItems: [
      'Identify emotional triggers',
      'Recognize behavioral patterns',
      'Track progress over time',
      'Personalized insights & suggestions',
    ],
    peopleTitle: 'People Insights',
    peopleBody:
      'Empath notices who keeps showing up in your entries, and how you tend to feel when they do.',
    peopleItems: [
      'Everyone you write about, in one place',
      'The feelings that come up around each person',
      'Every mention, ready to reread',
      'Edit or remove anyone, anytime',
    ],
  },

  feature3: {
    badge: 'Analytics',
    title: 'See What Actually Affects Your Mood',
    body: 'You\'ll notice things like "I\'m happier on days I walk" or "work deadlines spike my anxiety every Thursday." It\'s your data, shown simply.',
    mockTitle: 'Mood Trends',
    mockRange: 'Last 30 Days',
    moods: [
      { label: 'Happy' },
      { label: 'Calm' },
      { label: 'Anxious' },
      { label: 'Sad' },
    ],
    insightLabel: 'Insight',
    insightText: 'Your mood improves 40% on days you exercise. Consider morning walks!',
    items: [
      { title: 'Daily Mood Tracking', desc: 'Automatic sentiment analysis from your journals' },
      { title: 'Correlation Analysis', desc: 'Discover what activities boost your mood' },
      { title: 'Places & Weather', desc: 'See how you feel at home, at work, and on grey days' },
      { title: 'Long-term Trends', desc: 'See your progress over weeks and months' },
    ],
  },

  feature4: {
    badge: 'Holistic Health',
    title: 'Know Why You Feel Off',
    sub: "Empath reads your Apple Health data and connects the dots. Bad sleep? Skipped workouts? You'll see exactly what's dragging your mood down.",
    cards: [
      {
        title: 'Activity & Exercise',
        desc: 'See how movement impacts your mood and energy levels.',
        metrics: ['Steps', 'Workouts', 'Active minutes'],
      },
      {
        title: 'Sleep & Recovery',
        desc: 'Track sleep quality and its effects on your mental clarity.',
        metrics: ['Sleep duration', 'Heart rate', 'Blood pressure'],
      },
      {
        title: 'Daily Habits',
        desc: 'The small daily inputs that quietly move your mood.',
        metrics: ['Caffeine', 'Water intake', 'Daylight', 'Mindful minutes'],
      },
    ],
    calloutTitle: 'Automatic Health Insights',
    calloutBody:
      'Empath reads ten categories from Apple Health and analyzes them alongside your journals to reveal powerful connections. "Your anxiety decreases 35% on days you sleep 7+ hours." Insights like these help you make better choices.',
  },

  feature5: {
    badge: 'AI Powered',
    title: 'Talk to Your Journals',
    sub: 'Your personal AI companion knows your entire history. Ask questions, gain insights, and get personalized guidance anytime.',
    companionTitle: 'Your AI Companion',
    exchanges: [
      {
        q: '"Why do I always feel anxious on Mondays?"',
        a: 'Based on your journals, you tend to sleep less on Sunday nights and skip breakfast on Monday mornings. This pattern appears in 8 of your last 10 Monday entries.',
      },
      {
        q: '"What helps me feel better when I\'m stressed?"',
        a: 'Your most effective stress relief: talking to friends (mentioned 23 times), going for walks (18 times), and listening to music (15 times).',
      },
    ],
    askTitle: 'Ask Anything',
    askItems: [
      'Find patterns in your behavior',
      'Understand your triggers',
      'Remembers what matters between entries',
      'Knows your bio and the people you write about',
      'Recall specific memories',
      'Prepare for therapy sessions',
    ],
    privacyTitle: '100% Private & Secure',
    privacyBody: 'Your conversations are encrypted and never used to train AI models. Your privacy is our priority.',
  },

  // Compact grid closing the features region: the shipped features that don't
  // warrant a section of their own. Order matches the tile order in
  // JournalingPage's FEATURE GRID block, whose icons are index-matched.
  featureGrid: {
    badge: 'And The Rest',
    title: 'Everything Else In The App',
    sub: 'The smaller things that make it yours.',
    items: [
      {
        title: 'Biometric Journal Lock',
        desc: 'Keep your most personal entries behind Face ID or Touch ID.',
      },
      {
        title: 'Journal Assistant',
        desc: 'Stuck mid-entry? Ask for a prompt, a nudge, or help finding the words.',
      },
      {
        title: 'Discover Yourself',
        desc: 'Questions drawn from your own entries, for the days you want to dig deeper.',
      },
      {
        title: 'Home Screen Widgets',
        desc: 'One-tap mood check-ins and a daily quote, without opening the app.',
      },
      {
        title: 'Your Bio',
        desc: 'Tell Empath your context once. Every insight after that lands closer to home.',
      },
      {
        title: 'Related Past Entries',
        desc: 'Reading one entry surfaces the older ones it rhymes with.',
      },
      {
        title: 'Import & Export',
        desc: 'Bring your old journals in. Take everything with you whenever you want.',
      },
      {
        title: 'Offline Journaling',
        desc: "Write with no signal. It syncs the moment you're back.",
      },
    ],
  },

  feature6: {
    badge: 'Also In Therapy?',
    title: 'Make Every Session Count',
    sub: 'If you see a therapist, Empath can share your week with them automatically. No more "so, what happened?" Your sessions start where they matter.',
    cardTitle: 'Give Your Therapist Access to Your Mind',
    cardBody:
      'When you connect with your therapist through Empath, they get a complete picture of your week, not just what you remember to share in session.',
    items: [
      {
        title: 'Pre-Session Summaries',
        desc: 'Your therapist reviews AI-generated summaries before each session. No time wasted on recaps.',
      },
      {
        title: 'Deeper Insights',
        desc: 'Your therapist spots patterns you might miss and prepares targeted interventions.',
      },
      {
        title: 'Faster Progress',
        desc: 'Skip the small talk. Dive straight into meaningful work from minute one.',
      },
    ],
    mockTitle: 'Weekly Summary',
    mockSub: 'Prepared for your therapist',
    mockMoodLabel: 'Mood Overview',
    mockMoodText:
      'Client experienced increased anxiety mid-week, correlating with work deadlines. Improved significantly after Friday therapy session.',
    mockMomentsLabel: 'Key Moments',
    mockMoments: [
      'Tuesday: Breakthrough realization about relationship patterns',
      'Thursday: Practiced new coping strategies successfully',
    ],
    mockFocusLabel: 'Suggested Focus',
    mockFocusText: 'Explore work-related anxiety patterns and relationship insights from Tuesday.',
    privacyTitle: 'Your Privacy, Your Control',
    privacyBody:
      'You choose what to share and when. Connect or disconnect from your therapist at any time. Your data always remains yours.',
    privacyBadges: ['HIPAA Compliant', 'End-to-end Encrypted', 'You Control Access', 'Disconnect Anytime'],
  },

  howItWorks: {
    title: 'Capture by Message or Call. Reflect in the App.',
    sub: 'No setup, no new habit to build. Journal the way you already talk to friends.',
    stepLabel: 'Step',
    steps: [
      {
        title: 'Message or Call',
        desc: "Whenever a thought or feeling shows up, WhatsApp, Telegram, or call Empath, just like you'd message a friend. No app, no account, no blank page.",
      },
      {
        title: 'Empath Captures It',
        desc: 'Every message and call becomes a journal entry: transcribed, organized, and saved automatically. You just keep living your life.',
      },
      {
        title: 'Open the App to Reflect',
        desc: 'When you want to look back, revisit a memory, or see your mood patterns and trends, it’s all waiting for you in the app.',
      },
    ],
  },

  iosCallout: {
    kicker: 'iOS app available',
    title: 'Want to Look Back? Get the App',
    body: 'You journal by message and call. The app is where you read it all back, search past entries, and watch your mood patterns unfold.',
    button: 'Download on App Store',
  },

  socialProof: {
    title: 'What People Are Saying',
    featured: 'Featured on the App Store',
    testimonials: [
      {
        quote:
          "I've tried 5 journaling apps and quit every one. Empath stuck because I just text when something's on my mind. No opening an app, no blank page.",
        author: 'Alex M.',
        role: 'User since 2024',
      },
      {
        quote:
          'Empath showed me I get anxious every Sunday night before work. I never connected those dots in 3 years of journaling on paper.',
        author: 'Jordan K.',
        role: 'User since 2023',
      },
      {
        quote:
          'I love that I can just call and talk. It feels so natural, like journaling should have always been this easy.',
        author: 'Sam R.',
        role: 'User since 2024',
      },
    ],
  },

  faq: {
    title: 'Common Questions',
    items: [
      {
        q: 'Do I need to download the app to journal?',
        a: "Nope. You can journal entirely by WhatsApp, Telegram, or phone call, with no app and no account required. The iOS app is optional: it's where you read back your entries, search past moments, and see your mood patterns over time.",
      },
      {
        q: 'Is Empath really free?',
        a: 'Yes! Empath is completely free to use. All core journaling by message, call, or app, plus AI transcription, mood tracking, and insights, is included at no cost.',
      },
      {
        q: 'How does the AI work?',
        a: 'Our AI uses advanced natural language processing to transcribe your voice, analyze sentiment, identify patterns, and generate insights. All processing is secure and HIPAA compliant.',
      },
      {
        q: 'Can I use it without a therapist?',
        a: 'Absolutely! Empath works great as a standalone journaling and self-reflection tool. You can connect with a therapist later if you choose.',
      },
      {
        q: 'Is my data private and secure?',
        a: 'Yes. All your data is encrypted end-to-end, HIPAA compliant, and never used to train AI models. You control who has access and can delete everything at any time.',
      },
      {
        q: 'What about Android?',
        a: "We're currently iOS-only, but you can still journal via phone call or WhatsApp from any device! An Android app is in development.",
      },
      {
        q: 'How do I connect with my therapist?',
        a: 'If your therapist uses Empath, they can send you an invite. If not, you can journal privately and share your insights manually, or invite them to join Empath.',
      },
      {
        q: 'Can I export my journals?',
        a: 'Yes! You can export all your journals, insights, and data at any time. Your data belongs to you, always.',
      },
      {
        q: "What if I don't know what to write?",
        a: "You can chat your way into an entry. Empath's AI journaling assistant interviews you one gentle question at a time, then turns the whole conversation into a journal entry in your own voice. It's the easiest way past the blank page.",
        link: { text: 'Learn how chat journaling works', to: '/app/blog/chat-journaling' },
      },
      {
        q: 'Can Empath help me build a journaling habit?',
        a: "Yes. Set a Journaling Plan with a daily or weekly cadence, forgiving streaks that survive a missed day, and adaptive reminders by push or email that skip themselves once you've already journaled.",
        link: { text: 'See how to build a journaling plan that sticks', to: '/app/blog/journaling-plan' },
      },
    ] as Array<{ q: string; a: string; link?: { text: string; to: string } }>,
  },

  finalCta: {
    title: 'Your Next Journal Entry Is One Message Away',
    sub: 'No app to learn, no blank page to stare at. Just message or call the way you already do with a friend, and start seeing your patterns in days, not months.',
    downloadFree: 'Download Free on App Store',
    justSayHi: 'No app, no account. Just say hi',
    preferTyping: 'Prefer to type? Open the web dashboard →',
    noCreditCard: 'No credit card',
    freeForever: 'Free forever',
    fastSetup: '30 second setup',
  },

  footer: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    support: 'Support',
  },

  floating: {
    downloadFree: 'Download Free',
    text: 'Text to journal',
    call: 'Call',
    webApp: 'Web app',
  },
};

export type JournalingCopy = typeof journalingEn;
