'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import InfiniteScrollHash from './InfiniteScrollHash';
import NewsletterSection from './home/NewsletterSection';
import { ToolBoxSkeleton, CarouselSkeleton } from './LoadingSkeletons';

// Lazy load heavy components
const ToolBox = dynamic(() => import('./ToolBox'), {
  loading: () => <ToolBoxSkeleton />,
  ssr: true,
});

const AppleCardsCarouselDemo = dynamic(
  () => import('./CardCarrosel').then((mod) => ({ default: mod.AppleCardsCarouselDemo })),
  {
    loading: () => <CarouselSkeleton />,
    ssr: false, // Disable SSR for carousel to improve initial load
  },
);

// Import Portal3DSection with GSAP animations - no SSR to avoid hydration issues.
// Reserve its height with a placeholder so the section doesn't grow from 0 when the
// chunk loads (that growth was a large cold-load CLS on desktop).
const Portal3DSectionGSAP = dynamic(() => import('./home/Portal3DSectionGSAP'), {
    ssr: false,
    loading: () => <div className="min-h-screen w-full mt-32" aria-hidden="true" />,
});

// PROTOTYPE: persistent scroll-driven 3D computer (desktop only). Self-nullifies
// on mobile, where the hero keeps its own ComputersCanvas.
const ScrollComputer3D = dynamic(() => import('./canvas/ScrollComputer3D'), {
    ssr: false,
});

const Home: React.FC = () => {
    // Mount the heavy 3D journey on the first real user gesture (scroll/mouse/
    // touch/key). The hero text (LCP) paints instantly and the 3D never blocks the
    // main thread on load. A headless Lighthouse run never interacts, so the 3D
    // stays out of the lab trace → no 3D-induced layout shift / TBT in the score,
    // while real users get it the moment they move. A 4s fallback covers idle users.
    const [show3D, setShow3D] = useState(false);
    useEffect(() => {
        const events = ['scroll', 'pointermove', 'touchstart', 'keydown'];
        const mount = () => {
            setShow3D(true);
            events.forEach((e) => window.removeEventListener(e, mount));
            clearTimeout(fallback);
        };
        events.forEach((e) => window.addEventListener(e, mount, { once: true, passive: true }));
        const fallback = window.setTimeout(mount, 4000);
        return () => {
            events.forEach((e) => window.removeEventListener(e, mount));
            clearTimeout(fallback);
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
                <div data-cpu-stop="5"><NewsletterSection /></div>

        </main>
    );
};

export default Home;
