export type ProjectCategory =
  | 'all'
  | 'sistemas'
  | 'website'
  | 'automation'
  | 'ai'
  | 'ecommerce'
  | 'education';

export interface ShowcaseProject {
  id: string;
  title: string;
  descriptor?: string;
  category: ProjectCategory;
  icon: string;
}

export interface HeroContent {
  eyebrow: string;
  lead: string;
  accent: string;
  subtitle: string;
  explore: string;
}

export const CTA_LABELS: Record<string, string> = {
  en: 'View projects',
  es: 'Ver proyectos',
  it: 'Vedi progetti',
  'pt-BR': 'Ver projetos',
};

export const getHeroContent = (lang: string): HeroContent => {
  switch (lang) {
    case 'pt-BR':
      return { eyebrow: 'Portfólio', lead: 'Nossos', accent: 'Projetos', subtitle: 'Conheça alguns dos trabalhos que realizamos para nossos clientes', explore: 'Explorar projetos' };
    case 'es':
      return { eyebrow: 'Portafolio', lead: 'Nuestros', accent: 'Proyectos', subtitle: 'Conoce algunos de los trabajos que hemos realizado para nuestros clientes', explore: 'Explorar proyectos' };
    case 'it':
      return { eyebrow: 'Portfolio', lead: 'I Nostri', accent: 'Progetti', subtitle: 'Scopri alcuni dei lavori che abbiamo realizzato per i nostri clienti', explore: 'Esplora progetti' };
    default:
      return { eyebrow: 'Portfolio', lead: 'Our', accent: 'Projects', subtitle: 'Discover some of the work we have done for our clients', explore: 'Explore projects' };
  }
};

export const getShowcaseProjects = (lang: string): ShowcaseProject[] => [
  { id: '1', category: 'education', icon: '🎓', title: lang === 'pt-BR' ? 'Plataforma de Ensino' : lang === 'es' ? 'Plataforma de Enseñanza' : lang === 'it' ? 'Piattaforma di Apprendimento' : 'Learning Platform' },
  { id: '2', category: 'website', icon: '🌐', title: lang === 'pt-BR' ? 'Site Corporativo' : lang === 'es' ? 'Sitio Corporativo' : lang === 'it' ? 'Sito Aziendale' : 'Corporate Website' },
  { id: '3', category: 'automation', icon: '⚙️', title: lang === 'pt-BR' ? 'Sistema de Automação' : lang === 'es' ? 'Sistema de Automatización' : lang === 'it' ? 'Sistema di Automazione' : 'Automation System' },
  { id: '4', category: 'ai', icon: '🤖', title: lang === 'pt-BR' ? 'Agentes de IA' : lang === 'es' ? 'Agentes de IA' : lang === 'it' ? 'Agenti IA' : 'AI Agents' },
  { id: '5', category: 'sistemas', icon: '🖥️', title: lang === 'pt-BR' ? 'Sistemas' : lang === 'es' ? 'Sistemas' : lang === 'it' ? 'Sistemi' : 'Systems' },
  { id: '6', category: 'ecommerce', icon: '🛒', title: 'E-commerce' },
];
