// French (tu) copy catalog for the /call-me funnel page. Mirrors callme.en.ts
// exactly (compile-checked via CallMeCopy). PURE DATA ONLY.

import type { CallMeCopy } from './callme.en';

export const callmeFr: CallMeCopy = {
  seo: {
    title: 'Empath t’appelle — Ton journal par téléphone, sans appli',
    description:
      'Entre ton numéro et Empath t’appelle pour ta première entrée de journal vocale. Parle, raccroche, c’est enregistré. Pas d’appli, pas d’inscription, rien à taper.',
    keywords: 'journal par téléphone, journal vocal, journaling par téléphone, tenir un journal sans appli, journal audio',
  },

  hero: {
    badge: 'Pas d’appli. Pas d’inscription. Rien à taper.',
    h1: 'Ta première entrée de journal ? Un simple coup de fil.',
    sub: 'Entre ton numéro et Empath t’appelle. Parle de ta journée pendant quelques minutes, raccroche, et c’est enregistré comme une entrée de journal privée — transcrite, titrée, et qui t’attend quand tu veux.',
  },

  ringing: {
    title: 'On t’appelle — décroche !',
    body: 'Dis bonjour, parle de ta journée et raccroche quand tu as fini. Ton entrée s’enregistre automatiquement et on t’envoie un SMS de confirmation.',
    missedPre: 'Appel manqué ? Compose le',
    missedPost: 'quand tu veux — le journal par téléphone, ça marche 24h/24.',
  },

  scheduled: {
    title: 'C’est noté dans l’agenda !',
    bodyPre: 'Empath t’appellera le',
    bodyPost: '(heure locale). Décroche, parle de ta journée et raccroche quand tu as fini.',
    cantWaitPre: 'Pas envie d’attendre ? Compose le',
    cantWaitPost: 'quand tu veux — le journal par téléphone, ça marche 24h/24.',
  },

  form: {
    phoneLabel: 'Ton numéro de téléphone (États-Unis)',
    dialing: 'Appel en cours…',
    callMeNow: 'Appelle-moi maintenant',
    scheduleTimeLabel: 'Choisis une heure',
    localTimeNote: '(heure locale)',
    scheduling: 'Programmation…',
    scheduleMyCall: 'Programmer mon appel',
    scheduleWindow: 'Dans au moins 10 minutes, et jusqu’à 7 jours à l’avance.',
    orSchedule: 'Ou programme l’appel pour plus tard',
    consent:
      'En demandant un appel, tu acceptes de recevoir un unique appel automatisé d’Empath à ce numéro. Numéros américains uniquement. Le tarif standard de ton opérateur s’applique.',
    errorGeneric: 'Impossible de passer l’appel. Réessaie dans un instant.',
    errorNetwork: 'Une erreur est survenue. Tu peux toujours composer le {phone} directement.',
  },

  dialYourself: {
    pre: 'Tu préfères appeler toi-même ? Appelle ou envoie un SMS au',
    post: '— même journal, à toute heure.',
  },

  how: {
    title: 'Comment ça marche',
    steps: [
      {
        title: 'Décroche',
        text: 'Ton téléphone sonne en quelques secondes. Empath se présente et te demande comment tu te sens.',
      },
      {
        title: 'Parle, c’est tout',
        text: 'Divague, vide ton sac, réfléchis à voix haute — Empath écoute et pose doucement quelques questions. Aucune consigne à retenir.',
      },
      {
        title: 'Raccroche, c’est enregistré',
        text: 'Tes mots deviennent une entrée de journal privée, et tu reçois un SMS qui confirme que tout est bien sauvegardé.',
      },
    ],
  },

  why: {
    title: 'Un journal pour ceux qui n’en tiennent jamais',
    body: 'Le plus dur, quand on tient un journal, c’est la page blanche. Un coup de fil n’a pas de page blanche — raconter ta journée, tu sais déjà le faire. Empath pose les questions, tu réponds, et trois minutes sur ton trajet deviennent une entrée que tu n’aurais jamais tapée.',
    encrypted: 'Tes entrées sont chiffrées au repos. Ton journal t’appartient.',
  },

  faq: {
    title: 'Questions',
    items: [
      {
        q: 'Est-ce qu’il me faut l’appli ?',
        a: 'Non. L’appel, c’est toute l’expérience — rien à télécharger, pas d’inscription, pas de mot de passe. Et si un jour tu veux relire tes entrées et voir tes tendances d’humeur, l’appli iOS gratuite reprend exactement là où tes appels se sont arrêtés.',
      },
      {
        q: 'C’est vraiment une personne qui appelle ?',
        a: 'C’est le compagnon de journal IA d’Empath — le même que derrière notre numéro joignable à toute heure. Il écoute, pose des questions pleines d’attention et transforme la conversation en entrée écrite.',
      },
      {
        q: 'Mon journal est-il privé ?',
        a: 'Oui. Tes entrées sont chiffrées au repos et t’appartiennent. On ne vend jamais tes données.',
      },
      {
        q: 'Combien ça coûte ?',
        a: 'Tes premières entrées sont gratuites — pas de carte bancaire, pas d’essai à résilier. Appeler fait partie d’Empath, et seul le tarif standard de ton opérateur pour un appel classique s’applique.',
      },
    ],
    readBackPrompt: 'Envie de relire tes entrées ?',
    appStoreCta: 'Télécharge Empath sur l’App Store',
  },

  footer: {
    privacy: 'Confidentialité',
    terms: 'Conditions',
  },
};
