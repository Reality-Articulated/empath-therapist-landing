// German copy catalog for the consumer landing page. Mirrors the exact shape
// of journaling.en.ts; the `JournalingCopy` type makes a missing key a
// compile error. PURE DATA ONLY (no JSX).

import type { JournalingCopy } from './journaling.en';

export const journalingDe: JournalingCopy = {
  seo: {
    title: 'Empath - Das Tagebuch, das du nicht aufgibst',
    description:
      'Es gibt eine Nummer, an die du einfach dein Tagebuch schreibst. Schick eine WhatsApp- oder Telegram-Nachricht, ruf an oder lass dich anrufen. Keine App, keine Registrierung, keine leere Seite. Aus deinen Einträgen werden Stimmungsmuster und Erkenntnisse, die du wirklich sehen kannst.',
    keywords:
      'Tagebuch per SMS, Sprachjournal, Journaling ohne App, Tagebuch schreiben per Handy, WhatsApp Tagebuch, Tagebuch per Anruf, Stimmungstracker, Chat Journaling, KI Journaling, Journaling Assistent, Journaling Plan, Journaling Gewohnheit aufbauen',
  },

  header: {
    features: 'Features',
    howItWorks: "So funktioniert's",
    faq: 'FAQ',
    blog: 'Blog',
    download: 'Download',
  },

  hero: {
    h1Pre: 'Das Tagebuch, das du',
    h1Highlight: 'nicht aufgibst.',
    sub: 'Weil es überall dabei ist: Schreib oder ruf einfach an, wenn dir etwas durch den Kopf geht. Empath hilft dir beim Journalen und beim Erkunden deiner Gedanken und zeigt dir mit der Zeit deine Muster.',
    mobileLead: 'Fang jetzt sofort an. Einfach anrufen oder eine Nachricht schicken.',
    call: 'Anrufen',
    text: 'Schreiben',
    orFavoriteApp: 'Oder journale in deiner Lieblings-App',
    phoneMeta: 'Rund um die Uhr erreichbar • Ohne Registrierung',
    wantInsights: 'Lust auf Stimmungstrends & Erkenntnisse?',
    getApp: 'Hol dir die Gratis-App',
    appBenefits: 'Stimmungskurven, Mustererkennung, Apple-Health-Sync',
    desktopLead: 'Fang jetzt an zu journalen, mit einem Anruf oder einer Nachricht. Keine App zum Runterladen, keine Registrierung.',
    textToJournal: 'Per SMS journalen',
    callAndTalk: 'Anrufen & einfach reden',
    textUsAt: 'Schreib uns unter',
    callUsAt: 'Ruf uns an unter',
    availability: 'Rund um die Uhr • Kostenlos • Funktioniert mit jedem Handy',
    preferTyping: 'Tippst du lieber am Rechner?',
    openDashboard: 'Web-Dashboard öffnen',
  },

  trust: {
    hipaa: 'HIPAA-sicher',
    ai: 'KI-gestützte Erkenntnisse',
    loved: 'Von Tausenden geliebt',
  },

  whatsappSection: {
    badge: 'Journaling in deinen DMs',
    title: 'So sieht das wirklich aus',
    sub: 'Ein Gedankenkarussell um 2 Uhr nachts, eine Sprachnachricht, weil du zu müde zum Tippen bist, ein mieser Tag. Du schickst es ab wie an eine gute Freundin. Empath hört zu, antwortet und speichert es still als Tagebucheintrag.',
    cta: 'Auf WhatsApp journalen',
    phoneNote: 'Oder schreib an {phone} über Telegram, Messenger oder Instagram. Beispiel-Unterhaltungen.',
    examples: [
      {
        key: 'late-night',
        title: 'Das Gedankenkarussell um 02:47',
        caption: 'Für wenn dein Kopf nicht abschaltet und alle schlafen.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'ich weiß, es ist spät. ich spiele ständig das gespräch mit meiner chefin durch und weiß nicht, ob ich überreagiert habe. wollte niemanden wecken, also erzähl ichs dir',
            time: '02:47',
          },
          {
            from: 'empath',
            text: 'Das musst du heute Nacht nicht klären. Dass du es immer wieder durchspielst, heißt meistens, dass es dir wichtig war und nicht, dass du überreagiert hast. Soll ich es dir bis morgen früh aufheben?',
            time: '02:47',
          },
          { from: 'user', text: 'heb es auf. danke', time: '02:48' },
          { from: 'empath', text: 'Immer. Es ist da, wenn du aufwachst. Versuch zu schlafen 💛', time: '02:48' },
        ],
      },
      {
        key: 'voice-note',
        title: 'Zu müde zum Tippen',
        caption: 'Schick eine Sprachnachricht. Da hört wirklich jemand zu.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          { from: 'user', voice: true, duration: '1:47', time: '23:12' },
          {
            from: 'empath',
            text: 'Langer Tag, das habe ich gehört. Drei Sachen vor Mittag, und trotzdem warst du beim Anruf mit deiner Schwester für sie da. Du hast zweimal gesagt, du hättest es „besser regeln müssen". Ganz sanft: Du hast es geregelt. Gespeichert.',
            time: '23:13',
          },
          { from: 'user', text: 'wie schaffst du es immer, dass sich alles machbar anhört', time: '23:14' },
          { from: 'empath', text: 'Weil du selbst die Geschichte erzählst. Gute Nacht.', time: '23:14' },
        ],
      },
      {
        key: 'mom',
        title: 'Das alltägliche schlechte Gewissen',
        caption: 'Ein Tagebuch, das sich merkt, woran du arbeitest.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'hab meine mutter heute wieder angeschnauzt und fühl mich schrecklich. sie hat nur nach der reise gefragt',
            time: '18:03',
          },
          {
            from: 'empath',
            text: 'Dass es dich so beschäftigt, zeigt, wie wichtig sie dir ist. Du bist seit Dienstag am Limit. Das Anschnauzen ist der Überlauf, nicht die Wahrheit darüber, wer du für sie bist. Habt ihr seitdem geredet?',
            time: '18:04',
          },
          { from: 'user', text: 'noch nicht. vielleicht morgen', time: '18:06' },
          { from: 'empath', text: 'Morgen ist gut. Ich merk mir, dass du das wolltest.', time: '18:06' },
        ],
      },
      {
        key: 'no-app',
        title: '„Moment, keine App?"',
        caption: 'Keine App. Keine Registrierung. Du schreibst einfach an die Nummer.',
        contactName: '+1 (888) 366-3082',
        unknownAvatar: true,
        messages: [
          { from: 'user', text: 'moment, ich schreib einfach an diese nummer und das ist mein tagebuch? ohne app?', time: '09:14' },
          {
            from: 'empath',
            text: 'Genau. Keine App, keine Registrierung, keine leere Seite, die dich anstarrt. Erzähl mir von deinem Tag, ein Satz reicht völlig.',
            time: '09:14',
          },
          { from: 'user', text: 'ok. ehrlich gesagt jetzt schon völlig erledigt und es ist 9 uhr morgens', time: '09:15' },
          { from: 'empath', text: 'Dann ist das der erste Eintrag für heute: gespeichert. Was kostet dich heute Morgen am meisten Energie?', time: '09:15' },
        ],
      },
    ],
    chatUi: {
      today: 'Heute',
      online: 'online',
      inputPlaceholder: 'Nachricht',
    },
  },

  crossChannel: {
    badge: 'Ein Tagebuch, jede App',
    title: 'Fang irgendwo an. Mach überall weiter.',
    sub: 'Empath ist da, wo du sowieso schon bist. Journale heute Abend, frag morgens beim Kaffee auf WhatsApp nach, geh nach der Arbeit auf Telegram tiefer rein, schließ den Kreis auf Instagram, während du scrollst. Jeder Kanal spricht mit demselben Tagebuch und demselben Gedächtnis.',
    pickApp: 'Nimm einfach die App, in der du eh gerade bist',
    journalStep: {
      time: 'Dienstag, 21:41',
      channel: 'Sprachjournal',
      cardTitle: 'Der Abend vor der Präsentation',
      cardSub: 'Sprachjournal · 2 Min.',
      quote:
        '„Ich gehe die Einleitung immer wieder durch. Was, wenn ich morgen vor allen einfach ein Blackout habe? Ich kenne das Material besser als alle im Team, aber mein Kopf will es nicht glauben …"',
    },
    steps: [
      {
        key: 'whatsapp',
        time: 'Mittwoch, 08:04',
        channel: 'WhatsApp',
        userMsg: 'morgen. war ich gestern nacht übertrieben dramatisch?',
        empathMsg:
          'Ein bisschen 💛 Du hast die Einleitung viermal geprobt. Aber du hast auch gesagt, dass du das Material besser kennst als alle anderen. Halt dich heute an dem Teil fest.',
      },
      {
        key: 'telegram',
        time: 'Mittwoch, 14:37',
        channel: 'Telegram',
        userMsg: 'präsentation vorbei, lief gut. warum drehe ich am abend davor jedes mal durch?',
        empathMsg:
          'Das ist die dritte Abend-davor-Spirale in deinem Tagebuch seit Mai, und alle drei Male lief es am nächsten Tag gut. Das Muster ist die Spirale, nicht das Scheitern.',
      },
      {
        key: 'instagram',
        time: 'Mittwoch, 23:20',
        channel: 'Instagram',
        userMsg: 'kann nicht schlafen. hab ein reel über impostor-syndrom gesehen und mich extrem ertappt gefühlt',
        empathMsg:
          'Kommt in den heutigen Eintrag. Und nur so nebenbei: Dein eigenes Tagebuch widerspricht dem Reel: Du liegst diesen Monat bei drei von drei.',
      },
    ],
  },

  channelRow: {
    /** aria-label prefix: "Journalen auf WhatsApp" */
    journalOn: 'Journalen auf',
  },

  callsYou: {
    badge: 'Neu: Empath ruft dich an',
    title: 'Keine Lust zu wählen? Wir rufen dich an.',
    sub: 'Gib deine Nummer ein und dein Handy klingelt innerhalb von Sekunden. Erzähl von deinem Tag, als würdest du mit Freunden telefonieren, leg auf, und es ist schon als Tagebucheintrag gespeichert: transkribiert, betitelt und privat. Du kannst den Anruf sogar für später planen.',
  },

  callMeForm: {
    ringingTitle: '📞 Wir rufen dich gerade an, geh ran!',
    ringingSub: 'Erzähl von deinem Tag, leg auf, und dein erster Tagebucheintrag ist gespeichert.',
    phoneAria: 'Deine Telefonnummer (USA)',
    dialing: 'Wird gewählt …',
    callMeNow: 'Ruf mich jetzt an',
    errorGeneric: 'Der Anruf hat leider nicht geklappt. Versuch es gleich noch einmal.',
    errorNetwork: 'Etwas ist schiefgelaufen. Du kannst jederzeit direkt {phone} anrufen.',
    disclaimer: 'Nur US-Nummern. Ein automatischer Anruf, Standardtarife.',
    scheduleLink: 'Für später planen oder mehr erfahren →',
  },

  feature1: {
    badge: 'WhatsApp, Telegram oder Anruf',
    title: 'Nutz die Apps, die du sowieso öffnest',
    body: 'Sobald dir ein Gedanke kommt, schick eine Nachricht oder Sprachnachricht, oder ruf einfach an und red dich frei. Genau das, was du beim Dampfablassen mit Freunden auch machst, nur dass hier ganz nebenbei dein Tagebuch daraus wird. Keine neue App zum Lernen, keine leere Seite.',
    items: [
      { title: 'KI-Transkription', desc: 'Perfekte Genauigkeit. Deine Worte, festgehalten genau so, wie du sie sagst.' },
      {
        title: 'Stimmanalyse',
        desc: 'Hör, wie du wirklich geklungen hast. Tonlage, Energie und Tempo aus jedem Sprachbeitrag.',
      },
      {
        title: 'Fotos & Scans',
        desc: 'Schick ein Foto und Empath liest es, handschriftliche Seiten inklusive, direkt in dein Tagebuch.',
      },
    ],
    mockVoiceTitle: 'Sprachjournal',
    mockVoiceTime: 'vor 2 Minuten',
    mockVoiceText:
      '„Hatte heute einen richtigen Durchbruch in der Therapie. Ich verstehe endlich, warum ich diesen schwierigen Gesprächen immer ausgewichen bin …"',
    mockPhotoLabel: 'Fotoanalyse',
    mockPhotoCaption: 'KI erkannte: Ruhige Umgebung im Freien, Spaziergang in der Natur, sonniger Tag',
  },

  feature2: {
    badge: 'KI-Intelligenz',
    title: '„Moment, seit wann fühle ich mich eigentlich so?"',
    sub: 'Öffne die App und frag einfach. Jede Nachricht, jeder Anruf, jeder Gedanke wird erinnert und in Sekunden wiedergefunden.',
    memoryTitle: 'Smarte Erinnerungssuche',
    memoryBody: 'Finde jeden Moment, jedes Gefühl, jede Erkenntnis. Unsere KI versteht Zusammenhänge und zeigt dir genau das, wonach du suchst.',
    memoryItems: [
      'Suche nach Gefühl, Thema oder Datum',
      'KI-gestütztes semantisches Verständnis',
      'Wichtige Momente sofort wiederfinden',
      'Dein Weg als Zeitleiste',
    ],
    patternsTitle: 'Mustererkennung',
    patternsBody: 'Entdecke Muster, die dir nie aufgefallen sind. Unsere KI erkennt Auslöser, Zyklen und Zusammenhänge in deinen Erlebnissen.',
    patternsItems: [
      'Emotionale Auslöser erkennen',
      'Verhaltensmuster verstehen',
      'Fortschritt über die Zeit verfolgen',
      'Persönliche Erkenntnisse & Vorschläge',
    ],
    peopleTitle: 'Menschen-Erkenntnisse',
    peopleBody:
      'Empath merkt, wer in deinen Einträgen immer wieder auftaucht und wie du dich dabei meist fühlst.',
    peopleItems: [
      'Alle Menschen, über die du schreibst, an einem Ort',
      'Die Gefühle, die bei jeder Person hochkommen',
      'Jede Erwähnung, bereit zum Nachlesen',
      'Jederzeit jemanden bearbeiten oder entfernen',
    ],
  },

  feature3: {
    badge: 'Analysen',
    title: 'Sieh, was deine Stimmung wirklich beeinflusst',
    body: 'Dir fallen Dinge auf wie „an Tagen mit Spaziergang bin ich glücklicher" oder „Deadlines auf der Arbeit treiben jeden Donnerstag meine Anspannung hoch". Deine Daten, einfach dargestellt.',
    mockTitle: 'Stimmungstrends',
    mockRange: 'Letzte 30 Tage',
    moods: [
      { label: 'Glücklich' },
      { label: 'Ruhig' },
      { label: 'Ängstlich' },
      { label: 'Traurig' },
    ],
    insightLabel: 'Erkenntnis',
    insightText: 'Deine Stimmung ist an Sporttagen 40 % besser. Wie wärs mit Morgenspaziergängen?',
    items: [
      { title: 'Tägliches Stimmungstracking', desc: 'Automatische Stimmungsanalyse aus deinen Einträgen' },
      { title: 'Zusammenhänge erkennen', desc: 'Finde heraus, welche Aktivitäten deine Stimmung heben' },
      { title: 'Orte & Wetter', desc: 'Sieh, wie du dich zu Hause, auf der Arbeit und an grauen Tagen fühlst' },
      { title: 'Langfristige Trends', desc: 'Sieh deinen Fortschritt über Wochen und Monate' },
    ],
  },

  feature4: {
    badge: 'Ganzheitliche Gesundheit',
    title: 'Versteh, warum du neben der Spur bist',
    sub: 'Empath liest deine Apple-Health-Daten und verbindet die Punkte. Schlecht geschlafen? Training ausgelassen? Du siehst genau, was deine Stimmung runterzieht.',
    cards: [
      {
        title: 'Aktivität & Bewegung',
        desc: 'Sieh, wie Bewegung deine Stimmung und dein Energielevel beeinflusst.',
        metrics: ['Schritte', 'Workouts', 'Aktive Minuten'],
      },
      {
        title: 'Schlaf & Erholung',
        desc: 'Verfolge deine Schlafqualität und ihre Wirkung auf deine mentale Klarheit.',
        metrics: ['Schlafdauer', 'Herzfrequenz', 'Blutdruck'],
      },
      {
        title: 'Tägliche Gewohnheiten',
        desc: 'Die kleinen Dinge im Alltag, die deine Stimmung leise verschieben.',
        metrics: ['Koffein', 'Wasseraufnahme', 'Tageslicht', 'Achtsamkeitsminuten'],
      },
    ],
    calloutTitle: 'Automatische Gesundheits-Erkenntnisse',
    calloutBody:
      'Empath liest zehn Kategorien aus Apple Health und analysiert sie zusammen mit deinen Einträgen und deckt starke Zusammenhänge auf. „Deine Anspannung sinkt um 35 % an Tagen mit mehr als 7 Stunden Schlaf." Solche Erkenntnisse helfen dir, bessere Entscheidungen zu treffen.',
  },

  feature5: {
    badge: 'KI-gestützt',
    title: 'Sprich mit deinem Tagebuch',
    sub: 'Dein persönlicher KI-Begleiter kennt deine ganze Geschichte. Stell Fragen, gewinn Erkenntnisse und hol dir jederzeit persönliche Impulse.',
    companionTitle: 'Dein KI-Begleiter',
    exchanges: [
      {
        q: '„Warum bin ich montags immer so angespannt?"',
        a: 'Laut deinem Tagebuch schläfst du sonntags meist weniger und lässt montags das Frühstück ausfallen. Dieses Muster taucht in 8 deiner letzten 10 Montagseinträge auf.',
      },
      {
        q: '„Was hilft mir, wenn ich gestresst bin?"',
        a: 'Dein wirksamster Stressausgleich: mit Freunden reden (23-mal erwähnt), spazieren gehen (18-mal) und Musik hören (15-mal).',
      },
    ],
    askTitle: 'Frag einfach alles',
    askItems: [
      'Muster in deinem Verhalten finden',
      'Deine Auslöser verstehen',
      'Merkt sich zwischen Einträgen, was wichtig ist',
      'Kennt deine Bio und die Menschen, über die du schreibst',
      'Bestimmte Erinnerungen abrufen',
      'Therapiesitzungen vorbereiten',
    ],
    privacyTitle: '100 % privat & sicher',
    privacyBody: 'Deine Gespräche sind verschlüsselt und werden nie zum Trainieren von KI-Modellen verwendet. Deine Privatsphäre hat für uns Priorität.',
  },

  featureGrid: {
    badge: 'Und der Rest',
    title: 'Alles Weitere in der App',
    sub: 'Die kleinen Dinge, die sie zu deiner machen.',
    items: [
      {
        title: 'Biometrische Tagebuchsperre',
        desc: 'Halte deine persönlichsten Einträge hinter Face ID oder Touch ID.',
      },
      {
        title: 'Tagebuch-Assistent',
        desc: 'Mitten im Eintrag hängen geblieben? Frag nach einem Impuls, einem Anstoß oder Hilfe bei den Worten.',
      },
      {
        title: 'Entdecke dich selbst',
        desc: 'Fragen aus deinen eigenen Einträgen, für die Tage, an denen du tiefer gehen willst.',
      },
      {
        title: 'Widgets auf dem Homescreen',
        desc: 'Stimmung mit einem Tipp festhalten und das Zitat des Tages lesen, ohne die App zu öffnen.',
      },
      {
        title: 'Deine Bio',
        desc: 'Erzähl Empath einmal deinen Kontext. Danach trifft jede Erkenntnis näher.',
      },
      {
        title: 'Passende alte Einträge',
        desc: 'Beim Lesen eines Eintrags tauchen die älteren auf, die dazu passen.',
      },
      {
        title: 'Import & Export',
        desc: 'Bring deine alten Tagebücher mit. Nimm jederzeit alles wieder mit.',
      },
      {
        title: 'Tagebuch ohne Netz',
        desc: 'Schreib ohne Signal. Es synchronisiert, sobald du wieder online bist.',
      },
    ],
  },

  feature6: {
    badge: 'Auch in Therapie?',
    title: 'Hol das Maximum aus jeder Sitzung',
    sub: 'Wenn du in Therapie bist, kann Empath deine Woche automatisch mit deiner Therapeut:in teilen. Kein „Also, was ist passiert?" mehr. Deine Sitzungen starten da, wo es zählt.',
    cardTitle: 'Gib deiner Therapeut:in Einblick in deine Gedankenwelt',
    cardBody:
      'Wenn du dich über Empath mit deiner Therapeut:in verbindest, entsteht ein vollständiges Bild deiner Woche, nicht nur das, was dir in der Sitzung gerade einfällt.',
    items: [
      {
        title: 'Zusammenfassungen vor der Sitzung',
        desc: 'Deine Therapeut:in liest vor jeder Sitzung eine KI-generierte Zusammenfassung. Keine Zeit mehr für Rückblicke.',
      },
      {
        title: 'Tiefere Einblicke',
        desc: 'Deine Therapeut:in erkennt Muster, die dir entgehen könnten, und bereitet gezielte Interventionen vor.',
      },
      {
        title: 'Schnellere Fortschritte',
        desc: 'Spar dir den Smalltalk. Steig ab Minute eins direkt in die eigentliche Arbeit ein.',
      },
    ],
    mockTitle: 'Wochenzusammenfassung',
    mockSub: 'Vorbereitet für deine Therapeut:in',
    mockMoodLabel: 'Stimmungsüberblick',
    mockMoodText:
      'Klient:in erlebte Mitte der Woche erhöhte Anspannung, zusammenhängend mit Deadlines auf der Arbeit. Deutliche Besserung nach der Therapiesitzung am Freitag.',
    mockMomentsLabel: 'Wichtige Momente',
    mockMoments: [
      'Dienstag: Durchbruch beim Erkennen von Beziehungsmustern',
      'Donnerstag: Neue Bewältigungsstrategien erfolgreich ausprobiert',
    ],
    mockFocusLabel: 'Vorgeschlagener Fokus',
    mockFocusText: 'Arbeitsbezogene Anspannungsmuster und die Beziehungserkenntnisse vom Dienstag vertiefen.',
    privacyTitle: 'Deine Privatsphäre, deine Kontrolle',
    privacyBody:
      'Du entscheidest, was du teilst und wann. Verbinde und trenne dich jederzeit von deiner Therapeut:in. Deine Daten gehören immer dir.',
    privacyBadges: ['HIPAA-konform', 'Ende-zu-Ende-verschlüsselt', 'Du kontrollierst den Zugriff', 'Jederzeit trennbar'],
  },

  howItWorks: {
    title: 'Festhalten per Nachricht oder Anruf. Reflektieren in der App.',
    sub: 'Kein Setup, keine neue Gewohnheit nötig. Journale so, wie du sowieso schon mit Freunden redest.',
    stepLabel: 'Schritt',
    steps: [
      {
        title: 'Schreiben oder anrufen',
        desc: 'Wenn ein Gedanke oder Gefühl auftaucht, schick Empath eine WhatsApp- oder Telegram-Nachricht, oder ruf an, ganz wie bei Freunden. Keine App, keine Registrierung, keine leere Seite.',
      },
      {
        title: 'Empath hält es fest',
        desc: 'Jede Nachricht und jeder Anruf wird zum Tagebucheintrag: automatisch transkribiert, sortiert und gespeichert. Du lebst einfach dein Leben weiter.',
      },
      {
        title: 'Öffne die App zum Reflektieren',
        desc: 'Wenn du zurückblicken, eine Erinnerung hervorholen oder deine Stimmungsmuster und Trends sehen willst, wartet in der App alles auf dich.',
      },
    ],
  },

  iosCallout: {
    kicker: 'iOS-App verfügbar',
    title: 'Lust zurückzublicken? Hol dir die App',
    body: 'Du journalst per Nachricht und Anruf. In der App liest du alles nach, durchsuchst alte Einträge und siehst, wie sich deine Stimmungsmuster entfalten.',
    button: 'Im App Store laden',
  },

  socialProof: {
    title: 'Was andere sagen',
    featured: 'Vom App Store empfohlen',
    testimonials: [
      {
        quote:
          'Ich habe 5 Journaling-Apps ausprobiert und jede wieder aufgegeben. Empath ist geblieben, weil ich einfach schreibe, wenn mir etwas durch den Kopf geht: keine App öffnen, keine leere Seite.',
        author: 'Alex M.',
        role: 'Dabei seit 2024',
      },
      {
        quote:
          'Empath hat mir gezeigt, dass ich jeden Sonntagabend vor der Arbeitswoche angespannt bin. In 3 Jahren Tagebuch auf Papier habe ich diese Verbindung nie gesehen.',
        author: 'Jordan K.',
        role: 'Dabei seit 2023',
      },
      {
        quote:
          'Ich liebe es, dass ich einfach anrufen und reden kann. Es fühlt sich so natürlich an, als hätte Journaling schon immer so einfach sein sollen.',
        author: 'Sam R.',
        role: 'Dabei seit 2024',
      },
    ],
  },

  faq: {
    title: 'Häufige Fragen',
    items: [
      {
        q: 'Muss ich die App herunterladen, um zu journalen?',
        a: 'Nein. Du kannst komplett per WhatsApp, Telegram oder Anruf journalen, ganz ohne App und ohne Registrierung. Die iOS-App ist optional: Dort liest du deine Einträge nach, durchsuchst vergangene Momente und siehst deine Stimmungsmuster über die Zeit.',
      },
      {
        q: 'Ist Empath wirklich kostenlos?',
        a: 'Ja! Empath ist komplett kostenlos. Das gesamte Kern-Journaling per Nachricht, Anruf oder App ist gratis enthalten, plus KI-Transkription, Stimmungstracking und Erkenntnisse.',
      },
      {
        q: 'Wie funktioniert die KI?',
        a: 'Unsere KI nutzt modernste Sprachverarbeitung, um deine Stimme zu transkribieren, Stimmungen zu analysieren, Muster zu erkennen und Erkenntnisse zu generieren. Die gesamte Verarbeitung ist sicher und HIPAA-konform.',
      },
      {
        q: 'Kann ich Empath auch ohne Therapeut:in nutzen?',
        a: 'Absolut! Empath funktioniert wunderbar als eigenständiges Tool zum Journalen und zur Selbstreflexion. Du kannst dich später jederzeit mit einer Therapeut:in verbinden, wenn du möchtest.',
      },
      {
        q: 'Sind meine Daten privat und sicher?',
        a: 'Ja. Alle deine Daten sind Ende-zu-Ende-verschlüsselt, HIPAA-konform und werden nie zum Trainieren von KI-Modellen verwendet. Du bestimmst, wer Zugriff hat, und kannst jederzeit alles löschen.',
      },
      {
        q: 'Und was ist mit Android?',
        a: 'Aktuell gibt es die App nur für iOS, aber journalen per Anruf oder WhatsApp geht von jedem Gerät! Eine Android-App ist in Arbeit.',
      },
      {
        q: 'Wie verbinde ich mich mit meiner Therapeut:in?',
        a: 'Wenn deine Therapeut:in Empath nutzt, bekommst du eine Einladung geschickt. Falls nicht, kannst du privat journalen und deine Erkenntnisse selbst teilen, oder sie zu Empath einladen.',
      },
      {
        q: 'Kann ich meine Einträge exportieren?',
        a: 'Ja! Du kannst alle deine Einträge, Erkenntnisse und Daten jederzeit exportieren. Deine Daten gehören dir, immer.',
      },
      {
        q: 'Was, wenn ich nicht weiß, was ich schreiben soll?',
        a: 'Dann chatte dich einfach zu einem Eintrag. Der KI-Journaling-Assistent von Empath stellt dir eine sanfte Frage nach der anderen und macht aus dem ganzen Gespräch einen Tagebucheintrag in deiner eigenen Stimme. Der leichteste Weg an der leeren Seite vorbei.',
        link: { text: 'So funktioniert Chat-Journaling', to: '/app/blog/chat-journaling' },
      },
      {
        q: 'Kann Empath mir helfen, eine Journaling-Gewohnheit aufzubauen?',
        a: 'Ja. Leg einen Journaling-Plan mit täglichem oder wöchentlichem Rhythmus fest: mit nachsichtigen Streaks, die einen verpassten Tag überleben, und smarten Erinnerungen per Push oder E-Mail, die sich von selbst überspringen, wenn du schon gejournalt hast.',
        link: { text: 'So baust du einen Journaling-Plan, der hält', to: '/app/blog/journaling-plan' },
      },
    ],
  },

  finalCta: {
    title: 'Dein nächster Tagebucheintrag ist nur eine Nachricht entfernt',
    sub: 'Keine App zum Lernen, keine leere Seite zum Anstarren. Schreib oder ruf an, wie du es mit Freunden sowieso machst, und sieh deine Muster in Tagen statt Monaten.',
    downloadFree: 'Gratis im App Store laden',
    justSayHi: 'Keine App, keine Registrierung. Sag einfach hi',
    preferTyping: 'Lieber tippen? Öffne das Web-Dashboard →',
    noCreditCard: 'Keine Kreditkarte',
    freeForever: 'Für immer kostenlos',
    fastSetup: 'Startklar in 30 Sekunden',
  },

  footer: {
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    support: 'Support',
  },

  floating: {
    downloadFree: 'Gratis laden',
    text: 'Per SMS journalen',
    call: 'Anrufen',
    webApp: 'Web-App',
  },
};
