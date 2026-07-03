"use client";

/**
 * Fixed navigation for the sales CV page:
 * - BV monogram + name lockup (name hidden on small screens; it re-appears
 *   inside the mobile menu, see SalesNavMobile).
 * - Desktop (xl+): translucent capsule tab bar where the active item is an
 *   amber pill sliding between items (framer layoutId spring) with a small
 *   downward notch. Driven by the scroll-spy in useSalesScrollSpy.
 * - Below xl: hamburger button opening SalesNavMobile (body scroll locked).
 * - Amber "Contato" pill + language switcher + reading-progress bar.
 */

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { AMBER, CONTACT_ID, INK, NAV_SECTIONS, ink, toCVLang } from "./salesTheme";
import { useSalesScrollSpy } from "./useSalesScrollSpy";
import SalesNavMobile, { Monogram } from "./SalesNavMobile";

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

const SalesNav: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const reduce = useReducedMotion();
  const lang = toCVLang(language);
  const t = cvContent[lang];
  const aria = MENU_ARIA[lang];

  const navItems = NAV_SECTIONS.map(({ id, navKey }) => ({ id, label: t.nav[navKey] }));
  const { scrolled, active, navigateTo } = useSalesScrollSpy(NAV_SECTIONS);

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
                background: "rgba(247,247,248,0.82)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: `1px solid ${ink(0.08)}`,
              }
            : { background: "transparent" }
        }
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#inicio" onClick={navigateTo("inicio")} className="flex items-center gap-3">
            {/* Monogram mark, makes it read as Bruno's personal page */}
            <Monogram />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[15px] font-black tracking-[-0.01em] sm:text-base" style={{ color: INK }}>{t.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: ink(0.5) }}>
                {t.fullName}
              </span>
            </span>
          </a>

          {/* Desktop nav: translucent capsule with a sliding amber pill (animated
              tab-bar style) + a small downward notch that follows the active item. */}
          <nav className="hidden xl:block">
            <div
              className="relative flex items-center gap-0.5 rounded-full border bg-white/70 p-1.5 shadow-[0_2px_20px_rgba(28,28,30,0.06)] backdrop-blur-sm"
              style={{ borderColor: ink(0.12) }}
            >
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={navigateTo(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50 ${
                      isActive ? "text-[#1c1c1e]" : "text-[#1c1c1e]/55 hover:text-[#1c1c1e]/90"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="cv-nav-pill"
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
              href={`#${CONTACT_ID}`}
              onClick={navigateTo(CONTACT_ID)}
              className="hidden rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 sm:inline-flex"
              style={{ background: AMBER, color: INK, boxShadow: "0 6px 16px rgba(224,145,47,0.3)" }}
            >
              {t.nav.contact}
            </a>
            <div
              className="flex items-center gap-1 rounded-full border bg-white/70 p-1 shadow-[0_2px_20px_rgba(28,28,30,0.06)] backdrop-blur-sm"
              style={{ borderColor: ink(0.12) }}
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
                        layoutId="cv-lang-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: INK }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10" style={{ color: isActive ? "#ffffff" : ink(0.6) }}>{l.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={aria.open}
              aria-expanded={menuOpen}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors xl:hidden"
              style={{ borderColor: ink(0.14), background: "rgba(255,255,255,0.7)" }}
            >
              <Menu className="h-5 w-5" style={{ color: INK }} aria-hidden="true" />
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

      <SalesNavMobile
        open={menuOpen}
        name={t.name}
        closeLabel={aria.close}
        contactLabel={t.nav.contact}
        items={navItems}
        active={active}
        navigateTo={navigateTo}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};

export default SalesNav;
