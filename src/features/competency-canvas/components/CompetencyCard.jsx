import React from 'react';
import clsx from 'clsx';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CanvasSection } from './CanvasSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { experiencesData } from '@/data/experiences.js';

const experienceLabels = Object.fromEntries(
  Object.entries(experiencesData).map(([id, value]) => [id, value.title])
);

const normalizeList = (list, language) => {
  if (!list) {
    return [];
  }
  const raw = Array.isArray(list?.[language]) ? list[language] : [];
  return raw.map((item) => item.trim()).filter(Boolean);
};

const mergeUnique = (lists) => {
  const seen = new Set();
  const output = [];
  lists.flat().forEach((item) => {
    const key = item.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      output.push(item);
    }
  });
  return output;
};

function SignatureCases({ cases = [], language }) {
  if (!cases.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
        Signature Cases
      </h4>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        {cases.map((caseItem) => {
          const title = caseItem.title?.[language] ?? caseItem.title?.pt ?? '';
          const summary = caseItem.summary?.[language] ?? caseItem.summary?.pt ?? '';
          const impact = caseItem.impact?.[language] ?? caseItem.impact?.pt ?? '';
          return (
            <article
              key={caseItem.id}
              className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm text-white/90"
            >
              <h5 className="text-white font-semibold text-sm">{title}</h5>
              <p className="mt-2 text-xs leading-relaxed text-white/70">{summary}</p>
              <p className="mt-3 text-xs font-medium text-emerald-300/90">{impact}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CompetencyCard({ competency, isActive, onSelect }) {
  const { language } = useLanguage();

  const keyStrengths = normalizeList(competency.keyStrengths, language);
  const tools = normalizeList(competency.tools, language);
  const technologies = normalizeList(competency.technologies, language);
  const certifications = normalizeList(competency.certifications, language);
  const achievements = normalizeList(competency.achievements, language);
  const playbookHighlights = normalizeList(competency.playbookHighlights, language);
  const impactMetrics = normalizeList(competency.impactMetrics, language);
  const pitchBullets = normalizeList(competency.pitchDeck?.bullets, language);

  const combinedTools = mergeUnique([tools, technologies]);

  const experienceBadges = (competency.relevantExperiences ?? [])
    .map((id) => {
      const title = experienceLabels[id]?.[language] ?? experienceLabels[id]?.pt;
      return title || id;
    })
    .filter(Boolean);

  const title = competency.title?.[language] ?? competency.title?.pt ?? '';
  const subtitle = competency.subtitle?.[language] ?? competency.subtitle?.pt ?? '';
  const experienceApplied = competency.experienceApplied?.[language] ?? competency.experienceApplied?.pt ?? '';
  const pitchNarrative = competency.pitchDeck?.narrative?.[language] ?? competency.pitchDeck?.narrative?.pt ?? '';

  return (
    <button
      type="button"
      onClick={() => onSelect(competency.id)}
      className={clsx(
        'text-left transition-transform duration-200',
        isActive ? 'scale-[1.01]' : 'scale-[0.99] hover:scale-[1.01]'
      )}
    >
      <Card
        className={clsx(
          'relative overflow-hidden border border-white/5 bg-slate-900/60 p-6 backdrop-blur',
          isActive && 'border-emerald-400/60 shadow-[0_0_35px_-10px_rgb(16,185,129)]'
        )}
      >
        <div className="flex flex-col gap-6">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-inner shadow-black/30',
                  competency.color ?? 'bg-blue-600'
                )}
              >
                <span className="drop-shadow-sm">{competency.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-sm text-white/70">{subtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {experienceBadges.map((badge) => (
                <Badge key={badge} variant="secondary" className="bg-white/10 text-white">
                  {badge}
                </Badge>
              ))}
            </div>
          </header>

          <div className="grid gap-4 md:grid-cols-12">
            <CanvasSection
              title={language === 'pt' ? 'Habilidades Principais' : 'Key Strengths'}
              items={keyStrengths}
              className="md:col-span-4"
            />
            <CanvasSection
              title={language === 'pt' ? 'Ferramentas & Tecnologias' : 'Tools & Technologies'}
              items={combinedTools}
              className="md:col-span-4"
            />
            <CanvasSection
              title={language === 'pt' ? 'Certificações' : 'Certifications'}
              items={certifications}
              className="md:col-span-4"
            />

            <section className="md:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Pitch Deck
                </h4>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-emerald-300/80">
                  Spotlight
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/90">{pitchNarrative}</p>
              <ul className="mt-4 space-y-2 text-sm text-emerald-200/90">
                {pitchBullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <CanvasSection
              title={language === 'pt' ? 'Playbook em Ação' : 'Playbook in Action'}
              items={playbookHighlights}
              className="md:col-span-5"
              tone="muted"
            />

            <CanvasSection
              title={language === 'pt' ? 'Impacto & Métricas' : 'Impact & Metrics'}
              items={impactMetrics.length ? impactMetrics : achievements}
              className="md:col-span-6"
              tone="accent"
            />

            <CanvasSection
              title={language === 'pt' ? 'Experiência Aplicada' : 'Experience Applied'}
              items={[experienceApplied]}
              className="md:col-span-6"
              tone="muted"
            />

            <SignatureCases cases={competency.signatureCases} language={language} />
          </div>
        </div>
      </Card>
    </button>
  );
}
