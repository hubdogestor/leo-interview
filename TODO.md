# TODO - Leo Interview Prep Project

## 📋 CONTEXTO DO PROJETO

### O que é o projeto?
O **Leo Interview Prep** é uma ferramenta interativa de preparação universal para entrevistas, desenvolvida em React + Vite. Baseada em 15+ anos de experiência profissional real de Leonardo Menezes, oferece preparação estruturada com casos STAR, competências técnicas, perfis personalizados e muito mais.

### Status Atual
- ✅ **Deploy em produção**: https://hubdogestor.github.io/leo-interview/
- ✅ **Funcionalidades principais implementadas**
- ✅ **Sistema bilíngue (PT/EN) funcionando**
- ✅ **Busca global e por seção implementada**
- ✅ **Timer para simulação de entrevistas**
- ✅ **Sistema de navegação completo**

### Estrutura do Projeto
```
leo-interview/
├── src/
│   ├── components/
│   │   ├── ui/                  # Componentes shadcn/ui
│   │   ├── app/                 # Timer, SearchBar
│   │   └── common/              # ErrorBoundary
│   ├── data/                    # Dados estruturados em JS
│   │   ├── experiences.js       # 5 experiências profissionais
│   │   ├── competencies.js      # 6 competências técnicas
│   │   ├── profiles.js          # 5 perfis personalizados
│   │   ├── icebreaker.js        # Quebra-gelo e apresentações
│   │   ├── speechFullCV.js      # Discursos de CV completo
│   │   ├── myQuestions.js       # Perguntas para entrevistadores
│   │   ├── personalData.js      # Dados pessoais
│   │   ├── principles.js        # Princípios (Amazon LP)
│   │   ├── interviewContexts.js # Contextos de entrevista
│   │   └── questionsToExperiencesMapping.js
│   ├── lib/                     # i18n e utilitários
│   ├── locales/                 # Strings bilíngues
│   └── App.jsx                  # Componente principal
├── public/                      # Assets estáticos
├── .github/workflows/           # GitHub Actions (deploy)
└── package.json
```

### Tecnologias Utilizadas
- **React 19.1.0** com hooks modernos
- **Vite 7.1.9** como bundler
- **Tailwind CSS 4.1.7** + shadcn/ui para UI
- **pnpm 10.18.1** como package manager
- **GitHub Pages** para deploy automático

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### 1. Navegação Principal
- ✅ **Menu lateral (Sidebar)** com 6 seções:
  - Experiences (5 experiências profissionais)
  - Competencies (6 competências técnicas)
  - Profiles (5 perfis personalizados)
  - Icebreaker (quebra-gelo)
  - Speech CV (discursos de CV completo)
  - My Questions (perguntas para entrevistadores)

### 2. Sistema de Busca
- ✅ **Busca Global**: busca em todas as seções simultaneamente
- ✅ **Busca por Seção**: busca contextual dentro da seção ativa
- ✅ **Deep Search**: busca profunda em todo o conteúdo (inclusive nested)
- ✅ **Highlight de resultados**: destaca termos encontrados

### 3. Timer de Entrevista
- ✅ Timer funcional com play/pause/reset
- ✅ Indicador visual quando ativo (pulsação)
- ✅ Formato MM:SS

### 4. Sistema Bilíngue
- ✅ Toggle PT/EN no header
- ✅ Todos os dados estruturados com suporte bilíngue
- ✅ Tradução automática de interface

### 5. Detalhamento de Conteúdo
- ✅ **Experiences**: lista de casos STAR com scores
- ✅ **Competencies**: skills, tools, certifications
- ✅ **Profiles**: elevator pitch, strengths, achievements
- ✅ **Icebreaker**: múltiplas versões de respostas
- ✅ **Speech CV**: discursos estruturados com outline lateral
- ✅ **My Questions**: perguntas categorizadas

---

## ⚠️ PROBLEMAS IDENTIFICADOS E TAREFAS PENDENTES

### 🔴 PRIORIDADE ALTA

#### 1. **Consistência de Dados Bilíngues**
**Problema**: Alguns arquivos de dados têm estruturas inconsistentes entre PT e EN.

