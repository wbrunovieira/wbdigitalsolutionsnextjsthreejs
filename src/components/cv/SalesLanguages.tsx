"use client";

/**
 * Languages section for the sales CV page. Reuses the localized `languages`
 * data from cv.ts (already in 4 locales), rendered with proficiency bars,
 * plus a "currently learning German" note.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { LANG_FLAG } from "./cvIcons";
import { AMBER, BG_A, INK, ink, toCVLang } from "./salesTheme";
import { useReveal } from "./useReveal";
import { SalesSection, SectionHeader } from "./SalesSection";

const TITLE: Record<CVLang, string> = {
  "pt-BR": "Quatro idiomas a favor do seu negócio.",
  en: "Four languages working for your business.",
  it: "Quattro lingue al servizio del tuo business.",
  es: "Cuatro idiomas a favor de tu negocio.",
};

/** "Currently learning" note (German, beginner). */
const LEARNING: Record<CVLang, { label: string; german: string; level: string }> = {
  "pt-BR": { label: "Aprendendo agora", german: "Alemão", level: "iniciante" },
  en: { label: "Currently learning", german: "German", level: "beginner" },
  it: { label: "Sto imparando", german: "Tedesco", level: "base" },
  es: { label: "Aprendiendo ahora", german: "Alemán", level: "principiante" },
};

const SalesLanguages: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const learning = LEARNING[cv];
  const reveal = useReveal();

  return (
    <SalesSection id="idiomas" bg={BG_A} width="3xl">
      <SectionHeader eyebrow={t.nav.languages} title={TITLE[cv]} />

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
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: ink(0.1) }}>
              <motion.div
                initial={reduce ? { width: `${l.proficiency}%` } : { width: 0 }}
                whileInView={{ width: `${l.proficiency}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${AMBER}, #b26f1f)` }}
              />
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.p {...reveal(0.3)} className="mt-8 text-sm" style={{ color: ink(0.55) }}>
        <span className="font-semibold" style={{ color: INK }}>{learning.label}:</span>{" "}
        <span aria-hidden="true" className="text-base">🇩🇪</span> {learning.german}{" "}
        <span style={{ color: ink(0.4) }}>({learning.level})</span>
      </motion.p>
    </SalesSection>
  );
};

export default SalesLanguages;
