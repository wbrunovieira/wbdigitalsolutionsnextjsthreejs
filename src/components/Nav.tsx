//use client
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../contexts/TranslationContext';


import Link from 'next/link';


import { useRouter } from 'next/router';

import Image from 'next/image';


import logo from '/public/svg/logo-white.svg';


const Nav: React.FC = () => {

  

  const router = useRouter();
  const pathname = router.pathname;
  const { setLanguage } = useLanguage();

  const currentMessages = useTranslations();


  const navData = [

    { name: currentMessages.home, path: '/', },
   
    { name: currentMessages.systems, path: '/systems' },
    { name: currentMessages.websites, path: '/websites'},
    { name: currentMessages.digitalmarketing, path: '/digitalmarketing'},
    { name: currentMessages.blog, path: '/blog'},
    { name: currentMessages.contact, path: '/contact'},
  ];

  return (
    
    <nav className='bg-primary text-secondary p-2 w-full flex items-center py-5 fixed top-0 z-20'>
        
        <Image className='w-32 h-9 object-contain' src={logo} alt="logo" width={128} height={36} objectFit="contain" />


        <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            WB Digital Solutions &nbsp;
            <span className='sm:block hidden font-mono font-light'> | {currentMessages.technology}</span>
          </p>

          {navData.map((link, index) => {
          return (
            <Link
              className=' flex p-3 text-white  font-bold cursor-pointer '
              href={link.path}
              key={index}
            >
            
            <div>{link.name}</div>
            </Link>
          );
        })}  
          
    

          <button className='btn p-2' onClick={() => setLanguage('en')}>en</button>
          <button onClick={() => setLanguage('pt-BR')}>pt - br</button>
          <button onClick={() => setLanguage('pt')}>pt -pt</button>
          <button onClick={() => setLanguage('it')}>it</button>
          <button onClick={() => setLanguage('es')}>es</button>
      
      
    </nav>

    
  );
};

export default Nav;
