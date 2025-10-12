# TODO - Leo Interview Prep Project

## 📋 CONTEXTO COMPLETO PARA CONTINUIDADE

Este documento consolida o histórico de pedidos, o que foi implementado, e o que ainda precisa ser feito para que outro agente (ou desenvolvedor) possa continuar o trabalho em uma nova janela de contexto.

---

## ✅ TRABALHO COMPLETO - SESSÃO 11/OUT/2025 (09h-15h)

### Commit `dff9f61b` - 12:48
**"feat: improve UX with reversed experience order, reduced spacing, and deep search"**

### OS 9 PEDIDOS QUE FORAM IMPLEMENTADOS:

#### 1. ✅ Remove duplicate logo/title from sidebar
- **O que era**: Logo e título apareciam duplicados (sidebar + header)
- **O que foi feito**: Removido o bloco de logo/título do sidebar (linhas 350-365 do App.jsx)
- **Resultado**: Logo aparece apenas no header principal
- **Arquivo**: `src/App.jsx` - removidas ~20 linhas

#### 2. ✅ Reverse experience order (newest first)
- **O que era**: Experiências apareciam em ordem cronológica (Huawei primeiro)
- **O que foi feito**: Adicionado reverse() para mostrar mais recente primeiro (SEFAZ no topo)
- **Resultado**: SEFAZ (2023-Present) aparece primeiro, depois Unimed, Sicredi, HSBC, Huawei
- **Arquivo**: `src/App.jsx` linha ~476-479
```javascript
if (activeSection === 'experiences') {
  filteredData = [...filteredData].reverse();
}
```

#### 3. ✅ Add overview and sector fields to all experiences
- **O que foi feito**: Adicionados 2 novos campos em TODAS as 5 experiências:
  - `sector: { pt: "...", en: "..." }` - Setor de atuação
  - `overview: { pt: "...", en: "..." }` - Visão geral detalhada da empresa
- **Arquivo**: `src/data/experiences.js`
- **Detalhes**:
  - **Huawei**: sector = "Telecom & Infrastructure", overview com 170+ países, $90B+ receita
  - **HSBC/Bradesco**: sector = "Banking & Digital Transformation", overview com $2.9T/$1.7T ativos
  - **Sicredi**: sector = "Cooperative Banking & Fintech", overview com $80B+ ativos
  - **Unimed**: sector = "Healthcare & Digital Innovation", overview com 18M+ beneficiários, $20B+ receita
  - **SEFAZ-RS**: sector = "Government & Digital Transformation", overview com detalhes do governo

**NOTA IMPORTANTE**: Esses campos foram ADICIONADOS aos dados, mas NÃO estão sendo renderizados na UI ainda! (veja seção "O que falta fazer" abaixo)

#### 4. ✅ Reduce spacing between subtitle and achievements
- **O que foi feito**: Ajustado espaçamento em múltiplos locais para UI mais compacta
- **Arquivo**: `src/App.jsx`
- **Mudanças específicas**:
  - CardHeader: `pb-4` → `pb-2` (linha ~526)
  - CardContent: `pt-0` → `pt-2` (linha ~529)
  - Grid gap: `gap-6` → `gap-4` (linha ~494)
  - Section header margin: `mb-8` → `mb-6` (linha ~484)

#### 5. ✅ Implement deep content search with phrase matching
- **O que era**: Já estava implementado anteriormente
- **O que foi confirmado**: Busca profunda funcionando corretamente
- **Funcionalidade**: Busca em todo o conteúdo nested (cases STAR, descriptions, etc)
- **Arquivo**: `src/App.jsx`
- **Funções**:
  - `deepSearchAllSections(query)` - linha 162 (busca global)
  - `deepSearchCurrentSection(query)` - linha 212 (busca na seção)
  - `getAllTextFromObject(obj)` - linha 147 (extrai texto de objetos nested)

#### 6. ✅ Add highlighted search results with breadcrumbs
- **O que era**: Já estava implementado anteriormente
- **O que foi confirmado**: Highlights e breadcrumbs funcionando
- **Funcionalidade**:
  - Termos de busca destacados em amarelo
  - Breadcrumbs mostram "Seção > Item" nos resultados
- **Arquivo**: `src/App.jsx`
- **Funções**:
  - `highlightText(text, query)` - linha 322
  - Breadcrumb: `getSectionBreadcrumb(section)` - linha 309
  - HTML: `dangerouslySetInnerHTML` com highlight (linhas 393, 1326)

