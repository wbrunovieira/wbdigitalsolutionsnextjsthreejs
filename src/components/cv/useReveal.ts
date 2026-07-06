/**
 * Shared scroll-reveal animation for the sales CV sections.
 * Replaces the identical `reveal()` helper that was copy-pasted per component.
 * Respects prefers-reduced-motion (opacity-only, faster).
 */

import { useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface RevealOptions {
  /** whileInView viewport margin (default "-60px"; Philosophy uses "-80px"). */
  margin?: string;
  /** Motion duration in seconds (default 0.6). */
  duration?: number;
}

/** Returns a `reveal(delay?)` prop factory for framer-motion elements. */
export function useReveal({ margin = '-60px', duration = 0.6 }: RevealOptions = {}) {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.4, delay },
        }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin },
          transition: { duration, delay, ease: EASE },
        };
}
