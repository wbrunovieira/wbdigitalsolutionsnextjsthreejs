"use client";

/**
 * Commercial skills section for the sales CV page, methodology/skill chips plus
 * a "brands served" band (styled names, not logos, to avoid CSP/trademark
 * issues). Light theme. Copy in salesSkills.ts (pt-BR WIP); eyebrow localized.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { salesSkills, salesClients } from "@/content/salesSkills";

const INK = "#1c1c1e";
const AMBER = "#e0912f";
const BG = "#f7f7f8";

const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

const CLIENTS_LABEL: Record<CVLang, string> = {
  "pt-BR": "Marcas que atendi",
  en: "Brands I've served",
  it: "Marchi che ho servito",
  es: "Marcas que atendí",
};

const SalesSkills: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const t = cvContent[toCVLang(language)];
  const clientsLabel = CLIENTS_LABEL[toCVLang(language)];

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
    <section id="competencias" className="relative scroll-mt-24" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <motion.header {...reveal()} className="mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
            {t.nav.skills}
          </span>
          <h2 className="mt-2 text-balance text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl" style={{ color: INK }}>
            Como eu vendo.
          </h2>
        </motion.header>

        <div className="grid gap-8 sm:grid-cols-3">
          {salesSkills.map((g, i) => (
            <motion.div key={g.label} {...reveal(i * 0.06)}>
              <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: AMBER }}>{g.label}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border px-3 py-1 text-sm font-medium"
                    style={{ borderColor: "rgba(28,28,30,0.14)", color: "rgba(28,28,30,0.8)", background: "rgba(255,255,255,0.6)" }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brands served */}
        <motion.div {...reveal(0.2)} className="mt-16 border-t pt-10" style={{ borderColor: "rgba(28,28,30,0.1)" }}>
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(28,28,30,0.45)" }}>
            {clientsLabel}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {salesClients.map((c) => (
              <span key={c} className="text-lg font-black tracking-tight sm:text-xl" style={{ color: "rgba(28,28,30,0.32)" }}>
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SalesSkills;
