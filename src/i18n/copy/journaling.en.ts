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
    title: 'Empath: AI Journal & Mood Tracker with Deeper Insights and an AI Companion',
    description: 'Empath is an AI-powered journal and mood tracker. Journal by WhatsApp, Telegram, phone call, or in the app. Get Deeper Insights, mood analysis, people mentions, a journal map, day colors, weather on every entry, and an AI companion you can chat with any time.',
    keywords: 'AI journal app, AI diary, mood tracker app, mood analysis, deeper insights, journal map, day colors, mood journal with weather, location mood tracking, people mentions journal, AI companion, AI chat journal, voice journaling, WhatsApp journal, Telegram journal, journaling by phone call, journaling habit tracker, AI that remembers you, using chatgpt as a therapist',
  },

  header: {
    features: 'Features',
    howItWorks: 'How It Works',
    faq: 'FAQ',
    blog: 'Blog',
    therapists: 'For Therapists',
    download: 'Download',
  },

  hero: {
    h1Pre: 'The journal you',
    h1Highlight: "won't quit.",
    sub: 'Empath is an AI-powered journal and mood tracker. Type, talk, or message your entries. Empath remembers every one, shows you the patterns in your moods, and doubles as an AI companion you can chat with any time.',
    mobileLead: 'Start your first entry. Just call or send a message.',
    call: 'Call',
    text: 'Text',
    orFavoriteApp: "Or use the app you're already in",
    phoneMeta: 'Available 24/7 • Every message lands in your app',
    wantInsights: 'The app is where it all comes together',
    getApp: 'Get the Free App',
    appBenefits: 'Deeper Insights, mood analysis, people mentions, a journal map, day colors, weather on every entry, and an AI companion that knows it all',
    desktopLead: 'Start your first entry right now. Message or call Empath like you\'d text a friend.',
    textToJournal: 'Text your thoughts',
    callAndTalk: 'Call & just talk',
    textUsAt: 'Text us at',
    callUsAt: 'Call us at',
    availability: 'Available 24/7 • Free • Works from any phone',
  },

  trust: {
    hipaa: 'HIPAA Secure',
    ai: 'AI-Powered Insights',
    loved: 'Loved by Thousands',
  },

  // Interactive "try it right here" demo (TryEmpathDemo): the visitor drives
  // an Empath-styled chat mock with hardcoded buttons. Each branch = opener button →
  // user message → Empath reply, then two follow-up buttons, then the CTA
  // deep-links into WhatsApp with the branch's `userText` prefilled.
  // `option` labels stay short (they're buttons); `userText` is the visitor's
  // casual lowercase register; replies are warm but plain, never clinical.
  tryIt: {
    badge: 'Try it right here',
    title: 'Go On, Send It Something',
    sub: 'A small taste of Empath on this page. Tap a message, watch it reply. Nothing you tap here is saved or sent anywhere.',
    greeting: "Hey, I'm Empath 👋 I'm the AI you text like a friend. Pick a message below and see what happens.",
    pickPrompt: 'Send Empath a message:',
    followUpPrompt: 'Keep it going:',
    branches: [
      {
        key: 'rough-day',
        option: 'I had a rough day',
        userText: "today was a lot. i'm wiped and my brain won't switch off",
        reply: "That sounds heavy. Wiped but wired is the worst combo. What's the one thing from today still taking up the most space?",
        followUps: [
          {
            key: 'work',
            option: 'Work stuff, mostly',
            userText: 'work stuff mostly. too many things, not enough me',
            reply: "So it's volume, not one disaster. That's worth knowing about yourself. If we talked for real, I'd remember this pattern and flag it next time work stacks up like this.",
          },
          {
            key: 'person',
            option: "It's a person, actually",
            userText: "it's a person actually. someone got under my skin today",
            reply: "People stuff lingers longer than task stuff. If you told me who, I'd remember them next time they come up, and you'd start seeing how they affect your days.",
          },
        ],
      },
      {
        key: 'untangle',
        option: 'Help me untangle something',
        userText: "can i think out loud for a sec? something's been bugging me for days",
        reply: "That's literally what I'm for. Out loud is how tangles loosen. Give me the messy version, it doesn't need to make sense.",
        followUps: [
          {
            key: 'decision',
            option: "It's a decision I keep avoiding",
            userText: "it's a decision i keep putting off. both options feel wrong",
            reply: "When both options feel wrong, there's usually a third thing you're protecting. In a real chat I'd ask about that, and save the whole thread so you could reread it when you're ready to decide.",
          },
          {
            key: 'feeling',
            option: "It's a feeling I can't name",
            userText: "honestly it's more of a feeling. i can't even name it",
            reply: "You don't have to name it. Describe where it shows up instead: mornings? after certain people? Naming comes later, and I'd keep track of the clues with you.",
          },
        ],
      },
      {
        key: 'first-time',
        option: "I've never journaled before",
        userText: "i've never journaled before. i don't really know how this works",
        reply: "You just did. That message? That's journaling, the way it works here. No rules, no format, no streaks to keep alive. Just say things when you feel them.",
        followUps: [
          {
            key: 'what-happens',
            option: 'What happens to what I send?',
            userText: 'ok but what happens to what i send you?',
            reply: 'It becomes a private journal entry: saved, encrypted, only yours. Over time I connect the dots between entries and show you patterns you can actually see.',
          },
          {
            key: 'wont-stick',
            option: "I doubt I'll stick with it",
            userText: "honestly i doubt i'll stick with it. i never do",
            reply: "You don't stick with apps. This lives in your texts, so there's nothing to stick with. Miss a week? Nothing breaks. I'll be here when something's on your mind.",
          },
        ],
      },
      {
        key: 'cant-sleep',
        option: "I can't sleep",
        userText: "it's late and i can't sleep. my head keeps replaying today",
        reply: "Late-night replays mean something from today still wants attention. Tell me the scene your head keeps going back to, and I'll hold onto it so you don't have to.",
        followUps: [
          {
            key: 'conversation',
            option: 'A conversation I had',
            userText: "a conversation from earlier. i keep thinking of better things i could've said",
            reply: "The perfect comeback always shows up after midnight. Writing it here gets it out of the loop, and in a real entry I'd remember it so you could reread it tomorrow with fresh eyes.",
          },
          {
            key: 'tomorrow',
            option: 'Tomorrow is stressing me out',
            userText: "honestly it's tomorrow i'm worried about. big day",
            reply: "Night-before nerves usually mean it matters, not that you're not ready. In a real chat I'd save this, and tomorrow night you could tell me how it actually went. Spoiler: usually better than the 2 AM version.",
          },
        ],
      },
      {
        key: 'vent',
        option: 'I just need to vent',
        userText: "i don't want advice right now. i just need to let something out",
        reply: "Then no advice. This space is yours: say it as loud and unfair and messy as you need. I'll just listen.",
        followUps: [
          {
            key: 'really-listen',
            option: "You'll really just listen?",
            userText: "you'll really just listen? no fixing?",
            reply: "Really. Venting works because saying it out loud takes the pressure off. If you ever want more than listening, you ask first. That's the deal.",
          },
          {
            key: 'feels-petty',
            option: 'It feels kind of petty',
            userText: "it's kind of petty tbh. but it's been bugging me all day",
            reply: "If it's been bugging you all day, it's not petty, it's data. The small stuff you never say out loud is usually where the patterns hide.",
          },
        ],
      },
      {
        key: 'good-news',
        option: 'Something good happened!',
        userText: 'ok so something actually good happened today and i have nobody to tell',
        reply: 'Tell me everything. Good moments deserve to be kept, not just survived-past. What happened?',
        followUps: [
          {
            key: 'small-win',
            option: "It's a small win but it's mine",
            userText: "it's a small win but it's mine. i finally did the thing",
            reply: "Small wins are the ones that compound. Saved, with today's date on it. On a rough day I'd remind you: you're someone who does the thing.",
          },
          {
            key: 'why-record',
            option: 'Why journal the good days?',
            userText: 'is it even worth journaling when things are fine?',
            reply: "The good entries are the ones future-you rereads most. They're also how I learn what actually lifts you, so the patterns aren't just about what goes wrong.",
          },
        ],
      },
    ],
    ctaLead: 'That was the demo. The real Empath remembers you.',
    cta: 'Get the Free App',
    ctaNote: 'Free on the App Store. Every entry feeds the Deeper Insights, mood analysis, and people mentions shown around this demo.',
    restart: 'Try another opener',
    screenshotAlt: 'Screenshot of the Empath app',
  },

  whatsappSection: {
    badge: 'Empath in your DMs',
    title: 'More Than a Place to Vent',
    sub: "A 2 AM spiral, a voice note you're too tired to type, a rough day. You send it like you'd text a friend. Empath listens, asks the follow-up a friend would, and remembers what you said last Tuesday: all of it saved privately, just for you.",
    cta: 'Chat on WhatsApp',
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
        caption: "It remembers what you're trying to do better.",
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
          { from: 'user', text: "wait so i can just text this number whatever's on my mind? no app?", time: '9:14 AM' },
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
      typing: 'typing…',
      inputPlaceholder: 'Message',
    },
  },

  crossChannel: {
    badge: 'One memory, every app',
    title: 'Start Anywhere. Continue Everywhere.',
    sub: 'Empath lives wherever you already are. Talk it out tonight, ask about it on WhatsApp over coffee, dig deeper on Telegram after work, close the loop from Instagram while you scroll. Every channel talks to the same Empath, with the same memory.',
    pickApp: "Pick whichever app you're already in",
    journalStep: {
      time: 'Tuesday 9:41 PM',
      channel: 'Voice entry',
      cardTitle: 'Night before the presentation',
      cardSub: 'Voice entry · 2 min',
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
    /** aria-label prefix: "Chat on WhatsApp" */
    journalOn: 'Chat on',
    /**
     * Prefilled first message for chat deep links (wa.me ?text=). Written in
     * the user's casual lowercase register — it appears in THEIR compose box.
     * The session ref code is appended by code as " #CODE"; keep this short.
     */
    prefill: "hey, can i really just text you whatever's on my mind?",
  },

  // Desktop-only QR block under the hero CTAs (phones scan these).
  qr: {
    onPhone: 'On your phone?',
    whatsapp: 'Scan to chat on WhatsApp',
    appStore: 'Scan to get the app',
  },

  callsYou: {
    badge: 'New: Empath calls you',
    title: "Don't feel like dialing? We'll call you.",
    sub: "Type your number and your phone rings within seconds. Talk about your day like you would with a friend, hang up, and it's already saved to your private journal: transcribed, titled, and only yours. You can even schedule the call for later.",
  },

  callMeForm: {
    ringingTitle: '📞 Calling you now. Pick up!',
    ringingSub: "Talk about your day, hang up, and it's saved as your first entry.",
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
    body: "The moment a thought hits, fire off a message or voice note, or just call and talk it out. It's the same thing you'd do venting to a friend, except here it quietly becomes a private journal. No new app to learn, no blank page to face.",
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
    badge: 'Inside the app',
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
    patternsTitle: 'Deeper Insights',
    patternsBody: 'Empath reads across everything you\'ve written and writes up what it finds: triggers, cycles, and the connections between how you felt and what was going on.',
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
    badge: 'Mood analysis',
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
      { title: 'Daily Mood Tracking', desc: 'Automatic sentiment analysis from your entries' },
      { title: 'Correlation Analysis', desc: 'Discover what activities boost your mood' },
      { title: 'Location Analysis & Weather', desc: 'See how you feel at home, at work, and on grey days' },
      { title: 'Long-term Trends', desc: 'See your progress over weeks and months' },
      { title: 'Journal Map', desc: 'Every entry pinned to the place you wrote it' },
      { title: 'Day Colors', desc: 'Your last 30 days sorted into good days and hard days, with what showed up on each' },
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
    title: 'An AI That Actually Knows You',
    sub: 'Your personal AI companion knows your entire history. Ask questions, gain insights, and get personalized guidance anytime.',
    companionTitle: 'Your AI Companion',
    exchanges: [
      {
        q: '"Why do I always feel anxious on Mondays?"',
        a: 'Based on your entries, you tend to sleep less on Sunday nights and skip breakfast on Monday mornings. This pattern appears in 8 of your last 10 Monday entries.',
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
    title: 'Capture Anywhere. See It All in the App.',
    sub: 'No setup, no new habit to build. Just talk the way you already do with friends.',
    stepLabel: 'Step',
    steps: [
      {
        title: 'Message or Call',
        desc: "Whenever a thought or feeling shows up, WhatsApp, Telegram, or call Empath, just like you'd message a friend. No app, no account, no blank page.",
      },
      {
        title: 'Empath Captures It',
        desc: 'Every message and call lands in your private journal: transcribed, organized, and saved automatically. You just keep living your life.',
      },
      {
        title: 'Open the App for the Good Part',
        desc: 'Deeper Insights across your entries, mood analysis over weeks and months, a map of where you wrote, your days colored by how they went, the weather that day, the people who keep showing up, and an AI companion that has read all of it.',
      },
    ],
  },

  iosCallout: {
    kicker: 'The Empath app',
    title: 'Messaging Gets It In. The App Is the Experience.',
    body: 'Everything you capture lands here. Deeper Insights connect the dots across your entries, mood analysis shows what actually moves you, people mentions show who shapes your days, and your AI companion has read every word. A journal map pins each entry where you wrote it, day colors sort your month into good days and hard days, and the weather from that day sits beside every entry. Free on iPhone.',
    button: 'Download on App Store',
  },

  androidInterest: {
    kicker: 'Android app in development',
    title: 'On Android? We Have Not Forgotten You',
    body: 'You can already journal by call or WhatsApp from any phone. Leave your email and we will tell you the moment the Android app is ready.',
    placeholder: 'you@email.com',
    button: 'Keep me posted',
    success: "You're on the list. We'll email you when the Android app is ready.",
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

  // Objection-handling section: the worries that keep people from journaling
  // (with an AI, over chat), each voiced the way a visitor would think it,
  // answered plainly. Every claim here must stay consistent with the FAQ and
  // privacy copy elsewhere on the page. NOT testimonials; nothing here is
  // presented as a user quote.
  worries: {
    badge: 'You might be wondering',
    title: 'Honest Answers to Fair Worries',
    sub: "Sharing your inner world with an AI is a big ask. Here's what we'd want to know before typing a word.",
    items: [
      {
        worry: '"Who else can read what I send?"',
        title: 'Nobody. It stays yours.',
        body: 'Every entry is encrypted, HIPAA compliant, and never used to train AI models. You can export everything or delete it all at any time. Your journal has exactly one reader: you.',
      },
      {
        worry: '"I\'ve started five journals and quit them all."',
        title: 'This one has no blank page.',
        body: "You don't build a new habit, you borrow one you already have: texting. A one-line message or a voice note counts as a full entry, and Empath keeps the thread going so day two is easier than day one.",
      },
      {
        worry: '"I never know what to actually write."',
        title: "You don't have to know.",
        body: "Start with one honest sentence and Empath asks the gentle follow-up a friend would. Answer it or don't. Either way it becomes a real entry, written in your own voice.",
      },
      {
        worry: '"Talking to an AI about feelings seems… weird."',
        title: 'It feels like texting, honestly.',
        body: "No robot voice, no therapy script, no toxic positivity. It reads like a thoughtful friend who never gets tired of you at 2 AM. Weird for the first two messages, then surprisingly normal.",
      },
      {
        worry: '"I don\'t want to be a burden to anyone."',
        title: "You're not a burden here.",
        body: "Empath doesn't get tired, doesn't need you to be brief, and doesn't have its own bad day to bring into yours. Send as much as you need, whenever you need to.",
      },
      {
        worry: '"Honestly I just bottle things up instead."',
        title: 'This is somewhere to actually put it.',
        body: "You don't have to perform being fine. One honest text is enough to start, and Empath keeps the thread going so it never turns into a bigger blowup later.",
      },
      {
        worry: '"Isn\'t it kind of sad to use an AI instead of a real person?"',
        title: "It's not instead of. It's in between.",
        body: "Empath isn't a replacement for the people in your life or for therapy. It's just always awake, for the 2 AM moments and the small stuff that never makes it into a session.",
      },
      {
        worry: '"I seem fine to everyone. I don\'t want to break that."',
        title: "You don't have to keep performing here.",
        body: "Nobody sees what you send Empath. Say the version of today you're not saying out loud anywhere else.",
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
      {
        q: 'What if I have no one to talk to late at night?',
        a: "That's exactly what Empath is for. It's available 24/7 by text, WhatsApp, or call, so there's always somewhere to put what's on your mind, even at 3 AM.",
      },
      {
        q: 'Is it normal to Google your feelings instead of talking to someone?',
        a: "It's incredibly common, and it usually means you want to be heard, not just informed. Texting Empath instead gets you an actual response, and it remembers you the next time.",
      },
      {
        q: 'Can I use Empath instead of ChatGPT for journaling?',
        a: 'Yes, that\'s exactly what it\'s built for. Unlike a general AI chatbot, Empath remembers every conversation permanently and turns them into a private, searchable journal instead of a thread that resets.',
      },
      {
        q: 'Is it okay to use an AI instead of therapy?',
        a: "Empath isn't a therapist and isn't meant to replace one. It's a place to think out loud between sessions, or when you just need to say something and don't have anyone else awake.",
      },
      {
        q: "What if I always feel like I'm faking it?",
        a: "That feeling loses power the moment you say it out loud, even just in a text. Empath doesn't need the composed version. Say the real one.",
      },
      {
        q: 'Why do I keep bottling things up instead of talking about them?',
        a: 'Usually because talking feels like a bigger commitment than it needs to be. A one-line text to Empath is a much lower bar than a conversation, and it still counts as getting it out.',
      },
    ] as Array<{ q: string; a: string; link?: { text: string; to: string } }>,
  },

  finalCta: {
    title: "Whatever's On Your Mind, It's One Message Away",
    sub: 'Capture it by message or call, then open the app for the part that makes it Empath: Deeper Insights, mood analysis, and the people who shape your days.',
    downloadFree: 'Download Free on App Store',
    justSayHi: 'Just say hi',
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
    text: 'Text your thoughts',
    call: 'Call',
  },
};

// PostHog experiment `landing-hero-copy-3` (English only, per-locale
// translation intentionally skipped): swaps ONLY the hero H1,
// same mechanism as the retired v2 `heroExperiment`. Deliberately NOT a key
// on `journalingEn` / `JournalingCopy` — keeping it a standalone export means
// the other 6 locale catalogs never need to implement it. `control` carries
// forward the v2 winner ("tired of re-explaining to ChatGPT") as the v3
// anchor; JournalingPage falls back to `hero` (the true default) whenever
// locale isn't 'en' or the variant key doesn't match one of these.
export const heroExperimentV3: Record<string, { h1Pre: string; h1Highlight: string }> = {
  control: {
    h1Pre: 'Tired of re-explaining yourself',
    h1Highlight: 'to ChatGPT?',
  },
  'no-one-to-talk-to': {
    h1Pre: 'No one to talk to',
    h1Highlight: 'at 2 AM?',
  },
  overthinking: {
    h1Pre: "Can't stop",
    h1Highlight: 'overthinking?',
  },
  'too-much': {
    h1Pre: 'Afraid of being',
    h1Highlight: 'too much?',
  },
  doomscrolling: {
    h1Pre: 'Doomscrolling instead of',
    h1Highlight: 'dealing with it?',
  },
  'high-functioning': {
    h1Pre: 'Fine on the outside,',
    h1Highlight: 'not so fine inside?',
  },
  'bottling-up': {
    h1Pre: 'Tired of bottling',
    h1Highlight: 'it all up?',
  },
  'faking-it': {
    h1Pre: "Feel like you're",
    h1Highlight: 'faking it?',
  },
  'no-one-gets-it': {
    h1Pre: 'Feel like no one',
    h1Highlight: 'actually gets it?',
  },
  'googling-feelings': {
    h1Pre: 'Googling your feelings',
    h1Highlight: 'at 3 AM?',
  },
  'ai-is-normal-now': {
    h1Pre: "Everyone's talking to AI now.",
    h1Highlight: 'Why not about this?',
  },
  'ai-forgets-you': {
    h1Pre: 'Tired of AI',
    h1Highlight: 'that forgets you?',
  },
  'ai-knows-you': {
    h1Pre: 'Wish your AI',
    h1Highlight: 'actually knew you?',
  },
  'chatgpt-therapist': {
    h1Pre: 'Using ChatGPT as',
    h1Highlight: 'your therapist?',
  },
  'ai-chats-disappear': {
    h1Pre: 'Your AI chats',
    h1Highlight: "don't have to disappear",
  },
  'venting-chatbot': {
    h1Pre: 'Venting into a chatbot',
    h1Highlight: 'that forgets by tomorrow?',
  },
};

export type JournalingCopy = typeof journalingEn;
