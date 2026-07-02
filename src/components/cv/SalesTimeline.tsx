"use client";

/**
 * Career timeline section for the sales CV page. Light theme (graphite + amber),
 * a vertical spine with nodes. Content from salesTimeline.ts (pt-BR WIP).
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { salesTimeline } from "@/content/salesTimeline";

const INK = "#1c1c1e";
const AMBER = "#e0912f";
const BG = "#f1f1f3";

const SalesTimeline: React.FC = () => {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="trajetoria" className="relative scroll-mt-24" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        {/* Header */}
        <motion.header {...reveal()} className="mb-14">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
            Trajetória
          </span>
          <h2 className="mt-2 text-balance text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl" style={{ color: INK }}>
            Do balcão, aos 13, à mesa de negociação.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: "rgba(28,28,30,0.6)" }}>
            Comecei a vender cedo, e cada passo somou repertório comercial.
          </p>
        </motion.header>

        {/* Timeline */}
        <ol className="relative">
          {/* Spine */}
          <div
            className="absolute bottom-2 left-[7px] top-2 w-px"
            style={{ background: "linear-gradient(180deg, #e0912f 0%, rgba(28,28,30,0.18) 70%, transparent 100%)" }}
            aria-hidden="true"
          />
          {salesTimeline.map((e, i) => (
            <motion.li key={e.company + e.year} {...reveal(i * 0.05)} className="relative mb-11 pl-8 last:mb-0">
              {/* Node */}
              <span
                className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2"
                style={{ borderColor: AMBER, background: BG }}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-mono text-sm font-bold" style={{ color: AMBER }}>{e.year}</span>
                <span className="text-xs font-medium" style={{ color: "rgba(28,28,30,0.45)" }}>{e.age}</span>
              </div>
              <h3 className="mt-1 text-lg font-black tracking-[-0.01em]" style={{ color: INK }}>{e.company}</h3>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm font-semibold" style={{ color: "rgba(28,28,30,0.6)" }}>
                {e.role}
                {e.location && (
                  <span className="inline-flex items-center gap-1 font-medium" style={{ color: "rgba(28,28,30,0.42)" }}>
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                    {e.location}
                  </span>
                )}
              </p>
              <ul className="mt-3 space-y-1.5">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "rgba(28,28,30,0.74)" }}>
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: AMBER }} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default SalesTimeline;
