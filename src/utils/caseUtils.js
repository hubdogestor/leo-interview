import { norm } from './textUtils.js';
import { extractBaseTitle, extractCompany, extractPeriod } from './textUtils.js';

/**
 * Check if a case is marked as top case
 * Uses the isTopCase flag on the case object
 * @param {Object} c - Case object
 * @returns {boolean} True if case is a top case
 */
export const isTopCase = (c) => !!(c && c.isTopCase);

/**
 * Get case base title based on language
 * @param {Object} c - Case object
 * @param {string} lang - Language ('pt' or 'en')
 * @returns {string} Base title
 */
export const getCaseBaseTitle = (c, lang) => {
  if (lang === "en") {
    return c.title_en || c.title_pt || extractBaseTitle(c.title);
  }
  return c.title_pt || extractBaseTitle(c.title);
};

/**
 * Get display title for a case with company, period and top case indicator
 * @param {Object} c - Case object
 * @param {string} language - Language ('pt' or 'en')
 * @returns {string} Display title
 */
export const getDisplayCaseTitle = (c, language) => {
  const base = getCaseBaseTitle(c, language);

  const company = c.company || extractCompany(c.title);
  const period = c.period || extractPeriod(c.title);

  const comp = company ? ` – ${company}` : "";
  const per = period ? ` (${period})` : "";
  const target = c.isTopCase ? " 🎯" : "";

  return `${base}${comp}${per}${target}`;
};

/**
 * Get FUPs from case (normalized - supports both 'fup' and 'fups')
 * @param {Object} c - Case object
 * @returns {Array} Array of FUP objects
 */
export const getCaseFups = (c) => {
  return c.fups || c.fup || [];
};

/**
 * Get display name for principle based on language
 * @param {Object} p - Principle object
 * @param {string} lang - Language
 * @param {Object} PT_LABELS - Portuguese labels map
 * @param {Object} EN_LABELS_FROM_PT - English labels map
 * @returns {string} Display name
 */
export const getDisplayName = (p, lang, PT_LABELS, EN_LABELS_FROM_PT) => {
  const k = norm(p?.name);
  if (lang === "pt") return PT_LABELS[k] || p.name;
  return EN_LABELS_FROM_PT[k] || p.name;
};

/**
 * Sort principles according to language-specific order
 * @param {Array} arr - Array of principles
 * @param {string} lang - Language
 * @param {Array} ORDER_PT - Portuguese order
 * @param {Array} ORDER_EN - English order
 * @returns {Array} Sorted principles
 */
export const sortPrinciples = (arr, lang, ORDER_PT, ORDER_EN) => {
  const order = lang === "pt" ? ORDER_PT : ORDER_EN;
  return [...arr].sort((a, b) => {
    const ia = order.indexOf(norm(a.name));
    const ib = order.indexOf(norm(b.name));
    const va = ia === -1 ? 999 : ia;
    const vb = ib === -1 ? 999 : ib;
    return va - vb || (a.name || "").localeCompare(b.name || "");
  });
};
