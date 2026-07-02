/**
 * Commercial skills + clients for the sales CV page. WIP in pt-BR, localize
 * with the rest of the sales content once finalized.
 */

export interface SkillGroup {
  label: string;
  items: string[];
}

export const salesSkills: SkillGroup[] = [
  {
    label: "Metodologias",
    items: ["SPIN Selling", "SPICED", "Venda consultiva", "Solution Selling"],
  },
  {
    label: "Ciclo de vendas",
    items: ["Prospecção", "Discovery", "Negociação", "Fechamento", "Pós-venda & upsell"],
  },
  {
    label: "Gestão comercial",
    items: ["Contas enterprise / Key accounts", "Ciclo comercial completo", "CRM", "Forecast", "Abertura de mercado"],
  },
];

/** Brands / accounts served over the years (rendered as styled names, not logos). */
export const salesClients: string[] = [
  "Reckitt Benckiser",
  "Carrefour",
  "Colgate",
  "Perdigão",
  "Droga Raia",
  "Adobe",
  "Friozem",
  "Refrio",
];
