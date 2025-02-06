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
  const [language, setLanguage] = useState<string>("en");





  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      const browserLanguage = detectBrowserLanguage();
      setLanguage(browserLanguage);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};