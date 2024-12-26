"use client";

import HeroSection from "./HeroSection";

import InfiniteScrollHash from "./InfiniteScrollHash";
// import ToolBox from "./ToolBox";
import { AppleCardsCarouselDemo } from "./CardCarrosel";


const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-custom-gradient bg-[#350545] px-8 mx-auto">
            <main className="flex flex-col">
                <HeroSection />
                <InfiniteScrollHash />
                {/* <ToolBox /> */}
                <AppleCardsCarouselDemo />
            </main>
        </div>
    );
};

export default Home;
