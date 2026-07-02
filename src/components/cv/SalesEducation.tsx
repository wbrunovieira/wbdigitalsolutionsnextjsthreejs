"use client";

/**
 * Education section for the sales CV page. Light theme (graphite + amber),
 * cards. Content from salesEducation.ts (pt-BR WIP).
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { salesEducation } from "@/content/salesEducation";

const INK = "#1c1c1e";
const AMBER = "#e0912f";
const BG = "#f7f7f8";

const SalesEducation: React.FC = () => {
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
    <section id="formacao" className="relative scroll-mt-24" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <motion.header {...reveal()} className="mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
            Formação
          </span>
          <h2 className="mt-2 text-balance text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl" style={{ color: INK }}>
            Base comercial e acadêmica.
          </h2>
        </motion.header>

        <div className="grid gap-5 sm:grid-cols-3">
          {salesEducation.map((e, i) => (
            <motion.div
              key={e.institution}
              {...reveal(i * 0.06)}
              className="flex flex-col rounded-2xl border p-6 transition-colors"
              style={{ borderColor: "rgba(28,28,30,0.1)", background: "rgba(255,255,255,0.6)" }}
            >
              <span
                className="mb-4 grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: "rgba(224,145,47,0.12)", color: AMBER }}
              >
                <GraduationCap aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: AMBER }}>
                {e.level}
              </span>
              <h3 className="mt-1 text-base font-black leading-snug tracking-[-0.01em]" style={{ color: INK }}>
                {e.institution}
              </h3>
              <p className="mt-1 text-sm font-semibold" style={{ color: "rgba(28,28,30,0.62)" }}>{e.course}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium" style={{ color: "rgba(28,28,30,0.45)" }}>
                {e.period && <span>{e.period}</span>}
                {e.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin aria-hidden="true" className="h-3 w-3" />
                    {e.location}
                  </span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesEducation;
