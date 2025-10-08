import { describe, it, expect } from 'vitest';
import { speechFullCVData } from '../../src/data/speechFullCV';
import { experiencesData } from '../../src/data/experiences';
import { profilesData } from '../../src/data/profiles';
import { competenciesData } from '../../src/data/competencies';
import personalData from '../../src/data/personalData';

// Reuse validator logic by importing functions? They are internal; replicate minimal checks for a smoke test.
function hasPtEn(obj){ return obj && typeof obj === 'object' && 'pt' in obj && 'en' in obj; }

function checkBilingualFields(obj, fields){
  return fields.every(f => hasPtEn(obj[f]) && obj[f].pt && obj[f].en);
}

describe('bilingual datasets smoke test', () => {
  it('speech roles have required bilingual fields', () => {
    Object.values(speechFullCVData).forEach(role => {
      expect(checkBilingualFields(role, ['title','subtitle','duration','content'])).toBe(true);
    });
  });

  it('experiences have bilingual summary and cases', () => {
    Object.values(experiencesData).forEach(exp => {
      expect(checkBilingualFields(exp, ['title','subtitle','location','role','summary'])).toBe(true);
      exp.cases.forEach(c => {
        expect(checkBilingualFields(c, ['title','situation','task','action','result','learning'])).toBe(true);
      });
    });
  });

  it('profiles have required bilingual fields', () => {
    Object.values(profilesData).forEach(p => {
      expect(checkBilingualFields(p, ['title','subtitle','elevatorPitch'])).toBe(true);
    });
  });

  it('competencies have bilingual core fields', () => {
    Object.values(competenciesData).forEach(c => {
      expect(checkBilingualFields(c, ['title','subtitle','description'])).toBe(true);
    });
  });

  it('personalData basic has bilingual fields', () => {
    expect(checkBilingualFields(personalData.basic, ['title','location','summary'])).toBe(true);
  });
});
