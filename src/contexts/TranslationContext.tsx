"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";
import { useLanguage } from "./LanguageContext";

import { MessageFormat, MessagesType } from "../types/messages";

import en from "../locales/en.json";

import es from "../locales/es.json";
import it from "../locales/it.json";
import ptbr from "../locales/ptbr.json";

const TranslationContext = createContext<MessageFormat>(en);

type TranslationProviderProps = {
    children: React.ReactNode;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
    children,
}) => {
    const { language } = useLanguage();
    const translations: MessagesType = useMemo(
        () => ({
            en,
          
            es,
            it,
            "pt-BR": ptbr,
        }),
        []
    );
    const [currentMessages, setCurrentMessages] = useState<MessageFormat>(
        translations.en
    );

    useEffect(() => {
        console.log('TranslationContext - language received:', language);
        // Handle both "pt" and "pt-BR"
        const langKey = language === "pt" ? "pt-BR" : language;
        setCurrentMessages(translations[langKey] || translations.en);
    }, [language, translations]);

    return (
        <TranslationContext.Provider value={currentMessages}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => useContext(TranslationContext);
