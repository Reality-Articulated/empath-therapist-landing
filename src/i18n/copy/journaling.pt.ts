// Brazilian Portuguese copy catalog for the consumer landing page.
// Mirrors journaling.en.ts exactly — see that file for structure notes.

import type { JournalingCopy } from './journaling.en';

export const journalingPt: JournalingCopy = {
  seo: {
    title: 'Empath - O diário que você não vai abandonar',
    description:
      'Existe um número onde você simplesmente escreve seu diário. Mande um SMS, um WhatsApp, ligue — ou peça para ele te ligar. Sem app, sem cadastro, sem página em branco. Suas entradas viram padrões de humor e insights que você consegue ver de verdade.',
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
    mobileLead: 'Comece seu diário agora mesmo. É só ligar, mandar SMS ou mensagem.',
    call: 'Ligar',
    text: 'Mensagem',
    orFavoriteApp: 'Ou escreva no seu app favorito',
    phoneMeta: 'Disponível 24h • Sem cadastro',
    wantInsights: 'Quer tendências de humor e insights?',
    getApp: 'Baixe o app grátis',
    appBenefits: 'Gráficos de humor, detecção de padrões, sincronização com o Apple Health',
    desktopLead: 'Comece seu diário agora mesmo com uma ligação ou mensagem. Sem app para baixar, sem cadastro para fazer.',
    textToJournal: 'Mande mensagem para registrar',
    callAndTalk: 'Ligue e só converse',
    textUsAt: 'Mande mensagem para',
    callUsAt: 'Ligue para',
    availability: 'Disponível 24h • Grátis • Funciona de qualquer telefone',
    preferTyping: 'Prefere digitar no computador?',
    openDashboard: 'Abra o painel web',
  },

  trust: {
    hipaa: 'Segurança HIPAA',
    ai: 'Insights com IA',
    loved: 'Amado por milhares',
  },

  whatsappSection: {
    badge: 'Diário direto nas suas mensagens',
    title: 'Como é na prática',
    sub: 'Aquele surto das 2 da manhã, um áudio que você está cansado demais para digitar, um dia difícil. Você manda como mandaria para um amigo — o Empath escuta, responde e salva tudo discretamente como uma entrada do seu diário.',
    cta: 'Escrever no WhatsApp',
    phoneNote: 'Ou mande SMS para {phone} — mensagem comum também funciona. Conversas de exemplo.',
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
            text: 'Você não precisa resolver isso hoje. Ficar repassando geralmente significa que foi importante — não que você exagerou. Quer que eu guarde isso até amanhã de manhã?',
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
            text: 'Dia longo — deu para ouvir. Três coisas acumuladas antes do meio-dia, e mesmo assim você atendeu a ligação da sua irmã. Você disse duas vezes que "devia ter lidado melhor". Com carinho: você lidou. Salvo.',
            time: '23:13',
          },
          { from: 'user', text: 'como você sempre faz parecer que dá pra sobreviver', time: '23:14' },
          { from: 'empath', text: 'Porque é você quem está contando a história. Boa noite.', time: '23:14' },
        ],
      },
      {
        key: 'mom',
        title: 'A culpa do dia a dia',
        caption: 'Um diário que lembra o que você está tentando melhorar.',
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
            text: 'O fato de isso estar pesando tanto em você mostra o quanto você se importa. Você está no limite desde terça — a grosseria é o transbordo, não a verdade sobre quem você é para ela. Vocês conversaram depois?',
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
          { from: 'user', text: 'pera, então eu posso escrever meu diário só mandando mensagem pra esse número? sem app?', time: '09:14' },
          {
            from: 'empath',
            text: 'É isso mesmo. Sem app, sem cadastro, sem página em branco te encarando. Me conta como foi seu dia — uma frase já basta.',
            time: '09:14',
          },
          { from: 'user', text: 'ok. sinceramente já tô exausta e são 9 da manhã', time: '09:15' },
          { from: 'empath', text: 'Então essa é a primeira entrada de hoje — salva. O que está drenando mais a sua energia essa manhã?', time: '09:15' },
        ],
      },
    ],
    chatUi: {
      today: 'Hoje',
      online: 'online',
      inputPlaceholder: 'Mensagem',
    },
  },

  crossChannel: {
    badge: 'Um diário, todos os apps',
    title: 'Comece em qualquer lugar. Continue em todos.',
    sub: 'O Empath vive onde você já está. Escreva no diário hoje à noite, pergunte sobre isso no WhatsApp tomando café, aprofunde no Telegram depois do trabalho, feche o ciclo no Instagram enquanto rola o feed. Todos os canais falam com o mesmo diário — e com a mesma memória.',
    pickApp: 'Escolha o app em que você já está',
    journalStep: {
      time: 'Terça 21:41',
      channel: 'Diário por voz',
      cardTitle: 'A noite antes da apresentação',
      cardSub: 'Diário por voz · 2 min',
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
          'Um pouquinho 💛 Você ensaiou a introdução quatro vezes. Mas também disse que conhece esse conteúdo melhor que qualquer um — segura essa parte hoje.',
      },
      {
        key: 'telegram',
        time: 'Quarta 14:37',
        channel: 'Telegram',
        userMsg: 'apresentação feita, foi tranquilo. por que eu sempre surto na noite anterior?',
        empathMsg:
          'É o terceiro surto de véspera no seu diário desde maio — e nas três vezes deu tudo certo no dia seguinte. O padrão é o surto, não o fracasso.',
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
    /** aria-label prefix: "Journal on WhatsApp" */
    journalOn: 'Escrever no',
  },

  callsYou: {
    badge: 'Novo: o Empath liga para você',
    title: 'Sem vontade de discar? A gente liga.',
    sub: 'Digite seu número e seu telefone toca em segundos. Fale do seu dia como falaria com um amigo, desligue, e pronto: já está salvo como uma entrada do diário — transcrita, com título e privada. Você pode até agendar a ligação para depois.',
  },

  callMeForm: {
    ringingTitle: '📞 Ligando para você agora — atende!',
    ringingSub: 'Fale do seu dia, desligue, e está salvo como sua primeira entrada do diário.',
    phoneAria: 'Seu número de telefone (EUA)',
    dialing: 'Discando…',
    callMeNow: 'Me liga agora',
    errorGeneric: 'Não conseguimos fazer a ligação. Tente de novo daqui a pouco.',
    errorNetwork: 'Algo deu errado. Você sempre pode ligar direto para {phone}.',
    disclaimer: 'Apenas números dos EUA. Uma ligação automática, tarifas normais.',
    scheduleLink: 'Agendar para depois ou saber mais →',
  },

  feature1: {
    badge: 'SMS, WhatsApp ou ligação',
    title: 'Use os apps que você já abre',
    body: 'Na hora em que um pensamento surgir, dispare uma mensagem ou um áudio, ou simplesmente ligue e desabafe. É a mesma coisa que você faria com um amigo, só que aqui vira discretamente o seu diário. Nenhum app novo para aprender, nenhuma página em branco para encarar.',
    items: [
      { title: 'Transcrição com IA', desc: 'Precisão perfeita. Suas palavras, capturadas exatamente como você as diz.' },
      { title: 'Fotos e imagens', desc: 'Mande fotos por mensagem. A gente analisa e entende automaticamente.' },
      { title: 'Transcrição de imagens', desc: 'Texto em imagens? A gente lê e extrai para você.' },
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
      { title: 'Registro diário de humor', desc: 'Análise automática de sentimento a partir do seu diário' },
      { title: 'Análise de correlações', desc: 'Descubra quais atividades melhoram seu humor' },
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
        metrics: ['Duração do sono', 'Qualidade do sono', 'Frequência cardíaca'],
      },
      {
        title: 'Padrões diários',
        desc: 'Descubra conexões entre hábitos e bem-estar.',
        metrics: ['Níveis de energia', 'Sinais de estresse', 'Tempo de recuperação'],
      },
    ],
    calloutTitle: 'Insights de saúde automáticos',
    calloutBody:
      'Nossa IA analisa seus dados de saúde junto com seu diário para revelar conexões poderosas. "Sua ansiedade cai 35% nos dias em que você dorme 7+ horas." Insights assim ajudam você a fazer escolhas melhores.',
  },

  feature5: {
    badge: 'Com IA',
    title: 'Converse com o seu diário',
    sub: 'Seu companheiro de IA pessoal conhece toda a sua história. Faça perguntas, ganhe insights e receba orientação personalizada a qualquer hora.',
    companionTitle: 'Seu companheiro de IA',
    exchanges: [
      {
        q: '"Por que eu sempre fico ansiosa às segundas?"',
        a: 'Pelo seu diário, você tende a dormir menos nas noites de domingo e a pular o café da manhã nas segundas. Esse padrão aparece em 8 das suas últimas 10 entradas de segunda-feira.',
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
      'Acompanhe seu progresso',
      'Receba sugestões personalizadas',
      'Resgate memórias específicas',
      'Prepare-se para as sessões de terapia',
    ],
    privacyTitle: '100% privado e seguro',
    privacyBody: 'Suas conversas são criptografadas e nunca usadas para treinar modelos de IA. Sua privacidade é nossa prioridade.',
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
    sub: 'Sem configuração, sem hábito novo para criar. Escreva seu diário do jeito que você já conversa com amigos.',
    stepLabel: 'Passo',
    steps: [
      {
        title: 'Mande mensagem ou ligue',
        desc: 'Sempre que um pensamento ou sentimento aparecer, mande SMS, WhatsApp ou ligue para o Empath, como faria com um amigo. Sem app, sem cadastro, sem página em branco.',
      },
      {
        title: 'O Empath registra',
        desc: 'Cada mensagem e ligação vira uma entrada do diário: transcrita, organizada e salva automaticamente. Você só continua vivendo sua vida.',
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
    body: 'Você escreve por mensagem e ligação. O app é onde você relê tudo, busca entradas antigas e acompanha seus padrões de humor se revelando.',
    button: 'Baixar na App Store',
  },

  socialProof: {
    title: 'O que estão dizendo',
    featured: 'Destaque na App Store',
    testimonials: [
      {
        quote:
          'Já testei 5 apps de diário e abandonei todos. O Empath ficou porque eu só mando uma mensagem quando algo está na minha cabeça — sem abrir app, sem página em branco.',
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

  faq: {
    title: 'Perguntas frequentes',
    items: [
      {
        q: 'Preciso baixar o app para escrever meu diário?',
        a: 'Não. Você pode escrever tudo por SMS, WhatsApp ou ligação, sem app e sem cadastro. O app para iOS é opcional: é onde você relê suas entradas, busca momentos passados e vê seus padrões de humor ao longo do tempo.',
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
        a: 'Sim. Monte um Plano de Journaling com ritmo diário ou semanal, sequências tolerantes que sobrevivem a um dia perdido e lembretes adaptativos por push, SMS ou e-mail que se cancelam sozinhos quando você já escreveu.',
        link: { text: 'Veja como montar um plano de journaling que dura', to: '/app/blog/journaling-plan' },
      },
    ],
  },

  finalCta: {
    title: 'Sua próxima entrada no diário está a uma mensagem de distância',
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
    text: 'Mensagem para registrar',
    call: 'Ligar',
    webApp: 'App web',
  },
};
