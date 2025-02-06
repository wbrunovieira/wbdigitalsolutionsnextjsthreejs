"use client";

import HeroSection from "./HeroSection";

import InfiniteScrollHash from "./InfiniteScrollHash";
import ToolBox from "./ToolBox";
import { AppleCardsCarouselDemo } from "./CardCarrosel";


const Home: React.FC = () => {
    return (
        <main className="flex flex-col min-h-screen bg-custom-gradient bg-[#350545] w-full max-w-none mx-0 px-0">

                <HeroSection />
                <InfiniteScrollHash />
                <ToolBox />
                <AppleCardsCarouselDemo />

        </main>
    );
};

export default Home;
