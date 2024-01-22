//use client
import React from 'react';
import { useTranslations } from '../contexts/TranslationContext';
import HeroSection from './HeroSection';
import SectionDaHome from './SectionDaHome';
// import SectionDaHome from './HomeSection';

const Home: React.FC = () => {
  const currentMessages = useTranslations();

  return (
    <>
      <HeroSection />

      <SectionDaHome />
    </>
  );
};

export default Home;
