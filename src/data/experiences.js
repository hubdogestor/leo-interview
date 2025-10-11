// @ts-check
/**
 * Estrutura bilíngue para textos curtos.
 * @typedef {{pt:string,en:string}} Bilingual
 *
 * Estrutura de um caso (STAR) de experiência.
 * @typedef {Object} ExperienceCase
 * @property {string} id
 * @property {Bilingual} title
 * @property {Bilingual} situation
 * @property {Bilingual} task
 * @property {Bilingual} action
 * @property {Bilingual} result
 * @property {Bilingual} learning
 * @property {{pt:string[],en:string[]}|string[]} tags
 * @property {number} score
 *
 * Estrutura de experiência profissional.
 * @typedef {Object} Experience
 * @property {string} id
 * @property {Bilingual} title
 * @property {Bilingual} subtitle
 * @property {string} period
 * @property {Bilingual} location
 * @property {Bilingual} role
 * @property {string} icon
 * @property {string} color
 * @property {Bilingual} summary
 * @property {{pt:string[],en:string[]}} keyAchievements
 * @property {ExperienceCase[]} cases
 */

/** @type {Record<string, Experience>} */
export const experiencesData = {
  huawei: {
    id: 'huawei',
    title: { pt: 'Huawei', en: 'Huawei' },
    subtitle: { pt: 'Telecom & Infraestrutura', en: 'Telecom & Infrastructure' },
    period: '2009-2015',
    location: { pt: 'América Latina', en: 'Latin America' },
    role: { pt: 'Gerente de Programas & PMO', en: 'Programs & PMO Manager' },
    sector: { pt: 'Telecom & Infrastructure', en: 'Telecom & Infrastructure' },
    icon: '🏢',
    color: 'bg-red-500',
    summary: {
      pt: 'Líder global em TIC (170+ países; $90B+ receita). Responsável por programas turn‑key para grandes operadoras.',
      en: 'Global ICT leader (170+ countries; $90B+ revenue). Responsible for turn‑key programs for major carriers.'
    },
    overview: {
      pt: 'Líder global em TIC (170+ países; $90B+ receita). Responsável por programas turnkey para grandes operadoras.',
      en: 'Global ICT leader (170+ countries; $90B+ revenue). Responsible for turnkey programs for major carriers.'
    },
    keyAchievements: {
      pt: [
        'Redução SLA 382 → 62 dias (~$120M economia)',
        'War Room PMO (30+ PMs, 20 fornecedores)',
        'Primeira estação 4G do Brasil (2012)',
        'Telecom Copa do Mundo FIFA 2014',
        'Global Excellent PM (2012-2014)'
      ],
      en: [
        'SLA reduction 382 → 62 days (~$120M savings)',
        'PMO War Room (30+ PMs, 20 vendors)',
        'Brazil’s first 4G site (2012)',
        'World Cup 2014 telecom delivery',
        'Global Excellent PM (2012-2014)'
      ]
    },
    cases: [
      {
        id: 'huawei-sla-reduction',
        title: { pt: 'Redução Drástica de SLA em Rollout de Telecom', en: 'Drastic SLA Reduction in Telecom Rollout' },
        situation: {
          pt: 'Contratos turn‑key com grandes operadoras tinham ciclo médio de 382 dias, afetando receita e imagem (ANATEL / FIFA 2014).',
          en: 'Turn‑key contracts with major carriers had a 382‑day average delivery cycle, impacting revenue and reputation (ANATEL / FIFA 2014).'
        },
        task: {
          pt: 'Redesenhar processos e reduzir drasticamente o tempo mantendo qualidade e compliance.',
          en: 'Redesign rollout processes and drastically cut cycle time while preserving quality & compliance.'
        },
        action: {
          pt: 'War Room PMO central; CPM + EVM; negociação ANATEL/prefeituras; dashboards padronizados; RCA semanal; Vendor Performance Index.',
          en: 'Central PMO War Room; CPM + EVM; regulatory & municipality negotiations; standardized dashboards; weekly RCA; Vendor Performance Index.'
        },
        result: {
          pt: 'SLA 382 → 62 dias (~320 dias ganho); ~$120M eficiência; 1ª estação 4G antes do prazo; 100% operação Copa 2014.',
          en: 'SLA 382 → 62 days (~320 days gain); ~$120M efficiency; first 4G site ahead of schedule; 100% World Cup ops readiness.'
        },
        learning: {
          pt: 'Eficiência exige mergulho técnico-operacional aliado à governança.',
          en: 'Efficiency demands deep technical/operational dive plus governance.'
        },
        tags: {
          pt: ['PMO', 'Otimização de Processos', 'Gestão de Fornecedores', 'Caminho Crítico', 'Análise de Causa Raiz'],
          en: ['PMO', 'Process Optimization', 'Vendor Management', 'Critical Path', 'Root Cause Analysis']
        },
        score: 95
      },
      {
        id: 'huawei-4g-pioneer',
        title: { pt: 'Lançamento Pioneiro do 4G no Brasil', en: 'Pioneering 4G Launch in Brazil' },
        situation: {
          pt: 'Brasil atrasado no 4G; pressão regulatória ANATEL e compromissos Copa; competição acirrada.',
          en: 'Brazil lagging on 4G; ANATEL regulatory pressure & World Cup commitments; intense competition.'
        },
        task: {
          pt: 'Liderar primeira estação 4G garantindo vantagem competitiva e prazos.',
          en: 'Lead first commercial 4G site ensuring competitive edge and deadlines.'
        },
        action: {
          pt: 'Coordenação multidisciplinar; fast‑track para críticos; priorização de sites estratégicos; QA rigoroso; gestão regulatória.',
          en: 'Multidisciplinary coordination; fast‑track critical items; strategic site prioritization; rigorous QA; regulatory stakeholder management.'
        },
        result: {
          pt: 'Primeira estação 4G (2012) antes do prazo; posicionamento de liderança; contratos subsequentes.',
          en: 'First 4G site (2012) ahead of schedule; leadership positioning; subsequent national rollout contracts.'
        },
        learning: {
          pt: 'Ser pioneiro exige alinhamento técnico, regulatório e comercial.',
          en: 'Pioneering requires tight alignment across technical, regulatory, commercial domains.'
        },
        tags: {
          pt: ['Inovação', 'Liderança Tecnológica', 'Compliance Regulatória', 'Fast-Track', 'Liderança de Mercado'],
          en: ['Innovation', 'Technology Leadership', 'Regulatory Compliance', 'Fast-Track', 'Market Leadership']
        },
        score: 92
      }
    ]
  },
  hsbc_bradesco: {
    id: 'hsbc_bradesco',
    title: { pt: 'HSBC & Bradesco', en: 'HSBC & Bradesco' },
    subtitle: { pt: 'Transformação Digital Bancária', en: 'Banking & Digital Transformation' },
    period: '2015-2018',
    location: { pt: 'São Paulo, Brasil', en: 'São Paulo, Brazil' },
    role: { pt: 'Gerente de Programas Digitais', en: 'Digital Programs Manager' },
    sector: { pt: 'Banking & Digital Transformation', en: 'Banking & Digital Transformation' },
    icon: '🏦',
    color: 'bg-blue-600',
    summary: {
      pt: 'Um dos maiores bancos globais / maior banco privado brasileiro. Portfólio RBWM e migração crítica.',
      en: 'One of the largest global banks / major Brazilian private bank. RBWM portfolio & critical migration.'
    },
    overview: {
      pt: 'Um dos maiores bancos do mundo (60+ países, $2.9T ativos) / Maior banco privado do Brasil ($1.7T ativos; 60+ milhões de clientes).',
      en: 'One of the world largest banks (60+ countries, $2.9T assets) / Brazil largest private bank ($1.7T assets; 60+ million clients).'
    },
    keyAchievements: {
      pt: [
        'Migração HSBC → Bradesco ($3B sem perda)',
        'Compliance FATCA + retenção clientes',
        'Lançamento Banco Digital Next',
        'Redução 20% tempo atendimento',
        'Aumento 30% portfolio private banking'
      ],
      en: [
        'HSBC → Bradesco migration ($3B no data loss)',
        'FATCA compliance + client retention',
        'Launch of Next Digital Bank',
        '20% service time reduction',
        '30% private banking portfolio growth'
      ]
    },
    cases: [
      {
        id: 'hsbc-bradesco-migration',
        title: { pt: 'Migração Complexa HSBC para Bradesco', en: 'Complex HSBC to Bradesco Migration' },
        situation: { pt: 'Saída do HSBC Brasil exigia migração segura de milhões de contas sob rigor regulatório.', en: 'HSBC Brazil exit required secure migration of millions of accounts under strict regulation.' },
        task: { pt: 'Supervisionar migração de R$3Bi garantindo zero perda e compliance total.', en: 'Supervise R$3B assets migration ensuring zero loss and full compliance.' },
        action: { pt: 'Projetos multi-país; implantação FATCA; squads globais Data Validation; dashboards regulatórios semanais; redesign jornadas.', en: 'Multi-country projects; FATCA processes; global squads for Data Validation; weekly regulatory dashboards; journey redesign.' },
        result: { pt: 'Migração sem perdas; 100% FATCA; -20% tempo atendimento; retenção HNWI; +30% portfolio.', en: 'No-loss migration; 100% FATCA; -20% service time; HNWI retention; +30% portfolio.' },
        learning: { pt: 'Governança + automação + gestão multicultural = migração segura.', en: 'Governance + automation + multicultural management enable safe migration.' },
        tags: {
          pt: ['Migração de Dados', 'Compliance', 'FATCA', 'Times Globais', 'Gestão de Riscos'],
          en: ['Data Migration', 'Compliance', 'FATCA', 'Global Teams', 'Risk Management']
        },
        score: 94
      },
      {
        id: 'bradesco-next-launch',
        title: { pt: 'Lançamento do Banco Digital Next', en: 'Launch of Next Digital Bank' },
        situation: { pt: 'Concorrência crescente de bancos digitais; necessidade de modernizar experiência.', en: 'Growing digital bank competition; need to modernize experience.' },
        task: { pt: 'Lançar banco digital com proposta diferenciada e operação eficiente dia 1.', en: 'Launch digital bank with differentiated value prop and day-one efficiency.' },
        action: { pt: 'Escala ágil (comunidade 2k+), exploração ML personalização, jornadas mobile-first, métricas em tempo real.', en: 'Scaled agile (2k+ community), ML personalization exploration, mobile-first journeys, real-time metrics.' },
        result: { pt: 'Lançamento bem-sucedido; -20% tempo atendimento; cultura ágil incorporada.', en: 'Successful launch; -20% service time; embedded agile culture.' },
        learning: { pt: 'Transformação digital = mudança cultural profunda + dados.', en: 'Digital transformation = deep cultural shift + data.' },
        tags: {
          pt: ['Banco Digital', 'Transformação Ágil', 'Experiência do Cliente', 'Competição Fintech', 'Mudança Cultural'],
          en: ['Digital Banking', 'Agile Transformation', 'Customer Experience', 'Fintech Competition', 'Cultural Change']
        },
        score: 88
      }
    ]
  },
  sicredi: {
    id: 'sicredi',
    title: { pt: 'Sicredi', en: 'Sicredi' },
    subtitle: { pt: 'Cooperativismo & Fintech', en: 'Cooperative Banking & Fintech' },
    period: '2018-2020',
    location: { pt: 'Porto Alegre, Brasil', en: 'Porto Alegre, Brazil' },
    role: { pt: 'Head de Produtos Digitais', en: 'Head of Digital Products' },
    sector: { pt: 'Cooperative Banking & Fintech', en: 'Cooperative Banking & Fintech' },
    icon: '🤝',
    color: 'bg-green-600',
    summary: { pt: '1ª instituição financeira cooperativa do Brasil (6.4M+ associados).', en: 'Brazil first cooperative financial institution (6.4M+ members).' },
    overview: {
      pt: 'Maior sistema cooperativo de crédito da América Latina (4+ milhões de associados, $80B+ ativos).',
      en: 'Latin America\'s largest cooperative credit system (4+ million members, $80B+ assets).'
    },
    keyAchievements: {
      pt: [ '15+ produtos digitais', 'Adoção Woop +25% ($50M)', 'ML credit scoring & fraude', 'Board advisor transformação', 'Avaliador Inovar Juntos' ],
      en: [ '15+ digital products', 'Woop adoption +25% ($50M)', 'ML credit scoring & fraud', 'Board advisor transformation', 'Inovar Juntos evaluator' ]
    },
    cases: [
      {
        id: 'sicredi-woop-growth',
        title: { pt: 'Crescimento Exponencial do Woop Digital Bank', en: 'Exponential Growth of Woop Digital Bank' },
        situation: { pt: 'Adoção baixa e necessidade de diferenciação mantendo valores cooperativos.', en: 'Low adoption & need for differentiation while keeping cooperative values.' },
        task: { pt: 'Definir estratégia e ciclo discovery→delivery para aumentar adoção e receita.', en: 'Define strategy and discovery→delivery cycle to raise adoption & revenue.' },
        action: { pt: 'Dual track; 15+ lançamentos; automação com ML; advisor em transformação; participação em programa de inovação.', en: 'Dual track; 15+ launches; ML automation; transformation advisory; innovation program involvement.' },
        result: { pt: '+25% adoção (~$50M); maturidade produto fortalecida.', en: '+25% adoption (~$50M); strengthened product maturity.' },
        learning: { pt: 'Discovery consistente ancora relevância e valores.', en: 'Consistent discovery anchors relevance & values.' },
        tags: {
          pt: ['Estratégia de Produto', 'Banco Digital', 'Implementação de ML', 'Valores Cooperativos', 'Programa de Inovação'],
          en: ['Product Strategy', 'Digital Banking', 'ML Implementation', 'Cooperative Values', 'Innovation Program']
        },
        score: 90
      },
      {
        id: 'sicredi-ml-credit',
        title: { pt: 'Implementação de ML para Credit Scoring', en: 'ML Implementation for Credit Scoring' },
        situation: { pt: 'Análise manual lenta afetava experiência; precisão de fraude precisava subir.', en: 'Manual slow credit analysis hurt experience; fraud precision needed improvement.' },
        task: { pt: 'Implementar ML acelerando análise e elevando precisão.', en: 'Implement ML to accelerate analysis & improve precision.' },
        action: { pt: 'Equipe multidisciplinar; pipeline dados; governança decisões; métricas contínuas; compliance BACEN.', en: 'Multidisciplinary team; data pipeline; decision governance; continuous metrics; BACEN compliance.' },
        result: { pt: 'Tempo reduzido; maior precisão fraude; satisfação maior.', en: 'Reduced processing time; higher fraud precision; higher satisfaction.' },
        learning: { pt: 'IA deve amplificar valores cooperativos.', en: 'AI must amplify cooperative values.' },
        tags: {
          pt: ['Machine Learning', 'Credit Scoring', 'Detecção de Fraude', 'Governança de Dados', 'Compliance Regulatória'],
          en: ['Machine Learning', 'Credit Scoring', 'Fraud Detection', 'Data Governance', 'Regulatory Compliance']
        },
        score: 87
      }
    ]
  },
  unimed: {
    id: 'unimed',
    title: { pt: 'Unimed', en: 'Unimed' },
    subtitle: { pt: 'Healthcare & Inovação Digital', en: 'Healthcare & Digital Innovation' },
    period: '2020-2023',
    location: { pt: 'Porto Alegre, Brasil', en: 'Porto Alegre, Brazil' },
    role: { pt: 'Gerente de Inovação & Produtos Digitais', en: 'Innovation & Digital Products Manager' },
    sector: { pt: 'Healthcare & Digital Innovation', en: 'Healthcare & Digital Innovation' },
    icon: '🏥',
    color: 'bg-teal-600',
    summary: { pt: 'Maior cooperativa de saúde do Sul (695k associados).', en: 'Largest southern Brazil health cooperative (695k members).' },
    overview: {
      pt: 'Maior sistema cooperativo de saúde do mundo (18+ milhões de beneficiários, $20B+ receita).',
      en: 'World largest cooperative healthcare system (18+ million beneficiaries, $20B+ revenue).'
    },
    keyAchievements: {
      pt: [ '4 produtos (5% receita)', 'EBITDA +22%', 'NPS +6% & churn -15%', 'AI triage sinistros -30%', 'Frameworks OKR/KPI' ],
      en: [ '4 products (5% revenue)', 'EBITDA +22%', 'NPS +6% & churn -15%', 'AI claims triage -30%', 'OKR/KPI frameworks' ]
    },
    cases: [
      {
        id: 'unimed-digital-products',
        title: { pt: 'Lançamento de Produtos Digitais Inovadores', en: 'Launch of Innovative Digital Products' },
        situation: { pt: 'Pressão competitiva e necessidade de diversificar receita.', en: 'Competitive pressure and need to diversify revenue.' },
        task: { pt: 'Desenhar e lançar portfólio digital com impacto em receita.', en: 'Design & launch digital portfolio impacting revenue.' },
        action: { pt: 'Frameworks OKR/KPI; AI para triage; 4 produtos centrados no usuário; dashboards executivos.', en: 'OKR/KPI frameworks; AI triage; 4 user-centric products; executive dashboards.' },
        result: { pt: '5% receita (~$16M); EBITDA +22%; NPS +6; churn -15%; -30% tempo processamento.', en: '5% revenue (~$16M); EBITDA +22%; NPS +6; churn -15%; -30% processing time.' },
        learning: { pt: 'Equilíbrio tecnologia + humanização gera impacto sustentável.', en: 'Balancing tech + humanization drives sustainable impact.' },
        tags: {
          pt: ['Produtos Digitais', 'Inovação em Saúde', 'Implementação de IA', 'Framework OKR', 'Crescimento de Receita'],
          en: ['Digital Products', 'Healthcare Innovation', 'AI Implementation', 'OKR Framework', 'Revenue Growth']
        },
        score: 96
      },
      {
        id: 'unimed-ai-claims',
        title: { pt: 'Automação de Triage de Sinistros com IA', en: 'AI Automation of Claims Triage' },
        situation: { pt: 'Processo manual lento e custoso; volume crescente.', en: 'Slow, costly manual process; rising volume.' },
        task: { pt: 'Automatizar triage mantendo precisão e compliance.', en: 'Automate triage preserving accuracy & compliance.' },
        action: { pt: 'Assessment maturidade; equipe multidisciplinar; modelos ML; workflows automatizados; governança auditoria.', en: 'Maturity assessment; multidisciplinary team; ML models; automated workflows; audit governance.' },
        result: { pt: '-30% tempo; maior precisão; foco humano em casos complexos; satisfação maior.', en: '-30% processing time; higher accuracy; humans focus on complex; higher satisfaction.' },
        learning: { pt: 'IA complementa, não substitui totalmente expertise clínica.', en: 'AI complements, not fully replaces clinical expertise.' },
        tags: {
          pt: ['Inteligência Artificial', 'Processamento de Sinistros', 'Automação de Processos', 'Operações de Saúde', 'Compliance'],
          en: ['Artificial Intelligence', 'Claims Processing', 'Process Automation', 'Healthcare Operations', 'Compliance']
        },
        score: 93
      }
    ]
  },
  sefaz: {
    id: 'sefaz',
    title: { pt: 'SEFAZ-RS', en: 'SEFAZ-RS' },
    subtitle: { pt: 'Governo & Transformação Digital', en: 'Government & Digital Transformation' },
    period: '2023-Present',
    location: { pt: 'Porto Alegre, Brasil', en: 'Porto Alegre, Brazil' },
    role: { pt: 'Coordenador de Transformação Digital', en: 'Digital Transformation Coordinator' },
    sector: { pt: 'Government & Digital Transformation', en: 'Government & Digital Transformation' },
    icon: '🏛️',
    color: 'bg-purple-600',
    summary: { pt: 'Secretaria da Fazenda responsável pela gestão fiscal do Estado.', en: 'State Treasury responsible for fiscal management.' },
    overview: {
      pt: 'Secretaria da Fazenda do Rio Grande do Sul - Responsável por $40B+ em arrecadação anual.',
      en: 'Rio Grande do Sul State Treasury - Responsible for $40B+ in annual tax collection.'
    },
    keyAchievements: {
      pt: [ 'PMO Profisco II (IDB)', 'Value-based management & OKRs', 'Portal PMO executivo', 'AI-readiness fiscal', '$1.4M eficiência' ],
      en: [ 'Profisco II PMO (IDB)', 'Value-based management & OKRs', 'Executive PMO portal', 'Fiscal AI-readiness', '$1.4M efficiency' ]
    },
    cases: [
      {
        id: 'sefaz-profisco-pmo',
        title: { pt: 'Estruturação do PMO para Programa Profisco II', en: 'PMO Setup for Profisco II Program' },
        situation: { pt: 'Programa de modernização fiscal com financiamento internacional requer governança robusta.', en: 'Fiscal modernization program with international funding required robust governance.' },
        task: { pt: 'Liderar PMO implementando gestão baseada em valor & OKRs.', en: 'Lead PMO implementing value-based management & OKRs.' },
        action: { pt: 'Frameworks VB/OKR; portal executivo; dashboards tempo real; assessment AI-readiness; mentoria portfólio.', en: 'VB/OKR frameworks; executive portal; real-time dashboards; AI-readiness assessment; portfolio mentoring.' },
        result: { pt: 'Modernização + ~$1.4M eficiência via padronização e redução de overruns.', en: 'Modernization + ~$1.4M efficiency via standardization & overrun reduction.' },
        learning: { pt: 'Transparência e governança habilitam impacto em projetos públicos.', en: 'Transparency & governance enable impact in public programs.' },
        tags: {
          pt: ['Setor Público', 'Implementação PMO', 'Gestão Baseada em Valor', 'Modernização Governamental', 'Parceria Internacional'],
          en: ['Public Sector', 'PMO Implementation', 'Value-Based Management', 'Government Modernization', 'International Partnership']
        },
        score: 91
      },
      {
        id: 'sefaz-ai-readiness',
        title: { pt: 'AI-Readiness Assessment para Operações Fiscais', en: 'AI-Readiness Assessment for Fiscal Operations' },
        situation: { pt: 'Necessidade de avaliar maturidade e oportunidades de IA em operações fiscais.', en: 'Need to assess maturity and AI opportunities in fiscal operations.' },
        task: { pt: 'Mapear processos candidatos e produzir roadmap de implementação responsável.', en: 'Map candidate processes and produce responsible implementation roadmap.' },
        action: { pt: 'Diagnóstico maturidade dados/IA; mapeamento processos; oportunidades modelos preditivos; governança ética.', en: 'Data/AI maturity diagnosis; process mapping; predictive model opportunities; ethical governance.' },
        result: { pt: 'Roadmap estruturado; identificação de alto impacto; prontidão organizacional.', en: 'Structured roadmap; high-impact identification; organizational readiness.' },
        learning: { pt: 'Setor público exige foco em ética e accountability na IA.', en: 'Public sector demands focus on ethics & accountability for AI.' },
        tags: {
          pt: ['Estratégia de IA', 'Administração Pública', 'Operações Fiscais', 'Analytics Preditivo', 'Governo Digital'],
          en: ['AI Strategy', 'Public Administration', 'Fiscal Operations', 'Predictive Analytics', 'Digital Government']
        },
        score: 89
      }
    ]
  }
};

export const experiencesList = Object.values(experiencesData);
