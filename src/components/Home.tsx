// components/Home.tsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../contexts/TranslationContext';
import Nav from './Nav';




const Home: React.FC = () => {

  const currentMessages = useTranslations();
  const { language } = useLanguage();
 

  return (
    <div>
      <Nav />
      <h1>{currentMessages.welcome}</h1>
    </div>
  );
};

export default Home;
