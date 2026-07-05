"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { toAppLang, toUrlLocale } from "@/lib/i18n";


type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  isLoaded: boolean;
};


// Exported so URL-localized pages (e.g. the CV subdomains' /pt /it /es
// routes) can nest a Provider that pins the language from the route.
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
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
      localStorage.setItem("language", lang === "pt" ? "pt-BR" : lang);
    } catch {
      /* storage unavailable (private mode); navigation still works */
    }
    router.push(router.asPath, router.asPath, { locale: toUrlLocale(lang) });
  };

  // Keep <html lang> in sync with the rendered language.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};