**O que precisa ser feito**:
- [ ] Auditar TODOS os arquivos em `src/data/` para garantir que cada campo bilíngue tenha formato `{ pt: "...", en: "..." }`
- [ ] Verificar especialmente:
  - `experiences.js`: campos `title`, `subtitle`, `description`, `keyAchievements`, casos STAR
  - `competencies.js`: `skills`, `tools`, `certifications`
  - `profiles.js`: `elevatorPitch`, `achievements`, `keyStrengths`, `technologies`
  - `icebreaker.js`: `question`, `category`, `versions[].content`
  - `speechFullCV.js`: `content`, `keyPoints`, `tags`
  - `myQuestions.js`: `category`, `questions[].question`, `questions[].context`

**Como fazer**:
```javascript
// ❌ ERRADO
tags: ["tag1", "tag2"]

// ✅ CORRETO
tags: {
  pt: ["tag1", "tag2"],
  en: ["tag1", "tag2"]
}
```

**Arquivo de referência**: Ver `src/lib/i18n.js` para funções `t()` e `tArray()`

---

#### 2. **Validação de Dados**
**Problema**: Não há validação estrutural dos dados na compilação.

**O que precisa ser feito**:
- [ ] Criar script `scripts/validateData.mjs` (já referenciado em package.json)
- [ ] Validar estrutura de cada tipo de dado:
  - Experiences: verificar que todos os casos têm `situation`, `task`, `action`, `result`, `learning`
  - Competencies: verificar arrays de skills/tools/certifications
  - Profiles: verificar elevator pitch e achievements
  - Tags bilíngues: garantir que pt e en existem
- [ ] Adicionar ao pre-commit hook

**Exemplo de validação**:
```javascript
// scripts/validateData.mjs
import { experiencesData } from '../src/data/experiences.js';

const validateBilingual = (field, path) => {
  if (!field || typeof field !== 'object') {
    throw new Error(`${path}: must be an object with pt/en`);
  }
  if (!field.pt || !field.en) {
    throw new Error(`${path}: missing pt or en translation`);
  }
};

// Validar cada experience, competency, profile, etc.
```

---

#### 3. **Acessibilidade (A11y)**
**Problema**: Falta de atributos ARIA e suporte a leitores de tela.

**O que precisa ser feito**:
- [ ] Adicionar `aria-label` em todos os botões sem texto visível
- [ ] Adicionar `role="navigation"` no sidebar
- [ ] Adicionar `role="search"` nas search boxes
- [ ] Garantir navegação por teclado (Tab, Enter, Esc)
- [ ] Testar com leitor de tela (NVDA no Windows, VoiceOver no Mac)
- [ ] Adicionar `alt` text em imagens (logo)
- [ ] Garantir contraste mínimo WCAG 2.1 AA (4.5:1)

**Áreas críticas**:
- `App.jsx:356-401`: Global Search
- `App.jsx:1288-1333`: Section Search
- `App.jsx:405-433`: Sidebar Navigation
- `App.jsx:1338-1362`: Timer controls

---

#### 4. **Dark Mode**
**Problema**: Não há suporte a dark mode (listado no README como pendente).

**O que precisa ser feito**:
- [ ] Instalar e configurar `next-themes` (já está nas dependências)
- [ ] Criar contexto de tema em `src/contexts/ThemeContext.jsx`
- [ ] Adicionar toggle de dark mode no header (ao lado do language toggle)
- [ ] Definir variáveis CSS para cores em modo escuro
- [ ] Atualizar todos os componentes com classes dark:
  - `bg-slate-50` → `bg-slate-50 dark:bg-slate-900`
  - `text-slate-900` → `text-slate-900 dark:text-slate-100`
  - `border-slate-200` → `border-slate-200 dark:border-slate-700`
- [ ] Persistir preferência no localStorage

