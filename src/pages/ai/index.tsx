"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import CTAInvitation from '@/components/AICTA';
import { AIHeader } from '@/components/AIHeader';
import PageHead from '@/components/PageHead';
import { makeI18nStaticProps } from '@/lib/i18n';

// Persistent scroll-driven 3D hero (now desktop AND mobile), mounted on the first
// user gesture so it never blocks initial load / the lab perf trace.
const ScrollAIHero3D = dynamic(() => import('@/components/canvas/ScrollAIHero3D'), { ssr: false });

// ssr:false sections get a height-reserving placeholder (avoids cold-load CLS).
const LLMSection = dynamic(() => import('@/components/AILLMSection'), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const MachineLearningServices = dynamic(() => import('@/components/AIMLServices'), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const VisionComputationalSection = dynamic(() => import('@/components/IAVision'), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const AIAgentFlowSection = dynamic(() => import('@/components/AIAgentSection'), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });

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

  return (
  <>
    <PageHead pageKey="ai" />
    {/* Gradient backdrop behind the 3D canvas; main is transparent and stacked
        above (z-10) so the model passes behind the page on scroll. */}
    <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
    {show3D && <ScrollAIHero3D />}

    <main className='relative z-10 mt-16 w-full max-w-7xl mx-auto'>
      {/* Hero — header in the top; the persistent 3D model draws in the lower part. */}
      <div className="relative w-full min-h-[100svh] lg:min-h-[24rem] lg:mt-32">
        {/* top scrim for legibility over the model/swarm (mobile) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[48%] bg-gradient-to-b from-[#1a0826] via-[#1a0826]/80 to-transparent lg:hidden"
        />
        <div className="ml-2 md:ml-8 relative z-10 pt-28 lg:pt-0 mx-auto min-h-[8rem]">
          <AIHeader scrollIndicatorHidden={true} />
        </div>
      </div>

      {/* Transparent spacers between sections reveal the model passing behind. */}
      <div aria-hidden className="h-[55vh] lg:h-52" />
      <div className="relative z-10">
        <LLMSection />
      </div>
      <div aria-hidden className="h-[55vh] lg:h-52" />
      <div className="relative z-10">
        <MachineLearningServices />
      </div>
      <div aria-hidden className="h-[55vh] lg:h-52" />
      <div className="relative z-10">
        <VisionComputationalSection />
      </div>
      <div aria-hidden className="h-[55vh] lg:h-52" />
      <div className="relative z-10">
        <AIAgentFlowSection />
      </div>
      <div aria-hidden className="h-[55vh] lg:h-52" />
      <div className="relative z-10">
        <CTAInvitation />
      </div>
    </main>
  </>)
};

// Per-locale static generation: prerender this page for every locale with
// the right messages available during SSR.
export const getStaticProps = makeI18nStaticProps();

export default ai;
