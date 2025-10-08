// src/hooks/useAccessibility.js
import { useEffect, useCallback } from 'react';

/**
 * Hook para melhorias de acessibilidade
 * Implementa recursos de navegação por teclado e screen reader
 */
export function useAccessibility() {
  
  /**
   * Anuncia mudanças para screen readers
   * @param {string} message - Mensagem a ser anunciada
   * @param {string} priority - Prioridade ('polite' ou 'assertive')
   */
  const announceToScreenReader = useCallback((message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    // Remove após anúncio
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  /**
   * Gerencia navegação por teclado
   */
  const handleKeyboardNavigation = useCallback((event) => {
    // Escape para fechar modais
    if (event.key === 'Escape') {
      const modals = document.querySelectorAll('[role="dialog"]:not([aria-hidden="true"])');
      const topModal = modals[modals.length - 1];
      if (topModal) {
        const closeButton = topModal.querySelector('[aria-label*="Fechar"], [aria-label*="Close"]');
        if (closeButton) {
          closeButton.click();
        }
      }
    }
    
    // Tab trap em modais
    if (event.key === 'Tab') {
      const activeModal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
      if (activeModal) {
        const focusableElements = activeModal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, []);

  /**
   * Configura skip links para navegação rápida
   */
  const setupSkipLinks = useCallback(() => {
    let skipNav = document.getElementById('skip-nav');
    
    if (!skipNav) {
      skipNav = document.createElement('a');
      skipNav.id = 'skip-nav';
      skipNav.href = '#main-content';
      skipNav.textContent = 'Pular para o conteúdo principal';
      skipNav.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s;
      `;
      
      skipNav.addEventListener('focus', () => {
        skipNav.style.top = '6px';
        skipNav.style.opacity = '1';
      });
      
      skipNav.addEventListener('blur', () => {
        skipNav.style.top = '-40px';
        skipNav.style.opacity = '0';
      });
      
      document.body.insertBefore(skipNav, document.body.firstChild);
    }
  }, []);

  /**
   * Gerencia foco após mudanças de rota/conteúdo
   * @param {string} selector - Seletor do elemento para focar
   */
  const manageFocus = useCallback((selector = 'h1, h2, [role="main"]') => {
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        // Torna elemento focável temporariamente se necessário
        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '-1');
        }
        element.focus();
        
        // Remove tabindex se foi adicionado temporariamente
        if (element.getAttribute('tabindex') === '-1') {
          setTimeout(() => {
            element.removeAttribute('tabindex');
          }, 100);
        }
      }
    }, 100);
  }, []);

  /**
   * Melhora labels de formulários
   */
  const enhanceFormAccessibility = useCallback(() => {
    // Encontra inputs sem labels e adiciona aria-label
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach(input => {
      const placeholder = input.getAttribute('placeholder');
      const name = input.getAttribute('name');
      
      if (placeholder) {
        input.setAttribute('aria-label', placeholder);
      } else if (name) {
        const label = name.replace(/([A-Z])/g, ' $1').toLowerCase();
        input.setAttribute('aria-label', label);
      }
    });
    
    // Adiciona descrições para campos com validação
    const invalidInputs = document.querySelectorAll('input:invalid');
    invalidInputs.forEach(input => {
      if (!input.hasAttribute('aria-describedby')) {
        const errorId = `${input.name || 'field'}-error`;
        input.setAttribute('aria-describedby', errorId);
        
        // Cria elemento de erro se não existir
        if (!document.getElementById(errorId)) {
          const errorElement = document.createElement('span');
          errorElement.id = errorId;
          errorElement.className = 'sr-only';
          errorElement.textContent = 'Campo com erro de validação';
          input.parentNode.appendChild(errorElement);
        }
      }
    });
  }, []);

  /**
   * Configura landmarks ARIA
   */
  const setupLandmarks = useCallback(() => {
    // Adiciona role="main" se não existir
    if (!document.querySelector('[role="main"], main')) {
      const mainContent = document.querySelector('#root > div, .app, .main-content');
      if (mainContent && !mainContent.getAttribute('role')) {
        mainContent.setAttribute('role', 'main');
        mainContent.setAttribute('id', 'main-content');
      }
    }
    
    // Adiciona navigation landmarks
    const navElements = document.querySelectorAll('nav:not([role])');
    navElements.forEach((nav, index) => {
      nav.setAttribute('role', 'navigation');
      if (!nav.getAttribute('aria-label')) {
        nav.setAttribute('aria-label', `Navegação ${index + 1}`);
      }
    });
  }, []);

  // Setup inicial
  useEffect(() => {
    setupSkipLinks();
    setupLandmarks();
    enhanceFormAccessibility();
    
    // Listener para navegação por teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
    };
  }, [handleKeyboardNavigation, setupSkipLinks, setupLandmarks, enhanceFormAccessibility]);

  return {
    announceToScreenReader,
    manageFocus,
    enhanceFormAccessibility,
    setupLandmarks
  };
}

export default useAccessibility;