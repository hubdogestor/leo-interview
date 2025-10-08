// Contextos de Entrevista para Personalização

export const interviewContexts = {
  companyTypes: [
    {
      id: 'startup',
      name: 'Startup',
      description: 'Empresas em estágio inicial, foco em crescimento rápido',
      characteristics: ['Agilidade', 'Inovação', 'Recursos limitados', 'Crescimento acelerado'],
      relevantSkills: ['Adaptabilidade', 'Execução rápida', 'Multitasking', 'Ownership'],
      suggestedProfile: 'product_manager'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Grandes empresas estabelecidas, foco em escala e eficiência',
      characteristics: ['Processos estruturados', 'Escala', 'Governança', 'Compliance'],
      relevantSkills: ['Gestão de processos', 'Governança', 'Stakeholder management', 'Compliance'],
      suggestedProfile: 'program_manager'
    },
    {
      id: 'consulting',
      name: 'Consultoria',
      description: 'Empresas de consultoria, foco em soluções para clientes',
      characteristics: ['Expertise', 'Metodologia', 'Resultados', 'Relacionamento'],
      relevantSkills: ['Problem solving', 'Metodologias', 'Comunicação', 'Resultados'],
      suggestedProfile: 'strategy_manager'
    },
    {
      id: 'government',
      name: 'Setor Público',
      description: 'Organizações governamentais, foco em transparência e eficiência',
      characteristics: ['Transparência', 'Accountability', 'Regulamentação', 'Impacto social'],
      relevantSkills: ['Governança', 'Compliance', 'Transparência', 'Gestão pública'],
      suggestedProfile: 'pmo_manager'
    },
    {
      id: 'tech',
      name: 'Empresa de Tecnologia',
      description: 'Empresas focadas em produtos e soluções tecnológicas',
      characteristics: ['Inovação', 'Tecnologia', 'Produto', 'Escalabilidade'],
      relevantSkills: ['Product management', 'Tecnologia', 'Inovação', 'Growth'],
      suggestedProfile: 'innovation_manager'
    }
  ],

  industries: [
    {
      id: 'fintech',
      name: 'Fintech',
      description: 'Serviços financeiros digitais',
      relevantExperiences: ['sicredi', 'hsbc_bradesco'],
      keyTopics: ['Digital banking', 'Credit scoring', 'Compliance', 'Fraud detection'],
      technologies: ['APIs bancárias', 'ML para crédito', 'Blockchain', 'Open Banking']
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Saúde e tecnologia médica',
      relevantExperiences: ['unimed'],
      keyTopics: ['Claims processing', 'Patient experience', 'AI em saúde', 'Regulamentação'],
      technologies: ['HL7/FHIR', 'AI para diagnóstico', 'Telemedicina', 'EHR']
    },
    {
      id: 'telecom',
      name: 'Telecomunicações',
      description: 'Infraestrutura e serviços de telecomunicações',
      relevantExperiences: ['huawei'],
      keyTopics: ['Network rollout', 'Infrastructure', '5G/4G', 'IoT'],
      technologies: ['Network management', 'RF engineering', 'Cloud RAN', 'SDN/NFV']
    },
    {
      id: 'government',
      name: 'Governo',
      description: 'Setor público e administração',
      relevantExperiences: ['sefaz'],
      keyTopics: ['Digital government', 'Public policy', 'Transparency', 'Efficiency'],
      technologies: ['GovTech', 'Blockchain', 'AI para governo', 'Interoperabilidade']
    },
    {
      id: 'banking',
      name: 'Banking',
      description: 'Serviços bancários tradicionais',
      relevantExperiences: ['hsbc_bradesco', 'sicredi'],
      keyTopics: ['Core banking', 'Digital transformation', 'Regulatory compliance', 'Customer experience'],
      technologies: ['Core banking systems', 'APIs', 'Mobile banking', 'Data analytics']
    }
  ],

  positionLevels: [
    {
      id: 'manager',
      name: 'Manager',
      description: 'Posições de gestão individual',
      focusAreas: ['Execução', 'Team leadership', 'Tactical planning'],
      expectedExperience: '5-10 anos',
      keyQuestions: ['Team management', 'Project delivery', 'Problem solving']
    },
    {
      id: 'senior_manager',
      name: 'Senior Manager',
      description: 'Posições de gestão sênior',
      focusAreas: ['Strategic execution', 'Cross-functional leadership', 'Process optimization'],
      expectedExperience: '8-15 anos',
      keyQuestions: ['Strategic thinking', 'Change management', 'Stakeholder management']
    },
    {
      id: 'director',
      name: 'Director',
      description: 'Posições de diretoria',
      focusAreas: ['Strategic planning', 'Organizational leadership', 'Business transformation'],
      expectedExperience: '12+ anos',
      keyQuestions: ['Vision setting', 'Organizational change', 'Business impact']
    },
    {
      id: 'vp',
      name: 'VP / C-Level',
      description: 'Posições executivas',
      focusAreas: ['Business strategy', 'Market positioning', 'Organizational transformation'],
      expectedExperience: '15+ anos',
      keyQuestions: ['Strategic vision', 'Market leadership', 'Organizational transformation']
    }
  ],

  interviewTypes: [
    {
      id: 'behavioral',
      name: 'Comportamental',
      description: 'Foco em experiências passadas e competências comportamentais',
      questionTypes: ['STAR situations', 'Leadership examples', 'Problem solving'],
      duration: '45-60 min',
      preparation: 'Casos STAR preparados, exemplos específicos'
    },
    {
      id: 'technical',
      name: 'Técnica',
      description: 'Avaliação de conhecimentos técnicos específicos',
      questionTypes: ['Technical knowledge', 'System design', 'Problem solving'],
      duration: '60-90 min',
      preparation: 'Conhecimentos técnicos, arquiteturas, ferramentas'
    },
    {
      id: 'case_study',
      name: 'Case Study',
      description: 'Análise de casos de negócio e resolução de problemas',
      questionTypes: ['Business analysis', 'Strategic thinking', 'Recommendations'],
      duration: '60-90 min',
      preparation: 'Frameworks de análise, pensamento estruturado'
    },
    {
      id: 'cultural_fit',
      name: 'Cultural Fit',
      description: 'Avaliação de alinhamento com valores e cultura da empresa',
      questionTypes: ['Values alignment', 'Work style', 'Team collaboration'],
      duration: '30-45 min',
      preparation: 'Pesquisa sobre cultura da empresa, valores pessoais'
    }
  ]
};