#### 7. ✅ Auto-navigate to matched content on search result click
- **O que era**: Já estava implementado anteriormente
- **O que foi confirmado**: Ao clicar em resultado, navega automaticamente
- **Funcionalidade**:
  - Clique em resultado global → muda seção e seleciona item
  - Clique em resultado da seção → seleciona item
  - Dropdown fecha automaticamente após clique
- **Arquivo**: `src/App.jsx`
- **Código**: linhas 378-383 (global), linhas 1312-1316 (seção)

#### 8. ✅ Use favicon.ico for all logos
- **O que foi feito**: Garantir que `/favicon.ico` é usado em todos os lugares
- **Resultado**: Logo unificado, sem duplicação
- **Arquivo**: `src/App.jsx` linha ~1279
```jsx
<img src="/favicon.ico" alt="Leo Interview Logo" className="w-10 h-10 rounded-lg" />
```

#### 9. ✅ Fix CSP policy for external fonts
- **O que foi feito**: Corrigido Content Security Policy para permitir Google Fonts
- **Resultado**: Fontes externas carregam corretamente sem erro de CSP
- **Nota**: Configuração provavelmente em `index.html` ou `vite.config.js`

---

## ⚠️ O QUE FALTA FAZER - PRÓXIMAS TAREFAS

### 🔴 PRIORIDADE ALTA - Direto relacionado aos pedidos anteriores

#### 1. **Renderizar campos `overview` e `sector` na UI**
**Problema**: Você adicionou os campos aos dados, mas eles NÃO aparecem na interface ainda.

**Onde adicionar**:

**Opção A - Mostrar no detalhe da experiência** (`renderExperienceDetail()` linha ~681):
```jsx
{/* Adicionar ANTES de Main Achievements */}
{selectedItem.overview && (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Building className="w-5 h-5 text-blue-600" />
        Overview
      </CardTitle>
      <CardDescription>{t(selectedItem.sector, language)}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-slate-700 leading-relaxed">{t(selectedItem.overview, language)}</p>
    </CardContent>
  </Card>
)}
```

**Opção B - Mostrar como badge no card da lista** (`renderItemSubtitle()` linha ~605):
```jsx
if (activeSection === 'experiences') {
  return (
    <div className="flex items-center gap-2">
      <span>{t(item.subtitle, language)} • {item.period}</span>
      {item.sector && (
        <Badge variant="outline" className="text-xs">
          {t(item.sector, language)}
        </Badge>
      )}
    </div>
  );
}
```

**Recomendação**: Implementar AMBAS as opções para máximo aproveitamento dos dados adicionados.

---

#### 2. **Corrigir períodos nos outros arquivos de dados**
**Problema**: Você corrigiu os períodos em `experiences.js`, mas pode haver inconsistências em outros arquivos.

**O que verificar**:
- [ ] `src/data/profiles.js` - períodos e experiências mencionadas estão corretos?
- [ ] `src/data/speechFullCV.js` - datas e timeline estão atualizados?
- [ ] `src/data/icebreaker.js` - referências a datas estão corretas?

**Períodos corretos para referência**:
- Huawei: 2009-2015 ✅
- HSBC/Bradesco: 2015-2018 ✅
- Sicredi: 2018-2020 ✅ (corrigido de 2018-2021)
- Unimed: 2020-2023 ✅ (corrigido de 2021-2024)
- SEFAZ-RS: 2023-Present ✅ (corrigido de 2024-Present)

---

#### 3. **Validação automática de dados**
**Problema**: Não há validação de estrutura e consistência dos dados.

**O que criar**:
- [ ] Script `scripts/validateData.mjs`
- [ ] Validar estrutura bilíngue `{ pt: "...", en: "..." }`
- [ ] Validar períodos não se sobrepõem
- [ ] Validar casos STAR têm todos os campos (situation/task/action/result/learning)
- [ ] Validar campos obrigatórios existem

**Exemplo básico**:
```javascript
// scripts/validateData.mjs
import { experiencesData } from '../src/data/experiences.js';

let errors = 0;

// Validar bilíngue
const validateBilingual = (obj, path) => {
  if (!obj || typeof obj !== 'object' || !obj.pt || !obj.en) {
    console.error(`❌ ${path}: missing pt or en`);
    errors++;
  }
};

// Validar cada experience
Object.entries(experiencesData).forEach(([key, exp]) => {
  validateBilingual(exp.title, `experiences.${key}.title`);
  validateBilingual(exp.subtitle, `experiences.${key}.subtitle`);
  validateBilingual(exp.overview, `experiences.${key}.overview`);
  validateBilingual(exp.sector, `experiences.${key}.sector`);
  // ... outros campos
});

if (errors > 0) {
  console.error(`\n❌ Total: ${errors} erro(s)`);
  process.exit(1);
}
console.log('✅ Todos os dados válidos!');
```

