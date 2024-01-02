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

    { name: currentMessages.home, path: '/', subItems: []},
   
    { name: currentMessages.systems, path: '/systems',
      subItems: [
        { name: currentMessages.systemsSub1, path: '/systems/sub1' },
        { name: currentMessages.systemsSub2, path: '/systems/sub2' },
      ] },
    { name: currentMessages.websites, path: '/websites', subItems: []},
    { name: currentMessages.digitalmarketing, path: '/digitalmarketing,subItems: []'},
    { name: currentMessages.blog, path: '/blog',subItems: []},
    { name: currentMessages.contact, path: '/contact', subItems: []},
  ];

  return (
    
    <nav className='bg-primary text-secondary p-2 w-full flex  items-center py-5 fixed top-0 z-20 justify-between'>


    <div className='flex items-center flex-1 '>
        
        <Image className='w-32 h-9 object-contain' src={logo} alt="logo" width={128} height={36} objectFit="contain" />


        <p className='text-white text-sm/4 tracking-wide font-bold flex flex-col'>
            WB Digital Solutions &nbsp;
            <span className='sm:block hidden font-mono lowercase font-light'>{currentMessages.technology}</span>
        </p>

    </div>


    <div className='flex flex-1 items-center'>

        <div className='flex flex-1 flex-col'>

            

              <div className='flex flex-1 text text-xs'> 

                  <button className='btn p-2' onClick={() => setLanguage('en')}>en</button>
                  <button className='btn p-2' onClick={() => setLanguage('pt-BR')}>pt - br</button>
                  <button className='btn p-2' onClick={() => setLanguage('pt')}>pt - pt</button>
                  <button className='btn p-2' onClick={() => setLanguage('it')}>it</button>
                  <button className='btn p-2' onClick={() => setLanguage('es')}>es</button>
              </div> 

              <div className='flex flex-1 '> 

              {navData.map((link, index) => {

                    return (
                      <Link
                        className=' flex p-3 text-white lowercase text-sm tracking-widest font-light cursor-pointer '
                        href={link.path}
                        key={index}
                      >
                      
                      <div>{link.name}</div>
                      </Link>
                    );
              })
              } 

              </div>  
            </div>

          </div> 
          
        
      
    </nav>

    
  );
};

export default Nav;
