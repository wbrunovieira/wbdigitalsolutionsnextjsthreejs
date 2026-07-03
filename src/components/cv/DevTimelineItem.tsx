"use client";

/**
 * One milestone of the DEV journey timeline (extracted from DevTimeline): the
 * node that lights up crossing the viewport center (reading cursor), the
 * year/age header, title/subtitle/location and bullets, plus the md+ outlined
 * year watermark drifting at a different speed for depth. Also home of the
 * useMdUp() SSR-safe media-query hook used by the parent.
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import type { DevTimelineEntry } from "@/content/devTimeline";
import { AMBER, BG_DEV_ALT, TEXT, light } from "./devTheme";
import { useDevReveal } from "./useDevReveal";

/** md+ without SSR mismatch: starts false on both sides, flips after mount. */
export function useMdUp() {
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

const DevTimelineItem: React.FC<{ e: DevTimelineEntry; index: number; showWatermark: boolean }> = ({
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

export default DevTimelineItem;
