"use client";

/**
 * Education section for the sales CV page: cards. Entries come localized from
 * salesEducation.ts.
 */

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { salesEducation } from "@/content/salesEducation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { AMBER, BG_B, INK, ink, toCVLang } from "./salesTheme";
import { useReveal } from "./useReveal";
import { SalesSection, SectionHeader } from "./SalesSection";

const TITLE: Record<CVLang, string> = {
  "pt-BR": "Base comercial e acadêmica.",
  en: "Commercial and academic foundation.",
  it: "Basi commerciali e accademiche.",
  es: "Base comercial y académica.",
};

const SalesEducation: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const reveal = useReveal();

  return (
    <SalesSection id="formacao" bg={BG_B}>
      <SectionHeader eyebrow={t.nav.education} title={TITLE[cv]} />

      <div className="grid gap-5 sm:grid-cols-3">
        {salesEducation[cv].map((e, i) => (
          <motion.div
            key={e.institution}
            {...reveal(i * 0.06)}
            className="flex flex-col rounded-2xl border border-[rgba(28,28,30,0.1)] p-6 transition-all duration-300 hover:border-[rgba(224,145,47,0.35)] motion-safe:hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.6)" }}
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
            <p className="mt-1 text-sm font-semibold" style={{ color: ink(0.62) }}>{e.course}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium" style={{ color: ink(0.45) }}>
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
    </SalesSection>
  );
};

export default SalesEducation;
