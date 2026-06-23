"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Persistent scroll-driven 3D gear hero (now desktop AND mobile), mounted on the
// first user gesture so it never blocks initial load / the lab perf trace.
const ScrollAutomationHero3D = dynamic(() => import('@/components/canvas/ScrollAutomationHero3D'), { ssr: false });

import CallToActionAutomation from '@/components/AutomationCTA';
import { AutomationHeader } from '@/components/AutomationHeader';
import PageHead from '@/components/PageHead';

// ssr:false sections get a height-reserving placeholder (avoids cold-load CLS).
const AnimatedBenefits = dynamic(() => import('@/components/AutomationBenefits'), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const AutomationCases = dynamic(() => import('@/components/AutomationCases'), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const Technologies = dynamic(() => import('@/components/AutomationTecs'), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });

const ai: React.FC = () => {
  // Defer the 3D hero to the first user gesture (perf).
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

  return(
    <>
      <PageHead pageKey="automation" />
      {/* Gradient backdrop behind the 3D canvas; main is transparent and stacked
          above (z-10) so the gear passes behind the page on scroll. */}
      <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
      {show3D && <ScrollAutomationHero3D />}

      <main className="relative z-10 flex flex-col items-center min-h-screen w-full max-w-7xl mx-auto">

        {/* Hero — header on top; the persistent 3D gear draws in the lower part. */}
        <div className="relative w-full min-h-[100svh] lg:min-h-[24rem] lg:mt-32">
          {/* top scrim for legibility over the gear/swarm (mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[48%] bg-gradient-to-b from-[#1a0826] via-[#1a0826]/80 to-transparent lg:hidden"
          />
          <div className="relative z-10 flex flex-col items-center w-full px-4 pt-36 lg:pt-0 lg:justify-center lg:flex-1 lg:items-start lg:ml-20">
            <AutomationHeader scrollIndicatorHidden={true} />
          </div>
        </div>

        {/* Transparent spacers between sections reveal the gear passing behind. */}
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <AnimatedBenefits />
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <AutomationCases />
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <Technologies />
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <CallToActionAutomation />

      </main>
    </>
  )
};

export default ai;
