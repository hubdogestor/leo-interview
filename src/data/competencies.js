// @ts-check
// Competências Técnicas - versão bilíngue
/** @typedef {{pt:string,en:string}} Bilingual */
/**
 * @typedef {Object} Competency
 * @property {string} id
 * @property {Bilingual} title
 * @property {Bilingual} subtitle
 * @property {Bilingual} description
 * @property {string} icon
 * @property {string} color
 * @property {{pt:string[],en:string[]}} skills
 * @property {{pt:string[],en:string[]}} tools
 * @property {{pt:string[],en:string[]}} certifications
 */

/** @type {Record<string, Competency>} */
export const competenciesData = {
  program_management: {
    id: 'program_management',
    title: { pt: 'Program Management & PMO', en: 'Program Management & PMO' },
    subtitle: { pt: 'Gestão de programas e portfólios', en: 'Programs & Portfolio Governance' },
    icon: '📊',
    color: 'bg-blue-500',
    description: {
      pt: 'Estruturação e liderança de PMOs, programas complexos e governança de portfólios.',
      en: 'Structuring and leading PMOs, complex programs and portfolio governance.'
    },
    skills: {
      pt: [ 'Design de Framework PMO','Gestão de Portfólio','EVM (Earned Value)','CPM (Critical Path)','Vendor Management','Gestão de Riscos','Stakeholder Management','Dashboards Executivos' ],
      en: [ 'PMO Framework Design','Portfolio Management','Earned Value (EVM)','Critical Path Method (CPM)','Vendor Management','Risk Management','Stakeholder Management','Executive Dashboards' ]
    },
    tools: {
      pt: [ 'Primavera P6','MS Project Server','SAP (MM/PM)','Tableau','Power BI' ],
      en: [ 'Primavera P6','MS Project Server','SAP (MM/PM)','Tableau','Power BI' ]
    },
    certifications: {
      pt: [ 'PMP®','PMO-CP®','SAFe SSM®' ],
      en: [ 'PMP®','PMO-CP®','SAFe SSM®' ]
    }
  },

  digital_transformation: {
    id: 'digital_transformation',
    title: { pt: 'Transformação Digital', en: 'Digital Transformation' },
    subtitle: { pt: 'Transformação digital e inovação', en: 'Digital transformation & innovation' },
    icon: '🚀',
    color: 'bg-purple-500',
    description: { pt: 'Liderança em modernização de processos e adoção de tecnologias emergentes.', en: 'Leadership in process modernization and emerging tech adoption.' },
    skills: { pt: [ 'Estratégia Digital','Automação de Processos','Change Management','Cultura Digital','Gestão de Inovação','Adoção Tecnológica','Experiência Digital do Cliente','Modernização de Legados' ], en: [ 'Digital Strategy','Process Automation','Change Management','Digital Culture','Innovation Management','Technology Adoption','Digital Customer Experience','Legacy Modernization' ] },
    tools: { pt: [ 'n8n','Zapier','Power Automate','APIs','Plataformas Cloud' ], en: [ 'n8n','Zapier','Power Automate','APIs','Cloud Platforms' ] },
    certifications: { pt: [ 'Digital Product Leadership (TERA)','Innovation & Sustainability (Unisinos)' ], en: [ 'Digital Product Leadership (TERA)','Innovation & Sustainability (Unisinos)' ] }
  },

  product_management: {
    id: 'product_management',
    title: { pt: 'Product Management', en: 'Product Management' },
    subtitle: { pt: 'Gestão de produtos e estratégia', en: 'Product strategy & lifecycle' },
    icon: '📈',
    color: 'bg-green-500',
    description: { pt: 'Gestão end-to-end (discovery → delivery) focada em valor e experiência.', en: 'End-to-end (discovery → delivery) management focused on value & experience.' },
    skills: { pt: [ 'Estratégia de Produto','Discovery','UX Design','Product-Market Fit','Planejamento de Roadmap','Priorização de Features','A/B Testing','Analytics de Produto' ], en: [ 'Product Strategy','Product Discovery','User Experience Design','Product-Market Fit','Roadmap Planning','Feature Prioritization','A/B Testing','Product Analytics' ] },
    tools: { pt: [ 'Figma','Miro','Amplitude','Google Analytics','Hotjar','ProductBoard' ], en: [ 'Figma','Miro','Amplitude','Google Analytics','Hotjar','ProductBoard' ] },
    certifications: { pt: [ 'Product Management (PM3)','Product Discovery (PM3)' ], en: [ 'Product Management (PM3)','Product Discovery (PM3)' ] }
  },

  ai_data_analytics: {
    id: 'ai_data_analytics',
    title: { pt: 'IA & Data Analytics', en: 'AI & Data Analytics' },
    subtitle: { pt: 'Inteligência artificial e análise de dados', en: 'Artificial intelligence & data analysis' },
    icon: '🤖',
    color: 'bg-orange-500',
    description: { pt: 'Implementação de IA/ML para automação e insights acionáveis.', en: 'AI/ML implementation for automation and actionable insights.' },
    skills: { pt: [ 'Implementação ML','Analytics Preditivo','Automação com IA','Governança de Dados','Estratégia de IA','NLP','Visão Computacional','Ética & Compliance IA' ], en: [ 'Machine Learning Implementation','Predictive Analytics','Process Automation with AI','Data Governance','AI Strategy','Natural Language Processing','Computer Vision','AI Ethics & Compliance' ] },
    tools: { pt: [ 'Python','TensorFlow','Scikit-learn','Pandas','Jupyter','OpenAI API' ], en: [ 'Python','TensorFlow','Scikit-learn','Pandas','Jupyter','OpenAI API' ] },
    certifications: { pt: [ 'AI Agent Manager Program (NoCodeStartup)','Next frontier – AI & Data (JoinIA)' ], en: [ 'AI Agent Manager Program (NoCodeStartup)','Next frontier – AI & Data (JoinIA)' ] }
  },

  agile_lean: {
    id: 'agile_lean',
    title: { pt: 'Agile & Lean', en: 'Agile & Lean' },
    subtitle: { pt: 'Metodologias ágeis e lean', en: 'Agile & lean methodologies' },
    icon: '⚡',
    color: 'bg-yellow-500',
    description: { pt: 'Escalonamento de métodos ágeis, lean e melhoria contínua.', en: 'Scaling agile, lean and continuous improvement frameworks.' },
    skills: { pt: [ 'Scrum Master','Implementação SAFe','Lean Six Sigma','Kanban','Melhoria Contínua','Team Coaching','Transformação Ágil','Cultura DevOps' ], en: [ 'Scrum Master','SAFe Implementation','Lean Six Sigma','Kanban','Continuous Improvement','Team Coaching','Agile Transformation','DevOps Culture' ] },
    tools: { pt: [ 'Jira','Azure DevOps','Confluence','Slack','Miro','Ferramentas de Retrospectiva' ], en: [ 'Jira','Azure DevOps','Confluence','Slack','Miro','Retrospective Tools' ] },
    certifications: { pt: [ 'CSM®','SAFe SSM®','Lean Six Sigma' ], en: [ 'CSM®','SAFe SSM®','Lean Six Sigma' ] }
  },

  strategy_innovation: {
    id: 'strategy_innovation',
    title: { pt: 'Strategy & Innovation', en: 'Strategy & Innovation' },
    subtitle: { pt: 'Estratégia e inovação', en: 'Strategy & innovation' },
    icon: '🎯',
    color: 'bg-red-500',
    description: { pt: 'Estratégias corporativas, frameworks de inovação e mudança organizacional.', en: 'Corporate strategy, innovation frameworks and organizational change.' },
    skills: { pt: [ 'Planejamento Estratégico','Implementação OKR','Frameworks de Inovação','Design de Modelos de Negócio','Análise de Mercado','Inteligência Competitiva','Corporate Venture','Mentoria de Startups' ], en: [ 'Strategic Planning','OKR Implementation','Innovation Frameworks','Business Model Design','Market Analysis','Competitive Intelligence','Corporate Venture','Startup Mentoring' ] },
    tools: { pt: [ 'Business Model Canvas','Software de OKR','Ferramentas de Pesquisa de Mercado','Software de Planejamento Estratégico' ], en: [ 'Business Model Canvas','OKR Software','Market Research Tools','Strategic Planning Software' ] },
    certifications: { pt: [ 'Business Management (Unisinos)','Cooperative Financial Institutions (Escoop)' ], en: [ 'Business Management (Unisinos)','Cooperative Financial Institutions (Escoop)' ] }
  }
};

export const competenciesList = Object.values(competenciesData);
