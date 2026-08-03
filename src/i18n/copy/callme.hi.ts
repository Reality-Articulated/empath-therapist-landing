// Hindi (hi) copy catalog for the /call-me funnel page.
// Mirrors the exact shape of callme.en.ts — `CallMeCopy` enforces key parity
// at compile time. Values only are translated; keys, {phone} tokens, brand
// names and booleans are unchanged. Strings ending in Pre/Post are sentence
// halves around a phone-number link.

import type { CallMeCopy } from './callme.en';

export const callmeHi: CallMeCopy = {
  seo: {
    title: 'Empath आपको Call करता है — Phone से Journaling, बिना App के',
    description:
      'अपना नंबर डालिए और Empath आपको आपकी पहली voice journal entry के लिए call करेगा। बस बोलिए, call काटिए, और entry save हो गई। न app, न account, न typing।',
    keywords: 'phone से journal, voice journaling, phone journaling, बिना app के journaling, audio diary',
  },

  hero: {
    badge: 'न app. न account. न typing.',
    h1: 'आपकी पहली journal entry बस एक phone call दूर है.',
    sub: 'अपना नंबर डालिए और Empath आपको call करेगा। दो-चार मिनट अपने दिन के बारे में बात कीजिए, call काट दीजिए, और वो एक private journal entry बनकर save हो जाएगी — transcribe की हुई, title के साथ, जब चाहें तब पढ़ने के लिए तैयार।',
  },

  ringing: {
    title: 'अभी call आ रही है — उठाइए!',
    body: 'Hi बोलिए, अपने दिन के बारे में बात कीजिए, और जब मन भर जाए call काट दीजिए। आपकी entry अपने आप save हो जाएगी और हम आपको confirmation text भेज देंगे।',
    missedPre: 'Call छूट गई?',
    missedPost: 'पर कभी भी dial कर लीजिए — phone से journaling 24/7 चलती है।',
  },

  scheduled: {
    title: 'आपका call schedule हो गया!',
    bodyPre: 'Empath आपको',
    bodyPost: 'पर call करेगा (आपके local time में)। Call उठाइए, अपने दिन के बारे में बात कीजिए, और हो जाए तो काट दीजिए।',
    cantWaitPre: 'इंतज़ार नहीं होता?',
    cantWaitPost: 'पर कभी भी dial कर लीजिए — phone से journaling 24/7 चलती है।',
  },

  form: {
    phoneLabel: 'आपका phone नंबर (US)',
    dialing: 'Call लगाई जा रही है…',
    callMeNow: 'अभी call करो',
    scheduleTimeLabel: 'समय चुनिए',
    localTimeNote: '(आपका local time)',
    scheduling: 'Schedule हो रहा है…',
    scheduleMyCall: 'मेरा call schedule करो',
    scheduleWindow: 'अभी से कम-से-कम 10 मिनट बाद, ज़्यादा-से-ज़्यादा 7 दिन तक।',
    orSchedule: 'या call बाद के लिए schedule करें',
    consent:
      'Call request करने पर आप इस नंबर पर Empath की ओर से एक automated call पाने के लिए सहमति देते हैं। सिर्फ़ US नंबर। Standard carrier rates लागू होंगे।',
    errorGeneric: 'Call नहीं लग पाई। थोड़ी देर में फिर से try कीजिए।',
    errorNetwork: 'कुछ गड़बड़ हो गई। आप हमेशा {phone} पर सीधे call कर सकते हैं।',
  },

  dialYourself: {
    pre: 'ख़ुद dial करना पसंद है?',
    post: 'पर call या text कीजिए — वही journal, कभी भी।',
  },

  how: {
    title: 'कैसे काम करता है',
    steps: [
      {
        title: 'Call उठाइए',
        text: 'कुछ ही seconds में आपका phone बजेगा। Empath अपना परिचय देगा और पूछेगा कि आप कैसा महसूस कर रहे हैं।',
      },
      {
        title: 'बस बोलिए',
        text: 'बड़बड़ाइए, दिल की भड़ास निकालिए, सोचिए — Empath सुनता है और धीरे से follow-up सवाल पूछता है। कोई prompt याद रखने की ज़रूरत नहीं।',
      },
      {
        title: 'Call काटिए, entry save',
        text: 'आपकी बातें एक private journal entry बन जाती हैं, और save होते ही आपको confirmation text मिल जाता है।',
      },
    ],
  },

  why: {
    title: 'उनके लिए journaling जो कभी journal नहीं करते',
    body: 'Journaling में सबसे मुश्किल होता है खाली page। Phone call में कोई खाली page नहीं होता — अपने दिन के बारे में बात करना तो आपको पहले से आता है। Empath पूछता है, आप जवाब देते हैं, और commute के तीन मिनट एक ऐसी entry बन जाते हैं जो आप कभी type नहीं करते।',
    encrypted: 'Entries encrypted रहती हैं। आपका journal सिर्फ़ आपका है।',
  },

  faq: {
    title: 'सवाल-जवाब',
    items: [
      {
        q: 'क्या मुझे app चाहिए?',
        a: 'नहीं। Call ही पूरा experience है — न download, न account, न password। बाद में अगर आप अपनी entries पढ़ना और mood insights देखना चाहें, तो free iOS app ठीक वहीं से शुरू होता है जहाँ आपके calls ख़त्म हुए थे।',
      },
      {
        q: 'क्या सच में कोई इंसान call करता है?',
        a: 'ये Empath का AI journaling companion है — वही जो हमारे call-anytime नंबर के पीछे है। ये सुनता है, सोच-समझकर सवाल पूछता है, और बातचीत को एक लिखी हुई entry में बदल देता है।',
      },
      {
        q: 'क्या मेरा journal private है?',
        a: 'हाँ। Entries encrypted रहती हैं और सिर्फ़ आपकी हैं। हम आपका data कभी नहीं बेचते।',
      },
      {
        q: 'कितना खर्च आएगा?',
        a: 'आपकी पहली entries free हैं — न card चाहिए, न कोई trial cancel करना है। Calling Empath का हिस्सा है, और एक आम phone call के standard carrier rates लागू होते हैं।',
      },
    ],
    readBackPrompt: 'अपनी entries वापस पढ़ना चाहते हैं?',
    appStoreCta: 'App Store से Empath डाउनलोड करें',
  },

  footer: {
    privacy: 'Privacy',
    terms: 'Terms',
  },
};
