#!/usr/bin/env node
/*
  Validador simples para garantir consistência bilíngue dos datasets:
  - speechFullCVData
  - experiencesData
  - profilesData

  Regras:
    1. Campos Bilingual devem ter pt & en não vazios.
    2. Arrays bilíngues (keyAchievements / achievements / keyPoints) devem existir em pt e en e ter mesmo length.
    3. Nenhuma role/case pode faltar campo obrigatório.
  Saída: processo sai com código !=0 se houver erro.
*/
import { speechFullCVData } from '../src/data/speechFullCV.js';
import { experiencesData } from '../src/data/experiences.js';
import { profilesData } from '../src/data/profiles.js';
import { competenciesData } from '../src/data/competencies.js';
import personalData from '../src/data/personalData.js';
import icebreakerData from '../src/data/icebreaker.js';

/** @param {any} v */
const isObj = (v)=> v && typeof v === 'object' && !Array.isArray(v);

function assert(cond, msg, acc) { if(!cond){ acc.push(msg);} }
function notEmptyStr(s){ return typeof s === 'string' && s.trim().length>0; }

function validateBilingual(node, path, acc){
  assert(isObj(node), `${path} deve ser objeto`, acc);
  if(!isObj(node)) return;
  assert('pt' in node, `${path}.pt ausente`, acc);
  assert('en' in node, `${path}.en ausente`, acc);
  if('pt' in node) assert(notEmptyStr(node.pt), `${path}.pt vazio`, acc);
  if('en' in node) assert(notEmptyStr(node.en), `${path}.en vazio`, acc);
}

function validateArrayBilingual(node, path, acc){
  assert(isObj(node), `${path} deve ser objeto`, acc);
  if(!isObj(node)) return;
  const { pt, en } = node;
  assert(Array.isArray(pt), `${path}.pt deve ser array`, acc);
  assert(Array.isArray(en), `${path}.en deve ser array`, acc);
  if(Array.isArray(pt) && Array.isArray(en)){
    assert(pt.length === en.length, `${path} tamanhos divergentes (${pt.length} vs ${en.length})`, acc);
    pt.forEach((val,i)=> assert(notEmptyStr(val), `${path}.pt[${i}] vazio`, acc));
    en.forEach((val,i)=> assert(notEmptyStr(val), `${path}.en[${i}] vazio`, acc));
  }
}

function validateSpeech(data){
  const errors=[];
  Object.entries(data).forEach(([key, role])=>{
    const basePath = `speech.${key}`;
    validateBilingual(role.title, basePath+'.title', errors);
    validateBilingual(role.subtitle, basePath+'.subtitle', errors);
    validateBilingual(role.duration, basePath+'.duration', errors);
    validateBilingual(role.content, basePath+'.content', errors);
    validateArrayBilingual(role.keyPoints, basePath+'.keyPoints', errors);
    if(role.tags){
      if(Array.isArray(role.tags)){
        // legacy format ok
      } else {
        validateArrayBilingual(role.tags, basePath+'.tags', errors);
      }
    }
  });
  return errors;
}

function validateExperiences(data){
  const errors=[];
  Object.entries(data).forEach(([key, exp])=>{
    const p = `exp.${key}`;
    validateBilingual(exp.title, p+'.title', errors);
    validateBilingual(exp.subtitle, p+'.subtitle', errors);
    validateBilingual(exp.location, p+'.location', errors);
    validateBilingual(exp.role, p+'.role', errors);
    validateBilingual(exp.summary, p+'.summary', errors);
    validateArrayBilingual(exp.keyAchievements, p+'.keyAchievements', errors);
    exp.cases.forEach((c,i)=>{
      const cp = `${p}.cases[${i}]`;
      validateBilingual(c.title, cp+'.title', errors);
      validateBilingual(c.situation, cp+'.situation', errors);
      validateBilingual(c.task, cp+'.task', errors);
      validateBilingual(c.action, cp+'.action', errors);
      validateBilingual(c.result, cp+'.result', errors);
      validateBilingual(c.learning, cp+'.learning', errors);
      if(c.tags){
        if(Array.isArray(c.tags)){} else validateArrayBilingual(c.tags, cp+'.tags', errors);
      }
    });
  });
  return errors;
}

