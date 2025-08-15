"use client";

import dynamic from 'next/dynamic';
import HeroSection from "./HeroSection";
import InfiniteScrollHash from "./InfiniteScrollHash";
import { ToolBoxSkeleton, CarouselSkeleton } from "./LoadingSkeletons";

// Lazy load heavy components
const ToolBox = dynamic(() => import("./ToolBox"), {
  loading: () => <ToolBoxSkeleton />,
  ssr: true
});

const AppleCardsCarouselDemo = dynamic(
  () => import("./CardCarrosel").then((mod) => ({ default: mod.AppleCardsCarouselDemo })),
  {
    loading: () => <CarouselSkeleton />,
    ssr: false // Disable SSR for carousel to improve initial load
  }
);


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
