// @ts-check
// Dados Pessoais e Icebreaker (bilíngue)
/** @typedef {{pt:string,en:string}} Bilingual */
/**
 * @typedef {Object} PersonalData
 * @property {{ name:string; title:Bilingual; location:Bilingual; phone:string; email:string; linkedin:string; summary:Bilingual }} basic
 * @property {{ pt:{ intro:string; questions:{q:string,a:string}[] }, en:{ intro:string; questions:{q:string,a:string}[] } }} icebreaker
 * @property {{ degree:Bilingual; focus:Bilingual; institution:Bilingual; year:string }[]} education
 * @property {string[]} certifications
 * @property {{ language:Bilingual; level:Bilingual }[]} languages
 * @property {string[]} recentTraining
 */

/** @type {PersonalData} */
export const personalData = {
  basic: {
    name: 'Leonardo Menezes de Souza',
    title: { pt: 'Program Management | Strategy | Innovation', en: 'Program Management | Strategy | Innovation' },
    location: { pt: 'Porto Alegre, RS, Brasil', en: 'Porto Alegre, RS, Brazil' },
    phone: '+55 51 9 9961 2787',
    email: 'leon4rdo@gmail.com',
    linkedin: 'https://www.linkedin.com/in/menezesleonardo/',
    summary: {
      pt: 'Líder executivo com 15+ anos em transformação digital, otimização de processos com IA e governança estratégica (pagamentos, financial services, saúde, telecom, governo).',
      en: 'Executive leader with 15+ years in digital transformation, AI-driven process optimization and strategic governance (payments, financial services, healthcare, telecom, government).'
    }
  },

  icebreaker: {
    pt: {
      intro: 'Olá! Sou Leonardo Menezes, um profissional com mais de 15 anos de experiência em transformação digital e gestão de produtos no setor financeiro, saúde, telecom e governo. Minha trajetória começou na Huawei, onde trabalhei por 6 anos desenvolvendo soluções de telecomunicações para a América Latina. Em seguida, passei pelo HSBC e Bradesco, onde liderei projetos críticos como a migração de $3B em ativos e o lançamento do banco digital Next. Depois trabalhei no Sicredi e Unimed, focando em produtos digitais inovadores e implementação de IA. Atualmente, estou na SEFAZ-RS, aplicando minha experiência em tecnologia no setor público.',
      
      questions: [
        {
          q: 'Fale sobre você',
          a: 'Sou um profissional apaixonado por resolver problemas complexos através de tecnologia e pessoas. Tenho 15 anos de experiência liderando transformações digitais em empresas de diferentes setores - desde telecomunicações na Huawei, passando por serviços financeiros no HSBC e Bradesco, cooperativismo no Sicredi, saúde na Unimed, até o setor público na SEFAZ-RS. Minha força está em conectar visão estratégica com execução prática, sempre focando em entregar valor real para clientes e usuários finais. Recentemente tenho me especializado em implementação de IA para automação de processos e tomada de decisão.'
        },
        {
          q: 'Por que você quer trabalhar aqui?',
          a: 'Estou buscando uma oportunidade onde possa aplicar minha experiência diversificada em transformação digital para gerar impacto real. Admiro organizações que valorizam inovação, excelência operacional e foco no cliente. Quero fazer parte de uma empresa que realmente "thinks big" e tem o poder de impactar positivamente milhões de pessoas. Vejo esta posição como uma oportunidade de aplicar minha experiência em IA, gestão de produtos e transformação digital em um ambiente que valoriza resultados e crescimento sustentável.'
        },
        {
          q: 'Fale sobre seus hobbies e tempo livre',
          a: 'No meu tempo livre, sou um entusiasta de tecnologia e aprendizado contínuo. Gosto de acompanhar tendências em IA, ler sobre product management e experimentar com novas ferramentas como n8n para automação. Sou pai de família e valorizo muito o tempo com minha esposa e filhos - acredito que o equilíbrio entre vida pessoal e profissional é fundamental para a sustentabilidade da carreira. Pratico corrida regularmente, o que me ajuda a manter o foco e a disciplina. Também gosto de cozinhar (especialmente churrasco gaúcho!) e de viajar para conhecer novas culturas e perspectivas.'
        },
        {
          q: 'Qual sua maior conquista profissional?',
          a: 'Minha maior conquista foi liderar a redução do SLA de rollout de telecom na Huawei de 382 para 62 dias, gerando uma economia de $120M e sendo replicado globalmente. Mas o que mais me orgulha é ter construído equipes de alta performance e culturas de inovação em organizações muito diferentes - desde uma multinacional chinesa até uma cooperativa brasileira. Ver pessoas crescerem e organizações se transformarem através do trabalho que desenvolvemos juntos é o que realmente me motiva.'
        }
      ]
    },
    
    en: {
      intro: 'Hello! I\'m Leonardo Menezes, a professional with over 15 years of experience in digital transformation and product management across financial services, healthcare, telecom, and government sectors. My journey began at Huawei, where I worked for 6 years developing telecommunications solutions for Latin America. I then moved to HSBC and Bradesco, where I led critical projects like migrating $3B in assets and launching the Next digital bank. Later I worked at Sicredi and Unimed, focusing on innovative digital products and AI implementation. Currently, I\'m at SEFAZ-RS, applying my technology experience in the public sector.',
      
      questions: [
        {
          q: 'Tell me about yourself',
          a: 'I\'m a professional passionate about solving complex problems through technology and people. I have 15 years of experience leading digital transformations across different sectors - from telecommunications at Huawei, through financial services at HSBC and Bradesco, cooperativism at Sicredi, healthcare at Unimed, to public sector at SEFAZ-RS. My strength lies in connecting strategic vision with practical execution, always focusing on delivering real value to customers and end users. Recently I\'ve been specializing in AI implementation for process automation and decision-making.'
        },
        {
          q: 'Why do you want to work here?',
          a: 'I\'m looking for an opportunity where I can apply my diverse experience in digital transformation to generate real impact. I admire organizations that value innovation, operational excellence, and customer focus. I want to be part of a company that truly "thinks big" and has the power to positively impact millions of people. I see this position as an opportunity to apply my experience in AI, product management, and digital transformation in an environment that values results and sustainable growth.'
        },
        {
          q: 'Tell me about your hobbies and free time',
          a: 'In my free time, I\'m a technology enthusiast and continuous learner. I enjoy following AI trends, reading about product management, and experimenting with new tools like n8n for automation. I\'m a family man and highly value time with my wife and children - I believe work-life balance is fundamental for career sustainability. I run regularly, which helps me maintain focus and discipline. I also enjoy cooking (especially Brazilian barbecue!) and traveling to experience new cultures and perspectives.'
        },
        {
          q: 'What\'s your greatest professional achievement?',
          a: 'My greatest achievement was leading the reduction of telecom rollout SLA at Huawei from 382 to 62 days, generating $120M in savings and being replicated globally. But what I\'m most proud of is building high-performance teams and innovation cultures in very different organizations - from a Chinese multinational to a Brazilian cooperative. Seeing people grow and organizations transform through the work we develop together is what truly motivates me.'
        }
      ]
    }
  },

  education: [
    { degree: { pt: 'MSc', en: 'MSc' }, focus: { pt: 'Gestão de Negócios (Inovação & Sustentabilidade)', en: 'Business Management (Innovation & Sustainability)' }, institution: { pt: 'Unisinos', en: 'Unisinos' }, year: '2022' },
    { degree: { pt: 'Pós-graduação', en: 'Postgraduate' }, focus: { pt: 'Gestão de Instituições Financeiras Cooperativas', en: 'Cooperative Financial Institutions Management' }, institution: { pt: 'Escoop', en: 'Escoop' }, year: '2021' },
    { degree: { pt: 'MBA', en: 'MBA' }, focus: { pt: 'Liderança de Produtos Digitais', en: 'Digital Product Leadership' }, institution: { pt: 'TERA', en: 'TERA' }, year: '2019' },
    { degree: { pt: 'MBA', en: 'MBA' }, focus: { pt: 'Gestão de Projetos', en: 'Project Management' }, institution: { pt: 'FGV', en: 'FGV' }, year: '2012' },
    { degree: { pt: 'Bacharelado', en: 'BSc' }, focus: { pt: 'Administração de Empresas', en: 'Business Administration' }, institution: { pt: 'Unicruz', en: 'Unicruz' }, year: '2009' }
  ],

  certifications: [
    'CPA-10', 'CPA-20', 'PMP®', 'CSM®', 'SFC®', 
    'PMO-CP®', 'CAC®', 'SAFe SSM®', 'VMP®'
  ],

  languages: [
    { language: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native' } },
    { language: { pt: 'Inglês', en: 'English' }, level: { pt: 'Fluente', en: 'Fluent' } },
    { language: { pt: 'Mandarim', en: 'Mandarin' }, level: { pt: 'Básico', en: 'Basic' } }
  ],

  recentTraining: [
    'AI Agent Manager Program - NoCodeStartup, 2025',
    'Next frontier – AI & Data - JoinIA, 2023',
    'Innovating in Healthcare - Harvard School of Public Health, 2023',
    'Product Management - PM3, 2021',
    'Product Discovery - PM3, 2021'
  ]
};

export default personalData;
