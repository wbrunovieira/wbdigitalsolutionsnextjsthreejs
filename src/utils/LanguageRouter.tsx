// components/LanguageRouter.tsx
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function LanguageRouter() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    const browserLanguage = navigator.language.split('-')[0];
    const defaultLanguage = 'en'; 

    const language = queryLanguage || browserLanguage || defaultLanguage;
    setLanguage(language);
  }, []);

  return null;
}


export default LanguageRouter;