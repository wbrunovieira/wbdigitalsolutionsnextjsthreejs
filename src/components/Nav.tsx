// components/Nav.tsx
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../contexts/TranslationContext';

import { Link } from 'react-router-dom';

import Image from 'next/image';


import logo from '/public/svg/logo-white.svg';


const Nav: React.FC = () => {

  const currentMessages = useTranslations();

  const { setLanguage } = useLanguage();
  const [active, setActive] = useState('');

  return (
    <nav className='bg-primary text-secondary p-2 w-full flex items-center py-5 fixed top-0 z-20'>
        
        <Image className='w-32 h-9 object-contain' src={logo} alt="logo" width={128} height={36} objectFit="contain" />


        <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            WB Digital Solutions &nbsp;
            <span className='sm:block hidden'> | {currentMessages.technology}</span>
          </p>
        

      
      <button className='btn p-2' onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('pt-BR')}>Português</button>
      <button onClick={() => setLanguage('pt')}>Português -pt</button>
      <button onClick={() => setLanguage('it')}>Italiano</button>
      <button onClick={() => setLanguage('es')}>espanhol</button>
      
    </nav>
  );
};

export default Nav;
