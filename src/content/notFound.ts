export type ShortcutKey = 'websites' | 'systems' | 'automation' | 'ai' | 'blog' | 'contact';

export type NotFoundCopy = {
  kicker: string;
  headline: string;
  description: string;
  cta: string;
  shortcutsIntro: string;
  shortcuts: Record<ShortcutKey, string>;
  aria404: string;
  ariaNav: string;
  ariaLogo: string;
};

// Pure copy Record (exempt from the 200-line rule). Humor is written natively
// per locale, not translated literally.

/** Copy for the 404 page. */
export const notFoundContent: Record<'pt-BR' | 'en' | 'es' | 'it', NotFoundCopy> = {
  'pt-BR': {
    kicker: 'Erro 404',
    headline: 'Essa página a gente ainda não desenhou.',
    description:
      'O link pode ter mudado ou nunca ter existido. Acontece até nos melhores projetos. Enquanto isso, o resto do site está funcionando lindamente.',
    cta: 'Voltar para a home',
    shortcutsIntro: 'Ou siga por um destes caminhos:',
    shortcuts: {
      websites: 'Websites', systems: 'Sistemas', automation: 'Automação',
      ai: 'IA', blog: 'Blog', contact: 'Contato',
    },
    aria404: 'Erro 404: página não encontrada',
    ariaNav: 'Atalhos para as principais páginas',
    ariaLogo: 'WB Digital Solutions, ir para a página inicial',
  },
  en: {
    kicker: 'Error 404',
    headline: "This page didn't make the final design.",
    description:
      'The link may have moved, or it never existed in the first place. Either way, the rest of the site is pixel-perfect and one click away.',
    cta: 'Back to home',
    shortcutsIntro: 'Or take a shortcut:',
    shortcuts: {
      websites: 'Websites', systems: 'Systems', automation: 'Automation',
      ai: 'AI', blog: 'Blog', contact: 'Contact',
    },
    aria404: 'Error 404: page not found',
    ariaNav: 'Shortcuts to the main pages',
    ariaLogo: 'WB Digital Solutions, go to the homepage',
  },
  es: {
    kicker: 'Error 404',
    headline: 'Esta página no pasó del boceto.',
    description:
      'Puede que el enlace haya cambiado o que nunca haya existido. Tranquilo: el resto del sitio está impecable y a un clic de distancia.',
    cta: 'Volver al inicio',
    shortcutsIntro: 'O sigue por aquí:',
    shortcuts: {
      websites: 'Websites', systems: 'Sistemas', automation: 'Automatización',
      ai: 'IA', blog: 'Blog', contact: 'Contacto',
    },
    aria404: 'Error 404: página no encontrada',
    ariaNav: 'Atajos a las páginas principales',
    ariaLogo: 'WB Digital Solutions, ir a la página de inicio',
  },
  it: {
    kicker: 'Errore 404',
    headline: 'Questa pagina è rimasta sul tavolo da disegno.',
    description:
      'Forse il link è cambiato, forse non è mai esistito. In ogni caso il resto del sito è al suo posto, a un clic da qui.',
    cta: 'Torna alla home',
    shortcutsIntro: 'Oppure prosegui da qui:',
    shortcuts: {
      websites: 'Websites', systems: 'Sistemi', automation: 'Automazione',
      ai: 'IA', blog: 'Blog', contact: 'Contatti',
    },
    aria404: 'Errore 404: pagina non trovata',
    ariaNav: 'Scorciatoie alle pagine principali',
    ariaLogo: 'WB Digital Solutions, vai alla home page',
  },
};

// All six shortcut routes exist under src/pages/.
