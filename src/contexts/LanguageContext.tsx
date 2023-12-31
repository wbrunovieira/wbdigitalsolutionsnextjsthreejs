// contexts/LanguageContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: (language: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

// Definindo o tipo para as propriedades de LanguageProvider
type LanguageProviderProps = {
  children: ReactNode;
};



export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


