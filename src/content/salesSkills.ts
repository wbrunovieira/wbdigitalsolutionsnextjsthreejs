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
    label: "Prospecção",
    items: ["Porta a porta / campo", "SDR", "ICP (perfil de cliente ideal)", "Construção de listas", "Discovery"],
  },
  {
    label: "Ciclo de vendas",
    items: ["Negociação", "Fechamento", "Pós-venda & upsell", "Ciclo comercial completo"],
  },
  {
    label: "Gestão comercial",
    items: [
      "Contas enterprise / Key accounts",
      "Gestão de carteira (farmer)",
      "Relacionamento & fidelização",
      "Abertura de mercado (hunter)",
      "CRM",
      "Forecast",
    ],
  },
];

/** Brands / accounts served over the years (rendered as styled names, not logos). */
export const salesClients: string[] = [
  "Reckitt Benckiser",
  "Carrefour",
  "Colgate",
  "Perdigão",
  "Droga Raia",
  "Friozem",
  "Refrio",
];
