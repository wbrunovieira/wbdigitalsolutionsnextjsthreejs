"use client";

/**
 * Career timeline section for the sales CV page: a vertical spine with nodes.
 * Scroll-driven storytelling: a static track shows the whole path while an
 * amber progress line draws itself with scroll; each node lights up when its
 * entry crosses the viewport center (a "reading cursor"); on md+ a giant
 * outlined year watermark drifts at a different speed for depth (WBPV
 * language). Entries come localized from salesTimeline.ts.
 */

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { salesTimeline, type TimelineEntry } from "@/content/salesTimeline";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { AMBER, BG_B, INK, ink, toCVLang } from "./salesTheme";
import { useReveal } from "./useReveal";
import { SalesSection, SectionHeader } from "./SalesSection";

const COPY: Record<CVLang, { title: string; intro: string }> = {
  "pt-BR": {
    title: "Do balcão, aos 13, à mesa de negociação.",
    intro: "Comecei a vender cedo, e cada passo somou repertório comercial.",
  },
  en: {
    title: "From the shop counter at 13 to the negotiation table.",
    intro: "I started selling young, and every step added to my commercial range.",
  },
  it: {
    title: "Dal bancone, a 13 anni, al tavolo delle trattative.",
    intro: "Ho iniziato a vendere presto, e ogni passo ha aggiunto repertorio commerciale.",
  },
  es: {
    title: "Del mostrador, a los 13, a la mesa de negociación.",
    intro: "Empecé a vender temprano, y cada paso sumó repertorio comercial.",
  },
};

/** md+ without SSR mismatch: starts false on both sides, flips after mount. */
function useMdUp() {
  const [mdUp, setMdUp] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mdUp;
}

/**
 * Giant outlined year drifting slower than the content (depth). Mounted only
 * on md+ and with motion allowed, so mobile pays zero scroll-tracking cost.
 */
const YearWatermark: React.FC<{
  year: string;
  container: React.RefObject<HTMLLIElement | null>;
}> = ({ year, container }) => {
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  // Content scrolls 1:1; the watermark travels 56px the other way across the
  // pass, creating the speed difference that reads as depth.
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -right-2 top-0 select-none font-black leading-none"
      style={{
        y,
        fontSize: "clamp(4rem, 8vw, 6.5rem)",
        color: "transparent",
        WebkitTextStroke: `1px ${ink(0.07)}`,
      }}
    >
      {year.slice(0, 4)}
    </motion.span>
  );
};

const TimelineItem: React.FC<{ e: TimelineEntry; index: number; showWatermark: boolean }> = ({
  e,
  index,
  showWatermark,
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const reveal = useReveal();
  // Central viewport window (~10% tall): the node "lights up" while its entry
  // crosses the reading zone. once:false on purpose, the reading cursor
  // follows the visitor up and down the page.
  const isActive = useInView(ref, { margin: "-42% 0px -48% 0px" });

  return (
    <motion.li ref={ref} {...reveal(Math.min(index, 3) * 0.05)} className="relative mb-11 pl-8 last:mb-0">
      {showWatermark && <YearWatermark year={e.year} container={ref} />}

      {/* Node: lights up crossing the center (scale + fill + halo) */}
      <motion.span
        className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2"
        style={{ borderColor: AMBER }}
        initial={false}
        animate={{
          scale: reduce ? 1 : isActive ? 1.25 : 1,
          backgroundColor: isActive ? AMBER : BG_B,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        aria-hidden="true"
      >
        <motion.span
          className="absolute -inset-1.5 rounded-full border"
          style={{ borderColor: AMBER }}
          initial={false}
          animate={{ opacity: isActive ? 0.35 : 0, scale: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.35 }}
        />
      </motion.span>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        {/* The year follows the node: amber while active, quiet graphite when not */}
        <motion.span
          className="font-mono text-sm font-bold"
          initial={false}
          animate={{ color: isActive ? AMBER : ink(0.5) }}
          transition={{ duration: 0.3 }}
        >
          {e.year}
        </motion.span>
        <span className="text-xs font-medium" style={{ color: ink(0.45) }}>{e.age}</span>
      </div>
      <h3 className="mt-1 text-lg font-black tracking-[-0.01em]" style={{ color: INK }}>{e.company}</h3>
      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm font-semibold" style={{ color: ink(0.6) }}>
        {e.role}
        {e.location && (
          <span className="inline-flex items-center gap-1 font-medium" style={{ color: ink(0.42) }}>
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {e.location}
          </span>
        )}
      </p>
      <ul className="mt-3 space-y-1.5">
        {e.bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: ink(0.74) }}>
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: AMBER }} aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
    </motion.li>
  );
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
    offset: ["start 0.7", "end 0.5"],
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
          <TimelineItem key={e.company + e.year} e={e} index={i} showWatermark={mdUp && !reduce} />
        ))}
      </ol>
    </SalesSection>
  );
};

export default SalesTimeline;
