"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import CTAInvitation from '@/components/AICTA';
import { AIHeader } from '@/components/AIHeader';
import PageHead from '@/components/PageHead';

const AnimatedBackgroundAIComponent = dynamic(() => import('@/components/AnimatedBackgoundAIComponent'), { ssr: false, loading: () => <div className="w-full h-96" /> });

// PROTOTYPE: persistent scroll-driven 3D hero (desktop only). Self-nullifies on
// mobile, where the hero keeps its own boxed AnimatedBackgoundAIComponent.
const ScrollAIHero3D = dynamic(() => import('@/components/canvas/ScrollAIHero3D'), { ssr: false });

const LLMSection = dynamic(() => import('@/components/AILLMSection'), { ssr: false });
const MachineLearningServices = dynamic(() => import('@/components/AIMLServices'), { ssr: false });
const VisionComputationalSection = dynamic(() => import('@/components/IAVision'), { ssr: false });
const AIAgentFlowSection = dynamic(() => import('@/components/AIAgentSection'), { ssr: false });

const ai: React.FC = () => {
  // Desktop draws the persistent ScrollAIHero3D behind the page; the hero box
  // becomes a transparent spacer. Mobile keeps the boxed canvas.
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
    <PageHead pageKey="ai" />
    {/* Gradient backdrop behind the 3D canvas; main is transparent and stacked
        above (z-10) so the model passes behind the page on scroll. */}
    <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
    <ScrollAIHero3D />

    <main className='relative z-10 mt-16 w-full max-w-7xl mx-auto'>
      <div className="relative w-full mt-32 ">

        <div className="ml-2 md:ml-8 flex relative inset-0 z-0 mx-auto min-h-[24rem]">
          <AIHeader scrollIndicatorHidden={true} />
          {/* Desktop: empty spacer — the persistent ScrollAIHero3D renders the
              model + balls. Mobile (or pre-mount): the original boxed canvas. */}
          {(!mounted || !isDesktop) && <AnimatedBackgroundAIComponent />}
        </div>

        {/* Transparent spacers between sections reveal the model passing behind. */}
        <div aria-hidden className="h-32 lg:h-52" />
        <div className="relative z-10">
          <LLMSection />
        </div>
        <div aria-hidden className="h-32 lg:h-52" />
        <div className="relative z-10">
          <MachineLearningServices />
        </div>
        <div aria-hidden className="h-32 lg:h-52" />
        <div className="relative z-10">
          <VisionComputationalSection />
        </div>
        <div aria-hidden className="h-32 lg:h-52" />
        <div className="relative z-10">
          <AIAgentFlowSection />
        </div>
        <div aria-hidden className="h-32 lg:h-52" />
        <div className="relative z-10">
          <CTAInvitation />
        </div>
    </div>
    </main>
  </>)
};

export default ai;
