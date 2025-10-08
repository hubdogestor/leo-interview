// src/hooks/__tests__/usePrinciplesData.test.js
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrinciplesData } from '../usePrinciplesData.js';

// Mock dos dados de teste
const mockPrinciplesData = [
  {
    id: 'test-principle-1',
    principle: {
      title: 'Test Principle 1',
      title_en: 'Test Principle 1 EN'
    },
    cases: [
      {
        id: 'case-1',
        title: 'Test Case 1',
        company: 'Test Company',
        period: '2023-2024',
        isTopCase: true,
        pt: { s: 'Situação' },
        en: { s: 'Situation' },
        fups: [{ q: 'Question', a: 'Answer' }]
      }
    ]
  },
  {
    id: 'test-principle-2',
    principle: {
      title: 'Test Principle 2',
      title_en: 'Test Principle 2 EN'
    },
    cases: [
      {
        id: 'case-2',
        title_pt: 'Caso de Teste 2',
        company: 'Empresa Teste',
        fups: []
      }
    ]
  }
];

// Não mockamos mais o módulo; injetamos os dados diretamente no hook

describe('usePrinciplesData', () => {
  it('should return processed principles data', () => {
    const { result } = renderHook(() => usePrinciplesData(mockPrinciplesData));
    
    expect(result.current).toHaveLength(2);
    expect(result.current[0].id).toBe('test-principle-1');
    expect(result.current[1].id).toBe('test-principle-2');
  });

  it('should add fallback values for missing fields', () => {
    const { result } = renderHook(() => usePrinciplesData(mockPrinciplesData));
    
    const case2 = result.current[1].cases[0];
    
    // Should use title_pt as fallback for title
    expect(case2.title).toBe('Caso de Teste 2');
    
    // Should have default values
    expect(case2.period).toBe('Unknown Period');
    expect(case2.isTopCase).toBe(false);
    expect(Array.isArray(case2.fups)).toBe(true);
    expect(case2.pt).toEqual({});
    expect(case2.en).toEqual({});
  });

  it('should filter out invalid data', () => {
    const invalidData = [
      null,
      undefined,
      { id: 'valid', principle: {}, cases: [] },
      { principle: {}, cases: [] }, // missing id
      { id: 'invalid', cases: [] }, // missing principle
      { id: 'invalid2', principle: {} }, // missing cases
    ];

    const { result } = renderHook(() => usePrinciplesData(invalidData));
    
    // Should only return the valid principle
    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe('valid');
  });

  it('should handle non-array input gracefully', () => {
    const { result } = renderHook(() => usePrinciplesData(null));
    
    expect(result.current).toEqual([]);
  });

  it('should filter out cases without IDs', () => {
    const dataWithInvalidCases = [
      {
        id: 'test-principle',
        principle: { title: 'Test' },
        cases: [
          { id: 'valid-case', title: 'Valid Case' },
          { title: 'Invalid Case' }, // missing id
          null,
          undefined
        ]
      }
    ];

    const { result } = renderHook(() => usePrinciplesData(dataWithInvalidCases));
    
    expect(result.current[0].cases).toHaveLength(1);
    expect(result.current[0].cases[0].id).toBe('valid-case');
  });

  it('should memoize results to prevent unnecessary re-renders', () => {
    const { result, rerender } = renderHook(({data}) => usePrinciplesData(data), {
      initialProps: { data: mockPrinciplesData }
    });
    
    const firstResult = result.current;
    
    // Re-render should return the same reference
    rerender({ data: mockPrinciplesData });
    
    expect(result.current).toBe(firstResult);
  });
});