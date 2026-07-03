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

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Linkedin, MessageCircle, Package, Target, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks } from "@/content/cv";
import { AMBER, CV_PDF, INK, SECONDARY_CTA, ink, toCVLang } from "./salesTheme";
import SalesNav from "./SalesNav";

const ROTATION_MS = 2800;

/**
 * Average glyph width (em) of the display face in black uppercase; used to cap
 * the lockup font-size so the longest line (e.g. RELACIONAMENTO) always fits.
 */
const GLYPH_EM = 0.68;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Shared classes of both lockup lines: responsive clamp capped by --fit. */
const LOCKUP_CLASSES =
  "max-w-[94vw] font-black uppercase leading-[0.84] tracking-[-0.02em] text-[min(clamp(1.9rem,11vw,4rem),var(--fit))] sm:text-[min(clamp(3rem,13vw,11rem),var(--fit))]";

const SalesHero: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const t = cvContent[toCVLang(language)];
  const hero = t.hero.sales;

  // Oversized headline cycles through the sales facets.
  const rotation = t.heroRotation;
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce || rotation.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % rotation.length), ROTATION_MS);
    return () => clearInterval(id);
  }, [reduce, rotation.length]);

  const parts = (rotation[idx] ?? rotation[0]).toUpperCase().split(" ");
  const filledLine = parts[0];
  const outlinedLine = parts.slice(1).join(" ");
  // Cap the font-size so the longest line always fits the viewport width.
  const longestLine = Math.max(filledLine.length, outlinedLine.length);
  const fitVW = (94 / (GLYPH_EM * longestLine)).toFixed(2);

  // Lead-in (setup, before the colon); the payoff lines come pre-split from content.
  const taglineLead = hero.title.split(":")[0].trim();

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
      onPointerMove={handleMove}
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg,#f7f7f8 0%,#ececee 100%)", color: INK }}
    >
      {/* Depth: soft neutral bloom, gentle edge falloff, dot field (no warm tint) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div style={{ background: "radial-gradient(60% 55% at 50% 34%, rgba(255,255,255,0.7) 0%, transparent 70%)" }} className="absolute inset-0" />
        <div style={{ background: `radial-gradient(120% 120% at 50% 42%, transparent 58%, ${ink(0.06)} 100%)` }} className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${ink(0.9)} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            opacity: 0.05,
            maskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent)",
          }}
        />
      </div>

      {/* Giant low-opacity monogram */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[8%] -right-[4%] z-0 select-none font-black leading-none text-transparent"
        style={{ fontSize: "clamp(12rem, 34vw, 34rem)", WebkitTextStroke: `1px ${ink(0.05)}` }}
      >
        WBPV
      </span>

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Hairline frame + corner ticks (starts below the fixed header) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-4 right-4 top-20 z-[1] rounded-[4px] border sm:bottom-6 sm:left-6 sm:right-6 sm:top-24"
        style={{ borderColor: ink(0.1) }}
      >
        <span className="absolute left-0 top-0 h-3 w-px" style={{ background: AMBER }} />
        <span className="absolute left-0 top-0 h-px w-3" style={{ background: AMBER }} />
        <span className="absolute bottom-0 right-0 h-3 w-px" style={{ background: AMBER }} />
        <span className="absolute bottom-0 right-0 h-px w-3" style={{ background: AMBER }} />
      </div>

      <SalesNav />

      {/* ===== Center: oversized role lockup (photo-less centerpiece) ===== */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-[2vh]">
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
      </div>

      {/* ===== Bottom bar: greeting + welcome, tagline, pillars, CTAs ===== */}
      <motion.div
        {...fade(0.25)}
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-lg">
          <p className="text-sm font-medium sm:text-base" style={{ color: ink(0.55) }}>
            {t.heroGreeting} <span className="font-bold" style={{ color: INK }}>{t.name}</span> 👋
          </p>
          {/* Soft welcome: what this page is + thanks (whisper, below the greeting) */}
          <p className="mt-1.5 max-w-md text-[13px] leading-relaxed" style={{ color: ink(0.45) }}>
            {t.heroWelcome}
          </p>
          <span className="my-5 block h-px w-10" style={{ background: `linear-gradient(90deg, ${AMBER}, transparent)` }} aria-hidden="true" />
          <h1>
            <span className="block text-base font-medium leading-snug sm:text-lg" style={{ color: ink(0.5) }}>
              {taglineLead}:
            </span>
            <span className="mt-1 block text-2xl font-black leading-[1.14] tracking-[-0.015em] sm:text-[2.15rem]" style={{ color: INK }}>
              {t.taglinePayoff.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </span>
          </h1>
          {/* Three value pillars, tied to the tagline (product · need · person) */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {[Package, Target, Handshake].map((Icon, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: ink(0.66) }}>
                <Icon aria-hidden="true" className="h-4 w-4" style={{ color: AMBER }} />
                {t.heroPillars[i]}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <a
            href={CV_PDF}
            className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 focus-visible:ring-offset-2 sm:col-span-1"
            style={{ background: AMBER, color: INK, boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {t.contact.downloadCv}
          </a>
          <a
            href={cvLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={SECONDARY_CTA}
            style={{ borderColor: ink(0.2), color: INK }}
          >
            <Linkedin aria-hidden="true" className="h-4 w-4" />
            {t.contact.linkedinLabel}
          </a>
          <a
            href={cvLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={SECONDARY_CTA}
            style={{ borderColor: ink(0.2), color: INK }}
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </main>
  );
};

export default SalesHero;