function validateProfiles(data){
  const errors=[];
  Object.entries(data).forEach(([key, prof])=>{
    const p = `profile.${key}`;
    validateBilingual(prof.title, p+'.title', errors);
    validateBilingual(prof.subtitle, p+'.subtitle', errors);
    validateBilingual(prof.elevatorPitch, p+'.elevatorPitch', errors);
    validateArrayBilingual(prof.achievements, p+'.achievements', errors);
    if(prof.keyStrengths) validateArrayBilingual(prof.keyStrengths, p+'.keyStrengths', errors);
    if(prof.technologies) validateArrayBilingual(prof.technologies, p+'.technologies', errors);
  });
  return errors;
}

function validateCompetencies(data){
  const errors=[];
  Object.entries(data).forEach(([key, comp])=>{
    const p = `competency.${key}`;
    validateBilingual(comp.title, p+'.title', errors);
    validateBilingual(comp.subtitle, p+'.subtitle', errors);
    validateBilingual(comp.description, p+'.description', errors);
    validateArrayBilingual(comp.skills, p+'.skills', errors);
    validateArrayBilingual(comp.tools, p+'.tools', errors);
    validateArrayBilingual(comp.certifications, p+'.certifications', errors);
  });
  return errors;
}

function validatePersonal(data){
  const errors=[];
  const b = 'personal.basic';
  validateBilingual(data.basic.title, b+'.title', errors);
  validateBilingual(data.basic.location, b+'.location', errors);
  validateBilingual(data.basic.summary, b+'.summary', errors);
  // icebreaker
  const ib = data.icebreaker;
  if(!ib) errors.push('personal.icebreaker ausente'); else {
    validateBilingual({pt:ib.pt.intro,en:ib.en.intro}, 'personal.icebreaker.intro', errors);
    ['pt','en'].forEach(lang=>{
      ib[lang].questions.forEach((q,idx)=>{
        if(!q.q) errors.push(`personal.icebreaker.${lang}.questions[${idx}].q vazio`);
        if(!q.a) errors.push(`personal.icebreaker.${lang}.questions[${idx}].a vazio`);
      });
    });
  }
  // education
  data.education.forEach((ed,i)=>{
    validateBilingual(ed.degree, `personal.education[${i}].degree`, errors);
    validateBilingual(ed.focus, `personal.education[${i}].focus`, errors);
    validateBilingual(ed.institution, `personal.education[${i}].institution`, errors);
  });
  // languages
  data.languages.forEach((lng,i)=>{
    validateBilingual(lng.language, `personal.languages[${i}].language`, errors);
    validateBilingual(lng.level, `personal.languages[${i}].level`, errors);
  });
  return errors;
}

function validateIcebreaker(data){
  const errors=[];
  Object.entries(data).forEach(([key, item])=>{
    const p = `icebreaker.${key}`;
    validateBilingual(item.question, p+'.question', errors);
    validateBilingual(item.category, p+'.category', errors);
    if(!Array.isArray(item.versions) || !item.versions.length){
      errors.push(p+'.versions vazio');
    } else {
      item.versions.forEach((v,i)=>{
        const vp = `${p}.versions[${i}]`;
        validateBilingual(v.title, vp+'.title', errors);
        validateBilingual(v.content, vp+'.content', errors);
      });
    }
  });
  return errors;
}

const allErrors = [
  ...validateSpeech(speechFullCVData),
  ...validateExperiences(experiencesData),
  ...validateProfiles(profilesData),
  ...validateCompetencies(competenciesData),
  ...validatePersonal(personalData),
  ...validateIcebreaker(icebreakerData)
];

if(allErrors.length){
  console.error('\x1b[31mFalhas de validação de dados bilíngues:\n- '+allErrors.join('\n- ')+'\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32m✔ Dados bilíngues válidos\x1b[0m');
}
