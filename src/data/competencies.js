/* @ts-check */

import { competenciesData as legacyCompetenciesData } from "./competencies.legacy.js";
import { profilesData as legacyProfilesData } from "./profiles.legacy.js";
import { experiencesData } from "./experiences.js";

/**
 * @typedef {{pt: string[], en: string[]}} BilingualList
 */

const createList = () => ({ pt: [], en: [] });

const normalizeList = (list) => ({
  pt: Array.isArray(list?.pt) ? [...list.pt] : [],
  en: Array.isArray(list?.en) ? [...list.en] : []
});

const dedupe = (items) => {
  const seen = new Set();
  return items
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => {
      if (!item) return false;
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const mergeLists = (primary, secondary) => {
  const a = normalizeList(primary);
  const b = normalizeList(secondary);
  return {
    pt: dedupe([...a.pt, ...b.pt]),
    en: dedupe([...a.en, ...b.en])
  };
};

const caseIndex = Object.values(experiencesData).reduce((acc, experience) => {
  (experience.cases ?? []).forEach((caseItem) => {
    acc[caseItem.id] = caseItem;
  });
  return acc;
}, {});

const buildSignatureCases = (caseIds = []) =>
  caseIds
    .map((caseId) => {
      const caseData = caseIndex[caseId];
      if (!caseData) return null;
      return {
        id: caseData.id,
        title: caseData.title,
        summary: caseData.action ?? caseData.task ?? caseData.situation,
        impact: caseData.result,
        tags: caseData.tags
      };
    })
    .filter(Boolean);

const augmentations = {
  product_manager: {
    pitchDeck: {
      title: { pt: "Pitch Deck", en: "Pitch Deck" },
      narrative: {
        pt: "Product manager com 15+ anos transformando ideias em produtos digitais que somam US$200M+ em receita. Conecto insight de cliente, dados e execução ágil para escalar portfólios.",
        en: "Product leader with 15+ years turning ideas into digital products generating US$200M+. I connect customer insight, data, and agile execution to scale portfolios."
      },
      bullets: {
        pt: [
          "North Star e guardrails financeiros para priorizar roadmap.",
          "Discovery 360° com entrevistas, analytics e experimentação contínua.",
          "Growth loops com IA generativa para personalização e retenção."
        ],
        en: [
          "North Star and financial guardrails to prioritise the roadmap.",
          "360° discovery with interviews, analytics, and continuous experimentation.",
          "Growth loops with generative AI for personalised engagement and retention."
        ]
      }
    },
    frameworks: {
      pt: [
        "Dual-Track Agile + Discovery Contínuo",
        "North Star Metrics & Value-Based Management",
        "Jobs To Be Done + Growth Loops"
      ],
      en: [
        "Dual-Track Agile + Continuous Discovery",
        "North Star Metrics & Value-Based Management",
        "Jobs To Be Done + Growth Loops"
      ]
    },
    playbookHighlights: {
      pt: [
        "Unimed: squads orientados a valor conectados a OKRs corporativos.",
        "Sicredi: Woop App com loops de aquisição→engajamento→receita.",
        "Next Bank: go-to-market mobile-first em 12 meses após a migração."
      ],
      en: [
        "Unimed: value-driven squads connected to corporate OKRs.",
        "Sicredi: Woop App with acquisition→engagement→revenue loops.",
        "Next Bank: mobile-first go-to-market in 12 months post-migration."
      ]
    },
    impactMetrics: {
      pt: [
        "20+ produtos lançados gerando US$200M+.",
        "Unimed: EBITDA +22% (~US$70M), NPS +6, churn -15%.",
        "Woop Digital Bank: adoção +25% (~US$50M) com motor de ML."
      ],
      en: [
        "20+ products launched generating US$200M+.",
        "Unimed: EBITDA +22% (~US$70M), NPS +6, churn -15%.",
        "Woop Digital Bank: +25% adoption (~US$50M) backed by ML engine."
      ]
    },
    signatureCases: ["unimed-digital-products", "sicredi-woop-growth", "bradesco-next-launch"]
  },
  program_manager: {
    pitchDeck: {
      title: { pt: "Pitch Deck", en: "Pitch Deck" },
      narrative: {
        pt: "Program manager que entrega programas de US$300M+ e migrações críticas com governança replicável. Estruturo PMOs que conectam estratégia, compliance e execução.",
        en: "Program manager delivering US$300M+ programmes and critical migrations with repeatable governance. I build PMOs that connect strategy, compliance, and execution."
      },
      bullets: {
        pt: [
          "War rooms com dashboards em tempo real e VPI.",
          "EVM + rituais executivos para decisões baseadas em valor.",
          "Runbooks de migração e cutover 24/7 com fornecedores orquestrados."
        ],
        en: [
          "War rooms with real-time dashboards and VPI.",
          "EVM + executive rituals for value-based decisions.",
          "24/7 migration and cutover runbooks with orchestrated vendors."
        ]
      }
    },
    frameworks: {
      pt: [
        "PMI integrado a SAFe e Lean Portfolio",
        "Critical Path Method com cenários what-if",
        "Risk Heatmaps + Vendor Performance Index"
      ],
      en: [
        "PMI combined with SAFe and Lean Portfolio",
        "Critical Path Method with what-if scenarios",
        "Risk Heatmaps + Vendor Performance Index"
      ]
    },
    playbookHighlights: {
      pt: [
        "Huawei: War Room e governança replicados globalmente.",
        "HSBC→Bradesco: cutover bancário com zero incidentes.",
        "SEFAZ: Value Management Office com portal executivo."
      ],
      en: [
        "Huawei: War Room and governance replicated globally.",
        "HSBC→Bradesco: banking cutover with zero incidents.",
        "SEFAZ: Value Management Office with executive portal."
      ]
    },
    impactMetrics: {
      pt: [
        "Huawei: SLA 382→62 dias (~US$120M em eficiência).",
        "HSBC→Bradesco: US$3B e 3M contas migradas com compliance 100%.",
        "SEFAZ: padronização com US$1.4M em savings e 50+ projetos governados."
      ],
      en: [
        "Huawei: SLA 382→62 days (~US$120M efficiency).",
        "HSBC→Bradesco: US$3B and 3M accounts migrated with 100% compliance.",
        "SEFAZ: standardisation delivering US$1.4M savings and 50+ projects governed."
      ]
    },
    signatureCases: ["huawei-sla-reduction", "hsbc-bradesco-migration", "sefaz-profisco-pmo"]
  },
  digital_transformation: {
    pitchDeck: {
      title: { pt: "Pitch Deck", en: "Pitch Deck" },
      narrative: {
        pt: "Líder de transformação digital que conecta estratégia, tecnologia e cultura para gerar novas receitas e eficiência.",
        en: "Digital transformation leader connecting strategy, technology, and culture to unlock new revenue and efficiency."
      },
      bullets: {
        pt: [
          "OKRs corporativos ligados a dashboards executivos.",
          "Automação com IA e low-code reduzindo custos e tempo de ciclo.",
          "Change management com storytelling e capacitação contínua."
        ],
        en: [
          "Corporate OKRs linked to executive dashboards.",
          "AI and low-code automation reducing cost and cycle time.",
          "Change management with storytelling and continuous enablement."
        ]
      }
    },
    frameworks: {
      pt: [
        "OKR + Value-Based Management",
        "Digital Maturity Blueprint",
        "Service Design & Journey Mapping"
      ],
      en: [
        "OKR + Value-Based Management",
        "Digital Maturity Blueprint",
        "Service Design & Journey Mapping"
      ]
    },
    playbookHighlights: {
      pt: [
        "Unimed: Digital Care Hub com IA e squads orientados a valor.",
        "Sicredi: plataforma Woop e omnicanalidade cooperativa.",
        "SEFAZ: Profisco II com portal executivo e automação fiscal."
      ],
      en: [
        "Unimed: AI-powered Digital Care Hub with value squads.",
        "Sicredi: Woop platform and cooperative omnichannel.",
        "SEFAZ: Profisco II with executive portal and fiscal automation."
      ]
    },
    impactMetrics: {
      pt: [
        "Unimed: EBITDA +22%, churn -15%, IA triage -30%.",
        "Sicredi: adoção +25% e 15+ releases digitais.",
        "SEFAZ: arrecadação +12% e custos -15%."
      ],
      en: [
        "Unimed: EBITDA +22%, churn -15%, AI triage -30%.",
        "Sicredi: +25% adoption and 15+ digital releases.",
        "SEFAZ: +12% revenue and -15% cost."
      ]
    },
    technologies: {
      pt: [
        "APIs & microservices",
        "Plataformas de IA e automação",
        "Data lakes e analytics em cloud"
      ],
      en: [
        "APIs & microservices",
        "AI and automation platforms",
        "Cloud data lakes and analytics"
      ]
    },
    signatureCases: ["unimed-digital-products", "sicredi-woop-growth", "sefaz-profisco-pmo"]
  },
  ai_data_analytics: {
    pitchDeck: {
      title: { pt: "Pitch Deck", en: "Pitch Deck" },
      narrative: {
        pt: "Especialista em IA/ML aplicada com ROI mensurável do discovery ao MLOps.",
        en: "Applied AI/ML leader delivering measurable ROI from discovery to MLOps."
      },
      bullets: {
        pt: [
          "Discovery→MVP→Escala guiado por KPIs de negócio.",
          "Responsible AI com governança de dados e MLOps.",
          "Automação inteligente (agentes, RPA, copilots) integrada a operações."
        ],
        en: [
          "Discovery→MVP→Scale guided by business KPIs.",
          "Responsible AI with data governance and MLOps.",
          "Intelligent automation (agents, RPA, copilots) embedded in operations."
        ]
      }
    },
    frameworks: {
      pt: [
        "CRISP-DM + Value Mapping",
        "DataOps & Feature Store com observabilidade",
        "Responsible AI checkpoints"
      ],
      en: [
        "CRISP-DM + Value Mapping",
        "DataOps & Feature Store with observability",
        "Responsible AI checkpoints"
      ]
    },
    playbookHighlights: {
      pt: [
        "Unimed: AI triage e onboarding digital.",
        "Sicredi: ML para crédito e fraude escalado em produção.",
        "SEFAZ: roteiro de AI-readiness e automação fiscal."
      ],
      en: [
        "Unimed: AI triage and digital onboarding.",
        "Sicredi: ML for credit and fraud scaled to production.",
        "SEFAZ: AI-readiness roadmap and fiscal automation."
      ]
    },
    impactMetrics: {
      pt: [
        "Unimed: tempo de triagem -30% com aumento de assertividade.",
        "Sicredi: aprovação mais rápida e redução de fraude gerando US$50M digitais.",
        "SEFAZ: +12% de arrecadação com automação e analytics."
      ],
      en: [
        "Unimed: triage time -30% with higher accuracy.",
        "Sicredi: faster approvals and lower fraud enabling US$50M digital revenue.",
        "SEFAZ: +12% revenue through automation and analytics."
      ]
    },
    technologies: {
      pt: [
        "Python, TensorFlow e Scikit-learn",
        "Databricks, Spark e dbt",
        "OpenAI API e LangChain",
        "Azure ML · AWS SageMaker"
      ],
      en: [
        "Python, TensorFlow, and Scikit-learn",
        "Databricks, Spark, and dbt",
        "OpenAI API and LangChain",
        "Azure ML · AWS SageMaker"
      ]
    },
    signatureCases: ["unimed-ai-claims", "sicredi-ml-credit", "sefaz-ai-readiness"]
  },
  agile_strategy: {
    pitchDeck: {
      title: { pt: "Pitch Deck", en: "Pitch Deck" },
      narrative: {
        pt: "Líder de transformação ágil que escalou comunidades com 2k+ profissionais e conectou OKRs a métricas de fluxo.",
        en: "Agile transformation leader who scaled communities of 2k+ professionals and linked OKRs to flow metrics."
      },
      bullets: {
        pt: [
          "Comunidades de prática e hubs ágeis corporativos.",
          "OKRs conectados a flow metrics e cadência executiva.",
          "Lean + SAFe garantindo compliance e previsibilidade."
        ],
        en: [
          "Corporate communities of practice and agile hubs.",
          "OKRs connected to flow metrics and executive cadence.",
          "Lean + SAFe ensuring compliance and predictability."
        ]
      }
    },
    frameworks: {
      pt: [
        "Agile Playbook InovaBra",
        "OKR Tree + Flow Metrics",
        "SAFe Release Trains"
      ],
      en: [
        "Agile Playbook InovaBra",
        "OKR Tree + Flow Metrics",
        "SAFe Release Trains"
      ]
    },
    playbookHighlights: {
      pt: [
        "Comunidade Ágil @ InovaBra com guildas e academias.",
        "SAFe em operações críticas HSBC→Bradesco.",
        "Lean pipeline Huawei reduzindo SLA 382→62 dias."
      ],
      en: [
        "Agile Community @ InovaBra with guilds and academies.",
        "SAFe in critical operations HSBC→Bradesco.",
        "Huawei lean pipeline cutting SLA 382→62 days."
      ]
    },
    impactMetrics: {
      pt: [
        "Comunidade ágil com 2k+ profissionais acelerando time-to-market.",
        "SLA 382→62 dias (~80% redução) com Lean + VPI.",
        "Migração HSBC→Bradesco com zero downtime e private banking +30%."
      ],
      en: [
        "Agile community with 2k+ professionals accelerating time-to-market.",
        "SLA 382→62 days (~80% reduction) via Lean + VPI.",
        "HSBC→Bradesco migration with zero downtime and private banking +30%."
      ]
    },
    technologies: {
      pt: [
        "Jira · Jira Align",
        "Azure DevOps",
        "Miro · FigJam",
        "Parabol · MetroRetro"
      ],
      en: [
        "Jira · Jira Align",
        "Azure DevOps",
        "Miro · FigJam",
        "Parabol · MetroRetro"
      ]
    },
    signatureCases: ["huawei-sla-reduction", "hsbc-bradesco-migration", "sicredi-woop-growth"]
  },
  innovation_leadership: {
    pitchDeck: {
      title: { pt: "Pitch Deck", en: "Pitch Deck" },
      narrative: {
        pt: "Executive advisor que assessora CEOs/Boards, lidera corporate venture e times globais em saúde, finanças e telecom.",
        en: "Executive advisor supporting CEOs/Boards, leading corporate venture and global teams across healthcare, finance, and telecom."
      },
      bullets: {
        pt: [
          "Storytelling estratégico orientado a métricas de valor.",
          "Corporate venture e parcerias com ecossistemas globais.",
          "Mentoria de startups e desenvolvimento de lideranças."
        ],
        en: [
          "Strategic storytelling anchored in value metrics.",
          "Corporate venture and partnerships with global ecosystems.",
          "Startup mentoring and leadership development."
        ]
      }
    },
    frameworks: {
      pt: [
        "Business Model Canvas & Venture Building",
        "Innovation Accounting & Growth Board",
        "Scenario Planning & Competitive Intelligence"
      ],
      en: [
        "Business Model Canvas & Venture Building",
        "Innovation Accounting & Growth Board",
        "Scenario Planning & Competitive Intelligence"
      ]
    },
    playbookHighlights: {
      pt: [
        "Unimed: advisory para CEO/Board com programas digitais e IA.",
        "InovaBra: corporate venture, comunidade ágil e co-inovação.",
        "Inovar Juntos/PUC: avaliação e mentoria de startups."
      ],
      en: [
        "Unimed: advisory to CEO/Board with digital and AI programmes.",
        "InovaBra: corporate venture, agile community, and co-innovation.",
        "Inovar Juntos/PUC: startup evaluation and mentoring."
      ]
    },
    impactMetrics: {
      pt: [
        "4 novos produtos Unimed (5% da receita) e EBITDA +22%.",
        "Programas transformacionais liberando US$300M+ em valor.",
        "Mentoria e avaliação de 50+ startups no ecossistema LATAM."
      ],
      en: [
        "4 new Unimed products (5% of revenue) and EBITDA +22%.",
        "Transformational programmes releasing US$300M+ in value.",
        "Mentored and evaluated 50+ startups across LATAM ecosystems."
      ]
    },
    technologies: {
      pt: [
        "Strategyzer & Miro",
        "Ferramentas de pitch deck e data room",
        "Dealroom & Crunchbase",
        "Figma & suites colaborativas"
      ],
      en: [
        "Strategyzer & Miro",
        "Pitch deck and data room tooling",
        "Dealroom & Crunchbase",
        "Figma & collaborative suites"
      ]
    },
    signatureCases: ["unimed-digital-products", "sicredi-woop-growth", "huawei-4g-pioneer"]
  }
};

const mergeCompetency = (id, base) => {
  const profile = legacyProfilesData[id];
  const augment = augmentations[id] ?? {};

  const technologies = mergeLists(profile?.technologies, augment.technologies);
  const frameworks = normalizeList(augment.frameworks);
  const playbookHighlights = normalizeList(augment.playbookHighlights);
  const impactMetrics = normalizeList(augment.impactMetrics);
  const pitchDeck = augment.pitchDeck ?? {
    title: { pt: "Pitch Deck", en: "Pitch Deck" },
    narrative: base.elevatorPitch ?? { pt: "", en: "" },
    bullets: createList()
  };

  const signatureCaseIds = augment.signatureCases ?? profile?.topCases ?? [];

  return {
    ...base,
    keyStrengths: mergeLists(base.keyStrengths, profile?.keyStrengths),
    tools: mergeLists(base.tools, augment.tools),
    certifications: mergeLists(base.certifications, augment.certifications),
    achievements: mergeLists(base.achievements, profile?.achievements),
    technologies,
    frameworks,
    playbookHighlights,
    impactMetrics,
    pitchDeck: {
      title: pitchDeck.title,
      narrative: pitchDeck.narrative,
      bullets: normalizeList(pitchDeck.bullets)
    },
    signatureCases: buildSignatureCases(signatureCaseIds),
    relevantExperiences: augment.relevantExperiences ?? base.relevantExperiences ?? []
  };
};

export const competenciesData = Object.fromEntries(
  Object.entries(legacyCompetenciesData).map(([id, competency]) => [
    id,
    mergeCompetency(id, competency)
  ])
);

export const competenciesList = Object.values(competenciesData);


