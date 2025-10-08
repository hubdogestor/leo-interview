// src/utils/securityUtils.js
/**
 * Utilitários de segurança para a aplicação
 * Implementa padrões de segurança web modernos
 */

/**
 * Sanitiza input de texto para prevenir XSS
 * @param {string} input - Input do usuário
 * @returns {string} Input sanitizado
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove tags HTML básicas
    .replace(/javascript:/gi, '') // Remove JavaScript URIs
    .replace(/data:/gi, '') // Remove data URIs
    .replace(/vbscript:/gi, '') // Remove VBScript URIs
    .trim()
    .slice(0, 1000); // Limita tamanho do input
};

/**
 * Escapa HTML para prevenir XSS em conteúdo dinâmico
 * @param {string} text - Texto a ser escapado
 * @returns {string} Texto com HTML escapado
 */
export const escapeHtml = (text) => {
  if (typeof text !== 'string') return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;'
  };
  
  return text.replace(/[&<>"'/]/g, (match) => map[match]);
};

/**
 * Valida URL para prevenir redirecionamentos maliciosos
 * @param {string} url - URL a ser validada
 * @returns {boolean} True se a URL for segura
 */
export const isValidUrl = (url) => {
  if (typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    
    // Só permite https e http
    if (!['https:', 'http:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Bloqueia IPs locais em produção
    if (process.env.NODE_ENV === 'production') {
      const hostname = urlObj.hostname;
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')
      ) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
};

/**
 * Rate limiting simples baseado em localStorage
 * @param {string} action - Nome da ação
 * @param {number} maxAttempts - Máximo de tentativas
 * @param {number} windowMs - Janela de tempo em ms
 * @returns {boolean} True se a ação for permitida
 */
export const checkRateLimit = (action, maxAttempts = 10, windowMs = 60000) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return true; // Permite em ambiente servidor
  }
  
  const key = `rateLimit_${action}`;
  const now = Date.now();
  
  try {
    const stored = localStorage.getItem(key);
    const attempts = stored ? JSON.parse(stored) : [];
    
    // Remove tentativas antigas
    const validAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    // Adiciona nova tentativa
    validAttempts.push(now);
    localStorage.setItem(key, JSON.stringify(validAttempts));
    
    return true;
  } catch (error) {
    console.warn('Rate limiting error:', error);
    return true; // Permite em caso de erro
  }
};

/**
 * Gera CSP (Content Security Policy) headers
 * @returns {object} Headers CSP recomendados
 */
export const generateCSPHeaders = () => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // unsafe-inline necessário para Vite em dev
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "media-src 'none'",
      "object-src 'none'",
      "frame-src 'none'"
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};

/**
 * Valida dados de formulário de forma segura
 * @param {object} data - Dados a serem validados
 * @param {object} schema - Schema de validação
 * @returns {object} Resultado da validação
 */
export const validateFormData = (data, schema) => {
  const errors = {};
  const sanitized = {};
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    
    // Verificar se é obrigatório
    if (rules.required && (!value || value.toString().trim() === '')) {
      errors[field] = 'Campo obrigatório';
      continue;
    }
    
    if (value != null) {
      let sanitizedValue = value;
      
      // Sanitizar se for string
      if (typeof value === 'string') {
        sanitizedValue = sanitizeInput(value);
        
        // Verificar tamanho mínimo/máximo
        if (rules.minLength && sanitizedValue.length < rules.minLength) {
          errors[field] = `Deve ter pelo menos ${rules.minLength} caracteres`;
          continue;
        }
        
        if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
          errors[field] = `Deve ter no máximo ${rules.maxLength} caracteres`;
          continue;
        }
        
        // Verificar padrão regex
        if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
          errors[field] = rules.message || 'Formato inválido';
          continue;
        }
      }
      
      sanitized[field] = sanitizedValue;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: sanitized
  };
};

/**
 * Logger seguro que não vaza informações sensíveis
 * @param {string} level - Nível do log
 * @param {string} message - Mensagem
 * @param {any} data - Dados adicionais
 */
export const secureLog = (level, message, data = null) => {
  if (process.env.NODE_ENV === 'production') {
    // Em produção, só logga erros
    if (level !== 'error') return;
  }
  
  const sanitizedData = data ? JSON.stringify(data, (key, value) => {
    // Remove campos sensíveis
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
    if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
      return '[REDACTED]';
    }
    return value;
  }) : null;
  
  console[level](message, sanitizedData || '');
};

export default {
  sanitizeInput,
  escapeHtml,
  isValidUrl,
  checkRateLimit,
  generateCSPHeaders,
  validateFormData,
  secureLog
};