// Basic data validation for bilingual structure and required fields
import { experiencesData } from '../src/data/experiences.js';
import { competenciesData } from '../src/data/competencies.js';
import { profilesData } from '../src/data/profiles.js';
import icebreaker from '../src/data/icebreaker.js';
import speechFullCV from '../src/data/speechFullCV.js';
import myQuestions from '../src/data/myQuestions.js';

const errors = [];

const isBilingual = (v) => v && typeof v === 'object' && 'pt' in v && 'en' in v;
const ensure = (cond, msg) => { if (!cond) errors.push(msg); };

const checkBilingualArray = (v, path) => {
  ensure(isBilingual(v), `${path}: must be {pt:[], en:[]}`);
  if (isBilingual(v)) {
    ensure(Array.isArray(v.pt), `${path}.pt must be array`);
    ensure(Array.isArray(v.en), `${path}.en must be array`);
  }
};

// Experiences
for (const [expId, exp] of Object.entries(experiencesData)) {
  const base = `experiences.${expId}`;
  ['title','subtitle','location','role','summary'].forEach(k=>
    ensure(isBilingual(exp[k]), `${base}.${k} must be bilingual`)
  );
  checkBilingualArray(exp.keyAchievements, `${base}.keyAchievements`);
  ensure(Array.isArray(exp.cases), `${base}.cases must be array`);
  (exp.cases||[]).forEach((c, idx)=>{
    const cbase = `${base}.cases[${idx}](${c.id||'no-id'})`;
    ['title','situation','task','action','result','learning'].forEach(k=>
      ensure(isBilingual(c[k]), `${cbase}.${k} must be bilingual`)
    );
    // tags must be bilingual array
    if (Array.isArray(c.tags)) {
      errors.push(`${cbase}.tags must be bilingual {pt:[],en:[]}, found plain array`);
    } else {
      checkBilingualArray(c.tags, `${cbase}.tags`);
    }
  });
}

// Competencies
if (competenciesData && Array.isArray(competenciesData.categories)) {
  competenciesData.categories.forEach((cat, i)=>{
    const cbase = `competenciesData.categories[${i}]`;
    ensure(isBilingual(cat.title), `${cbase}.title must be bilingual`);
    ['skills','tools','certifications'].forEach(arrK=>{
      if (cat[arrK] !== undefined) {
        checkBilingualArray(cat[arrK], `${cbase}.${arrK}`);
      }
    });
  });
}

// Profiles
if (profilesData) {
  Object.values(profilesData).forEach((p, i)=>{
    const pbase = `Object.values(profilesData)[${i}]`;
    ['title','elevatorPitch'].forEach(k=> ensure(isBilingual(p[k]), `${pbase}.${k} must be bilingual`));
    ['achievements','keyStrengths','technologies'].forEach(k=>{
      if (p[k] !== undefined) checkBilingualArray(p[k], `${pbase}.${k}`);
    });
  });
}

// Icebreaker
if (icebreaker && Array.isArray(icebreaker.items)){
  icebreaker.items.forEach((q,i)=>{
    const qbase = `icebreaker.items[${i}]`;
    ensure(isBilingual(q.question), `${qbase}.question must be bilingual`);
    if (q.category !== undefined) ensure(isBilingual(q.category), `${qbase}.category must be bilingual`);
    if (Array.isArray(q.versions)) {
      q.versions.forEach((v, j)=> ensure(isBilingual(v.content), `${qbase}.versions[${j}].content must be bilingual`));
    }
  });
}

// Speech Full CV
if (speechFullCV && Array.isArray(speechFullCV.sections)){
  speechFullCV.sections.forEach((s,i)=>{
    const sbase = `speechFullCV.sections[${i}]`;
    ['title','content'].forEach(k=> ensure(isBilingual(s[k]), `${sbase}.${k} must be bilingual`));
    if (s.keyPoints !== undefined) checkBilingualArray(s.keyPoints, `${sbase}.keyPoints`);
    if (s.tags !== undefined) checkBilingualArray(s.tags, `${sbase}.tags`);
  });
}

// My Questions
if (myQuestions && Array.isArray(myQuestions.categories)){
  myQuestions.categories.forEach((cat,i)=>{
    const qbase = `myQuestions.categories[${i}]`;
    ensure(isBilingual(cat.category), `${qbase}.category must be bilingual`);
    if (Array.isArray(cat.questions)){
      cat.questions.forEach((q,j)=>{
        ensure(isBilingual(q.question), `${qbase}.questions[${j}].question must be bilingual`);
        if (q.context !== undefined) ensure(isBilingual(q.context), `${qbase}.questions[${j}].context must be bilingual`);
      });
    }
  });
}

if (errors.length){
  console.error('Data validation failed:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
} else {
  console.log('Data validation passed.');
}
