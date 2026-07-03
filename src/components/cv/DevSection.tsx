"use client";

/**
 * Shared section shell + header for the DEV CV page (independent dark copy of
 * the sales pattern, see devTheme.ts). DevSection: the `<section id>` wrapper
 * + centered container. DevSectionHeader: the eyebrow + title (+ optional
 * intro) lockup used by the list-style sections.
 */

import React from "react";
import { motion } from "framer-motion";
import { AMBER, TEXT, light } from "./devTheme";
import { useDevReveal } from "./useDevReveal";

// Full literal class strings (not interpolated) so Tailwind JIT keeps them.
const WIDTHS = {
  "3xl": "mx-auto max-w-3xl px-6",
  "4xl": "mx-auto max-w-4xl px-6",
} as const;

const PADDINGS = {
  default: "py-20 sm:py-28",
  roomy: "py-24 sm:py-32",
} as const;

export const DevSection: React.FC<{
  id: string;
  bg: string;
  width?: keyof typeof WIDTHS;
  padding?: keyof typeof PADDINGS;
  children: React.ReactNode;
}> = ({ id, bg, width = "4xl", padding = "default", children }) => (
  <section id={id} className="relative scroll-mt-24" style={{ background: bg, color: TEXT }}>
    <div className={`${WIDTHS[width]} ${PADDINGS[padding]}`}>{children}</div>
  </section>
);

export const DevSectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  intro?: string;
  /** Bottom margin of the header block. */
  className?: string;
}> = ({ eyebrow, title, intro, className = "mb-12" }) => {
  const reveal = useDevReveal();
  return (
    <motion.header {...reveal()} className={className}>
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
        {eyebrow}
      </span>
      <h2 className="mt-2 text-balance text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl" style={{ color: TEXT }}>
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: light(0.6) }}>
          {intro}
        </p>
      )}
    </motion.header>
  );
};
