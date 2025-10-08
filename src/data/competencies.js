// Competências Técnicas do Leonardo Menezes

export const competencies = {
  program_management: {
    id: 'program_management',
    title: 'Program Management & PMO',
    subtitle: 'Gestão de programas e portfólios',
    icon: '📊',
    color: 'bg-blue-500',
    description: 'Experiência em estruturação e liderança de PMOs, gestão de programas complexos e governança de portfólios.',
    skills: [
      'PMO Framework Design',
      'Portfolio Management',
      'Earned Value Management (EVM)',
      'Critical Path Method (CPM)',
      'Vendor Management',
      'Risk Management',
      'Stakeholder Management',
      'Executive Dashboards'
    ],
    tools: [
      'Primavera P6',
      'MS Project Server',
      'SAP (MM/PM)',
      'Tableau',
      'Power BI'
    ],
    certifications: [
      'PMP®',
      'PMO-CP®',
      'SAFe SSM®'
    ]
  },

  digital_transformation: {
    id: 'digital_transformation',
    title: 'Digital Transformation',
    subtitle: 'Transformação digital e inovação',
    icon: '🚀',
    color: 'bg-purple-500',
    description: 'Liderança em iniciativas de transformação digital, modernização de processos e implementação de tecnologias emergentes.',
    skills: [
      'Digital Strategy',
      'Process Automation',
      'Change Management',
      'Digital Culture',
      'Innovation Management',
      'Technology Adoption',
      'Digital Customer Experience',
      'Legacy System Modernization'
    ],
    tools: [
      'n8n',
      'Zapier',
      'Power Automate',
      'APIs',
      'Cloud Platforms'
    ],
    certifications: [
      'Digital Product Leadership (TERA)',
      'Innovation & Sustainability (Unisinos)'
    ]
  },

  product_management: {
    id: 'product_management',
    title: 'Product Management',
    subtitle: 'Gestão de produtos e estratégia',
    icon: '📈',
    color: 'bg-green-500',
    description: 'Gestão end-to-end de produtos digitais, desde discovery até delivery, com foco em valor para o usuário.',
    skills: [
      'Product Strategy',
      'Product Discovery',
      'User Experience Design',
      'Product-Market Fit',
      'Roadmap Planning',
      'Feature Prioritization',
      'A/B Testing',
      'Product Analytics'
    ],
    tools: [
      'Figma',
      'Miro',
      'Amplitude',
      'Google Analytics',
      'Hotjar',
      'ProductBoard'
    ],
    certifications: [
      'Product Management (PM3)',
      'Product Discovery (PM3)'
    ]
  },

  ai_data_analytics: {
    id: 'ai_data_analytics',
    title: 'AI & Data Analytics',
    subtitle: 'Inteligência artificial e análise de dados',
    icon: '🤖',
    color: 'bg-orange-500',
    description: 'Implementação de soluções de IA e ML para automação de processos e insights baseados em dados.',
    skills: [
      'Machine Learning Implementation',
      'Predictive Analytics',
      'Process Automation with AI',
      'Data Governance',
      'AI Strategy',
      'Natural Language Processing',
      'Computer Vision',
      'AI Ethics & Compliance'
    ],
    tools: [
      'Python',
      'TensorFlow',
      'Scikit-learn',
      'Pandas',
      'Jupyter',
      'OpenAI API'
    ],
    certifications: [
      'AI Agent Manager Program (NoCodeStartup)',
      'Next frontier – AI & Data (JoinIA)'
    ]
  },

  agile_lean: {
    id: 'agile_lean',
    title: 'Agile & Lean',
    subtitle: 'Metodologias ágeis e lean',
    icon: '⚡',
    color: 'bg-yellow-500',
    description: 'Implementação e scaling de metodologias ágeis, lean e frameworks de melhoria contínua.',
    skills: [
      'Scrum Master',
      'SAFe Implementation',
      'Lean Six Sigma',
      'Kanban',
      'Continuous Improvement',
      'Team Coaching',
      'Agile Transformation',
      'DevOps Culture'
    ],
    tools: [
      'Jira',
      'Azure DevOps',
      'Confluence',
      'Slack',
      'Miro',
      'Retrospective Tools'
    ],
    certifications: [
      'CSM®',
      'SAFe SSM®',
      'Lean Six Sigma'
    ]
  },

  strategy_innovation: {
    id: 'strategy_innovation',
    title: 'Strategy & Innovation',
    subtitle: 'Estratégia e inovação',
    icon: '🎯',
    color: 'bg-red-500',
    description: 'Desenvolvimento de estratégias corporativas, frameworks de inovação e gestão de mudanças organizacionais.',
    skills: [
      'Strategic Planning',
      'OKR Implementation',
      'Innovation Frameworks',
      'Business Model Design',
      'Market Analysis',
      'Competitive Intelligence',
      'Corporate Venture',
      'Startup Mentoring'
    ],
    tools: [
      'Business Model Canvas',
      'OKR Software',
      'Market Research Tools',
      'Strategic Planning Software'
    ],
    certifications: [
      'Business Management (Unisinos)',
      'Cooperative Financial Institutions (Escoop)'
    ]
  }
};

export const competenciesList = Object.values(competencies);
