"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const useBlogTranslation = (postId: string | undefined) => {
  const { language } = useLanguage();
  const [translation, setTranslation] = useState<any>(null);

  useEffect(() => {
    if (!postId) return;

    const loadTranslation = async () => {
      try {
        let response;

        if (language === "en") {
          response = await import(`@/locales/blog/en/${postId}.json`);
        } else if (language === "es") {
          response = await import(`@/locales/blog/es/${postId}.json`);
        } else if (language === "it") {
          response = await import(`@/locales/blog/it/${postId}.json`);
        } else if (language === "pt-BR") {
          response = await import(`@/locales/blog/ptbr/${postId}.json`);
        } else {
          response = await import(`@/locales/blog/en/${postId}.json`); // fallback para inglês
        }

        setTranslation(response.default);
      } catch (error) {
        console.error(`Erro ao carregar a tradução para ${postId} em ${language}:`, error);
        setTranslation(null);
      }
    };

    loadTranslation();
  }, [language, postId]);

  return translation;
};

export default useBlogTranslation;