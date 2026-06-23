"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Persistent scroll-driven 3D hero (now desktop AND mobile). Mounted on the first
// user gesture so it never blocks initial load / the lab perf trace.
const ScrollWebsiteHero3D = dynamic(() => import("@/components/canvas/ScrollWebsiteHero3D"), { ssr: false });

import CustomVsGeneric from "@/components/CustomVsGeneric";
import CTAWebsite from "@/components/WebSiteCTA";
import { WebsiteHeader } from "@/components/WebsiteHeader";
import PageHead from "@/components/PageHead";

// ssr:false sections get a height-reserving placeholder so they don't grow from
// 0 on cold load (that growth is a large CLS — see skill perf-seo-audit).
const OurApproach = dynamic(() => import("../../components/OurApproach"), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const Differentiators = dynamic(() => import("../../components/Differentiators"), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const Comparison = dynamic(() => import("../../components/Comparison"), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const ThreeDExperiencesSection = dynamic(() => import("../../components/3DExperiencesSection"), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });

const Websites: React.FC = () => {
    // Defer the 3D hero to the first user gesture (perf: keeps it out of the load
    // critical path and the headless Lighthouse trace).
    const [show3D, setShow3D] = useState(false);
    useEffect(() => {
        const events = ["scroll", "pointermove", "touchstart", "keydown"];
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
        <>
            <PageHead pageKey="websites" />
            {/* Gradient backdrop sits behind the 3D canvas; main is transparent and
                stacked above (z-10) so the laptop passes behind the page on scroll. */}
            <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
            {show3D && <ScrollWebsiteHero3D />}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen mt-16">

                {/* Hero — copy in the top ~45%, laptop stage in the lower ~55%. */}
                <div className="relative flex flex-col w-full min-h-[100svh] overflow-visible lg:min-h-[60vh] lg:mt-32">
                    {/* Top scrim: legibility for copy over the swarm/laptop (mobile). */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[48%] bg-gradient-to-b from-[#1a0826] via-[#1a0826]/80 to-transparent lg:hidden"
                    />
                    <div className="relative z-10 flex flex-col items-center w-full pt-28 lg:pt-4 lg:justify-center lg:flex-1">
                        <WebsiteHeader scrollIndicatorHidden={true} />
                    </div>
                </div>

                {/* Transparent spacers between sections reveal the laptop passing behind. */}
                <ThreeDExperiencesSection />

                <div aria-hidden className="h-[55vh] lg:h-52" />
                <CustomVsGeneric />
                <div aria-hidden className="h-[55vh] lg:h-52" />
                <OurApproach />
                <div aria-hidden className="h-[55vh] lg:h-52" />
                <Differentiators />
                <div aria-hidden className="h-[55vh] lg:h-52" />
                <Comparison />
                <div aria-hidden className="h-[55vh] lg:h-52" />
                <CTAWebsite />
            </main>
        </>
    );
};

export default Websites;