**Exemplo**:
```jsx
// src/contexts/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

---

### 🟡 PRIORIDADE MÉDIA

#### 5. **PWA (Progressive Web App)**
**Problema**: App não funciona offline e não pode ser instalado.

**O que precisa ser feito**:
- [ ] Adicionar `vite-plugin-pwa` ao projeto
- [ ] Criar `manifest.json` com metadados do app
- [ ] Criar Service Worker para cache de assets
- [ ] Adicionar ícones PWA (192x192, 512x512)
- [ ] Configurar strategy de cache (Cache First para assets, Network First para dados)
- [ ] Testar instalação no mobile e desktop

**Configuração básica**:
```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Leo Interview Prep',
        short_name: 'Leo Interview',
        description: 'Universal Interview Preparation Tool',
        theme_color: '#2563eb',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
};
```

---

#### 6. **Sistema de Favoritos**
**Problema**: Não há como marcar casos ou conteúdos como favoritos (listado no README).

**O que precisa ser feito**:
- [ ] Criar contexto `FavoritesContext` para gerenciar estado global
- [ ] Adicionar botão de favorito (⭐) em cada card/item
- [ ] Persistir favoritos no localStorage
- [ ] Criar seção "Favoritos" no sidebar
- [ ] Permitir filtrar favoritos por seção
- [ ] Adicionar indicador visual de item favoritado

**Estrutura de dados**:
```javascript
// localStorage: 'leo-interview-favorites'
{
  experiences: ['exp-1', 'exp-2-case-3'],
  competencies: ['comp-2'],
  profiles: ['profile-4'],
  // ...
}
```

---

#### 7. **Exportação de Respostas em PDF**
**Problema**: Não há como exportar conteúdo para estudo offline (listado no README).

**O que precisa ser feito**:
- [ ] Instalar biblioteca `jspdf` ou `react-pdf`
- [ ] Criar componente `ExportButton` no header de detalhes
- [ ] Formatar conteúdo STAR para PDF com boa tipografia
- [ ] Incluir logo, nome, data de exportação
- [ ] Permitir exportar:
  - Um caso STAR individual
  - Todos os casos de uma experiência
  - Um perfil completo
  - Um speech CV

**Exemplo de uso**:
```javascript
import jsPDF from 'jspdf';

const exportToPDF = (content, title) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  doc.setFontSize(12);
  // Add content
  doc.save(`${title}.pdf`);
};
```

---

#### 8. **Analytics de Tempo de Resposta**
**Problema**: Timer existe, mas não há tracking de quanto tempo é gasto em cada caso (listado no README).

**O que precisa ser feito**:
- [ ] Criar contexto `TimerAnalyticsContext`
- [ ] Registrar tempo gasto em cada item visualizado
- [ ] Armazenar histórico no localStorage
- [ ] Criar página de Analytics com gráficos:
  - Tempo médio por tipo de caso
  - Casos mais praticados
  - Progressão temporal
- [ ] Usar biblioteca `recharts` (já instalada) para gráficos

**Estrutura de dados**:
```javascript
// localStorage: 'leo-interview-analytics'
{
  sessions: [
    {
      date: '2025-10-11T10:30:00Z',
      section: 'experiences',
      itemId: 'exp-2-case-1',
      duration: 180  // segundos
    }
  ]
}
```

---

### 🟢 PRIORIDADE BAIXA

#### 9. **Modo de Prática com Perguntas Aleatórias**
**Problema**: Não há modo gamificado de prática (listado no README).

**O que precisa ser feito**:
- [ ] Criar seção "Practice Mode" no menu
- [ ] Gerar perguntas aleatórias baseadas em:
  - Amazon Leadership Principles (se usar arquivo `principles.js`)
  - Perguntas comportamentais genéricas
  - Perguntas técnicas por competência
- [ ] Sugerir casos STAR relevantes para cada pergunta
- [ ] Adicionar modo timed (2 minutos por resposta)
- [ ] Mostrar estatísticas ao final da sessão

---

#### 10. **Integração com Calendário**
**Problema**: Não há como agendar sessões de estudo (listado no README).

**O que precisa ser feito**:
- [ ] Adicionar botão "Agendar Estudo" no header
- [ ] Permitir criar eventos com:
  - Seção a estudar
  - Data/hora
  - Duração estimada
- [ ] Persistir no localStorage
- [ ] Adicionar notificações (Web Notifications API)
- [ ] Opcional: integração com Google Calendar via API

---

#### 11. **Internacionalização Avançada (i18n)**
**Problema**: Sistema bilíngue é hardcoded, não escalável para mais idiomas.

**O que precisa ser feito**:
- [ ] Migrar de `src/lib/i18n.js` para biblioteca `react-i18next`
- [ ] Criar arquivos de tradução separados:
  - `locales/pt-BR/translation.json`
  - `locales/en-US/translation.json`
- [ ] Adicionar suporte a mais idiomas (ES, FR, DE?)
- [ ] Detectar idioma do navegador automaticamente
- [ ] Formatar datas/números de acordo com locale

---

#### 12. **Melhorias de Performance**

**O que precisa ser feito**:
- [ ] Adicionar lazy loading para componentes grandes
- [ ] Implementar virtualização para listas longas (react-window)
- [ ] Adicionar debounce nas buscas (atualmente busca a cada tecla)
- [ ] Otimizar re-renders com React.memo e useMemo
- [ ] Adicionar Code Splitting por rota
- [ ] Analisar bundle size com `vite-bundle-visualizer`

**Exemplo de debounce**:
```javascript
import { useMemo } from 'react';
import debounce from 'lodash.debounce';

