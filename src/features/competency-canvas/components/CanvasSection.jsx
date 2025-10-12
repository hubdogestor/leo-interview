import React from 'react';
import clsx from 'clsx';

export function CanvasSection({ title, items = [], className, tone = 'default' }) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm',
        tone === 'accent' && 'border-white/20 bg-white/10 shadow-lg shadow-black/30',
        tone === 'muted' && 'border-white/5 bg-white/0',
        className
      )}
    >
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/90">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
