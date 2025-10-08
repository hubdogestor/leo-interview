// @ts-check
/** Utilidades de internacionalização simples (fallback PT/EN) */

/** @typedef {{pt?:string,en?:string}} MaybeBilingual */

/**
 * Resolve texto bilíngue com fallback.
 * @param {MaybeBilingual|string|undefined|null} value
 * @param {'pt'|'en'} lang
 * @param {string} [fallbackMarker]
 */
export function t(value, lang, fallbackMarker = '') {
  if (!value) return '';
  if (typeof value === 'string') return value; // já plain
  const primary = value[lang];
  if (primary && primary.trim()) return primary;
  const alt = lang === 'pt' ? value.en : value.pt;
  return (alt && alt.trim()) ? alt + fallbackMarker : '';
}

/**
 * Normaliza arrays bilíngues {pt:[],en:[]} retornando do idioma pedido ou fallback.
 * @param {{pt?:string[],en?:string[]}|undefined} arr
 * @param {'pt'|'en'} lang
 * @returns {string[]}
 */
export function tArray(arr, lang){
  if(!arr) return [];
  const primary = Array.isArray(arr[lang]) ? arr[lang] : [];
  if(primary.length) return primary;
  const alt = lang === 'pt' ? arr.en : arr.pt;
  return Array.isArray(alt) ? alt : [];
}

/**
 * Helper para objetos bilíngues profundos em campos conhecidos.
 * @param {Record<string, any>} obj
 * @param {'pt'|'en'} lang
 * @param {string[]} keys lista de chaves bilíngues esperadas
 * @returns {Record<string,string>}
 */
export function pickBilingual(obj, lang, keys){
  /** @type {Record<string,string>} */
  const out = {};
  keys.forEach(k=>{ out[k] = t(obj[k], lang); });
  return out;
}
