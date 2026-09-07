'use client';

/**
 * Fixed navigation for the DEV CV page (independent dark twin of the sales nav):
 * - BV monogram + name lockup (name hidden on small screens; it re-appears
 *   inside the mobile menu, see DevNavMobile).
 * - Desktop (xl+): translucent dark capsule tab bar where the active item is
 *   an amber pill sliding between items (framer layoutId spring) with a small
 *   downward notch. Driven by the scroll-spy in useDevScrollSpy.
 * - Below xl: hamburger button opening DevNavMobile (body scroll locked).
 * - Amber "Contato" pill + language switcher + reading-progress bar.
 */

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvContent } from '@/content/cv';
import { AMBER, DEV_NAV_SECTIONS, light, toCVLang } from './devTheme';
import { useDevScrollSpy } from './useDevScrollSpy';
import DevNavMobile, { MENU_ARIA } from './DevNavMobile';
import DevNavActions from './DevNavActions';
import DevNavBrand from './DevNavBrand';
import DevNavTabs, { type DevNavItem } from './DevNavTabs';

const DevNav: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const reduce = useReducedMotion();
  const lang = toCVLang(language);
  const t = cvContent[lang];
  const aria = MENU_ARIA[lang];

  // Menu = spy sections + the education SHORTCUT after Trajetória: courses
  // live inside the timeline (#formacao anchor on the CS50 node), so the
  // shortcut lights up the timeline's pill via activeAs instead of its own.
  // "Stack" replaces the localized skills label: universal in all 4 locales
  // and it buys the width the 7th item needs at the xl breakpoint.
  const navItems: DevNavItem[] =
    DEV_NAV_SECTIONS.map(({ id, navKey }) => ({ id, label: navKey === 'skills' ? 'Stack' : t.nav[navKey] }));
  navItems.splice(2, 0, { id: 'formacao', label: t.nav.education, activeAs: 'trajetoria' });
  const { scrolled, active, navigateTo } = useDevScrollSpy(DEV_NAV_SECTIONS);

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
                background: 'rgba(14,14,17,0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${light(0.08)}`,
              }
            : { background: 'transparent' }
        }
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <DevNavBrand name={t.name} fullName={t.fullName} onNavigate={navigateTo('inicio')} />

          <DevNavTabs items={navItems} active={active} navigateTo={navigateTo} />

          <DevNavActions
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

      <DevNavMobile
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

export default DevNav;
