"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AnimatedBackgroundAutomationComponent = dynamic(() => import('@/components/AnimatedBackgorundAutomation'), { ssr: false, loading: () => <div className="w-full h-96" /> });

// PROTOTYPE: persistent scroll-driven 3D hero (desktop only). Self-nullifies on
// mobile, where the hero keeps its own boxed AnimatedBackgorundAutomation.
const ScrollAutomationHero3D = dynamic(() => import('@/components/canvas/ScrollAutomationHero3D'), { ssr: false });

import CallToActionAutomation from '@/components/AutomationCTA';
import { AutomationHeader } from '@/components/AutomationHeader';
import PageHead from '@/components/PageHead';


const AnimatedBenefits = dynamic(() => import('@/components/AutomationBenefits'), { ssr: false });
const AutomationCases = dynamic(() => import('@/components/AutomationCases'), { ssr: false });
const Technologies = dynamic(() => import('@/components/AutomationTecs'), { ssr: false });




const ai: React.FC = () => {
  // Desktop draws the persistent ScrollAutomationHero3D behind the page; the hero
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

  return(
    <>
      <PageHead pageKey="automation" />
      {/* Gradient backdrop behind the 3D canvas; main is transparent and stacked
          above (z-10) so the gear passes behind the page on scroll. */}
      <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
      <ScrollAutomationHero3D />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-7xl mx-auto">

      <div className="ml-8 md:ml-20 md:relative flex flex-col md:flex-row w-full min-h-[24rem] mt-32">


         <div className="relative md:absolute inset-0 z-0">
           {/* Desktop: empty spacer — the persistent ScrollAutomationHero3D renders the
               gear + balls. Mobile (or pre-mount): the original boxed canvas. */}
           {(!mounted || !isDesktop) && <AnimatedBackgroundAutomationComponent />}
        </div>
         <div className="relative z-10 flex flex-col justify-center items-center w-full md:w-auto min-h-[8rem]">
          <AutomationHeader scrollIndicatorHidden={true} />
        </div>
    </div>

    {/* Transparent spacers between sections reveal the gear passing behind. */}
    <div aria-hidden className="h-32 lg:h-52" />
    <AnimatedBenefits />
    <div aria-hidden className="h-32 lg:h-52" />
    <AutomationCases />
    <div aria-hidden className="h-32 lg:h-52" />
    <Technologies />
    <div aria-hidden className="h-32 lg:h-52" />
    <CallToActionAutomation />


      </main>
    </>
  )
};

export default ai;
