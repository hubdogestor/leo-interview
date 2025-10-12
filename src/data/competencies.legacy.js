// @ts-check
// Competências Unificadas (antes separadas em Competências + Perfis)
// Estrutura otimizada para canvas visual de competências

/** @typedef {{pt:string,en:string}} Bilingual */

/**
 * @typedef {Object} Competency
 * @property {string} id
 * @property {Bilingual} title
 * @property {Bilingual} subtitle
 * @property {Bilingual} elevatorPitch - Pitch curto e impactante
 * @property {string} icon
 * @property {string} color
 * @property {{pt:string[],en:string[]}} keyStrengths - Principais forças/habilidades
 * @property {{pt:string[],en:string[]}} tools - Ferramentas e tecnologias
 * @property {{pt:string[],en:string[]}} certifications - Certificações relevantes
 * @property {{pt:string[],en:string[]}} achievements - Principais conquistas quantificadas
 * @property {string[]} relevantExperiences - IDs de experiências relevantes
 * @property {{pt:string,en:string}} experienceApplied - Resumo da experiência aplicada
 */

/** @type {Record<string, Competency>} */
export const competenciesData = {
  product_manager: {
    id: 'product_manager',
    title: { pt: 'Product Manager', en: 'Product Manager' },
    subtitle: { pt: 'Gestão de Produtos Digitais', en: 'Digital Product Management' },
    icon: '📱',
    color: 'bg-blue-600',
    elevatorPitch: {
      pt: 'Product Manager com 15+ anos transformando ideias em produtos digitais de impacto. Liderei o lançamento de 20+ produtos que geraram mais de $200M em receita. Especialista em discovery, user experience e growth, com experiência desde fintechs até healthtech. Minha abordagem combina dados, design thinking e execução ágil para criar produtos que os usuários amam e que geram resultados de negócio.',
      en: 'Product Manager with 15+ years transforming ideas into impactful digital products. Led the launch of 20+ products generating over $200M in revenue. Expert in discovery, user experience, and growth, with experience from fintech to healthtech. My approach combines data, design thinking, and agile execution to create products users love that drive business results.'
    },
    keyStrengths: {
      pt: [
        'Estratégia de Produto & Roadmapping',
        'Growth & Monetização',
        'Decisão Orientada por Dados',
        'Integração de IA/ML em Produtos'
      ],
      en: [
        'Product Strategy & Roadmapping',
        'Growth & Monetization',
        'Data-Driven Decision Making',
        'AI/ML Product Integration'
      ]
    },
    tools: {
      pt: ['Primavera P6', 'Tableau', 'MS Project Server', 'Power BI', 'SAP (MM/PM)'],
      en: ['Primavera P6', 'Tableau', 'MS Project Server', 'Power BI', 'SAP (MM/PM)']
    },
    certifications: {
      pt: ['PMP®', 'PMO-CP®', 'SAFe SSM®'],
      en: ['PMP®', 'PMO-CP®', 'SAFe SSM®']
    },
    achievements: {
      pt: [
        '20+ produtos ($200M receita)',
        'Crescimento 25% Woop App ($50M receita)',
        'NPS +6% & churn -15% Unimed',
        'AI em produtos de saúde'
      ],
      en: [
        '20+ products ($200M revenue)',
        '25% Woop App adoption growth ($50M revenue)',
        'NPS +6% & churn -15% at Unimed',
        'AI in healthcare products'
      ]
    },
    relevantExperiences: ['unimed', 'sicredi', 'hsbc_bradesco'],
    experienceApplied: {
      pt: 'Experiência em estruturação e liderança de PMOs, gestão de programas complexos e governança de portfólios.',
      en: 'Experience in PMO structuring and leadership, managing complex programs, and portfolio governance.'
    }
  },

  program_manager: {
    id: 'program_manager',
    title: { pt: 'Program Manager', en: 'Program Manager' },
    subtitle: { pt: 'Gestão de Programas Complexos & PMO', en: 'Complex Program Management & PMO' },
    icon: '📊',
    color: 'bg-purple-600',
    elevatorPitch: {
      pt: 'Program Manager com track record em programas de larga escala. Liderei transformações que geraram $300M+ em valor, desde rollouts globais até migrações bancárias críticas. Especialista em PMO, governança e gestão multicultural. Combino rigor metodológico com adaptabilidade para entregar resultados em ambientes desafiadores.',
      en: 'Program Manager with proven track record in large-scale programs. Led transformations generating $300M+ in value, from global rollouts to critical banking migrations. Expert in PMO, governance, and cross-cultural management. I combine methodological rigor with adaptability to deliver results in challenging environments.'
    },
    keyStrengths: {
      pt: [
        'PMO Framework Design',
        'Portfolio Management',
        'Earned Value Management (EVM)',
        'Critical Path Method (CPM)',
        'Vendor Management',
        'Risk Management',
        'Stakeholder Management',
        'Executive Dashboards'
      ],
      en: [
        'PMO Framework Design',
        'Portfolio Management',
        'Earned Value Management (EVM)',
        'Critical Path Method (CPM)',
        'Vendor Management',
        'Risk Management',
        'Stakeholder Management',
        'Executive Dashboards'
      ]
    },
    tools: {
      pt: ['Primavera P6', 'MS Project Server', 'SAP (MM/PM)', 'Tableau', 'Power BI'],
      en: ['Primavera P6', 'MS Project Server', 'SAP (MM/PM)', 'Tableau', 'Power BI']
    },
    certifications: {
      pt: ['PMP®', 'PMO-CP®', 'SAFe SSM®'],
      en: ['PMP®', 'PMO-CP®', 'SAFe SSM®']
    },
    achievements: {
      pt: [
        'Redução SLA 382→62 dias (~$120M economia)',
        'Migração $3B HSBC→Bradesco sem perda',
        'PMO Profisco II (parceria BID)',
        'Global Excellent PM (2012-2014)'
      ],
      en: [
        'SLA reduction 382→62 days (~$120M savings)',
        '$3B HSBC→Bradesco migration no data loss',
        'Profisco II PMO (IDB partnership)',
        'Global Excellent PM (2012-2014)'
      ]
    },
    relevantExperiences: ['huawei', 'hsbc_bradesco', 'sefaz'],
    experienceApplied: {
      pt: 'Experiência em estruturação e liderança de PMOs, gestão de programas complexos e governança de portfólios.',
      en: 'Experience in PMO structuring and leadership, complex programs management, and portfolio governance.'
    }
  },

  digital_transformation: {
    id: 'digital_transformation',
    title: { pt: 'Digital Transformation', en: 'Digital Transformation' },
    subtitle: { pt: 'Transformação Digital & Inovação', en: 'Digital Transformation & Innovation' },
    icon: '🚀',
    color: 'bg-green-600',
    elevatorPitch: {
      pt: 'Líder em transformação digital com 15+ anos modernizando organizações. Conduzi transformações desde fintechs até setor público, sempre com foco em valor mensurável. Especialista em IA/ML, automação e mudança cultural. Minha abordagem alia visão estratégica com execução hands-on.',
      en: 'Digital transformation leader with 15+ years modernizing organizations. Led transformations from fintechs to public sector, always focusing on measurable value. Expert in AI/ML, automation, and cultural change. My approach combines strategic vision with hands-on execution.'
    },
    keyStrengths: {
      pt: [
        'Estratégia Digital',
        'Automação de Processos',
        'Change Management',
        'Cultura Digital',
        'Gestão de Inovação',
        'Adoção Tecnológica',
        'Experiência Digital do Cliente',
        'Modernização de Legados'
      ],
      en: [
        'Digital Strategy',
        'Process Automation',
        'Change Management',
        'Digital Culture',
        'Innovation Management',
        'Technology Adoption',
        'Digital Customer Experience',
        'Legacy Modernization'
      ]
    },
    tools: {
      pt: ['n8n', 'Zapier', 'Power Automate', 'APIs', 'Plataformas Cloud'],
      en: ['n8n', 'Zapier', 'Power Automate', 'APIs', 'Cloud Platforms']
    },
    certifications: {
      pt: ['Digital Product Leadership (TERA)', 'Innovation & Sustainability (Unisinos)'],
      en: ['Digital Product Leadership (TERA)', 'Innovation & Sustainability (Unisinos)']
    },
    achievements: {
      pt: [
        'EBITDA +22% Unimed (~$70.4M)',
        'Lançamento Next Bank (Bradesco)',
        'Banco Digital Woop (Sicredi)',
        'Portal PMO executivo (SEFAZ)'
      ],
      en: [
        'EBITDA +22% Unimed (~$70.4M)',
        'Next Digital Bank launch (Bradesco)',
        'Woop Digital Bank (Sicredi)',
        'Executive PMO portal (SEFAZ)'
      ]
    },
    relevantExperiences: ['unimed', 'sicredi', 'hsbc_bradesco', 'sefaz'],
    experienceApplied: {
      pt: 'Transformações digitais em fintech, healthtech e setor público, com foco em automação e experiência do cliente.',
      en: 'Digital transformations in fintech, healthtech, and public sector, focused on automation and customer experience.'
    }
  },

  ai_data_analytics: {
    id: 'ai_data_analytics',
    title: { pt: 'AI & Data Analytics', en: 'AI & Data Analytics' },
    subtitle: { pt: 'Inteligência Artificial e Análise de Dados', en: 'Artificial Intelligence & Data Analysis' },
    icon: '🤖',
    color: 'bg-orange-600',
    elevatorPitch: {
      pt: 'Especialista em IA/ML aplicada a resultados de negócio. Implementei soluções que reduziram custos em 30% e aumentaram eficiência operacional significativamente. Da automação de triage de sinistros ao credit scoring, minha experiência cobre casos reais com ROI comprovado. Combino visão estratégica de IA com implementação prática.',
      en: 'AI/ML specialist focused on business results. Implemented solutions that reduced costs by 30% and significantly increased operational efficiency. From automated claims triage to credit scoring, my experience covers real cases with proven ROI. I combine AI strategic vision with practical implementation.'
    },
    keyStrengths: {
      pt: [
        'Implementação ML',
        'Analytics Preditivo',
        'Automação com IA',
        'Governança de Dados',
        'Estratégia de IA',
        'NLP',
        'Visão Computacional',
        'Ética & Compliance IA'
      ],
      en: [
        'ML Implementation',
        'Predictive Analytics',
        'AI Process Automation',
        'Data Governance',
        'AI Strategy',
        'Natural Language Processing',
        'Computer Vision',
        'AI Ethics & Compliance'
      ]
    },
    tools: {
      pt: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'Jupyter', 'OpenAI API'],
      en: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'Jupyter', 'OpenAI API']
    },
    certifications: {
      pt: ['AI Agent Manager Program (NoCodeStartup)', 'Next frontier – AI & Data (JoinIA)'],
      en: ['AI Agent Manager Program (NoCodeStartup)', 'Next frontier – AI & Data (JoinIA)']
    },
    achievements: {
      pt: [
        'AI triage sinistros -30% tempo (Unimed)',
        'ML credit scoring & fraude (Sicredi)',
        'AI-readiness setor público (SEFAZ)',
        'Automação processos fiscais'
      ],
      en: [
        'AI claims triage -30% time (Unimed)',
        'ML credit scoring & fraud (Sicredi)',
        'Public sector AI-readiness (SEFAZ)',
        'Fiscal process automation'
      ]
    },
    relevantExperiences: ['unimed', 'sicredi', 'sefaz'],
    experienceApplied: {
      pt: 'Implementação de IA/ML em healthcare, fintech e governo, com foco em automação e eficiência.',
      en: 'AI/ML implementation in healthcare, fintech, and government, focused on automation and efficiency.'
    }
  },

  agile_strategy: {
    id: 'agile_strategy',
    title: { pt: 'Agile & Strategy', en: 'Agile & Strategy' },
    subtitle: { pt: 'Metodologias Ágeis e Estratégia', en: 'Agile Methodologies & Strategy' },
    icon: '⚡',
    color: 'bg-yellow-600',
    elevatorPitch: {
      pt: 'Líder em transformação ágil e estratégia. Co-fundei a Comunidade Ágil @ InovaBra (2k+ profissionais), implementei SAFe em larga escala e estruturei OKRs corporativos. Especialista em conectar agilidade com resultados estratégicos. Minha abordagem alia métodos lean com execução focada em valor.',
      en: 'Agile transformation and strategy leader. Co-founded Agile Community @ InovaBra (2k+ professionals), implemented SAFe at scale, and structured corporate OKRs. Expert in connecting agility with strategic results. My approach combines lean methods with value-focused execution.'
    },
    keyStrengths: {
      pt: [
        'Scrum Master',
        'Implementação SAFe',
        'Lean Six Sigma',
        'Kanban',
        'Melhoria Contínua',
        'Team Coaching',
        'Transformação Ágil',
        'Cultura DevOps'
      ],
      en: [
        'Scrum Master',
        'SAFe Implementation',
        'Lean Six Sigma',
        'Kanban',
        'Continuous Improvement',
        'Team Coaching',
        'Agile Transformation',
        'DevOps Culture'
      ]
    },
    tools: {
      pt: ['Jira', 'Azure DevOps', 'Confluence', 'Slack', 'Miro', 'Ferramentas de Retrospectiva'],
      en: ['Jira', 'Azure DevOps', 'Confluence', 'Slack', 'Miro', 'Retrospective Tools']
    },
    certifications: {
      pt: ['CSM®', 'SAFe SSM®', 'Lean Six Sigma'],
      en: ['CSM®', 'SAFe SSM®', 'Lean Six Sigma']
    },
    achievements: {
      pt: [
        'Co-fundador Comunidade Ágil @ InovaBra',
        'Frameworks OKR & KPI corporativos',
        'SAFe scaled em banking (2k+ pessoas)',
        'Lean redução SLA 382→62 dias'
      ],
      en: [
        'Co-founder Agile Community @ InovaBra',
        'Corporate OKR & KPI frameworks',
        'SAFe scaled in banking (2k+ people)',
        'Lean SLA reduction 382→62 days'
      ]
    },
    relevantExperiences: ['hsbc_bradesco', 'sicredi', 'unimed', 'sefaz'],
    experienceApplied: {
      pt: 'Escalonamento de métodos ágeis em banking, fintech, healthtech e governo, com foco em cultura e resultados.',
      en: 'Scaling agile methods in banking, fintech, healthtech, and government, focused on culture and results.'
    }
  },

  innovation_leadership: {
    id: 'innovation_leadership',
    title: { pt: 'Innovation & Leadership', en: 'Innovation & Leadership' },
    subtitle: { pt: 'Inovação e Liderança Executiva', en: 'Innovation & Executive Leadership' },
    icon: '🎯',
    color: 'bg-red-600',
    elevatorPitch: {
      pt: 'Executive leader com experiência assessorando CEOs/Boards em decisões estratégicas. Estruturei programas de inovação que geraram novos modelos de negócio e liderei times globais (US, Europa, China, LATAM). Especialista em corporate venture, mentoria de startups e inovação corporativa com impacto mensurável.',
      en: 'Executive leader with experience advising CEOs/Boards on strategic decisions. Structured innovation programs that generated new business models and led global teams (US, Europe, China, LATAM). Expert in corporate venture, startup mentorship, and corporate innovation with measurable impact.'
    },
    keyStrengths: {
      pt: [
        'Planejamento Estratégico',
        'Implementação OKR',
        'Frameworks de Inovação',
        'Design de Modelos de Negócio',
        'Análise de Mercado',
        'Inteligência Competitiva',
        'Corporate Venture',
        'Mentoria de Startups'
      ],
      en: [
        'Strategic Planning',
        'OKR Implementation',
        'Innovation Frameworks',
        'Business Model Design',
        'Market Analysis',
        'Competitive Intelligence',
        'Corporate Venture',
        'Startup Mentoring'
      ]
    },
    tools: {
      pt: ['Business Model Canvas', 'Software de OKR', 'Ferramentas de Pesquisa de Mercado', 'Software de Planejamento Estratégico'],
      en: ['Business Model Canvas', 'OKR Software', 'Market Research Tools', 'Strategic Planning Software']
    },
    certifications: {
      pt: ['MSc Business Management (Unisinos)', 'MBA Project Management (FGV)', 'Cooperative Financial Institutions (Escoop)'],
      en: ['MSc Business Management (Unisinos)', 'MBA Project Management (FGV)', 'Cooperative Financial Institutions (Escoop)']
    },
    achievements: {
      pt: [
        '4 novos produtos Unimed (5% receita)',
        'Board advisor transformação',
        'Avaliador Inovar Juntos (PUC)',
        'Liderança global (US, EU, CN, LATAM)'
      ],
      en: [
        '4 new Unimed products (5% revenue)',
        'Board advisor transformation',
        'Inovar Juntos evaluator (PUC)',
        'Global leadership (US, EU, CN, LATAM)'
      ]
    },
    relevantExperiences: ['unimed', 'sicredi', 'hsbc_bradesco', 'sefaz'],
    experienceApplied: {
      pt: 'Liderança executiva em inovação corporativa, venture building e transformação organizacional.',
      en: 'Executive leadership in corporate innovation, venture building, and organizational transformation.'
    }
  }
};

export const competenciesList = Object.values(competenciesData);
