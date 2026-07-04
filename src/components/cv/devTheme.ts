/**
 * Shared theme + helpers for the DEV CV page (/dev → brunodev.wbdigitalsolutions.com).
 *
 * Deliberately independent from salesTheme.ts: the sales and dev pages evolve
 * separately (edits to one must never leak into the other), so the pattern is
 * COPIED here and adapted, not imported. Identity: DARK graphite (developers'
 * native habitat) + the same amber accent as the family thread (BV monogram),
 * with mono/terminal typography carrying the "code" feel.
 */

import type { CVLang } from "@/content/cv";

// ── Palette (dark theme: deep graphite + light text + the family amber accent)
export const BG_DEV = "#0e0e11"; // deep graphite (page base)
export const BG_DEV_ALT = "#131318"; // alternate section tone (zebra, like sales)
export const TEXT = "#f4f4f5"; // near-white text
export const AMBER = "#e0912f"; // family accent (same as the sales page)

/** Light text at a given alpha, e.g. light(0.6) → "rgba(244,244,245,0.6)". */
export const light = (alpha: number) => `rgba(244,244,245,${alpha})`;

// ── Locale
/** Narrow the app language (LanguageContext) to a CV locale, falling back to en. */
export const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

// ── Section anchors (single source for section ids, the nav and the scroll-spy)
/** Sections in the nav menu, in page order (grows as sections are built). */
export const DEV_NAV_SECTIONS = [
  { id: "inicio", navKey: "start" },
  { id: "trajetoria", navKey: "timeline" },
  { id: "competencias", navKey: "skills" },
  { id: "projetos", navKey: "projects" },
  { id: "idiomas", navKey: "languages" },
  { id: "sobre", navKey: "about" },
] as const;

/** Anchor of the contact section (nav CTA button, not a menu item). */
export const DEV_CONTACT_ID = "contato";

// ── Assets
/** One PDF per language (owner-provided files in public/cv/; the localized
    filename is what recruiters see when saving). */
export const DEV_CV_PDF: Record<CVLang, string> = {
  en: "/cv/Walter-Bruno-Vieira-CV-Dev-EN.pdf",
  "pt-BR": "/cv/Walter-Bruno-Vieira-CV-Dev-PT.pdf",
  it: "/cv/Walter-Bruno-Vieira-CV-Dev-IT.pdf",
  es: "/cv/Walter-Bruno-Vieira-CV-Dev-ES.pdf",
};

/** Subtle note under the download CTA: the PDF matches the page language. */
export const DEV_CV_HINT: Record<CVLang, string> = {
  en: "CV in English. For another language, switch the page language.",
  "pt-BR": "Currículo em português. Para outro idioma, troque o idioma da página.",
  it: "CV in italiano. Per un'altra lingua, cambia la lingua della pagina.",
  es: "CV en español. Para otro idioma, cambia el idioma de la página.",
};

/** LinkedIn public profile localized per page language (owner-confirmed
    URLs; the profile has no Spanish version yet, so es falls back to en). */
export const DEV_LINKEDIN_BY_LANG: Record<CVLang, string> = {
  en: "https://www.linkedin.com/in/walter-bruno-vieira/",
  "pt-BR": "https://www.linkedin.com/in/walter-bruno-vieira/?locale=pt-BR",
  it: "https://www.linkedin.com/in/walter-bruno-vieira/?locale=it-IT",
  es: "https://www.linkedin.com/in/walter-bruno-vieira/",
};

/** Film-grain SVG tile for the hero background. */
export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// ── Shared class strings (kept literal for Tailwind JIT)
/** Outlined pill CTA on the dark theme (GitHub/LinkedIn buttons). */
export const DEV_SECONDARY_CTA =
  "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(244,244,245,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50";
