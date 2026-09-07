export type ServiceType = 'websites' | 'automation' | 'ai';
type ShowcaseLang = 'pt' | 'es' | 'it' | 'en';

export interface ServiceInfo {
  title: string;
  lines: string[];
  color: string;
}

const toShowcaseLang = (language: string): ShowcaseLang => {
  switch (language) {
    case 'pt-BR':
    case 'pt':
      return 'pt';
    case 'es':
      return 'es';
    case 'it':
      return 'it';
    default:
      return 'en';
  }
};

/** Copy shown on the holographic panel above each desk. */
const SERVICE_INFO: Record<ServiceType, Record<ShowcaseLang, ServiceInfo>> = {
  websites: {
    pt: {
      title: 'DESENVOLVIMENTO WEB',
      lines: [
        '✦ Visual moderno e profissional',
        '✦ Animações suaves e 3D',
        '✦ Navegação simples e clara',
        '✦ Plataformas completas: e-commerce,',
        '   ensino online e soluções sob medida',
        '✦ Publicação e suporte na nuvem',
      ],
      color: '#792990',
    },
    es: {
      title: 'DESARROLLO WEB',
      lines: [
        '✦ Visual moderno y profesional',
        '✦ Animaciones suaves y 3D ',
        '✦ Navegación simple y clara',
        '✦ Plataformas completas: e-commerce,',
        '   enseñanza online y soluciones a medida',
        '✦ Publicación y soporte en la nube',
      ],
      color: '#792990',
    },
    it: {
      title: 'SVILUPPO WEB',
      lines: [
        '✦ Look moderno e professionale',
        '✦ Animazioni fluide e 3D ',
        '✦ Navigazione semplice e intuitiva',
        '✦ Piattaforme complete: e-commerce,',
        '   e-learning e soluzioni su misura',
        '✦ Pubblicazione e supporto nel cloud',
      ],
      color: '#792990',
    },
    en: {
      title: 'WEB DEVELOPMENT',
      lines: [
        '✦ Modern, professional look',
        '✦ Smooth animations & 3D where it fits',
        '✦ Easy, intuitive navigation',
        '✦ Complete platforms: e-commerce,',
        '   e-learning and custom solutions',
        '✦ Cloud launch and support',
      ],
      color: '#792990',
    },
  },
  automation: {
    pt: {
      title: 'AUTOMAÇÃO',
      lines: [
        '⚡ Menos tarefas repetitivas',
        '⚡ Sistemas conversando entre si',
        '⚡ Rotinas confiáveis, com alertas',
        '⚡ Menos erros e retrabalho',
        '⚡ Mais tempo para o que importa',
      ],
      color: '#ffb947',
    },
    es: {
      title: 'AUTOMATIZACIÓN',
      lines: [
        '⚡ Menos tareas repetitivas',
        '⚡ Sistemas que se comunican entre sí',
        '⚡ Rutinas confiables con alertas',
        '⚡ Menos errores y retrabajo',
        '⚡ Más tiempo para lo que importa',
      ],
      color: '#ffb947',
    },
    it: {
      title: 'AUTOMAZIONE',
      lines: [
        '⚡ Meno attività ripetitive',
        '⚡ Sistemi che parlano tra loro',
        '⚡ Routine affidabili con avvisi',
        '⚡ Meno errori e rilavorazioni',
        '⚡ Più tempo per ciò che conta',
      ],
      color: '#ffb947',
    },
    en: {
      title: 'AUTOMATION',
      lines: [
        '⚡ Fewer repetitive tasks',
        '⚡ Systems that talk to each other',
        '⚡ Reliable routines with alerts',
        '⚡ Fewer errors and rework',
        '⚡ More time for what matters',
      ],
      color: '#ffb947',
    },
  },
  ai: {
    pt: {
      title: 'INTELIGÊNCIA ARTIFICIAL',
      lines: [
        '🤖 Chatbots e assistentes sob medida',
        '🤖 IA que usa seus próprios conteúdos (RAG)',
        '🤖 Organização e leitura de textos',
        '🤖 Previsões e segmentações',
        '🤖 Métricas e melhoria contínua',
      ],
      color: '#4a90e2',
    },
    es: {
      title: 'INTELIGENCIA ARTIFICIAL',
      lines: [
        '🤖 Chatbots y asistentes a medida',
        '🤖 IA con tus propios contenidos (RAG)',
        '🤖 Organización y lectura de textos',
        '🤖 Predicciones y segmentación',
        '🤖 Métricas y mejora continua',
      ],
      color: '#4a90e2',
    },
    it: {
      title: 'INTELLIGENZA ARTIFICIALE',
      lines: [
        '🤖 Chatbot e assistenti su misura',
        '🤖 IA sui tuoi contenuti (RAG)',
        '🤖 Organizzazione e lettura di testi',
        '🤖 Previsioni e segmentazioni',
        '🤖 Metriche e miglioramento continuo',
      ],
      color: '#4a90e2',
    },
    en: {
      title: 'ARTIFICIAL INTELLIGENCE',
      lines: [
        '🤖 Custom chatbots & assistants',
        '🤖 AI over your own content (RAG)',
        '🤖 Text organization & extraction',
        '🤖 Forecasting & segmentation',
        '🤖 Metrics & continuous improvement',
      ],
      color: '#4a90e2',
    },
  },
};

export const getServiceInfo = (serviceType: ServiceType, language: string): ServiceInfo =>
  SERVICE_INFO[serviceType][toShowcaseLang(language)];
