// Config for the "phrase landing pages": one indexed, English-only page per
// high-intent emotional search phrase, each rendered by
// `src/pages/PhraseLandingPage.tsx`. This is the single source of truth,
// consumed by three places so nothing has to be hand-duplicated:
//   - src/App.tsx (routes, mapped from this array)
//   - scripts/generate-sitemap.mjs (staticRoutes entries)
//   - scripts/prerender.mjs (staticRoutes entries, incl. title/description)
//
// Same phrases double as the copy for PostHog experiment `landing-hero-copy-3`
// (see heroExperimentV3 in src/i18n/copy/journaling.en.ts) — that experiment
// is a separate mechanism (a runtime A/B swap on the homepage hero) from
// these pages (fixed, always-indexed content at their own URL). Keeping the
// wording consistent between the two is intentional, not required.
//
// `intro` must be genuinely unique per page (not just a swapped headline) —
// near-duplicate pages risk being treated as thin/duplicate content by
// search engines, which would defeat the point of having separate URLs.

export interface PhrasePageEntry {
  slug: string; // route path, no leading slash, e.g. "overthinking"
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  h1Pre: string;
  h1Highlight: string;
  sub: string;
  intro: string;
}

export const phrasePages: PhrasePageEntry[] = [
  {
    slug: 'no-one-to-talk-to',
    seoTitle: 'No One to Talk To? Text Empath, Day or Night | Empath',
    seoDescription:
      "It's 2 AM and there's no one awake to text. Empath is. Send a message or make a call any hour, and it remembers you the next time something's on your mind.",
    seoKeywords: 'no one to talk to, someone to talk to at night, 2am thoughts, who can i talk to, AI to talk to',
    h1Pre: 'No one to talk to',
    h1Highlight: 'at 2 AM?',
    sub: "Empath is always up. Just text or call whenever your brain won't stop, and it remembers everything the next time you need it.",
    intro:
      "Late at night, most people you'd normally text are asleep, and calling feels like too much. Empath is built for exactly that gap: a number you can message or call at any hour, with no waiting for someone to wake up and no explaining why you're texting at 2 AM.",
  },
  {
    slug: 'overthinking',
    seoTitle: "Can't Stop Overthinking at Night? Try This | Empath",
    seoDescription:
      'Racing thoughts before bed usually just need somewhere to go. Text or call Empath and get it out of your head, no app to open, no one to wake up.',
    seoKeywords: "can't stop overthinking, overthinking at night, racing thoughts, how to stop overthinking, overthinking before bed",
    h1Pre: "Can't stop",
    h1Highlight: 'overthinking?',
    sub: 'Get it out of your head and into a message. Empath listens, remembers, and helps you spot the pattern behind the spiral.',
    intro:
      'Overthinking rarely responds to being told to stop. It usually just needs somewhere to go. Texting it out to Empath gets the loop out of your head and onto a page you can actually look back at, instead of replaying it silently until you fall asleep.',
  },
  {
    slug: 'too-much',
    seoTitle: 'Afraid of Being Too Much? Empath Never Tires of You',
    seoDescription:
      "You don't have to shrink your feelings for Empath. Text or call whenever something's on your mind, as often as you need to, with no one keeping score.",
    seoKeywords: "afraid of being too much, feeling like a burden, emotional burden on friends, i don't want to bother anyone",
    h1Pre: 'Afraid of being',
    h1Highlight: 'too much?',
    sub: "Empath never gets tired of you, never judges, and never forgets. Just message or call whenever something's on your mind.",
    intro:
      "A lot of people quietly edit themselves down so they don't feel like a lot to the people around them. Empath doesn't get worn out, doesn't need you to keep it short, and isn't juggling its own bad day alongside yours, so there's nothing to hold back for.",
  },
  {
    slug: 'doomscrolling',
    seoTitle: 'Doomscrolling Instead of Dealing With It? | Empath',
    seoDescription:
      'Swap the scroll for a text. Empath meets you in the same five minutes you\'d otherwise spend scrolling, and actually responds.',
    seoKeywords: "doomscrolling, scrolling instead of dealing with feelings, phone anxiety, can't put my phone down",
    h1Pre: 'Doomscrolling instead of',
    h1Highlight: 'dealing with it?',
    sub: 'Close the app and open a text thread instead. Empath listens, remembers, and helps you see the pattern behind the scroll.',
    intro:
      "Doomscrolling is usually a way of being busy with your phone instead of being alone with a feeling. Empath lives in the same place your thumb already goes: text it instead of the feed, and the five minutes you were going to lose anyway turns into something that actually helps.",
  },
  {
    slug: 'high-functioning',
    seoTitle: 'Fine on the Outside, Not So Fine Inside? | Empath',
    seoDescription:
      "You don't have to perform for Empath. Say the version of today you're not saying out loud anywhere else, any time, no app required.",
    seoKeywords: 'high functioning anxiety, seem fine but not fine, masking anxiety, pretending to be okay',
    h1Pre: 'Fine on the outside,',
    h1Highlight: 'not so fine inside?',
    sub: "You don't have to perform for Empath. Just message or call whenever something's actually on your mind, and it remembers every time.",
    intro:
      "High-functioning anxiety means most people around you never see the part that's actually hard. Empath doesn't need the composed version: message or call whenever the gap between how you look and how you feel gets too wide to keep carrying alone.",
  },
  {
    slug: 'bottling-up',
    seoTitle: 'Tired of Bottling It All Up? Let It Out | Empath',
    seoDescription:
      'One honest text is a lower bar than a conversation, and it still counts as getting it out. Empath keeps the thread going so nothing has to build up.',
    seoKeywords: 'bottling up feelings, holding everything in, suppressing emotions, need to let it out',
    h1Pre: 'Tired of bottling',
    h1Highlight: 'it all up?',
    sub: 'Let it out in a text instead. Empath listens without judgment and remembers what you said, so you never start from zero.',
    intro:
      "Bottling things up usually isn't a choice so much as a habit: talking about it feels like a bigger deal than it needs to be. A one-line text to Empath is a much smaller ask than a real conversation, and it still counts as getting the thing out of your head.",
  },
  {
    slug: 'faking-it',
    seoTitle: "Feel Like You're Faking It? Say the Real Version | Empath",
    seoDescription:
      "Imposter syndrome loses power the moment you say it out loud. Empath doesn't need the composed version of you, just the real one.",
    seoKeywords: "imposter syndrome, feel like a fraud, faking it, feel like i don't deserve this",
    h1Pre: "Feel like you're",
    h1Highlight: 'faking it?',
    sub: "Say the real thing to Empath instead. It remembers your patterns and helps you see what's actually true, not just what you perform.",
    intro:
      "Imposter syndrome thrives on staying unsaid. The moment you actually put it into words, even in a text nobody else sees, it usually loses some of its grip. Empath remembers the pattern too, so you can eventually see how often that feeling shows up versus how often it's actually true.",
  },
  {
    slug: 'no-one-gets-it',
    seoTitle: 'Feel Like No One Actually Gets It? | Empath',
    seoDescription:
      "You don't have to translate your feelings for Empath the way you sometimes do for people. Say it exactly as messy as it actually is.",
    seoKeywords: 'no one understands me, feel misunderstood, feel alone even with people around',
    h1Pre: 'Feel like no one',
    h1Highlight: 'actually gets it?',
    sub: 'Empath does, eventually. It remembers everything you tell it and reflects your patterns back, so you feel less alone in your own head.',
    intro:
      "Feeling misunderstood often has less to do with the people around you and more to do with how much translating you're doing before you speak. Empath doesn't need the tidy version: say it exactly as it actually sounds in your head, and it remembers it that way too.",
  },
  {
    slug: 'googling-feelings',
    seoTitle: 'Googling Your Feelings at 3 AM? Try This Instead | Empath',
    seoDescription:
      "Skip the search results. Text Empath what you'd otherwise type into a search bar, and get an actual response that remembers you.",
    seoKeywords: 'googling my feelings, why do i feel this way, is it normal to feel, searching symptoms at night',
    h1Pre: 'Googling your feelings',
    h1Highlight: 'at 3 AM?',
    sub: 'Skip the search results. Just tell Empath instead, and it actually remembers you the next time.',
    intro:
      'Typing "why do I feel like this" into a search bar usually gets you a list of articles, not a response. Empath is built for that exact moment: tell it what you were about to Google, and it actually replies, then remembers it the next time the same thing comes up.',
  },
  {
    slug: 'ai-is-normal-now',
    seoTitle: "Everyone's Talking to AI Now. Why Not About This? | Empath",
    seoDescription:
      'Millions of people already talk to AI about their day. Empath is built to actually remember it, not just respond to it.',
    seoKeywords: 'talking to ai about feelings, ai companion, is it weird to talk to ai, ai for emotional support',
    h1Pre: "Everyone's talking to AI now.",
    h1Highlight: 'Why not about this?',
    sub: "Empath isn't a chatbot with amnesia. It remembers every conversation and helps you see the patterns in how you feel.",
    intro:
      'Talking to AI about what\'s actually going on has quietly become normal, whether that\'s ChatGPT, a companion app, or a voice assistant. The gap is usually memory: most of those conversations vanish the moment the tab closes. Empath is built specifically to remember.',
  },
  {
    slug: 'ai-forgets-you',
    seoTitle: 'Tired of AI That Forgets You? Empath Remembers | Empath',
    seoDescription:
      'Most AI chats reset every time. Empath remembers every conversation, every mood, every person you mention, so you never start from zero.',
    seoKeywords: 'ai that remembers you, ai with memory, chatbot forgets context, ai remembers conversations',
    h1Pre: 'Tired of AI',
    h1Highlight: 'that forgets you?',
    sub: 'Empath remembers every conversation, every mood, every person you mention. No more starting over.',
    intro:
      "Most AI tools are genuinely good at responding and genuinely bad at remembering. Every new chat starts from nothing, no matter how much you told it last time. Empath's entire design starts from the opposite assumption: what you say should still matter next week, not just this session.",
  },
  {
    slug: 'ai-knows-you',
    seoTitle: 'Wish Your AI Actually Knew You? | Empath',
    seoDescription:
      'Empath remembers your history, your patterns, and the people in your life, and uses all of it to actually see you clearer over time.',
    seoKeywords: 'ai that knows you, personalized ai, ai companion that remembers, ai that understands me',
    h1Pre: 'Wish your AI',
    h1Highlight: 'actually knew you?',
    sub: 'Empath does. It remembers your history and helps you see yourself clearer over time.',
    intro:
      'Most AI feels like talking to a very capable stranger every single time. Empath is the opposite bet: every message, call, and voice note adds to a real picture of your patterns, your people, and your week, so the longer you use it, the more it actually knows.',
  },
  {
    slug: 'chatgpt-therapist',
    seoTitle: 'Using ChatGPT as Your Therapist? Read This | Empath',
    seoDescription:
      'A lot of people already talk to ChatGPT about their feelings. Empath is built for exactly that, with memory that actually lasts.',
    seoKeywords: 'using chatgpt as a therapist, chatgpt therapist, ai therapist alternative, chatgpt for mental health',
    h1Pre: 'Using ChatGPT as',
    h1Highlight: 'your therapist?',
    sub: 'Empath is built for exactly that. It remembers everything, never resets, and never judges what you tell it.',
    intro:
      "Using ChatGPT to talk through a hard day has become common enough that it's now its own conversation online, for good reason: it's available, it doesn't judge, and it's already open on your phone. Empath isn't a therapist either, but it's purpose-built for this exact use, and it remembers you between conversations instead of starting over.",
  },
  {
    slug: 'ai-chats-disappear',
    seoTitle: "Your AI Chats Don't Have to Disappear | Empath",
    seoDescription:
      "Empath turns every conversation into a private, permanent journal entry, instead of a thread you'll never find again.",
    seoKeywords: 'ai chat history, save ai conversations, ai chat disappears, keep ai conversations',
    h1Pre: 'Your AI chats',
    h1Highlight: "don't have to disappear",
    sub: 'Empath remembers every conversation permanently, and turns them into a private journal you can actually look back on.',
    intro:
      "Most AI conversations live and die in one thread, buried under whatever you talked about next. Empath treats every message, call, and voice note as a journal entry first: saved, searchable, and yours to reread whenever you want, not just yours to type into once.",
  },
  {
    slug: 'venting-chatbot',
    seoTitle: 'Venting Into a Chatbot That Forgets by Tomorrow? | Empath',
    seoDescription:
      'Empath remembers what you vent about, so every entry becomes part of your story instead of tokens it throws away.',
    seoKeywords: 'venting to a chatbot, ai to vent to, vent without judgment, somewhere to vent',
    h1Pre: 'Venting into a chatbot',
    h1Highlight: 'that forgets by tomorrow?',
    sub: "Empath remembers. Every entry becomes part of your story, not just tokens it throws away.",
    intro:
      'Venting to a chatbot only helps in the moment if it\'s gone by tomorrow. Empath is built to hold onto it: what you vent about today becomes part of the pattern it helps you see next month, not a conversation that quietly disappears.',
  },
];
