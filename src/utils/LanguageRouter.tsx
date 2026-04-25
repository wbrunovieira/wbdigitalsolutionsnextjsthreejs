"use client";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// Only handles ?lang= query param overrides.
// LanguageContext already handles localStorage persistence and browser language detection.
function LanguageRouter() {
    const { setLanguage } = useLanguage();

    useEffect(() => {
        const queryLanguage = new URLSearchParams(window.location.search).get("lang");
        if (queryLanguage) {
            setLanguage(queryLanguage);
        }
    }, [setLanguage]);

    return null;
}

export default LanguageRouter;
