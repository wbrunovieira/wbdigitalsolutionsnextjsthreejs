/**
 * Translations for the 3D Experience Platform
 */

export type SupportedLanguage = 'en' | 'pt-BR' | 'es' | 'it';

export interface ExperienceTranslations {
  // Hub UI
  hubTitle: string;
  hubSubtitle: string;
  hubWelcome: string;
  experiencesAvailable: string;
  guidedTour: string;
  rotate: string;
  exitExperience: string;
  backToHub: string;
  loading: string;

  // Experience names
  experienceNames: {
    learning: string;
    product: string;
    landing: string;
    'virtual-space': string;
    'sales-demo': string;
    brand: string;
    micro: string;
  };

  // Experience descriptions
  experienceDescriptions: {
    learning: string;
    product: string;
    landing: string;
    'virtual-space': string;
    'sales-demo': string;
    brand: string;
    micro: string;
  };

  // Placeholder
  inDevelopment: string;

  // Mobile controls
  help: string;
  fullscreen: string;

  // Visited
  explored: string;

  // Tour
  tourStart: string;
  tourNext: string;
  tourPrev: string;
  tourEnd: string;
  tourStep: string;
}

export const translations: Record<SupportedLanguage, ExperienceTranslations> = {
  en: {
    hubTitle: '3D Experience Hub',
    hubSubtitle: 'Click on a portal to explore different ways to present immersive content',
    hubWelcome: 'Welcome',
    experiencesAvailable: 'experiences available',
    guidedTour: 'Guided Tour',
    rotate: 'Rotate',
    exitExperience: 'Exit',
    backToHub: 'Back to Hub',
    loading: 'Loading...',

    experienceNames: {
      learning: 'Learning',
      product: 'Product',
      landing: 'Landing',
      'virtual-space': 'Virtual Space',
      'sales-demo': 'Sales Demo',
      brand: 'Brand',
      micro: 'Micro',
    },

    experienceDescriptions: {
      learning: 'Structured knowledge in interactive layers',
      product: 'Explorable 3D product with hotspots',
      landing: 'Interactive 3D landing page',
      'virtual-space': 'Navigable room with distributed content',
      'sales-demo': 'Interactive demo for sales teams',
      brand: 'Immersive visual storytelling',
      micro: 'High-impact micro experience',
    },

    inDevelopment: 'In Development',

    explored: 'Explored',

    help: 'Help',
    fullscreen: 'Fullscreen',

    tourStart: 'Start Tour',
    tourNext: 'Next',
    tourPrev: 'Previous',
    tourEnd: 'End Tour',
    tourStep: 'Step',
  },

  'pt-BR': {
    hubTitle: 'Hub de Experiências 3D',
    hubSubtitle: 'Clique em um portal para explorar diferentes formas de apresentar conteúdo imersivo',
    hubWelcome: 'Bem-vindo',
    experiencesAvailable: 'experiências disponíveis',
    guidedTour: 'Tour Guiado',
    rotate: 'Girar',
    exitExperience: 'Sair',
    backToHub: 'Voltar ao Hub',
    loading: 'Carregando...',

    experienceNames: {
      learning: 'Learning',
      product: 'Product',
      landing: 'Landing',
      'virtual-space': 'Virtual Space',
      'sales-demo': 'Sales Demo',
      brand: 'Brand',
      micro: 'Micro',
    },

    experienceDescriptions: {
      learning: 'Conhecimento estruturado em camadas interativas',
      product: 'Produto 3D explorável com hotspots',
      landing: 'Página 3D interativa',
      'virtual-space': 'Sala navegável com conteúdos distribuídos',
      'sales-demo': 'Demo interativa para times de venda',
      brand: 'Storytelling visual imersivo',
      micro: 'Micro experiência de impacto',
    },

    inDevelopment: 'Em Desenvolvimento',

    explored: 'Explorado',

    help: 'Ajuda',
    fullscreen: 'Tela Cheia',

    tourStart: 'Iniciar Tour',
    tourNext: 'Próximo',
    tourPrev: 'Anterior',
    tourEnd: 'Encerrar Tour',
    tourStep: 'Passo',
  },

  es: {
    hubTitle: 'Hub de Experiencias 3D',
    hubSubtitle: 'Haz clic en un portal para explorar diferentes formas de presentar contenido inmersivo',
    hubWelcome: 'Bienvenido',
    experiencesAvailable: 'experiencias disponibles',
    guidedTour: 'Tour Guiado',
    rotate: 'Girar',
    exitExperience: 'Salir',
    backToHub: 'Volver al Hub',
    loading: 'Cargando...',

    experienceNames: {
      learning: 'Learning',
      product: 'Product',
      landing: 'Landing',
      'virtual-space': 'Virtual Space',
      'sales-demo': 'Sales Demo',
      brand: 'Brand',
      micro: 'Micro',
    },

    experienceDescriptions: {
      learning: 'Conocimiento estructurado en capas interactivas',
      product: 'Producto 3D explorable con hotspots',
      landing: 'Página 3D interactiva',
      'virtual-space': 'Sala navegable con contenidos distribuidos',
      'sales-demo': 'Demo interactiva para equipos de ventas',
      brand: 'Storytelling visual inmersivo',
      micro: 'Micro experiencia de impacto',
    },

    inDevelopment: 'En Desarrollo',

    explored: 'Explorado',

    help: 'Ayuda',
    fullscreen: 'Pantalla Completa',

    tourStart: 'Iniciar Tour',
    tourNext: 'Siguiente',
    tourPrev: 'Anterior',
    tourEnd: 'Terminar Tour',
    tourStep: 'Paso',
  },

  it: {
    hubTitle: 'Hub Esperienze 3D',
    hubSubtitle: 'Clicca su un portale per esplorare diversi modi di presentare contenuti immersivi',
    hubWelcome: 'Benvenuto',
    experiencesAvailable: 'esperienze disponibili',
    guidedTour: 'Tour Guidato',
    rotate: 'Ruota',
    exitExperience: 'Esci',
    backToHub: 'Torna all\'Hub',
    loading: 'Caricamento...',

    experienceNames: {
      learning: 'Learning',
      product: 'Product',
      landing: 'Landing',
      'virtual-space': 'Virtual Space',
      'sales-demo': 'Sales Demo',
      brand: 'Brand',
      micro: 'Micro',
    },

    experienceDescriptions: {
      learning: 'Conoscenza strutturata in strati interattivi',
      product: 'Prodotto 3D esplorabile con hotspot',
      landing: 'Pagina 3D interattiva',
      'virtual-space': 'Stanza navigabile con contenuti distribuiti',
      'sales-demo': 'Demo interattiva per team di vendita',
      brand: 'Storytelling visivo immersivo',
      micro: 'Micro esperienza ad alto impatto',
    },

    inDevelopment: 'In Sviluppo',

    explored: 'Esplorato',

    help: 'Aiuto',
    fullscreen: 'Schermo Intero',

    tourStart: 'Inizia Tour',
    tourNext: 'Avanti',
    tourPrev: 'Indietro',
    tourEnd: 'Termina Tour',
    tourStep: 'Passo',
  },
};

export const getTranslation = (language: string): ExperienceTranslations => {
  const lang = language === 'pt' ? 'pt-BR' : language;
  return translations[lang as SupportedLanguage] || translations.en;
};

export const getLanguageLabel = (lang: string, short = false): string => {
  if (short) {
    return lang.split('-')[0].toUpperCase();
  }
  switch (lang) {
    case 'en': return '🇺🇸 EN';
    case 'pt-BR': return '🇧🇷 PT';
    case 'es': return '🇪🇸 ES';
    case 'it': return '🇮🇹 IT';
    default: return lang.toUpperCase();
  }
};

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'pt-BR', 'es', 'it'];
