'use client';

/**
 * Career timeline section for the sales CV page. Scroll-driven storytelling:
 * a static track shows the whole path while an amber progress line draws
 * itself with scroll; each entry (see SalesTimelineItem) lights up crossing
 * the viewport center. Entries come localized from salesTimeline.ts.
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { salesTimeline } from '@/content/salesTimeline';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvContent, type CVLang } from '@/content/cv';
import { AMBER, BG_B, ink, toCVLang } from './salesTheme';
import { SalesSection, SectionHeader } from './SalesSection';
import SalesTimelineItem, { useMdUp } from './SalesTimelineItem';

const COPY: Record<CVLang, { title: string; intro: string }> = {
  'pt-BR': {
    title: 'Do balcão, aos 13, à mesa de negociação.',
    intro: 'Comecei a vender cedo, e cada passo somou repertório comercial.',
  },
  en: {
    title: 'From the shop counter at 13 to the negotiation table.',
    intro: 'I started selling young, and every step added to my commercial range.',
  },
  it: {
    title: 'Dal bancone, a 13 anni, al tavolo delle trattative.',
    intro: 'Ho iniziato a vendere presto, e ogni passo ha aggiunto repertorio commerciale.',
  },
  es: {
    title: 'Del mostrador, a los 13, a la mesa de negociación.',
    intro: 'Empecé a vender temprano, y cada paso sumó repertorio comercial.',
  },
};

const SalesTimeline: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const copy = COPY[cv];
  const reduce = useReducedMotion();
  const mdUp = useMdUp();

  // Self-drawing spine: list scroll progress mapped to scaleY. Starts when the
  // list top reaches 70% of the viewport and completes when its end reaches
  // the center, so the line tip travels with the reading zone.
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.7', 'end 0.5'],
  });
  const spineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <SalesSection id="trajetoria" bg={BG_B} width="3xl">
      <SectionHeader eyebrow={t.nav.timeline} title={copy.title} intro={copy.intro} className="mb-14" />

      <ol ref={listRef} className="relative">
        {/* Static track (the whole path, barely visible) */}
        <div
          className="absolute bottom-2 left-[7px] top-2 w-px"
          style={{ background: ink(0.12) }}
          aria-hidden="true"
        />
        {/* Amber progress: transform-only, drawn from the top */}
        <motion.div
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top"
          style={{
            background: `linear-gradient(180deg, ${AMBER} 0%, rgba(224,145,47,0.45) 100%)`,
            scaleY: reduce ? 1 : spineScale,
          }}
          aria-hidden="true"
        />
        {salesTimeline[cv].map((e, i) => (
          <SalesTimelineItem key={e.company + e.year} e={e} index={i} showWatermark={mdUp && !reduce} />
        ))}
      </ol>
    </SalesSection>
  );
};

export default SalesTimeline;
