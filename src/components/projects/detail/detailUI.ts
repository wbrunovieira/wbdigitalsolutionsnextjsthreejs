export interface DetailUI {
  back: string;
  confidential: string;
  overview: string;
  highlights: string;
  visit: string;
}

const UI: Record<string, DetailUI> = {
  en: { back: 'Back to projects', confidential: 'Some details omitted under NDA', overview: 'Overview', highlights: 'Highlights', visit: 'Visit site' },
  es: { back: 'Volver a proyectos', confidential: 'Algunos detalles omitidos por NDA', overview: 'Resumen', highlights: 'Destacados', visit: 'Visitar sitio' },
  it: { back: 'Torna ai progetti', confidential: 'Alcuni dettagli omessi per NDA', overview: 'Panoramica', highlights: 'In evidenza', visit: 'Visita il sito' },
  'pt-BR': { back: 'Voltar aos projetos', confidential: 'Alguns detalhes omitidos por confidencialidade (NDA)', overview: 'Visão geral', highlights: 'Destaques', visit: 'Ver site' },
};

export const getDetailUI = (language: string): DetailUI => UI[language === 'pt' ? 'pt-BR' : language] ?? UI.en;
