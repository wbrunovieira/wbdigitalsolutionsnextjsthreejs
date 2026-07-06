'use client';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { toAppLang, toUrlLocale } from '@/lib/i18n';


type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  isLoaded: boolean;
};


// Exported so URL-localized pages (e.g. the CV subdomains' /pt /it /es
// routes) can nest a Provider that pins the language from the route.
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isLoaded: false,
});

export const useLanguage = () => useContext(LanguageContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // URL-driven i18n: the router locale IS the language (SSR-correct, so
  // crawlers index each locale's content). setLanguage navigates to the
  // same path under the new locale and persists the choice for future use
  // (e.g. a "continue in your language?" hint). The old localStorage/
  // navigator detection is gone on purpose: the URL decides, per the
  // migration plan (no Accept-Language redirects).
  const router = useRouter();
  const language = toAppLang(router.locale);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => setIsLoaded(true), []);

  const setLanguage = (lang: string) => {
    try {
      localStorage.setItem('language', lang === 'pt' ? 'pt-BR' : lang);
    } catch {
      /* storage unavailable (private mode); navigation still works */
    }
    // Fire-and-forget navigation; Next surfaces routing errors itself.
    void router.push(router.asPath, router.asPath, { locale: toUrlLocale(lang) });
  };

  // Keep <html lang> in sync with the rendered language. The SSR HTML ships
  // the right value (_document), but Next's client overwrites it with the
  // raw URL locale ("pt") at unpredictable moments (hydration, navigations),
  // so a MutationObserver guards the attribute and restores the proper
  // BCP 47 value whenever anything rewrites it. No loop: we only write when
  // the value differs.
  useEffect(() => {
    const apply = () => {
      if (document.documentElement.lang !== language) {
        document.documentElement.lang = language;
      }
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};