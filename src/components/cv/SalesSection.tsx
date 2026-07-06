'use client';

/**
 * Shared section shell + header for the sales CV page.
 * SalesSection: the `<section id>` wrapper + centered container that every
 * section repeated. SectionHeader: the eyebrow + title (+ optional intro)
 * lockup used by the list-style sections. Pixel-identical to the previous
 * per-component markup.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { AMBER, INK, ink } from './salesTheme';
import { useReveal } from './useReveal';

// Full literal class strings (not interpolated) so Tailwind JIT keeps them.
const WIDTHS = {
  '3xl': 'mx-auto max-w-3xl px-6',
  '4xl': 'mx-auto max-w-4xl px-6',
} as const;

const PADDINGS = {
  default: 'py-20 sm:py-28',
  roomy: 'py-24 sm:py-32',
} as const;

export const SalesSection: React.FC<{
  id: string;
  bg: string;
  width?: keyof typeof WIDTHS;
  padding?: keyof typeof PADDINGS;
  children: React.ReactNode;
}> = ({ id, bg, width = '4xl', padding = 'default', children }) => (
  <section id={id} className="relative scroll-mt-24" style={{ background: bg, color: INK }}>
    <div className={`${WIDTHS[width]} ${PADDINGS[padding]}`}>{children}</div>
  </section>
);

export const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  intro?: string;
  /** Bottom margin of the header block (sections vary: mb-10/mb-12/mb-14). */
  className?: string;
}> = ({ eyebrow, title, intro, className = 'mb-12' }) => {
  const reveal = useReveal();
  return (
    <motion.header {...reveal()} className={className}>
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
        {eyebrow}
      </span>
      <h2 className="mt-2 text-balance text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl" style={{ color: INK }}>
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: ink(0.6) }}>
          {intro}
        </p>
      )}
    </motion.header>
  );
};