const debouncedSearch = useMemo(
  () => debounce((query) => {
    // Perform search
  }, 300),
  []
);
```

---

#### 13. **Testes Automatizados**
**Problema**: Cobertura de testes insuficiente (README diz 85%, mas não há evidência).

**O que precisa ser feito**:
- [ ] Expandir testes unitários:
  - Testar funções de busca (`deepSearchAllSections`, `deepSearchCurrentSection`)
  - Testar funções de i18n (`t`, `tArray`)
  - Testar timer logic
- [ ] Adicionar testes de integração:
  - Navegação entre seções
  - Busca e seleção de items
  - Toggle de idioma
- [ ] Adicionar testes E2E com Playwright ou Cypress:
  - Fluxo completo de navegação
  - Busca global → selecionar resultado → voltar
  - Simulação de entrevista com timer
- [ ] Configurar CI para rodar testes automaticamente

**Estrutura de testes**:
```bash
src/
├── components/
│   ├── app/
│   │   ├── Timer.jsx
│   │   └── __tests__/
│   │       └── Timer.test.jsx
│   └── common/
│       ├── ErrorBoundary.jsx
│       └── __tests__/
│           └── ErrorBoundary.test.jsx
└── lib/
    ├── i18n.js
    └── __tests__/
        └── i18n.test.js
```

---

#### 14. **Documentação de Código**

**O que precisa ser feito**:
- [ ] Adicionar JSDoc comments em todas as funções
- [ ] Documentar props de componentes com PropTypes ou TypeScript
- [ ] Criar `CONTRIBUTING.md` com guia de contribuição
- [ ] Documentar estrutura de dados em `docs/DATA_STRUCTURE.md`
- [ ] Adicionar exemplos de uso de cada seção

**Exemplo de JSDoc**:
```javascript
/**
 * Performs deep search across all content sections
 * @param {string} searchQuery - The search term(s) to look for
 * @returns {Array<{item: Object, section: string, excerpt: string, matchScore: number}>}
 */
