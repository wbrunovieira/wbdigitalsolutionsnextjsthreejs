"use client";

/**
 * Decorative background stack of the DEV hero (extracted from DevHero): amber
 * bloom + vignette + dot field, the binary edge strips (spelling BRUNO / DEV /
 * WB CODE at three opacities), the giant </> outlined watermark (drifting
 * slower on exit for depth), film grain and the hairline frame with amber
 * corner ticks. Also exports the LockupHalo: binary rows behind the giant
 * letters, dissolving to opacity 0 via a radial mask (they decode "WB DIGITAL
 * SOLUTIONS BRUNO DEV CODE FULL-STACK & AI 1987."). All aria-hidden.
 */

import React from "react";
import { motion, type MotionValue } from "framer-motion";
import { AMBER, GRAIN, light } from "./devTheme";

const DevHeroBackdrop: React.FC<{ watermarkY: MotionValue<number> | number }> = ({ watermarkY }) => (
  <>
    {/* Depth: soft amber-tinted bloom, gentle vignette, dot field */}
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div style={{ background: "radial-gradient(60% 55% at 50% 32%, rgba(224,145,47,0.06) 0%, transparent 70%)" }} className="absolute inset-0" />
      <div style={{ background: "radial-gradient(120% 120% at 50% 42%, transparent 58%, rgba(0,0,0,0.5) 100%)" }} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${light(0.9)} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.04,
          maskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent)",
        }}
      />
    </div>

    {/* Giant low-opacity code watermark (drifts slower on exit for depth) */}
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[6%] -right-[2%] z-0 select-none font-mono font-bold leading-none text-transparent"
      style={{ y: watermarkY, fontSize: "clamp(10rem, 30vw, 28rem)", WebkitTextStroke: `1px ${light(0.07)}` }}
    >
      {"</>"}
    </motion.span>

    {/* Binary layers at different depths/opacities (each spells something):
        right edge "BRUNO", left edge "DEV", top band "WB CODE". */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 z-[1] hidden -translate-y-1/2 select-none font-mono text-[10px] tracking-[0.3em] md:block"
      style={{ writingMode: "vertical-rl", color: light(0.14) }}
    >
      01000010 01010010 01010101 01001110 01001111
    </span>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[18%] left-3 z-[1] hidden select-none font-mono text-[10px] tracking-[0.3em] md:block"
      style={{ writingMode: "vertical-rl", color: light(0.07) }}
    >
      01000100 01000101 01010110
    </span>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-8 top-24 z-[1] hidden select-none font-mono text-[10px] tracking-[0.24em] lg:block"
      style={{ color: light(0.1) }}
    >
      01010111 01000010 · 01000011 01001111 01000100 01000101
    </span>

    {/* Film grain */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-screen"
      style={{ backgroundImage: GRAIN }}
    />

    {/* Hairline frame + corner ticks (starts below the fixed header) */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-4 left-4 right-4 top-20 z-[1] rounded-[4px] border sm:bottom-6 sm:left-6 sm:right-6 sm:top-24"
      style={{ borderColor: light(0.08) }}
    >
      <span className="absolute left-0 top-0 h-3 w-px" style={{ background: AMBER }} />
      <span className="absolute left-0 top-0 h-px w-3" style={{ background: AMBER }} />
      <span className="absolute bottom-0 right-0 h-3 w-px" style={{ background: AMBER }} />
      <span className="absolute bottom-0 right-0 h-px w-3" style={{ background: AMBER }} />
    </div>
  </>
);

/** Binary halo around the giant letters, dissolving to 0 at the edges. */
export const LockupHalo: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid select-none place-items-center overflow-hidden">
    {/* Nested masks (they multiply): the outer fades the sides horizontally;
        the inner carves a clear horizontal BAND where the prompt + lockup sit,
        so the binary frames the word (above/below) but never crosses it.
        Mobile gets a stronger ink (smaller glyphs read fainter); sm+ reverts. */}
    <div
      className="h-full w-full"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
    <div
      className="grid h-full w-full place-items-center text-center font-mono text-[11px] leading-[2.1] tracking-[0.35em] text-[rgba(244,244,245,0.28)] sm:text-sm sm:text-[rgba(244,244,245,0.18)]"
      style={{
        maskImage: "linear-gradient(180deg, transparent 2%, black 14%, black 28%, transparent 38%, transparent 66%, black 76%, black 88%, transparent 98%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 2%, black 14%, black 28%, transparent 38%, transparent 66%, black 76%, black 88%, transparent 98%)",
      }}
    >
      <div>01010111 01000010 00100000 01000100 01001001 01000111 01001001</div>
      <div>01010100 01000001 01001100 00100000 01010011 01001111 01001100</div>
      <div>01010101 01010100 01001001 01001111 01001110 01010011 00100000</div>
      <div>01000010 01010010 01010101 01001110 01001111 00100000 01000100</div>
      <div>01000101 01010110 00100000 01000011 01001111 01000100 01000101</div>
      <div>01000110 01010101 01001100 01001100 00101101 01010011 01010100</div>
      <div>01000001 01000011 01001011 00100000 00100110 00100000 01000001</div>
      <div>01001001 00100000 00110001 00111001 00111000 00110111 00101110</div>
    </div>
    </div>
  </div>
);

export default DevHeroBackdrop;
