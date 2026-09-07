export type ServiceType = 'websites' | 'automation' | 'ai';
type TunnelLang = 'pt' | 'es' | 'it' | 'en';

export interface ServiceMessage {
  title: string;
  subtitle: string;
  features: string[];
  color: string;
}

const toTunnelLang = (language: string): TunnelLang => {
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

const SERVICE_MESSAGES: Record<ServiceType, Record<TunnelLang, ServiceMessage>> = {
  websites: {
    pt: { title: 'SITES MODERNOS', subtitle: 'Experiências Digitais Únicas', features: ['React & Next.js', '3D & Animações', 'AWS Cloud'], color: '#792990' },
    es: { title: 'SITIOS MODERNOS', subtitle: 'Experiencias Digitales Únicas', features: ['React y Next.js', '3D y Animaciones', 'AWS Cloud'], color: '#792990' },
    it: { title: 'SITI MODERNI', subtitle: 'Esperienze Digitali Uniche', features: ['React e Next.js', '3D e Animazioni', 'AWS Cloud'], color: '#792990' },
    en: { title: 'MODERN WEBSITES', subtitle: 'Unique Digital Experiences', features: ['React & Next.js', '3D & Animations', 'AWS Cloud'], color: '#792990' },
  },
  automation: {
    pt: { title: 'AUTOMAÇÃO INTELIGENTE', subtitle: 'Eficiência Sem Limites', features: ['Zero Erros', 'Integração Total', '24/7 Operação'], color: '#ffb947' },
    es: { title: 'AUTOMATIZACIÓN INTELIGENTE', subtitle: 'Eficiencia Sin Límites', features: ['Cero Errores', 'Integración Total', '24/7 Operación'], color: '#ffb947' },
    it: { title: 'AUTOMAZIONE INTELLIGENTE', subtitle: 'Efficienza Senza Limiti', features: ['Zero Errori', 'Integrazione Totale', '24/7 Operazione'], color: '#ffb947' },
    en: { title: 'SMART AUTOMATION', subtitle: 'Limitless Efficiency', features: ['Zero Errors', 'Full Integration', '24/7 Operation'], color: '#ffb947' },
  },
  ai: {
    pt: { title: 'INTELIGÊNCIA ARTIFICIAL', subtitle: 'O Futuro é Agora', features: ['Machine Learning', 'Análise Preditiva', 'IA Personalizada'], color: '#4a90e2' },
    es: { title: 'INTELIGENCIA ARTIFICIAL', subtitle: 'El Futuro es Ahora', features: ['Machine Learning', 'Análisis Predictivo', 'IA Personalizada'], color: '#4a90e2' },
    it: { title: 'INTELLIGENZA ARTIFICIALE', subtitle: 'Il Futuro è Ora', features: ['Machine Learning', 'Analisi Predittiva', 'IA Personalizzata'], color: '#4a90e2' },
    en: { title: 'ARTIFICIAL INTELLIGENCE', subtitle: 'The Future is Now', features: ['Machine Learning', 'Predictive Analytics', 'Custom AI'], color: '#4a90e2' },
  },
};

const PORTAL_MESSAGES: Record<TunnelLang, string[]> = {
  pt: ['BEM-VINDO AO FUTURO', 'TRANSFORMANDO IDEIAS', 'EM REALIDADE DIGITAL', 'INOVAÇÃO CONSTANTE'],
  es: ['BIENVENIDO AL FUTURO', 'TRANSFORMANDO IDEAS', 'EN REALIDAD DIGITAL', 'INNOVACIÓN CONSTANTE'],
  it: ['BENVENUTO NEL FUTURO', 'TRASFORMANDO IDEE', 'IN REALTÀ DIGITALE', 'INNOVAZIONE COSTANTE'],
  en: ['WELCOME TO THE FUTURE', 'TRANSFORMING IDEAS', 'INTO DIGITAL REALITY', 'CONSTANT INNOVATION'],
};

const COMPANY_VALUES: Record<TunnelLang, string[]> = {
  pt: ['INOVAÇÃO', 'QUALIDADE', 'PARCERIA', 'RESULTADOS'],
  es: ['INNOVACIÓN', 'CALIDAD', 'ASOCIACIÓN', 'RESULTADOS'],
  it: ['INNOVAZIONE', 'QUALITÀ', 'PARTNERSHIP', 'RISULTATI'],
  en: ['INNOVATION', 'QUALITY', 'PARTNERSHIP', 'RESULTS'],
};

export const getServiceMessage = (serviceType: ServiceType, language: string): ServiceMessage =>
  SERVICE_MESSAGES[serviceType][toTunnelLang(language)];

export const getPortalMessages = (language: string): string[] => PORTAL_MESSAGES[toTunnelLang(language)];

export const getCompanyValues = (language: string): string[] => COMPANY_VALUES[toTunnelLang(language)];
