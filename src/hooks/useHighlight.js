import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook to manage highlight state using React state instead of DOM manipulation
 * @returns {Object} Highlight state and control functions
 */
export function useHighlight() {
  const [highlightedFupId, setHighlightedFupId] = useState(null);
  const [highlightedCaseId, setHighlightedCaseId] = useState(null);
  const [highlightedTypicalQuestionId, setHighlightedTypicalQuestionId] = useState(null);
  const [highlightSearchTerm, setHighlightSearchTerm] = useState("");

  // Track pending scroll to prevent race conditions
  const pendingScrollRef = useRef(null);

  // Cleanup pending scroll on unmount
  useEffect(() => {
    return () => {
      if (pendingScrollRef.current) {
        clearTimeout(pendingScrollRef.current);
      }
    };
  }, []);

  /**
   * Clear all highlights (but preserve search term)
   */
  const clearHighlights = useCallback(() => {
    // Cancel any pending scroll operations
    if (pendingScrollRef.current) {
      clearTimeout(pendingScrollRef.current);
      pendingScrollRef.current = null;
    }

    setHighlightedFupId(null);
    setHighlightedCaseId(null);
    setHighlightedTypicalQuestionId(null);
    // NOTE: We DON'T clear highlightSearchTerm here anymore!
    // It should persist until user clears the search or selects a different principle
  }, []);

  /**
   * Set highlighted FUP with safe scroll
   * @param {string} fupId - FUP element ID
   * @param {number} delay - Delay before scroll
   */
  const setHighlightedFup = useCallback((fupId, delay = 120) => {
    // Cancel any pending scroll
    if (pendingScrollRef.current) {
      clearTimeout(pendingScrollRef.current);
    }

    clearHighlights();
    setHighlightedFupId(fupId);

    pendingScrollRef.current = setTimeout(() => {
      const el = document.getElementById(fupId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      pendingScrollRef.current = null;
    }, delay);
  }, [clearHighlights]);

  /**
   * Set highlighted case with safe scroll
   * @param {string} caseId - Case element ID
   * @param {number} delay - Delay before scroll
   */
  const setHighlightedCase = useCallback((caseId, delay = 80) => {
    // Cancel any pending scroll
    if (pendingScrollRef.current) {
      clearTimeout(pendingScrollRef.current);
    }

    clearHighlights();
    setHighlightedCaseId(caseId);

    pendingScrollRef.current = setTimeout(() => {
      const el = document.getElementById(caseId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      pendingScrollRef.current = null;
    }, delay);
  }, [clearHighlights]);

  /**
   * Set highlighted typical question with safe scroll
   * @param {string} questionId - Typical question element ID
   * @param {number} delay - Delay before scroll
   */
  const setHighlightedTypicalQuestion = useCallback((questionId, delay = 120) => {
    // Cancel any pending scroll
    if (pendingScrollRef.current) {
      clearTimeout(pendingScrollRef.current);
    }

    clearHighlights();
    setHighlightedTypicalQuestionId(questionId);

    pendingScrollRef.current = setTimeout(() => {
      const el = document.getElementById(questionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      pendingScrollRef.current = null;
    }, delay);
  }, [clearHighlights]);

  return {
    highlightedFupId,
    highlightedCaseId,
    highlightedTypicalQuestionId,
    highlightSearchTerm,
    setHighlightSearchTerm,
    clearHighlights,
    setHighlightedFup,
    setHighlightedCase,
    setHighlightedTypicalQuestion,
  };
}
