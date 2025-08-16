import { 
  OrganizationSchema, 
  WebSiteSchema, 
  ServiceSchema, 
  BlogPostingSchema, 
  BreadcrumbSchema,
  LocalBusinessSchema 
} from '@/components/SchemaMarkup';

const SITE_URL = 'https://www.wbdigitalsolutions.com';
const LOGO_URL = `${SITE_URL}/svg/logo.svg`;
const COMPANY_NAME = 'WB Digital Solutions';

export const getOrganizationSchema = (language: string): OrganizationSchema => ({
  type: 'Organization',
  name: COMPANY_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description: getDescription(language, 'organization'),
  sameAs: [
    'https://www.linkedin.com/company/wbdigitalsolutions',
    'https://www.facebook.com/wbdigitalsolutions',
    'https://www.instagram.com/wbdigitalsolutions',
  ],
  contactPoint: {
    telephone: '+55-11-99999-9999',
    contactType: 'customer service',
    areaServed: ['BR', 'US', 'ES', 'IT'],
    availableLanguage: ['Portuguese', 'English', 'Spanish', 'Italian'],
  },
});

export const getWebSiteSchema = (language: string): WebSiteSchema => ({
  type: 'WebSite',
  name: COMPANY_NAME,
  url: SITE_URL,
  potentialAction: {
    target: `${SITE_URL}/search?q={search_term_string}`,
    queryInput: 'required name=search_term_string',
  },
});

export const getLocalBusinessSchema = (language: string): LocalBusinessSchema => ({
  type: 'LocalBusiness',
  name: COMPANY_NAME,
  description: getDescription(language, 'business'),
  url: SITE_URL,
  telephone: '+55-11-99999-9999',
  email: 'contact@wbdigitalsolutions.com',
  address: {
    addressCountry: 'BR',
    addressRegion: 'SP',
    addressLocality: 'São Paulo',
  },
  priceRange: '$$',
});

export const getServiceSchema = (
  serviceName: string, 
  serviceType: string, 
  language: string
): ServiceSchema => ({
  type: 'Service',
  name: serviceName,
  description: getServiceDescription(language, serviceType),
  provider: {
    name: COMPANY_NAME,
    url: SITE_URL,
  },
  serviceType: serviceType,
  areaServed: ['BR', 'US', 'ES', 'IT'],
  availableLanguage: ['Portuguese', 'English', 'Spanish', 'Italian'],
});

export const getBlogPostSchema = (
  title: string,
  description: string,
  author: string,
  datePublished: string,
  url: string,
  images?: string[]
): BlogPostingSchema => ({
  type: 'BlogPosting',
  headline: title,
  description: description,
  image: images || [`${SITE_URL}/img/blog-default.jpg`],
  datePublished: datePublished,
  dateModified: new Date().toISOString(),
  author: {
    name: author || 'WB Digital Solutions Team',
    url: SITE_URL,
  },
  publisher: {
    name: COMPANY_NAME,
    logo: {
      url: LOGO_URL,
    },
  },
  mainEntityOfPage: {
    id: url,
  },
});

export const getBreadcrumbSchema = (
  items: Array<{ name: string; url?: string }>,
  language: string
): BreadcrumbSchema => ({
  type: 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// Helper functions for translations
const getDescription = (language: string, type: 'organization' | 'business'): string => {
  const descriptions: Record<string, Record<string, string>> = {
    'en': {
      organization: 'WB Digital Solutions specializes in providing innovative and customized digital solutions for businesses. We offer web development, AI solutions, and digital automation.',
      business: 'Professional digital agency offering web development, artificial intelligence, and automation solutions for businesses worldwide.',
    },
    'es': {
      organization: 'WB Digital Solutions se especializa en ofrecer soluciones digitales innovadoras y personalizadas para empresas. Ofrecemos desarrollo web, soluciones de IA y automatización digital.',
      business: 'Agencia digital profesional que ofrece desarrollo web, inteligencia artificial y soluciones de automatización para empresas en todo el mundo.',
    },
    'it': {
      organization: 'WB Digital Solutions è specializzata nel fornire soluzioni digitali innovative e personalizzate per le aziende. Offriamo sviluppo web, soluzioni AI e automazione digitale.',
      business: 'Agenzia digitale professionale che offre sviluppo web, intelligenza artificiale e soluzioni di automazione per aziende in tutto il mondo.',
    },
    'pt-BR': {
      organization: 'A WB Digital Solutions é especialista em oferecer soluções digitais inovadoras e personalizadas para empresas. Oferecemos desenvolvimento web, soluções de IA e automação digital.',
      business: 'Agência digital profissional oferecendo desenvolvimento web, inteligência artificial e soluções de automação para empresas em todo o mundo.',
    },
  };

  const langKey = language === 'pt' ? 'pt-BR' : language;
  return descriptions[langKey]?.[type] || descriptions['en'][type];
};

const getServiceDescription = (language: string, serviceType: string): string => {
  const descriptions: Record<string, Record<string, string>> = {
    'en': {
      'Web Development': 'Premium custom websites with cutting-edge technology, 3D animations, and optimized performance.',
      'Artificial Intelligence': 'AI solutions including ChatGPT integration, machine learning, computer vision, and intelligent automation.',
      'Digital Automation': 'Automate your business processes with intelligent solutions to increase productivity and reduce costs.',
      'Custom Systems': 'Custom software solutions tailored to your business needs. Scalable, secure, and efficient systems.',
    },
    'es': {
      'Web Development': 'Sitios web personalizados premium con tecnología de vanguardia, animaciones 3D y rendimiento optimizado.',
      'Artificial Intelligence': 'Soluciones de IA incluyendo integración ChatGPT, machine learning, visión computacional y automatización inteligente.',
      'Digital Automation': 'Automatiza los procesos de tu negocio con soluciones inteligentes para aumentar la productividad y reducir costos.',
      'Custom Systems': 'Soluciones de software personalizadas para las necesidades de tu negocio. Sistemas escalables, seguros y eficientes.',
    },
    'it': {
      'Web Development': 'Siti web personalizzati premium con tecnologia all\'avanguardia, animazioni 3D e prestazioni ottimizzate.',
      'Artificial Intelligence': 'Soluzioni AI tra cui integrazione ChatGPT, machine learning, visione artificiale e automazione intelligente.',
      'Digital Automation': 'Automatizza i processi del tuo business con soluzioni intelligenti per aumentare la produttività e ridurre i costi.',
      'Custom Systems': 'Soluzioni software personalizzate per le esigenze del tuo business. Sistemi scalabili, sicuri ed efficienti.',
    },
    'pt-BR': {
      'Web Development': 'Sites personalizados premium com tecnologia de ponta, animações 3D e performance otimizada.',
      'Artificial Intelligence': 'Soluções de IA incluindo integração ChatGPT, machine learning, visão computacional e automação inteligente.',
      'Digital Automation': 'Automatize os processos do seu negócio com soluções inteligentes para aumentar a produtividade e reduzir custos.',
      'Custom Systems': 'Soluções de software personalizadas para as necessidades do seu negócio. Sistemas escaláveis, seguros e eficientes.',
    },
  };

  const langKey = language === 'pt' ? 'pt-BR' : language;
  return descriptions[langKey]?.[serviceType] || descriptions['en'][serviceType] || '';
};