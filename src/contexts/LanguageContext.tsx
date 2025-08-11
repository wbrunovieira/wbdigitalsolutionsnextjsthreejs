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
};


const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
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
  // Initialize with the correct language from the start
  const getInitialLanguage = (): string => {
    if (typeof window === "undefined") return "en";
    
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      return savedLanguage;
    }
    
    return detectBrowserLanguage();
  };

  const [language, setLanguage] = useState<string>(getInitialLanguage());





  // No longer need to set language in useEffect since it's initialized correctly
  // This prevents the visual glitch where language changes after mount


  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};