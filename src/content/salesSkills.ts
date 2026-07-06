/**
 * Commercial skills + clients for the sales CV page. WIP in pt-BR, localize
 * with the rest of the sales content once finalized.
 */

import type { CVLang } from '@/content/cv';

export interface SkillGroup {
  label: string;
  items: string[];
}

export const salesSkills: Record<CVLang, SkillGroup[]> = {
  'pt-BR': [
    {
      label: 'Metodologias',
      items: ['SPIN Selling', 'SPICED', 'Venda consultiva', 'Solution Selling'],
    },
    {
      label: 'Prospecção',
      items: ['Porta a porta / campo', 'SDR', 'ICP (perfil de cliente ideal)', 'Construção de listas', 'Discovery'],
    },
    {
      label: 'Ciclo de vendas',
      items: ['Negociação', 'Fechamento', 'Pós-venda & upsell', 'Ciclo comercial completo'],
    },
    {
      label: 'Gestão comercial',
      items: [
        'Contas enterprise / Key accounts',
        'Gestão de carteira (farmer)',
        'Relacionamento & fidelização',
        'Abertura de mercado (hunter)',
        'CRM',
        'Forecast',
      ],
    },
  ],
  en: [
    {
      label: 'Methodologies',
      items: ['SPIN Selling', 'SPICED', 'Consultative selling', 'Solution Selling'],
    },
    {
      label: 'Prospecting',
      items: ['Door-to-door / field', 'SDR', 'ICP (ideal customer profile)', 'List building', 'Discovery'],
    },
    {
      label: 'Sales cycle',
      items: ['Negotiation', 'Closing', 'After-sales & upsell', 'Full commercial cycle'],
    },
    {
      label: 'Commercial management',
      items: [
        'Enterprise / Key accounts',
        'Account farming (farmer)',
        'Relationship & retention',
        'Market development (hunter)',
        'CRM',
        'Forecast',
      ],
    },
  ],
  it: [
    {
      label: 'Metodologie',
      items: ['SPIN Selling', 'SPICED', 'Vendita consulenziale', 'Solution Selling'],
    },
    {
      label: 'Prospezione',
      items: ['Porta a porta / campo', 'SDR', 'ICP (profilo cliente ideale)', 'Costruzione di liste', 'Discovery'],
    },
    {
      label: 'Ciclo di vendita',
      items: ['Negoziazione', 'Chiusura', 'Post-vendita & upsell', 'Ciclo commerciale completo'],
    },
    {
      label: 'Gestione commerciale',
      items: [
        'Grandi clienti / Key account',
        'Gestione portafoglio (farmer)',
        'Relazione & fidelizzazione',
        'Sviluppo mercato (hunter)',
        'CRM',
        'Forecast',
      ],
    },
  ],
  es: [
    {
      label: 'Metodologías',
      items: ['SPIN Selling', 'SPICED', 'Venta consultiva', 'Solution Selling'],
    },
    {
      label: 'Prospección',
      items: ['Puerta a puerta / campo', 'SDR', 'ICP (perfil de cliente ideal)', 'Construcción de listas', 'Discovery'],
    },
    {
      label: 'Ciclo de ventas',
      items: ['Negociación', 'Cierre', 'Posventa & upsell', 'Ciclo comercial completo'],
    },
    {
      label: 'Gestión comercial',
      items: [
        'Cuentas enterprise / Key accounts',
        'Gestión de cartera (farmer)',
        'Relación & fidelización',
        'Apertura de mercado (hunter)',
        'CRM',
        'Forecast',
      ],
    },
  ],
};

/** Brands / accounts served over the years (rendered as styled names, not logos). */
export const salesClients: string[] = [
  'Reckitt Benckiser',
  'Carrefour',
  'Colgate',
  'Perdigão',
  'Droga Raia',
  'Friozem',
  'Refrio',
];
