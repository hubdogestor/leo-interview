// src/hooks/__tests__/useOptimizedSearch.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOptimizedSearch } from '../useOptimizedSearch';

describe('useOptimizedSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockData = [
    { id: 1, name: 'React Development', description: 'Frontend framework', tags: ['javascript', 'react'] },
    { id: 2, name: 'Node.js Backend', description: 'Server-side development', tags: ['javascript', 'node'] },
    { id: 3, name: 'Python Analytics', description: 'Data analysis', tags: ['python', 'data'] },
  ];

  it('should return all data when search term is empty', () => {
    const { result } = renderHook(() => 
      useOptimizedSearch(mockData, '', { debounceDelay: 100 })
    );

    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.isSearching).toBe(false);
  });

  it('should filter data based on search term', () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useOptimizedSearch(mockData, searchTerm, { debounceDelay: 100 }),
      { initialProps: { searchTerm: '' } }
    );

    rerender({ searchTerm: 'React' });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('React Development');
  });

  it('should search in multiple fields', () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useOptimizedSearch(mockData, searchTerm, { 
        debounceDelay: 100,
        searchFields: ['name', 'description']
      }),
      { initialProps: { searchTerm: '' } }
    );

    rerender({ searchTerm: 'framework' });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].description).toContain('framework');
  });

  it('should search in array fields like tags', () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useOptimizedSearch(mockData, searchTerm, { 
        debounceDelay: 100,
        searchFields: ['tags']
      }),
      { initialProps: { searchTerm: '' } }
    );

    rerender({ searchTerm: 'javascript' });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.filteredData).toHaveLength(2);
  });

  it('should handle case sensitivity option', () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useOptimizedSearch(mockData, searchTerm, { 
        debounceDelay: 100,
        caseSensitive: true
      }),
      { initialProps: { searchTerm: '' } }
    );

    rerender({ searchTerm: 'react' }); // lowercase

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.filteredData).toHaveLength(0);

    rerender({ searchTerm: 'React' }); // correct case

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.filteredData).toHaveLength(1);
  });

  it('should respect minimum search length', () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useOptimizedSearch(mockData, searchTerm, { 
        debounceDelay: 100,
        minSearchLength: 3
      }),
      { initialProps: { searchTerm: '' } }
    );

    rerender({ searchTerm: 'Re' }); // too short

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.filteredData).toEqual(mockData);

    rerender({ searchTerm: 'Rea' }); // minimum length

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.filteredData).toHaveLength(1);
  });

  it('should indicate when search is in progress', () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useOptimizedSearch(mockData, searchTerm, { debounceDelay: 100 }),
      { initialProps: { searchTerm: '' } }
    );

    rerender({ searchTerm: 'test' });

    // Before debounce completes
    expect(result.current.isSearching).toBe(true);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // After debounce completes
    expect(result.current.isSearching).toBe(false);
  });

  it('should handle non-array data gracefully', () => {
    const { result } = renderHook(() => 
      useOptimizedSearch(null, 'test', { debounceDelay: 100 })
    );

    expect(result.current.filteredData).toEqual([]);
  });
});