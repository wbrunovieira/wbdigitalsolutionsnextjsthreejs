/**
 * Shared theme + helpers for the sales CV page (/vendas).
 * Single source of truth for what was previously copy-pasted per component:
 * palette, locale narrowing, section ids, and the CV download target.
 */

import type { CVLang } from "@/content/cv";

// ── Palette (light theme: neutral off-white + graphite + a single amber accent)
export const INK = "#1c1c1e"; // graphite ink
export const AMBER = "#e0912f"; // warm accent (used sparingly)
/** Section backgrounds alternate A/B down the page (intentional soft zebra). */
export const BG_A = "#f7f7f8";
export const BG_B = "#f1f1f3";

/** Graphite ink at a given alpha, e.g. ink(0.6) → "rgba(28,28,30,0.6)". */
export const ink = (alpha: number) => `rgba(28,28,30,${alpha})`;

// ── Locale
/** Narrow the app language (LanguageContext) to a CV locale, falling back to en. */
export const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

// ── Section anchors (single source for section ids, the nav and the scroll-spy)
/**
 * Sections that appear in the nav menu, in page order. `navKey` points into
 * cvContent[lang].nav for the localized label.
 */
export const NAV_SECTIONS = [
  { id: "inicio", navKey: "start" },
  { id: "trajetoria", navKey: "timeline" },
  { id: "competencias", navKey: "skills" },
  { id: "formacao", navKey: "education" },
  { id: "idiomas", navKey: "languages" },
  { id: "sobre", navKey: "about" },
] as const;

/** Anchor of the contact section (nav CTA button, not a menu item). */
export const CONTACT_ID = "contato";

/** Philosophy pull-quotes have anchors but intentionally stay out of the menu. */
export const PHILOSOPHY_IDS = { decide: "filosofia", clarity: "clareza" } as const;

// ── Assets
/** One PDF per language (files pending; drop them in public/cv/ with these names). */
export const CV_PDF: Record<CVLang, string> = {
  "pt-BR": "/cv/bruno-vieira-vendas-pt.pdf",
  en: "/cv/bruno-vieira-vendas-en.pdf",
  it: "/cv/bruno-vieira-vendas-it.pdf",
  es: "/cv/bruno-vieira-vendas-es.pdf",
};

/** Subtle note under the download CTA: the PDF matches the page language. */
export const CV_HINT: Record<CVLang, string> = {
  "pt-BR": "Currículo em português. Para outro idioma, troque o idioma da página.",
  en: "CV in English. For another language, switch the page language.",
  it: "CV in italiano. Per un'altra lingua, cambia la lingua della pagina.",
  es: "CV en español. Para otro idioma, cambia el idioma de la página.",
};

/** LinkedIn public profile localized per page language (owner-confirmed
    URLs; the profile has no Spanish version yet, so es falls back to en). */
export const LINKEDIN_BY_LANG: Record<CVLang, string> = {
  "pt-BR": "https://www.linkedin.com/in/walter-bruno-vieira/?locale=pt-BR",
  en: "https://www.linkedin.com/in/walter-bruno-vieira/",
  it: "https://www.linkedin.com/in/walter-bruno-vieira/?locale=it-IT",
  es: "https://www.linkedin.com/in/walter-bruno-vieira/",
};

// ── Shared class strings (kept literal for Tailwind JIT)
/** Outlined pill CTA (LinkedIn/WhatsApp/Email buttons in the hero and contact). */
export const SECONDARY_CTA =
  "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(28,28,30,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50";
