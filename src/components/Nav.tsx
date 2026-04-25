"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "/public/svg/logo-white.svg";

const ParticlesContainer = dynamic(() => import("./ParticlesContainer"), { ssr: false });
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
import SideSocial from "./SideSocial";
import HamburgerMenu from "./MenuAnimatedBuguer";

const Nav: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;
    const { language, setLanguage, isLoaded } = useLanguage();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    

    const currentMessages = useTranslations();

    const navData = [
        {
            name: currentMessages.home,
            path: "/",
          
        },



        {
            name: currentMessages.websites,
            path: "/websites",
     
        },

        { name: currentMessages.automation, path: "/automation", subItems: [] },

        { name: currentMessages.ai, path: "/ai", subItems: [] },

        { name: currentMessages.blog, path: "/blog", subItems: [] },
        { name: currentMessages.contact, path: "/contact", subItems: [] },
    ];

    return (
        <nav className={`fixed left-0 right-0 top-0 z-20 transition-all duration-500 ${
            scrolled
                ? "bg-[#1a0826]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-purple-700/40"
                : "bg-modern-gradient backdrop-blur-3xl border-b border-transparent"
        }`}>
            <ParticlesContainer />
            <div className="text-secondary max-w-[1400px] mx-auto pt-10 px-4 lg:px-10 relative">
            <Image
               className="absolute -mt-1 top-0 left-1/2 transform -translate-x-1/2"
                width={300}
                height={60}
                src="/svg/barra.svg"
                alt="bar"
            />

            <div className="flex justify-between items-center">


           
                <div className="flex">

                            <Image
                                className="w-32 h-9 object-contain mr-2"
                                src={logo}
                                alt="logo"
                                width={158}
                                height={42}
                                />

                            <p className="text-white text-xs md:text-sm/4 tracking-wide font-light md:font-bold flex flex-col">
                                WB Digital Solutions &nbsp;
                                <span className="sm:block hidden font-mono lowercase font-extralight text-slate-500 mt-1">
                                    {currentMessages.technology}
                                </span>
                            </p>
                </div>
        
         
          <div className="lg:flex flex-col text text-xs justify-end items-end">
                {!isLoaded && (
                    <div className="radio-input hidden lg:flex items-center z-50 opacity-50">
                        <span className="text-white text-xs">...</span>
                    </div>
                )}
                {isLoaded && (() => {
                    const langs = ["en", "pt-BR", "it", "es"] as const;
                    const selectedIdx = langs.indexOf(language as typeof langs[number]);
                    const ballPos = (i: number) => {
                        if (i === selectedIdx) return "0 0";
                        if (i < selectedIdx) return "0 24px";
                        return "0 -24px";
                    };
                    const labels = [
                        { id: "en", display: "en", tooltip: currentMessages.english },
                        { id: "pt-BR", display: "pt", tooltip: currentMessages.portuguese },
                        { id: "it", display: "it", tooltip: currentMessages.italian },
                        { id: "es", display: "es", tooltip: currentMessages.spanish },
                    ];
                    return (
                        <div className="radio-input hidden lg:flex items-center z-50">
                            {labels.map((lang, i) => (
                                <React.Fragment key={lang.id}>
                                    <input
                                        className="input radio-custom border-r"
                                        type="radio"
                                        name="radio"
                                        id={lang.id}
                                        onChange={() => setLanguage(lang.id)}
                                        checked={language === lang.id}
                                        style={{ backgroundPosition: ballPos(i) }}
                                        readOnly={false}
                                    />
                                    <label
                                        htmlFor={lang.id}
                                        className={`radio-custom-label ${lang.id} btn hover:text-gray-300`}
                                    >{lang.display}
                                        <span className="tooltip-text">{lang.tooltip}</span>
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    );
                })()}

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

                <div className="hidden lg:flex flex-1 justify-center w-full mt-4">
                    {navData.map((link, index) => {

                        const isActive = pathname === link.path;

                        return (
                            <div
                                className="hidden lg:flex relative link"
                                onMouseEnter={() => setActiveMenu(link.name)}
                                onMouseLeave={() => setActiveMenu(null)}
                                key={index}
                                >
                                <Link
                                    className={`flex p-3 text-xs mt-2 tracking-widest no-underline font-light lowercase whitespace-nowrap cursor-pointer relative ${
                                        isActive ? "text-white" : "text-slate-500"
                                    }`}
                                    href={link.path}
                                >
                                    {link.name}
                                    <span
                                        className="absolute bottom-0 left-3 right-3 h-px bg-white transition-transform duration-1000 ease-in-out origin-left"
                                        style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                                    />
                                </Link>

                            </div>
                        );
                    })}
            </div>



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
