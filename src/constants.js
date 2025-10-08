// Application constants
export const TIMER_DEFAULT_SECONDS = 300;
export const HIGHLIGHT_SCROLL_DELAY = 120;
export const FUP_SCROLL_DELAY = 120;
export const CASE_EXPAND_DELAY = 80;
export const DEBOUNCE_SEARCH_DELAY = 300;

// Z-index layers
export const Z_INDEX = {
  HEADER: 30,
  DROPDOWN: 20,
  MODAL: 40,
};

// Highlight classes
export const HIGHLIGHT_CLASSES = {
  RING: ['ring-2', 'ring-amber-300', 'rounded-md', 'bg-amber-50', 'p-2'],
  QUESTION: ['bg-amber-100', 'px-2', 'py-1', 'rounded'],
};

// Top case IDs - deprecated, use isTopCase flag instead
// This constant will be removed in future versions
export const DEPRECATED_TOP_CASE_IDS = new Set([
  'migracao-critica-de-dados-e-compliance',
  'reducao-drastica-de-sla-com-novo-modelo-de-process',
  'criacao-checklist-executivo-clientes-b2b',
  'estruturacao-pmo-zero-sefaz-rs',
  'reducao-churn-onboarding-banco-digital',
  'decisao-de-arquitetura-bancaria-next-vs-bra'
]);
