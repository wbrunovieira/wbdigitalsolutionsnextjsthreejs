//use client
import React from 'react';






import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '@/contexts/TranslationContext';





export default function RootLayout({

 
  
  children,
}: {
  children: React.ReactNode
}) {
  const { language } = useLanguage();




 

  return (
    <></>
  );
}
