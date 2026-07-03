"use client";

/**
 * DEV CV hero (served on brunodev.wbdigitalsolutions.com → /dev).
 * Independent dark twin of the sales hero (pattern copied on purpose, see
 * devTheme.ts). Identity: deep graphite, terminal/mono accents ("$ whoami"
 * with a blinking block cursor answered by the oversized rotating lockup),
 * a giant </> watermark, film grain, hairline frame, greeting written as a
 * code comment, stack chips in mono, and the family amber for CTAs.
 */

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks, type CVLang } from "@/content/cv";
import { AMBER, DEV_CV_PDF, DEV_SECONDARY_CTA, GRAIN, TEXT, light, toCVLang } from "./devTheme";
import DevNav from "./DevNav";
import DevMagnetic from "./DevMagnetic";

const ROTATION_MS = 2800;

/**
 * Average glyph width (em) of the display face in black uppercase; caps the
 * lockup font-size so the longest line always fits the viewport width.
 */
const GLYPH_EM = 0.68;

/** Shared classes of both lockup lines: responsive clamp capped by --fit. */
const LOCKUP_CLASSES =
  "max-w-[94vw] font-black uppercase leading-[0.84] tracking-[-0.02em] text-[min(clamp(1.9rem,11vw,4rem),var(--fit))] sm:text-[min(clamp(3rem,13vw,11rem),var(--fit))]";

/** Rotating engineering facets (the answers to "$ whoami"). */
const ROTATION: Record<CVLang, string[]> = {
  "pt-BR": ["Full-Stack", "IA & Agentes", "3D & WebGL", "Arquitetura", "Cloud & DevOps"],
  en: ["Full-Stack", "AI & Agents", "3D & WebGL", "Architecture", "Cloud & DevOps"],
  it: ["Full-Stack", "IA & Agenti", "3D & WebGL", "Architettura", "Cloud & DevOps"],
  es: ["Full-Stack", "IA & Agentes", "3D & WebGL", "Arquitectura", "Cloud & DevOps"],
};

/** Soft welcome line under the greeting (dev twin of the sales heroWelcome). */
const WELCOME: Record<CVLang, string> = {
  "pt-BR": "Esta página foi feita com carinho para você conhecer melhor o seu futuro engenheiro. Obrigado pela visita.",
  en: "This page was made with care so you can get to know your future engineer. Thanks for visiting.",
  it: "Questa pagina è stata fatta con cura perché tu possa conoscere meglio il tuo futuro ingegnere. Grazie della visita.",
  es: "Esta página fue hecha con cariño para que conozcas mejor a tu futuro ingeniero. Gracias por la visita.",
};

