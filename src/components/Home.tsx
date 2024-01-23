//use client
import React from 'react';
import { useTranslations } from '../contexts/TranslationContext';
import HeroSection from './HeroSection';
import SectionDaHome from './SectionDaHome';
import InfiniteScrollHash from './InfiniteScrollHash';
// import SectionDaHome from './HomeSection';

const Home: React.FC = () => {
  const currentMessages = useTranslations();

  return (
    <>
      <main className='bg-[#350545]'>
        <HeroSection />
        <InfiniteScrollHash />
        <SectionDaHome />
      </main>
    </>
  );
};

export default Home;
