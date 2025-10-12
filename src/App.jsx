import React, { useMemo, useState } from 'react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Globe2, Mail } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext.jsx';
import { competenciesList } from './data/competencies.js';
import { CompetencyCanvas } from './features/competency-canvas/index.js';

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const options = [
    { id: 'pt', label: 'PT' },
    { id: 'en', label: 'EN' }
  ];

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setLanguage(option.id)}
          className={
            'px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ' +
            (language === option.id
              ? 'rounded-full bg-white text-slate-900'
              : 'rounded-full text-white/70 hover:bg-white/10')
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function AppHeader() {
  const { language } = useLanguage();

  const headline = useMemo(
    () =>
      language === 'pt'
        ? {
            title: 'Leonardo Menezes',
            subtitle: 'Liderança em Produto, Programas e Inovação orientada a valor',
            pitch: 'Canvas de competências com foco no pitch deck para entrevistas e apresentações executivas.'
          }
        : {
            title: 'Leonardo Menezes',
            subtitle: 'Product, Programme & Innovation leadership focused on measurable value',
            pitch: 'Competency canvas with a pitch-deck-first experience for interviews and executive storytelling.'
          },
    [language]
  );

  return (
    <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-[0_0_60px_-30px_rgb(56,189,248)] backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <Badge variant="outline" className="mb-4 border-emerald-300/60 bg-emerald-300/20 text-emerald-100">
            Pitch Deck Canvas
          </Badge>
          <h1 className="text-4xl font-semibold text-white tracking-tight">{headline.title}</h1>
          <p className="mt-2 text-base text-white/75">{headline.subtitle}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">{headline.pitch}</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <LanguageToggle />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex items-center gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <a href="mailto:leon4rdo@gmail.com">
                <Mail className="h-4 w-4" />
                {language === 'pt' ? 'Contato' : 'Contact'}
              </a>
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <a href="https://www.linkedin.com/in/menezesleonardo/" target="_blank" rel="noreferrer">
                <Globe2 className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function AppContent() {
  const [selectedId, setSelectedId] = useState(competenciesList[0]?.id ?? null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
        <AppHeader />
        <CompetencyCanvas
          competencies={competenciesList}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
