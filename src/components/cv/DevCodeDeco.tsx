"use client";

/**
 * Living-terminal decoration for the DEV CV sections (same energy as the
 * hero's "$ whoami"): a mono snippet pinned to a corner of the section that
 * TYPES itself when scrolled into view, with prompt glyphs ($, ~) in amber
 * and a forever-blinking amber block cursor. Each snippet echoes the
 * section's message in code. Decorative only: aria-hidden,
 * pointer-events-none. On mobile it shrinks (10px) and may wrap within the
 * section's padding band; md+ keeps the single-line 13px version. Reduced
 * motion: full static text, solid cursor.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AMBER, light } from "./devTheme";

const POSITIONS = {
  "top-left": "left-4 right-4 top-6 md:left-6 md:right-auto md:top-8",
  "bottom-left": "bottom-6 left-4 right-4 md:bottom-8 md:left-6 md:right-auto",
} as const;

const TYPE_STEP_S = 0.022; // per-character typing cadence

const DevCodeDeco: React.FC<{ code: string; position?: keyof typeof POSITIONS }> = ({
  code,
  position = "top-left",
}) => {
  const reduce = useReducedMotion();
  const chars = Array.from(code);

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none font-mono text-[10px] leading-relaxed md:text-[13px] ${POSITIONS[position]}`}
      style={{ color: light(0.5), whiteSpace: "pre-wrap" }}
    >
      {reduce
        ? chars.map((c, i) => (
            <span key={i} style={c === "$" || c === "~" ? { color: AMBER } : undefined}>
              {c}
            </span>
          ))
        : chars.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              // Vertical-only margin: a horizontal one would keep edge
              // characters permanently out of view (they'd never type).
              viewport={{ once: true, margin: "-60px 0px -60px 0px" }}
              transition={{ duration: 0.01, delay: 0.3 + i * TYPE_STEP_S }}
              style={c === "$" || c === "~" ? { color: AMBER } : undefined}
            >
              {c}
            </motion.span>
          ))}
      {/* Blinking block cursor (solid under reduced motion) */}
      <motion.span
        className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em]"
        style={{ background: AMBER }}
        animate={reduce ? { opacity: 0.8 } : { opacity: [1, 1, 0, 0] }}
        transition={reduce ? undefined : { duration: 1.1, times: [0, 0.5, 0.5, 1], repeat: Infinity }}
      />
    </span>
  );
};

export default DevCodeDeco;
