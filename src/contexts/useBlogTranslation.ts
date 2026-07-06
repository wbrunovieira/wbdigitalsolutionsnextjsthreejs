'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// One section of a blog post's body, matching the blog JSON files.
export interface BlogSection {
  title: string;
  content: string[];
  quotes?: { text: string; author: string }[];
}

// Shape of a dynamically imported blog locale bundle. The same hook loads
// both post content and the index-page strings, so the index-only fields
// are optional while the fields pages read unguarded stay required.
export interface BlogTranslation {
  title: string;
  category: string[];
  thumbnail: string;
  summary?: string;
  text?: BlogSection[];
  images?: string[];
  author?: string;
  datePublished?: string;
  subtitle?: string;
  filterLabel?: string;
  allCategories?: string;
  loading?: string;
  noPosts?: string;
}

const useBlogTranslation = (postId: string | undefined) => {
  const { language } = useLanguage();
  const [translation, setTranslation] = useState<BlogTranslation | null>(null);

  useEffect(() => {
    if (!postId) return;

    const loadTranslation = async () => {
      try {
        let response;

        if (language === 'en') {
          response = await import(`@/locales/blog/en/${postId}.json`);
        } else if (language === 'es') {
          response = await import(`@/locales/blog/es/${postId}.json`);
        } else if (language === 'it') {
          response = await import(`@/locales/blog/it/${postId}.json`);
        } else if (language === 'pt-BR') {
          response = await import(`@/locales/blog/ptbr/${postId}.json`);
        } else {
          response = await import(`@/locales/blog/en/${postId}.json`); // fallback para inglês
        }

        setTranslation(response.default as BlogTranslation);
      } catch (error) {
        console.error(`Erro ao carregar a tradução para ${postId} em ${language}:`, error);
        setTranslation(null);
      }
    };

    // Fire-and-forget: the catch above already handles load failures.
    void loadTranslation();
  }, [language, postId]);

  return translation;
};

export default useBlogTranslation;
