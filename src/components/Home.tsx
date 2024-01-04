//use client
import React from 'react';
import { useTranslations } from '../contexts/TranslationContext';





const Home: React.FC = () => {

  const currentMessages = useTranslations();
  
 

  return (
    <div>
      home
      
    </div>
  );
};

export default Home;
