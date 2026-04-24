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

## Development Notes

1. **3D Performance**: Dispose Three.js geometries/materials to prevent memory leaks. Test on mobile.

2. **Path Alias**: Use `@/*` for imports from `./src/*`

3. **API Routes**: `send-email.ts` uses nodemailer (server-side only). SMTP credentials in `.env`.

4. **Analytics**: GA, Clarity, Facebook Pixel, Pipedrive configured in `_document.tsx`

5. **Docker**: `Dockerfile` and `docker-compose.yaml` are available for containerized deployment.
