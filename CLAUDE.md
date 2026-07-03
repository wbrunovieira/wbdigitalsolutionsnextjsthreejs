# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 application for WB Digital Solutions with extensive 3D graphics (Three.js/React Three Fiber), multilingual support (4 languages), and integrated chatbot. Uses **Pages Router** (not App Router).

## Commands

```bash
# Always use pnpm, not npm or yarn
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Build for production (includes TypeScript checking)
pnpm start            # Start production server
pnpm lint             # Run ESLint with auto-fix
```

No test suite exists in this project.

## Architecture

### Key Technologies
- Next.js 15 with Pages Router, React 18, TypeScript (strict mode)
- Three.js with React Three Fiber + Drei for 3D graphics
- Tailwind CSS + ShadCN UI for styling
- Framer Motion + GSAP + React Spring for animations
- Zustand for global state management

### Core Structure
- `src/pages/` - Next.js Pages Router (includes `api/` routes)
- `src/components/` - React components including `canvas/` for 3D, `ui/` for ShadCN
- `src/contexts/` - LanguageContext + TranslationContext for i18n
- `src/locales/` - Translation JSON files (`en.json`, `es.json`, `it.json`, `ptbr.json`)
- `src/stores/` - Zustand stores
- `src/hooks/` - Custom React hooks
- `src/lib/`, `src/utils/`, `src/constants/`, `src/types/` - Utilities and type definitions
- `public/models/` - 3D models (.glb/.gltf files)

### Internationalization (Custom Implementation)

**Not** using next-i18next. Custom contexts handle language detection and translations:

1. **LanguageContext** - Detects browser language, persists to localStorage. Supports: `en`, `es`, `it`, `pt-BR`
2. **TranslationContext** - Provides translations via `useTranslations()` hook (returns the full message object)
3. **Translation files** - Main: `src/locales/{en,es,it,ptbr}.json`, Blog: `src/locales/blog/{en,es,it,ptbr}/`

**Critical**: When adding translatable text, update ALL 4 locale files (`en.json`, `es.json`, `it.json`, `ptbr.json`). A legacy `pt.json` exists but is superseded by `ptbr.json`.

### Layout System

`Layout.tsx` wraps all pages with Nav + Footer + ChatBot (max-width: 1400px).

**Exceptions**: `/3d-showcase` and `/3d-tunnel` bypass layout entirely for full-screen 3D experiences. To add new exceptions, modify the pathname check in `Layout.tsx`.

### 3D Experience Module

The largest module lives at `src/components/3d-experience/` with its own internal structure:
- `ExperiencePlatform.tsx` — root component
- `HubCentral/` — hub navigation
- `experiences/` — individual experience modules
- `guided/` — guided tour flows
- `navigation/` — navigation UI
- `contexts/` — module-local React contexts
- `ui/`, `constants/`, `index.ts`

### ChatBot Integration

Frontend sends enriched context to backend API:
- Payload: `{ message, user_id, language, current_page, page_url, timestamp }`
- Endpoints: Dev `http://localhost:8000`, Production `https://chatbot.wbdigitalsolutions.com`
- See `CHATBOT_API_INFO.md` for full specification

### CSP Headers

`next.config.js` defines Content Security Policy and all security headers. When adding external scripts/APIs, update the CSP allowlist. Note: `unsafe-inline` and `unsafe-eval` are required in `script-src` due to Google Tag Manager, Facebook Pixel, and Microsoft Clarity.

## Design System

### Color Palette
- Primary: `#350545` (dark purple)
- Custom purple: `#792990`
- Yellow: `#ffb947`
- Secondary: `#aaa6c3`

### Fonts
- Sans: Plus Jakarta Sans
- Mono: Ubuntu Mono

### Custom Gradients
- `bg-custom-gradient` - Radial gradient for backgrounds
- `bg-modern-gradient` - Linear purple gradient

### Styling / CSS Architecture
- **Component styles live in co-located CSS Modules** (`Component.module.css`), imported as `import styles from './Component.module.css'`. Examples: `Button.module.css`, `Nav.module.css`, `InfiniteScrollHash.module.css`.
- **`src/styles/global.css` is base-only** (~55 lines): `@tailwind` directives, `:root` tokens (`--yellowcustom`, `--purplecustom`, `--purplecustondark`), `html/body` base, canvas-transparent helpers, and shared keyframes referenced via Tailwind arbitrary animations (e.g. `animate-[wb-fadeup_...]`, `animate-[wb-loadbar_...]`).
- **Never add component styles to `global.css`.** New styling goes in a CSS Module or Tailwind. Complex pseudo-element/keyframe animations (too unwieldy inline) belong in the module.
- Prefer dark text (`#350545`) on yellow fills for AAA contrast; mirror `:hover` affordances with `:focus-visible` and gate motion behind `prefers-reduced-motion`.

## Code Quality (Clean Code)

1. **Max 200 lines per file** for pages, components and logic (hooks, utils). When a file grows past that, split by responsibility: extract subcomponents (`*Backdrop`, `*Item`, `*Card`, `*Intro`, `*Mobile`), hooks (`use*`) or local pieces — pixel-identical, no behavior change. **Exempt: pure data/content files** (`src/content/*.ts`, locale JSONs) — they are Records, not complexity.

2. **Single responsibility per file/component.** A nav shouldn't also own its mobile overlay and scroll-spy logic; a hero shouldn't own its decorative background. Name extractions after what they are.

3. **No duplication.** Repeated markup inside a file becomes a local subcomponent; repeated values become named tokens/constants (palettes, class strings, magic numbers like intervals live in `const NAME`). Never leave dead code — delete orphaned files (git keeps history).

4. **Tokens over magic values.** Colors/alphas via theme helpers (e.g. `ink(alpha)`, `light(alpha)` in the CV themes), shared class strings exported once, stable ids/keys in a single source (e.g. `NAV_SECTIONS` drives nav + scroll-spy + anchors).

5. **i18n completeness.** Any user-facing string lives in a `Record<CVLang, ...>` (or locale JSON) covering ALL 4 locales — including `aria-label`s. TypeScript's `Record` catches missing locales at compile time.

6. **A11y & motion.** `aria-hidden` on decorations, `aria-label`/`aria-current`/`aria-pressed` where relevant, visible `focus-visible` rings; every animation gated by `useReducedMotion`/`motion-safe` with an information-preserving fallback; animate transform/opacity only (never layout props like `width`).

7. **CV pages independence** (`/vendas` = `Sales*` files, `/dev` = `Dev*` files): copy patterns between them, never share modules — a change in one page must never affect the other. Shared *content* (`src/content/cv.ts`, locale JSONs) is fine.

8. **Validation**: `npx tsc --noEmit` after every change. NEVER run `pnpm build` while a dev server may be running (corrupts `.next`).

9. **Typography of copy**: no em-dashes (—) in any user-facing text; use commas, colons or periods.

## Development Notes

1. **3D Performance**: Dispose Three.js geometries/materials to prevent memory leaks. Test on mobile.

2. **Path Alias**: Use `@/*` for imports from `./src/*`

3. **API Routes**: `send-email.ts` uses nodemailer (server-side only). SMTP credentials in `.env`.

4. **Analytics**: GA, Clarity, Facebook Pixel, Pipedrive configured in `_document.tsx`

5. **Docker**: `Dockerfile` and `docker-compose.yaml` are available for containerized deployment.
