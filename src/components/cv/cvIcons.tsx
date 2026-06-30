/**
 * Stable icon maps for the CV page. All maps key off language-independent
 * identifiers (StackKey, project id, language code, company name, stat id),
 * never translated text. Decorative usage should pass aria-hidden at the call site.
 */

import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Cloud,
  Briefcase,
  Building2,
  Palette,
  LineChart,
  Globe,
  FlaskConical,
  Boxes,
  Workflow,
  ShieldCheck,
  Languages,
  type LucideIcon,
} from "lucide-react";

import type { StackKey, StatId } from "@/content/cv";

/** Stack category → icon (keyed by stable StackKey). */
export const STACK_ICON: Record<StackKey, LucideIcon> = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  ai: BrainCircuit,
  devops: Cloud,
};

/** Project → icon (keyed by stable project id). */
export const PROJECT_ICON: Record<"revalida" | "crm" | "site", LucideIcon> = {
  revalida: Boxes,
  crm: BrainCircuit,
  site: Layout,
};

/** Stat → icon (keyed by stable stat id). */
export const STAT_ICON: Record<StatId, LucideIcon> = {
  years: LineChart,
  tests: FlaskConical,
  spoken: Languages,
  stack: Code2,
  e2e: Workflow,
  coverage: ShieldCheck,
  accounts: Building2,
  markets: Globe,
};

/** Flag emoji per language code for the proficiency rows. */
export const LANG_FLAG: Record<"pt" | "en" | "it" | "es", string> = {
  pt: "🇧🇷",
  en: "🇬🇧",
  it: "🇮🇹",
  es: "🇪🇸",
};

/**
 * Experience → icon, keyed by stable company name (never translated).
 * Falls back to a generic briefcase.
 */
export function experienceIcon(company: string): LucideIcon {
  switch (company) {
    case "WB Digital Solutions":
      return Code2;
    case "Adobe":
      return Palette;
    case "LM Grafics":
      return Palette;
    case "Retrak Empilhadeiras":
      return Building2;
    default:
      return Briefcase;
  }
}

export { Briefcase, Globe };
