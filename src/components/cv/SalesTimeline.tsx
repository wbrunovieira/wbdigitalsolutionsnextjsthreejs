"use client";

/**
 * Career timeline section for the sales CV page: a vertical spine with nodes.
 * Entries come localized from salesTimeline.ts; header copy lives here.
 */

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { salesTimeline } from "@/content/salesTimeline";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { AMBER, BG_B, INK, ink, toCVLang } from "./salesTheme";
import { useReveal } from "./useReveal";
import { SalesSection, SectionHeader } from "./SalesSection";

const COPY: Record<CVLang, { title: string; intro: string }> = {
  "pt-BR": {
    title: "Do balcão, aos 13, à mesa de negociação.",
    intro: "Comecei a vender cedo, e cada passo somou repertório comercial.",
  },
  en: {
    title: "From the shop counter at 13 to the negotiation table.",
    intro: "I started selling young, and every step added to my commercial range.",
  },
  it: {
    title: "Dal bancone, a 13 anni, al tavolo delle trattative.",
    intro: "Ho iniziato a vendere presto, e ogni passo ha aggiunto repertorio commerciale.",
  },
  es: {
    title: "Del mostrador, a los 13, a la mesa de negociación.",
    intro: "Empecé a vender temprano, y cada paso sumó repertorio comercial.",
  },
};

const SalesTimeline: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const copy = COPY[cv];
  const reveal = useReveal();

  return (
    <SalesSection id="trajetoria" bg={BG_B} width="3xl">
      <SectionHeader eyebrow={t.nav.timeline} title={copy.title} intro={copy.intro} className="mb-14" />

      {/* Timeline */}
      <ol className="relative">
        {/* Spine */}
        <div
          className="absolute bottom-2 left-[7px] top-2 w-px"
          style={{ background: `linear-gradient(180deg, ${AMBER} 0%, ${ink(0.18)} 70%, transparent 100%)` }}
          aria-hidden="true"
        />
        {salesTimeline[cv].map((e, i) => (
          <motion.li key={e.company + e.year} {...reveal(i * 0.05)} className="relative mb-11 pl-8 last:mb-0">
            {/* Node */}
            <span
              className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2"
              style={{ borderColor: AMBER, background: BG_B }}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span className="font-mono text-sm font-bold" style={{ color: AMBER }}>{e.year}</span>
              <span className="text-xs font-medium" style={{ color: ink(0.45) }}>{e.age}</span>
            </div>
            <h3 className="mt-1 text-lg font-black tracking-[-0.01em]" style={{ color: INK }}>{e.company}</h3>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm font-semibold" style={{ color: ink(0.6) }}>
              {e.role}
              {e.location && (
                <span className="inline-flex items-center gap-1 font-medium" style={{ color: ink(0.42) }}>
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {e.location}
                </span>
              )}
            </p>
            <ul className="mt-3 space-y-1.5">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: ink(0.74) }}>
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: AMBER }} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </SalesSection>
  );
};

export default SalesTimeline;
