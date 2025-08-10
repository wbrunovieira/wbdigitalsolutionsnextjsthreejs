# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for WB Digital Solutions, featuring extensive 3D graphics with Three.js, multilingual support, and a sophisticated component architecture. The project uses the Pages Router (not App Router).

## Critical Issue

**⚠️ IMPORTANT**: The `package.json` file is currently corrupted. Before running any commands, you need to reconstruct it from `pnpm-lock.yaml`. The project uses **pnpm** as the package manager.

## Common Commands

```bash
# Install dependencies (after fixing package.json)
pnpm install

# Development
pnpm dev        # Start development server on http://localhost:3000

# Build and Production
pnpm build      # Build for production
pnpm start      # Start production server

# Code Quality
pnpm lint       # Run ESLint
pnpm type-check # TypeScript type checking
```

## Architecture

### Technology Stack
- **Next.js 15.0.3** with Pages Router
- **React 18.3.1** with TypeScript 5.7.3
- **Three.js 0.170.0** with React Three Fiber for 3D graphics
- **Tailwind CSS 3.4.17** for styling
- **Framer Motion 11.18.2** and **GSAP 3.12.7** for animations

### Project Structure
- `/src/pages/` - Next.js pages using Pages Router pattern
- `/src/components/` - 70+ React components organized by feature
- `/src/components/canvas/` - Three.js/R3F components
- `/src/contexts/` - Language and Translation contexts for i18n
- `/src/locales/` - Translation files for EN, ES, IT, PT-BR
- `/public/models/` - 3D models (.glb/.gltf files)

### Internationalization System
The project uses a custom i18n implementation:
- `LanguageContext.tsx` handles language detection and persistence
- `TranslationContext.tsx` provides translations throughout the app
- Translation files are JSON-based in `/src/locales/`
- Blog content has separate translations in `/src/locales/blog/`

### Key Architectural Patterns
1. **Provider Pattern**: Language and Translation contexts wrap the app in `_app.tsx`
2. **3D Integration**: Canvas components use React Three Fiber for declarative Three.js
3. **Component Composition**: Modular components with clear separation between UI, business logic, and 3D elements
4. **Dynamic Routing**: Blog uses dynamic routes with `[id].tsx`

### Styling Approach
- Tailwind CSS with custom configuration
- Custom color palette: Purple theme (#350545, #792990, #ffb947)
- ShadCN UI components integrated
- Mobile-first responsive design

## Important Files to Know

- `/src/pages/_app.tsx` - Main app wrapper with providers
- `/src/components/Layout.tsx` - Main layout component
- `/src/contexts/LanguageContext.tsx` - Language management
- `/src/contexts/TranslationContext.tsx` - Translation provider
- `next.config.js` - Next.js configuration with CSP settings

## Development Notes

1. **3D Performance**: When working with Three.js components, ensure proper disposal of geometries and materials to prevent memory leaks
2. **Translations**: When adding new text, update all locale files in `/src/locales/`
3. **Type Safety**: The project uses strict TypeScript - run `pnpm type-check` before committing
4. **Package Manager**: Always use `pnpm`, not npm or yarn