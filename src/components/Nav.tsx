"use client";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

import { motion } from "framer-motion";
import Link from "next/link";
import SubMenu from "../components/Submenu";

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
    const { language, setLanguage } = useLanguage();
    

    const currentMessages = useTranslations();

    const navData = [
        {
            name: currentMessages.home,
            path: "/",
            subItems: [
                { name: currentMessages.homewho, path: "/home/who" },
                { name: currentMessages.homeculture, path: "/home/culture" },
            ],
        },

        ...(language === "pt-BR"
            ? [
                  {
                      name: currentMessages.systems,
                      path: "/systems",
                      subItems: [
                          {
                              name: currentMessages.wbweb,
                              path: "/systems/wbweb",
                          },
                          {
                              name: currentMessages.wbsalao,
                              path: "/systems/wbsalao",
                          },
                          {
                              name: currentMessages.wbclinica,
                              path: "/systems/wbclinica",
                          },
                          {
                              name: currentMessages.wbfood,
                              path: "/systems/wbfood",
                          },
                          {
                              name: currentMessages.wbpet,
                              path: "/systems/wbpet",
                          },
                      ],
                  },
              ]
            : []),

        {
            name: currentMessages.websites,
            path: "/websites",
            subItems: [
                { name: currentMessages.websitesland, path: "/websites/land" },
                {
                    name: currentMessages.websitesProjects,
                    path: "/websites/projects",
                },
            ],
        },

        { name: currentMessages.design, path: "/design", subItems: [] },

        {
            name: currentMessages.digitalmarketing,
            path: "/digitalmarketing",
            subItems: [
                {
                    name: currentMessages.digitalmarketingSeo,
                    path: "/digitalmarketing/seo",
                },
                {
                    name: currentMessages.digitalmarketingAds,
                    path: "digitalmarketing/ads",
                },
                {
                    name: currentMessages.digitalmarketingSocial,
                    path: "digitalmarketing/social",
                },
            ],
        },
        { name: currentMessages.automation, path: "/automation", subItems: [] },

        { name: currentMessages.ai, path: "/ai", subItems: [] },

        { name: currentMessages.blog, path: "/blog", subItems: [] },
        { name: currentMessages.contact, path: "/contact", subItems: [] },
    ];

    return (
      <nav className="bg-modern-gradient backdrop-blur-3xl opacity-90 fixed text-secondary w-full top-0 z-20 pt-10 px-4 lg:px-10 relative">
     
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
                                className="w-32 h-9 object-contain"
                                src={logo}
                                alt="logo"
                                width={158}
                                height={42}
                                />

                            <p className="text-white text-sm/4 tracking-wide font-bold flex flex-col">
                                WB Digital Solutions &nbsp;
                                <span className="sm:block hidden font-mono lowercase font-extralight text-slate-500">
                                    {currentMessages.technology}
                                </span>
                            </p>
                </div>
        

            <div className="">


                <MobileMenu 
                    isOpen={isMobileMenuOpen}
                    navData={navData}
                    pathname={pathname}
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                />
            
            </div>

            <div className="">


                <HamburgerMenu 
                    isOpen={isMobileMenuOpen} 
                    toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                />

            </div>

            <div className="hidden lg:flex flex-1 ">
                    {navData.map((link, index) => {
                        const isSubMenuActive = activeMenu === link.name;
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
                                        className={`flex p-3 text-xs mt-2 font-light tracking-widest no-underline font-light  lowercase hover:yellow-light text-white whitespace-nowrap cursor-pointer ${
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
                                {isSubMenuActive &&
                                    link.subItems.length > 0 && (
                                        <SubMenu subItems={link.subItems} />
                                    )}
                            </div>
                        );
                    })}
            </div>
            

          <div className="hidden lg:flex flex-col text text-xs justify-end items-end">
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
                    >
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
                    >
                        <span className="tooltip-text">
                            {currentMessages.portuguesebr}
                        </span>
                    </label>

                    <input
                        className="input radio-custom border-r"
                        type="radio"
                        name="radio"
                        id="pt"
                        onChange={() => setLanguage("pt")}
                        checked={language === "pt"}
                    />
                    <label
                        htmlFor="pt"
                        className="radio-custom-label pt btn hover:text-gray-300"
                    >
                        <span className="tooltip-text">
                            {currentMessages.portuguesept}
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
                    >
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
                    >
                        <span className="tooltip-text">
                            {currentMessages.spanish}
                        </span>
                    </label>
                </div>



          </div>

            </div>



            <div className="hidden lg:absolute right-[2%] top-[120%] ">
                <SideSocial />
            </div>
  
        </nav>
    );
};

export default Nav;
