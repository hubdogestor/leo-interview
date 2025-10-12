import React, { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const gradientMap = {
  'bg-blue-600': 'from-blue-600 via-sky-500 to-blue-400',
  'bg-purple-600': 'from-purple-600 via-indigo-500 to-sky-500',
  'bg-green-600': 'from-emerald-600 via-teal-500 to-green-400',
  'bg-orange-600': 'from-amber-500 via-orange-500 to-rose-500',
  'bg-yellow-600': 'from-yellow-500 via-amber-400 to-orange-400',
  'bg-red-600': 'from-rose-500 via-fuchsia-500 to-violet-500'
};

export function PitchDeckHero({ competency, onSelectPrev, onSelectNext }) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  if (!competency) {
    return null;
  }

  const gradient = gradientMap[competency.color] ?? 'from-slate-800 via-slate-900 to-black';
  const title = competency.title?.[language] ?? competency.title?.pt ?? '';
  const subtitle = competency.subtitle?.[language] ?? competency.subtitle?.pt ?? '';
  const narrative = competency.pitchDeck?.narrative?.[language] ?? competency.pitchDeck?.narrative?.pt ?? '';
  const bullets = Array.isArray(competency.pitchDeck?.bullets?.[language])
    ? competency.pitchDeck.bullets[language]
    : [];

  const impact = Array.isArray(competency.impactMetrics?.[language])
    ? competency.impactMetrics[language]
    : [];
  const playbook = Array.isArray(competency.playbookHighlights?.[language])
    ? competency.playbookHighlights[language]
    : [];

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-3xl border border-white/10 p-8 text-white shadow-xl',
        'bg-gradient-to-br',
        gradient
      )}
    >
      <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(circle_at_top,white,transparent)]" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              <span>{competency.icon}</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Pitch Spotlight
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
              <p className="text-sm text-white/80">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={onSelectPrev}>
              {language === 'pt' ? 'Anterior' : 'Previous'}
            </Button>
            <Button variant="secondary" size="sm" onClick={onSelectNext}>
              {language === 'pt' ? 'Próxima' : 'Next'}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90">
                  {language === 'pt' ? 'Ver detalhes do pitch' : 'View pitch details'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-slate-950/90 text-white">
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription className="text-white/70">
                    {language === 'pt'
                      ? 'Resumo estendido do pitch deck com destaques de impacto e playbook.'
                      : 'Extended pitch deck summary with impact and playbook highlights.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-5">
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                      {language === 'pt' ? 'Narrativa' : 'Narrative'}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">{narrative}</p>
                  </section>
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                      {language === 'pt' ? 'Bullet Points' : 'Bullet Points'}
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-white/90">
                      {bullets.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                      {language === 'pt' ? 'Impacto' : 'Impact'}
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-white/90">
                      {impact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                      Playbook
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-white/90">
                      {playbook.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p className="max-w-3xl text-lg leading-relaxed text-white/90">{narrative}</p>

        <div className="flex flex-wrap gap-3">
          {bullets.map((bullet) => (
            <Badge
              key={bullet}
              variant="outline"
              className="border-white/30 bg-white/10 px-3 py-1 text-xs text-white"
            >
              {bullet}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
