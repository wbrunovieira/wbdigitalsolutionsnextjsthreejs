"use client";

/**
 * Contained magnetic hover for the primary amber CTAs: the wrapped element
 * drifts at most ~4px toward the cursor and springs back on leave.
 * Mouse-only by construction (pointerType check) and disabled under
 * prefers-reduced-motion.
 */

import React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const Magnetic: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 8); // max 4px
    y.set(((e.clientY - r.top) / r.height - 0.5) * 6); // max 3px
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className ?? "inline-flex"}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
