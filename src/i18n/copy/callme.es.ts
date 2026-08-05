// Spanish (neutral Latin-American, tú) copy catalog for the /call-me funnel
// page. Mirrors callme.en.ts exactly; compile-checked via CallMeCopy.

import type { CallMeCopy } from './callme.en';

export const callmeEs: CallMeCopy = {
  seo: {
    title: 'Empath te llama: escribe tu diario por teléfono, sin app',
    description:
      'Ingresa tu número y Empath te llama para tu primera entrada de diario por voz. Habla, cuelga y queda guardada. Sin app, sin registro, sin teclear.',
    keywords:
      'diario por teléfono, diario por voz, journaling por teléfono, diario sin app, diario de audio',
  },

  hero: {
    badge: 'Sin app. Sin registro. Sin teclear.',
    h1: 'Tu primera entrada de diario está a una llamada de distancia.',
    sub: 'Ingresa tu número y Empath te llama. Habla de tu día durante un par de minutos, cuelga, y queda guardado como una entrada privada de tu diario: transcrita, con título y lista para cuando quieras leerla.',
  },

  ringing: {
    title: 'Te estamos llamando. ¡Contesta!',
    body: 'Saluda, cuenta cómo va tu día y cuelga cuando termines. Tu entrada se guarda automáticamente y te enviaremos un mensaje de texto de confirmación.',
    missedPre: '¿No alcanzaste a contestar? Marca',
    missedPost: 'cuando quieras. El diario por teléfono funciona a toda hora.',
  },

  scheduled: {
    title: '¡Ya estás en el calendario!',
    bodyPre: 'Empath te llamará el',
    bodyPost: '(tu hora local). Contesta, habla de tu día y cuelga cuando termines.',
    cantWaitPre: '¿No puedes esperar? Marca',
    cantWaitPost: 'cuando quieras. El diario por teléfono funciona a toda hora.',
  },

  form: {
    phoneLabel: 'Tu número de teléfono (EE. UU.)',
    dialing: 'Llamando…',
    callMeNow: 'Llámame ahora',
    scheduleTimeLabel: 'Elige una hora',
    localTimeNote: '(tu hora local)',
    scheduling: 'Agendando…',
    scheduleMyCall: 'Agendar mi llamada',
    scheduleWindow: 'Con al menos 10 minutos de anticipación y hasta 7 días después.',
    orSchedule: 'O agenda la llamada para más tarde',
    consent:
      'Al solicitar una llamada aceptas recibir una única llamada automatizada de Empath a este número. Solo números de EE. UU. Aplican las tarifas estándar de tu operador.',
    errorGeneric: 'No pudimos realizar la llamada. Inténtalo de nuevo en un momento.',
    errorNetwork: 'Algo salió mal. Siempre puedes marcar {phone} directamente.',
  },

  dialYourself: {
    pre: '¿Prefieres marcar tú? Llama al',
    post: '. El mismo diario, a cualquier hora.',
  },

  how: {
    title: 'Cómo funciona',
    steps: [
      {
        title: 'Contesta',
        text: 'Tu teléfono suena en segundos. Empath se presenta y te pregunta cómo te sientes.',
      },
      {
        title: 'Solo habla',
        text: 'Divaga, desahógate, reflexiona: Empath escucha y te hace preguntas con delicadeza. No hay nada que memorizar.',
      },
      {
        title: 'Cuelga, y queda guardado',
        text: 'Tus palabras se convierten en una entrada privada de tu diario, y recibes un mensaje de texto confirmando que se guardó.',
      },
    ],
  },

  why: {
    title: 'Un diario para quienes nunca escriben un diario',
    body: 'Lo más difícil de llevar un diario es la página en blanco. Una llamada no tiene página en blanco: ya sabes hablar de tu día. Empath pregunta, tú respondes, y tres minutos de camino al trabajo se convierten en una entrada que nunca habrías tecleado.',
    encrypted: 'Las entradas se cifran en reposo. Tu diario te pertenece.',
  },

  faq: {
    title: 'Preguntas',
    items: [
      {
        q: '¿Necesito la app?',
        a: 'No. La llamada es la experiencia completa: sin descarga, sin registro, sin contraseña. Si más adelante quieres releer tus entradas y ver estadísticas de tu ánimo, la app gratuita para iOS continúa justo donde quedaron tus llamadas.',
      },
      {
        q: '¿De verdad me llama una persona?',
        a: 'Es el compañero de diario con IA de Empath, el mismo que atiende nuestro número disponible a toda hora. Escucha, hace preguntas pensadas y convierte la conversación en una entrada escrita.',
      },
      {
        q: '¿Mi diario es privado?',
        a: 'Sí. Las entradas se cifran en reposo y te pertenecen. Nunca vendemos tus datos.',
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Tus primeras entradas son gratis: sin tarjeta, sin prueba que cancelar. Llamar es parte de Empath, y aplican las tarifas estándar de tu operador para una llamada normal.',
      },
    ],
    readBackPrompt: '¿Quieres releer tus entradas?',
    appStoreCta: 'Descarga Empath en el App Store',
  },

  footer: {
    privacy: 'Privacidad',
    terms: 'Términos',
  },
};
