"use client";

/**
 * Contact / closing CTA section for the sales CV page. Reuses the localized
 * `contact` copy + cvLinks from cv.ts.
 */

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, MessageCircle, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks, type CVLang } from "@/content/cv";
import { AMBER, BG_B, CV_PDF, INK, SECONDARY_CTA, ink, toCVLang } from "./salesTheme";
import { useReveal } from "./useReveal";
import { SalesSection } from "./SalesSection";
import Magnetic from "./Magnetic";

/** Warm sign-off shown above the footer line. */
const CLOSING: Record<CVLang, string> = {
  "pt-BR": "Acima de tudo, o que sempre dá certo: trabalho duro, feito com muito amor.",
  en: "Above all, what always works: hard work, done with a lot of love.",
  it: "Sopra ogni cosa, ciò che funziona sempre: duro lavoro, fatto con tanto amore.",
  es: "Por encima de todo, lo que siempre funciona: trabajo duro, hecho con mucho amor.",
};

const SalesContact: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const reveal = useReveal();

  return (
    <SalesSection id="contato" bg={BG_B} padding="roomy">
      <motion.div
        {...reveal()}
        className="relative overflow-hidden rounded-[2rem] border px-6 py-12 text-center sm:px-12 sm:py-14"
        style={{ borderColor: "rgba(224,145,47,0.35)", background: "rgba(224,145,47,0.06)" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40"
          style={{ background: "radial-gradient(50% 100% at 50% 0%, rgba(224,145,47,0.16) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
            {t.nav.contact}
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-4xl" style={{ color: INK }}>
            {t.contact.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed" style={{ color: ink(0.62) }}>
            {t.contact.ctaSub}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a
                href={CV_PDF}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 focus-visible:ring-offset-2"
                style={{ background: AMBER, color: INK, boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {t.contact.downloadCv}
              </a>
            </Magnetic>
            <a href={`mailto:${cvLinks.email}`} className={SECONDARY_CTA} style={{ borderColor: ink(0.2), color: INK }}>
              <Mail aria-hidden="true" className="h-4 w-4" />
              {t.contact.emailLabel}
            </a>
            <a href={cvLinks.linkedin} target="_blank" rel="noopener noreferrer" className={SECONDARY_CTA} style={{ borderColor: ink(0.2), color: INK }}>
              <Linkedin aria-hidden="true" className="h-4 w-4" />
              {t.contact.linkedinLabel}
            </a>
            <a href={cvLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={SECONDARY_CTA} style={{ borderColor: ink(0.2), color: INK }}>
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

      {/* Warm sign-off */}
      <motion.p {...reveal(0.1)} className="mx-auto mt-14 max-w-md text-center text-base font-medium leading-relaxed" style={{ color: ink(0.6) }}>
        {CLOSING[cv]} <span aria-hidden="true" style={{ color: AMBER }}>♥</span>
      </motion.p>

      <p className="mt-10 text-center text-xs" style={{ color: ink(0.62) }}>
        © {t.name} ·{" "}
        <a href={cvLinks.site} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#1c1c1e]">
          wbdigitalsolutions.com
        </a>
      </p>
    </SalesSection>
  );
};

export default SalesContact;
