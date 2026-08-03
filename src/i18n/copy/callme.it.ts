// Italian (tu) copy catalog for the /call-me funnel page. Mirrors
// callme.en.ts exactly; compile-checked via CallMeCopy.

import type { CallMeCopy } from './callme.en';

export const callmeIt: CallMeCopy = {
  seo: {
    title: 'Empath ti chiama: il diario per telefono, senza app',
    description:
      "Inserisci il tuo numero ed Empath ti chiama per la tua prima voce di diario a voce. Parla, riattacca ed è salvata. Niente app, senza registrazione, niente da scrivere.",
    keywords:
      'diario per telefono, diario vocale, journaling per telefono, diario senza app, diario audio',
  },

  hero: {
    badge: 'Niente app. Senza registrazione. Niente da scrivere.',
    h1: 'La tua prima voce di diario è a una telefonata di distanza.',
    sub: 'Inserisci il tuo numero ed Empath ti chiama. Racconta la tua giornata per un paio di minuti, riattacca, ed è salvata come voce privata del tuo diario: trascritta, con un titolo, pronta per quando vorrai rileggerla.',
  },

  ringing: {
    title: 'Ti stiamo chiamando: rispondi!',
    body: 'Saluta, racconta la tua giornata e riattacca quando hai finito. La tua voce si salva automaticamente e ti mandiamo un SMS di conferma.',
    missedPre: 'Non hai fatto in tempo a rispondere? Chiama il',
    missedPost: 'quando vuoi: il diario per telefono funziona a qualsiasi ora.',
  },

  scheduled: {
    title: 'Sei in calendario!',
    bodyPre: 'Empath ti chiamerà il',
    bodyPost: '(la tua ora locale). Rispondi, racconta la tua giornata e riattacca quando hai finito.',
    cantWaitPre: "Non vedi l'ora? Chiama il",
    cantWaitPost: 'quando vuoi: il diario per telefono funziona a qualsiasi ora.',
  },

  form: {
    phoneLabel: 'Il tuo numero di telefono (USA)',
    dialing: 'Chiamata in corso…',
    callMeNow: 'Chiamami ora',
    scheduleTimeLabel: 'Scegli un orario',
    localTimeNote: '(la tua ora locale)',
    scheduling: 'Programmazione in corso…',
    scheduleMyCall: 'Programma la mia chiamata',
    scheduleWindow: 'Almeno 10 minuti da adesso, fino a un massimo di 7 giorni.',
    orSchedule: 'Oppure programma la chiamata per più tardi',
    consent:
      'Richiedendo una chiamata accetti di ricevere una singola chiamata automatica da Empath a questo numero. Solo numeri statunitensi. Si applicano le tariffe standard del tuo operatore.',
    errorGeneric: 'Non siamo riusciti a effettuare la chiamata. Riprova tra un momento.',
    errorNetwork: 'Qualcosa è andato storto. Puoi sempre chiamare direttamente il {phone}.',
  },

  dialYourself: {
    pre: 'Preferisci chiamare tu? Chiama o scrivi al',
    post: 'per lo stesso diario, a qualsiasi ora.',
  },

  how: {
    title: 'Come funziona',
    steps: [
      {
        title: 'Rispondi',
        text: 'Il telefono squilla in pochi secondi. Empath si presenta e ti chiede come ti senti.',
      },
      {
        title: 'Parla e basta',
        text: 'Divaga, sfogati, rifletti: Empath ascolta e ti fa domande con delicatezza. Niente spunti da imparare a memoria.',
      },
      {
        title: 'Riattacca, ed è salvata',
        text: 'Le tue parole diventano una voce privata del diario, e ricevi un SMS che ti conferma che è salvata.',
      },
    ],
  },

  why: {
    title: 'Il diario per chi il diario non lo tiene mai',
    body: 'La parte più difficile del tenere un diario è la pagina bianca. Una telefonata non ha pagine bianche: parlare della tua giornata lo sai già fare. Empath chiede, tu rispondi, e tre minuti di tragitto diventano una voce che non avresti mai scritto.',
    encrypted: 'Le voci sono crittografate a riposo. Il tuo diario appartiene a te.',
  },

  faq: {
    title: 'Domande',
    items: [
      {
        q: "Mi serve l'app?",
        a: "No. La chiamata è l'esperienza completa: niente download, senza registrazione, niente password. Se poi vorrai rileggere le tue voci e vedere gli insight sul tuo umore, l'app gratuita per iOS riprende esattamente da dove sono arrivate le tue chiamate.",
      },
      {
        q: 'Ma è davvero una persona a chiamarmi?',
        a: 'È il compagno di diario AI di Empath, lo stesso dietro il nostro numero attivo a qualsiasi ora. Ascolta, fa domande ponderate e trasforma la conversazione in una voce scritta.',
      },
      {
        q: 'Il mio diario è privato?',
        a: 'Sì. Le voci sono crittografate a riposo e appartengono a te. Non vendiamo mai i tuoi dati.',
      },
      {
        q: 'Quanto costa?',
        a: 'Le tue prime voci sono gratuite: niente carta, nessuna prova da disdire. Chiamare fa parte di Empath, e si applicano le tariffe standard del tuo operatore per una normale telefonata.',
      },
    ],
    readBackPrompt: 'Vuoi rileggere le tue voci?',
    appStoreCta: "Scarica Empath dall'App Store",
  },

  footer: {
    privacy: 'Privacy',
    terms: 'Termini',
  },
};