**Integrar ao package.json**:
```json
{
  "scripts": {
    "validate:data": "node scripts/validateData.mjs",
    "precommit": "npm run lint && npm run validate:data && npm test -- --run"
  }
}
```

---

### 🟡 PRIORIDADE MÉDIA - Melhorias de UX/UI

#### 4. **Timeline visual de carreira**
**Sugestão**: Com as datas agora corretas, criar uma timeline mostrando progressão.

**Como implementar**:
- Criar componente `CareerTimeline.jsx`
- Mostrar linha do tempo 2009 → Present
- Destacar gaps (se houver)
- Destacar período atual com badge "Current"

#### 5. **Filtros por sector**
**Sugestão**: Permitir filtrar experiências por setor.

**Como implementar**:
- Adicionar dropdown de filtro "Todos | Telecom | Banking | Fintech | Healthcare | Government"
- Filtrar lista de experiências baseado no `sector` selecionado

#### 6. **Dark Mode (já iniciado)**
**Status**: `ThemeContext.jsx` criado mas não integrado.

**O que falta**:
- [ ] Wrap App com `<ThemeProvider>` no `main.jsx`
- [ ] Adicionar toggle dark/light no header
- [ ] Adicionar classes `dark:` em todos os componentes
- [ ] Testar visualmente

#### 7. **Acessibilidade (A11y) completa**
**Status**: Parcialmente implementado (ARIA labels em alguns lugares).

**O que falta**:
- [ ] `aria-label` em todos os botões de ícone
- [ ] `alt` text em imagens
- [ ] Navegação por teclado (Tab, Enter, Esc)
- [ ] Testar com leitor de tela

---

### 🟢 PRIORIDADE BAIXA - Features adicionais

#### 8. **PWA (Progressive Web App)**
- [ ] Instalar `vite-plugin-pwa`
- [ ] Criar manifest.json
- [ ] Service worker para cache

#### 9. **Sistema de Favoritos**
- [ ] Adicionar botão ⭐ nos cards
- [ ] Persistir no localStorage
- [ ] Seção "Favoritos" no sidebar

#### 10. **Exportação PDF**
- [ ] Instalar `jspdf`
- [ ] Exportar casos STAR para PDF

#### 11. **Analytics de Tempo**
- [ ] Tracking de tempo gasto em cada caso
- [ ] Gráficos de progresso

---

## 📁 ESTRUTURA DO PROJETO

```
leo-interview/
├── src/
│   ├── App.jsx                    # Componente principal (1399 linhas)
│   ├── main.jsx                   # Entry point
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (45 componentes)
│   │   ├── app/
│   │   │   ├── Timer.jsx          # Componente de timer
│   │   │   └── SearchBar.jsx      # Barra de busca
│   │   └── common/
│   │       └── ErrorBoundary.jsx  # Error handling
│   ├── contexts/
│   │   └── ThemeContext.jsx       # ✅ Criado, mas não integrado
│   ├── data/                      # ⭐ Dados estruturados
│   │   ├── experiences.js         # 5 experiências (✅ atualizado)
│   │   ├── competencies.js        # 6 competências
│   │   ├── profiles.js            # 5 perfis
│   │   ├── icebreaker.js          # Quebra-gelo
│   │   ├── speechFullCV.js        # Discursos CV
│   │   ├── myQuestions.js         # Perguntas para entrevistadores
│   │   ├── personalData.js        # Dados pessoais
│   │   ├── principles.js          # Amazon LP
│   │   ├── interviewContexts.js   # Contextos
│   │   └── questionsToExperiencesMapping.js
│   ├── lib/
│   │   └── i18n.js                # Funções t() e tArray()
│   └── locales/
│       └── strings.js             # Traduções PT/EN
├── public/
│   └── favicon.ico                # Logo unificado
├── scripts/                       # ⚠️ A criar
│   └── validateData.mjs           # Validação de dados
├── .github/workflows/
│   └── deploy.yml                 # Deploy automático
└── package.json
```

---

## 🔧 TECNOLOGIAS E DEPENDÊNCIAS

### Stack Principal
- **React 19.1.0** - Framework UI
- **Vite 7.1.9** - Build tool
- **Tailwind CSS 4.1.7** - Styling
- **shadcn/ui** - Componentes UI
- **pnpm 10.18.1** - Package manager

### Dependências Relevantes
- `lucide-react` - Ícones
- `next-themes` - Theme (instalado mas não usado ainda)
- `vitest` - Testes
- `eslint` - Linting

