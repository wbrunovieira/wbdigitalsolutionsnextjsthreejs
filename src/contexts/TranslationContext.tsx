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

// Exported so URL-localized pages can nest a Provider with route-locale messages.
export const TranslationContext = createContext<MessageFormat>(en);

type TranslationProviderProps = {
    children: React.ReactNode;
    /** Locale messages loaded server-side (pageProps.i18n.messages) so the
        SSR/SSG HTML is in the URL's language; crawlers never see EN-only. */
    initialMessages?: MessageFormat;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
    children,
    initialMessages,
}) => {
    const { language } = useLanguage();
    const [currentMessages, setCurrentMessages] = useState<MessageFormat>(initialMessages ?? en);

    // Route changes deliver fresh initialMessages via pageProps.
    useEffect(() => {
        if (initialMessages) setCurrentMessages(initialMessages);
    }, [initialMessages]);

    // Client-side fallback for pages WITHOUT getStaticProps (e.g. the 3D
    // experiences): load the locale bundle dynamically as before.
    useEffect(() => {
        if (initialMessages) return;
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
    }, [language, initialMessages]);

    return (
        <TranslationContext.Provider value={currentMessages}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => useContext(TranslationContext);
