// Master (English) copy catalog for the /call-me funnel page. Same contract
// as journaling.en.ts: locale files mirror this shape (compile-checked via
// CallMeCopy), PURE DATA ONLY (transpile-loaded by the build scripts).
// Strings with a phone-number link in the middle are split into pre/post
// halves around the anchor. Same register rules as the landing catalog
// (warm consumer voice; "no sign-up", never "no account").

export const callmeEn = {
  seo: {
    title: 'Empath Calls You — Journal by Phone, No App Needed',
    description:
      "Enter your number and Empath calls you for your first voice journal entry. Talk it out, hang up, and it's saved. No app, no account, no typing.",
    keywords: 'journal by phone, voice journaling, phone journaling, journaling without an app, audio diary',
  },

  hero: {
    badge: 'No app. No account. No typing.',
    h1: 'Your first journal entry is a phone call away.',
    sub: 'Enter your number and Empath calls you. Talk about your day for a couple of minutes, hang up, and it’s saved as a private journal entry — transcribed, titled, and waiting whenever you want it.',
  },

  ringing: {
    title: 'Calling you now — pick up!',
    body: 'Say hi, talk about your day, and hang up whenever you’re done. Your entry saves automatically and we’ll text you a confirmation.',
    missedPre: 'Missed it? Dial',
    missedPost: 'any time — journaling by phone works around the clock.',
  },

  scheduled: {
    title: 'You’re on the calendar!',
    bodyPre: 'Empath will call you on',
    bodyPost: '(your local time). Pick up, talk about your day, and hang up when you’re done.',
    cantWaitPre: 'Can’t wait? Dial',
    cantWaitPost: 'any time — journaling by phone works around the clock.',
  },

  form: {
    phoneLabel: 'Your phone number (US)',
    dialing: 'Dialing…',
    callMeNow: 'Call me now',
    scheduleTimeLabel: 'Pick a time',
    localTimeNote: '(your local time)',
    scheduling: 'Scheduling…',
    scheduleMyCall: 'Schedule my call',
    scheduleWindow: 'At least 10 minutes from now, up to 7 days out.',
    orSchedule: 'Or schedule the call for later',
    consent:
      'By requesting a call you agree to receive a single automated call from Empath at this number. US numbers only. Standard carrier rates apply.',
    errorGeneric: "We couldn't place the call. Please try again in a moment.",
    errorNetwork: 'Something went wrong. You can always dial {phone} directly.',
  },

  dialYourself: {
    pre: 'Prefer to dial yourself? Call or text',
    post: '— same journal, any time.',
  },

  how: {
    title: 'How it works',
    steps: [
      {
        title: 'Pick up',
        text: 'Your phone rings within seconds. Empath introduces itself and asks how you’re feeling.',
      },
      {
        title: 'Just talk',
        text: 'Ramble, vent, reflect — Empath listens and gently asks follow-up questions. No prompts to memorize.',
      },
      {
        title: 'Hang up, it’s saved',
        text: 'Your words become a private journal entry, and you get a text confirming it’s saved.',
      },
    ],
  },

  why: {
    title: 'Journaling for people who never journal',
    body: 'The hardest part of journaling is the blank page. A phone call has no blank page — you already know how to talk about your day. Empath asks, you answer, and three minutes on your commute becomes an entry you’d never have typed.',
    encrypted: 'Entries are encrypted at rest. Your journal belongs to you.',
  },

  faq: {
    title: 'Questions',
    items: [
      {
        q: 'Do I need the app?',
        a: 'No. The call is the whole experience — no download, no account, no password. If you later want to read your entries back and see mood insights, the free iOS app picks up right where your calls left off.',
      },
      {
        q: 'Is it really a person calling?',
        a: 'It’s Empath’s AI journaling companion — the same one behind our call-anytime number. It listens, asks thoughtful questions, and turns the conversation into a written entry.',
      },
      {
        q: 'Is my journal private?',
        a: 'Yes. Entries are encrypted at rest and belong to you. We never sell your data.',
      },
      {
        q: 'What does it cost?',
        a: 'Your first entries are free — no card, no trial to cancel. Calling is part of Empath, and standard carrier rates for a regular phone call apply.',
      },
    ],
    readBackPrompt: 'Want to read your entries back?',
    appStoreCta: 'Get Empath on the App Store',
  },

  footer: {
    privacy: 'Privacy',
    terms: 'Terms',
  },
};

export type CallMeCopy = typeof callmeEn;
