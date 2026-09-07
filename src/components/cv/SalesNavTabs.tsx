'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AMBER, ink } from './salesTheme';

export interface SalesNavItem {
  id: string;
  label: string;
}

interface SalesNavTabsProps {
  items: SalesNavItem[];
  active: string;
  navigateTo: (id: string) => (e: React.MouseEvent) => void;
}

/**
 * Desktop nav: translucent capsule with a sliding amber pill (animated tab-bar
 * style) + a small downward notch that follows the active item. Sales CV only.
 */
const SalesNavTabs: React.FC<SalesNavTabsProps> = ({ items, active, navigateTo }) => (
  <nav className="hidden xl:block">
    <div
      className="relative flex items-center gap-0.5 rounded-full border bg-white/70 p-1.5 shadow-[0_2px_20px_rgba(28,28,30,0.06)] backdrop-blur-sm"
      style={{ borderColor: ink(0.12) }}
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={navigateTo(item.id)}
            aria-current={isActive ? 'true' : undefined}
            className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50 ${
              isActive ? 'text-[#1c1c1e]' : 'text-[#1c1c1e]/55 hover:text-[#1c1c1e]/90'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="cv-nav-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: AMBER }}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              >
                <span
                  className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[3px]"
                  style={{ background: AMBER, marginTop: '1px' }}
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
);

export default SalesNavTabs;
