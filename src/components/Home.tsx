//use client
import React from 'react';
import { useTranslations } from '../contexts/TranslationContext';
import  HeroSection from './HeroSection';







const Home: React.FC = () => {

  const currentMessages = useTranslations();
  
 

  return (
  <HeroSection />
  );
};

export default Home;
