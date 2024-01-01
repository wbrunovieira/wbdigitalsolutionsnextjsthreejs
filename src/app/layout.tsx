import React from 'react';


import type { Metadata } from 'next';

import './globals.css';

import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '@/contexts/TranslationContext';





export default function RootLayout({

 
  
  children,
}: {
  children: React.ReactNode
}) {
  const { language } = useLanguage();
  const currentMessages = useTranslations();

 const metadata: Metadata = {

    title: `${currentMessages.title}`,
    description: `${currentMessages.description}`,
  };
  

 

  return (
    <html lang={language}>
    
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Ubuntu+Mono:wght@700&display=swap" rel="stylesheet" />

      <body >{children}</body>
    </html>
  );
}
