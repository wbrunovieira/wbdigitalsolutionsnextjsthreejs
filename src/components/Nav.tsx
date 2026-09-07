'use client';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/contexts/TranslationContext';

import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import logo from '/public/svg/logo.svg';

const ParticlesContainer = dynamic(() => import('./ParticlesContainer'), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });
import SideSocial from './SideSocial';
import HamburgerMenu from './MenuAnimatedBuguer';
import LanguageRadio from './nav/LanguageRadio';
import NavLinks from './nav/NavLinks';
import { useNavData } from './nav/useNavData';

const SCROLL_THRESHOLD_PX = 80;

const Nav: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;
    const { language, setLanguage, isLoaded } = useLanguage();
    const currentMessages = useTranslations();
    const navData = useNavData();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`fixed left-0 right-0 top-0 z-20 transition-all duration-500 ${
            scrolled
                ? 'bg-[#1a0826]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-purple-700/40'
                : 'bg-modern-gradient backdrop-blur-3xl border-b border-white/15 shadow-[0_14px_28px_-6px_rgba(0,0,0,0.55)]'
        }`}>
            <ParticlesContainer />
            {/* z-10 keeps every nav control above the particles canvas (z-0). */}
            <div className="text-secondary max-w-[1400px] mx-auto pt-10 pb-8 lg:pb-0 px-4 lg:px-10 relative z-10">
            <Image
               className={`absolute -mt-1 top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                   scrolled ? 'brightness-[2]' : ''
               }`}
                width={300}
                height={60}
                src="/svg/barra.svg"
                alt=""
            />

            <div className="relative flex items-center lg:justify-between">

                <div className="flex flex-col absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 items-center lg:items-start">
                            <span className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 shadow-md shadow-black/25 ring-1 ring-black/5">
                              <Image
                                className="h-10 w-auto object-contain"
                                src={logo}
                                alt="WB Digital Solutions"
                                width={207}
                                height={36}
                                priority
                                />
                            </span>

                            <span className="hidden sm:block font-mono lowercase font-light tracking-wide text-secondary/85 mt-1.5 text-xs whitespace-nowrap">
                                {currentMessages.technology}
                            </span>
                </div>

          <div className="ml-auto lg:ml-0 lg:flex flex-col text text-xs justify-end items-end">
                <div className="hidden lg:flex items-center z-50">
                    <LanguageRadio language={language} setLanguage={setLanguage} isLoaded={isLoaded} />
                </div>

                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    navData={navData}
                    pathname={pathname}
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                    closeMenu={() => setIsMobileMenuOpen(false)}
                    language={language}
                    setLanguage={setLanguage}
                />

            <div className="flex ml-auto lg:hidden mb-2">
                <HamburgerMenu
                    isOpen={isMobileMenuOpen}
                    toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
            </div>

                <NavLinks navData={navData} pathname={pathname} setActiveMenu={setActiveMenu} />

          </div>

            </div>

            <div className="bg-white/5 absolute right-[2%] top-[120%] hidden md:block">
                <SideSocial />
            </div>

            </div>{/* end max-w inner */}
        </nav>
    );
};

export default Nav;
