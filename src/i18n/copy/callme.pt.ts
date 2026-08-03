// Brazilian Portuguese (você) copy catalog for the /call-me funnel page.
// Mirrors callme.en.ts exactly; compile-checked via CallMeCopy.

import type { CallMeCopy } from './callme.en';

export const callmePt: CallMeCopy = {
  seo: {
    title: 'A Empath liga para você: journaling por telefone, sem app',
    description:
      'Digite seu número e a Empath liga para você para sua primeira entrada de diário por voz. Desabafe, desligue, e pronto: está salva. Sem app, sem cadastro, sem digitar.',
    keywords:
      'diário por telefone, journaling por voz, journaling por telefone, journaling sem aplicativo, diário em áudio',
  },

  hero: {
    badge: 'Sem app. Sem cadastro. Sem digitar.',
    h1: 'Sua primeira entrada de diário está a uma ligação de distância.',
    sub: 'Digite seu número e a Empath liga para você. Fale sobre o seu dia por alguns minutos, desligue, e a conversa vira uma entrada de diário privada: transcrita, com título, esperando por você quando quiser.',
  },

  ringing: {
    title: 'Estamos ligando agora, atenda!',
    body: 'Diga oi, fale sobre o seu dia e desligue quando terminar. Sua entrada é salva automaticamente e enviamos um SMS de confirmação.',
    missedPre: 'Perdeu a ligação? Ligue para',
    missedPost: 'a qualquer momento. O journaling por telefone funciona 24 horas por dia.',
  },

  scheduled: {
    title: 'Está agendado!',
    bodyPre: 'A Empath vai ligar para você em',
    bodyPost: '(no seu horário local). Atenda, fale sobre o seu dia e desligue quando terminar.',
    cantWaitPre: 'Não quer esperar? Ligue para',
    cantWaitPost: 'a qualquer momento. O journaling por telefone funciona 24 horas por dia.',
  },

  form: {
    phoneLabel: 'Seu número de telefone (EUA)',
    dialing: 'Ligando…',
    callMeNow: 'Me ligue agora',
    scheduleTimeLabel: 'Escolha um horário',
    localTimeNote: '(seu horário local)',
    scheduling: 'Agendando…',
    scheduleMyCall: 'Agendar minha ligação',
    scheduleWindow: 'No mínimo daqui a 10 minutos, até 7 dias a partir de agora.',
    orSchedule: 'Ou agende a ligação para mais tarde',
    consent:
      'Ao solicitar uma ligação, você concorda em receber uma única chamada automatizada da Empath neste número. Somente números dos EUA. Aplicam-se as tarifas padrão da operadora.',
    errorGeneric: 'Não conseguimos fazer a ligação. Tente novamente em instantes.',
    errorNetwork: 'Algo deu errado. Você sempre pode ligar diretamente para {phone}.',
  },

  dialYourself: {
    pre: 'Prefere ligar você mesmo? Ligue ou mande mensagem para',
    post: 'e use o mesmo diário, a qualquer hora.',
  },

  how: {
    title: 'Como funciona',
    steps: [
      {
        title: 'Atenda',
        text: 'Seu telefone toca em segundos. A Empath se apresenta e pergunta como você está se sentindo.',
      },
      {
        title: 'Só fale',
        text: 'Divague, desabafe, reflita: a Empath escuta e faz perguntas com delicadeza. Nada de decorar prompts.',
      },
      {
        title: 'Desligue, está salvo',
        text: 'Suas palavras viram uma entrada de diário privada, e você recebe um SMS confirmando que foi salva.',
      },
    ],
  },

  why: {
    title: 'Journaling para quem nunca escreve diário',
    body: 'A parte mais difícil de escrever um diário é a página em branco. Uma ligação não tem página em branco: você já sabe falar sobre o seu dia. A Empath pergunta, você responde, e três minutos no trajeto viram uma entrada que você nunca teria digitado.',
    encrypted: 'As entradas são criptografadas em repouso. Seu diário pertence a você.',
  },

  faq: {
    title: 'Perguntas',
    items: [
      {
        q: 'Preciso do app?',
        a: 'Não. A ligação é a experiência completa: sem download, sem cadastro, sem senha. Se depois você quiser reler suas entradas e ver insights de humor, o app gratuito para iOS continua exatamente de onde suas ligações pararam.',
      },
      {
        q: 'É realmente uma pessoa ligando?',
        a: 'É a companheira de journaling com IA da Empath, a mesma por trás do nosso número que atende a qualquer hora. Ela escuta, faz perguntas atenciosas e transforma a conversa em uma entrada escrita.',
      },
      {
        q: 'Meu diário é privado?',
        a: 'Sim. As entradas são criptografadas em repouso e pertencem a você. Nunca vendemos seus dados.',
      },
      {
        q: 'Quanto custa?',
        a: 'Suas primeiras entradas são gratuitas: sem cartão, sem período de teste para cancelar. Ligar faz parte da Empath, e aplicam-se as tarifas padrão da operadora para uma ligação comum.',
      },
    ],
    readBackPrompt: 'Quer reler suas entradas?',
    appStoreCta: 'Baixe a Empath na App Store',
  },

  footer: {
    privacy: 'Privacidade',
    terms: 'Termos',
  },
};
