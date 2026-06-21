"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const AnimatedBackgroundWebsiteComponent = dynamic(() => import("@/components/AnimatedBackgroundWebsite"), { ssr: false, loading: () => <div className="w-full h-96" /> });

// PROTOTYPE: persistent scroll-driven 3D hero (desktop only). Self-nullifies on
// mobile, where the hero keeps its own boxed AnimatedBackgroundWebsite.
const ScrollWebsiteHero3D = dynamic(() => import("@/components/canvas/ScrollWebsiteHero3D"), { ssr: false });

import CustomVsGeneric from "@/components/CustomVsGeneric";
import CTAWebsite from "@/components/WebSiteCTA";
import { WebsiteHeader } from "@/components/WebsiteHeader";
import PageHead from "@/components/PageHead";
import Link from "next/link";

const OurApproach = dynamic(() => import("../../components/OurApproach"), { ssr: false });
const Differentiators = dynamic(() => import("../../components/Differentiators"), { ssr: false });
const Comparison = dynamic(() => import("../../components/Comparison"), { ssr: false });
const ThreeDExperiencesSection = dynamic(() => import("../../components/3DExperiencesSection"), { ssr: false });




const Websites: React.FC = () => {

    // Desktop draws the persistent ScrollWebsiteHero3D behind the page; the hero
    // box becomes a transparent spacer. Mobile keeps the boxed canvas.
    const [mounted, setMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        setMounted(true);
        const mq = window.matchMedia("(min-width: 1024px)");
        const apply = () => setIsDesktop(mq.matches);
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    return (
        <>
            <PageHead pageKey="websites" />
            {/* Gradient backdrop sits behind the 3D canvas; main is transparent and
                stacked above (z-10) so the laptop passes behind the page on scroll. */}
            <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
            <ScrollWebsiteHero3D />
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen mt-16">

         <div className="md:relative flex flex-col md:flex-row w-full h-96 overflow-hidden mt-32">

                 <div className="relative md:absolute inset-0 z-0">
                  {/* Desktop: empty spacer — the persistent ScrollWebsiteHero3D renders the
                      laptop + balls. Mobile (or pre-mount): the original boxed canvas. */}
                  {(!mounted || !isDesktop) && <AnimatedBackgroundWebsiteComponent />}
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center w-full md:w-auto min-h-[8rem]">
                    <WebsiteHeader scrollIndicatorHidden={true} />
                </div>

        </div>

            {/* Transparent spacers between sections reveal the laptop passing behind. */}
            {/* 3D Experiences Section */}
            <ThreeDExperiencesSection />

            <div aria-hidden className="h-32 lg:h-52" />
            <CustomVsGeneric />
            <div aria-hidden className="h-32 lg:h-52" />
            <OurApproach />
            <div aria-hidden className="h-32 lg:h-52" />
            <Differentiators />
            <div aria-hidden className="h-32 lg:h-52" />
            <Comparison  />
            <div aria-hidden className="h-32 lg:h-52" />
            <CTAWebsite />
            </main>
        </>
    );
};

export default Websites;
