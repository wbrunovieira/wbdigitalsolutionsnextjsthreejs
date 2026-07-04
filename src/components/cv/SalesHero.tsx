"use client";

/**
 * Sales CV hero (served on brunov.wbdigitalsolutions.com → /vendas).
 * Full-screen, LIGHT theme (neutral off-white, not pure white). Photo-less,
 * typographic: an oversized role lockup as the centerpiece, a giant low-opacity
 * WBPV monogram, fine grain and a hairline frame. Graphite ink + a single amber
 * accent (CTA). The fixed nav lives in SalesNav.tsx.
 *
 * A portrait can be re-introduced later (see git history / PHOTO_SRC pattern).
 */

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent } from "@/content/cv";
import { INK, ink, toCVLang } from "./salesTheme";
import SalesNav from "./SalesNav";
import SalesHeroBackdrop from "./SalesHeroBackdrop";
import SalesHeroIntro from "./SalesHeroIntro";

const ROTATION_MS = 2800;

/**
 * Average glyph width (em) of the display face in black uppercase; used to cap
 * the lockup font-size so the longest line (e.g. RELACIONAMENTO) always fits.
 */
const GLYPH_EM = 0.68;

/** Shared classes of both lockup lines: responsive clamp capped by --fit.
    No CSS uppercase: the rotation strings are hand-capitalized in cv.ts so
    acronyms keep their lowercase plural "s" (PMEs, SMBs, PYMEs). */
const LOCKUP_CLASSES =
  "max-w-[94vw] font-black leading-[0.84] tracking-[-0.02em] text-[min(clamp(1.9rem,11vw,4rem),var(--fit))] sm:text-[min(clamp(3rem,13vw,11rem),var(--fit))]";

const SalesHero: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const t = cvContent[toCVLang(language)];

  // Oversized headline cycles through the sales facets.
  const rotation = t.heroRotation;
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce || rotation.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % rotation.length), ROTATION_MS);
    return () => clearInterval(id);
  }, [reduce, rotation.length]);

  // No toUpperCase here: strings come hand-capitalized from cv.ts so
  // acronyms keep their lowercase plural "s" (PMEs, SMBs, PYMEs).
  const parts = (rotation[idx] ?? rotation[0]).split(" ");
  const filledLine = parts[0];
  const outlinedLine = parts.slice(1).join(" ");
  // Cap the font-size so the longest line always fits the viewport width.
  const longestLine = Math.max(filledLine.length, outlinedLine.length);
  const fitVW = (94 / (GLYPH_EM * longestLine)).toFixed(2);

  // Exit parallax: as the hero scrolls away, the WBPV watermark drifts slower
  // (down) while the lockup rises and fades, adding depth on the way out.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: exitProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const watermarkY = useTransform(exitProgress, [0, 1], [0, 60]);
  const lockupY = useTransform(exitProgress, [0, 1], [0, -40]);
  const lockupOpacity = useTransform(exitProgress, [0, 1], [1, 0.35]);

  // Pointer parallax: the oversized word drifts slightly toward the cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const wordX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const wordY = useTransform(sy, [-0.5, 0.5], [9, -9]);

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <main
      id="inicio"
      ref={heroRef}
      onPointerMove={handleMove}
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg,#f7f7f8 0%,#ececee 100%)", color: INK }}
    >
      <SalesHeroBackdrop watermarkY={reduce ? 0 : watermarkY} />

      <SalesNav />

      {/* ===== Center: oversized role lockup (photo-less centerpiece) ===== */}
      <motion.div
        className="relative z-10 flex flex-1 items-center justify-center px-6 py-[2vh]"
        style={{ y: reduce ? 0 : lockupY, opacity: reduce ? 1 : lockupOpacity }}
      >
        <motion.div
          style={{ x: reduce ? 0 : wordX, y: reduce ? 0 : wordY }}
          className="flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
              style={{ "--fit": `${fitVW}vw` } as React.CSSProperties}
            >
              <span className={LOCKUP_CLASSES} style={{ color: ink(0.92) }}>
                {filledLine}
              </span>
              {outlinedLine && (
                <span
                  className={`mt-[0.12em] ${LOCKUP_CLASSES}`}
                  style={{ color: "transparent", WebkitTextStroke: `2.2px ${ink(0.62)}` }}
                >
                  {outlinedLine}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom bar: greeting + welcome, tagline, pillars, CTAs */}
      <SalesHeroIntro />
    </main>
  );
};

export default SalesHero;
