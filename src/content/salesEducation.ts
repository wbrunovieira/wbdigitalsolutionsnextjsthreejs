/**
 * Education for the sales CV page (/vendas). WIP in pt-BR, localize with the
 * rest of the sales content once finalized.
 */

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

export const salesEducation: EducationEntry[] = [
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
];
