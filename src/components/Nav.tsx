"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "/public/svg/logo.svg";

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

        { name: currentMessages.systems || "Plataformas e Sistemas", path: "/systems", subItems: [] },

        { name: currentMessages.automation, path: "/automation", subItems: [] },

        { name: currentMessages.ai, path: "/ai", subItems: [] },

        { name: currentMessages.projects || "Projects", path: "/projects", subItems: [] },

        { name: currentMessages.blog, path: "/blog", subItems: [] },
        { name: currentMessages.contact, path: "/contact", subItems: [] },
    ];

    return (
        <nav className={`fixed left-0 right-0 top-0 z-20 transition-all duration-500 ${
            scrolled
                ? "bg-[#1a0826]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-purple-700/40"
                : "bg-modern-gradient backdrop-blur-3xl border-b border-white/15 shadow-[0_14px_28px_-6px_rgba(0,0,0,0.55)]"
        }`}>
            <ParticlesContainer />
            <div className="text-secondary max-w-[1400px] mx-auto pt-10 pb-8 lg:pb-0 px-4 lg:px-10 relative">
            <Image
               className={`absolute -mt-1 top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                   scrolled ? "brightness-[2]" : ""
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
                {!isLoaded && (
                    <div className="radio-input opacity-50">
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
                        <div className="radio-input">
                            {labels.map((lang, i) => (
                                <React.Fragment key={lang.id}>
                                    <input
                                        className="input radio-custom"
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
                                    {i < labels.length - 1 && (
                                        <span className="w-px h-3 bg-white/20 mx-3 self-center" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    );
                })()}
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

                <div className="hidden lg:flex flex-1 justify-center w-full mt-4">
                    {navData.map((link, index) => {

                        const isActive =
                            pathname === link.path ||
                            (link.path !== "/" && pathname.startsWith(link.path + "/"));

                        return (
                            <div
                                className="hidden lg:flex relative link"
                                onMouseEnter={() => setActiveMenu(link.name)}
                                onMouseLeave={() => setActiveMenu(null)}
                                key={index}
                                >
                                <Link
                                    href={link.path}
                                    className={`relative flex p-3 text-xs mt-2 tracking-widest no-underline font-light lowercase whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                                        isActive ? "text-white" : "text-slate-300/90 hover:text-white"
                                    }`}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {isActive && (
                                        // Single shared indicator: Framer animates it
                                        // sliding from the previously-active item to this
                                        // one (shared layout transition via layoutId).
                                        <motion.span
                                            layoutId="nav-active-indicator"
                                            className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-yellowcustom"
                                            style={{ boxShadow: "0 0 10px 1px rgba(255,185,71,0.7)" }}
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}
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
