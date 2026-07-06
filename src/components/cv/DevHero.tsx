'use client';

/**
 * DEV CV hero (served on brunodev.wbdigitalsolutions.com → /dev).
 * Independent dark twin of the sales hero. Identity: deep graphite,
 * terminal/mono accents ("$ whoami" with a blinking block cursor answered by
 * the oversized rotating lockup over a masked binary halo). Decorative layers
 * live in DevHeroBackdrop; the bottom bar in DevHeroIntro; the fixed nav in
 * DevNav.
 */

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { type CVLang } from '@/content/cv';
import { AMBER, TEXT, light, toCVLang } from './devTheme';
import DevNav from './DevNav';
import DevHeroBackdrop, { LockupHalo } from './DevHeroBackdrop';
import DevHeroIntro from './DevHeroIntro';

const ROTATION_MS = 2800;

/**
 * Average glyph width (em) of the display face in black uppercase; caps the
 * lockup font-size so the longest line always fits the viewport width.
 */
const GLYPH_EM = 0.68;

/** Shared classes of both lockup lines: responsive clamp capped by --fit. */
const LOCKUP_CLASSES =
  'max-w-[94vw] font-black uppercase leading-[0.84] tracking-[-0.02em] text-[min(clamp(1.9rem,11vw,4rem),var(--fit))] sm:text-[min(clamp(3rem,13vw,11rem),var(--fit))]';

/** Rotating engineering facets (the answers to "$ whoami"). */
const ROTATION: Record<CVLang, string[]> = {
  'pt-BR': ['Full-Stack', 'IA & Agentes', '3D & WebGL', 'Arquitetura', 'Cloud & DevOps'],
  en: ['Full-Stack', 'AI & Agents', '3D & WebGL', 'Architecture', 'Cloud & DevOps'],
  it: ['Full-Stack', 'IA & Agenti', '3D & WebGL', 'Architettura', 'Cloud & DevOps'],
  es: ['Full-Stack', 'IA & Agentes', '3D & WebGL', 'Arquitectura', 'Cloud & DevOps'],
};

const DevHero: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const cv = toCVLang(language);

  // Oversized headline cycles through the engineering facets.
  const rotation = ROTATION[cv];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce || rotation.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % rotation.length), ROTATION_MS);
    return () => clearInterval(id);
  }, [reduce, rotation.length]);

  const parts = (rotation[idx] ?? rotation[0]).toUpperCase().split(' ');
  const filledLine = parts[0];
  const outlinedLine = parts.slice(1).join(' ');
  // Cap the font-size so the longest line always fits the viewport width.
  const longestLine = Math.max(filledLine.length, outlinedLine.length);
  const fitVW = (94 / (GLYPH_EM * longestLine)).toFixed(2);

  // Exit parallax: as the hero scrolls away, the </> watermark drifts slower
  // (down) while the lockup rises and fades, adding depth on the way out.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: exitProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
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

  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <main
      id="inicio"
      ref={heroRef}
      onPointerMove={handleMove}
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#0e0e11 0%,#131318 100%)', color: TEXT }}
    >
      <DevHeroBackdrop watermarkY={reduce ? 0 : watermarkY} />

      <DevNav />

      {/* ===== Center: "$ whoami" answered by the oversized rotating lockup ===== */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-[2vh]"
        style={{ y: reduce ? 0 : lockupY, opacity: reduce ? 1 : lockupOpacity }}
      >
        <LockupHalo />

        {/* Terminal prompt */}
        <motion.p {...fade(0.1)} className="relative mb-7 font-mono text-sm sm:mb-5 sm:text-base" style={{ color: light(0.55) }}>
          <span style={{ color: AMBER }}>~</span> $ whoami
          <motion.span
            aria-hidden="true"
            className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em]"
            style={{ background: AMBER }}
            animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={reduce ? undefined : { duration: 1.1, times: [0, 0.5, 0.5, 1], repeat: Infinity }}
          />
        </motion.p>

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
              style={{ '--fit': `${fitVW}vw` } as React.CSSProperties}
            >
              <span className={LOCKUP_CLASSES} style={{ color: light(0.95) }}>
                {filledLine}
              </span>
              {outlinedLine && (
                <span
                  className={`mt-[0.12em] ${LOCKUP_CLASSES}`}
                  style={{ color: 'transparent', WebkitTextStroke: `2.2px ${light(0.5)}` }}
                >
                  {outlinedLine}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom bar: greeting-as-comment, tagline, stack chips, CTAs */}
      <DevHeroIntro />
    </main>
  );
};

export default DevHero;