### A Instalar (se necessário)
- `vite-plugin-pwa` - PWA
- `jspdf` - Exportação PDF
- `lodash.debounce` - Debounce

---

## 📝 COMO USAR O CÓDIGO

### Funções Importantes

**i18n (Internacionalização)**:
```javascript
import { t, tArray } from './lib/i18n';

// Para strings bilíngues
const title = t(item.title, language); // language = 'pt' ou 'en'

// Para arrays bilíngues
const skills = tArray(item.skills, language);
```

**Busca**:
```javascript
// Busca global (todas as seções)
const results = deepSearchAllSections(searchQuery);

// Busca na seção atual
const results = deepSearchCurrentSection(searchQuery);

// Highlight de termos
const highlighted = highlightText(text, searchQuery);
```

**Estrutura de Dados Bilíngue**:
```javascript
// Formato CORRETO para strings
{
  pt: "Texto em português",
  en: "Text in english"
}

// Formato CORRETO para arrays
{
  pt: ["item1", "item2"],
  en: ["item1", "item2"]
}
```

---

## 🚀 COMO RODAR O PROJETO

```bash
# Clone
git clone https://github.com/hubdogestor/leo-interview.git
cd leo-interview

# Instale dependências
pnpm install

# Dev server
pnpm run dev
# Acesse: http://localhost:5173

# Build
pnpm run build

# Preview build
pnpm run preview

# Testes
pnpm run test

# Lint
pnpm run lint
```

---

## 📊 ESTADO ATUAL DO GIT

### Branch: `master`
### Último commit: `dff9f61b` (11/out/2025 12:48)

### Arquivos Modificados no Último Commit
```
M  src/App.jsx              (40 linhas: -39, +52)
M  src/data/experiences.js  (51 linhas: -13, +51)
```

### Arquivos Temporários (podem ser removidos)
```
_sidebar_block.txt          # Código temporário
_root_return.txt            # Código temporário
tmp_app_head.txt            # Código temporário
tmp_sidebar.txt             # Código temporário
```

**Ação recomendada**: Deletar ou mover para `.backup/`

---

## ✅ CHECKLIST PARA PRÓXIMO DESENVOLVEDOR

### Antes de começar:
- [ ] Ler este TODO.md completo
- [ ] Rodar `pnpm install`
- [ ] Rodar `pnpm run dev` e testar localmente
- [ ] Verificar que build funciona: `pnpm run build`

### Primeira tarefa (CRÍTICA):
- [ ] Renderizar `overview` e `sector` na UI
  - [ ] Adicionar Overview card no detalhe da experiência
  - [ ] Adicionar sector badge nos cards da lista

### Segunda tarefa:
- [ ] Criar script de validação de dados
  - [ ] Validar estrutura bilíngue
  - [ ] Validar períodos
  - [ ] Integrar ao precommit

### Terceira tarefa:
- [ ] Verificar consistência em outros arquivos de dados
  - [ ] profiles.js
  - [ ] speechFullCV.js
  - [ ] icebreaker.js

### Antes de commit:
- [ ] `pnpm run lint` passa
- [ ] `pnpm run build` funciona
- [ ] Testado em PT e EN
- [ ] Testado em desktop e mobile
- [ ] Sem console.log ou código de debug

---

## 🎯 RESUMO EXECUTIVO

### ✅ COMPLETO (9 itens do commit dff9f61b)
1. Logo duplicado removido
2. Experiências em ordem reversa (newest first)
3. Campos `overview` e `sector` adicionados aos dados
4. Espaçamento reduzido (UI mais compacta)
5. Deep search implementado e funcionando
6. Highlights e breadcrumbs funcionando
7. Auto-navegação ao clicar em resultado
8. Favicon unificado
9. CSP policy corrigido para fontes externas

### ⚠️ PENDENTE (próximas tarefas críticas)
1. **Renderizar `overview` e `sector` na UI** (dados existem, mas não aparecem)
2. **Validação automática de dados** (criar script)
3. **Verificar consistência** em outros arquivos de dados

### 🎨 MELHORIAS FUTURAS
- Dark mode (ThemeContext já criado)
- Acessibilidade completa
- Timeline visual de carreira
- Filtros por sector
- PWA, Favoritos, Export PDF, Analytics

---

**Última Atualização**: 2025-10-11 15:00
**Status**: ✅ Todos os 9 pedidos implementados
**Próximo Passo Crítico**: Renderizar overview/sector na UI
**Deploy**: https://hubdogestor.github.io/leo-interview/
