import type { CVLang } from '@/content/cv';

// URL-localized routes (SEO pilot): / = en + x-default, /pt /it /es localized.
export const BASE = 'https://brunodev.wbdigitalsolutions.com';
export const SLUG: Record<CVLang, string> = { en: '', 'pt-BR': '/pt', it: '/it', es: '/es' };
export const SLUG_TO_LANG: Record<string, CVLang> = { pt: 'pt-BR', it: 'it', es: 'es' };
export const LOCALE_FILE: Record<Exclude<CVLang, 'en'>, string> = { 'pt-BR': 'ptbr', it: 'it', es: 'es' };
/** One OG card per locale URL (same identity, localized role line). */
export const OG_IMG: Record<CVLang, string> = {
  en: '/img/og-dev.jpg',
  'pt-BR': '/img/og-dev-pt.jpg',
  it: '/img/og-dev-it.jpg',
  es: '/img/og-dev-es.jpg',
};
export const OG_LOCALE: Record<CVLang, string> = { en: 'en_US', 'pt-BR': 'pt_BR', it: 'it_IT', es: 'es_ES' };
/** Privacy-policy link label per locale (this page bypasses the site Footer,
    yet still loads analytics — so it needs a reachable privacy notice). */
export const PRIVACY_LABEL: Record<CVLang, string> = {
  en: 'Privacy Policy', 'pt-BR': 'Política de Privacidade', it: 'Informativa sulla Privacy', es: 'Política de Privacidad',
};

export const SEO: Record<CVLang, { title: string; description: string }> = {
  en: {
    title: 'Bruno Vieira · Senior Full-Stack & AI Engineer',
    description:
      'Walter Bruno Prado Vieira, Senior Full-Stack & AI Engineer. I turn complex problems into scalable software: production platforms, AI systems (LangGraph, RAG) and interactive 3D, owned end to end from architecture to deploy.',
  },
  'pt-BR': {
    title: 'Bruno Vieira · Engenheiro Full-Stack & IA Sênior',
    description:
      'Walter Bruno Prado Vieira, Engenheiro Full-Stack & IA Sênior. Transformo problemas complexos em software escalável: plataformas em produção, sistemas de IA (LangGraph, RAG) e 3D interativo, da arquitetura ao deploy.',
  },
  it: {
    title: 'Bruno Vieira · Ingegnere Full-Stack & IA Senior',
    description:
      "Walter Bruno Prado Vieira, Ingegnere Full-Stack & IA Senior. Trasformo problemi complessi in software scalabile: piattaforme in produzione, sistemi di IA (LangGraph, RAG) e 3D interattivo, dall'architettura al deploy.",
  },
  es: {
    title: 'Bruno Vieira · Ingeniero Full-Stack & IA Senior',
    description:
      'Walter Bruno Prado Vieira, Ingeniero Full-Stack & IA Senior. Transformo problemas complejos en software escalable: plataformas en producción, sistemas de IA (LangGraph, RAG) y 3D interactivo, de la arquitectura al deploy.',
  },
};
