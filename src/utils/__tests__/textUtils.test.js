// src/utils/__tests__/textUtils.test.js
import { describe, it, expect } from 'vitest';
import { slugify, norm, escapeRegex } from '../textUtils.js';

describe('textUtils', () => {
  describe('slugify', () => {
    it('should convert string to URL-friendly format', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
      expect(slugify('Ação & Reação')).toBe('acao-reacao');
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
    });

    it('should handle edge cases', () => {
      expect(slugify('')).toBe('');
      expect(slugify(null)).toBe('');
      expect(slugify(undefined)).toBe('');
      expect(slugify(123)).toBe('');
    });

    it('should remove special characters', () => {
      expect(slugify('Test@#$%^&*()')).toBe('test');
      expect(slugify('São Paulo - SP')).toBe('sao-paulo-sp');
    });

    it('should remove leading/trailing hyphens', () => {
      expect(slugify('---test---')).toBe('test');
      expect(slugify('###hello###')).toBe('hello');
    });
  });

  describe('norm', () => {
    it('should normalize strings for search', () => {
      expect(norm('Ação')).toBe('acao');
      expect(norm('UPPER CASE')).toBe('upper case');
      expect(norm('  Extra Spaces  ')).toBe('extra spaces');
    });

    it('should handle edge cases', () => {
      expect(norm('')).toBe('');
      expect(norm(null)).toBe('');
      expect(norm(undefined)).toBe('');
      expect(norm(123)).toBe('');
    });

    it('should preserve word boundaries', () => {
      expect(norm('word1 word2')).toBe('word1 word2');
      expect(norm('test-case')).toBe('test-case');
    });
  });

  describe('escapeRegex', () => {
    it('should escape regex special characters', () => {
      expect(escapeRegex('test.test')).toBe('test\\.test');
      expect(escapeRegex('test*test')).toBe('test\\*test');
      expect(escapeRegex('test+test')).toBe('test\\+test');
      expect(escapeRegex('test?test')).toBe('test\\?test');
    });

    it('should handle edge cases', () => {
      expect(escapeRegex('')).toBe('');
      expect(escapeRegex(null)).toBe('');
      expect(escapeRegex(undefined)).toBe('');
    });

    it('should escape brackets and parentheses', () => {
      expect(escapeRegex('test[bracket]')).toBe('test\\[bracket\\]');
      expect(escapeRegex('test(paren)')).toBe('test\\(paren\\)');
      expect(escapeRegex('test{brace}')).toBe('test\\{brace\\}');
    });
  });
});