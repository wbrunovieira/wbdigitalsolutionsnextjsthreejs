"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { useLanguage } from "./LanguageContext";

import { MessageFormat } from "../types/messages";

import en from "../locales/en.json";

const TranslationContext = createContext<MessageFormat>(en);

type TranslationProviderProps = {
    children: React.ReactNode;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
    children,
}) => {
    const { language } = useLanguage();
    const [currentMessages, setCurrentMessages] = useState<MessageFormat>(en);

    useEffect(() => {
        const langKey = language === "pt" ? "pt-BR" : language;

        if (!langKey || langKey === "en") {
            setCurrentMessages(en);
            return;
        }

        const loadLocale = async () => {
            switch (langKey) {
                case "es": {
                    const mod = await import("../locales/es.json");
                    setCurrentMessages(mod.default as MessageFormat);
                    break;
                }
                case "it": {
                    const mod = await import("../locales/it.json");
                    setCurrentMessages(mod.default as MessageFormat);
                    break;
                }
                case "pt-BR": {
                    const mod = await import("../locales/ptbr.json");
                    setCurrentMessages(mod.default as MessageFormat);
                    break;
                }
            }
        };

        loadLocale();
    }, [language]);

    return (
        <TranslationContext.Provider value={currentMessages}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => useContext(TranslationContext);
