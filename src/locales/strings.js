// @ts-check
/** Bilingual UI strings */
export const uiStrings = {
  pt: {
    timer: 'Timer',
    back: '← Voltar',
    experiences_title: 'Experiências Profissionais',
    experiences_desc: 'Explore 15+ anos de experiência em transformação digital e gestão de programas complexos',
    competencies_title: 'Competências Técnicas',
    competencies_desc: 'Competências técnicas estruturadas com habilidades, ferramentas e certificações',
    profiles_title: 'Perfis Personalizados',
    profiles_desc: 'Perfis personalizados para diferentes tipos de vaga e contextos de entrevista',
    icebreaker_title: 'Perguntas Icebreaker',
    icebreaker_desc: 'Respostas estruturadas para perguntas típicas de RH e apresentação pessoal',
    speechcv_title: 'Speech Full CV',
    speechcv_desc: 'Apresentações completas do CV adaptadas por tipo de vaga e contexto',
    main_achievements: 'Principais Conquistas',
    star_cases: 'Casos STAR',
  star_cases_desc: 'Casos estruturados com Situação, Tarefa, Ação, Resultado e Aprendizado',
  menu_experiences: 'Experiências',
  menu_competencies: 'Competências',
  menu_profiles: 'Perfis',
  menu_icebreaker: 'Icebreaker',
  menu_speechcv: 'Speech Full CV',
    situation: 'Situação',
    task: 'Tarefa',
    action: 'Ação',
    result: 'Resultado',
    learning: 'Aprendizado',
    skills: 'Habilidades',
    tools: 'Ferramentas',
    certifications: 'Certificações',
    elevator_pitch: 'Elevator Pitch',
    strengths: 'Principais Forças',
    technologies: 'Tecnologias',
    key_points: 'Pontos-Chave',
    full_speech: 'Speech Completo',
    structured_cv_for: 'Apresentação estruturada do CV para',
    search_placeholder: 'Buscar...',
    score: 'Score',
    dataset_updated: 'Data set atualizado',
    sections_label: 'SEÇÕES',
    back_to_top: 'Topo'
  },
  en: {
    timer: 'Timer',
    back: '← Back',
    experiences_title: 'Professional Experiences',
    experiences_desc: 'Explore 15+ years in digital transformation and complex program management',
    competencies_title: 'Technical Competencies',
    competencies_desc: 'Structured technical competencies with skills, tools and certifications',
    profiles_title: 'Custom Profiles',
    profiles_desc: 'Customized profiles for different role types and interview contexts',
    icebreaker_title: 'Icebreaker Questions',
    icebreaker_desc: 'Structured answers for typical HR and self-introduction questions',
    speechcv_title: 'Full CV Speech',
    speechcv_desc: 'Complete CV presentations adapted by role type and context',
    main_achievements: 'Key Achievements',
    star_cases: 'STAR Cases',
  star_cases_desc: 'Cases structured with Situation, Task, Action, Result and Learning',
  menu_experiences: 'Experiences',
  menu_competencies: 'Competencies',
  menu_profiles: 'Profiles',
  menu_icebreaker: 'Icebreaker',
  menu_speechcv: 'Full CV Speech',
    situation: 'Situation',
    task: 'Task',
    action: 'Action',
    result: 'Result',
    learning: 'Learning',
    skills: 'Skills',
    tools: 'Tools',
    certifications: 'Certifications',
    elevator_pitch: 'Elevator Pitch',
    strengths: 'Key Strengths',
    technologies: 'Technologies',
    key_points: 'Key Points',
    full_speech: 'Full Speech',
    structured_cv_for: 'Structured CV presentation for',
    search_placeholder: 'Search...',
    score: 'Score',
    dataset_updated: 'Dataset updated',
    sections_label: 'SECTIONS',
    back_to_top: 'Top'
  }
};

/**
 * Translate UI key.
 * @param {string} key
 * @param {'pt'|'en'} lang
 */
export function tr(key, lang){
  return uiStrings[lang][key] || uiStrings.pt[key] || key;
}

export default uiStrings;