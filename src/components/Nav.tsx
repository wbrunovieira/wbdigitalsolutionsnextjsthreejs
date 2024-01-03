//use client
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../contexts/TranslationContext';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SubMenu from '../components/Submenu';


import { useRouter } from 'next/router';

import Image from 'next/image';


import logo from '/public/svg/logo-white.svg';


const Nav: React.FC = () => {

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const router = useRouter();
  const pathname = router.pathname;
  const { language, setLanguage } = useLanguage();

  const currentMessages = useTranslations();


  const navData = [

    { name: currentMessages.home, path: '/', subItems: [
      { name: currentMessages.homewho, path: '/home/who' },
      { name: currentMessages.homeculture, path: '/home/culture' },
    ]},

   
    ...(language === 'pt-BR' ? [{ name: currentMessages.systems, path: '/systems',
      subItems: [
        { name: currentMessages.wbweb, path: '/systems/wbweb' },
        { name: currentMessages.wbsalao, path: '/systems/wbsalao' },
        { name: currentMessages.wbclinica, path: '/systems/wbclinica' },
        { name: currentMessages.wbfood, path: '/systems/wbfood' },
        { name: currentMessages.wbpet, path: '/systems/wbpet' },
      ] }] : []),

      

    { name: currentMessages.websites, path: '/websites', subItems: [  
      { name: currentMessages.websitesland, path: '/websites/land' },
      { name: currentMessages.websitesProjects, path: '/websites/projects' },
    ]},

    { name: currentMessages.design, path: '/design', subItems: []},

    { name: currentMessages.digitalmarketing, path: '/digitalmarketing',subItems: [
      { name: currentMessages.digitalmarketingSeo, path: '/digitalmarketing/seo' },
      { name: currentMessages.digitalmarketingAds, path: 'digitalmarketing/ads' },
      { name: currentMessages.digitalmarketingSocial, path: 'digitalmarketing/social' },
    ]},
    { name: currentMessages.automation, path: '/automation',subItems: []},
  

    { name: currentMessages.blog, path: '/blog',subItems: []},
    { name: currentMessages.contact, path: '/contact', subItems: []},
  ];

  

  return (
    
    <nav className='bg-primary text-secondary p-2 w-full flex  items-center py-5 fixed top-0 z-20 justify-between'>


    <div className='flex items-center flex-1 '>
        
        <Image className='w-32 h-9 object-contain' src={logo} alt="logo" width={128} height={36}  />


        <p className='text-white text-sm/4 tracking-wide font-bold flex flex-col'>
            WB Digital Solutions &nbsp;
            <span className='sm:block hidden font-mono lowercase font-extralight text-slate-500'>{currentMessages.technology}</span>
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
                const isSubMenuActive = activeMenu === link.name;
                const isActive = pathname === link.path;

                    return (
                      <div
                      className='relative link' 
                      onMouseEnter={() => setActiveMenu(link.name)}
                      onMouseLeave={() => setActiveMenu(null)}
                      key={index}
                    >
                      <Link
                        className=' flex p-3 text-white lowercase text-sm tracking-widest font-light cursor-pointer '
                        href={link.path}
                        key={index}
                        legacyBehavior
                      >
                     <a className={`flex p-3 no-underline lowercase ${isActive ? 'text-white underline' : 'text-slate-500'}`}>{link.name}</a>

                      
                      </Link>
                      {isSubMenuActive && link.subItems.length > 0 && <SubMenu subItems={link.subItems} />}
                      {isActive && (
                          <motion.span
                         initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="underline"
        />
        )}
                      </div>
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
