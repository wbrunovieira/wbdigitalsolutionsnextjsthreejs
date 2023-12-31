// contexts/TranslationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

import { MessageFormat, MessagesType } from '../types/messages';

import en from '../locales/en.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';
import it from '../locales/it.json';
import ptbr from '../locales/ptbr.json';

const TranslationContext = createContext<MessageFormat>(en);

type TranslationProviderProps = {
    children: React.ReactNode;
  };
  

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { language } = useLanguage();
  const translations: MessagesType = { en, pt, es, it, 'pt-BR': ptbr };
  const [currentMessages, setCurrentMessages] = useState<MessageFormat>(translations.en);

  useEffect(() => {

    setCurrentMessages(translations[language] || translations.en);

  }, [language]);

  return (
    <TranslationContext.Provider value={currentMessages}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslations = () => useContext(TranslationContext);
