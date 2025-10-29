# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for WB Digital Solutions, featuring extensive 3D graphics with Three.js, multilingual support, and a sophisticated component architecture. The project uses the **Pages Router** (not App Router).

## Common Commands

```bash
# Package Manager: Always use pnpm, not npm or yarn
pnpm install

# Development
pnpm dev        # Start dev server on http://localhost:3000

# Build and Production
pnpm build      # Build for production
pnpm start      # Start production server

# Code Quality
pnpm lint       # Run ESLint with auto-fix
```

**Note**: There is no dedicated `type-check` script. TypeScript checking happens during `pnpm build`.

## Architecture

### Technology Stack
- **Next.js 15.0.3** with Pages Router
- **React 18.3.1** with TypeScript 5.7.2
- **Three.js 0.170.0** with React Three Fiber (@react-three/fiber ^8.17.10)
- **React Three Drei ^9.117.3** - Helper components for R3F
- **Tailwind CSS ^3.4.15** for styling
- **Framer Motion ^11.11.17** and **GSAP ^3.12.5** for animations

### Project Structure

```
src/
├── pages/              # Next.js Pages Router
│   ├── _app.tsx        # App wrapper with LanguageProvider + TranslationProvider
│   ├── _document.tsx   # HTML document with analytics scripts (GA, Clarity, FB Pixel)
│   ├── index.tsx       # Home page
│   ├── api/            # API routes (send-email, newsletter, sitemap.xml)
│   ├── blog/           # Blog pages with dynamic [id] route
│   ├── 3d-showcase/    # 3D showcase page (no layout)
│   └── 3d-tunnel/      # 3D tunnel page (no layout)
├── components/         # 80+ React components
│   ├── Layout.tsx      # Main layout (Nav + Footer + ChatBot), skipped for 3D pages
│   ├── canvas/         # Three.js/R3F components (Ball, ComputersCanvas, Earth)
│   ├── 3d-showcase/    # 3D showcase specific components (OfficeScene, etc.)
│   └── ui/             # UI components (ShadCN-based)
├── contexts/           # React contexts
│   ├── LanguageContext.tsx      # Language detection, localStorage persistence
│   └── TranslationContext.tsx   # Translation provider
├── locales/            # Translation files
│   ├── en.json         # English translations
│   ├── es.json         # Spanish translations
│   ├── it.json         # Italian translations
│   ├── ptbr.json       # Brazilian Portuguese translations
│   └── blog/           # Blog-specific translations per language
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

### Internationalization (i18n)

The project uses a **custom i18n implementation** (not next-i18next or similar):

1. **LanguageContext** (`src/contexts/LanguageContext.tsx`):
   - Detects browser language on first visit
   - Stores language preference in `localStorage`
   - Supports: `en`, `es`, `it`, `pt-BR`
   - Legacy "pt" is automatically migrated to "pt-BR"

2. **TranslationContext** (`src/contexts/TranslationContext.tsx`):
   - Loads translation JSON files from `/src/locales/`
   - Provides `t()` function for translations throughout the app

3. **Translation Files**:
   - Main translations: `/src/locales/{en,es,it,ptbr}.json`
   - Blog translations: `/src/locales/blog/{language}/` directory structure
   - **Important**: When adding new text, update ALL language files

4. **Provider Setup** in `_app.tsx`:
   ```tsx
   <LanguageProvider>
     <TranslationProvider>
       <Layout>
         <Component {...pageProps} />
       </Layout>
     </TranslationProvider>
   </LanguageProvider>
   ```

### Key Architectural Patterns

1. **Layout System** (`Layout.tsx`):
   - Conditionally renders Nav + Footer + ChatBot
   - Special handling: 3D showcase (`/3d-showcase`) and tunnel (`/3d-tunnel`) pages bypass layout entirely
   - Max width: 1400px

2. **3D Integration**:
   - React Three Fiber for declarative Three.js
   - 3D models in `/public/models/` (.glb/.gltf files)
   - Canvas components in `src/components/canvas/`
   - Special 3D pages have dedicated component structures in `src/components/3d-showcase/` and `src/components/3d-tunnel/`

3. **API Routes** (`src/pages/api/`):
   - `send-email.ts` - Contact form using nodemailer
   - `newsletter.ts` - Newsletter subscription
   - `sitemap.xml.ts` - Dynamic sitemap generation

4. **Analytics Integration** (_document.tsx):
   - Google Analytics (GA_TRACKING_ID: G-PZ3WX1KF35)
   - Microsoft Clarity
   - Facebook Pixel
   - Pipedrive tracking

5. **ChatBot Integration**:
   - ChatBotButton component in Layout
   - Sends enriched context to backend API (see `CHATBOT_API_INFO.md`)
   - Payload includes: user_id, language, current_page, page_url, timestamp
   - Backend endpoints:
     - Dev: `http://localhost:8000`
     - Production: `https://chatbot.wbdigitalsolutions.com`