const DevHero: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const hero = t.hero.engineering;

  // Oversized headline cycles through the engineering facets.
  const rotation = ROTATION[cv];
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

  // Exit parallax: as the hero scrolls away, the </> watermark drifts slower
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
      style={{ background: "linear-gradient(180deg,#0e0e11 0%,#131318 100%)", color: TEXT }}
    >
      {/* Depth: soft amber-tinted bloom, gentle vignette, dot field */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div style={{ background: "radial-gradient(60% 55% at 50% 32%, rgba(224,145,47,0.06) 0%, transparent 70%)" }} className="absolute inset-0" />
        <div style={{ background: "radial-gradient(120% 120% at 50% 42%, transparent 58%, rgba(0,0,0,0.5) 100%)" }} className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${light(0.9)} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            opacity: 0.04,
            maskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent)",
          }}
        />
      </div>

      {/* Giant low-opacity code watermark (drifts slower on exit for depth) */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[6%] -right-[2%] z-0 select-none font-mono font-bold leading-none text-transparent"
        style={{ y: reduce ? 0 : watermarkY, fontSize: "clamp(10rem, 30vw, 28rem)", WebkitTextStroke: `1px ${light(0.07)}` }}
      >
        {"</>"}
      </motion.span>

      {/* Binary layers at different depths/opacities (each spells something):
          right edge "BRUNO", left edge "DEV", top band "WB CODE". */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 z-[1] hidden -translate-y-1/2 select-none font-mono text-[10px] tracking-[0.3em] md:block"
        style={{ writingMode: "vertical-rl", color: light(0.14) }}
      >
        01000010 01010010 01010101 01001110 01001111
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18%] left-3 z-[1] hidden select-none font-mono text-[10px] tracking-[0.3em] md:block"
        style={{ writingMode: "vertical-rl", color: light(0.07) }}
      >
        01000100 01000101 01010110
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-24 z-[1] hidden select-none font-mono text-[10px] tracking-[0.24em] lg:block"
        style={{ color: light(0.1) }}
      >
        01010111 01000010 · 01000011 01001111 01000100 01000101
      </span>

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Hairline frame + corner ticks (starts below the fixed header) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-4 right-4 top-20 z-[1] rounded-[4px] border sm:bottom-6 sm:left-6 sm:right-6 sm:top-24"
        style={{ borderColor: light(0.08) }}
      >
        <span className="absolute left-0 top-0 h-3 w-px" style={{ background: AMBER }} />
        <span className="absolute left-0 top-0 h-px w-3" style={{ background: AMBER }} />
        <span className="absolute bottom-0 right-0 h-3 w-px" style={{ background: AMBER }} />
        <span className="absolute bottom-0 right-0 h-px w-3" style={{ background: AMBER }} />
      </div>

      <DevNav />

      {/* ===== Center: "$ whoami" answered by the oversized rotating lockup ===== */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-[2vh]"
        style={{ y: reduce ? 0 : lockupY, opacity: reduce ? 1 : lockupOpacity }}
      >
        {/* Binary halo behind the giant letters: denser near them, gradually
            dissolving to opacity 0 via a radial mask */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid select-none place-items-center overflow-hidden">
          <div
            className="text-center font-mono text-[11px] leading-[2.1] tracking-[0.35em] sm:text-sm"
            style={{
              color: light(0.18),
              maskImage: "radial-gradient(55% 55% at 50% 50%, black 20%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(55% 55% at 50% 50%, black 20%, transparent 72%)",
            }}
          >
            <div>01010111 01000010 00100000 01000100 01001001 01000111 01001001</div>
            <div>01010100 01000001 01001100 00100000 01010011 01001111 01001100</div>
            <div>01010101 01010100 01001001 01001111 01001110 01010011 00100000</div>
            <div>01000010 01010010 01010101 01001110 01001111 00100000 01000100</div>
            <div>01000101 01010110 00100000 01000011 01001111 01000100 01000101</div>
            <div>01000110 01010101 01001100 01001100 00101101 01010011 01010100</div>
            <div>01000001 01000011 01001011 00100000 00100110 00100000 01000001</div>
            <div>01001001 00100000 00110001 00111001 00111000 00110111 00101110</div>
          </div>
        </div>
        {/* Terminal prompt */}
        <motion.p {...fade(0.1)} className="mb-5 font-mono text-sm sm:text-base" style={{ color: light(0.55) }}>
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
              style={{ "--fit": `${fitVW}vw` } as React.CSSProperties}
            >
              <span className={LOCKUP_CLASSES} style={{ color: light(0.95) }}>
                {filledLine}
              </span>
              {outlinedLine && (
                <span
                  className={`mt-[0.12em] ${LOCKUP_CLASSES}`}
                  style={{ color: "transparent", WebkitTextStroke: `2.2px ${light(0.5)}` }}
                >
                  {outlinedLine}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ===== Bottom bar: greeting-as-comment, tagline, stack chips, CTAs ===== */}
      <motion.div
        {...fade(0.25)}
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-lg">
          {/* Greeting written as a code comment */}
          <p className="font-mono text-sm sm:text-[15px]" style={{ color: light(0.55) }}>
            <span style={{ color: light(0.35) }}>{"// "}</span>
            {t.heroGreeting} <span className="font-bold" style={{ color: TEXT }}>{t.name}</span> 👋
          </p>
          <p className="mt-1.5 max-w-md text-[13px] leading-relaxed" style={{ color: light(0.45) }}>
            {WELCOME[cv]}
          </p>
          <span className="my-5 block h-px w-10" style={{ background: `linear-gradient(90deg, ${AMBER}, transparent)` }} aria-hidden="true" />
          <h1>
            <span className="block text-base font-medium leading-snug sm:text-lg" style={{ color: light(0.5) }}>
              {hero.sub}
            </span>
            <span className="mt-1 block text-2xl font-black leading-[1.14] tracking-[-0.015em] sm:text-[2.15rem]" style={{ color: TEXT }}>
              {hero.title}
            </span>
          </h1>
          {/* Core stack, in mono (the dev twin of the sales pillars) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {hero.pills.map((p) => (
              <span
                key={p}
                className="rounded-md border px-2.5 py-1 font-mono text-xs font-medium"
                style={{ borderColor: light(0.15), color: light(0.72), background: "rgba(244,244,245,0.04)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <DevMagnetic className="col-span-2 flex sm:col-span-1">
            <a
              href={DEV_CV_PDF}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 focus-visible:ring-offset-2 sm:w-auto"
              style={{ background: AMBER, color: "#0e0e11", boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              {t.contact.downloadCv}
            </a>
          </DevMagnetic>
          <a
            href={cvLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={DEV_SECONDARY_CTA}
            style={{ borderColor: light(0.2), color: TEXT }}
          >
            <Github aria-hidden="true" className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={cvLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={DEV_SECONDARY_CTA}
            style={{ borderColor: light(0.2), color: TEXT }}
          >
            <Linkedin aria-hidden="true" className="h-4 w-4" />
            {t.contact.linkedinLabel}
          </a>
        </div>
      </motion.div>
    </main>
  );
};

export default DevHero;
