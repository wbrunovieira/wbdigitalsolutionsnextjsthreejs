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

// Import Portal3DSection with GSAP animations - no SSR to avoid hydration issues
const Portal3DSectionGSAP = dynamic(() => import('./home/Portal3DSectionGSAP'), {
    ssr: false
});

// PROTOTYPE: persistent scroll-driven 3D computer (desktop only). Self-nullifies
// on mobile, where the hero keeps its own ComputersCanvas.
const ScrollComputer3D = dynamic(() => import('./canvas/ScrollComputer3D'), {
    ssr: false
});

const Home: React.FC = () => {
    return (
        <main className="flex flex-col min-h-screen bg-custom-gradient bg-[#350545] w-full max-w-none mx-0 px-0">

                <ScrollComputer3D />
                <HeroSection />
                <Portal3DSectionGSAP />
                <InfiniteScrollHash />
                <ToolBox />
                <AppleCardsCarouselDemo />

        </main>
    );
};

export default Home;