### Styling Approach

- **Tailwind CSS** with custom configuration (`tailwind.config.ts`)
- **Color Palette**:
  - Primary: `#350545` (dark purple)
  - Custom purple: `#792990`
  - Yellow custom: `#ffb947`
  - Secondary: `#aaa6c3`
- **Custom Gradients**:
  - `bg-custom-gradient` - Radial gradient for backgrounds
  - `bg-modern-gradient` - Linear purple gradient
- **Fonts**:
  - Sans: Plus Jakarta Sans
  - Mono: Ubuntu Mono
- **ShadCN UI** components integrated
- **Custom animations** defined in Tailwind config (spin-clockwise, fade-in, accordion, etc.)

### Next.js Configuration

`next.config.js` includes:
- **CSP (Content Security Policy)** headers with extensive allowlist for:
  - Analytics (GA, Clarity, Facebook)
  - Chatbot API endpoints (localhost + production)
  - Font sources (Google Fonts)
- **Webpack config**:
  - Server-side: Externalizes `nodemailer`
  - Client-side: Fallback polyfills disabled for fs, net, tls, dns, child_process
- **Rewrites**: `/sitemap.xml` → `/api/sitemap.xml`

### TypeScript Configuration

- **Strict mode enabled** (`strict: true`)
- **Path alias**: `@/*` maps to `./src/*`
- **Target**: ES6
- **Module system**: CommonJS with Node resolution
- **JSX**: Preserved (handled by Next.js)

## Important Development Notes

1. **3D Performance**:
   - Always dispose of Three.js geometries and materials to prevent memory leaks
   - Use React Three Fiber's cleanup mechanisms
   - Test on mobile devices for performance

2. **Translation Workflow**:
   - When adding new translatable text, update ALL locale files: `en.json`, `es.json`, `it.json`, `ptbr.json`
   - Blog translations are separate in `/src/locales/blog/{language}/`
   - Use the `useTranslation()` hook from TranslationContext

3. **Type Safety**:
   - Project uses strict TypeScript
   - Type checking happens during build (`pnpm build`)
   - No standalone type-check script

4. **Package Manager**:
   - **Always use `pnpm`**, not npm or yarn
   - Dependencies are locked in `pnpm-lock.yaml`

5. **CSP Headers**:
   - When adding external scripts or APIs, update CSP in `next.config.js`
   - Current CSP allows chatbot, analytics, and font sources

6. **Layout Exceptions**:
   - If creating full-screen 3D experiences, add pathname check in `Layout.tsx` to bypass layout
   - Current exceptions: `/3d-showcase`, `/3d-tunnel`

7. **Email Configuration**:
   - Contact form uses nodemailer (server-side only)
   - Check `.env` for SMTP credentials (`.env.example` for reference)

8. **Chatbot Integration**:
   - Frontend sends enriched context (language, page, user_id) to backend
   - See `CHATBOT_API_INFO.md` for full payload specification
   - CSP allows both dev (localhost:8000) and production chatbot URLs