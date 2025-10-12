import React, { useMemo } from 'react';
import { PitchDeckHero } from './components/PitchDeckHero.jsx';
import { CompetencyCard } from './components/CompetencyCard.jsx';

export function CompetencyCanvas({ competencies, selectedId, onSelect }) {
  const list = competencies ?? [];
  const active = useMemo(
    () => list.find((item) => item.id === selectedId) ?? list[0] ?? null,
    [list, selectedId]
  );
  const index = active ? list.indexOf(active) : -1;

  const handlePrev = () => {
    if (!list.length) return;
    const prevIndex = index > 0 ? index - 1 : list.length - 1;
    onSelect(list[prevIndex].id);
  };

  const handleNext = () => {
    if (!list.length) return;
    const nextIndex = index < list.length - 1 ? index + 1 : 0;
    onSelect(list[nextIndex].id);
  };

  return (
    <div className="space-y-10">
      <PitchDeckHero competency={active} onSelectPrev={handlePrev} onSelectNext={handleNext} />
      <div className="space-y-8">
        {list.map((competency) => (
          <CompetencyCard
            key={competency.id}
            competency={competency}
            isActive={competency.id === active?.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

