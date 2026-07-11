import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { LanguageContext } from '@/contexts/LanguageContext';
import { TranslationContext } from '@/contexts/TranslationContext';
import en from '@/locales/en.json';
import type { MessageFormat } from '@/types/messages';
import type { CVLang } from '@/content/cv';
import type { ProjectsPageContent } from '@/components/projects/types';
import DevHero from '@/components/cv/DevHero';
import DevPhilosophy from '@/components/cv/DevPhilosophy';
import DevTimeline from '@/components/cv/DevTimeline';
import DevStack from '@/components/cv/DevStack';
import DevProjects from '@/components/cv/DevProjects';
import DevLanguages from '@/components/cv/DevLanguages';
import DevAbout from '@/components/cv/DevAbout';
import DevContact from '@/components/cv/DevContact';
import DevSkeleton from '@/components/cv/DevSkeleton';

// URL-localized routes (SEO pilot): / = en + x-default, /pt /it /es localized.
const BASE = 'https://brunodev.wbdigitalsolutions.com';
const SLUG: Record<CVLang, string> = { en: '', 'pt-BR': '/pt', it: '/it', es: '/es' };
const SLUG_TO_LANG: Record<string, CVLang> = { pt: 'pt-BR', it: 'it', es: 'es' };
const LOCALE_FILE: Record<Exclude<CVLang, 'en'>, string> = { 'pt-BR': 'ptbr', it: 'it', es: 'es' };
/** One OG card per locale URL (same identity, localized role line). */
const OG_IMG: Record<CVLang, string> = {
  en: '/img/og-dev.jpg',
  'pt-BR': '/img/og-dev-pt.jpg',
  it: '/img/og-dev-it.jpg',
  es: '/img/og-dev-es.jpg',
};
const OG_LOCALE: Record<CVLang, string> = { en: 'en_US', 'pt-BR': 'pt_BR', it: 'it_IT', es: 'es_ES' };
/** Privacy-policy link label per locale (this page bypasses the site Footer,
    yet still loads analytics — so it needs a reachable privacy notice). */
const PRIVACY_LABEL: Record<CVLang, string> = {
  en: 'Privacy Policy', 'pt-BR': 'Política de Privacidade', it: 'Informativa sulla Privacy', es: 'Política de Privacidad',
};

const SEO: Record<CVLang, { title: string; description: string }> = {
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

type Props = { lang: CVLang; projectsPage: ProjectsPageContent };

export default function DevCV({ lang, projectsPage }: Props) {
  const seo = SEO[lang];
  const canonical = `${BASE}${SLUG[lang]}`;

  // Persist the route locale for the main site's "continue in your language"
  // hint. Write localStorage directly: the global setLanguage now NAVIGATES
  // (router.push with a locale), and on this subdomain router.locale is always
  // the internal 'en', so calling it fired on every non-en page and looped the
  // UI (rapid language flicker).
  useEffect(() => {
    try {
      localStorage.setItem('language', lang);
    } catch {
      /* storage unavailable (private mode) */
    }
  }, [lang]);

  // Built-in Next i18n treats the subdomain's locale prefix (/pt /it /es) as a
  // locale and, since the client router can't see the edge host-rewrite, it
  // reconciles the URL back to '/' on hydration, erasing the locale. Re-assert
  // the intended URL with a raw replaceState (no router nav, so it can't
  // re-trigger the reconciliation); a short re-check window beats Next's async
  // pass, then stops. The root locale (SLUG '') is already correct.
  useEffect(() => {
    const want = SLUG[lang];
    if (!want) return;
    if (window.location.pathname.startsWith('/dev')) return; // internal www/localhost path
    let tries = 0;
    let id = 0;
    const restore = () => {
      if (window.location.pathname !== want) {
        window.history.replaceState(window.history.state, '', want + window.location.search + window.location.hash);
      }
      if (++tries < 10) id = window.setTimeout(restore, 100);
    };
    id = window.setTimeout(restore, 0);
    return () => window.clearTimeout(id);
  }, [lang]);

  // Pin the language from the URL for every CV component (they all consume
  // useLanguage). Switching languages navigates to the sibling URL with a
  // full load so the subdomain host-rewrites resolve.
  const langValue = useMemo(
    () => ({
      language: lang as string,
      isLoaded: true,
      setLanguage: (l: string) => {
        try {
          localStorage.setItem('language', l);
        } catch {
          /* storage unavailable (private mode) */
        }
        const base = window.location.pathname.startsWith('/dev') ? '/dev' : '';
        window.location.assign(base + SLUG[(l as CVLang) ?? 'en'] || '/');
      },
    }),
    // Deps intentionally limited to lang: the provider value must stay stable
    // across globalLang identity changes.
    [lang],
  );

  // Route-locale messages for components that read useTranslations
  // (DevProjects); only projectsPage differs from the en base here.
  const messages = useMemo(() => ({ ...(en as MessageFormat), projectsPage }) as MessageFormat, [projectsPage]);

  return (
    <LanguageContext.Provider value={langValue}>
      <TranslationContext.Provider value={messages}>
        <Head>
          {/* CV pages bypass Layout/PageHead, so the full viewport meta must be
              set here; Next's default lacks initial-scale and Safari renders
              the page zoomed-out without it. */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* SSR-inline background: kills the WB purple flash (global.css paints
              html #350545 + a body gradient and can land AFTER this style in
              the cascade, hence the !important). */}
          <style dangerouslySetInnerHTML={{ __html: 'html,body{background:#0e0e11!important}' }} />
          <link rel="icon" type="image/svg+xml" href="/favicon-dev.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-dev-32.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-dev.png" />
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="robots" content="index,follow" />
          <link rel="canonical" href={canonical} />
          {/* hreflang matrix: every locale URL lists all versions + x-default */}
          {(Object.keys(SLUG) as CVLang[]).map((l) => (
            <link key={l} rel="alternate" hrefLang={l} href={`${BASE}${SLUG[l]}`} />
          ))}
          <link rel="alternate" hrefLang="x-default" href={BASE} />
          <meta property="og:type" content="profile" />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:url" content={canonical} />
          <meta property="og:image" content={`${BASE}${OG_IMG[lang]}`} />
          <meta property="og:locale" content={OG_LOCALE[lang]} />
          {(Object.keys(OG_LOCALE) as CVLang[])
            .filter((l) => l !== lang)
            .map((l) => (
              <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
            ))}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={`${BASE}${OG_IMG[lang]}`} />
        </Head>
        <DevSkeleton />
        <DevHero />
        <DevPhilosophy variant="problem" id="filosofia" />
        <DevTimeline />
        <DevStack />
        <DevProjects />
        <DevLanguages />
        <DevAbout />
        <DevPhilosophy variant="people" id="oficio" />
        <DevContact />
        <footer className="py-8 text-center">
          <a
            href="https://www.wbdigitalsolutions.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 underline underline-offset-2 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {PRIVACY_LABEL[lang]}
          </a>
        </footer>
      </TranslationContext.Provider>
    </LanguageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ['/dev', '/dev/pt', '/dev/it', '/dev/es'],
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = (params?.lang as string[] | undefined)?.[0];
  const lang: CVLang = slug ? SLUG_TO_LANG[slug] : 'en';
  const messages =
    lang === 'en'
      ? (en as MessageFormat)
      : ((await import(`@/locales/${LOCALE_FILE[lang as Exclude<CVLang, 'en'>]}.json`)).default as MessageFormat);
  return { props: { lang, projectsPage: messages.projectsPage as ProjectsPageContent } };
};
