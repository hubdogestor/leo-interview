// Experiências Profissionais do Leonardo Menezes
// Baseado no Playbook e CV

export const experiences = {
  huawei: {
    id: 'huawei',
    title: 'Huawei',
    subtitle: 'Telecom & Infrastructure',
    period: '2009-2015',
    location: 'América Latina',
    role: 'Gerente de Programas & PMO',
    icon: '🏢',
    color: 'bg-red-500',
    summary: 'Líder global em TIC (170+ países; $90B+ receita). Responsável por programas turnkey para grandes operadoras.',
    keyAchievements: [
      'Redução SLA de 382 → 62 dias (~$120M economia)',
      'War Room PMO (30+ PMs, 20 fornecedores)',
      'Primeira estação 4G do Brasil (2012)',
      'Telecom Copa do Mundo FIFA 2014',
      'Global Excellent PM (2012-2014)'
    ],
    cases: [
      {
        id: 'huawei-sla-reduction',
        title: 'Redução Drástica de SLA em Rollout de Telecom',
        situation: 'A Huawei assumia contratos full-turnkey com grandes operadoras (Vivo, Claro, Oi, TIM), entregando infraestrutura completa de telecom. O ciclo médio de entrega era de 382 dias, comprometendo contratos, receita e imagem junto a ANATEL e FIFA (Copa 2014).',
        task: 'Como Gerente de PMO, precisava redesenhar processos de rollout e reduzir drasticamente o tempo de entrega, mantendo qualidade e compliance regulatório.',
        action: 'Estruturei a War Room do PMO como centro de comando com dashboards em tempo real. Redesenhei processos usando Critical Path Method (CPM) e Earned Value Management (EVM). Participei hands-on em negociações com prefeituras e ANATEL para acelerar licenciamento. Padronizei dashboards executivos em Primavera/MS Project Server. Conduzi reuniões semanais de Root Cause Analysis usando Ishikawa e 5 Whys. Criei o Vendor Performance Index (VPI) para ranquear fornecedores mensalmente.',
        result: 'Redução do SLA médio de 382 → 62 dias (ganho de ~320 dias por site). Eficiência financeira de ~$120M, com modelo replicado globalmente pela Huawei. Entreguei a primeira estação 4G do Brasil (2012) antes do prazo. Responsável pelo programa de telecom da Copa 2014 com 100% operacional nos 12 estádios.',
        learning: 'Eficiência não vem só de planejar melhor, mas de entrar no detalhe técnico e operacional. Governança, tecnologia e execução no detalhe são indissociáveis.',
        tags: ['PMO', 'Process Optimization', 'Vendor Management', 'Critical Path', 'Root Cause Analysis'],
        score: 95
      },
      {
        id: 'huawei-4g-pioneer',
        title: 'Lançamento Pioneiro do 4G no Brasil',
        situation: 'Brasil estava atrasado na implementação de 4G comparado a outros países. Havia pressão regulatória da ANATEL e compromissos com a Copa do Mundo 2014. Competição acirrada com Ericsson e Nokia.',
        task: 'Liderar o projeto de implementação da primeira estação 4G comercial do Brasil, garantindo vantagem competitiva para a Huawei e cumprindo prazos regulatórios.',
        action: 'Coordenei equipes multidisciplinares (RF, civil, TI, regulatório). Estabeleci fast-track scheduling para componentes críticos. Negociei diretamente com operadoras para priorizar sites estratégicos. Implementei controle rigoroso de qualidade e testes de performance. Gerenciei stakeholders regulatórios (ANATEL) e técnicos.',
        result: 'Entrega da primeira estação 4G comercial do Brasil em 2012, antes do prazo estabelecido. Posicionou a Huawei como líder tecnológico no mercado brasileiro. Garantiu contratos subsequentes para rollout nacional do 4G.',
        learning: 'Inovação tecnológica requer coordenação perfeita entre aspectos técnicos, regulatórios e comerciais. Ser pioneiro traz vantagens competitivas duradouras.',
        tags: ['Innovation', 'Technology Leadership', 'Regulatory Compliance', 'Fast-Track', 'Market Leadership'],
        score: 92
      }
    ]
  },
  
  hsbc_bradesco: {
    id: 'hsbc_bradesco',
    title: 'HSBC & Bradesco',
    subtitle: 'Banking & Digital Transformation',
    period: '2015-2018',
    location: 'Global',
    role: 'PMO Manager & Agile Leader',
    icon: '🏦',
    color: 'bg-blue-600',
    summary: 'Um dos maiores bancos do mundo (60+ países, $2.9T ativos) / Maior banco privado do Brasil ($1.7T ativos; 36M+ clientes).',
    keyAchievements: [
      'Migração HSBC → Bradesco ($3B sem perda de dados)',
      'Compliance FATCA e retenção de clientes',
      'Lançamento Banco Digital Next',
      'Redução 20% tempo de atendimento',
      'Aumento 30% portfolio private banking'
    ],
    cases: [
      {
        id: 'hsbc-bradesco-migration',
        title: 'Migração Complexa HSBC para Bradesco',
        situation: 'O HSBC estava em processo de saída do Brasil (venda para Bradesco, valor de ~US$ 5,2Bi). Desafio crítico: migrar milhões de contas, cartões e operações de private banking sem perdas de dados, falhas regulatórias ou impacto negativo na base de clientes. Reguladores (BACEN, CVM, FATCA/IRS) exigiam compliance absoluto.',
        task: 'Como PMO Manager do portfólio RBWM (Retail Banking & Wealth Management) LATAM, supervisionar a migração de R$ 3Bi em ativos garantindo zero perda de dados e compliance total.',
        action: 'Supervisionei projetos de migração em Brasil, México e Argentina. Atuei hands-on na implantação de processos FATCA, revisando políticas de due diligence, KYC e PLD. Estruturei squads com times globais (Índia, China, Polônia, Malásia) para Data Validation e Data Cleansing. Automatizei monitoramento regulatório com dashboards apresentados semanalmente ao C-Level e BACEN. Redesenhei fluxos de atendimento em agências e canais digitais.',
        result: 'Migração de R$ 3Bi em ativos com zero perda de dados. Compliance FATCA 100% aprovado pelos reguladores. Redução de 20% no tempo de atendimento. Retenção da base de clientes HNWI. Aumento de 30% no portfolio de private banking.',
        learning: 'Migrações complexas exigem governança rigorosa, automação de controles e gestão multicultural eficaz. Compliance não é opcional em operações financeiras globais.',
        tags: ['Data Migration', 'Compliance', 'FATCA', 'Global Teams', 'Risk Management'],
        score: 94
      },
      {
        id: 'bradesco-next-launch',
        title: 'Lançamento do Banco Digital Next',
        situation: 'Bradesco precisava competir no segmento de bancos digitais emergente no Brasil. Concorrência com Nubank, Inter e outros players digitais. Necessidade de modernizar experiência do cliente e reduzir custos operacionais.',
        task: 'Liderar o lançamento do Banco Digital Next, criando uma proposta de valor diferenciada e garantindo operação eficiente desde o primeiro dia.',
        action: 'Co-fundei a Comunidade Ágil @ InovaBra, escalando metodologias ágeis para 2k+ profissionais. Colaborei com equipe de data science para explorar modelos de ML para ofertas personalizadas. Redesenhei jornadas do cliente focando em experiência mobile-first. Implementei métricas de performance em tempo real.',
        result: 'Lançamento bem-sucedido do Next com redução de 20% no tempo de atendimento. Incorporação de cultura ágil em um banco tradicional de grande porte. Posicionamento competitivo no mercado de bancos digitais.',
        learning: 'Transformação digital em instituições tradicionais requer mudança cultural profunda, não apenas tecnológica. Agilidade e dados são fundamentais para competir com fintechs.',
        tags: ['Digital Banking', 'Agile Transformation', 'Customer Experience', 'Fintech Competition', 'Cultural Change'],
        score: 88
      }
    ]
  },

  sicredi: {
    id: 'sicredi',
    title: 'Sicredi',
    subtitle: 'Cooperative Banking & Fintech',
    period: '2018-2021',
    location: 'Brasil',
    role: 'Product Strategist',
    icon: '🤝',
    color: 'bg-green-600',
    summary: 'Primeira instituição financeira cooperativa do Brasil (6.4M+ associados, $263B ativos).',
    keyAchievements: [
      '15+ produtos digitais lançados',
      'Aumento 25% adoção Woop App ($50M receita)',
      'ML para credit scoring e fraud detection',
      'Board advisor em transformação',
      'Avaliador Programa Inovar Juntos (PUC)'
    ],
    cases: [
      {
        id: 'sicredi-woop-growth',
        title: 'Crescimento Exponencial do Woop Digital Bank',
        situation: 'Sicredi precisava competir no segmento digital mantendo os valores cooperativistas. O app Woop tinha baixa adoção e precisava de diferenciação no mercado fintech saturado.',
        task: 'Como Product Strategist, definir estratégia de produto e gestão do ciclo de vida completo (discovery → delivery) para aumentar adoção e receita do Woop.',
        action: 'Defini estratégia de produto baseada em dual track (discovery → delivery). Lancei 15+ produtos digitais focados na experiência cooperativista. Liderei iniciativas de automação de processos usando ML para credit scoring e fraud detection. Contribuí como board advisor em planejamento de transformação. Atuei como avaliador no Programa de Inovação Inovar Juntos (PUC).',
        result: 'Aumento de 25% na adoção do Woop Digital Bank App (~$50M em receita). Melhoria significativa em métricas operacionais através de ML. Fortalecimento da maturidade em gestão de produtos no Sicredi.',
        learning: 'Cooperativismo e inovação digital podem coexistir quando a tecnologia serve aos valores da organização. Product discovery é fundamental para criar produtos relevantes.',
        tags: ['Product Strategy', 'Digital Banking', 'ML Implementation', 'Cooperative Values', 'Innovation Program'],
        score: 90
      },
      {
        id: 'sicredi-ml-credit',
        title: 'Implementação de ML para Credit Scoring',
        situation: 'Processos de análise de crédito manuais e lentos impactavam a experiência do associado e a competitividade do Sicredi. Necessidade de modernizar decisões de crédito mantendo a filosofia cooperativista.',
        task: 'Liderar a implementação de soluções de Machine Learning para acelerar e melhorar a precisão do credit scoring e detecção de fraudes.',
        action: 'Estruturei equipe multidisciplinar (data science, risco, produto). Implementei pipeline de dados para alimentar modelos de ML. Desenvolvi framework de governança para decisões automatizadas. Criei métricas de performance e monitoramento contínuo. Garantiu compliance com regulamentações do BACEN.',
        result: 'Redução significativa no tempo de análise de crédito. Melhoria na precisão de detecção de fraudes. Aumento na satisfação dos associados com processos mais ágeis. Manutenção dos princípios cooperativistas nas decisões automatizadas.',
        learning: 'IA pode humanizar processos financeiros quando implementada com governança adequada. Tecnologia deve amplificar valores organizacionais, não substituí-los.',
        tags: ['Machine Learning', 'Credit Scoring', 'Fraud Detection', 'Data Governance', 'Regulatory Compliance'],
        score: 87
      }
    ]
  },

  unimed: {
    id: 'unimed',
    title: 'Unimed',
    subtitle: 'Healthcare & Strategy',
    period: '2021-2024',
    location: 'Porto Alegre, Brasil',
    role: 'Strategy Advisor / Group Product Manager',
    icon: '🏥',
    color: 'bg-teal-600',
    summary: 'Maior cooperativa de saúde do Sul do Brasil (695k associados; $3.2B receita).',
    keyAchievements: [
      '4 novos produtos digitais (5% receita = $16M)',
      'EBITDA +22% ($70.4M impacto)',
      'NPS +6%, churn -15% ($45M economia)',
      'AI para claims triage (-30% tempo)',
      'Frameworks OKR & KPI corporativos'
    ],
    cases: [
      {
        id: 'unimed-digital-products',
        title: 'Lançamento de Produtos Digitais Inovadores',
        situation: 'Unimed enfrentava pressão competitiva no setor de saúde suplementar. Necessidade de diversificar receita e melhorar experiência do beneficiário através de soluções digitais.',
        task: 'Como Group Product Manager reportando ao CEO/Board, projetar e implementar novos produtos digitais que representassem impacto significativo na receita.',
        action: 'Desenhei e implementei frameworks corporativos de OKR & KPI. Liderei iniciativa de AI para automatizar triage de sinistros e onboarding de beneficiários. Lancei 4 novos produtos digitais com foco em experiência do usuário. Implementei métricas de performance e dashboards executivos.',
        result: 'Lançamento de 4 produtos digitais, um representando 5% da receita total (~$16M). Aumento do EBITDA em 22% (~$70.4M impacto). Melhoria do NPS em 6% e redução do churn do app em 15% (~$45M economia). Redução de 30% no tempo de processamento através de AI.',
        learning: 'Inovação em healthcare requer equilibrio entre tecnologia e humanização. Produtos digitais podem gerar impacto financeiro significativo quando alinhados à estratégia corporativa.',
        tags: ['Digital Products', 'Healthcare Innovation', 'AI Implementation', 'OKR Framework', 'Revenue Growth'],
        score: 96
      },
      {
        id: 'unimed-ai-claims',
        title: 'Automação de Triage de Sinistros com IA',
        situation: 'Processamento manual de sinistros era lento e custoso, impactando satisfação dos beneficiários e eficiência operacional. Volume crescente de sinistros exigia solução escalável.',
        task: 'Liderar implementação de solução de IA para automatizar triage de sinistros e onboarding de beneficiários, melhorando velocidade e precisão das decisões.',
        action: 'Conduzi assessment de AI-readiness da organização. Estruturei equipe multidisciplinar (AI, produto, operações, compliance). Implementei modelos de ML para classificação automática de sinistros. Criei workflows automatizados para casos de baixa complexidade. Estabeleci governança para auditoria e compliance.',
        result: 'Redução de 30% no tempo de processamento de sinistros. Melhoria na precisão de classificação. Liberação de recursos humanos para casos complexos. Aumento na satisfação dos beneficiários com processos mais ágeis.',
        learning: 'IA em healthcare exige governança rigorosa e transparência. Automação deve complementar expertise humana, não substituí-la completamente.',
        tags: ['Artificial Intelligence', 'Claims Processing', 'Process Automation', 'Healthcare Operations', 'Compliance'],
        score: 93
      }
    ]
  },

  sefaz: {
    id: 'sefaz',
    title: 'SEFAZ-RS',
    subtitle: 'Government & Public Sector',
    period: '2024-Present',
    location: 'RS, Brasil',
    role: 'Advisor (CAGE / Executive Office)',
    icon: '🏛️',
    color: 'bg-purple-600',
    summary: 'Secretaria da Fazenda do RS, responsável pela gestão fiscal e administração tributária do Estado.',
    keyAchievements: [
      'PMO Programa Profisco II (parceria IDB)',
      'Frameworks value-based management e OKRs',
      'Portal PMO executivo com dashboards',
      'AI-readiness assessment para operações fiscais',
      '$1.4M em ganhos de eficiência'
    ],
    cases: [
      {
        id: 'sefaz-profisco-pmo',
        title: 'Estruturação do PMO para Programa Profisco II',
        situation: 'SEFAZ-RS iniciou parceria com Banco Interamericano de Desenvolvimento (BID) para o Programa Profisco II, modernizando gestão fiscal. Necessidade de estruturar governança robusta para programa de grande escala.',
        task: 'Como Advisor do CAGE, liderar o PMO do Programa Profisco II, implementando frameworks de gestão baseada em valor e OKRs.',
        action: 'Desenhei e implementei frameworks de value-based management e OKRs para o governo estadual. Desenvolvi e lancei Portal PMO executivo com dashboards em tempo real e base de conhecimento. Iniciei assessment de AI-readiness para explorar modelos de ML em forecasting e indicadores preditivos de risco fiscal. Mentorei equipes governamentais em gestão de portfólio.',
        result: 'Modernização da gestão fiscal e fortalecimento de práticas de governança em nível estadual. Padronização de práticas resultando em ~$1.4M em ganhos de eficiência através de otimização de processos e redução de overruns em projetos.',
        learning: 'Setor público pode adotar práticas de gestão modernas mantendo transparência e accountability. Governança robusta é fundamental para programas com financiamento internacional.',
        tags: ['Public Sector', 'PMO Implementation', 'Value-Based Management', 'Government Modernization', 'International Partnership'],
        score: 91
      },
      {
        id: 'sefaz-ai-readiness',
        title: 'AI-Readiness Assessment para Operações Fiscais',
        situation: 'SEFAZ-RS buscava modernizar operações fiscais explorando potencial de IA e ML. Necessidade de avaliar maturidade organizacional e identificar oportunidades de automação.',
        task: 'Conduzir assessment abrangente de AI-readiness e desenvolver roadmap para implementação de soluções de ML em forecasting fiscal e indicadores preditivos de risco.',
        action: 'Conduzi diagnóstico de maturidade em dados e IA. Mapeei processos fiscais candidatos à automação. Identifiquei oportunidades para modelos preditivos de risco fiscal. Desenvolvi roadmap de implementação considerando aspectos regulatórios e éticos. Estruturei governança para projetos de IA no setor público.',
        result: 'Roadmap estruturado para implementação de IA em operações fiscais. Identificação de oportunidades de alto impacto para automação. Preparação da organização para adoção responsável de tecnologias emergentes.',
        learning: 'IA no setor público requer cuidado especial com transparência, ética e accountability. Preparação organizacional é tão importante quanto a tecnologia em si.',
        tags: ['AI Strategy', 'Public Administration', 'Fiscal Operations', 'Predictive Analytics', 'Digital Government'],
        score: 89
      }
    ]
  }
};

export const experiencesList = Object.values(experiences);
