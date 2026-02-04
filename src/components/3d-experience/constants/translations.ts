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

  // Tour step texts (keyed by step id from guidedTourStore)
  tourTexts: Record<string, string>;
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

    tourTexts: {
      tourWelcomeTitle: 'Welcome to the 3D Experience Hub',
      tourWelcomeDesc: 'Each portal represents a different way to present immersive content. Let\'s explore them!',
      tourPortalLearningTitle: '01 — Learning',
      tourPortalLearningDesc: 'Structured knowledge in interactive layers. Ideal for courses, training and education.',
      tourPortalProductTitle: '02 — Product',
      tourPortalProductDesc: 'Explorable 3D product with hotspots. Perfect for showcasing physical or digital products.',
      tourPortalLandingTitle: '03 — Landing',
      tourPortalLandingDesc: 'Interactive 3D landing page. Create immersive first impressions.',
      tourPortalVirtualSpaceTitle: '04 — Virtual Space',
      tourPortalVirtualSpaceDesc: 'Navigable room with distributed content. Great for events, courses and presentations.',
      tourPortalSalesDemoTitle: '05 — Sales Demo',
      tourPortalSalesDemoDesc: 'Interactive demo for sales teams. Present your solution in an engaging way.',
      tourPortalBrandTitle: '06 — Brand',
      tourPortalBrandDesc: 'Immersive visual storytelling. Tell your brand story in a memorable way.',
      tourPortalMicroTitle: '07 — Micro',
      tourPortalMicroDesc: 'High-impact micro experience. Quick, focused and impressive.',
      tourConclusionTitle: 'Ready to Explore?',
      tourConclusionDesc: 'Click on any portal to enter an experience. Each one can be customized for your business.',
    },
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
      learning: 'Aprendizado',
      product: 'Produto',
      landing: 'Landing Page',
      'virtual-space': 'Espaço Virtual',
      'sales-demo': 'Demo de Vendas',
      brand: 'Marca',
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

    tourTexts: {
      tourWelcomeTitle: 'Bem-vindo ao Hub de Experiências 3D',
      tourWelcomeDesc: 'Cada portal representa uma forma diferente de apresentar conteúdo imersivo. Vamos explorar!',
      tourPortalLearningTitle: '01 — Learning',
      tourPortalLearningDesc: 'Conhecimento estruturado em camadas interativas. Ideal para cursos, treinamentos e educação.',
      tourPortalProductTitle: '02 — Product',
      tourPortalProductDesc: 'Produto 3D explorável com hotspots. Perfeito para apresentar produtos físicos ou digitais.',
      tourPortalLandingTitle: '03 — Landing',
      tourPortalLandingDesc: 'Página 3D interativa. Crie primeiras impressões imersivas.',
      tourPortalVirtualSpaceTitle: '04 — Virtual Space',
      tourPortalVirtualSpaceDesc: 'Sala navegável com conteúdos distribuídos. Ótimo para eventos, cursos e apresentações.',
      tourPortalSalesDemoTitle: '05 — Sales Demo',
      tourPortalSalesDemoDesc: 'Demo interativa para times de venda. Apresente sua solução de forma envolvente.',
      tourPortalBrandTitle: '06 — Brand',
      tourPortalBrandDesc: 'Storytelling visual imersivo. Conte a história da sua marca de forma memorável.',
      tourPortalMicroTitle: '07 — Micro',
      tourPortalMicroDesc: 'Micro experiência de alto impacto. Rápida, focada e impressionante.',
      tourConclusionTitle: 'Pronto para Explorar?',
      tourConclusionDesc: 'Clique em qualquer portal para entrar numa experiência. Cada uma pode ser personalizada para o seu negócio.',
    },
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
      learning: 'Aprendizaje',
      product: 'Producto',
      landing: 'Landing Page',
      'virtual-space': 'Espacio Virtual',
      'sales-demo': 'Demo de Ventas',
      brand: 'Marca',
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

    tourTexts: {
      tourWelcomeTitle: 'Bienvenido al Hub de Experiencias 3D',
      tourWelcomeDesc: 'Cada portal representa una forma diferente de presentar contenido inmersivo. ¡Vamos a explorar!',
      tourPortalLearningTitle: '01 — Learning',
      tourPortalLearningDesc: 'Conocimiento estructurado en capas interactivas. Ideal para cursos, capacitaciones y educación.',
      tourPortalProductTitle: '02 — Product',
      tourPortalProductDesc: 'Producto 3D explorable con hotspots. Perfecto para presentar productos físicos o digitales.',
      tourPortalLandingTitle: '03 — Landing',
      tourPortalLandingDesc: 'Página 3D interactiva. Crea primeras impresiones inmersivas.',
      tourPortalVirtualSpaceTitle: '04 — Virtual Space',
      tourPortalVirtualSpaceDesc: 'Sala navegable con contenidos distribuidos. Ideal para eventos, cursos y presentaciones.',
      tourPortalSalesDemoTitle: '05 — Sales Demo',
      tourPortalSalesDemoDesc: 'Demo interactiva para equipos de ventas. Presenta tu solución de forma envolvente.',
      tourPortalBrandTitle: '06 — Brand',
      tourPortalBrandDesc: 'Storytelling visual inmersivo. Cuenta la historia de tu marca de forma memorable.',
      tourPortalMicroTitle: '07 — Micro',
      tourPortalMicroDesc: 'Micro experiencia de alto impacto. Rápida, enfocada e impresionante.',
      tourConclusionTitle: '¿Listo para Explorar?',
      tourConclusionDesc: 'Haz clic en cualquier portal para entrar en una experiencia. Cada una puede personalizarse para tu negocio.',
    },
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
      learning: 'Apprendimento',
      product: 'Prodotto',
      landing: 'Landing Page',
      'virtual-space': 'Spazio Virtuale',
      'sales-demo': 'Demo Vendite',
      brand: 'Marchio',
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

    tourTexts: {
      tourWelcomeTitle: 'Benvenuto nell\'Hub Esperienze 3D',
      tourWelcomeDesc: 'Ogni portale rappresenta un modo diverso di presentare contenuti immersivi. Esploriamo!',
      tourPortalLearningTitle: '01 — Learning',
      tourPortalLearningDesc: 'Conoscenza strutturata in strati interattivi. Ideale per corsi, formazione e istruzione.',
      tourPortalProductTitle: '02 — Product',
      tourPortalProductDesc: 'Prodotto 3D esplorabile con hotspot. Perfetto per presentare prodotti fisici o digitali.',
      tourPortalLandingTitle: '03 — Landing',
      tourPortalLandingDesc: 'Pagina 3D interattiva. Crea prime impressioni immersive.',
      tourPortalVirtualSpaceTitle: '04 — Virtual Space',
      tourPortalVirtualSpaceDesc: 'Stanza navigabile con contenuti distribuiti. Ottimo per eventi, corsi e presentazioni.',
      tourPortalSalesDemoTitle: '05 — Sales Demo',
      tourPortalSalesDemoDesc: 'Demo interattiva per team di vendita. Presenta la tua soluzione in modo coinvolgente.',
      tourPortalBrandTitle: '06 — Brand',
      tourPortalBrandDesc: 'Storytelling visivo immersivo. Racconta la storia del tuo brand in modo memorabile.',
      tourPortalMicroTitle: '07 — Micro',
      tourPortalMicroDesc: 'Micro esperienza ad alto impatto. Rapida, focalizzata e impressionante.',
      tourConclusionTitle: 'Pronto per Esplorare?',
      tourConclusionDesc: 'Clicca su qualsiasi portale per entrare in un\'esperienza. Ognuna può essere personalizzata per il tuo business.',
    },
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
