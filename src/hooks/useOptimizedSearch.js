// src/hooks/useOptimizedSearch.js
import { useMemo } from 'react';
import { useDebounce } from './useDebounce';

/**
 * Hook otimizado para busca com debounce e memoização
 * @param {Array} data - Array de dados para pesquisar
 * @param {string} searchTerm - Termo de busca
 * @param {Object} options - Opções de configuração
 */
export function useOptimizedSearch(data, searchTerm, options = {}) {
  const {
    debounceDelay = 300,
    searchFields = ['name', 'title', 'description'],
    caseSensitive = false,
    minSearchLength = 0
  } = options;

  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    
    if (!debouncedSearchTerm || debouncedSearchTerm.length < minSearchLength) {
      return data;
    }

    const searchTermLower = caseSensitive ? debouncedSearchTerm : debouncedSearchTerm.toLowerCase();

    return data.filter(item => {
      return searchFields.some(field => {
        const fieldValue = getNestedValue(item, field);
        if (!fieldValue) return false;
        
        const searchableValue = caseSensitive ? String(fieldValue) : String(fieldValue).toLowerCase();
        
        // Support array fields (like tags)
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(tag => 
            caseSensitive ? tag.includes(searchTermLower) : tag.toLowerCase().includes(searchTermLower)
          );
        }
        
        return searchableValue.includes(searchTermLower);
      });
    });
  }, [data, debouncedSearchTerm, searchFields, caseSensitive, minSearchLength]);

  return {
    filteredData,
    isSearching: searchTerm !== debouncedSearchTerm,
    searchTerm: debouncedSearchTerm
  };
}

/**
 * Utilitário para acessar valores aninhados com segurança
 * @param {Object} obj - Objeto fonte
 * @param {string} path - Caminho para o valor (ex: 'user.name')
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}