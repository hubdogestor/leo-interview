import { describe, it, expect } from 'vitest';
import { t, tArray } from '../i18n';

describe('i18n utilities', () => {
  it('t returns correct language and falls back', () => {
    const val = { pt: 'Olá', en: 'Hello' };
    expect(t(val, 'pt')).toBe('Olá');
    expect(t(val, 'en')).toBe('Hello');
    expect(t({ pt: 'Só PT' }, 'en')).toBe('Só PT');
  });

  it('t handles plain strings and empty', () => {
    expect(t('Direct', 'pt')).toBe('Direct');
    expect(t(null, 'pt')).toBe('');
  });

  it('tArray returns array in language or fallback', () => {
    const arr = { pt: ['a','b'], en: ['c','d'] };
    expect(tArray(arr, 'pt')).toEqual(['a','b']);
    expect(tArray(arr, 'en')).toEqual(['c','d']);
    expect(tArray({ pt: ['x'] }, 'en')).toEqual(['x']);
  });

  it('tArray handles undefined gracefully', () => {
    expect(tArray(undefined, 'pt')).toEqual([]);
  });
});
