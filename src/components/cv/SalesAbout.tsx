"use client";

/**
 * "About me" section for the sales CV page: the human, rapport-building
 * counterpoint. Copy comes localized from salesAbout.ts.
 */

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clapperboard, Mountain, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { salesAbout, type AboutInterest } from "@/content/salesAbout";
import { AMBER, BG_A, INK, ink, toCVLang } from "./salesTheme";
import { useReveal } from "./useReveal";
import { SalesSection, SectionHeader } from "./SalesSection";

const TITLE: Record<CVLang, string> = {
  "pt-BR": "Um pouco além do trabalho.",
  en: "A little beyond work.",
  it: "Un po' oltre il lavoro.",
  es: "Un poco más allá del trabajo.",
};

const ICONS: Record<AboutInterest["icon"], LucideIcon> = {
  book: BookOpen,
  film: Clapperboard,
  mountain: Mountain,
};

const SalesAbout: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const about = salesAbout[cv];
  const reveal = useReveal();

  return (
    <SalesSection id="sobre" bg={BG_A}>
      <SectionHeader eyebrow={t.nav.about} title={TITLE[cv]} className="mb-10" />

      {/* Lead: family & nomadic life */}
      <motion.div {...reveal(0.05)} className="max-w-2xl space-y-4">
        {about.lead.map((p, i) => (
          <p key={i} className="text-base leading-relaxed sm:text-lg" style={{ color: ink(0.72) }}>
            {p}
          </p>
        ))}
      </motion.div>

      {/* Interests */}
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {about.interests.map((it, i) => {
          const Icon = ICONS[it.icon];
          return (
            <motion.div
              key={it.title}
              {...reveal(0.1 + i * 0.06)}
              className="flex flex-col rounded-2xl border p-6"
              style={{ borderColor: ink(0.1), background: "rgba(255,255,255,0.6)" }}
            >
              <span
                className="mb-4 grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: "rgba(224,145,47,0.12)", color: AMBER }}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="text-base font-black tracking-[-0.01em]" style={{ color: INK }}>{it.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: ink(0.66) }}>{it.text}</p>
            </motion.div>
          );
        })}
      </div>
    </SalesSection>
  );
};

export default SalesAbout;
