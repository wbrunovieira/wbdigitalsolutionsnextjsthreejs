"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
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
    // Defer the heavy 3D journey until the page is loaded + idle, so the hero text
    // (LCP) paints fast and the 3D doesn't block the main thread on first load.
    const [show3D, setShow3D] = useState(false);
    useEffect(() => {
        let id: number | undefined;
        const start = () => {
            const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
            id = ric ? ric(() => setShow3D(true), { timeout: 2500 }) : window.setTimeout(() => setShow3D(true), 1200);
        };
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });
        return () => {
            const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
            if (id !== undefined) { cic ? cic(id) : clearTimeout(id); }
            window.removeEventListener("load", start);
        };
    }, []);

    return (
        <main className="flex flex-col min-h-screen bg-custom-gradient bg-[#350545] w-full max-w-none mx-0 px-0">

                {show3D && <ScrollComputer3D />}
                {/* data-cpu-stop marks each "parking" section for the scroll-driven
                    3D computer (ScrollComputer3D uses GSAP ScrollTrigger on these). */}
                <div data-cpu-stop="0"><HeroSection /></div>
                <div data-cpu-stop="1"><Portal3DSectionGSAP /></div>
                <div data-cpu-stop="2"><InfiniteScrollHash /></div>
                <div data-cpu-stop="3"><ToolBox /></div>
                <div data-cpu-stop="4"><AppleCardsCarouselDemo /></div>

        </main>
    );
};

export default Home;
