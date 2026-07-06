'use client';

/**
 * Decorative background stack of the sales hero (extracted from SalesHero):
 * soft neutral bloom + edge falloff + dot field, the giant low-opacity WBPV
 * monogram (drifting slower on exit for depth), film grain and the hairline
 * frame with amber corner ticks. All layers aria-hidden / pointer-events-none.
 */

import React from 'react';
import { motion, type MotionValue } from 'framer-motion';
import { AMBER, ink } from './salesTheme';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const SalesHeroBackdrop: React.FC<{ watermarkY: MotionValue<number> | number }> = ({ watermarkY }) => (
  <>
    {/* Depth: soft neutral bloom, gentle edge falloff, dot field (no warm tint) */}
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div style={{ background: 'radial-gradient(60% 55% at 50% 34%, rgba(255,255,255,0.7) 0%, transparent 70%)' }} className="absolute inset-0" />
      <div style={{ background: `radial-gradient(120% 120% at 50% 42%, transparent 58%, ${ink(0.06)} 100%)` }} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${ink(0.9)} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.05,
          maskImage: 'radial-gradient(70% 60% at 50% 45%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 45%, black, transparent)',
        }}
      />
    </div>

    {/* Giant low-opacity monogram (drifts slower on exit for depth) */}
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[8%] -right-[4%] z-0 select-none font-black leading-none text-transparent"
      style={{ y: watermarkY, fontSize: 'clamp(12rem, 34vw, 34rem)', WebkitTextStroke: `1px ${ink(0.05)}` }}
    >
      WBPV
    </motion.span>

    {/* Film grain */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-multiply"
      style={{ backgroundImage: GRAIN }}
    />

    {/* Hairline frame + corner ticks (starts below the fixed header) */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-4 left-4 right-4 top-20 z-[1] rounded-[4px] border sm:bottom-6 sm:left-6 sm:right-6 sm:top-24"
      style={{ borderColor: ink(0.1) }}
    >
      <span className="absolute left-0 top-0 h-3 w-px" style={{ background: AMBER }} />
      <span className="absolute left-0 top-0 h-px w-3" style={{ background: AMBER }} />
      <span className="absolute bottom-0 right-0 h-3 w-px" style={{ background: AMBER }} />
      <span className="absolute bottom-0 right-0 h-px w-3" style={{ background: AMBER }} />
    </div>
  </>
);

export default SalesHeroBackdrop;
