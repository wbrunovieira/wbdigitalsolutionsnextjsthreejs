'use client';

import React from 'react';
import { INK, ink } from './salesTheme';
import { Monogram } from './SalesNavMobile';

interface SalesNavBrandProps {
  name: string;
  fullName: string;
  onNavigate: (e: React.MouseEvent) => void;
}

/** Monogram + name lockup (sales CV only, never shared with the dev page). */
const SalesNavBrand: React.FC<SalesNavBrandProps> = ({ name, fullName, onNavigate }) => (
  // aria-label: on mobile the name span is display:none and the monogram is
  // aria-hidden, so the link needs its own name
  <a href="#inicio" onClick={onNavigate} aria-label={name} className="flex items-center gap-3">
    {/* Monogram mark, makes it read as Bruno's personal page */}
    <Monogram />
    <span className="hidden shrink-0 flex-col whitespace-nowrap leading-tight sm:flex">
      <span className="text-[15px] font-black tracking-[-0.01em] sm:text-base" style={{ color: INK }}>{name}</span>
      {/* Full name hides in the tight xl->2xl window: the capsule + WhatsApp
          CTA need the width there (es labels are the widest). */}
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] xl:hidden 2xl:block" style={{ color: ink(0.5) }}>
        {fullName}
      </span>
    </span>
  </a>
);

export default SalesNavBrand;
