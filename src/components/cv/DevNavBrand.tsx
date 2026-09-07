'use client';

import React from 'react';
import { TEXT, light } from './devTheme';
import { Monogram } from './DevNavMobile';

interface DevNavBrandProps {
  name: string;
  fullName: string;
  onNavigate: (e: React.MouseEvent) => void;
}

/** Monogram + name lockup (DEV CV only, never shared with the sales page). */
const DevNavBrand: React.FC<DevNavBrandProps> = ({ name, fullName, onNavigate }) => (
  // aria-label: on mobile the name span is display:none and the monogram is
  // aria-hidden, so the link needs its own name
  <a href="#inicio" onClick={onNavigate} aria-label={name} className="flex items-center gap-3">
    {/* Monogram mark, makes it read as Bruno's personal page */}
    <Monogram />
    <span className="hidden shrink-0 flex-col whitespace-nowrap leading-tight sm:flex">
      <span className="text-[15px] font-black tracking-[-0.01em] sm:text-base" style={{ color: TEXT }}>{name}</span>
      {/* Full name hides in the tight xl->2xl window: the 7-item capsule
          needs the width there. */}
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] xl:hidden 2xl:block" style={{ color: light(0.5) }}>
        {fullName}
      </span>
    </span>
  </a>
);

export default DevNavBrand;