// Função para recomendar perfil baseado no contexto
export const recommendProfile = (companyType, industry, positionLevel) => {
  const company = interviewContexts.companyTypes.find(c => c.id === companyType);
  const ind = interviewContexts.industries.find(i => i.id === industry);
  const level = interviewContexts.positionLevels.find(l => l.id === positionLevel);

  // Lógica de recomendação baseada no contexto
  if (industry === 'fintech' || industry === 'healthcare') {
    return 'product_manager';
  } else if (companyType === 'corporate' || positionLevel === 'director') {
    return 'program_manager';
  } else if (companyType === 'consulting' || positionLevel === 'vp') {
    return 'strategy_manager';
  } else if (companyType === 'government') {
    return 'pmo_manager';
  } else if (companyType === 'tech' || companyType === 'startup') {
    return 'innovation_manager';
  }

  return company?.suggestedProfile || 'product_manager';
};

// Função para obter perguntas relevantes baseadas no contexto
export const getContextualQuestions = (companyType, industry, positionLevel) => {
  const baseQuestions = [
    "Tell me about yourself",
    "Why do you want to work here?",
    "What's your greatest professional achievement?",
    "Describe a challenging situation you faced and how you handled it"
  ];

  const contextualQuestions = [];

  // Adicionar perguntas baseadas no tipo de empresa
  if (companyType === 'startup') {
    contextualQuestions.push(
      "How do you handle ambiguity and rapid change?",
      "Tell me about a time when you had to do more with less resources"
    );
  } else if (companyType === 'corporate') {
    contextualQuestions.push(
      "How do you manage complex stakeholder relationships?",
      "Describe your experience with governance and compliance"
    );
  }

  // Adicionar perguntas baseadas na indústria
  if (industry === 'fintech') {
    contextualQuestions.push(
      "How do you balance innovation with regulatory compliance?",
      "Tell me about your experience with financial products"
    );
  } else if (industry === 'healthcare') {
    contextualQuestions.push(
      "How do you ensure patient privacy and data security?",
      "Describe your experience with healthcare regulations"
    );
  }

  // Adicionar perguntas baseadas no nível da posição
  if (positionLevel === 'director' || positionLevel === 'vp') {
    contextualQuestions.push(
      "How do you set and communicate strategic vision?",
      "Tell me about a time when you led organizational transformation"
    );
  }

  return [...baseQuestions, ...contextualQuestions];
};

export default interviewContexts;
