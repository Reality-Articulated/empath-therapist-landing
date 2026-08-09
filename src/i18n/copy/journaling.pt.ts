// Brazilian Portuguese copy catalog for the consumer landing page.
// Mirrors journaling.en.ts exactly; see that file for structure notes.

import type { JournalingCopy } from './journaling.en';

export const journalingPt: JournalingCopy = {
  seo: {
    title: 'Empath - O app que você nunca precisa abrir | Mande seus pensamentos por mensagem, WhatsApp ou ligação',
    description:
      'Existe um número onde você simplesmente escreve seu diário. Mande um WhatsApp, um Telegram, ligue. Ou peça para ele te ligar. Sem app, sem cadastro, sem página em branco. Suas entradas viram padrões de humor e insights que você consegue ver de verdade.',
    keywords:
      'diário por mensagem, diário por voz, diário sem aplicativo, diário por SMS, diário no WhatsApp, diário por ligação, monitoramento de humor, diário por chat, assistente de diário com IA, diário em conversa, plano de journaling, hábito de escrever diário',
  },

  header: {
    features: 'Recursos',
    howItWorks: 'Como funciona',
    faq: 'Perguntas frequentes',
    blog: 'Blog',
    download: 'Baixar',
  },

  hero: {
    h1Pre: 'O diário que você',
    h1Highlight: 'não vai abandonar.',
    sub: 'Porque ele vive onde você já está: é só mandar uma mensagem ou ligar quando algo estiver na sua cabeça. O Empath te ajuda a escrever seu diário e explorar sua mente, revelando seus padrões ao longo do tempo.',
    mobileLead: 'Algo na sua cabeça? É só ligar ou mandar uma mensagem.',
    call: 'Ligar',
    text: 'Mensagem',
    orFavoriteApp: 'Ou use o app em que você já está',
    phoneMeta: 'Disponível 24h • Sem cadastro',
    wantInsights: 'Quer tendências de humor e insights?',
    getApp: 'Baixe o app grátis',
    appBenefits: 'Gráficos de humor, detecção de padrões, sincronização com o Apple Health',
    desktopLead: 'Diga o que está na sua cabeça com uma ligação ou mensagem. Sem app para baixar, sem cadastro para fazer.',
    textToJournal: 'Mande seus pensamentos',
    callAndTalk: 'Ligue e só converse',
    textUsAt: 'Mande mensagem para',
    callUsAt: 'Ligue para',
    availability: 'Disponível 24h • Grátis • Funciona de qualquer telefone',
    preferTyping: 'Prefere digitar no computador?',
    openDashboard: 'Abra o painel web',
  },

  // A/B test hero (PostHog experiment flag `landing-hero-copy`, variant
  // `never-open`): swaps ONLY the H1 + subheadline. Control renders `hero`
  // above. Remove once the experiment is decided.
  heroExperiment: {
    h1Pre: 'Cansou de se explicar de novo',
    h1Highlight: 'pro ChatGPT?',
    sub: 'O Empath já conhece você. Ele vive no WhatsApp, Telegram, Messenger e Instagram, lembra de cada conversa e retoma exatamente de onde você parou. É só mandar mensagem ou ligar quando tiver algo na cabeça.',
  },

  trust: {
    hipaa: 'Segurança HIPAA',
    ai: 'Insights com IA',
    loved: 'Amado por milhares',
  },

  tryIt: {
    badge: 'Experimente aqui mesmo',
    title: 'Vai, manda alguma coisa',
    sub: 'Uma pequena amostra do Empath nesta página. Toque em uma mensagem e veja a resposta. Nada do que você toca aqui é salvo ou enviado para lugar nenhum.',
    greeting: 'Oi, eu sou o Empath 👋 Sou a IA para quem você manda mensagem como para um amigo. Escolha uma mensagem abaixo e veja o que acontece.',
    pickPrompt: 'Mande uma mensagem para o Empath:',
    followUpPrompt: 'Continue a conversa:',
    branches: [
      {
        key: 'rough-day',
        option: 'Tive um dia difícil',
        userText: 'hoje foi demais. estou exausto e minha cabeça não desliga',
        reply: 'Parece pesado. Exausto mas acelerado é a pior combinação. O que de hoje ainda está ocupando mais espaço?',
        followUps: [
          {
            key: 'work',
            option: 'Coisa de trabalho, principalmente',
            userText: 'coisa de trabalho principalmente. coisas demais, eu de menos',
            reply: 'Então é o volume, não um desastre só. Isso vale a pena saber sobre você. Se a gente conversasse de verdade, eu lembraria desse padrão e avisaria na próxima vez que o trabalho acumulasse assim.',
          },
          {
            key: 'person',
            option: 'É uma pessoa, na verdade',
            userText: 'é uma pessoa na verdade. alguém me tirou do sério hoje',
            reply: 'Coisa de gente dura mais que coisa de tarefa. Se você me dissesse quem, eu lembraria dela na próxima vez que aparecesse, e você começaria a ver como ela afeta os seus dias.',
          },
        ],
      },
      {
        key: 'untangle',
        option: 'Me ajuda a entender uma coisa',
        userText: 'posso pensar em voz alta um segundo? tem uma coisa me incomodando há dias',
        reply: 'É literalmente para isso que eu sirvo. Em voz alta é como os nós se soltam. Me dá a versão bagunçada, não precisa fazer sentido.',
        followUps: [
          {
            key: 'decision',
            option: 'É uma decisão que eu fico evitando',
            userText: 'é uma decisão que eu fico adiando. as duas opções parecem erradas',
            reply: 'Quando as duas opções parecem erradas, geralmente tem uma terceira coisa que você está protegendo. Numa conversa de verdade eu perguntaria sobre isso, e salvaria o fio inteiro para você reler quando estivesse pronto para decidir.',
          },
          {
            key: 'feeling',
            option: 'É um sentimento que não sei nomear',
            userText: 'sinceramente é mais um sentimento. nem consigo dar nome',
            reply: 'Você não precisa dar nome. Descreve onde ele aparece: de manhã? depois de certas pessoas? O nome vem depois, e eu iria juntando as pistas com você.',
          },
        ],
      },
      {
        key: 'first-time',
        option: 'Nunca escrevi um diário',
        userText: 'nunca escrevi um diário. não sei direito como isso funciona',
        reply: 'Você acabou de escrever. Essa mensagem? Isso é um diário, do jeito que funciona aqui. Sem regras, sem formato, sem sequências para manter vivas. É só dizer as coisas quando sentir.',
        followUps: [
          {
            key: 'what-happens',
            option: 'O que acontece com o que eu mando?',
            userText: 'ok mas o que acontece com o que eu te mando?',
            reply: 'Vira uma entrada privada do seu diário: salva, criptografada, só sua. Com o tempo eu ligo os pontos entre as entradas e mostro padrões que você consegue ver de verdade.',
          },
          {
            key: 'wont-stick',
            option: 'Duvido que eu mantenha o hábito',
            userText: 'sinceramente duvido que eu mantenha. nunca mantenho',
            reply: 'Você não mantém apps. Isso vive nas suas mensagens, então não tem o que manter. Sumiu uma semana? Nada quebra. Eu estarei aqui quando algo estiver na sua cabeça.',
          },
        ],
      },
      {
        key: 'cant-sleep',
        option: 'Não consigo dormir',
        userText: 'é tarde e não consigo dormir. minha cabeça fica repetindo o dia de hoje',
        reply: 'Quando a cabeça repete cenas de madrugada, algo de hoje ainda pede atenção. Me conta a cena para onde sua cabeça volta, que eu seguro ela para você não precisar carregar.',
        followUps: [
          {
            key: 'conversation',
            option: 'Uma conversa que eu tive',
            userText: 'uma conversa de hoje. fico pensando em coisas melhores que eu podia ter dito',
            reply: 'A resposta perfeita sempre chega depois da meia-noite. Escrever aqui tira ela do loop, e numa entrada de verdade eu lembraria disso para você reler amanhã com outros olhos.',
          },
          {
            key: 'tomorrow',
            option: 'Amanhã está me estressando',
            userText: 'na real é o amanhã que me preocupa. dia importante',
            reply: 'Nervosismo de véspera geralmente significa que importa, não que você não está pronto. Numa conversa de verdade eu salvaria isso, e amanhã à noite você me contaria como foi. Spoiler: quase sempre melhor que a versão das 2 da manhã.',
          },
        ],
      },
      {
        key: 'vent',
        option: 'Só preciso desabafar',
        userText: 'não quero conselho agora. só preciso botar uma coisa para fora',
        reply: 'Então nada de conselho. Este espaço é seu: fala alto, injusto e bagunçado do jeito que precisar. Eu só escuto.',
        followUps: [
          {
            key: 'really-listen',
            option: 'Você vai só escutar mesmo?',
            userText: 'você vai só escutar mesmo? sem consertar nada?',
            reply: 'Vou. Desabafar funciona porque dizer em voz alta alivia a pressão. Se um dia você quiser mais do que escuta, você pede primeiro. Esse é o combinado.',
          },
          {
            key: 'feels-petty',
            option: 'É meio bobagem, na real',
            userText: 'é meio bobagem na real. mas me incomodou o dia inteiro',
            reply: 'Se incomodou o dia inteiro, não é bobagem: é informação. As coisas pequenas que você nunca fala em voz alta são onde os padrões costumam se esconder.',
          },
        ],
      },
      {
        key: 'good-news',
        option: 'Aconteceu uma coisa boa!',
        userText: 'ok, hoje aconteceu uma coisa muito boa e não tenho para quem contar',
        reply: 'Me conta tudo. Momentos bons merecem ser guardados, não só atravessados. O que aconteceu?',
        followUps: [
          {
            key: 'small-win',
            option: 'É uma vitória pequena, mas é minha',
            userText: 'é uma vitória pequena mas é minha. finalmente fiz aquilo',
            reply: 'Vitórias pequenas são as que se acumulam. Salvo, com a data de hoje. Num dia ruim eu te lembraria: você é alguém que faz as coisas.',
          },
          {
            key: 'why-record',
            option: 'Por que registrar os dias bons?',
            userText: 'vale a pena escrever quando está tudo bem?',
            reply: 'As entradas boas são as que o seu eu do futuro mais relê. E é assim que eu aprendo o que realmente te levanta, para os padrões não serem só sobre o que dá errado.',
          },
        ],
      },
    ],
    ctaLead: 'Essa foi a demo. O Empath de verdade lembra de você.',
    cta: 'Baixe o app grátis',
    ctaNote: 'Grátis na App Store. Suas entradas viram os insights que aparecem ao redor desta demo.',
    restart: 'Tentar outro começo',
    screenshotAlt: 'Captura de tela do app Empath',
  },

  whatsappSection: {
    badge: 'O Empath nas suas DMs',
    title: 'Mais que um lugar para desabafar',
    sub: 'Aquele surto das 2 da manhã, um áudio que você está cansado demais para digitar, um dia difícil. Você manda como mandaria para um amigo. O Empath escuta, faz a pergunta que um amigo faria e lembra o que você disse na terça passada: tudo salvo de forma privada, só para você.',
    cta: 'Conversar no WhatsApp',
    phoneNote: 'Ou mande mensagem para {phone} no Telegram, Messenger ou Instagram. Conversas de exemplo.',
    examples: [
      {
        key: 'late-night',
        title: 'O desabafo das 02:47',
        caption: 'Para quando sua cabeça não desliga e todo mundo já dormiu.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'eu sei que é tarde. fico repassando aquela conversa com meu chefe e não sei se exagerei. não quis acordar ninguém então tô contando pra você',
            time: '02:47',
          },
          {
            from: 'empath',
            text: 'Você não precisa resolver isso hoje. Ficar repassando geralmente significa que foi importante, não que você exagerou. Quer que eu guarde isso até amanhã de manhã?',
            time: '02:47',
          },
          { from: 'user', text: 'guarda sim. obrigada', time: '02:48' },
          { from: 'empath', text: 'Sempre. Vai estar aqui quando você acordar. Tenta dormir 💛', time: '02:48' },
        ],
      },
      {
        key: 'voice-note',
        title: 'Cansado demais para digitar',
        caption: 'Mande um áudio. Ele escuta de verdade.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          { from: 'user', voice: true, duration: '1:47', time: '23:12' },
          {
            from: 'empath',
            text: 'Dia longo, deu para ouvir. Três coisas acumuladas antes do meio-dia, e mesmo assim você atendeu a ligação da sua irmã. Você disse duas vezes que "devia ter lidado melhor". Com carinho: você lidou. Salvo.',
            time: '23:13',
          },
          { from: 'user', text: 'como você sempre faz parecer que dá pra sobreviver', time: '23:14' },
          { from: 'empath', text: 'Porque é você quem está contando a história. Boa noite.', time: '23:14' },
        ],
      },
      {
        key: 'mom',
        title: 'A culpa do dia a dia',
        caption: 'Ele lembra o que você está tentando melhorar.',
        contactName: 'Empath',
        unknownAvatar: false,
        messages: [
          {
            from: 'user',
            text: 'fui grossa com minha mãe de novo hoje e me sinto péssima. ela só tava perguntando da viagem',
            time: '18:03',
          },
          {
            from: 'empath',
            text: 'O fato de isso estar pesando tanto em você mostra o quanto você se importa. Você está no limite desde terça: a grosseria é o transbordo, não a verdade sobre quem você é para ela. Vocês conversaram depois?',
            time: '18:04',
          },
          { from: 'user', text: 'ainda não. talvez amanhã', time: '18:06' },
          { from: 'empath', text: 'Amanhã está ótimo. Vou lembrar que você quis fazer isso.', time: '18:06' },
        ],
      },
      {
        key: 'no-app',
        title: '"Pera, sem app?"',
        caption: 'Sem app. Sem cadastro. Você só manda mensagem para o número.',
        contactName: '+1 (888) 366-3082',
        unknownAvatar: true,
        messages: [
          { from: 'user', text: 'pera, então eu posso mandar pra esse número qualquer coisa que estiver na minha cabeça? sem app?', time: '09:14' },
          {
            from: 'empath',
            text: 'É isso mesmo. Sem app, sem cadastro, sem página em branco te encarando. Me conta como foi seu dia. Uma frase já basta.',
            time: '09:14',
          },
          { from: 'user', text: 'ok. sinceramente já tô exausta e são 9 da manhã', time: '09:15' },
          { from: 'empath', text: 'Então essa é a primeira entrada de hoje: salva. O que está drenando mais a sua energia essa manhã?', time: '09:15' },
        ],
      },
    ],
    chatUi: {
      today: 'Hoje',
      online: 'online',
      typing: 'digitando…',
      inputPlaceholder: 'Mensagem',
    },
  },

  crossChannel: {
    badge: 'Uma memória, todos os apps',
    title: 'Comece em qualquer lugar. Continue em todos.',
    sub: 'O Empath vive onde você já está. Desabafe hoje à noite, pergunte sobre isso no WhatsApp tomando café, aprofunde no Telegram depois do trabalho, feche o ciclo no Instagram enquanto rola o feed. Todos os canais falam com o mesmo Empath, e com a mesma memória.',
    pickApp: 'Escolha o app em que você já está',
    journalStep: {
      time: 'Terça 21:41',
      channel: 'Entrada por voz',
      cardTitle: 'A noite antes da apresentação',
      cardSub: 'Entrada por voz · 2 min',
      quote:
        '"Fico ensaiando a introdução sem parar. E se eu simplesmente der branco na frente de todo mundo amanhã? Eu conheço esse conteúdo melhor que qualquer um do time, mas meu cérebro não aceita..."',
    },
    steps: [
      {
        key: 'whatsapp',
        time: 'Quarta 08:04',
        channel: 'WhatsApp',
        userMsg: 'bom dia. eu tava sendo dramática ontem à noite?',
        empathMsg:
          'Um pouquinho 💛 Você ensaiou a introdução quatro vezes. Mas também disse que conhece esse conteúdo melhor que qualquer um. Segura essa parte hoje.',
      },
      {
        key: 'telegram',
        time: 'Quarta 14:37',
        channel: 'Telegram',
        userMsg: 'apresentação feita, foi tranquilo. por que eu sempre surto na noite anterior?',
        empathMsg:
          'É o terceiro surto de véspera no seu diário desde maio, e nas três vezes deu tudo certo no dia seguinte. O padrão é o surto, não o fracasso.',
      },
      {
        key: 'instagram',
        time: 'Quarta 23:20',
        channel: 'Instagram',
        userMsg: 'não consigo dormir. vi um reel sobre síndrome do impostor e me senti extremamente vista',
        empathMsg:
          'Adicionando à entrada de hoje. Só para constar, seu próprio diário discorda do reel: você está três de três esse mês.',
      },
    ],
  },

  channelRow: {
    /** aria-label prefix: "Conversar no WhatsApp" */
    journalOn: 'Conversar no',
    /** Prefilled first message for chat deep links; ref code appended as " #CODE". */
    prefill: 'oi, posso mesmo te mandar qualquer coisa que estiver na minha cabeça?',
  },

  // Desktop-only QR block under the hero CTAs (phones scan these).
  qr: {
    onPhone: 'Está com o celular aí?',
    whatsapp: 'Escaneie para conversar no WhatsApp',
    appStore: 'Escaneie para baixar o app',
  },

  callsYou: {
    badge: 'Novo: o Empath liga para você',
    title: 'Sem vontade de discar? A gente liga.',
    sub: 'Digite seu número e seu telefone toca em segundos. Fale do seu dia como falaria com um amigo, desligue, e já está salvo no seu diário privado: transcrito, com título e só seu. Você pode até agendar a ligação para depois.',
  },

  callMeForm: {
    ringingTitle: '📞 Ligando para você agora, atende!',
    ringingSub: 'Fale do seu dia, desligue, e está salvo como sua primeira entrada.',
    phoneAria: 'Seu número de telefone (EUA)',
    dialing: 'Discando…',
    callMeNow: 'Me liga agora',
    errorGeneric: 'Não conseguimos fazer a ligação. Tente de novo daqui a pouco.',
    errorNetwork: 'Algo deu errado. Você sempre pode ligar direto para {phone}.',
    disclaimer: 'Apenas números dos EUA. Uma ligação automática, tarifas normais.',
    scheduleLink: 'Agendar para depois ou saber mais →',
  },

  feature1: {
    badge: 'WhatsApp, Telegram ou ligação',
    title: 'Use os apps que você já abre',
    body: 'Na hora em que um pensamento surgir, dispare uma mensagem ou um áudio, ou simplesmente ligue e desabafe. É a mesma coisa que você faria com um amigo, só que aqui vira discretamente um diário privado. Nenhum app novo para aprender, nenhuma página em branco para encarar.',
    items: [
      { title: 'Transcrição com IA', desc: 'Precisão perfeita. Suas palavras, capturadas exatamente como você as diz.' },
      {
        title: 'Análise de voz',
        desc: 'Ouça como você soou de verdade. Tom, energia e ritmo, lidos em cada áudio.',
      },
      {
        title: 'Fotos e digitalizações',
        desc: 'Mande uma foto e o Empath lê, até páginas escritas à mão, direto no seu diário.',
      },
    ],
    mockVoiceTitle: 'Diário por voz',
    mockVoiceTime: 'há 2 minutos',
    mockVoiceText:
      '"Acabei de ter uma descoberta incrível na terapia hoje. Finalmente entendi por que eu venho evitando aquelas conversas difíceis..."',
    mockPhotoLabel: 'Análise de foto',
    mockPhotoCaption: 'IA detectou: ambiente tranquilo ao ar livre, caminhada na natureza, dia de sol',
  },

  feature2: {
    badge: 'Inteligência com IA',
    title: '"Pera, quando foi que comecei a me sentir assim?"',
    sub: 'Abra o app e simplesmente pergunte. Cada mensagem, ligação e pensamento que você enviou fica guardado e aparece em segundos.',
    memoryTitle: 'Busca inteligente na memória',
    memoryBody: 'Encontre qualquer momento, qualquer sentimento, qualquer insight. Nossa IA entende o contexto e traz exatamente o que você está procurando.',
    memoryItems: [
      'Busque por emoção, assunto ou data',
      'Compreensão semântica com IA',
      'Resgate instantâneo de momentos importantes',
      'Linha do tempo da sua jornada',
    ],
    patternsTitle: 'Reconhecimento de padrões',
    patternsBody: 'Descubra padrões que você nunca tinha notado. Nossa IA identifica gatilhos, ciclos e conexões nas suas experiências.',
    patternsItems: [
      'Identifique gatilhos emocionais',
      'Reconheça padrões de comportamento',
      'Acompanhe seu progresso ao longo do tempo',
      'Insights e sugestões personalizados',
    ],
    peopleTitle: 'Insights sobre pessoas',
    peopleBody:
      'O Empath percebe quem aparece sempre no seu diário, e como você costuma se sentir quando isso acontece.',
    peopleItems: [
      'Todas as pessoas sobre quem você escreve, em um só lugar',
      'Os sentimentos que surgem em torno de cada pessoa',
      'Cada menção, pronta para reler',
      'Edite ou remova qualquer pessoa, quando quiser',
    ],
  },

  feature3: {
    badge: 'Análises',
    title: 'Veja o que afeta seu humor de verdade',
    body: 'Você vai notar coisas como "sou mais feliz nos dias em que caminho" ou "prazos do trabalho disparam minha ansiedade toda quinta". São os seus dados, mostrados de um jeito simples.',
    mockTitle: 'Tendências de humor',
    mockRange: 'Últimos 30 dias',
    moods: [
      { label: 'Feliz' },
      { label: 'Calmo' },
      { label: 'Ansioso' },
      { label: 'Triste' },
    ],
    insightLabel: 'Insight',
    insightText: 'Seu humor melhora 40% nos dias em que você se exercita. Que tal caminhar de manhã?',
    items: [
      { title: 'Registro diário de humor', desc: 'Análise automática de sentimento a partir das suas entradas' },
      { title: 'Análise de correlações', desc: 'Descubra quais atividades melhoram seu humor' },
      { title: 'Lugares e clima', desc: 'Veja como você se sente em casa, no trabalho e nos dias nublados' },
      { title: 'Tendências de longo prazo', desc: 'Veja seu progresso ao longo de semanas e meses' },
    ],
  },

  feature4: {
    badge: 'Saúde integral',
    title: 'Saiba por que você não está bem',
    sub: 'O Empath lê seus dados do Apple Health e liga os pontos. Dormiu mal? Pulou o treino? Você vai ver exatamente o que está puxando seu humor para baixo.',
    cards: [
      {
        title: 'Atividade e exercício',
        desc: 'Veja como o movimento impacta seu humor e sua energia.',
        metrics: ['Passos', 'Treinos', 'Minutos ativos'],
      },
      {
        title: 'Sono e recuperação',
        desc: 'Acompanhe a qualidade do sono e seus efeitos na sua clareza mental.',
        metrics: ['Duração do sono', 'Frequência cardíaca', 'Pressão arterial'],
      },
      {
        title: 'Hábitos diários',
        desc: 'Os pequenos detalhes do dia a dia que mexem no seu humor sem você notar.',
        metrics: ['Cafeína', 'Consumo de água', 'Luz do dia', 'Minutos de mindfulness'],
      },
    ],
    calloutTitle: 'Insights de saúde automáticos',
    calloutBody:
      'O Empath lê dez categorias do Apple Health e analisa junto com seu diário para revelar conexões poderosas. "Sua ansiedade cai 35% nos dias em que você dorme 7+ horas." Insights assim ajudam você a fazer escolhas melhores.',
  },

  feature5: {
    badge: 'Com IA',
    title: 'Uma IA que conhece você de verdade',
    sub: 'Seu companheiro de IA pessoal conhece toda a sua história. Faça perguntas, ganhe insights e receba orientação personalizada a qualquer hora.',
    companionTitle: 'Seu companheiro de IA',
    exchanges: [
      {
        q: '"Por que eu sempre fico ansiosa às segundas?"',
        a: 'Pelas suas entradas, você tende a dormir menos nas noites de domingo e a pular o café da manhã nas segundas. Esse padrão aparece em 8 das suas últimas 10 entradas de segunda-feira.',
      },
      {
        q: '"O que me ajuda a me sentir melhor quando estou estressada?"',
        a: 'Seus alívios de estresse mais eficazes: conversar com amigos (mencionado 23 vezes), caminhar (18 vezes) e ouvir música (15 vezes).',
      },
    ],
    askTitle: 'Pergunte o que quiser',
    askItems: [
      'Encontre padrões no seu comportamento',
      'Entenda seus gatilhos',
      'Lembra o que importa de uma entrada para outra',
      'Conhece sua bio e as pessoas sobre quem você escreve',
      'Resgate memórias específicas',
      'Prepare-se para as sessões de terapia',
    ],
    privacyTitle: '100% privado e seguro',
    privacyBody: 'Suas conversas são criptografadas e nunca usadas para treinar modelos de IA. Sua privacidade é nossa prioridade.',
  },

  featureGrid: {
    badge: 'E o resto',
    title: 'Todo o resto no app',
    sub: 'As coisas pequenas que fazem o app ser seu.',
    items: [
      {
        title: 'Bloqueio biométrico do diário',
        desc: 'Deixe suas entradas mais pessoais atrás do Face ID ou Touch ID.',
      },
      {
        title: 'Assistente de diário',
        desc: 'Travou no meio da entrada? Peça uma pergunta, um empurrão ou ajuda para achar as palavras.',
      },
      {
        title: 'Descubra você',
        desc: 'Perguntas tiradas do seu próprio diário, para os dias em que você quer ir mais fundo.',
      },
      {
        title: 'Widgets na tela de início',
        desc: 'Registre o humor com um toque e leia a frase do dia sem abrir o app.',
      },
      {
        title: 'Sua bio',
        desc: 'Conte seu contexto ao Empath uma vez. Depois disso, cada insight chega mais perto.',
      },
      {
        title: 'Entradas antigas relacionadas',
        desc: 'Ao ler uma entrada, aparecem as mais antigas que combinam com ela.',
      },
      {
        title: 'Importar e exportar',
        desc: 'Traga seus diários antigos. Leve tudo com você quando quiser.',
      },
      {
        title: 'Diário offline',
        desc: 'Escreva sem sinal. Sincroniza no momento em que você volta.',
      },
    ],
  },

  feature6: {
    badge: 'Também faz terapia?',
    title: 'Aproveite cada sessão ao máximo',
    sub: 'Se você faz terapia, o Empath pode compartilhar sua semana com seu terapeuta automaticamente. Chega de "então, o que aconteceu?". Suas sessões começam onde realmente importa.',
    cardTitle: 'Dê ao seu terapeuta acesso à sua mente',
    cardBody:
      'Quando você se conecta com seu terapeuta pelo Empath, ele recebe um panorama completo da sua semana, não só o que você lembra de contar na sessão.',
    items: [
      {
        title: 'Resumos pré-sessão',
        desc: 'Seu terapeuta revisa resumos gerados por IA antes de cada sessão. Nada de tempo perdido recapitulando.',
      },
      {
        title: 'Insights mais profundos',
        desc: 'Seu terapeuta percebe padrões que você pode não notar e prepara intervenções direcionadas.',
      },
      {
        title: 'Progresso mais rápido',
        desc: 'Pule a conversa fiada. Mergulhe no trabalho que importa desde o primeiro minuto.',
      },
    ],
    mockTitle: 'Resumo semanal',
    mockSub: 'Preparado para o seu terapeuta',
    mockMoodLabel: 'Panorama do humor',
    mockMoodText:
      'Cliente apresentou aumento de ansiedade no meio da semana, correlacionado a prazos do trabalho. Melhora significativa após a sessão de terapia de sexta-feira.',
    mockMomentsLabel: 'Momentos-chave',
    mockMoments: [
      'Terça: descoberta importante sobre padrões de relacionamento',
      'Quinta: praticou novas estratégias de enfrentamento com sucesso',
    ],
    mockFocusLabel: 'Foco sugerido',
    mockFocusText: 'Explorar padrões de ansiedade ligados ao trabalho e os insights de relacionamento de terça.',
    privacyTitle: 'Sua privacidade, seu controle',
    privacyBody:
      'Você escolhe o que compartilhar e quando. Conecte-se ou desconecte-se do seu terapeuta a qualquer momento. Seus dados são sempre seus.',
    privacyBadges: ['Conformidade HIPAA', 'Criptografia de ponta a ponta', 'Você controla o acesso', 'Desconecte quando quiser'],
  },

  howItWorks: {
    title: 'Registre por mensagem ou ligação. Reflita no app.',
    sub: 'Sem configuração, sem hábito novo para criar. É só falar do jeito que você já fala com os amigos.',
    stepLabel: 'Passo',
    steps: [
      {
        title: 'Mande mensagem ou ligue',
        desc: 'Sempre que um pensamento ou sentimento aparecer, mande WhatsApp, Telegram ou ligue para o Empath, como faria com um amigo. Sem app, sem cadastro, sem página em branco.',
      },
      {
        title: 'O Empath registra',
        desc: 'Cada mensagem e ligação cai no seu diário privado: transcrita, organizada e salva automaticamente. Você só continua vivendo sua vida.',
      },
      {
        title: 'Abra o app para refletir',
        desc: 'Quando quiser olhar para trás, revisitar uma memória ou ver seus padrões e tendências de humor, está tudo esperando por você no app.',
      },
    ],
  },

  iosCallout: {
    kicker: 'App para iOS disponível',
    title: 'Quer olhar para trás? Baixe o app',
    body: 'Você fala por mensagem e ligação. O app é onde vive o seu diário privado: releia tudo, busque momentos passados e acompanhe seus padrões de humor se revelando.',
    button: 'Baixar na App Store',
  },

  socialProof: {
    title: 'O que estão dizendo',
    featured: 'Destaque na App Store',
    testimonials: [
      {
        quote:
          'Já testei 5 apps de diário e abandonei todos. O Empath ficou porque eu só mando uma mensagem quando algo está na minha cabeça, sem abrir app, sem página em branco.',
        author: 'Alex M.',
        role: 'Usuário desde 2024',
      },
      {
        quote:
          'O Empath me mostrou que fico ansiosa todo domingo à noite antes do trabalho. Nunca tinha ligado esses pontos em 3 anos escrevendo diário no papel.',
        author: 'Jordan K.',
        role: 'Usuária desde 2023',
      },
      {
        quote:
          'Adoro poder simplesmente ligar e falar. É tão natural, como escrever um diário sempre deveria ter sido.',
        author: 'Sam R.',
        role: 'Usuário desde 2024',
      },
    ],
  },

  worries: {
    badge: 'Você deve estar se perguntando',
    title: 'Respostas honestas para dúvidas justas',
    sub: 'Compartilhar seu mundo interior com uma IA não é pouca coisa. Isto é o que nós também gostaríamos de saber antes de digitar uma palavra.',
    items: [
      {
        worry: '"Quem mais pode ler o que eu mando?"',
        title: 'Ninguém. É só seu.',
        body: 'Cada entrada é criptografada, segue o padrão HIPAA e nunca é usada para treinar modelos de IA. Você pode exportar tudo ou apagar tudo quando quiser. Seu diário tem exatamente um leitor: você.',
      },
      {
        worry: '"Já comecei cinco diários e larguei todos."',
        title: 'Este não tem página em branco.',
        body: 'Você não cria um hábito novo: pega emprestado um que já tem, mandar mensagem. Uma mensagem de uma linha ou um áudio conta como entrada completa, e o Empath mantém a conversa viva para o dia dois ser mais fácil que o dia um.',
      },
      {
        worry: '"Eu nunca sei o que escrever."',
        title: 'Você não precisa saber.',
        body: 'Comece com uma frase honesta e o Empath faz a pergunta gentil que um amigo faria. Responda ou não. De qualquer jeito vira uma entrada de verdade, escrita com a sua voz.',
      },
      {
        worry: '"Falar de sentimentos com uma IA parece… estranho."',
        title: 'Parece mandar mensagem, sério.',
        body: 'Sem voz de robô, sem roteiro de terapia, sem positividade tóxica. Parece um amigo atencioso que nunca se cansa de você às 2 da manhã. Estranho nas duas primeiras mensagens, surpreendentemente normal depois.',
      },
    ],
  },

  faq: {
    title: 'Perguntas frequentes',
    items: [
      {
        q: 'Preciso baixar o app para escrever meu diário?',
        a: 'Não. Você pode escrever tudo por WhatsApp, Telegram ou ligação, sem app e sem cadastro. O app para iOS é opcional: é onde você relê suas entradas, busca momentos passados e vê seus padrões de humor ao longo do tempo.',
      },
      {
        q: 'O Empath é grátis mesmo?',
        a: 'Sim! O Empath é totalmente grátis. Todo o diário por mensagem, ligação ou app, além de transcrição com IA, monitoramento de humor e insights, está incluído sem custo.',
      },
      {
        q: 'Como a IA funciona?',
        a: 'Nossa IA usa processamento avançado de linguagem natural para transcrever sua voz, analisar sentimento, identificar padrões e gerar insights. Todo o processamento é seguro e em conformidade com a HIPAA.',
      },
      {
        q: 'Posso usar sem terapeuta?',
        a: 'Com certeza! O Empath funciona muito bem sozinho, como ferramenta de diário e autorreflexão. Você pode se conectar a um terapeuta depois, se quiser.',
      },
      {
        q: 'Meus dados são privados e seguros?',
        a: 'Sim. Todos os seus dados são criptografados de ponta a ponta, em conformidade com a HIPAA, e nunca usados para treinar modelos de IA. Você controla quem tem acesso e pode apagar tudo a qualquer momento.',
      },
      {
        q: 'E Android?',
        a: 'Por enquanto só temos app para iOS, mas você ainda pode escrever seu diário por ligação ou mensagem de qualquer aparelho! Um app para Android está em desenvolvimento.',
      },
      {
        q: 'Como me conecto ao meu terapeuta?',
        a: 'Se o seu terapeuta usa o Empath, ele pode te enviar um convite. Se não, você pode escrever em privado e compartilhar seus insights manualmente, ou convidá-lo para entrar no Empath.',
      },
      {
        q: 'Posso exportar meu diário?',
        a: 'Sim! Você pode exportar todas as suas entradas, insights e dados a qualquer momento. Seus dados pertencem a você, sempre.',
      },
      {
        q: 'E se eu não souber o que escrever?',
        a: 'Você pode chegar a uma entrada conversando. O assistente de diário com IA do Empath te entrevista com uma pergunta gentil de cada vez e depois transforma a conversa inteira em uma entrada do diário com a sua voz. É o jeito mais fácil de vencer a página em branco.',
        link: { text: 'Veja como funciona o diário por chat', to: '/app/blog/chat-journaling' },
      },
      {
        q: 'O Empath pode me ajudar a criar o hábito de escrever?',
        a: 'Sim. Monte um Plano de Journaling com ritmo diário ou semanal, sequências tolerantes que sobrevivem a um dia perdido e lembretes adaptativos por push ou e-mail que se cancelam sozinhos quando você já escreveu.',
        link: { text: 'Veja como montar um plano de journaling que dura', to: '/app/blog/journaling-plan' },
      },
    ],
  },

  finalCta: {
    title: 'Seja o que for que está na sua cabeça, está a uma mensagem de distância',
    sub: 'Nenhum app para aprender, nenhuma página em branco para encarar. É só mandar mensagem ou ligar como você já faz com um amigo, e começar a ver seus padrões em dias, não meses.',
    downloadFree: 'Baixar grátis na App Store',
    justSayHi: 'Sem app, sem cadastro. É só dar um oi',
    preferTyping: 'Prefere digitar? Abra o painel web →',
    noCreditCard: 'Sem cartão de crédito',
    freeForever: 'Grátis para sempre',
    fastSetup: 'Pronto em 30 segundos',
  },

  footer: {
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    support: 'Suporte',
  },

  floating: {
    downloadFree: 'Baixar grátis',
    text: 'Mande seus pensamentos',
    call: 'Ligar',
    webApp: 'App web',
  },
};
