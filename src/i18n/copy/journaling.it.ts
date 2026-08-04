// Italian copy catalog for the consumer landing page. Mirrors journaling.en.ts
// key-for-key; the `JournalingCopy` type makes any missing key a compile error.

import type { JournalingCopy } from './journaling.en';

export const journalingIt: JournalingCopy = {
  seo: {
    title: 'Empath - Il diario che non mollerai',
    description:
      "C'è un numero a cui puoi semplicemente tenere il tuo diario. Mandagli un SMS, scrivigli su WhatsApp, chiamalo, o fatti chiamare. Niente app, senza registrazione, niente pagina bianca. Le tue voci diventano andamenti dell'umore e insight che puoi davvero vedere.",
    keywords:
      "diario via SMS, diario vocale, diario senza app, journaling via messaggio, diario su WhatsApp, diario per telefono, monitoraggio dell'umore, journaling in chat, assistente AI per il diario, journaling conversazionale, piano di journaling, abitudine del diario",
  },

  header: {
    features: 'Funzionalità',
    howItWorks: 'Come funziona',
    faq: 'FAQ',
    blog: 'Blog',
    download: 'Scarica',
  },

  hero: {
    h1Pre: 'Il diario che',
    h1Highlight: 'non mollerai.',
    sub: 'Perché vive ovunque tu vada: scrivi o chiama appena hai qualcosa in testa. Empath ti aiuta a tenere un diario e a esplorare la tua mente, rivelando i tuoi schemi nel tempo.',
    mobileLead: 'Inizia a tenere il diario adesso. Basta una chiamata o un messaggio.',
    call: 'Chiama',
    text: 'Scrivi',
    orFavoriteApp: 'Oppure tieni il diario sulla tua app preferita',
    phoneMeta: 'Disponibile 24 ore su 24 • Senza registrazione',
    wantInsights: "Vuoi andamenti dell'umore e insight?",
    getApp: "Scarica l'app gratuita",
    appBenefits: "Grafici dell'umore, riconoscimento di schemi, sincronizzazione con Apple Health",
    desktopLead: 'Inizia a tenere il diario adesso con una chiamata o un SMS. Nessuna app da scaricare, senza registrazione.',
    textToJournal: 'Scrivi per il tuo diario',
    callAndTalk: 'Chiama e parla',
    textUsAt: 'Scrivici al',
    callUsAt: 'Chiamaci al',
    availability: 'Disponibile 24 ore su 24 • Gratis • Funziona da qualsiasi telefono',
    preferTyping: 'Preferisci scrivere dal computer?',
    openDashboard: 'Apri la dashboard web',
  },

  trust: {
    hipaa: 'Sicurezza HIPAA',
    ai: 'Insight basati su AI',
    loved: 'Amato da migliaia di persone',
  },

  whatsappSection: {
    badge: 'Il diario nei tuoi DM',
    title: "Ecco com'è davvero",
    sub: "Una spirale di pensieri alle 2 di notte, un vocale che sei troppo stanco per trascrivere, una giornata storta. Lo mandi come lo manderesti a un amico: Empath ascolta, risponde e lo salva in silenzio come voce del diario.",
    cta: 'Tieni il diario su WhatsApp',
    phoneNote: 'Oppure scrivi al {phone}: funzionano anche i normali SMS. Conversazioni di esempio.',
    examples: [
      {
        key: 'late-night',
        title: 'Lo sfogo delle 02:47',
        caption: 'Per quando il cervello non si spegne e dormono tutti.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'lo so che è tardi. continuo a ripensare a quella conversazione con il mio capo e non capisco se ho esagerato. non volevo svegliare nessuno quindi lo racconto a te',
            time: '02:47',
          },
          {
            from: 'empath',
            text: 'Non devi risolverla stanotte. Se continui a ripensarci, di solito è perché contava, non perché hai esagerato. Vuoi che la tenga da parte fino a domattina?',
            time: '02:47',
          },
          { from: 'user', text: 'tienila da parte. grazie', time: '02:48' },
          { from: 'empath', text: 'Sempre. Sarà qui quando ti svegli. Prova a dormire 💛', time: '02:48' },
        ],
      },
      {
        key: 'voice-note',
        title: 'Troppo stanco per scrivere',
        caption: 'Manda un vocale. Ti ascolta davvero.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          { from: 'user', voice: true, duration: '1:47', time: '23:12' },
          {
            from: 'empath',
            text: 'Giornata lunga, e si sentiva. Tre cose una sopra l\'altra prima di mezzogiorno, e hai comunque risposto alla chiamata di tua sorella. Hai detto due volte che "avresti dovuto gestirla meglio". Con dolcezza: l\'hai gestita. Salvato.',
            time: '23:13',
          },
          { from: 'user', text: 'come fai a farla sembrare sempre sopravvivibile', time: '23:14' },
          { from: 'empath', text: 'Perché la storia la racconti tu. Buonanotte.', time: '23:14' },
        ],
      },
      {
        key: 'mom',
        title: 'Il senso di colpa di tutti i giorni',
        caption: 'Un diario che ricorda cosa stai cercando di migliorare.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'oggi ho risposto male a mia mamma un\'altra volta e mi sento malissimo. mi stava solo chiedendo del viaggio',
            time: '18:03',
          },
          {
            from: 'empath',
            text: 'Il fatto che ti pesi così tanto dimostra quanto ci tieni. Sei al limite da martedì: rispondere male è il troppopieno, non la verità su chi sei per lei. Ne avete già parlato?',
            time: '18:04',
          },
          { from: 'user', text: 'non ancora. forse domani', time: '18:06' },
          { from: 'empath', text: 'Domani va bene. Mi ricorderò che volevi farlo.', time: '18:06' },
        ],
      },
      {
        key: 'no-app',
        title: '"Aspetta, niente app?"',
        caption: 'Niente app. Senza registrazione. Scrivi al numero e basta.',
        contactName: '+1 (888) 366-3082',
        unknownAvatar: true,
        messages: [
          { from: 'user', text: 'aspetta, quindi posso tenere un diario semplicemente scrivendo a questo numero? niente app?', time: '09:14' },
          {
            from: 'empath',
            text: 'Esatto. Niente app, senza registrazione, niente pagina bianca che ti fissa. Raccontami la tua giornata: basta anche una frase.',
            time: '09:14',
          },
          { from: 'user', text: 'ok. onestamente sono già senza energie e sono le 9 di mattina', time: '09:15' },
          { from: 'empath', text: "Allora questa è la prima voce di oggi, salvata. Cos'è che ti sta prendendo più energie stamattina?", time: '09:15' },
        ],
      },
    ],
    chatUi: {
      today: 'Oggi',
      online: 'online',
      inputPlaceholder: 'Messaggio',
    },
  },

  crossChannel: {
    badge: 'Un solo diario, ogni app',
    title: 'Inizia ovunque. Continua dappertutto.',
    sub: 'Empath vive dove sei già. Scrivi nel diario stasera, chiedine su WhatsApp davanti al caffè, approfondisci su Telegram dopo il lavoro, chiudi il cerchio da Instagram mentre scorri il feed. Ogni canale parla con lo stesso diario, e con la stessa memoria.',
    pickApp: "Scegli l'app che usi già",
    journalStep: {
      time: 'Martedì 21:41',
      channel: 'Diario vocale',
      cardTitle: 'La sera prima della presentazione',
      cardSub: 'Diario vocale · 2 min',
      quote:
        '"Continuo a ripassare l\'introduzione. E se domani mi blocco davanti a tutti? Conosco questo materiale meglio di chiunque altro nel team, ma il mio cervello non vuole accettarlo..."',
    },
    steps: [
      {
        key: 'whatsapp',
        time: 'Mercoledì 08:04',
        channel: 'WhatsApp',
        userMsg: 'buongiorno. ieri sera stavo esagerando?',
        empathMsg:
          "Un po' 💛 Hai ripassato l'introduzione quattro volte. Ma hai anche detto che conosci questo materiale meglio di chiunque altro: oggi tieniti stretta quella parte.",
      },
      {
        key: 'telegram',
        time: 'Mercoledì 14:37',
        channel: 'Telegram',
        userMsg: 'presentazione fatta, è andata bene. perché vado sempre in spirale la sera prima?',
        empathMsg:
          'È la terza spirale della sera prima nel tuo diario da maggio, e tutte e tre le volte il giorno dopo è andato bene. Lo schema è la spirale, non il fallimento.',
      },
      {
        key: 'instagram',
        time: 'Mercoledì 23:20',
        channel: 'Instagram',
        userMsg: "non riesco a dormire. ho visto un reel sulla sindrome dell'impostore e parlava esattamente di me",
        empathMsg:
          "Lo aggiungo alla voce di oggi. Per la cronaca, il tuo diario non è d'accordo con quel reel: questo mese sei tre su tre.",
      },
    ],
  },

  channelRow: {
    /** aria-label prefix: "Tieni il diario su WhatsApp" */
    journalOn: 'Tieni il diario su',
  },

  callsYou: {
    badge: 'Novità: Empath ti chiama',
    title: 'Non ti va di chiamare? Ti chiamiamo noi.',
    sub: 'Scrivi il tuo numero e il telefono squilla in pochi secondi. Racconta la tua giornata come faresti con un amico, riattacca, ed è già salvata come voce del diario: trascritta, con un titolo, privata. Puoi anche programmare la chiamata per più tardi.',
  },

  callMeForm: {
    ringingTitle: '📞 Ti stiamo chiamando: rispondi!',
    ringingSub: 'Racconta la tua giornata, riattacca, ed è salvata come prima voce del tuo diario.',
    phoneAria: 'Il tuo numero di telefono (USA)',
    dialing: 'Chiamata in corso…',
    callMeNow: 'Chiamami ora',
    errorGeneric: 'Non siamo riusciti a effettuare la chiamata. Riprova tra un momento.',
    errorNetwork: 'Qualcosa è andato storto. Puoi sempre chiamare direttamente il {phone}.',
    disclaimer: 'Solo numeri USA. Una chiamata automatica, tariffe standard.',
    scheduleLink: 'Programma per più tardi o scopri di più →',
  },

  feature1: {
    badge: 'SMS, WhatsApp o chiamata',
    title: 'Usa le app che apri già',
    body: 'Appena arriva un pensiero, manda un messaggio o un vocale, oppure chiama e parlane. È la stessa cosa che faresti sfogandoti con un amico, solo che qui diventa in silenzio il tuo diario. Nessuna nuova app da imparare, nessuna pagina bianca da affrontare.',
    items: [
      { title: 'Trascrizione AI', desc: 'Precisione perfetta. Le tue parole, catturate esattamente come le dici.' },
      {
        title: 'Analisi vocale',
        desc: 'Ascolta come suonavi davvero. Tono, energia e ritmo, letti da ogni vocale.',
      },
      {
        title: 'Foto e scansioni',
        desc: 'Manda una foto ed Empath la legge, comprese le pagine scritte a mano, direttamente nel tuo diario.',
      },
    ],
    mockVoiceTitle: 'Diario vocale',
    mockVoiceTime: '2 minuti fa',
    mockVoiceText:
      '"Oggi in terapia ho avuto una svolta incredibile. Finalmente capisco perché ho sempre evitato quelle conversazioni difficili..."',
    mockPhotoLabel: 'Analisi foto',
    mockPhotoCaption: "L'AI ha rilevato: ambiente all'aperto tranquillo, passeggiata nella natura, giornata di sole",
  },

  feature2: {
    badge: 'Intelligenza AI',
    title: '"Aspetta, quando ho iniziato a sentirmi così?"',
    sub: "Apri l'app e chiedi. Ogni messaggio, chiamata e pensiero che hai mandato viene ricordato e ritrovato in pochi secondi.",
    memoryTitle: 'Ricerca intelligente nella memoria',
    memoryBody: 'Ritrova qualsiasi momento, emozione o intuizione. La nostra AI capisce il contesto e ti mostra esattamente quello che cerchi.',
    memoryItems: [
      'Cerca per emozione, argomento o data',
      'Comprensione semantica basata su AI',
      'Richiamo istantaneo dei momenti importanti',
      'Vista cronologica del tuo percorso',
    ],
    patternsTitle: 'Riconoscimento di schemi',
    patternsBody: 'Scopri schemi che non avevi mai notato. La nostra AI individua trigger, cicli e connessioni nelle tue esperienze.',
    patternsItems: [
      'Individua i trigger emotivi',
      'Riconosci gli schemi di comportamento',
      'Segui i tuoi progressi nel tempo',
      'Insight e suggerimenti personalizzati',
    ],
    peopleTitle: 'Insight sulle persone',
    peopleBody:
      'Empath nota chi torna sempre nel tuo diario, e come tendi a sentirti quando accade.',
    peopleItems: [
      'Tutte le persone di cui scrivi, in un unico posto',
      'Le emozioni che emergono intorno a ogni persona',
      'Ogni menzione, pronta da rileggere',
      'Modifica o rimuovi chiunque, quando vuoi',
    ],
  },

  feature3: {
    badge: 'Analisi',
    title: 'Scopri cosa influenza davvero il tuo umore',
    body: 'Noterai cose come "sono più felice nei giorni in cui cammino" o "le scadenze di lavoro mi fanno impennare l\'ansia ogni giovedì". Sono i tuoi dati, mostrati in modo semplice.',
    mockTitle: "Andamento dell'umore",
    mockRange: 'Ultimi 30 giorni',
    moods: [
      { label: 'Felice' },
      { label: 'Calmo' },
      { label: 'Ansioso' },
      { label: 'Triste' },
    ],
    insightLabel: 'Insight',
    insightText: 'Il tuo umore migliora del 40% nei giorni in cui fai attività fisica. Prova una camminata al mattino!',
    items: [
      { title: "Monitoraggio quotidiano dell'umore", desc: 'Analisi automatica del sentiment dalle voci del diario' },
      { title: 'Analisi delle correlazioni', desc: 'Scopri quali attività migliorano il tuo umore' },
      { title: 'Luoghi e meteo', desc: 'Guarda come ti senti a casa, al lavoro e nei giorni grigi' },
      { title: 'Tendenze a lungo termine', desc: 'Guarda i tuoi progressi su settimane e mesi' },
    ],
  },

  feature4: {
    badge: 'Salute olistica',
    title: 'Capisci perché ti senti giù',
    sub: "Empath legge i tuoi dati di Apple Health e collega i puntini. Dormito male? Allenamenti saltati? Vedrai esattamente cosa ti sta trascinando giù l'umore.",
    cards: [
      {
        title: 'Attività e allenamento',
        desc: 'Guarda come il movimento influisce sul tuo umore e sulla tua energia.',
        metrics: ['Passi', 'Allenamenti', 'Minuti di attività'],
      },
      {
        title: 'Sonno e recupero',
        desc: 'Monitora la qualità del sonno e i suoi effetti sulla tua lucidità mentale.',
        metrics: ['Durata del sonno', 'Frequenza cardiaca', 'Pressione sanguigna'],
      },
      {
        title: 'Abitudini quotidiane',
        desc: 'I piccoli dettagli di ogni giorno che spostano il tuo umore in silenzio.',
        metrics: ['Caffeina', 'Acqua', 'Luce del giorno', 'Minuti di mindfulness'],
      },
    ],
    calloutTitle: 'Insight automatici sulla salute',
    calloutBody:
      'Empath legge dieci categorie da Apple Health e le analizza insieme al diario per rivelare connessioni potenti. "La tua ansia diminuisce del 35% nei giorni in cui dormi più di 7 ore." Insight come questi ti aiutano a fare scelte migliori.',
  },

  feature5: {
    badge: 'Basato su AI',
    title: 'Parla con il tuo diario',
    sub: 'Il tuo compagno AI personale conosce tutta la tua storia. Fai domande, ottieni insight e ricevi consigli personalizzati in qualsiasi momento.',
    companionTitle: 'Il tuo compagno AI',
    exchanges: [
      {
        q: '"Perché mi sento sempre in ansia il lunedì?"',
        a: 'Dal tuo diario risulta che la domenica sera tendi a dormire meno e il lunedì mattina salti la colazione. Questo schema compare in 8 delle tue ultime 10 voci del lunedì.',
      },
      {
        q: '"Cosa mi aiuta a stare meglio quando sono sotto stress?"',
        a: 'I tuoi antistress più efficaci: parlare con gli amici (menzionato 23 volte), fare una passeggiata (18 volte) e ascoltare musica (15 volte).',
      },
    ],
    askTitle: 'Chiedi qualsiasi cosa',
    askItems: [
      'Trova schemi nel tuo comportamento',
      'Capisci i tuoi trigger',
      "Ricorda ciò che conta da una voce all'altra",
      'Conosce la tua bio e le persone di cui scrivi',
      'Richiama ricordi specifici',
      'Preparati alle sedute di terapia',
    ],
    privacyTitle: '100% privato e sicuro',
    privacyBody: 'Le tue conversazioni sono crittografate e non vengono mai usate per addestrare modelli AI. La tua privacy è la nostra priorità.',
  },

  featureGrid: {
    badge: 'E il resto',
    title: "Tutto il resto nell'app",
    sub: 'Le piccole cose che la rendono tua.',
    items: [
      {
        title: 'Blocco biometrico del diario',
        desc: 'Tieni le voci più personali dietro Face ID o Touch ID.',
      },
      {
        title: 'Assistente del diario',
        desc: 'Bloccato a metà voce? Chiedi una domanda, una spinta o aiuto per trovare le parole.',
      },
      {
        title: 'Scopri te stesso',
        desc: 'Domande ricavate dalle tue stesse voci, per i giorni in cui vuoi andare più a fondo.',
      },
      {
        title: 'Widget nella schermata Home',
        desc: "Registra l'umore con un tocco e leggi la frase del giorno senza aprire l'app.",
      },
      {
        title: 'La tua bio',
        desc: 'Racconta a Empath il tuo contesto una volta. Da lì, ogni insight arriva più vicino.',
      },
      {
        title: 'Voci passate collegate',
        desc: 'Mentre leggi una voce, emergono quelle più vecchie che le somigliano.',
      },
      {
        title: 'Importa ed esporta',
        desc: 'Porta i tuoi vecchi diari. Portati via tutto quando vuoi.',
      },
      {
        title: 'Diario offline',
        desc: 'Scrivi senza segnale. Si sincronizza appena torni online.',
      },
    ],
  },

  feature6: {
    badge: 'Sei anche in terapia?',
    title: 'Sfrutta al massimo ogni seduta',
    sub: 'Se hai un terapeuta, Empath può condividere con lui la tua settimana in automatico. Basta con il "allora, com\'è andata?": le tue sedute partono da ciò che conta.',
    cardTitle: 'Dai al tuo terapeuta accesso alla tua mente',
    cardBody:
      'Quando ti colleghi al tuo terapeuta tramite Empath, lui ha un quadro completo della tua settimana, non solo quello che ti ricordi di raccontare in seduta.',
    items: [
      {
        title: 'Riepiloghi pre-seduta',
        desc: "Il tuo terapeuta legge riepiloghi generati dall'AI prima di ogni seduta. Niente tempo perso a fare il punto.",
      },
      {
        title: 'Insight più profondi',
        desc: 'Il tuo terapeuta individua schemi che potrebbero sfuggirti e prepara interventi mirati.',
      },
      {
        title: 'Progressi più rapidi',
        desc: 'Salta i convenevoli. Entra subito nel lavoro che conta, dal primo minuto.',
      },
    ],
    mockTitle: 'Riepilogo settimanale',
    mockSub: 'Preparato per il tuo terapeuta',
    mockMoodLabel: "Panoramica dell'umore",
    mockMoodText:
      "Il paziente ha vissuto un aumento dell'ansia a metà settimana, in correlazione con le scadenze di lavoro. Netto miglioramento dopo la seduta di venerdì.",
    mockMomentsLabel: 'Momenti chiave',
    mockMoments: [
      'Martedì: presa di coscienza importante sugli schemi relazionali',
      'Giovedì: nuove strategie di coping messe in pratica con successo',
    ],
    mockFocusLabel: 'Focus suggerito',
    mockFocusText: "Esplorare gli schemi d'ansia legati al lavoro e gli insight relazionali di martedì.",
    privacyTitle: 'La tua privacy, il tuo controllo',
    privacyBody:
      'Scegli tu cosa condividere e quando. Collegati o scollegati dal tuo terapeuta in qualsiasi momento. I tuoi dati restano sempre tuoi.',
    privacyBadges: ['Conforme HIPAA', 'Crittografia end-to-end', 'Il controllo è tuo', 'Scollegati quando vuoi'],
  },

  howItWorks: {
    title: "Cattura con un messaggio o una chiamata. Rifletti nell'app.",
    sub: 'Nessuna configurazione, nessuna nuova abitudine da costruire. Tieni il diario come già parli con gli amici.',
    stepLabel: 'Passo',
    steps: [
      {
        title: 'Scrivi o chiama',
        desc: "Quando arriva un pensiero o un'emozione, manda un SMS, un WhatsApp o chiama Empath, proprio come scriveresti a un amico. Niente app, senza registrazione, niente pagina bianca.",
      },
      {
        title: 'Empath lo cattura',
        desc: 'Ogni messaggio e ogni chiamata diventa una voce del diario: trascritta, organizzata e salvata in automatico. Tu continui semplicemente a vivere la tua vita.',
      },
      {
        title: "Apri l'app per riflettere",
        desc: "Quando vuoi guardarti indietro, rivivere un ricordo o vedere gli andamenti e gli schemi del tuo umore, è tutto lì ad aspettarti nell'app.",
      },
    ],
  },

  iosCallout: {
    kicker: 'App per iOS disponibile',
    title: "Vuoi rileggere tutto? Scarica l'app",
    body: "Il diario lo scrivi con messaggi e chiamate. L'app è dove rileggi tutto, cerchi tra le voci passate e guardi i tuoi schemi dell'umore prendere forma.",
    button: "Scarica dall'App Store",
  },

  socialProof: {
    title: 'Cosa dice chi lo usa',
    featured: "In evidenza sull'App Store",
    testimonials: [
      {
        quote:
          "Ho provato 5 app per il diario e le ho mollate tutte. Empath è rimasta perché scrivo un messaggio appena ho qualcosa in testa, senza aprire un'app e senza pagina bianca.",
        author: 'Alex M.',
        role: 'Utente dal 2024',
      },
      {
        quote:
          'Empath mi ha mostrato che vado in ansia ogni domenica sera prima del lavoro. In 3 anni di diario su carta non avevo mai collegato i puntini.',
        author: 'Jordan K.',
        role: 'Utente dal 2023',
      },
      {
        quote:
          'Adoro poter semplicemente chiamare e parlare. È naturalissimo: tenere un diario avrebbe sempre dovuto essere così facile.',
        author: 'Sam R.',
        role: 'Utente dal 2024',
      },
    ],
  },

  faq: {
    title: 'Domande frequenti',
    items: [
      {
        q: "Devo scaricare l'app per tenere il diario?",
        a: "No. Puoi tenere il diario interamente via SMS, WhatsApp o telefonata, senza app e senza registrazione. L'app per iOS è facoltativa: è dove rileggi le tue voci, cerchi tra i momenti passati e vedi gli andamenti del tuo umore nel tempo.",
      },
      {
        q: 'Empath è davvero gratis?',
        a: "Sì! Empath è completamente gratuito. Tutto il diario di base via messaggio, chiamata o app, più trascrizione AI, monitoraggio dell'umore e insight, è incluso senza costi.",
      },
      {
        q: "Come funziona l'AI?",
        a: "La nostra AI usa un'elaborazione avanzata del linguaggio naturale per trascrivere la tua voce, analizzare il sentiment, individuare schemi e generare insight. Tutta l'elaborazione è sicura e conforme HIPAA.",
      },
      {
        q: 'Posso usarlo senza un terapeuta?',
        a: 'Assolutamente sì! Empath funziona benissimo da solo, come strumento di diario e riflessione personale. Potrai collegarti a un terapeuta più avanti, se vorrai.',
      },
      {
        q: 'I miei dati sono privati e al sicuro?',
        a: 'Sì. Tutti i tuoi dati sono crittografati end-to-end, conformi HIPAA e mai usati per addestrare modelli AI. Decidi tu chi può accedervi e puoi cancellare tutto in qualsiasi momento.',
      },
      {
        q: 'E per Android?',
        a: "Per ora siamo solo su iOS, ma puoi comunque tenere il diario con una telefonata o un SMS da qualsiasi dispositivo! Un'app per Android è in sviluppo.",
      },
      {
        q: 'Come mi collego al mio terapeuta?',
        a: 'Se il tuo terapeuta usa Empath, può mandarti un invito. Altrimenti puoi tenere il diario in privato e condividere i tuoi insight manualmente, oppure invitarlo a unirsi a Empath.',
      },
      {
        q: 'Posso esportare il mio diario?',
        a: 'Sì! Puoi esportare tutte le tue voci, gli insight e i dati in qualsiasi momento. I tuoi dati appartengono a te, sempre.',
      },
      {
        q: 'E se non so cosa scrivere?',
        a: "Puoi arrivare a una voce del diario chiacchierando. L'assistente AI di Empath ti intervista con una domanda gentile alla volta, poi trasforma l'intera conversazione in una voce del diario con le tue parole. È il modo più facile per superare la pagina bianca.",
        link: { text: 'Scopri come funziona il diario in chat', to: '/app/blog/chat-journaling' },
      },
      {
        q: "Empath può aiutarmi a costruire l'abitudine del diario?",
        a: 'Sì. Imposta un piano di journaling con cadenza giornaliera o settimanale, serie indulgenti che sopravvivono a un giorno saltato e promemoria adattivi via push, SMS o email che si saltano da soli se hai già scritto.',
        link: { text: 'Scopri come costruire un piano di journaling che regge', to: '/app/blog/journaling-plan' },
      },
    ],
  },

  finalCta: {
    title: 'La tua prossima voce del diario è a un messaggio di distanza',
    sub: 'Nessuna app da imparare, nessuna pagina bianca da fissare. Scrivi o chiama come già fai con un amico, e inizia a vedere i tuoi schemi in giorni, non in mesi.',
    downloadFree: "Scarica gratis dall'App Store",
    justSayHi: 'Niente app, senza registrazione. Basta un ciao',
    preferTyping: 'Preferisci scrivere? Apri la dashboard web →',
    noCreditCard: 'Nessuna carta di credito',
    freeForever: 'Gratis per sempre',
    fastSetup: 'Pronto in 30 secondi',
  },

  footer: {
    privacy: 'Informativa sulla privacy',
    terms: 'Termini di servizio',
    support: 'Assistenza',
  },

  floating: {
    downloadFree: 'Scarica gratis',
    text: 'Scrivi per il diario',
    call: 'Chiama',
    webApp: 'App web',
  },
};
