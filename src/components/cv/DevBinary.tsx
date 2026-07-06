'use client';

/**
 * Binary texture block for the DEV CV page: rows of binary that dissolve to
 * opacity 0 via a gradient mask (the halo language introduced behind the hero
 * lockup). Reusable with variations: rows (each placement encodes a word
 * related to its section), mask shape and intensity. Decorative only:
 * aria-hidden, pointer-events-none; callers position it via className in
 * empty side areas (lg+) so it never sits over text.
 */

import React from 'react';
import { light } from './devTheme';

const MASKS = {
  radial: 'radial-gradient(65% 65% at 50% 50%, black 45%, transparent 90%)',
  'fade-b': 'linear-gradient(180deg, black 30%, transparent 95%)',
  'fade-t': 'linear-gradient(0deg, black 30%, transparent 95%)',
} as const;

const DevBinary: React.FC<{
  rows: string[];
  mask?: keyof typeof MASKS;
  /** Base ink alpha before the mask fades it out (default 0.3). */
  alpha?: number;
  className?: string;
}> = ({ rows, mask = 'radial', alpha = 0.3, className = '' }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
    <div
      className="font-mono text-sm leading-[2.1] tracking-[0.35em]"
      style={{ color: light(alpha), maskImage: MASKS[mask], WebkitMaskImage: MASKS[mask] }}
    >
      {rows.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  </div>
);

export default DevBinary;
