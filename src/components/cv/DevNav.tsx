"use client";

/**
 * Fixed navigation for the DEV CV page. Independent dark twin of the sales nav
 * (pattern copied on purpose, see devTheme.ts):
 * - BV monogram + name lockup (name hidden on small screens; it re-appears
 *   inside the mobile menu).
 * - Desktop (xl+): translucent dark capsule tab bar where the active item is
 *   an amber pill sliding between items (framer layoutId spring) with a small
 *   downward notch. Driven by an IntersectionObserver scroll-spy.
 * - Below xl: hamburger button opening a full-screen dark overlay with the
 *   nav links + Contato CTA (body scroll locked while open).
 * - Amber "Contato" pill + language switcher + reading-progress bar.
 */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { AMBER, BG_DEV, DEV_CONTACT_ID, DEV_NAV_SECTIONS, TEXT, light, toCVLang } from "./devTheme";

const LANGS: { code: CVLang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt-BR", label: "PT" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
];

const MENU_ARIA: Record<CVLang, { open: string; close: string }> = {
  "pt-BR": { open: "Abrir menu", close: "Fechar menu" },
  en: { open: "Open menu", close: "Close menu" },
  it: { open: "Apri il menu", close: "Chiudi il menu" },
  es: { open: "Abrir menú", close: "Cerrar menú" },
};

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** BV monogram disc (used in the header and the mobile-menu top bar). */
const Monogram: React.FC = () => (
  <span
    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black"
    style={{ background: BG_DEV, color: TEXT, boxShadow: `inset 0 0 0 2px ${AMBER}` }}
    aria-hidden="true"
  >
    BV
  </span>
);

const DevNav: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const reduce = useReducedMotion();
  const lang = toCVLang(language);
  const t = cvContent[lang];
  const aria = MENU_ARIA[lang];

  const navItems = DEV_NAV_SECTIONS.map(({ id, navKey }) => ({ id, label: t.nav[navKey] }));

  // Fixed-header background on scroll + scroll-spy for the active section.
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(DEV_NAV_SECTIONS[0].id);
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
    DEV_NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Reading progress (2px amber line under the header once scrolled).
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Mobile menu (hamburger) + body scroll lock while open.
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: "rgba(14,14,17,0.82)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: `1px solid ${light(0.08)}`,
              }
            : { background: "transparent" }
        }
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#inicio" onClick={scrollTo("inicio")} className="flex items-center gap-3">
            {/* Monogram mark, makes it read as Bruno's personal page */}
            <Monogram />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[15px] font-black tracking-[-0.01em] sm:text-base" style={{ color: TEXT }}>{t.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: light(0.5) }}>
                {t.fullName}
              </span>
            </span>
          </a>

          {/* Desktop nav: translucent dark capsule with a sliding amber pill +
              a small downward notch that follows the active item. */}
          <nav className="hidden xl:block">
            <div
              className="relative flex items-center gap-0.5 rounded-full border p-1.5 backdrop-blur-sm"
              style={{ borderColor: light(0.12), background: "rgba(244,244,245,0.06)" }}
            >
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={scrollTo(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50 ${
                      isActive ? "text-[#0e0e11]" : "text-[#f4f4f5]/55 hover:text-[#f4f4f5]/90"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dev-nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: AMBER }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      >
                        <span
                          className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[3px]"
                          style={{ background: AMBER, marginTop: "1px" }}
                          aria-hidden="true"
                        />
                      </motion.span>
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`#${DEV_CONTACT_ID}`}
              onClick={scrollTo(DEV_CONTACT_ID)}
              className="hidden rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 sm:inline-flex"
              style={{ background: AMBER, color: "#0e0e11", boxShadow: "0 6px 16px rgba(224,145,47,0.3)" }}
            >
              {t.nav.contact}
            </a>
            <div
              className="flex items-center gap-1 rounded-full border p-1 backdrop-blur-sm"
              style={{ borderColor: light(0.12), background: "rgba(244,244,245,0.06)" }}
            >
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
                        layoutId="dev-lang-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: TEXT }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10" style={{ color: isActive ? "#0e0e11" : light(0.6) }}>{l.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={aria.open}
              aria-expanded={menuOpen}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors xl:hidden"
              style={{ borderColor: light(0.14), background: "rgba(244,244,245,0.06)" }}
            >
              <Menu className="h-5 w-5" style={{ color: TEXT }} aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* Reading progress: information (how far along), so it stays in RM
            (direct mapping, no spring) instead of being removed. */}
        {scrolled && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
            style={{ background: AMBER, scaleX: reduce ? scrollYProgress : progress, opacity: 0.9 }}
          />
        )}
      </header>

      {/* Mobile menu (hamburger overlay) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "rgba(14,14,17,0.98)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="flex items-center gap-3">
                <Monogram />
                <span className="text-base font-black" style={{ color: TEXT }}>{t.name}</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label={aria.close}
                className="grid h-10 w-10 place-items-center rounded-full border"
                style={{ borderColor: light(0.14) }}
              >
                <X className="h-5 w-5" style={{ color: TEXT }} aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    scrollTo(item.id)(e);
                    setMenuOpen(false);
                  }}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.06 + i * 0.04 }}
                  className="py-2 text-3xl font-black tracking-[-0.02em]"
                  style={{ color: active === item.id ? AMBER : TEXT }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-6 pb-10">
              <a
                href={`#${DEV_CONTACT_ID}`}
                onClick={(e) => {
                  scrollTo(DEV_CONTACT_ID)(e);
                  setMenuOpen(false);
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold"
                style={{ background: AMBER, color: "#0e0e11", boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
              >
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DevNav;
