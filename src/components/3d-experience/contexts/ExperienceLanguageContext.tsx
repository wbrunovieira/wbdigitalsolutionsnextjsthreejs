/**
 * ExperienceLanguageContext - Language context for the 3D Experience Platform
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SupportedLanguage,
  ExperienceTranslations,
  translations,
  getTranslation,
} from '../constants/translations';

interface ExperienceLanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: ExperienceTranslations;
}

const ExperienceLanguageContext = createContext<ExperienceLanguageContextType | null>(null);

interface ExperienceLanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: SupportedLanguage;
}

export function ExperienceLanguageProvider({
  children,
  defaultLanguage = 'en',
}: ExperienceLanguageProviderProps) {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);

  // Try to detect browser language on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('experience-language') as SupportedLanguage;
      if (stored && translations[stored]) {
        setLanguage(stored);
        return;
      }

      const browserLang = navigator.language;
      if (browserLang.startsWith('pt')) {
        setLanguage('pt-BR');
      } else if (browserLang.startsWith('es')) {
        setLanguage('es');
      } else if (browserLang.startsWith('it')) {
        setLanguage('it');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  // Save language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('experience-language', language);
    }
  }, [language]);

  const t = getTranslation(language);

  return (
    <ExperienceLanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </ExperienceLanguageContext.Provider>
  );
}

export function useExperienceLanguage() {
  const context = useContext(ExperienceLanguageContext);
  if (!context) {
    throw new Error('useExperienceLanguage must be used within ExperienceLanguageProvider');
  }
  return context;
}

export default ExperienceLanguageContext;
