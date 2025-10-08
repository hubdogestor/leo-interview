// Text manipulation utilities

/**
 * Slugify a string - converts to URL-friendly format
 * Uses modern string methods and enhanced error handling
 * @param {string} s - String to slugify
 * @returns {string} Slugified string
 */
export const slugify = (s) => {
  if (typeof s !== 'string') return '';
  
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Normalize string for search comparison
 * Enhanced with type checking and performance optimization
 * @param {string} s - String to normalize
 * @returns {string} Normalized string
 */
export const norm = (s) => {
  if (typeof s !== 'string') return '';
  
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

/**
 * Escape regex special characters to prevent injection
 * @param {string} str - String to escape
 * @returns {string} Escaped string safe for regex
 */
export const escapeRegex = (str) => {
  if (!str) return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Sanitize HTML to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeHtml = (str) => {
  if (!str) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  return str.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Extract company name from title
 * @param {string} originalTitle - Original case title
 * @returns {string} Company name
 */
export function extractCompany(originalTitle) {
  const match = originalTitle.match(/-\s*([^(]+)\s*\(/);
  return match ? match[1].trim() : "";
}

/**
 * Extract period from title
 * @param {string} originalTitle - Original case title
 * @returns {string} Period
 */
export function extractPeriod(originalTitle) {
  if (originalTitle.includes("MM/AAAA")) {
    return "2019–2024";
  }
  const match = originalTitle.match(/\(([^)]+)\)/);
  return match ? match[1].trim() : "";
}

/**
 * Extract base title (remove company and period)
 * @param {string} originalTitle - Original title
 * @returns {string} Base title
 */
export const extractBaseTitle = (originalTitle) => {
  return originalTitle
    .replace(/\s*-\s*[^(]+\s*\([^)]*\)\s*$/, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim();
};
