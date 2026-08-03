// Spanish (neutral Latin-American) copy catalog for the consumer landing page.
// Mirrors the exact shape of journaling.en.ts; `JournalingCopy` is derived
// from the English object, so a missing key here is a compile error.
//
// PURE DATA ONLY (no JSX): this module is also transpile-loaded by
// scripts/prerender.mjs and scripts/generate-sitemap.mjs at build time.

import type { JournalingCopy } from './journaling.en';

export const journalingEs: JournalingCopy = {
  seo: {
    title: 'Empath - El diario que no vas a abandonar',
    description:
      'Hay un número al que simplemente puedes escribir tu diario. Mándale un texto, un WhatsApp, llámalo, o deja que te llame. Sin app, sin registro, sin página en blanco. Tus entradas se convierten en patrones de ánimo e insights que de verdad puedes ver.',
    keywords:
      'diario por mensaje de texto, diario de voz, diario sin app, escribir un diario por texto, diario por WhatsApp, diario por llamada, seguimiento del estado de ánimo, diario por chat, asistente de diario con IA, diario conversacional, plan de diario, hábito de escribir un diario',
  },

  header: {
    features: 'Funciones',
    howItWorks: 'Cómo funciona',
    faq: 'Preguntas',
    blog: 'Blog',
    download: 'Descargar',
  },

  hero: {
    h1Pre: 'El diario que',
    h1Highlight: 'no vas a abandonar.',
    sub: 'Porque vive donde tú vives: solo manda un texto o llama cuando algo te dé vueltas en la cabeza. Empath te ayuda a escribir tu diario y explorar tu mente, revelando tus patrones con el tiempo.',
    mobileLead: 'Empieza a escribir tu diario ahora mismo. Solo llama, textea o manda un mensaje.',
    call: 'Llamar',
    text: 'Textear',
    orFavoriteApp: 'O escribe tu diario en tu app favorita',
    phoneMeta: 'Disponible 24/7 • Sin registro',
    wantInsights: '¿Quieres tendencias de ánimo e insights?',
    getApp: 'Descarga la app gratis',
    appBenefits: 'Gráficas de ánimo, detección de patrones, sincronización con Apple Health',
    desktopLead: 'Empieza a escribir tu diario ahora mismo con una llamada o un texto. Sin app que descargar, sin registro.',
    textToJournal: 'Textea tu diario',
    callAndTalk: 'Llama y solo habla',
    textUsAt: 'Escríbenos al',
    callUsAt: 'Llámanos al',
    availability: 'Disponible 24/7 • Gratis • Funciona desde cualquier teléfono',
    preferTyping: '¿Prefieres teclear desde tu escritorio?',
    openDashboard: 'Abre el panel web',
  },

  trust: {
    hipaa: 'Seguridad HIPAA',
    ai: 'Insights con IA',
    loved: 'Amado por miles',
  },

  whatsappSection: {
    badge: 'Tu diario en tus DMs',
    title: 'Así se ve en la vida real',
    sub: 'Una espiral a las 2 a.m., una nota de voz porque ya no te quedan fuerzas para teclear, un día pesado. Lo mandas como le escribirías a un amigo: Empath escucha, responde y lo guarda en silencio como una entrada de tu diario.',
    cta: 'Escribe tu diario en WhatsApp',
    phoneNote: 'O manda un texto al {phone}. Un SMS normal también funciona. Conversaciones de ejemplo.',
    examples: [
      {
        key: 'late-night',
        title: 'El desahogo de las 2:47 a.m.',
        caption: 'Para cuando tu cabeza no se calla y todos están dormidos.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'sé que es tarde. no dejo de repetir esa conversación con mi jefe y no sé si exageré. no quería despertar a nadie así que te lo cuento a ti',
            time: '2:47 a.m.',
          },
          {
            from: 'empath',
            text: 'No tienes que resolverlo esta noche. Repetirlo una y otra vez suele significar que te importó, no que exageraste. ¿Quieres que te lo guarde hasta mañana?',
            time: '2:47 a.m.',
          },
          { from: 'user', text: 'guárdalo. gracias', time: '2:48 a.m.' },
          { from: 'empath', text: 'Siempre. Aquí estará cuando despiertes. Trata de dormir 💛', time: '2:48 a.m.' },
        ],
      },
      {
        key: 'voice-note',
        title: 'Cuando ya no puedes ni teclear',
        caption: 'Manda una nota de voz. De verdad escucha.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          { from: 'user', voice: true, duration: '1:47', time: '11:12 p.m.' },
          {
            from: 'empath',
            text: 'Día largo, se notó. Tres cosas encima antes del mediodía, y aun así contestaste la llamada de tu hermana. Dijiste dos veces que "debiste manejarlo mejor". Con cariño: lo manejaste. Guardado.',
            time: '11:13 p.m.',
          },
          { from: 'user', text: 'cómo le haces para que todo suene sobrevivible', time: '11:14 p.m.' },
          { from: 'empath', text: 'Porque tú eres quien cuenta la historia. Buenas noches.', time: '11:14 p.m.' },
        ],
      },
      {
        key: 'mom',
        title: 'La culpa de todos los días',
        caption: 'Un diario que recuerda lo que estás tratando de mejorar.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'hoy volví a contestarle mal a mi mamá y me siento fatal. solo me estaba preguntando por el viaje',
            time: '6:03 p.m.',
          },
          {
            from: 'empath',
            text: 'Que te pese tanto muestra cuánto te importa. Has andado al límite desde el martes: contestar mal es el desborde, no la verdad de quién eres para ella. ¿Ya hablaron?',
            time: '6:04 p.m.',
          },
          { from: 'user', text: 'todavía no. quizá mañana', time: '6:06 p.m.' },
          { from: 'empath', text: 'Mañana está bien. Yo me acuerdo de que querías hacerlo.', time: '6:06 p.m.' },
        ],
      },
      {
        key: 'no-app',
        title: '"¿Cómo que sin app?"',
        caption: 'Sin app. Sin registro. Solo le escribes al número.',
        contactName: '+1 (888) 366-3082',
        unknownAvatar: true,
        messages: [
          { from: 'user', text: 'espera, ¿o sea que puedo escribir mi diario con solo textear este número? ¿sin app?', time: '9:14 a.m.' },
          {
            from: 'empath',
            text: 'Así es. Sin app, sin registro, sin página en blanco mirándote. Cuéntame de tu día. Con una frase basta.',
            time: '9:14 a.m.',
          },
          { from: 'user', text: 'ok. la verdad ya no puedo y son las 9 de la mañana', time: '9:15 a.m.' },
          { from: 'empath', text: 'Pues esa es la primera entrada de hoy, guardada. ¿Qué es lo que más energía te está quitando esta mañana?', time: '9:15 a.m.' },
        ],
      },
    ],
    chatUi: {
      today: 'Hoy',
      online: 'en línea',
      inputPlaceholder: 'Mensaje',
    },
  },

  crossChannel: {
    badge: 'Un solo diario, todas tus apps',
    title: 'Empieza donde sea. Continúa donde quieras.',
    sub: 'Empath vive donde tú ya estás. Escribe en tu diario esta noche, pregúntale por WhatsApp con el café, profundiza en Telegram al salir del trabajo, cierra el círculo desde Instagram mientras haces scroll. Todos los canales hablan con el mismo diario y la misma memoria.',
    pickApp: 'Elige la app en la que ya estás',
    journalStep: {
      time: 'Martes 9:41 p.m.',
      channel: 'Diario de voz',
      cardTitle: 'La noche antes de la presentación',
      cardSub: 'Diario de voz · 2 min',
      quote:
        '"No dejo de ensayar la intro. ¿Y si mañana me quedo en blanco frente a todos? Sé este material mejor que nadie en el equipo, pero mi cerebro no lo acepta..."',
    },
    steps: [
      {
        key: 'whatsapp',
        time: 'Miércoles 8:04 a.m.',
        channel: 'WhatsApp',
        userMsg: 'buenos días. ¿exageré anoche?',
        empathMsg:
          'Un poco 💛 Ensayaste la intro cuatro veces. Pero también dijiste que sabes este material mejor que nadie. Quédate hoy con esa parte.',
      },
      {
        key: 'telegram',
        time: 'Miércoles 2:37 p.m.',
        channel: 'Telegram',
        userMsg: 'ya pasó la presentación, salió bien. ¿por qué siempre me da la espiral la noche anterior?',
        empathMsg:
          'Es la tercera espiral de la noche anterior en tu diario desde mayo, y las tres veces todo salió bien al día siguiente. El patrón es la espiral, no el fracaso.',
      },
      {
        key: 'instagram',
        time: 'Miércoles 11:20 p.m.',
        channel: 'Instagram',
        userMsg: 'no puedo dormir. vi un reel sobre el síndrome del impostor y me llegó directo',
        empathMsg:
          'Lo agrego a la entrada de hoy. Por si sirve de algo, tu propio diario no está de acuerdo con el reel: vas tres de tres este mes.',
      },
    ],
  },

  channelRow: {
    /** aria-label prefix: "Escribe tu diario en WhatsApp" */
    journalOn: 'Escribe tu diario en',
  },

  callsYou: {
    badge: 'Nuevo: Empath te llama',
    title: '¿No tienes ganas de marcar? Nosotros te llamamos.',
    sub: 'Escribe tu número y tu teléfono suena en segundos. Habla de tu día como lo harías con un amigo, cuelga, y ya quedó guardado como una entrada de tu diario: transcrita, con título y privada. Incluso puedes programar la llamada para más tarde.',
  },

  callMeForm: {
    ringingTitle: '📞 Te estamos llamando. ¡Contesta!',
    ringingSub: 'Habla de tu día, cuelga, y queda guardado como tu primera entrada del diario.',
    phoneAria: 'Tu número de teléfono (EE. UU.)',
    dialing: 'Marcando…',
    callMeNow: 'Llámame ahora',
    errorGeneric: 'No pudimos hacer la llamada. Inténtalo de nuevo en un momento.',
    errorNetwork: 'Algo salió mal. Siempre puedes marcar directo al {phone}.',
    disclaimer: 'Solo números de EE. UU. Una llamada automatizada, tarifas estándar.',
    scheduleLink: 'Prográmala para más tarde o conoce más →',
  },

  feature1: {
    badge: 'Texto, WhatsApp o llamada',
    title: 'Usa las apps que ya abres todos los días',
    body: 'En cuanto te llegue un pensamiento, manda un texto o una nota de voz, o simplemente llama y suéltalo. Es lo mismo que haces cuando te desahogas con un amigo, solo que aquí se convierte en tu diario sin que hagas nada más. Sin app nueva que aprender, sin página en blanco que enfrentar.',
    items: [
      { title: 'Transcripción con IA', desc: 'Precisión perfecta. Tus palabras, capturadas exactamente como las dices.' },
      { title: 'Fotos e imágenes', desc: 'Manda fotos por texto. Las analizamos y entendemos automáticamente.' },
      { title: 'Transcripción de imágenes', desc: '¿Texto en una imagen? Lo leemos y lo extraemos por ti.' },
    ],
    mockVoiceTitle: 'Diario de voz',
    mockVoiceTime: 'hace 2 minutos',
    mockVoiceText:
      '"Hoy tuve un gran avance en terapia. Por fin entiendo por qué he estado evitando esas conversaciones difíciles..."',
    mockPhotoLabel: 'Análisis de foto',
    mockPhotoCaption: 'La IA detectó: entorno tranquilo al aire libre, caminata en la naturaleza, día soleado',
  },

  feature2: {
    badge: 'Inteligencia artificial',
    title: '"Un momento, ¿cuándo empecé a sentirme así?"',
    sub: 'Abre la app y solo pregunta. Cada texto, llamada y pensamiento que has mandado queda en la memoria y aparece en segundos.',
    memoryTitle: 'Búsqueda inteligente en tu memoria',
    memoryBody: 'Encuentra cualquier momento, cualquier emoción, cualquier insight. Nuestra IA entiende el contexto y saca justo lo que buscas.',
    memoryItems: [
      'Busca por emoción, tema o fecha',
      'Comprensión semántica con IA',
      'Recupera al instante los momentos importantes',
      'Línea de tiempo de tu camino',
    ],
    patternsTitle: 'Reconocimiento de patrones',
    patternsBody: 'Descubre patrones que nunca habías notado. Nuestra IA identifica detonantes, ciclos y conexiones en tus experiencias.',
    patternsItems: [
      'Identifica detonantes emocionales',
      'Reconoce patrones de conducta',
      'Sigue tu progreso con el tiempo',
      'Insights y sugerencias personalizadas',
    ],
  },

  feature3: {
    badge: 'Analítica',
    title: 'Ve qué afecta de verdad tu estado de ánimo',
    body: 'Vas a notar cosas como "soy más feliz los días que camino" o "las fechas límite del trabajo me disparan la ansiedad cada jueves". Son tus datos, mostrados de forma simple.',
    mockTitle: 'Tendencias de ánimo',
    mockRange: 'Últimos 30 días',
    moods: [
      { label: 'Felicidad' },
      { label: 'Calma' },
      { label: 'Ansiedad' },
      { label: 'Tristeza' },
    ],
    insightLabel: 'Insight',
    insightText: 'Tu ánimo mejora 40% los días que haces ejercicio. ¡Prueba caminar por la mañana!',
    items: [
      { title: 'Seguimiento diario del ánimo', desc: 'Análisis automático de sentimiento a partir de tu diario' },
      { title: 'Análisis de correlaciones', desc: 'Descubre qué actividades te levantan el ánimo' },
      { title: 'Tendencias a largo plazo', desc: 'Ve tu progreso a lo largo de semanas y meses' },
    ],
  },

  feature4: {
    badge: 'Salud integral',
    title: 'Entiende por qué no te sientes al cien',
    sub: 'Empath lee tus datos de Apple Health y conecta los puntos. ¿Dormiste mal? ¿Te saltaste el ejercicio? Vas a ver exactamente qué te está bajando el ánimo.',
    cards: [
      {
        title: 'Actividad y ejercicio',
        desc: 'Ve cómo el movimiento impacta tu ánimo y tus niveles de energía.',
        metrics: ['Pasos', 'Entrenamientos', 'Minutos activos'],
      },
      {
        title: 'Sueño y recuperación',
        desc: 'Sigue la calidad de tu sueño y sus efectos en tu claridad mental.',
        metrics: ['Duración del sueño', 'Calidad del sueño', 'Ritmo cardiaco'],
      },
      {
        title: 'Patrones diarios',
        desc: 'Descubre conexiones entre tus hábitos y tu bienestar.',
        metrics: ['Niveles de energía', 'Marcadores de estrés', 'Tiempo de recuperación'],
      },
    ],
    calloutTitle: 'Insights de salud automáticos',
    calloutBody:
      'Nuestra IA analiza tus datos de salud junto con tu diario para revelar conexiones poderosas. "Tu ansiedad baja 35% los días que duermes 7+ horas." Insights así te ayudan a tomar mejores decisiones.',
  },

  feature5: {
    badge: 'Con IA',
    title: 'Habla con tu diario',
    sub: 'Tu compañero personal de IA conoce toda tu historia. Haz preguntas, obtén insights y recibe orientación personalizada en cualquier momento.',
    companionTitle: 'Tu compañero de IA',
    exchanges: [
      {
        q: '"¿Por qué siempre me siento con ansiedad los lunes?"',
        a: 'Según tu diario, sueles dormir menos los domingos por la noche y saltarte el desayuno los lunes. Este patrón aparece en 8 de tus últimas 10 entradas de lunes.',
      },
      {
        q: '"¿Qué me ayuda a sentirme mejor cuando tengo estrés?"',
        a: 'Lo que más te alivia el estrés: hablar con amigos (mencionado 23 veces), salir a caminar (18 veces) y escuchar música (15 veces).',
      },
    ],
    askTitle: 'Pregunta lo que sea',
    askItems: [
      'Encuentra patrones en tu conducta',
      'Entiende tus detonantes',
      'Sigue tu progreso',
      'Recibe sugerencias personalizadas',
      'Recuerda momentos específicos',
      'Prepárate para tus sesiones de terapia',
    ],
    privacyTitle: '100% privado y seguro',
    privacyBody: 'Tus conversaciones están cifradas y nunca se usan para entrenar modelos de IA. Tu privacidad es nuestra prioridad.',
  },

  feature6: {
    badge: '¿También vas a terapia?',
    title: 'Haz que cada sesión cuente',
    sub: 'Si ves a un terapeuta, Empath puede compartirle tu semana automáticamente. Se acabó el "bueno, ¿qué pasó?". Tus sesiones empiezan donde importa.',
    cardTitle: 'Dale a tu terapeuta acceso a tu mente',
    cardBody:
      'Cuando te conectas con tu terapeuta a través de Empath, recibe una imagen completa de tu semana, no solo lo que te acuerdas de contar en sesión.',
    items: [
      {
        title: 'Resúmenes previos a la sesión',
        desc: 'Tu terapeuta revisa resúmenes generados por IA antes de cada sesión. Cero tiempo perdido en ponerse al día.',
      },
      {
        title: 'Insights más profundos',
        desc: 'Tu terapeuta detecta patrones que a ti se te podrían escapar y prepara intervenciones enfocadas.',
      },
      {
        title: 'Progreso más rápido',
        desc: 'Sáltate la charla introductoria. Entra directo al trabajo que importa desde el primer minuto.',
      },
    ],
    mockTitle: 'Resumen semanal',
    mockSub: 'Preparado para tu terapeuta',
    mockMoodLabel: 'Panorama del ánimo',
    mockMoodText:
      'El cliente experimentó mayor ansiedad a mitad de semana, en correlación con fechas límite de trabajo. Mejoró notablemente después de la sesión de terapia del viernes.',
    mockMomentsLabel: 'Momentos clave',
    mockMoments: [
      'Martes: revelación importante sobre patrones de relación',
      'Jueves: practicó con éxito nuevas estrategias de afrontamiento',
    ],
    mockFocusLabel: 'Enfoque sugerido',
    mockFocusText: 'Explorar los patrones de ansiedad laboral y los insights sobre relaciones del martes.',
    privacyTitle: 'Tu privacidad, tu control',
    privacyBody:
      'Tú eliges qué compartir y cuándo. Conéctate o desconéctate de tu terapeuta en cualquier momento. Tus datos siempre son tuyos.',
    privacyBadges: ['Cumple con HIPAA', 'Cifrado de extremo a extremo', 'Tú controlas el acceso', 'Desconéctate cuando quieras'],
  },

  howItWorks: {
    title: 'Captura por texto o llamada. Reflexiona en la app.',
    sub: 'Sin configuración, sin hábito nuevo que construir. Escribe tu diario como ya hablas con tus amigos.',
    stepLabel: 'Paso',
    steps: [
      {
        title: 'Textea o llama',
        desc: 'Cuando aparezca un pensamiento o una emoción, mándale un texto, un WhatsApp o una llamada a Empath, como le escribirías a un amigo. Sin app, sin registro, sin página en blanco.',
      },
      {
        title: 'Empath lo captura',
        desc: 'Cada mensaje y llamada se convierte en una entrada de tu diario: transcrita, organizada y guardada automáticamente. Tú solo sigue con tu vida.',
      },
      {
        title: 'Abre la app para reflexionar',
        desc: 'Cuando quieras mirar atrás, revivir un recuerdo o ver tus patrones y tendencias de ánimo, todo te está esperando en la app.',
      },
    ],
  },

  iosCallout: {
    kicker: 'App para iOS disponible',
    title: '¿Quieres mirar atrás? Descarga la app',
    body: 'Tú escribes tu diario por texto y llamada. La app es donde lo relees todo, buscas entradas pasadas y ves cómo se revelan tus patrones de ánimo.',
    button: 'Descargar en el App Store',
  },

  socialProof: {
    title: 'Lo que dice la gente',
    featured: 'Destacado en el App Store',
    testimonials: [
      {
        quote:
          'Probé 5 apps de diario y abandoné todas. Empath sí se me quedó porque solo mando un texto cuando algo me da vueltas, sin abrir una app, sin página en blanco.',
        author: 'Alex M.',
        role: 'Usuario desde 2024',
      },
      {
        quote:
          'Empath me mostró que la ansiedad me llega cada domingo por la noche antes del trabajo. Nunca até esos cabos en 3 años escribiendo mi diario en papel.',
        author: 'Jordan K.',
        role: 'Usuario desde 2023',
      },
      {
        quote:
          'Me encanta poder solo llamar y hablar. Se siente tan natural, como si escribir un diario siempre debió ser así de fácil.',
        author: 'Sam R.',
        role: 'Usuario desde 2024',
      },
    ],
  },

  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Necesito descargar la app para escribir mi diario?',
        a: 'No. Puedes llevar tu diario por completo por texto, WhatsApp o llamada, sin app y sin registro. La app de iOS es opcional: es donde relees tus entradas, buscas momentos pasados y ves tus patrones de ánimo con el tiempo.',
      },
      {
        q: '¿Empath es gratis de verdad?',
        a: '¡Sí! Empath es completamente gratis. Todo lo esencial está incluido sin costo: el diario por texto, llamada o app, más transcripción con IA, seguimiento del ánimo e insights.',
      },
      {
        q: '¿Cómo funciona la IA?',
        a: 'Nuestra IA usa procesamiento avanzado de lenguaje natural para transcribir tu voz, analizar el sentimiento, identificar patrones y generar insights. Todo el procesamiento es seguro y cumple con HIPAA.',
      },
      {
        q: '¿Puedo usarlo sin terapeuta?',
        a: '¡Claro! Empath funciona muy bien por sí solo como herramienta de diario y autorreflexión. Puedes conectarte con un terapeuta más adelante si quieres.',
      },
      {
        q: '¿Mis datos son privados y seguros?',
        a: 'Sí. Todos tus datos están cifrados de extremo a extremo, cumplen con HIPAA y nunca se usan para entrenar modelos de IA. Tú controlas quién tiene acceso y puedes borrarlo todo en cualquier momento.',
      },
      {
        q: '¿Y Android?',
        a: 'Por ahora solo estamos en iOS, ¡pero igual puedes escribir tu diario por llamada o mensaje de texto desde cualquier teléfono! La app para Android está en desarrollo.',
      },
      {
        q: '¿Cómo me conecto con mi terapeuta?',
        a: 'Si tu terapeuta usa Empath, puede mandarte una invitación. Si no, puedes llevar tu diario en privado y compartir tus insights por tu cuenta, o invitarlo a unirse a Empath.',
      },
      {
        q: '¿Puedo exportar mi diario?',
        a: '¡Sí! Puedes exportar todas tus entradas, insights y datos en cualquier momento. Tus datos te pertenecen, siempre.',
      },
      {
        q: '¿Y si no sé qué escribir?',
        a: 'Puedes llegar a tu entrada conversando. El asistente de diario con IA de Empath te entrevista con una pregunta suave a la vez, y luego convierte toda la conversación en una entrada escrita con tu propia voz. Es la forma más fácil de vencer la página en blanco.',
        link: { text: 'Descubre cómo funciona el diario por chat', to: '/app/blog/chat-journaling' },
      },
      {
        q: '¿Empath puede ayudarme a crear el hábito de escribir un diario?',
        a: 'Sí. Configura un Plan de Diario con ritmo diario o semanal, rachas flexibles que sobreviven a un día perdido, y recordatorios adaptativos por notificación, SMS o correo que se saltan solos cuando ya escribiste ese día.',
        link: { text: 'Mira cómo armar un plan de diario que sí se mantenga', to: '/app/blog/journaling-plan' },
      },
    ],
  },

  finalCta: {
    title: 'Tu próxima entrada está a un texto de distancia',
    sub: 'Sin app que aprender, sin página en blanco que mirar. Solo textea o llama como ya lo haces con un amigo, y empieza a ver tus patrones en días, no en meses.',
    downloadFree: 'Descarga gratis en el App Store',
    justSayHi: 'Sin app, sin registro. Solo di hola',
    preferTyping: '¿Prefieres teclear? Abre el panel web →',
    noCreditCard: 'Sin tarjeta de crédito',
    freeForever: 'Gratis para siempre',
    fastSetup: 'Listo en 30 segundos',
  },

  footer: {
    privacy: 'Política de privacidad',
    terms: 'Términos de servicio',
    support: 'Soporte',
  },

  floating: {
    downloadFree: 'Descarga gratis',
    text: 'Textea tu diario',
    call: 'Llamar',
    webApp: 'App web',
  },
};
