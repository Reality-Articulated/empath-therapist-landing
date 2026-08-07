// French copy catalog for the consumer landing page.
// Mirrors journaling.en.ts exactly; the `JournalingCopy` type makes any
// missing key a compile error. PURE DATA ONLY (no JSX).

import type { JournalingCopy } from './journaling.en';

export const journalingFr: JournalingCopy = {
  seo: {
    title: 'Empath - L’appli que tu n’as jamais besoin d’ouvrir | Tes pensées par message, WhatsApp ou appel',
    description:
      'Il existe un numéro auquel tu peux simplement tenir ton journal. Envoie un message WhatsApp ou Telegram, appelle, ou laisse Empath t’appeler. Pas d’appli, sans inscription, pas de page blanche. Tes entrées deviennent des tendances d’humeur et des insights que tu peux vraiment voir.',
    keywords:
      'journal par sms, journal vocal, journal intime sans application, tenir un journal par sms, journal WhatsApp, journal par téléphone, suivi de l’humeur, journal par chat, assistant de journal IA, journal conversationnel, plan de journaling, habitude d’écriture, application journal intime',
  },

  header: {
    features: 'Fonctionnalités',
    howItWorks: 'Comment ça marche',
    faq: 'FAQ',
    blog: 'Blog',
    download: 'Télécharger',
  },

  hero: {
    h1Pre: 'Le journal que tu',
    h1Highlight: 'ne lâcheras pas.',
    sub: 'Parce qu’il vit partout où tu vas : envoie un message ou appelle dès que quelque chose te trotte dans la tête. Empath t’aide à tenir ton journal et à explorer ton esprit, et révèle tes schémas au fil du temps.',
    mobileLead: 'Quelque chose te trotte dans la tête ? Appelle ou envoie un message.',
    call: 'Appeler',
    text: 'SMS',
    orFavoriteApp: 'Ou passe par l’appli où tu es déjà',
    phoneMeta: 'Dispo 24h/24 • Sans inscription',
    wantInsights: 'Envie de voir tes tendances d’humeur ?',
    getApp: 'Télécharge l’appli gratuite',
    appBenefits: 'Courbes d’humeur, détection de schémas, synchro Apple Health',
    desktopLead: 'Dis ce que tu as en tête, par appel ou par message. Aucune appli à télécharger, aucune inscription.',
    textToJournal: 'Écris tes pensées',
    callAndTalk: 'Appelle et parle, c’est tout',
    textUsAt: 'Écris-nous au',
    callUsAt: 'Appelle-nous au',
    availability: 'Dispo 24h/24 • Gratuit • Depuis n’importe quel téléphone',
    preferTyping: 'Tu préfères taper au clavier ?',
    openDashboard: 'Ouvre le tableau de bord web',
  },

  // A/B test hero (PostHog experiment flag `landing-hero-copy`, variant
  // `never-open`): swaps ONLY the H1 + subheadline. Control renders `hero`
  // above. Remove once the experiment is decided.
  heroExperiment: {
    h1Pre: 'L’appli que tu n’as',
    h1Highlight: 'jamais à ouvrir.',
    sub: 'Quoi que tu aies en tête, envoie-le sur WhatsApp, appelle, ou laisse Empath t’appeler. Empath écoute, répond et se souvient. Ouvre l’appli quand tu veux voir ce qui se passe vraiment en toi.',
  },

  trust: {
    hipaa: 'Sécurisé HIPAA',
    ai: 'Insights par IA',
    loved: 'Adoré par des milliers de personnes',
  },

  whatsappSection: {
    badge: 'Empath dans tes DM',
    title: 'Plus qu’un endroit où vider ton sac',
    sub: 'Une spirale à 2h du matin, une note vocale parce que taper c’est trop d’effort, une sale journée. Tu envoies ça comme un texto à un ami. Empath écoute, pose la question qu’un ami poserait, et se souvient de ce que tu as dit mardi dernier : tout est enregistré en privé, rien que pour toi.',
    cta: 'Discuter sur WhatsApp',
    phoneNote: 'Ou écris au {phone} sur Telegram, Messenger ou Instagram. Conversations données en exemple.',
    examples: [
      {
        key: 'late-night',
        title: 'Le craquage de 02h47',
        caption: 'Pour quand ton cerveau refuse de se taire et que tout le monde dort.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'je sais qu’il est tard. je rejoue en boucle cette conversation avec mon manager et j’arrive pas à savoir si j’ai surréagi. je voulais réveiller personne alors je te le dis à toi',
            time: '02h47',
          },
          {
            from: 'empath',
            text: 'Tu n’as pas à trancher ça ce soir. Si tu la rejoues, c’est en général que ça comptait, pas que tu as surréagi. Je te la garde pour demain matin ?',
            time: '02h47',
          },
          { from: 'user', text: 'garde-la. merci', time: '02h48' },
          { from: 'empath', text: 'Toujours. Elle sera là à ton réveil. Essaie de dormir 💛', time: '02h48' },
        ],
      },
      {
        key: 'voice-note',
        title: 'Trop crevé pour taper',
        caption: 'Envoie une note vocale. Empath écoute pour de vrai.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          { from: 'user', voice: true, duration: '1:47', time: '23h12' },
          {
            from: 'empath',
            text: 'Longue journée, je l’ai entendu. Trois trucs qui s’empilent avant midi, et tu as quand même répondu à l’appel de ta sœur. Tu as dit deux fois que tu « aurais dû mieux gérer ». En toute douceur : tu as géré. Enregistré.',
            time: '23h13',
          },
          { from: 'user', text: 'comment tu fais pour que ça paraisse toujours surmontable', time: '23h14' },
          { from: 'empath', text: 'Parce que c’est toi qui racontes l’histoire. Bonne nuit.', time: '23h14' },
        ],
      },
      {
        key: 'mom',
        title: 'La culpabilité du quotidien',
        caption: 'Il se souvient de ce que tu essaies d’améliorer.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'encore envoyé bouler ma mère aujourd’hui et je me sens horrible. elle demandait juste des nouvelles du voyage',
            time: '18h03',
          },
          {
            from: 'empath',
            text: 'Le fait que ça te pèse autant montre à quel point tu tiens à elle. Tu es à bout depuis mardi : t’énerver, c’est le trop-plein qui déborde, pas la vérité sur ce que tu es pour elle. Vous vous êtes reparlé depuis ?',
            time: '18h04',
          },
          { from: 'user', text: 'pas encore. demain peut-être', time: '18h06' },
          { from: 'empath', text: 'Demain, c’est bien. Je me souviendrai que tu voulais le faire.', time: '18h06' },
        ],
      },
      {
        key: 'no-app',
        title: '« Attends, pas d’appli ? »',
        caption: 'Pas d’appli. Sans inscription. Tu écris juste au numéro.',
        contactName: '+1 (888) 366-3082',
        unknownAvatar: true,
        messages: [
          { from: 'user', text: 'attends je peux vraiment écrire à ce numéro tout ce que j’ai en tête ? sans appli ?', time: '09h14' },
          {
            from: 'empath',
            text: 'C’est ça. Pas d’appli, pas d’inscription, pas de page blanche qui te fixe. Raconte-moi ta journée, une phrase suffit.',
            time: '09h14',
          },
          { from: 'user', text: 'ok. honnêtement déjà épuisé et il est 9h du matin', time: '09h15' },
          { from: 'empath', text: 'Alors c’est la première entrée du jour, enregistrée. Qu’est-ce qui te prend le plus d’énergie ce matin ?', time: '09h15' },
        ],
      },
    ],
    chatUi: {
      today: 'Aujourd’hui',
      online: 'en ligne',
      inputPlaceholder: 'Message',
    },
  },

  crossChannel: {
    badge: 'Une seule mémoire, toutes tes applis',
    title: 'Commence n’importe où. Continue partout.',
    sub: 'Empath vit là où tu es déjà. Vide ton sac ce soir, reviens dessus sur WhatsApp autour d’un café, creuse sur Telegram après le boulot, boucle la boucle sur Instagram en scrollant. Tous les canaux parlent au même Empath, avec la même mémoire.',
    pickApp: 'Choisis l’appli que tu utilises déjà',
    journalStep: {
      time: 'mardi 21h41',
      channel: 'Entrée vocale',
      cardTitle: 'La veille de la présentation',
      cardSub: 'Entrée vocale · 2 min',
      quote:
        '« Je répète l’intro en boucle. Et si demain je perds tous mes moyens devant tout le monde ? Je connais ce sujet mieux que quiconque dans l’équipe, mais mon cerveau refuse de l’admettre… »',
    },
    steps: [
      {
        key: 'whatsapp',
        time: 'mercredi 08h04',
        channel: 'WhatsApp',
        userMsg: 'salut. j’en ai fait des caisses hier soir ?',
        empathMsg:
          'Un peu 💛 Tu as répété l’intro quatre fois. Mais tu as aussi dit que tu connais ce sujet mieux que personne : c’est cette partie-là qu’il faut garder aujourd’hui.',
      },
      {
        key: 'telegram',
        time: 'mercredi 14h37',
        channel: 'Telegram',
        userMsg: 'présentation finie, ça s’est bien passé. pourquoi je pars toujours en vrille la veille ?',
        empathMsg:
          'C’est la troisième spirale de veille dans ton journal depuis mai, et les trois fois, tout s’est bien passé le lendemain. Le schéma, c’est la spirale, pas l’échec.',
      },
      {
        key: 'instagram',
        time: 'mercredi 23h20',
        channel: 'Instagram',
        userMsg: 'j’arrive pas à dormir. vu un reel sur le syndrome de l’imposteur et je me suis senti hyper visé',
        empathMsg:
          'J’ajoute ça à l’entrée du jour. Pour info, ton propre journal n’est pas d’accord avec le reel : tu es à trois sur trois ce mois-ci.',
      },
    ],
  },

  channelRow: {
    /** aria-label prefix: "Discuter sur WhatsApp" */
    journalOn: 'Discuter sur',
    /** Prefilled first message for chat deep links; ref code appended as " #CODE". */
    prefill: 'hey, je peux vraiment t’écrire tout ce que j’ai en tête ?',
  },

  // Desktop-only QR block under the hero CTAs (phones scan these).
  qr: {
    onPhone: 'Ton téléphone est à côté ?',
    whatsapp: 'Scanne pour discuter sur WhatsApp',
    appStore: 'Scanne pour télécharger l’appli',
  },

  callsYou: {
    badge: 'Nouveau : Empath t’appelle',
    title: 'Pas envie de composer le numéro ? On t’appelle.',
    sub: 'Tape ton numéro et ton téléphone sonne en quelques secondes. Raconte ta journée comme à un ami, raccroche, et c’est déjà enregistré dans ton journal privé : transcrit, titré et rien qu’à toi. Tu peux même programmer l’appel pour plus tard.',
  },

  callMeForm: {
    ringingTitle: '📞 On t’appelle, décroche !',
    ringingSub: 'Raconte ta journée, raccroche, et c’est enregistré comme ta première entrée.',
    phoneAria: 'Ton numéro de téléphone (États-Unis)',
    dialing: 'Appel en cours…',
    callMeNow: 'Appelle-moi maintenant',
    errorGeneric: 'Impossible de passer l’appel. Réessaie dans un instant.',
    errorNetwork: 'Un problème est survenu. Tu peux toujours composer le {phone} directement.',
    disclaimer: 'Numéros américains uniquement. Un appel automatisé, tarif standard.',
    scheduleLink: 'Programmer pour plus tard ou en savoir plus →',
  },

  feature1: {
    badge: 'WhatsApp, Telegram ou appel',
    title: 'Utilise les applis que tu ouvres déjà',
    body: 'Dès qu’une pensée surgit, envoie un message ou une note vocale, ou appelle et vide ton sac. C’est exactement ce que tu fais quand tu te confies à un ami, sauf qu’ici ça devient discrètement un journal privé. Aucune nouvelle appli à apprendre, aucune page blanche à affronter.',
    items: [
      { title: 'Transcription IA', desc: 'Une précision parfaite. Tes mots, capturés exactement comme tu les dis.' },
      {
        title: 'Analyse vocale',
        desc: 'Entends comment tu sonnais vraiment. Ton, énergie et rythme, relevés dans chaque note vocale.',
      },
      {
        title: 'Photos et scans',
        desc: 'Envoie une photo et Empath la lit, pages manuscrites comprises, directement dans ton journal.',
      },
    ],
    mockVoiceTitle: 'Journal vocal',
    mockVoiceTime: 'il y a 2 minutes',
    mockVoiceText:
      '« Je viens d’avoir un déclic incroyable en thérapie aujourd’hui. Je comprends enfin pourquoi j’évitais ces conversations difficiles… »',
    mockPhotoLabel: 'Analyse photo',
    mockPhotoCaption: 'Détecté par l’IA : cadre extérieur paisible, balade en nature, journée ensoleillée',
  },

  feature2: {
    badge: 'Intelligence IA',
    title: '« Attends, depuis quand je me sens comme ça ? »',
    sub: 'Ouvre l’appli et pose la question. Chaque message, appel et pensée que tu as envoyés est mémorisé et ressort en quelques secondes.',
    memoryTitle: 'Recherche intelligente dans tes souvenirs',
    memoryBody: 'Retrouve n’importe quel moment, n’importe quelle émotion, n’importe quel déclic. Notre IA comprend le contexte et fait remonter exactement ce que tu cherches.',
    memoryItems: [
      'Recherche par émotion, sujet ou date',
      'Compréhension sémantique par IA',
      'Rappel instantané des moments importants',
      'Vue chronologique de ton parcours',
    ],
    patternsTitle: 'Détection de schémas',
    patternsBody: 'Découvre des schémas que tu n’avais jamais remarqués. Notre IA repère les déclencheurs, les cycles et les liens dans ce que tu vis.',
    patternsItems: [
      'Identifie tes déclencheurs émotionnels',
      'Repère tes schémas de comportement',
      'Suis tes progrès dans le temps',
      'Insights et suggestions personnalisés',
    ],
    peopleTitle: 'Insights sur les gens',
    peopleBody:
      'Empath repère qui revient sans cesse dans tes journaux, et ce que tu ressens en général quand c’est le cas.',
    peopleItems: [
      'Toutes les personnes dont tu parles, au même endroit',
      'Les émotions qui remontent autour de chaque personne',
      'Chaque mention, prête à être relue',
      'Modifie ou retire qui tu veux, quand tu veux',
    ],
  },

  feature3: {
    badge: 'Analyses',
    title: 'Vois ce qui influence vraiment ton humeur',
    body: 'Tu remarqueras des choses comme « je suis plus heureux les jours où je marche » ou « les deadlines du boulot font grimper mon anxiété tous les jeudis ». Ce sont tes données, présentées simplement.',
    mockTitle: 'Tendances d’humeur',
    mockRange: '30 derniers jours',
    moods: [
      { label: 'Heureux' },
      { label: 'Calme' },
      { label: 'Anxieux' },
      { label: 'Triste' },
    ],
    insightLabel: 'Insight',
    insightText: 'Ton humeur s’améliore de 40 % les jours où tu bouges. Et si tu marchais le matin ?',
    items: [
      { title: 'Suivi d’humeur quotidien', desc: 'Analyse automatique du ressenti dans tes entrées' },
      { title: 'Analyse des corrélations', desc: 'Découvre quelles activités boostent ton humeur' },
      { title: 'Lieux et météo', desc: 'Vois comment tu te sens chez toi, au boulot et les jours gris' },
      { title: 'Tendances long terme', desc: 'Vois tes progrès sur des semaines et des mois' },
    ],
  },

  feature4: {
    badge: 'Santé globale',
    title: 'Comprends pourquoi ça ne va pas',
    sub: 'Empath lit tes données Apple Health et relie les points. Mauvais sommeil ? Séances de sport sautées ? Tu verras exactement ce qui plombe ton humeur.',
    cards: [
      {
        title: 'Activité et exercice',
        desc: 'Vois comment le mouvement influence ton humeur et ton énergie.',
        metrics: ['Pas', 'Séances de sport', 'Minutes actives'],
      },
      {
        title: 'Sommeil et récupération',
        desc: 'Suis la qualité de ton sommeil et ses effets sur ta clarté mentale.',
        metrics: ['Durée de sommeil', 'Fréquence cardiaque', 'Tension artérielle'],
      },
      {
        title: 'Habitudes quotidiennes',
        desc: 'Les petits détails du quotidien qui déplacent ton humeur sans bruit.',
        metrics: ['Caféine', 'Hydratation', 'Lumière du jour', 'Minutes de pleine conscience'],
      },
    ],
    calloutTitle: 'Insights santé automatiques',
    calloutBody:
      'Empath lit dix catégories d’Apple Health et les analyse en parallèle de tes journaux pour révéler des liens puissants. « Ton anxiété baisse de 35 % les jours où tu dors 7 heures ou plus. » Ce genre d’insight t’aide à faire de meilleurs choix.',
  },

  feature5: {
    badge: 'Propulsé par l’IA',
    title: 'Une IA qui te connaît vraiment',
    sub: 'Ton compagnon IA personnel connaît tout ton historique. Pose des questions, découvre des insights et reçois des conseils personnalisés à tout moment.',
    companionTitle: 'Ton compagnon IA',
    exchanges: [
      {
        q: '« Pourquoi je suis toujours anxieux le lundi ? »',
        a: 'D’après tes entrées, tu as tendance à moins dormir le dimanche soir et à sauter le petit-déjeuner le lundi matin. Ce schéma apparaît dans 8 de tes 10 dernières entrées du lundi.',
      },
      {
        q: '« Qu’est-ce qui m’aide à aller mieux quand je suis stressé ? »',
        a: 'Tes anti-stress les plus efficaces : parler à des amis (mentionné 23 fois), aller marcher (18 fois) et écouter de la musique (15 fois).',
      },
    ],
    askTitle: 'Demande ce que tu veux',
    askItems: [
      'Trouve des schémas dans ton comportement',
      'Comprends tes déclencheurs',
      'Retient l’essentiel d’une entrée à l’autre',
      'Connaît ta bio et les personnes dont tu parles',
      'Retrouve des souvenirs précis',
      'Prépare tes séances de thérapie',
    ],
    privacyTitle: '100 % privé et sécurisé',
    privacyBody: 'Tes conversations sont chiffrées et ne servent jamais à entraîner des modèles d’IA. Ta vie privée est notre priorité.',
  },

  featureGrid: {
    badge: 'Et le reste',
    title: 'Tout le reste dans l’appli',
    sub: 'Les petites choses qui la rendent vraiment à toi.',
    items: [
      {
        title: 'Verrouillage biométrique du journal',
        desc: 'Garde tes entrées les plus intimes derrière Face ID ou Touch ID.',
      },
      {
        title: 'Assistant de journal',
        desc: 'Bloqué en pleine entrée ? Demande une question, un coup de pouce ou de l’aide pour trouver les mots.',
      },
      {
        title: 'Découvre-toi',
        desc: 'Des questions tirées de tes propres entrées, pour les jours où tu veux creuser.',
      },
      {
        title: 'Widgets sur l’écran d’accueil',
        desc: 'Note ton humeur d’un geste et lis la citation du jour sans ouvrir l’appli.',
      },
      {
        title: 'Ta bio',
        desc: 'Raconte ton contexte à Empath une fois. Ensuite, chaque insight tombe plus juste.',
      },
      {
        title: 'Anciennes entrées liées',
        desc: 'En lisant une entrée, les plus anciennes qui lui font écho remontent.',
      },
      {
        title: 'Import et export',
        desc: 'Amène tes anciens journaux. Repars avec tout, quand tu veux.',
      },
      {
        title: 'Journal hors ligne',
        desc: 'Écris sans réseau. Tout se synchronise dès ton retour.',
      },
    ],
  },

  feature6: {
    badge: 'Aussi en thérapie ?',
    title: 'Tire le maximum de chaque séance',
    sub: 'Si tu vois un thérapeute, Empath peut lui partager ta semaine automatiquement. Fini le « alors, quoi de neuf ? » Tes séances commencent là où ça compte.',
    cardTitle: 'Donne à ton thérapeute un accès à ton esprit',
    cardBody:
      'Quand tu te connectes à ton thérapeute via Empath, il a une vision complète de ta semaine, pas seulement ce dont tu te souviens en séance.',
    items: [
      {
        title: 'Résumés pré-séance',
        desc: 'Ton thérapeute lit des résumés générés par IA avant chaque séance. Zéro temps perdu en récap.',
      },
      {
        title: 'Insights plus profonds',
        desc: 'Ton thérapeute repère des schémas qui pourraient t’échapper et prépare des interventions ciblées.',
      },
      {
        title: 'Des progrès plus rapides',
        desc: 'Zappe les banalités. Entre dans le vif du sujet dès la première minute.',
      },
    ],
    mockTitle: 'Résumé hebdomadaire',
    mockSub: 'Préparé pour ton thérapeute',
    mockMoodLabel: 'Aperçu de l’humeur',
    mockMoodText:
      'Anxiété en hausse en milieu de semaine, corrélée aux échéances professionnelles. Nette amélioration après la séance de thérapie de vendredi.',
    mockMomentsLabel: 'Moments clés',
    mockMoments: [
      'Mardi : prise de conscience importante sur les schémas relationnels',
      'Jeudi : nouvelles stratégies d’adaptation mises en pratique avec succès',
    ],
    mockFocusLabel: 'Piste suggérée',
    mockFocusText: 'Explorer les schémas d’anxiété liés au travail et les prises de conscience relationnelles de mardi.',
    privacyTitle: 'Ta vie privée, ton contrôle',
    privacyBody:
      'Tu choisis ce que tu partages, et quand. Connecte-toi ou déconnecte-toi de ton thérapeute à tout moment. Tes données restent toujours les tiennes.',
    privacyBadges: ['Conforme HIPAA', 'Chiffré de bout en bout', 'Tu contrôles les accès', 'Déconnexion à tout moment'],
  },

  howItWorks: {
    title: 'Capture par message ou appel. Réfléchis dans l’appli.',
    sub: 'Aucune installation, aucune nouvelle habitude à créer. Parle comme tu le fais déjà avec tes amis.',
    stepLabel: 'Étape',
    steps: [
      {
        title: 'Écris ou appelle',
        desc: 'Dès qu’une pensée ou une émotion se pointe, écris à Empath sur WhatsApp ou Telegram, ou appelle, exactement comme tu écrirais à un ami. Pas d’appli, pas d’inscription, pas de page blanche.',
      },
      {
        title: 'Empath capture tout',
        desc: 'Chaque message et chaque appel atterrit dans ton journal privé : transcrit, organisé et enregistré automatiquement. Toi, tu continues juste à vivre ta vie.',
      },
      {
        title: 'Ouvre l’appli pour réfléchir',
        desc: 'Quand tu veux regarder en arrière, revisiter un souvenir ou voir tes tendances d’humeur, tout t’attend dans l’appli.',
      },
    ],
  },

  iosCallout: {
    kicker: 'Appli iOS disponible',
    title: 'Envie de regarder en arrière ? Prends l’appli',
    body: 'Tu parles par message et par appel. L’appli, c’est là où vit ton journal privé : relis tout, cherche dans tes moments passés et regarde tes tendances d’humeur se dessiner.',
    button: 'Télécharger sur l’App Store',
  },

  socialProof: {
    title: 'Ce qu’en disent les gens',
    featured: 'Mis en avant sur l’App Store',
    testimonials: [
      {
        quote:
          'J’ai essayé 5 applis de journal et j’ai abandonné à chaque fois. Empath est resté parce que j’envoie juste un texto quand j’ai un truc en tête : pas d’appli à ouvrir, pas de page blanche.',
        author: 'Alex M.',
        role: 'Utilisateur depuis 2024',
      },
      {
        quote:
          'Empath m’a montré que je deviens anxieux tous les dimanches soir avant le boulot. En 3 ans de journal papier, je n’avais jamais fait le lien.',
        author: 'Jordan K.',
        role: 'Utilisateur depuis 2023',
      },
      {
        quote:
          'J’adore pouvoir juste appeler et parler. C’est tellement naturel. Tenir un journal aurait toujours dû être aussi simple.',
        author: 'Sam R.',
        role: 'Utilisateur depuis 2024',
      },
    ],
  },

  faq: {
    title: 'Questions fréquentes',
    items: [
      {
        q: 'Est-ce que je dois télécharger l’appli pour tenir un journal ?',
        a: 'Non. Tu peux tenir ton journal entièrement par WhatsApp, Telegram ou appel téléphonique, sans appli et sans inscription. L’appli iOS est optionnelle : c’est là que tu relis tes entrées, retrouves des moments passés et vois tes tendances d’humeur au fil du temps.',
      },
      {
        q: 'Empath est vraiment gratuit ?',
        a: 'Oui ! Empath est entièrement gratuit. Tout l’essentiel est inclus sans rien payer : le journal par message, appel ou appli, plus la transcription IA, le suivi d’humeur et les insights.',
      },
      {
        q: 'Comment fonctionne l’IA ?',
        a: 'Notre IA utilise un traitement avancé du langage naturel pour transcrire ta voix, analyser ton ressenti, repérer des schémas et générer des insights. Tout le traitement est sécurisé et conforme HIPAA.',
      },
      {
        q: 'Je peux l’utiliser sans thérapeute ?',
        a: 'Bien sûr ! Empath fonctionne très bien comme simple outil de journal et d’introspection. Tu pourras te connecter à un thérapeute plus tard si tu le souhaites.',
      },
      {
        q: 'Mes données sont privées et sécurisées ?',
        a: 'Oui. Toutes tes données sont chiffrées de bout en bout, conformes HIPAA et ne servent jamais à entraîner des modèles d’IA. Tu contrôles qui y a accès et tu peux tout supprimer à tout moment.',
      },
      {
        q: 'Et sur Android ?',
        a: 'Pour l’instant, l’appli n’existe que sur iOS, mais tu peux quand même tenir ton journal par appel ou WhatsApp depuis n’importe quel téléphone ! Une appli Android est en développement.',
      },
      {
        q: 'Comment je me connecte à mon thérapeute ?',
        a: 'Si ton thérapeute utilise Empath, il peut t’envoyer une invitation. Sinon, tu peux tenir ton journal en privé et partager tes insights toi-même, ou l’inviter à rejoindre Empath.',
      },
      {
        q: 'Je peux exporter mes journaux ?',
        a: 'Oui ! Tu peux exporter tous tes journaux, insights et données à tout moment. Tes données t’appartiennent, pour toujours.',
      },
      {
        q: 'Et si je ne sais pas quoi écrire ?',
        a: 'Tu peux discuter jusqu’à ton entrée. L’assistant de journal IA d’Empath t’interviewe une question douce à la fois, puis transforme toute la conversation en entrée de journal avec tes propres mots. C’est le moyen le plus simple de dépasser la page blanche.',
        link: { text: 'Découvre comment marche le journal par chat', to: '/app/blog/chat-journaling' },
      },
      {
        q: 'Empath peut m’aider à créer une habitude d’écriture ?',
        a: 'Oui. Mets en place un plan de journal avec un rythme quotidien ou hebdomadaire, des séries indulgentes qui survivent à un jour manqué, et des rappels adaptatifs par notification ou email qui s’effacent d’eux-mêmes si tu as déjà écrit.',
        link: { text: 'Vois comment construire un plan de journal qui tient', to: '/app/blog/journaling-plan' },
      },
    ] as Array<{ q: string; a: string; link?: { text: string; to: string } }>,
  },

  finalCta: {
    title: 'Quoi que tu aies en tête, c’est à un message près',
    sub: 'Aucune appli à apprendre, aucune page blanche à fixer. Écris ou appelle comme tu le fais déjà avec un ami, et commence à voir tes schémas en quelques jours, pas en quelques mois.',
    downloadFree: 'Télécharger gratuitement sur l’App Store',
    justSayHi: 'Pas d’appli, sans inscription. Dis juste salut',
    preferTyping: 'Tu préfères écrire ? Ouvre le tableau de bord web →',
    noCreditCard: 'Sans carte bancaire',
    freeForever: 'Gratuit pour toujours',
    fastSetup: 'Prêt en 30 secondes',
  },

  footer: {
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d’utilisation',
    support: 'Assistance',
  },

  floating: {
    downloadFree: 'Télécharger gratuitement',
    text: 'Écris tes pensées',
    call: 'Appeler',
    webApp: 'Appli web',
  },
};
