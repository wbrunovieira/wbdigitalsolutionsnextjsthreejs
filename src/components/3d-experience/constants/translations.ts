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

  // Virtual Space experience
  virtualSpace?: {
    mainContentTitle: string;
    mainContentSubtitle: string;
    resourcesTitle: string;
    resourceItems: string[];
    stations: {
      id: string;
      title: string;
      subtitle: string;
      description: string;
      options: string[];
    }[];
    overlay: {
      close: string;
      library: {
        search: string;
        categories: string[];
        articles: { title: string; category: string; time: string }[];
        viewAll: string;
      };
      video: {
        title: string;
        subtitle: string;
        playlist: { title: string; duration: string }[];
        play: string;
      };
      quiz: {
        title: string;
        progress: string;
        question: string;
        options: string[];
        submit: string;
        score: string;
        timer: string;
      };
    };
  };
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

    virtualSpace: {
      mainContentTitle: 'Knowledge Module',
      mainContentSubtitle: 'Interactive content organized in stations',
      resourcesTitle: 'Complementary Resources',
      resourceItems: ['Video Library', 'Documents', 'Assessments', 'Certificates'],
      stations: [
        {
          id: 'station-1',
          title: 'Content Library',
          subtitle: 'Explore materials',
          description: 'Access a curated collection of learning materials, articles, and interactive guides organized by topic.',
          options: ['Articles', 'Guides', 'Downloads'],
        },
        {
          id: 'station-2',
          title: 'Media Center',
          subtitle: 'Watch & listen',
          description: 'Multimedia content including video presentations, recorded workshops, and podcast episodes.',
          options: ['Videos', 'Workshops', 'Podcasts'],
        },
        {
          id: 'station-3',
          title: 'Assessments',
          subtitle: 'Test your knowledge',
          description: 'Interactive quizzes and evaluations to measure understanding and track progress.',
          options: ['Quizzes', 'Evaluations', 'Certificates'],
        },
      ],
      overlay: {
        close: 'Close',
        library: {
          search: 'Search content...',
          categories: ['Marketing', 'Sales', 'Leadership', 'Tech'],
          articles: [
            { title: 'Digital Marketing Strategy', category: 'Marketing', time: '5 min' },
            { title: 'Sales Funnel Optimization', category: 'Sales', time: '8 min' },
            { title: 'Leadership in Remote Teams', category: 'Leadership', time: '6 min' },
          ],
          viewAll: 'View All',
        },
        video: {
          title: 'Corporate Training',
          subtitle: 'Module 1: Introduction',
          playlist: [
            { title: 'Module 1: Introduction', duration: '12:30' },
            { title: 'Module 2: Fundamentals', duration: '18:45' },
            { title: 'Module 3: Advanced Topics', duration: '22:10' },
          ],
          play: 'Play',
        },
        quiz: {
          title: 'Knowledge Assessment',
          progress: 'Question 2 of 5',
          question: 'What is the primary benefit of immersive content for corporate training?',
          options: [
            'Higher information retention',
            'Lower production cost',
            'Simpler implementation',
            'Less preparation needed',
          ],
          submit: 'Submit Answer',
          score: 'Current Score',
          timer: 'Time remaining',
        },
      },
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

    virtualSpace: {
      mainContentTitle: 'Módulo de Conhecimento',
      mainContentSubtitle: 'Conteúdo interativo organizado em estações',
      resourcesTitle: 'Recursos Complementares',
      resourceItems: ['Videoteca', 'Documentos', 'Avaliações', 'Certificados'],
      stations: [
        {
          id: 'station-1',
          title: 'Biblioteca de Conteúdo',
          subtitle: 'Explore materiais',
          description: 'Acesse uma coleção curada de materiais de aprendizagem, artigos e guias interativos organizados por tema.',
          options: ['Artigos', 'Guias', 'Downloads'],
        },
        {
          id: 'station-2',
          title: 'Central de Mídia',
          subtitle: 'Assista e ouça',
          description: 'Conteúdo multimídia incluindo apresentações em vídeo, workshops gravados e episódios de podcast.',
          options: ['Vídeos', 'Workshops', 'Podcasts'],
        },
        {
          id: 'station-3',
          title: 'Avaliações',
          subtitle: 'Teste seu conhecimento',
          description: 'Quizzes interativos e avaliações para medir compreensão e acompanhar o progresso.',
          options: ['Quizzes', 'Avaliações', 'Certificados'],
        },
      ],
      overlay: {
        close: 'Fechar',
        library: {
          search: 'Buscar conteúdo...',
          categories: ['Marketing', 'Vendas', 'Liderança', 'Tecnologia'],
          articles: [
            { title: 'Estratégia de Marketing Digital', category: 'Marketing', time: '5 min' },
            { title: 'Otimização de Funil de Vendas', category: 'Vendas', time: '8 min' },
            { title: 'Liderança em Times Remotos', category: 'Liderança', time: '6 min' },
          ],
          viewAll: 'Ver Todos',
        },
        video: {
          title: 'Treinamento Corporativo',
          subtitle: 'Módulo 1: Introdução',
          playlist: [
            { title: 'Módulo 1: Introdução', duration: '12:30' },
            { title: 'Módulo 2: Fundamentos', duration: '18:45' },
            { title: 'Módulo 3: Tópicos Avançados', duration: '22:10' },
          ],
          play: 'Reproduzir',
        },
        quiz: {
          title: 'Avaliação de Conhecimento',
          progress: 'Questão 2 de 5',
          question: 'Qual é o principal benefício do conteúdo imersivo para treinamento corporativo?',
          options: [
            'Maior retenção de informação',
            'Menor custo de produção',
            'Implementação mais simples',
            'Menos preparação necessária',
          ],
          submit: 'Enviar Resposta',
          score: 'Pontuação Atual',
          timer: 'Tempo restante',
        },
      },
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

    virtualSpace: {
      mainContentTitle: 'Módulo de Conocimiento',
      mainContentSubtitle: 'Contenido interactivo organizado en estaciones',
      resourcesTitle: 'Recursos Complementarios',
      resourceItems: ['Videoteca', 'Documentos', 'Evaluaciones', 'Certificados'],
      stations: [
        {
          id: 'station-1',
          title: 'Biblioteca de Contenido',
          subtitle: 'Explora materiales',
          description: 'Accede a una colección curada de materiales de aprendizaje, artículos y guías interactivas organizadas por tema.',
          options: ['Artículos', 'Guías', 'Descargas'],
        },
        {
          id: 'station-2',
          title: 'Centro de Medios',
          subtitle: 'Mira y escucha',
          description: 'Contenido multimedia incluyendo presentaciones en video, talleres grabados y episodios de podcast.',
          options: ['Videos', 'Talleres', 'Podcasts'],
        },
        {
          id: 'station-3',
          title: 'Evaluaciones',
          subtitle: 'Pon a prueba tu conocimiento',
          description: 'Quizzes interactivos y evaluaciones para medir comprensión y seguir el progreso.',
          options: ['Quizzes', 'Evaluaciones', 'Certificados'],
        },
      ],
      overlay: {
        close: 'Cerrar',
        library: {
          search: 'Buscar contenido...',
          categories: ['Marketing', 'Ventas', 'Liderazgo', 'Tecnología'],
          articles: [
            { title: 'Estrategia de Marketing Digital', category: 'Marketing', time: '5 min' },
            { title: 'Optimización de Embudo de Ventas', category: 'Ventas', time: '8 min' },
            { title: 'Liderazgo en Equipos Remotos', category: 'Liderazgo', time: '6 min' },
          ],
          viewAll: 'Ver Todos',
        },
        video: {
          title: 'Capacitación Corporativa',
          subtitle: 'Módulo 1: Introducción',
          playlist: [
            { title: 'Módulo 1: Introducción', duration: '12:30' },
            { title: 'Módulo 2: Fundamentos', duration: '18:45' },
            { title: 'Módulo 3: Temas Avanzados', duration: '22:10' },
          ],
          play: 'Reproducir',
        },
        quiz: {
          title: 'Evaluación de Conocimiento',
          progress: 'Pregunta 2 de 5',
          question: '¿Cuál es el beneficio principal del contenido inmersivo para la capacitación corporativa?',
          options: [
            'Mayor retención de información',
            'Menor costo de producción',
            'Implementación más simple',
            'Menos preparación necesaria',
          ],
          submit: 'Enviar Respuesta',
          score: 'Puntuación Actual',
          timer: 'Tiempo restante',
        },
      },
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

    virtualSpace: {
      mainContentTitle: 'Modulo di Conoscenza',
      mainContentSubtitle: 'Contenuti interattivi organizzati in stazioni',
      resourcesTitle: 'Risorse Complementari',
      resourceItems: ['Videoteca', 'Documenti', 'Valutazioni', 'Certificati'],
      stations: [
        {
          id: 'station-1',
          title: 'Libreria Contenuti',
          subtitle: 'Esplora materiali',
          description: 'Accedi a una raccolta curata di materiali didattici, articoli e guide interattive organizzate per tema.',
          options: ['Articoli', 'Guide', 'Download'],
        },
        {
          id: 'station-2',
          title: 'Centro Multimediale',
          subtitle: 'Guarda e ascolta',
          description: 'Contenuti multimediali tra cui presentazioni video, workshop registrati e episodi podcast.',
          options: ['Video', 'Workshop', 'Podcast'],
        },
        {
          id: 'station-3',
          title: 'Valutazioni',
          subtitle: 'Metti alla prova le tue conoscenze',
          description: 'Quiz interattivi e valutazioni per misurare la comprensione e monitorare i progressi.',
          options: ['Quiz', 'Valutazioni', 'Certificati'],
        },
      ],
      overlay: {
        close: 'Chiudi',
        library: {
          search: 'Cerca contenuti...',
          categories: ['Marketing', 'Vendite', 'Leadership', 'Tecnologia'],
          articles: [
            { title: 'Strategia di Marketing Digitale', category: 'Marketing', time: '5 min' },
            { title: 'Ottimizzazione Funnel di Vendita', category: 'Vendite', time: '8 min' },
            { title: 'Leadership nei Team Remoti', category: 'Leadership', time: '6 min' },
          ],
          viewAll: 'Vedi Tutti',
        },
        video: {
          title: 'Formazione Aziendale',
          subtitle: 'Modulo 1: Introduzione',
          playlist: [
            { title: 'Modulo 1: Introduzione', duration: '12:30' },
            { title: 'Modulo 2: Fondamenti', duration: '18:45' },
            { title: 'Modulo 3: Argomenti Avanzati', duration: '22:10' },
          ],
          play: 'Riproduci',
        },
        quiz: {
          title: 'Valutazione delle Conoscenze',
          progress: 'Domanda 2 di 5',
          question: 'Qual è il principale beneficio dei contenuti immersivi per la formazione aziendale?',
          options: [
            'Maggiore ritenzione delle informazioni',
            'Minor costo di produzione',
            'Implementazione più semplice',
            'Meno preparazione necessaria',
          ],
          submit: 'Invia Risposta',
          score: 'Punteggio Attuale',
          timer: 'Tempo rimanente',
        },
      },
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
