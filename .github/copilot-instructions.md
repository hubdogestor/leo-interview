# Leo Interview Prep - AI Coding Guidelines

## Project Overview
Universal interview preparation tool built with React 19 + Vite, featuring Leonardo Menezes' 15+ years of professional experience across telecom, banking, healthcare, and government sectors.

## Architecture & Data Flow

### Bilingual Data Structure
All user-facing content uses bilingual objects: `{pt: string, en: string}`. Always provide both languages.

**Example from `src/data/experiences.js`:**
```javascript
title: { pt: 'Huawei', en: 'Huawei' },
summary: {
  pt: 'Líder global em TIC...',
  en: 'Global ICT leader...'
}
```

### STAR Methodology
Experience cases follow Situation-Task-Action-Result-Learning structure with bilingual content and scoring (80-98).

**Example case structure:**
```javascript
{
  id: 'case-id',
  title: { pt: '...', en: '...' },
  situation: { pt: '...', en: '...' },
  task: { pt: '...', en: '...' },
  action: { pt: '...', en: '...' },
  result: { pt: '...', en: '...' },
  learning: { pt: '...', en: '...' },
  tags: { pt: ['tag1'], en: ['tag1'] },
  score: 95
}
```

## Developer Workflows

### Build & Development
```bash
pnpm install          # Install dependencies
pnpm run dev         # Start dev server (Vite)
pnpm run build       # Production build
pnpm run preview     # Preview production build
```

### Testing & Quality
```bash
pnpm run test              # Run tests (Vitest)
pnpm run test:coverage     # Run with coverage
pnpm run test:ui          # Run with UI
pnpm run lint             # ESLint check
pnpm run validate:data    # Custom data validation
```

### Pre-commit Hook
```bash
pnpm run precommit  # Runs lint + validate:data + tests
```

## Coding Conventions

### Internationalization (i18n)
Use `t()` and `tArray()` from `src/lib/i18n.js` for bilingual content resolution with fallback logic.

**Examples:**
```javascript
import { t, tArray } from './lib/i18n';

// Single text
const title = t(item.title, language);

// Array content
const achievements = tArray(item.keyAchievements, language);
```

### Custom Hooks
Follow established patterns in `src/hooks/`:
- `useDebounce` for search optimization
- `useOptimizedSearch` for filtered data
- `useHighlight` for UI interactions
- `usePrinciplesData` for data loading

### Component Patterns
- Use shadcn/ui components from `src/components/ui/`
- Follow established timer patterns (see `App.jsx` lines 25-60)
- Implement error boundaries for robustness
- Use `ScrollArea` for long content sections

### Data Validation
Run `scripts/validateData.mjs` to ensure:
- Bilingual fields have both `pt` and `en` content
- Array lengths match between languages
- Required fields are present
- No empty strings in bilingual content

### Search Implementation
Use debounced search with bilingual support (see `App.jsx` lines 70-95):
- Search across `title`, `subtitle`, `summary`, `description`, `question`, `category`
- Handle both string and bilingual field types
- Support tag arrays in both formats: `string[]` and `{pt: [], en: []}`

## Key Files & Directories

### Data Structure
- `src/data/experiences.js` - 5 professional experiences with STAR cases
- `src/data/competencies.js` - 6 technical competencies
- `src/data/profiles.js` - 5 role-specific profiles
- `src/data/personalData.js` - Personal information
- `src/data/speechFullCV.js` - Full CV speech content

### Core Components
- `src/App.jsx` - Main application component (998 lines)
- `src/components/ui/` - shadcn/ui component library
- `src/hooks/` - Custom React hooks
- `src/lib/i18n.js` - Internationalization utilities

### Configuration
- `vite.config.js` - Vite config with alias `@/src`
- `eslint.config.js` - ESLint with React rules
- `vitest.config.js` - Test configuration
- `tailwind.config.js` - Tailwind CSS setup

## Deployment
GitHub Pages deployment via `.github/workflows/deploy.yml`:
- Triggers on `master` branch pushes
- Builds with Node 18 + pnpm
- Deploys from `dist/` directory
- Base path: `/leo-interview/`

## Testing Strategy
- Vitest for unit tests
- Testing Library for React components
- Custom data validation scripts
- Coverage reporting
- Pre-commit quality gates

## Performance Considerations
- Debounced search (300ms default)
- Memoized filtering operations
- Optimized re-renders with proper dependencies
- Timer implementation avoids recreating intervals