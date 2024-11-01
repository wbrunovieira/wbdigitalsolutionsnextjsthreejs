'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
};
const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage deve ser usado dentro do LanguageProvider");
    return context;
};

type LanguageProviderProps = {
    children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    const [language, setLanguage] = useState('en');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
