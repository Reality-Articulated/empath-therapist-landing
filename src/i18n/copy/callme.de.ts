// German (du) copy catalog for the /call-me funnel page. Mirrors
// callme.en.ts exactly (compile-checked via CallMeCopy). PURE DATA ONLY.

import type { CallMeCopy } from './callme.en';

export const callmeDe: CallMeCopy = {
  seo: {
    title: 'Empath ruft dich an: Journaling per Telefon, ganz ohne App',
    description:
      'Gib deine Nummer ein und Empath ruft dich für deinen ersten Sprach-Journaleintrag an. Sprich dich aus, leg auf, und alles ist gespeichert. Keine App, keine Registrierung, kein Tippen.',
    keywords: 'Tagebuch per Telefon, Sprachjournaling, Journaling per Anruf, Tagebuch ohne App, Audio-Tagebuch',
  },

  hero: {
    badge: 'Keine App. Keine Registrierung. Kein Tippen.',
    h1: 'Dein erster Journaleintrag ist nur einen Anruf entfernt.',
    sub: 'Gib deine Nummer ein und Empath ruft dich an. Erzähl ein paar Minuten von deinem Tag, leg auf, und schon ist alles als privater Journaleintrag gespeichert: transkribiert, mit Titel versehen und jederzeit für dich da.',
  },

  ringing: {
    title: 'Wir rufen dich gerade an, geh ran!',
    body: 'Sag Hallo, erzähl von deinem Tag und leg auf, wann immer du fertig bist. Dein Eintrag wird automatisch gespeichert, und du bekommst eine Bestätigung per SMS.',
    missedPre: 'Verpasst? Ruf einfach',
    missedPost: 'an. Journaling per Telefon funktioniert rund um die Uhr.',
  },

  scheduled: {
    title: 'Dein Anruf steht im Kalender!',
    bodyPre: 'Empath ruft dich an:',
    bodyPost: '(deine Ortszeit). Geh ran, erzähl von deinem Tag und leg auf, wenn du fertig bist.',
    cantWaitPre: 'Du kannst es kaum erwarten? Ruf einfach',
    cantWaitPost: 'an. Journaling per Telefon funktioniert rund um die Uhr.',
  },

  form: {
    phoneLabel: 'Deine Telefonnummer (US)',
    dialing: 'Wird gewählt…',
    callMeNow: 'Ruf mich jetzt an',
    scheduleTimeLabel: 'Wähl einen Zeitpunkt',
    localTimeNote: '(deine Ortszeit)',
    scheduling: 'Wird geplant…',
    scheduleMyCall: 'Anruf planen',
    scheduleWindow: 'Frühestens in 10 Minuten, bis zu 7 Tage im Voraus.',
    orSchedule: 'Oder plane den Anruf für später',
    consent:
      'Mit deiner Anfrage stimmst du zu, einen einzelnen automatisierten Anruf von Empath auf dieser Nummer zu erhalten. Nur US-Nummern. Es gelten die üblichen Tarife deines Mobilfunkanbieters.',
    errorGeneric: 'Der Anruf hat leider nicht geklappt. Bitte versuch es gleich noch einmal.',
    errorNetwork: 'Etwas ist schiefgelaufen. Du kannst {phone} jederzeit auch direkt anrufen.',
  },

  dialYourself: {
    pre: 'Du wählst lieber selbst? Ruf an unter',
    post: 'und lande in demselben Journal, jederzeit.',
  },

  how: {
    title: 'So funktioniert’s',
    steps: [
      {
        title: 'Geh ran',
        text: 'Dein Telefon klingelt innerhalb weniger Sekunden. Empath stellt sich vor und fragt, wie es dir gerade geht.',
      },
      {
        title: 'Einfach reden',
        text: 'Schweif ab, lass Dampf ab, denk laut nach. Empath hört zu und hakt behutsam nach. Du musst dir nichts zurechtlegen.',
      },
      {
        title: 'Auflegen, fertig gespeichert',
        text: 'Deine Worte werden zu einem privaten Journaleintrag, und du bekommst eine SMS, sobald alles gespeichert ist.',
      },
    ],
  },

  why: {
    title: 'Journaling für Menschen, die nie Tagebuch schreiben',
    body: 'Das Schwerste am Journaling ist die leere Seite. Ein Anruf hat keine leere Seite. Wie man von seinem Tag erzählt, weißt du längst. Empath fragt, du antwortest, und aus drei Minuten auf dem Weg zur Arbeit wird ein Eintrag, den du nie getippt hättest.',
    encrypted: 'Deine Einträge werden verschlüsselt gespeichert. Dein Journal gehört dir.',
  },

  faq: {
    title: 'Fragen',
    items: [
      {
        q: 'Brauche ich die App?',
        a: 'Nein. Der Anruf ist das ganze Erlebnis: kein Download, keine Registrierung, kein Passwort. Wenn du deine Einträge später nachlesen und Stimmungs-Insights sehen möchtest, knüpft die kostenlose iOS-App genau da an, wo deine Anrufe aufgehört haben.',
      },
      {
        q: 'Ruft da wirklich ein Mensch an?',
        a: 'Es ist Empaths KI-Journaling-Begleiter, derselbe, der hinter unserer Nummer zum Jederzeit-Anrufen steckt. Er hört zu, stellt einfühlsame Fragen und macht aus dem Gespräch einen geschriebenen Eintrag.',
      },
      {
        q: 'Ist mein Journal privat?',
        a: 'Ja. Deine Einträge werden verschlüsselt gespeichert und gehören dir. Wir verkaufen deine Daten niemals.',
      },
      {
        q: 'Was kostet das?',
        a: 'Deine ersten Einträge sind kostenlos: keine Kreditkarte, kein Probeabo, das du kündigen musst. Anrufen ist Teil von Empath; es gelten die üblichen Tarife deines Mobilfunkanbieters für ein normales Telefonat.',
      },
    ],
    readBackPrompt: 'Möchtest du deine Einträge nachlesen?',
    appStoreCta: 'Hol dir Empath im App Store',
  },

  footer: {
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
  },
};