const deepSearchAllSections = (searchQuery) => {
  // ...
};
```

---

#### 15. **Migração para TypeScript**

**O que precisa ser feito**:
- [ ] Instalar TypeScript e @types/* necessários
- [ ] Configurar `tsconfig.json`
- [ ] Migrar gradualmente:
  1. Utilitários (`src/lib/`)
  2. Contexts
  3. Componentes UI
  4. App.jsx → App.tsx
- [ ] Definir interfaces para dados:
  - `Experience`, `Competency`, `Profile`, `Case`, etc.
- [ ] Garantir type safety em toda a aplicação

**Benefícios**:
- Melhor autocomplete no IDE
- Catch de erros em tempo de desenvolvimento
- Refactoring mais seguro

---

## 🛠️ SCRIPTS E COMANDOS ÚTEIS

### Scripts já configurados
```bash
pnpm run dev          # Servidor de desenvolvimento
pnpm run build        # Build para produção
pnpm run preview      # Preview do build
pnpm run lint         # ESLint
pnpm run test         # Vitest (tests)
pnpm run test:ui      # Vitest UI
pnpm run test:coverage # Coverage report
pnpm run validate:data # Validar estrutura de dados (NÃO IMPLEMENTADO)
pnpm run precommit    # Lint + validate + test (pre-commit hook)
```

### Scripts a criar
```bash
pnpm run validate:data  # Validar estrutura bilíngue dos dados
pnpm run analyze        # Analisar bundle size
pnpm run test:e2e       # Testes end-to-end
pnpm run format         # Prettier (auto-format)
```

---

## 📦 DEPENDÊNCIAS A ADICIONAR

### Prioridade Alta
- [x] `next-themes` (já instalado) - para dark mode
- [ ] Criar script de validação de dados

### Prioridade Média
- [ ] `vite-plugin-pwa` - para PWA
- [ ] `jspdf` ou `react-pdf` - para exportação PDF
- [ ] `lodash.debounce` - para debounce de busca

### Prioridade Baixa
- [ ] `react-i18next` - i18n avançado
- [ ] `react-window` - virtualização de listas
- [ ] `playwright` ou `cypress` - testes E2E
- [ ] `vite-bundle-visualizer` - análise de bundle
- [ ] TypeScript e @types/*

---

## 🚀 ORDEM SUGERIDA DE IMPLEMENTAÇÃO

### Sprint 1 (Semana 1) - Correções Críticas
1. ✅ Auditar e corrigir dados bilíngues em `src/data/`
2. ✅ Criar script de validação de dados
3. ✅ Adicionar validação ao pre-commit hook
4. ✅ Melhorar acessibilidade (ARIA labels, navegação por teclado)

### Sprint 2 (Semana 2) - Dark Mode & UX
1. ✅ Implementar dark mode completo
2. ✅ Adicionar debounce nas buscas
3. ✅ Melhorar feedback visual (loading states)
4. ✅ Testar em diferentes navegadores e devices

### Sprint 3 (Semana 3) - Features de Produtividade
1. ✅ Implementar sistema de favoritos
2. ✅ Adicionar analytics de tempo
3. ✅ Criar página de estatísticas
4. ✅ Melhorar persistência de estado (localStorage)

### Sprint 4 (Semana 4) - PWA & Exportação
1. ✅ Configurar PWA com service worker
2. ✅ Implementar exportação PDF
3. ✅ Adicionar ícones PWA
4. ✅ Testar instalação e offline mode

### Sprint 5+ - Melhorias Contínuas
- Modo de prática com perguntas aleatórias
- Integração com calendário
- Migração para TypeScript
- Testes E2E completos
- Internacionalização avançada

---

## 📝 NOTAS IMPORTANTES PARA O PRÓXIMO AGENTE

### Como Rodar o Projeto
```bash
# Clone e instale
git clone https://github.com/hubdogestor/leo-interview.git
cd leo-interview
pnpm install

# Rode em dev
pnpm run dev
# Acesse: http://localhost:5173

# Build
pnpm run build
pnpm run preview
```

### Estrutura de Dados Bilíngues
**SEMPRE** use este formato:
```javascript
{
  pt: "Texto em português",
  en: "Text in english"
}
```

Para arrays:
```javascript
{
  pt: ["item1", "item2"],
  en: ["item1", "item2"]
}
```

### Funções de i18n
```javascript
import { t, tArray } from './lib/i18n';

// Para strings
const title = t(item.title, language);  // language = 'pt' ou 'en'

// Para arrays
const skills = tArray(item.skills, language);
```

### Onde Estão os Dados
Todos os dados estão em `src/data/`:
- `experiences.js` - 5 experiências profissionais com casos STAR
- `competencies.js` - 6 competências técnicas
- `profiles.js` - 5 perfis personalizados
- `icebreaker.js` - Respostas de quebra-gelo
- `speechFullCV.js` - Discursos de CV completo
- `myQuestions.js` - Perguntas para fazer aos entrevistadores

### Deploy Automático
O projeto usa GitHub Actions (`.github/workflows/deploy.yml`) para deploy automático no GitHub Pages a cada push na branch `master`.

### Contato
- **Autor**: Leonardo Menezes de Souza
- **Email**: leon4rdo@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/menezesleonardo/
- **Repo**: https://github.com/hubdogestor/leo-interview

---

## ✅ CHECKLIST DE VALIDAÇÃO ANTES DE COMMIT

Antes de fazer commit de qualquer mudança, verifique:

- [ ] Dados bilíngues estão no formato correto `{ pt: "...", en: "..." }`
- [ ] Testes passam (`pnpm test`)
- [ ] Lint passa (`pnpm lint`)
- [ ] Build funciona (`pnpm run build`)
- [ ] Testado em PT e EN
- [ ] Testado em desktop e mobile (responsive)
- [ ] Acessibilidade mantida (navegação por teclado)
- [ ] Sem console.log ou código de debug
- [ ] README atualizado se necessário

---

**Última Atualização**: 2025-10-11
**Versão**: 1.0.0
**Status do Projeto**: ✅ Production Ready (com melhorias pendentes)
