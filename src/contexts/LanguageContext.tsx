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
  const [language, setLanguage] = useState<string>("en");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load the correct language on mount (client-side only)
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};