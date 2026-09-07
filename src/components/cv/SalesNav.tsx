'use client';

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

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvContent } from '@/content/cv';
import { AMBER, NAV_SECTIONS, ink, toCVLang } from './salesTheme';
import { useSalesScrollSpy } from './useSalesScrollSpy';
import SalesNavMobile, { MENU_ARIA } from './SalesNavMobile';
import SalesNavActions from './SalesNavActions';
import SalesNavBrand from './SalesNavBrand';
import SalesNavTabs from './SalesNavTabs';

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
    document.body.style.overflow = 'hidden';
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
                background: 'rgba(247,247,248,0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${ink(0.08)}`,
              }
            : { background: 'transparent' }
        }
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <SalesNavBrand name={t.name} fullName={t.fullName} onNavigate={navigateTo('inicio')} />

          <SalesNavTabs items={navItems} active={active} navigateTo={navigateTo} />

          <SalesNavActions
            lang={lang}
            setLanguage={setLanguage}
            menuOpen={menuOpen}
            openLabel={aria.open}
            onOpenMenu={() => setMenuOpen(true)}
          />
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
        items={navItems}
        active={active}
        navigateTo={navigateTo}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};

export default SalesNav;
