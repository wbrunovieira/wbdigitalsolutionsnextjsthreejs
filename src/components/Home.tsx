"use client";
import React from "react";
import { useTranslations } from "../contexts/TranslationContext";
import HeroSection from "./HeroSection";
import SectionDaHome from "./SectionDaHome";
import InfiniteScrollHash from "./InfiniteScrollHash";
import ToolBox from "./ToolBox";

const Home: React.FC = () => {
    const currentMessages = useTranslations();

    return (
        <>
            <main className="bg-custom-gradient bg-[#350545]  inset-0 max-h-screen">
                <HeroSection />
                <InfiniteScrollHash />
                <SectionDaHome />
                <ToolBox />
            </main>
        </>
    );
};

export default Home;
