'use client';

/**
 * Journey timeline section for the DEV CV page (independent dark copy of the
 * sales parallax pattern). Scroll-driven storytelling: a faint track shows
 * the whole path while an amber progress line draws itself with scroll; each
 * milestone (see DevTimelineItem) lights up crossing the viewport center.
 * Unlike the sales timeline (a job history), this one tells the BUILD journey.
 * Entries come localized from devTimeline.ts.
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { devTimeline } from '@/content/devTimeline';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvContent, type CVLang } from '@/content/cv';
import { AMBER, BG_DEV_ALT, light, toCVLang } from './devTheme';
import { DevSection, DevSectionHeader } from './DevSection';
import DevCodeDeco from './DevCodeDeco';
import DevTimelineItem, { useMdUp } from './DevTimelineItem';

const COPY: Record<CVLang, { title: string; intro: string }> = {
  'pt-BR': {
    title: 'Programo desde 2020. Resolvo problemas desde 1987.',
    intro: 'Comecei a programar depois de 25 anos entendendo negócios por dentro. Cada marco abaixo foi construído em cima dessa base.',
  },
  en: {
    title: 'Coding since 2020. Solving problems since 1987.',
    intro: 'I started coding after 25 years understanding business from the inside. Every milestone below was built on that foundation.',
  },
  it: {
    title: 'Programmo dal 2020. Risolvo problemi dal 1987.',
    intro: "Ho iniziato a programmare dopo 25 anni passati a capire il business dall'interno. Ogni tappa qui sotto è costruita su quella base.",
  },
  es: {
    title: 'Programo desde 2020. Resuelvo problemas desde 1987.',
    intro: 'Empecé a programar después de 25 años entendiendo los negocios desde dentro. Cada hito de abajo se construyó sobre esa base.',
  },
};

const DevTimeline: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const copy = COPY[cv];
  const reduce = useReducedMotion();
  const mdUp = useMdUp();

  // Self-drawing spine: list scroll progress mapped to scaleY.
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
    <DevSection id="trajetoria" bg={BG_DEV_ALT} width="3xl">
      <DevCodeDeco code="$ git log --reverse  # 1987..today" />
      <DevSectionHeader eyebrow={t.nav.timeline} title={copy.title} intro={copy.intro} className="mb-14" />

      <ol ref={listRef} className="relative">
        {/* Static track (the whole path, barely visible) */}
        <div
          className="absolute bottom-2 left-[7px] top-2 w-px"
          style={{ background: light(0.14) }}
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
        {devTimeline[cv].map((e, i) => (
          // i === 1 (CS50, 2020) is where formal education starts: it carries
          // the #formacao anchor targeted by the menu's education shortcut.
          <DevTimelineItem
            key={e.title + e.year}
            e={e}
            index={i}
            showWatermark={mdUp && !reduce}
            anchorId={i === 1 ? 'formacao' : undefined}
          />
        ))}
      </ol>
    </DevSection>
  );
};

export default DevTimeline;
