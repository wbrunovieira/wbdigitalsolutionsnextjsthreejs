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


const LanguageContext = createContext<LanguageContextType>({
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
    console.log('LanguageContext - savedLanguage from localStorage:', savedLanguage);
    
    if (savedLanguage) {
      // Fix legacy "pt" value to "pt-BR"
      if (savedLanguage === "pt") {
        console.log('LanguageContext - migrating "pt" to "pt-BR"');
        localStorage.setItem("language", "pt-BR");
        setLanguage("pt-BR");
      } else {
        setLanguage(savedLanguage);
      }
    } else {
      const browserLanguage = detectBrowserLanguage();
      console.log('LanguageContext - detected browser language:', browserLanguage);
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};