// Spanish (neutral Latin-American) copy catalog for the consumer landing page.
// Mirrors the exact shape of journaling.en.ts; `JournalingCopy` is derived
// from the English object, so a missing key here is a compile error.
//
// PURE DATA ONLY (no JSX): this module is also transpile-loaded by
// scripts/prerender.mjs and scripts/generate-sitemap.mjs at build time.

import type { JournalingCopy } from './journaling.en';

export const journalingEs: JournalingCopy = {
  seo: {
    title: 'Empath - La app que nunca tienes que abrir | Textea, manda un WhatsApp o llama con tus pensamientos',
    description:
      'Hay un número al que simplemente puedes escribir tu diario. Mándale un WhatsApp, un Telegram, llámalo, o deja que te llame. Sin app, sin registro, sin página en blanco. Tus entradas se convierten en patrones de ánimo e insights que de verdad puedes ver.',
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
    sub: 'Porque vive donde tú vives: solo manda un mensaje o llama cuando algo te dé vueltas en la cabeza. Empath te ayuda a escribir tu diario y explorar tu mente, revelando tus patrones con el tiempo.',
    mobileLead: '¿Algo te da vueltas en la cabeza? Solo llama o manda un mensaje.',
    call: 'Llamar',
    text: 'Textear',
    orFavoriteApp: 'O usa la app en la que ya estás',
    phoneMeta: 'Disponible 24/7 • Sin registro',
    wantInsights: '¿Quieres tendencias de ánimo e insights?',
    getApp: 'Descarga la app gratis',
    appBenefits: 'Gráficas de ánimo, detección de patrones, sincronización con Apple Health',
    desktopLead: 'Di lo que traes en mente con una llamada o un mensaje. Sin app que descargar, sin registro.',
    textToJournal: 'Textea tus pensamientos',
    callAndTalk: 'Llama y solo habla',
    textUsAt: 'Escríbenos al',
    callUsAt: 'Llámanos al',
    availability: 'Disponible 24/7 • Gratis • Funciona desde cualquier teléfono',
    preferTyping: '¿Prefieres teclear desde tu escritorio?',
    openDashboard: 'Abre el panel web',
  },

  // A/B test hero (PostHog experiment flag `landing-hero-copy`, variant
  // `never-open`): swaps ONLY the H1 + subheadline. Control renders `hero`
  // above. Remove once the experiment is decided.
  heroExperiment: {
    h1Pre: '¿Otra vez explicándole todo',
    h1Highlight: 'a ChatGPT?',
    sub: 'Empath ya te conoce. Vive en WhatsApp, Telegram, Messenger e Instagram, recuerda cada conversación y retoma justo donde lo dejaste. Solo manda un mensaje o llama cuando traigas algo en mente.',
  },

  trust: {
    hipaa: 'Seguridad HIPAA',
    ai: 'Insights con IA',
    loved: 'Amado por miles',
  },

  tryIt: {
    badge: 'Pruébalo aquí mismo',
    title: 'Anda, mándale algo',
    sub: 'Una pequeña muestra de Empath en esta página. Toca un mensaje y mira cómo responde. Nada de lo que toques aquí se guarda ni se envía a ningún lado.',
    greeting: 'Hola, soy Empath 👋 Soy la IA a la que le escribes como a un amigo. Elige un mensaje abajo y mira qué pasa.',
    pickPrompt: 'Mándale un mensaje a Empath:',
    followUpPrompt: 'Sigue la conversación:',
    branches: [
      {
        key: 'rough-day',
        option: 'Tuve un día difícil',
        userText: 'hoy fue demasiado. estoy agotado y mi cabeza no se apaga',
        reply: 'Suena pesado. Agotado pero acelerado es la peor combinación. ¿Qué es lo de hoy que más espacio sigue ocupando?',
        followUps: [
          {
            key: 'work',
            option: 'Cosas del trabajo, más que nada',
            userText: 'cosas del trabajo más que nada. demasiadas cosas, muy poco yo',
            reply: 'Entonces es el volumen, no un solo desastre. Eso vale la pena saberlo de ti. Si habláramos de verdad, recordaría este patrón y te lo señalaría la próxima vez que el trabajo se acumule así.',
          },
          {
            key: 'person',
            option: 'Es una persona, la verdad',
            userText: 'es una persona la verdad. alguien me sacó de quicio hoy',
            reply: 'Lo de las personas dura más que lo de las tareas. Si me dijeras quién, la recordaría la próxima vez que aparezca, y empezarías a ver cómo afecta tus días.',
          },
        ],
      },
      {
        key: 'untangle',
        option: 'Ayúdame a desenredar algo',
        userText: '¿puedo pensar en voz alta un momento? hay algo que me da vueltas hace días',
        reply: 'Para eso estoy, literalmente. En voz alta es como se sueltan los nudos. Dame la versión desordenada, no hace falta que tenga sentido.',
        followUps: [
          {
            key: 'decision',
            option: 'Es una decisión que sigo evitando',
            userText: 'es una decisión que sigo aplazando. las dos opciones se sienten mal',
            reply: 'Cuando las dos opciones se sienten mal, casi siempre hay una tercera cosa que estás protegiendo. En una conversación real te preguntaría por eso, y guardaría todo el hilo para que lo releyeras cuando estés listo para decidir.',
          },
          {
            key: 'feeling',
            option: 'Es un sentimiento que no sé nombrar',
            userText: 'la verdad es más un sentimiento. ni siquiera puedo nombrarlo',
            reply: 'No tienes que nombrarlo. Mejor describe dónde aparece: ¿por las mañanas? ¿después de ciertas personas? El nombre llega después, y yo iría juntando las pistas contigo.',
          },
        ],
      },
      {
        key: 'first-time',
        option: 'Nunca he escrito un diario',
        userText: 'nunca he escrito un diario. no sé muy bien cómo funciona esto',
        reply: 'Acabas de hacerlo. ¿Ese mensaje? Eso es escribir un diario, así funciona aquí. Sin reglas, sin formato, sin rachas que mantener vivas. Solo di las cosas cuando las sientas.',
        followUps: [
          {
            key: 'what-happens',
            option: '¿Qué pasa con lo que envío?',
            userText: 'ok pero ¿qué pasa con lo que te envío?',
            reply: 'Se convierte en una entrada privada de tu diario: guardada, cifrada, solo tuya. Con el tiempo conecto los puntos entre entradas y te muestro patrones que de verdad puedes ver.',
          },
          {
            key: 'wont-stick',
            option: 'Dudo que sea constante',
            userText: 'la verdad dudo que sea constante. nunca lo soy',
            reply: 'No eres constante con las apps. Esto vive en tus mensajes, así que no hay nada con qué ser constante. ¿Faltas una semana? No se rompe nada. Aquí estaré cuando algo te dé vueltas.',
          },
        ],
      },
      {
        key: 'cant-sleep',
        option: 'No puedo dormir',
        userText: 'es tarde y no puedo dormir. mi cabeza sigue repitiendo el día de hoy',
        reply: 'Cuando la cabeza repite escenas de noche, algo de hoy todavía pide atención. Cuéntame la escena a la que vuelve una y otra vez, y yo la guardo para que tú no tengas que cargarla.',
        followUps: [
          {
            key: 'conversation',
            option: 'Una conversación que tuve',
            userText: 'una conversación de hoy. sigo pensando en cosas mejores que pude haber dicho',
            reply: 'La respuesta perfecta siempre llega después de medianoche. Escribirla aquí la saca del bucle, y en una entrada real yo la recordaría para que mañana la releyeras con ojos frescos.',
          },
          {
            key: 'tomorrow',
            option: 'Mañana me tiene estresado',
            userText: 'la verdad me preocupa el día de mañana. es un día importante',
            reply: 'Los nervios de la noche anterior suelen significar que importa, no que no estés listo. En una conversación real guardaría esto, y mañana por la noche me contarías cómo salió. Spoiler: casi siempre mejor que la versión de las 2 AM.',
          },
        ],
      },
      {
        key: 'vent',
        option: 'Solo necesito desahogarme',
        userText: 'no quiero consejos ahora. solo necesito soltar algo',
        reply: 'Entonces nada de consejos. Este espacio es tuyo: dilo tan fuerte, injusto y desordenado como lo necesites. Yo solo escucho.',
        followUps: [
          {
            key: 'really-listen',
            option: '¿De verdad solo vas a escuchar?',
            userText: '¿de verdad solo vas a escuchar? ¿sin arreglar nada?',
            reply: 'De verdad. Desahogarse funciona porque decirlo en voz alta libera presión. Si algún día quieres algo más que escucha, tú lo pides primero. Ese es el trato.',
          },
          {
            key: 'feels-petty',
            option: 'Es una tontería, la verdad',
            userText: 'es una tontería la verdad. pero me ha molestado todo el día',
            reply: 'Si te ha molestado todo el día, no es una tontería: es información. Las cosas pequeñas que nunca dices en voz alta son donde suelen esconderse los patrones.',
          },
        ],
      },
      {
        key: 'good-news',
        option: '¡Pasó algo bueno!',
        userText: 'ok, hoy pasó algo realmente bueno y no tengo a quién contárselo',
        reply: 'Cuéntamelo todo. Los buenos momentos merecen guardarse, no solo pasar de largo. ¿Qué pasó?',
        followUps: [
          {
            key: 'small-win',
            option: 'Es un logro pequeño, pero mío',
            userText: 'es un logro pequeño pero es mío. por fin hice eso que debía',
            reply: 'Los logros pequeños son los que se acumulan. Guardado, con la fecha de hoy. En un mal día te recordaría: eres alguien que sí hace las cosas.',
          },
          {
            key: 'why-record',
            option: '¿Para qué escribir los días buenos?',
            userText: '¿vale la pena escribir cuando todo está bien?',
            reply: 'Las entradas buenas son las que tu yo del futuro más relee. Además así aprendo qué te levanta de verdad, para que los patrones no sean solo de lo que sale mal.',
          },
        ],
      },
    ],
    ctaLead: 'Esa fue la demo. El Empath real te recuerda.',
    cta: 'Consigue la app gratis',
    ctaNote: 'Gratis en el App Store. Tus entradas se convierten en los insights que rodean esta demo.',
    restart: 'Probar otro inicio',
    screenshotAlt: 'Captura de pantalla de la app Empath',
  },

  whatsappSection: {
    badge: 'Empath en tus DMs',
    title: 'Más que un lugar para desahogarte',
    sub: 'Una espiral a las 2 a.m., una nota de voz porque ya no te quedan fuerzas para teclear, un día pesado. Lo mandas como le escribirías a un amigo. Empath escucha, te hace la pregunta que te haría un amigo y recuerda lo que dijiste el martes pasado: todo guardado en privado, solo para ti.',
    cta: 'Chatea en WhatsApp',
    phoneNote: 'O escríbenos al {phone} por Telegram, Messenger o Instagram. Conversaciones de ejemplo.',
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
        caption: 'Recuerda lo que estás tratando de mejorar.',
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
          { from: 'user', text: 'espera, ¿o sea que puedo textearle a este número lo que sea que traiga en mente? ¿sin app?', time: '9:14 a.m.' },
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
      typing: 'escribiendo…',
      inputPlaceholder: 'Mensaje',
    },
  },

  crossChannel: {
    badge: 'Una sola memoria, todas tus apps',
    title: 'Empieza donde sea. Continúa donde quieras.',
    sub: 'Empath vive donde tú ya estás. Suéltalo esta noche, pregúntale por WhatsApp con el café, profundiza en Telegram al salir del trabajo, cierra el círculo desde Instagram mientras haces scroll. Todos los canales hablan con el mismo Empath, con la misma memoria.',
    pickApp: 'Elige la app en la que ya estás',
    journalStep: {
      time: 'Martes 9:41 p.m.',
      channel: 'Entrada de voz',
      cardTitle: 'La noche antes de la presentación',
      cardSub: 'Entrada de voz · 2 min',
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
    /** aria-label prefix: "Chatea en WhatsApp" */
    journalOn: 'Chatea en',
    /** Prefilled first message for chat deep links; ref code appended as " #CODE". */
    prefill: 'oye, ¿de verdad puedo escribirte lo que sea que tenga en la cabeza?',
  },

  // Desktop-only QR block under the hero CTAs (phones scan these).
  qr: {
    onPhone: '¿Estás con el celular?',
    whatsapp: 'Escanea para chatear por WhatsApp',
    appStore: 'Escanea para descargar la app',
  },

  callsYou: {
    badge: 'Nuevo: Empath te llama',
    title: '¿No tienes ganas de marcar? Nosotros te llamamos.',
    sub: 'Escribe tu número y tu teléfono suena en segundos. Habla de tu día como lo harías con un amigo, cuelga, y ya quedó guardado en tu diario privado: transcrito, con título y solo tuyo. Incluso puedes programar la llamada para más tarde.',
  },

  callMeForm: {
    ringingTitle: '📞 Te estamos llamando. ¡Contesta!',
    ringingSub: 'Habla de tu día, cuelga, y queda guardado como tu primera entrada.',
    phoneAria: 'Tu número de teléfono (EE. UU.)',
    dialing: 'Marcando…',
    callMeNow: 'Llámame ahora',
    errorGeneric: 'No pudimos hacer la llamada. Inténtalo de nuevo en un momento.',
    errorNetwork: 'Algo salió mal. Siempre puedes marcar directo al {phone}.',
    disclaimer: 'Solo números de EE. UU. Una llamada automatizada, tarifas estándar.',
    scheduleLink: 'Prográmala para más tarde o conoce más →',
  },

  feature1: {
    badge: 'WhatsApp, Telegram o llamada',
    title: 'Usa las apps que ya abres todos los días',
    body: 'En cuanto te llegue un pensamiento, manda un mensaje o una nota de voz, o simplemente llama y suéltalo. Es lo mismo que haces cuando te desahogas con un amigo, solo que aquí se convierte discretamente en un diario privado. Sin app nueva que aprender, sin página en blanco que enfrentar.',
    items: [
      { title: 'Transcripción con IA', desc: 'Precisión perfecta. Tus palabras, capturadas exactamente como las dices.' },
      {
        title: 'Análisis de voz',
        desc: 'Escucha cómo sonabas de verdad. Tono, energía y ritmo, leídos en cada nota de voz.',
      },
      {
        title: 'Fotos y escaneos',
        desc: 'Manda una foto y Empath la lee, incluso páginas escritas a mano, directo a tu diario.',
      },
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
    sub: 'Abre la app y solo pregunta. Cada mensaje, llamada y pensamiento que has mandado queda en la memoria y aparece en segundos.',
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
    peopleTitle: 'Insights de personas',
    peopleBody:
      'Empath se da cuenta de quién aparece una y otra vez en tu diario, y de cómo sueles sentirte cuando lo hace.',
    peopleItems: [
      'Todas las personas de las que escribes, en un solo lugar',
      'Las emociones que aparecen alrededor de cada persona',
      'Cada mención, lista para releer',
      'Edita o quita a cualquiera, cuando quieras',
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
      { title: 'Seguimiento diario del ánimo', desc: 'Análisis automático de sentimiento a partir de tus entradas' },
      { title: 'Análisis de correlaciones', desc: 'Descubre qué actividades te levantan el ánimo' },
      { title: 'Lugares y clima', desc: 'Ve cómo te sientes en casa, en el trabajo y en los días grises' },
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
        metrics: ['Duración del sueño', 'Ritmo cardiaco', 'Presión arterial'],
      },
      {
        title: 'Hábitos diarios',
        desc: 'Los pequeños detalles del día que mueven tu ánimo sin que lo notes.',
        metrics: ['Cafeína', 'Agua', 'Luz del día', 'Minutos de mindfulness'],
      },
    ],
    calloutTitle: 'Insights de salud automáticos',
    calloutBody:
      'Empath lee diez categorías de Apple Health y las analiza junto con tu diario para revelar conexiones poderosas. "Tu ansiedad baja 35% los días que duermes 7+ horas." Insights así te ayudan a tomar mejores decisiones.',
  },

  feature5: {
    badge: 'Con IA',
    title: 'Una IA que de verdad te conoce',
    sub: 'Tu compañero personal de IA conoce toda tu historia. Haz preguntas, obtén insights y recibe orientación personalizada en cualquier momento.',
    companionTitle: 'Tu compañero de IA',
    exchanges: [
      {
        q: '"¿Por qué siempre me siento con ansiedad los lunes?"',
        a: 'Según tus entradas, sueles dormir menos los domingos por la noche y saltarte el desayuno los lunes. Este patrón aparece en 8 de tus últimas 10 entradas de lunes.',
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
      'Recuerda lo que importa entre una entrada y otra',
      'Conoce tu bio y a las personas de las que escribes',
      'Recuerda momentos específicos',
      'Prepárate para tus sesiones de terapia',
    ],
    privacyTitle: '100% privado y seguro',
    privacyBody: 'Tus conversaciones están cifradas y nunca se usan para entrenar modelos de IA. Tu privacidad es nuestra prioridad.',
  },

  featureGrid: {
    badge: 'Y lo demás',
    title: 'Todo lo demás en la app',
    sub: 'Los detalles pequeños que la hacen tuya.',
    items: [
      {
        title: 'Bloqueo biométrico del diario',
        desc: 'Guarda tus entradas más personales detrás de Face ID o Touch ID.',
      },
      {
        title: 'Asistente de diario',
        desc: '¿Te trabaste a media entrada? Pide una pregunta, un empujón o ayuda para encontrar las palabras.',
      },
      {
        title: 'Descúbrete',
        desc: 'Preguntas sacadas de tu propio diario, para los días en que quieres ir más a fondo.',
      },
      {
        title: 'Widgets en la pantalla de inicio',
        desc: 'Registra tu ánimo con un toque y lee la frase del día sin abrir la app.',
      },
      {
        title: 'Tu bio',
        desc: 'Cuéntale tu contexto a Empath una vez. Después de eso, cada insight te queda más cerca.',
      },
      {
        title: 'Entradas pasadas relacionadas',
        desc: 'Al leer una entrada aparecen las más viejas que se le parecen.',
      },
      {
        title: 'Importar y exportar',
        desc: 'Trae tus diarios de antes. Llévate todo cuando quieras.',
      },
      {
        title: 'Diario sin conexión',
        desc: 'Escribe sin señal. Se sincroniza en cuanto vuelves.',
      },
    ],
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
    title: 'Captura por mensaje o llamada. Reflexiona en la app.',
    sub: 'Sin configuración, sin hábito nuevo que construir. Solo habla como ya lo haces con tus amigos.',
    stepLabel: 'Paso',
    steps: [
      {
        title: 'Escribe o llama',
        desc: 'Cuando aparezca un pensamiento o una emoción, mándale un WhatsApp, un Telegram o una llamada a Empath, como le escribirías a un amigo. Sin app, sin registro, sin página en blanco.',
      },
      {
        title: 'Empath lo captura',
        desc: 'Cada mensaje y cada llamada llegan a tu diario privado: transcritos, organizados y guardados automáticamente. Tú solo sigue con tu vida.',
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
    body: 'Tú hablas por mensaje y llamada. La app es donde vive tu diario privado: relee todo, busca momentos pasados y mira cómo se revelan tus patrones de ánimo.',
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

  worries: {
    badge: 'Quizá te lo estés preguntando',
    title: 'Respuestas honestas a dudas justas',
    sub: 'Compartir tu mundo interior con una IA no es poca cosa. Esto es lo que nosotros también querríamos saber antes de escribir una palabra.',
    items: [
      {
        worry: '"¿Quién más puede leer lo que envío?"',
        title: 'Nadie. Es solo tuyo.',
        body: 'Cada entrada está cifrada, cumple con HIPAA y nunca se usa para entrenar modelos de IA. Puedes exportarlo todo o borrarlo todo cuando quieras. Tu diario tiene exactamente un lector: tú.',
      },
      {
        worry: '"He empezado cinco diarios y los abandoné todos."',
        title: 'Este no tiene página en blanco.',
        body: 'No construyes un hábito nuevo: tomas prestado uno que ya tienes, mandar mensajes. Un mensaje de una línea o una nota de voz cuenta como entrada completa, y Empath mantiene viva la conversación para que el día dos sea más fácil que el día uno.',
      },
      {
        worry: '"Nunca sé qué escribir."',
        title: 'No hace falta saberlo.',
        body: 'Empieza con una frase honesta y Empath te hace la pregunta suave que haría un amigo. Contéstala o no. De cualquier forma se convierte en una entrada real, escrita con tu propia voz.',
      },
      {
        worry: '"Hablar de sentimientos con una IA se siente… raro."',
        title: 'Se siente como mandar mensajes, en serio.',
        body: 'Sin voz de robot, sin guion de terapia, sin positividad tóxica. Se lee como un amigo atento que nunca se cansa de ti a las 2 AM. Raro los primeros dos mensajes, sorprendentemente normal después.',
      },
    ],
  },

  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Necesito descargar la app para escribir mi diario?',
        a: 'No. Puedes llevar tu diario por completo por WhatsApp, Telegram o llamada, sin app y sin registro. La app de iOS es opcional: es donde relees tus entradas, buscas momentos pasados y ves tus patrones de ánimo con el tiempo.',
      },
      {
        q: '¿Empath es gratis de verdad?',
        a: '¡Sí! Empath es completamente gratis. Todo lo esencial está incluido sin costo: el diario por mensaje, llamada o app, más transcripción con IA, seguimiento del ánimo e insights.',
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
        a: 'Por ahora solo estamos en iOS, ¡pero igual puedes escribir tu diario por llamada o WhatsApp desde cualquier teléfono! La app para Android está en desarrollo.',
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
        a: 'Sí. Configura un Plan de Diario con ritmo diario o semanal, rachas flexibles que sobreviven a un día perdido, y recordatorios adaptativos por notificación o correo que se saltan solos cuando ya escribiste ese día.',
        link: { text: 'Mira cómo armar un plan de diario que sí se mantenga', to: '/app/blog/journaling-plan' },
      },
    ],
  },

  finalCta: {
    title: 'Lo que sea que traigas en mente, está a un mensaje de distancia',
    sub: 'Sin app que aprender, sin página en blanco que mirar. Solo escribe o llama como ya lo haces con un amigo, y empieza a ver tus patrones en días, no en meses.',
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
    text: 'Textea tus pensamientos',
    call: 'Llamar',
    webApp: 'App web',
  },
};
