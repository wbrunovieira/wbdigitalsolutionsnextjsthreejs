// components/Home.tsx
import React from 'react';
import { useTranslations } from '../contexts/TranslationContext';





const Home: React.FC = () => {

  const currentMessages = useTranslations();
  
 

  return (
    <div>
      
      <h1>{currentMessages.welcome}</h1>
    </div>
  );
};

export default Home;
