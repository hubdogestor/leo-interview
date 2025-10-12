// @ts-check
// Perfis Personalizados para Diferentes Tipos de Vaga - agora com typedefs bilíngues
/** @typedef {{pt:string,en:string}} Bilingual */
/**
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string} icon
 * @property {string} color
 * @property {Bilingual} title
 * @property {Bilingual} subtitle
 * @property {{pt:string,en:string}} elevatorPitch
 * @property {{pt:string[],en:string[]}} keyStrengths
 * @property {string[]} relevantExperiences - chaves que referenciam experiencesData
 * @property {string[]} topCases - chaves de casos em experiencesData
 * @property {{pt:string[],en:string[]}} technologies
 * @property {{pt:string[],en:string[]}} achievements
 */

/** @type {Record<string, Profile>} */
export const profilesData = {
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
        'Design Centrado no Usuário',
        'Decisão Orientada por Dados',
        'Liderança Multifuncional',
        'Growth & Monetização',
        'Integração de IA/ML em Produtos'
      ],
      en: [
        'Product Strategy & Roadmapping',
        'User-Centered Design',
        'Data-Driven Decision Making',
        'Cross-functional Leadership',
        'Growth & Monetization',
        'AI/ML Product Integration'
      ]
    },
    relevantExperiences: ['unimed', 'sicredi', 'hsbc_bradesco'],
    topCases: [
      'unimed-digital-products',
      'sicredi-woop-growth',
      'bradesco-next-launch'
    ],
    technologies: {
      pt: [
        'Analytics de Produto (Amplitude, Mixpanel)',
        'Ferramentas de Design (Figma, Sketch)',
        'Plataformas de Teste A/B',
        'Ferramentas de Pesquisa com Usuários',
        'Gestão de APIs',
        'Desenvolvimento Mobile & Web'
      ],
      en: [
        'Product Analytics (Amplitude, Mixpanel)',
        'Design Tools (Figma, Sketch)',
        'A/B Testing Platforms',
        'User Research Tools',
        'API Management',
        'Mobile & Web Development'
      ]
    },
    achievements: {
      pt: [
        '4 produtos digitais na Unimed (5% receita = $16M)',
        'Crescimento 25% Woop App ($50M receita)',
        'Lançamento Next Bank',
        'NPS +6% & churn -15% Unimed',
        'AI em produtos de saúde'
      ],
      en: [
        '4 digital products at Unimed (5% revenue = $16M)',
        '25% Woop App adoption growth ($50M revenue)',
        'Next Digital Bank launch',
        'NPS +6% & churn -15% at Unimed',
        'AI in healthcare products'
      ]
    }
  },

  program_manager: {
  id: 'program_manager',
  title: { pt: 'Program Manager', en: 'Program Manager' },
  subtitle: { pt: 'Gestão de Programas Complexos', en: 'Complex Program Leadership' },
    icon: '📊',
    color: 'bg-purple-600',
    elevatorPitch: {
      pt: 'Program Manager com track record comprovado em programas de grande escala e alta complexidade. Liderei transformações que geraram mais de $300M em valor, desde rollouts de infraestrutura global até migrações bancárias críticas. Especialista em PMO, governança e gestão de stakeholders multiculturais. Minha abordagem combina rigor metodológico com adaptabilidade para entregar resultados em ambientes desafiadores.',
      en: 'Program Manager with proven track record in large-scale, high-complexity programs. Led transformations generating over $300M in value, from global infrastructure rollouts to critical banking migrations. Expert in PMO, governance, and multicultural stakeholder management. My approach combines methodological rigor with adaptability to deliver results in challenging environments.'
    },
    keyStrengths: {
      pt: [
        'Entrega de Programas em Larga Escala',
        'Design de Framework PMO',
        'Gestão de Riscos & Stakeholders',
        'Liderança Multicultural',
        'Otimização de Processos',
        'Gestão de Fornecedores & Parceiros'
      ],
      en: [
        'Large-Scale Program Delivery',
        'PMO Framework Design',
        'Risk & Stakeholder Management',
        'Cross-Cultural Team Leadership',
        'Process Optimization',
        'Vendor & Partner Management'
      ]
    },
    relevantExperiences: ['huawei', 'hsbc_bradesco', 'sefaz'],
    topCases: [
      'huawei-sla-reduction',
      'hsbc-bradesco-migration',
      'sefaz-profisco-pmo'
    ],
    technologies: {
      pt: [
        'Gestão de Projetos (Primavera P6, MS Project)',
        'Sistemas ERP (SAP)',
        'Ferramentas de BI & Dashboards',
        'Software de Gestão de Riscos',
        'Plataformas de Colaboração',
        'Automação de Processos'
      ],
      en: [
        'Project Management (Primavera P6, MS Project)',
        'ERP Systems (SAP)',
        'Dashboard & BI Tools',
        'Risk Management Software',
        'Collaboration Platforms',
        'Process Automation'
      ]
    },
    achievements: {
      pt: [
        'Redução SLA 382→62 dias ($120M economia)',
        'Migração $3B HSBC→Bradesco sem perda de dados',
        'PMO Profisco II (parceria BID)',
        'Global Excellent PM (2012-2014)',
        '$1.4M ganhos eficiência setor público'
      ],
      en: [
        'SLA reduction 382→62 days ($120M savings)',
        '$3B HSBC→Bradesco migration no data loss',
        'Profisco II PMO (IDB partnership)',
        'Global Excellent PM (2012-2014)',
        '$1.4M public sector efficiency gains'
      ]
    }
  },

  strategy_manager: {
  id: 'strategy_manager',
  title: { pt: 'Strategy Manager', en: 'Strategy Manager' },
  subtitle: { pt: 'Estratégia Corporativa e Inovação', en: 'Corporate Strategy & Innovation' },
    icon: '🎯',
    color: 'bg-green-600',
    elevatorPitch: {
      pt: 'Strategy Manager com experiência em transformar visões estratégicas em resultados tangíveis. Assessorei CEOs e Boards em decisões críticas, implementei frameworks de OKR em organizações complexas e liderei iniciativas de inovação que geraram novos modelos de negócio. Especialista em conectar estratégia, inovação e execução, com experiência desde cooperativas até multinacionais.',
      en: 'Strategy Manager with experience transforming strategic visions into tangible results. Advised CEOs and Boards on critical decisions, implemented OKR frameworks in complex organizations, and led innovation initiatives that generated new business models. Expert in connecting strategy, innovation, and execution, with experience from cooperatives to multinationals.'
    },
    keyStrengths: {
      pt: [
        'Planejamento & Execução Estratégica',
        'Design de Framework OKR & KPI',
        'Gestão de Inovação',
        'Inovação de Modelos de Negócio',
        'Advisory para Board',
        'Análise de Mercado & Posicionamento'
      ],
      en: [
        'Strategic Planning & Execution',
        'OKR & KPI Framework Design',
        'Innovation Management',
        'Business Model Innovation',
        'Board Advisory',
        'Market Analysis & Positioning'
      ]
    },
    relevantExperiences: ['unimed', 'sicredi', 'sefaz'],
    topCases: [
      'unimed-digital-products',
      'sicredi-woop-growth',
      'sefaz-ai-readiness'
    ],
    technologies: {
      pt: [
        'Software de Planejamento Estratégico',
        'Plataformas de OKR',
        'Ferramentas de Business Intelligence',
        'Plataformas de Pesquisa de Mercado',
        'Sistemas de Gestão de Inovação',
        'Ferramentas de Estratégia de IA'
      ],
      en: [
        'Strategic Planning Software',
        'OKR Platforms',
        'Business Intelligence Tools',
        'Market Research Platforms',
        'Innovation Management Systems',
        'AI Strategy Tools'
      ]
    },
    achievements: {
      pt: [
        'EBITDA +22% Unimed ($70.4M impacto)',
        'Frameworks OKR & KPI corporativos',
        'Board advisor transformação digital',
        'Avaliador Inovar Juntos (PUC)',
        'AI-readiness setor público'
      ],
      en: [
        'EBITDA +22% Unimed ($70.4M impact)',
        'Corporate OKR & KPI frameworks',
        'Digital transformation board advisor',
        'Inovar Juntos (PUC) evaluator',
        'Public sector AI-readiness assessment'
      ]
    }
  },

  pmo_manager: {
  id: 'pmo_manager',
  title: { pt: 'PMO Manager', en: 'PMO Manager' },
  subtitle: { pt: 'Governança e Excelência Operacional', en: 'Governance & Operational Excellence' },
    icon: '🏢',
    color: 'bg-orange-600',
    elevatorPitch: {
      pt: 'PMO Manager especialista em estruturar governança de classe mundial e entregar excelência operacional. Construí PMOs do zero que gerenciaram portfólios de $1B+, implementei frameworks que reduziram custos em centenas de milhões e estabeleci práticas adotadas globalmente. Minha abordagem combina rigor metodológico com pragmatismo para criar PMOs que realmente agregam valor ao negócio.',
      en: 'PMO Manager expert in structuring world-class governance and delivering operational excellence. Built PMOs from scratch that managed $1B+ portfolios, implemented frameworks that reduced costs by hundreds of millions, and established practices adopted globally. My approach combines methodological rigor with pragmatism to create PMOs that truly add business value.'
    },
    keyStrengths: {
      pt: [
        'Estruturação & Maturação de PMO',
        'Governança de Portfólio',
        'Padronização de Processos',
        'Gestão de Performance',
        'Desenvolvimento de Times',
        'Reporting Executivo'
      ],
      en: [
        'PMO Setup & Maturation',
        'Portfolio Governance',
        'Process Standardization',
        'Performance Management',
        'Team Development',
        'Executive Reporting'
      ]
    },
    relevantExperiences: ['huawei', 'hsbc_bradesco', 'sefaz'],
    topCases: [
      'huawei-sla-reduction',
      'hsbc-bradesco-migration',
      'sefaz-profisco-pmo'
    ],
    technologies: {
      pt: [
        'Software PMO (Primavera, MS Project Server)',
        'Ferramentas de Gestão de Portfólio',
        'Ferramentas de Dashboard & Reporting',
        'Software de Gestão de Processos',
        'Plataformas de Colaboração',
        'Ferramentas de Auditoria & Compliance'
      ],
      en: [
        'PMO Software (Primavera, MS Project Server)',
        'Portfolio Management Tools',
        'Dashboard & Reporting Tools',
        'Process Management Software',
        'Collaboration Platforms',
        'Audit & Compliance Tools'
      ]
    },
    achievements: {
      pt: [
        'War Room PMO (30+ PMs, 20 fornecedores)',
        'Governança replicada globalmente',
        'Portal PMO executivo dashboards',
        'Padronização ($1.4M economia)',
        'Compliance 100% migrações críticas'
      ],
      en: [
        'PMO War Room (30+ PMs, 20 vendors)',
        'Governance replicated globally',
        'Executive PMO portal dashboards',
        'Standardization ($1.4M savings)',
        '100% compliance in critical migrations'
      ]
    }
  },

  innovation_manager: {
  id: 'innovation_manager',
  title: { pt: 'Innovation Manager', en: 'Innovation Manager' },
  subtitle: { pt: 'Transformação Digital e IA', en: 'Digital Transformation & AI' },
    icon: '🚀',
    color: 'bg-red-600',
    elevatorPitch: {
      pt: 'Innovation Manager especialista em transformar organizações através de tecnologias emergentes. Liderei implementações de IA que reduziram custos operacionais em 30%, estruturei programas de inovação corporativa e mentorei startups em aceleradoras. Minha expertise combina visão tecnológica com execução prática, sempre focando em criar valor real através da inovação.',
      en: 'Innovation Manager expert in transforming organizations through emerging technologies. Led AI implementations that reduced operational costs by 30%, structured corporate innovation programs, and mentored startups in accelerators. My expertise combines technological vision with practical execution, always focusing on creating real value through innovation.'
    },
    keyStrengths: {
      pt: [
        'Implementação de IA & ML',
        'Transformação Digital',
        'Design de Programas de Inovação',
        'Ecossistema de Startups',
        'Estratégia de Tecnologia',
        'Gestão de Mudança'
      ],
      en: [
        'AI & ML Implementation',
        'Digital Transformation',
        'Innovation Program Design',
        'Startup Ecosystem',
        'Technology Strategy',
        'Change Management'
      ]
    },
    relevantExperiences: ['unimed', 'sicredi', 'sefaz'],
    topCases: [
      'unimed-ai-claims',
      'sicredi-ml-credit',
      'sefaz-ai-readiness'
    ],
    technologies: {
      pt: [
        'Plataformas de IA/ML',
        'Ferramentas de Automação de Processos',
        'Software de Gestão de Inovação',
        'Plataformas de Analytics de Dados',
        'Tecnologias de Cloud',
        'Integração de APIs'
      ],
      en: [
        'AI/ML Platforms',
        'Process Automation Tools',
        'Innovation Management Software',
        'Data Analytics Platforms',
        'Cloud Technologies',
        'API Integration'
      ]
    },
    achievements: {
      pt: [
        'IA para triage sinistros (-30% tempo)',
        'ML credit scoring & fraude',
        'AI-readiness setor público',
        'Programa Gestão de Agentes de IA',
        'Mentoria inovação'
      ],
      en: [
        'AI for claims triage (-30% time)',
        'ML credit scoring & fraud',
        'Public sector AI-readiness',
        'AI Agent Management Program',
        'Innovation mentorship'
      ]
    }
  }
};

export const profilesList = Object.values(profilesData);
