'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AMBER, light } from './devTheme';

export interface DevNavItem {
  id: string;
  label: string;
  activeAs?: string;
}

interface DevNavTabsProps {
  items: DevNavItem[];
  active: string;
  navigateTo: (id: string, activeAs?: string) => (e: React.MouseEvent) => void;
}

/**
 * Desktop nav: translucent dark capsule with a sliding amber pill + a small
 * downward notch that follows the active item. DEV CV only.
 */
const DevNavTabs: React.FC<DevNavTabsProps> = ({ items, active, navigateTo }) => (
  <nav className="hidden xl:block">
    <div
      className="relative flex items-center gap-0.5 rounded-full border p-1.5 backdrop-blur-sm"
      style={{ borderColor: light(0.12), background: 'rgba(244,244,245,0.06)' }}
    >
      {items.map((item) => {
        const isActive = active === item.id && !item.activeAs;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={navigateTo(item.id, item.activeAs)}
            aria-current={isActive ? 'true' : undefined}
            className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50 ${
              isActive ? 'text-[#0e0e11]' : 'text-[#f4f4f5]/55 hover:text-[#f4f4f5]/90'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="dev-nav-pill"
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

export default DevNavTabs;
