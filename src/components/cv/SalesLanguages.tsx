"use client";

/**
 * Languages section for the sales CV page. Reuses the localized `languages`
 * data from cv.ts (already in 4 locales), rendered with proficiency bars.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { LANG_FLAG } from "./cvIcons";

const INK = "#1c1c1e";
const AMBER = "#e0912f";
const BG = "#f1f1f3";

const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

/** "Currently learning" note (German, beginner). */
const LEARNING: Record<CVLang, { label: string; german: string; level: string }> = {
  "pt-BR": { label: "Aprendendo agora", german: "Alemão", level: "iniciante" },
  en: { label: "Currently learning", german: "German", level: "beginner" },
  it: { label: "Sto imparando", german: "Tedesco", level: "base" },
  es: { label: "Aprendiendo ahora", german: "Alemán", level: "principiante" },
};

const TITLE: Record<CVLang, string> = {
  "pt-BR": "Quatro idiomas a favor do seu negócio.",
  en: "Four languages working for your business.",
  it: "Quattro lingue al servizio del tuo business.",
  es: "Cuatro idiomas a favor de tu negocio.",
};

const SalesLanguages: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const t = cvContent[toCVLang(language)];
  const learning = LEARNING[toCVLang(language)];

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
    <section id="idiomas" className="relative scroll-mt-24" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <motion.header {...reveal()} className="mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
            {t.nav.languages}
          </span>
          <h2 className="mt-2 text-balance text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl" style={{ color: INK }}>
            {TITLE[toCVLang(language)]}
          </h2>
        </motion.header>

        <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {t.languages.map((l, i) => (
            <motion.li key={l.code} {...reveal(i * 0.05)}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-base font-bold" style={{ color: INK }}>
                  <span aria-hidden="true" className="text-lg">{LANG_FLAG[l.code]}</span>
                  {l.name}
                </span>
                <span className="text-xs font-semibold" style={{ color: AMBER }}>{l.level}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(28,28,30,0.1)" }}>
                <motion.div
                  initial={reduce ? { width: `${l.proficiency}%` } : { width: 0 }}
                  whileInView={{ width: `${l.proficiency}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #e0912f, #b26f1f)" }}
                />
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.p {...reveal(0.3)} className="mt-8 text-sm" style={{ color: "rgba(28,28,30,0.55)" }}>
          <span className="font-semibold" style={{ color: INK }}>{learning.label}:</span>{" "}
          <span aria-hidden="true" className="text-base">🇩🇪</span> {learning.german}{" "}
          <span style={{ color: "rgba(28,28,30,0.4)" }}>({learning.level})</span>
        </motion.p>
      </div>
    </section>
  );
};

export default SalesLanguages;
