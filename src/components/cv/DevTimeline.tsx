"use client";

/**
 * Journey timeline section for the DEV CV page (independent dark copy of the
 * sales parallax pattern, see devTheme.ts). Scroll-driven storytelling: a
 * faint track shows the whole path while an amber progress line draws itself
 * with scroll; each node lights up when its entry crosses the viewport center;
 * on md+ a giant outlined year watermark drifts at a different speed for
 * depth. Entries come from devTimeline.ts (pt-BR WIP).
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
import { devTimeline, type DevTimelineEntry } from "@/content/devTimeline";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { AMBER, BG_DEV_ALT, TEXT, light, toCVLang } from "./devTheme";
import { useDevReveal } from "./useDevReveal";
import { DevSection, DevSectionHeader } from "./DevSection";
import DevCodeDeco from "./DevCodeDeco";

const COPY: Record<CVLang, { title: string; intro: string }> = {
  "pt-BR": {
    title: "Programo desde 2020. Resolvo problemas desde 1987.",
    intro: "Comecei a programar depois de 25 anos entendendo negócios por dentro. Cada marco abaixo foi construído em cima dessa base.",
  },
  en: {
    title: "Coding since 2020. Solving problems since 1987.",
    intro: "I started coding after 25 years understanding business from the inside. Every milestone below was built on that foundation.",
  },
  it: {
    title: "Programmo dal 2020. Risolvo problemi dal 1987.",
    intro: "Ho iniziato a programmare dopo 25 anni passati a capire il business dall'interno. Ogni tappa qui sotto è costruita su quella base.",
  },
  es: {
    title: "Programo desde 2020. Resuelvo problemas desde 1987.",
    intro: "Empecé a programar después de 25 años entendiendo los negocios desde dentro. Cada hito de abajo se construyó sobre esa base.",
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
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -right-2 top-0 select-none font-black leading-none"
      style={{
        y,
        fontSize: "clamp(4rem, 8vw, 6.5rem)",
        color: "transparent",
        WebkitTextStroke: `1px ${light(0.08)}`,
      }}
    >
      {year.slice(0, 4)}
    </motion.span>
  );
};

const TimelineItem: React.FC<{ e: DevTimelineEntry; index: number; showWatermark: boolean }> = ({
  e,
  index,
  showWatermark,
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const reveal = useDevReveal();
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
          backgroundColor: isActive ? AMBER : BG_DEV_ALT,
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
        <motion.span
          className="font-mono text-sm font-bold"
          initial={false}
          animate={{ color: isActive ? AMBER : light(0.5) }}
          transition={{ duration: 0.3 }}
        >
          {e.year}
        </motion.span>
        <span className="text-xs font-medium" style={{ color: light(0.45) }}>{e.age}</span>
      </div>
      <h3 className="mt-1 text-lg font-black tracking-[-0.01em]" style={{ color: TEXT }}>{e.title}</h3>
      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm font-semibold" style={{ color: light(0.6) }}>
        {e.subtitle}
        {e.location && (
          <span className="inline-flex items-center gap-1 font-medium" style={{ color: light(0.42) }}>
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {e.location}
          </span>
        )}
      </p>
      <ul className="mt-3 space-y-1.5">
        {e.bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: light(0.74) }}>
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: AMBER }} aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
    </motion.li>
  );
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
    offset: ["start 0.7", "end 0.5"],
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
        {devTimeline.map((e, i) => (
          <TimelineItem key={e.title + e.year} e={e} index={i} showWatermark={mdUp && !reduce} />
        ))}
      </ol>
    </DevSection>
  );
};

export default DevTimeline;
