import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPortalContent } from './portal/portalContent';
import PortalBackdrop from './portal/PortalBackdrop';
import PortalCard from './portal/PortalCard';
import PortalEdge from './portal/PortalEdge';
import PortalScene from './portal/PortalScene';
import { usePortalAnimations } from './portal/usePortalAnimations';

/** Home section that opens the portal to the immersive 3D experiences. */
const Portal3DSectionGSAP: React.FC = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const portalBgRef = useRef<HTMLDivElement>(null);
  const topGlowRef = useRef<HTMLDivElement>(null);
  const bottomGlowRef = useRef<HTMLDivElement>(null);

  usePortalAnimations({
    sectionRef, titleRef, subtitleRef, cardsRef, portalBgRef, topGlowRef, bottomGlowRef,
  });

  const content = getPortalContent(language);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black overflow-hidden mt-32">
      <PortalEdge variant="top" glowRef={topGlowRef} />
      <PortalEdge variant="bottom" glowRef={bottomGlowRef} />

      <PortalBackdrop portalBgRef={portalBgRef} />

      <PortalScene />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-16 max-w-4xl" style={{ position: 'relative', zIndex: 30 }}>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 5s ease infinite',
            }}
          >
            {content.title}
          </h2>
          <p ref={subtitleRef} className="text-xl md:text-3xl text-gray-300 mb-4 font-light">
            {content.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-5xl w-full" style={{ perspective: '1000px' }}>
          <PortalCard
            variant="showcase"
            href="/sala-3d"
            icon="🏢"
            title={content.showcaseBtn}
            description={content.showcaseDesc}
            enterText={content.enterText}
          />
          <PortalCard
            variant="tunnel"
            href="/3d-tunnel"
            icon="🌀"
            title={content.tunnelBtn}
            description={content.tunnelDesc}
            enterText={content.enterText}
          />
        </div>
      </div>

      {/* Gradient animation for the section title */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Portal3DSectionGSAP;
