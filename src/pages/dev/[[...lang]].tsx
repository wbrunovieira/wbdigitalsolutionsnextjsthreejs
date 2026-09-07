import { useMemo } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { LanguageContext } from '@/contexts/LanguageContext';
import { TranslationContext } from '@/contexts/TranslationContext';
import en from '@/locales/en.json';
import type { MessageFormat } from '@/types/messages';
import type { CVLang } from '@/content/cv';
import { LOCALE_FILE, PRIVACY_LABEL, SLUG_TO_LANG } from '@/content/devCvSeo';
import type { ProjectsPageContent } from '@/components/projects/types';
import DevHead from '@/components/cv/DevHead';
import { useDevRouteLocale } from '@/components/cv/useDevRouteLocale';
import DevHero from '@/components/cv/DevHero';
import DevPhilosophy from '@/components/cv/DevPhilosophy';
import DevTimeline from '@/components/cv/DevTimeline';
import DevStack from '@/components/cv/DevStack';
import DevProjects from '@/components/cv/DevProjects';
import DevBuilding from '@/components/cv/DevBuilding';
import DevLanguages from '@/components/cv/DevLanguages';
import DevAbout from '@/components/cv/DevAbout';
import DevContact from '@/components/cv/DevContact';
import DevSkeleton from '@/components/cv/DevSkeleton';

type Props = { lang: CVLang; projectsPage: ProjectsPageContent };

export default function DevCV({ lang, projectsPage }: Props) {
  // Pins the language from the URL for every CV component (they all consume
  // useLanguage).
  const langValue = useDevRouteLocale(lang);

  // Route-locale messages for components that read useTranslations
  // (DevProjects); only projectsPage differs from the en base here.
  const messages = useMemo(() => ({ ...(en as MessageFormat), projectsPage }) as MessageFormat, [projectsPage]);

  return (
    <LanguageContext.Provider value={langValue}>
      <TranslationContext.Provider value={messages}>
        <DevHead lang={lang} />
        <DevSkeleton />
        <DevHero />
        <DevPhilosophy variant="problem" id="filosofia" />
        <DevTimeline />
        <DevStack />
        <DevProjects />
        <DevBuilding />
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
