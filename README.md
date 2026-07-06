# WB Digital — Interactive 3D Website

An **interactive 3D marketing site** built with Next.js and React Three Fiber — custom GLSL shaders, GLTF scenes, post-processing and physics, choreographed with GSAP.

🔗 **Live demo:** https://www.wbdigitalsolutions.com

[![CI](https://github.com/wbrunovieira/wbdigitalsolutionsnextjsthreejs/actions/workflows/ci.yml/badge.svg)](https://github.com/wbrunovieira/wbdigitalsolutionsnextjsthreejs/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-black?logo=react&logoColor=61DAFB)
![GLSL](https://img.shields.io/badge/GLSL-shaders-5586A4)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## ✨ 3D in motion

| Home — orbiting hero | Hyperspace tunnel | Virtual 3D office |
|:--:|:--:|:--:|
| ![Home 3D hero](docs/media/hero-3d.gif) | ![Hyperspace tunnel](docs/media/tunnel-3d.gif) | ![Virtual 3D office](docs/media/office-3d.gif) |

> Live: **[wbdigitalsolutions.com](https://www.wbdigitalsolutions.com)** · immersive routes `/3d-tunnel` and `/3d-showcase`

## Highlights

- **React Three Fiber + Three.js** — declarative 3D scenes: an office showcase, an animated tunnel (with an enhanced variant), and a "canvas text masterclass" scene.
- **Custom GLSL shaders** — hand-written vertex/fragment shaders, including a **GPU simulation pass** (`simVertex.glsl` / `simFragment.glsl`).
- **Post-processing & physics** — effects via `@react-three/postprocessing` and rigid-body physics via `@react-three/rapier`.
- **GLTF models** — desktop and planet scenes loaded through Drei.
- **Motion** — GSAP and Framer Motion for scroll-driven and UI animation.
- **Robust, performance-minded canvas** — preloaded / pauseable canvases and a WebGL error boundary.

## Tech stack

Next.js · React · TypeScript · **Three.js** · @react-three/fiber · @react-three/drei · @react-three/postprocessing · @react-three/rapier · @react-spring/three · **GLSL** · GSAP · Framer Motion · Tailwind CSS · Vercel

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```
