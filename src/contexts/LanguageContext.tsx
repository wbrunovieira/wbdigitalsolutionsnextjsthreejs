"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";


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


const detectBrowserLanguage = (): string => {

  if (typeof navigator === "undefined") return "en";
  
  const lang = navigator.language.toLowerCase();


  if (lang.startsWith("pt")) return "pt-BR"; 
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("it")) return "it";
  if (lang.startsWith("en")) return "en";


  return "en";
};

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // Start with a default language for SSR
  const [language, setLanguage] = useState<string>("en");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load the correct language on mount (client-side only)
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage) {
      // Fix legacy "pt" value to "pt-BR"
      if (savedLanguage === "pt") {
        localStorage.setItem("language", "pt-BR");
        setLanguage("pt-BR");
      } else {
        setLanguage(savedLanguage);
      }
    } else {
      const browserLanguage = detectBrowserLanguage();
      setLanguage(browserLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Save language changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("language", language);
    }
  }, [language, isLoaded]);

  // Keep <html lang> in sync with the active language. The SSR value comes from
  // Accept-Language (_document), but the client may render a different language
  // (localStorage / navigator), so update it to match the rendered content.
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