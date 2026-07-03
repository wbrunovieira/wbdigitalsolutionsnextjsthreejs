/**
 * Education for the sales CV page (/vendas). Localized in 4 languages,
 * keyed by CVLang.
 */

import type { CVLang } from "@/content/cv";

export interface EducationEntry {
  institution: string;
  /** Degree level, e.g. "Especialização". */
  level: string;
  /** Field of study. */
  course: string;
  /** Period, e.g. "2013–2014" (empty when not applicable). */
  period?: string;
  location?: string;
}

export const salesEducation: Record<CVLang, EducationEntry[]> = {
  "pt-BR": [
    {
      institution: "Fundação Getulio Vargas (FGV)",
      level: "Especialização",
      course: "Vendas, Negociação e Marketing",
      period: "2013–2014",
      location: "São Paulo",
    },
    {
      institution: "Universidade Paulista (UNIP)",
      level: "Graduação",
      course: "Logística",
      period: "2010–2012",
      location: "São Paulo",
    },
    {
      institution: "Escola Nossa Senhora de Misericórdia",
      level: "Educação básica",
      course: "Pré, fundamental e médio",
      location: "Osasco, SP",
    },
  ],
  en: [
    {
      institution: "Fundação Getulio Vargas (FGV)",
      level: "Specialization",
      course: "Sales, Negotiation & Marketing",
      period: "2013–2014",
      location: "São Paulo",
    },
    {
      institution: "Universidade Paulista (UNIP)",
      level: "Bachelor's degree",
      course: "Logistics",
      period: "2010–2012",
      location: "São Paulo",
    },
    {
      institution: "Escola Nossa Senhora de Misericórdia",
      level: "Basic education",
      course: "Pre-school, primary and secondary",
      location: "Osasco, SP",
    },
  ],
  it: [
    {
      institution: "Fundação Getulio Vargas (FGV)",
      level: "Specializzazione",
      course: "Vendite, Negoziazione e Marketing",
      period: "2013–2014",
      location: "São Paulo",
    },
    {
      institution: "Universidade Paulista (UNIP)",
      level: "Laurea",
      course: "Logistica",
      period: "2010–2012",
      location: "São Paulo",
    },
    {
      institution: "Escola Nossa Senhora de Misericórdia",
      level: "Istruzione di base",
      course: "Materna, elementari e superiori",
      location: "Osasco, SP",
    },
  ],
  es: [
    {
      institution: "Fundação Getulio Vargas (FGV)",
      level: "Especialización",
      course: "Ventas, Negociación y Marketing",
      period: "2013–2014",
      location: "São Paulo",
    },
    {
      institution: "Universidade Paulista (UNIP)",
      level: "Grado",
      course: "Logística",
      period: "2010–2012",
      location: "São Paulo",
    },
    {
      institution: "Escola Nossa Senhora de Misericórdia",
      level: "Educación básica",
      course: "Preescolar, primaria y secundaria",
      location: "Osasco, SP",
    },
  ],
};
