// src/utils/performanceUtils.js
import { useRef, useCallback } from 'react';

/**
 * Utilitários para monitoramento de performance
 * Implementa padrões modernos de observabilidade
 */

class PerformanceMonitor {
  constructor() {
    this.markers = new Map();
    this.measures = new Map();
  }

  /**
   * Marca início de uma operação
   * @param {string} name - Nome da operação
   */
  mark(name) {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`${name}-start`);
      this.markers.set(name, Date.now());
    }
  }

  /**
   * Mede duração de uma operação
   * @param {string} name - Nome da operação
   * @returns {number} Duração em milissegundos
   */
  measure(name) {
    const startTime = this.markers.get(name);
    if (!startTime) {
      console.warn(`No marker found for: ${name}`);
      return 0;
    }

    const duration = Date.now() - startTime;
    this.measures.set(name, duration);

    if (typeof performance !== 'undefined' && performance.mark && performance.measure) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    }

    return duration;
  }

  /**
   * Obtém todas as medições
   * @returns {Object} Objeto com todas as medições
   */
  getAllMeasures() {
    return Object.fromEntries(this.measures);
  }

  /**
   * Limpa todas as marcações e medições
   */
  clear() {
    this.markers.clear();
    this.measures.clear();
    
    if (typeof performance !== 'undefined' && performance.clearMarks) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }

  /**
   * Log de performance para desenvolvimento
   * @param {string} operation - Nome da operação
   * @param {Function} fn - Função a ser monitorada
   */
  async logPerformance(operation, fn) {
    this.mark(operation);
    
    try {
      const result = await fn();
      const duration = this.measure(operation);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 ${operation}: ${duration}ms`);
      }
      
      return result;
    } catch (error) {
      this.measure(operation);
      throw error;
    }
  }
}

// Instância singleton
const performanceMonitor = new PerformanceMonitor();

/**
 * Decorator para monitorar performance de métodos
 * @param {Object} target - Target object
 * @param {string} propertyName - Property name
 * @param {Object} descriptor - Property descriptor
 */
export function withPerformanceTracking(target, propertyName, descriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args) {
    return performanceMonitor.logPerformance(
      `${target.constructor.name}.${propertyName}`,
      () => method.apply(this, args)
    );
  };
  
  return descriptor;
}

/**
 * Hook para debounce com cancelamento automático
 * @param {Function} callback - Função a ser chamada
 * @param {number} delay - Delay em milissegundos
 * @param {Array} dependencies - Dependências do callback
 */

export const useOptimizedCallback = (callback, delay, dependencies = []) => {
  const timeoutRef = useRef();
  
  return useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
};

/**
 * Throttle function para limitação de chamadas
 * @param {Function} func - Função a ser throttled
 * @param {number} limit - Limite em milissegundos
 */
export const throttle = (func, limit) => {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Memoização customizada com TTL
 * @param {Function} fn - Função a ser memoizada
 * @param {number} ttl - Tempo de vida em milissegundos
 */
export const memoizeWithTTL = (fn, ttl = 5000) => {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const result = fn.apply(this, args);
    cache.set(key, { value: result, timestamp: Date.now() });
    
    return result;
  };
};

export default performanceMonitor;