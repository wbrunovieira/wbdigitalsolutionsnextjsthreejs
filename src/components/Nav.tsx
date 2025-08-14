"use client";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

import { motion } from "framer-motion";
import Link from "next/link";


import { useRouter } from "next/router";

import Image from "next/image";

import logo from "/public/svg/logo-white.svg";
import ParticlesContainer from "./ParticlesContainer";
import SideSocial from "./SideSocial";
import HamburgerMenu from "./MenuAnimatedBuguer";
import MobileMenu from "./MobileMenu";

const Nav: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;
    const { language, setLanguage, isLoaded } = useLanguage();
    
    // Debug log
    console.log('Nav - language:', language, 'isLoaded:', isLoaded);

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
        <nav className="bg-modern-gradient backdrop-blur-3xl opacity-90 fixed text-secondary w-full top-0 z-20 pt-10 px-4 lg:px-10 max-w-[1400px] mx-auto">     
            <Image
               className="absolute -mt-1 top-0 left-1/2 transform -translate-x-1/2"
                width={300}
                height={60}
                src="/svg/barra.svg"
                alt="bar"
            />
        
            <div className="flex justify-between items-center">
                
                <ParticlesContainer />

           
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
                                <span className="sm:block hidden font-mono lowercase font-extralight text-slate-500">
                                    {currentMessages.technology}
                                </span>
                            </p>
                </div>
        
         
          <div className="lg:flex flex-col text text-xs justify-end items-end">
                {!isLoaded && (
                    <div className="radio-input flex items-center z-50 opacity-50">
                        <span className="text-white text-xs">...</span>
                    </div>
                )}
                {isLoaded && (
                <div className="radio-input flex  items-center z-50">
                    <input
                        className="input radio-custom border-r"
                        type="radio"
                        name="radio"
                        id="en"
                        onChange={() => setLanguage("en")}
                        checked={language === "en"}
                    />
                    <label
                        htmlFor="en"
                        className="radio-custom-label en btn hover:text-gray-300 "
                    >en
                        <span className="tooltip-text">
                            {currentMessages.english}
                        </span>
                    </label>

                    <input
                        className="input radio-custom border-r"
                        type="radio"
                        name="radio"
                        id="pt-BR"
                        onChange={() => setLanguage("pt-BR")}
                        checked={language === "pt-BR"}
                    />
                    <label
                        htmlFor="pt-BR"
                        className="radio-custom-label pt-BR btn hover:text-gray-300"
                    >pt
                        <span className="tooltip-text">
                            {currentMessages.portuguese}
                        </span>
                    </label>



                    <input
                        className="input radio-custom border-r"
                        type="radio"
                        name="radio"
                        id="it"
                        onChange={() => setLanguage("it")}
                        checked={language === "it"}
                    />
                    <label
                        htmlFor="it"
                        className="radio-custom-label it btn hover:text-gray-300"
                    >it
                        <span className="tooltip-text">
                            {currentMessages.italian}
                        </span>
                    </label>

                    <input
                        className="input radio-custom border-r"
                        type="radio"
                        name="radio"
                        id="es"
                        onChange={() => setLanguage("es")}
                        checked={language === "es"}
                    />
                    <label
                        htmlFor="es"
                        className="radio-custom-label es btn hover:text-gray-300 z-50"
                    >es
                        <span className="tooltip-text">
                            {currentMessages.spanish}
                        </span>
                    </label>
                </div>
                )}

                {isMobileMenuOpen && (
                    <div className="absolute inset-0 z-50 bg-black bg-opacity-90 flex flex-col justify-center items-center max-w-[1400px] mx-auto">
                        <MobileMenu 
                            isOpen={isMobileMenuOpen}
                            navData={navData}
                            pathname={pathname}
                            setActiveMenu={setActiveMenu}
                            activeMenu={activeMenu}
                            closeMenu={() => setIsMobileMenuOpen(false)} 
                        />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white mt-10 font-bold text-2xl z-50"
                        >
                            X
                        </button>
                    </div>
                )}

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
                                    className="flex p-3 tracking-widest lowercase font-light cursor-pointer "
                                    href={link.path}
                                    key={index}
                                    legacyBehavior
                                >
                                    <motion.a
                                        className={`flex p-3 text-xs mt-2  tracking-widest no-underline font-light  lowercase hover:yellow-light text-white whitespace-nowrap cursor-pointer ${
                                            isActive
                                                ? "text-white semibold underline-menu link-active"
                                                : "text-slate-500"
                                        }`}
                                        initial={{ width: "0%" }}
                                        animate={{
                                            width: isActive ? "100%" : "0%",
                                        }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        {link.name}
                                    </motion.a>
                                </Link>

                            </div>
                        );
                    })}
            </div>



          </div>

            </div>



            <div className="bg-white/5  absolute right-[2%] top-[120%] hidden md:block">
                <SideSocial />
            </div>
  
        </nav>
    );
};

export default Nav;
