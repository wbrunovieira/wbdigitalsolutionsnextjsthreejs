"use client";

/**
 * Sales CV — hero only (served on brunov.wbdigitalsolutions.com → /vendas).
 * Full-screen, LIGHT theme (neutral off-white — not pure white). Photo-less,
 * typographic: an oversized role lockup as the centerpiece, a giant low-opacity
 * WBPV monogram, fine grain and a hairline frame. Graphite ink + a single amber
 * accent (CTA). Name shown once (top-left): full name over a "known-as" line.
 *
 * A portrait can be re-introduced later (see git history / PHOTO_SRC pattern).
 */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Linkedin, MessageCircle, Package, Target, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks, type CVLang } from "@/content/cv";

const LANGS: { code: CVLang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt-BR", label: "PT" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
];

const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

const CV_PDF = "#"; // set to /bruno-vieira-sales.pdf once the PDF exists

// Palette (light theme — neutral off-white + graphite + a single amber accent)
const INK = "#1c1c1e"; // graphite ink
const AMBER = "#e0912f"; // warm accent (used sparingly)

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const SalesHero: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const reduce = useReducedMotion();
  const lang = toCVLang(language);
  const t = cvContent[lang];
  const hero = t.hero.sales;

  // Oversized headline cycles through the sales facets.
  const rotation = t.heroRotation;
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce || rotation.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % rotation.length), 2800);
    return () => clearInterval(id);
  }, [reduce, rotation.length]);

  // Fixed-header background on scroll + scroll-spy for the active section.
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["inicio", "trajetoria", "competencias", "formacao", "idiomas", "sobre"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const parts = (rotation[idx] ?? rotation[0]).toUpperCase().split(" ");
  const filledLine = parts[0];
  const outlinedLine = parts.slice(1).join(" ");

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

  const navItems = [
    { id: "inicio", label: t.nav.start },
    { id: "trajetoria", label: t.nav.timeline },
    { id: "competencias", label: t.nav.skills },
    { id: "formacao", label: t.nav.education },
    { id: "idiomas", label: t.nav.languages },
    { id: "sobre", label: t.nav.about },
  ];
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div style={{ background: "radial-gradient(120% 120% at 50% 42%, transparent 58%, rgba(28,28,30,0.06) 100%)" }} className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(28,28,30,0.9) 1px, transparent 1px)",
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
        style={{ fontSize: "clamp(12rem, 34vw, 34rem)", WebkitTextStroke: "1px rgba(28,28,30,0.05)" }}
      >
        WBPV
      </span>

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Hairline frame + corner ticks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 z-[1] rounded-[4px] border sm:inset-6" style={{ borderColor: "rgba(28,28,30,0.10)" }}>
        <span className="absolute left-0 top-0 h-3 w-px" style={{ background: AMBER }} />
        <span className="absolute left-0 top-0 h-px w-3" style={{ background: AMBER }} />
        <span className="absolute bottom-0 right-0 h-3 w-px" style={{ background: AMBER }} />
        <span className="absolute bottom-0 right-0 h-px w-3" style={{ background: AMBER }} />
      </div>

      {/* ===== Nav ===== */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? { background: "rgba(247,247,248,0.82)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(28,28,30,0.08)" }
            : { background: "transparent" }
        }
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#inicio" onClick={scrollTo("inicio")} className="flex items-center gap-3">
          {/* Monogram mark — makes it read as Bruno's personal page */}
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black"
            style={{ background: INK, color: "#ffffff", boxShadow: `inset 0 0 0 2px ${AMBER}` }}
            aria-hidden="true"
          >
            BV
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-black tracking-[-0.01em] sm:text-base" style={{ color: INK }}>{t.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(28,28,30,0.5)" }}>
              {t.fullName}
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={scrollTo(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className="group relative py-1 text-sm font-medium transition-colors"
              style={{ color: active === item.id ? INK : "rgba(28,28,30,0.6)" }}
            >
              {item.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full transition-transform duration-300 ease-out ${
                  active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
                style={{ background: AMBER }}
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 rounded-full border bg-white/70 p-1 shadow-[0_2px_20px_rgba(28,28,30,0.06)] backdrop-blur-sm" style={{ borderColor: "rgba(28,28,30,0.12)" }}>
          {LANGS.map((l) => {
            const isActive = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                aria-pressed={isActive}
                className="relative rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50"
              >
                {isActive && (
                  <motion.span
                    layoutId="cv-lang-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: INK }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10" style={{ color: isActive ? "#ffffff" : "rgba(28,28,30,0.6)" }}>{l.label}</span>
              </button>
            );
          })}
        </div>
        </div>
      </header>

      {/* ===== Center: oversized role lockup (photo-less centerpiece) ===== */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-[4vh]">
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
            >
              <span
                className="font-black uppercase leading-[0.84] tracking-[-0.02em]"
                style={{ fontSize: "clamp(3rem, 14vw, 11rem)", color: "rgba(28,28,30,0.92)" }}
              >
                {filledLine}
              </span>
              {outlinedLine && (
                <span
                  className="mt-[0.12em] font-black uppercase leading-[0.84] tracking-[-0.02em]"
                  style={{
                    fontSize: "clamp(3rem, 14vw, 11rem)",
                    color: "transparent",
                    WebkitTextStroke: "2.2px rgba(28,28,30,0.62)",
                  }}
                >
                  {outlinedLine}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ===== Bottom bar: intro + CTAs ===== */}
      <motion.div
        {...fade(0.25)}
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-lg">
          <p className="text-sm font-medium sm:text-base" style={{ color: "rgba(28,28,30,0.55)" }}>
            {t.heroGreeting} <span className="font-bold" style={{ color: INK }}>{t.name}</span> 👋
          </p>
          <span className="my-5 block h-px w-10" style={{ background: `linear-gradient(90deg, ${AMBER}, transparent)` }} aria-hidden="true" />
          <h1>
            <span
              className="block text-base font-medium leading-snug sm:text-lg"
              style={{ color: "rgba(28,28,30,0.5)" }}
            >
              {taglineLead.trim()}:
            </span>
            <span
              className="mt-1 block text-2xl font-black leading-[1.14] tracking-[-0.015em] sm:text-[2.15rem]"
              style={{ color: INK }}
            >
              {t.taglinePayoff.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </span>
          </h1>
          {/* Three value pillars — tied to the tagline (product · need · person) */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {[Package, Target, Handshake].map((Icon, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "rgba(28,28,30,0.66)" }}>
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
            className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(28,28,30,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50"
            style={{ borderColor: "rgba(28,28,30,0.2)", color: INK }}
          >
            <Linkedin aria-hidden="true" className="h-4 w-4" />
            {t.contact.linkedinLabel}
          </a>
          <a
            href={cvLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(28,28,30,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50"
            style={{ borderColor: "rgba(28,28,30,0.2)", color: INK }}
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
