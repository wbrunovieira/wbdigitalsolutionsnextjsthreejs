"use client";

/**
 * Contact / closing CTA section for the DEV CV page (independent dark copy of
 * the sales pattern, see devTheme.ts). Reuses the localized `contact` copy +
 * cvLinks from cv.ts; ends with the same warm sign-off as the sales page
 * (same person, same signature) and the © footer line.
 */

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircle, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks, type CVLang } from "@/content/cv";
import { AMBER, BG_DEV_ALT, DEV_CONTACT_ID, DEV_CV_HINT, DEV_CV_PDF, DEV_LINKEDIN_BY_LANG, DEV_SECONDARY_CTA, TEXT, light, toCVLang } from "./devTheme";
import { useDevReveal } from "./useDevReveal";
import { DevSection } from "./DevSection";
import DevMagnetic from "./DevMagnetic";
import DevCodeDeco from "./DevCodeDeco";
import DevBinary from "./DevBinary";

/** Side binary halo decoding "HELLO" (repeated). */
const BINARY_HELLO = [
  "01001000 01000101",
  "01001100 01001100",
  "01001111 01001000",
  "01000101 01001100",
  "01001100 01001111",
];

/** Dev-specific CTA title ("fechar" is sales language; here we only build). */
const CTA_TITLE: Record<CVLang, string> = {
  "pt-BR": "Vamos construir algo juntos.",
  en: "Let's build something together.",
  it: "Costruiamo qualcosa insieme.",
  es: "Construyamos algo juntos.",
};

/** Warm sign-off shown above the footer line (same signature as the sales page). */
const CLOSING: Record<CVLang, string> = {
  "pt-BR": "Acima de tudo, o que sempre dá certo: trabalho duro, feito com muito amor.",
  en: "Above all, what always works: hard work, done with a lot of love.",
  it: "Sopra ogni cosa, ciò che funziona sempre: duro lavoro, fatto con tanto amore.",
  es: "Por encima de todo, lo que siempre funciona: trabajo duro, hecho con mucho amor.",
};

const DevContact: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const reveal = useDevReveal();

  return (
    <DevSection id={DEV_CONTACT_ID} bg={BG_DEV_ALT} padding="roomy">
      <DevCodeDeco code="await bruno.reply()  // fast" />
      <DevBinary rows={BINARY_HELLO} className="left-10 top-1/2 hidden -translate-y-1/2 lg:block" mask="fade-b" />
      <motion.div
        {...reveal()}
        className="relative overflow-hidden rounded-[2rem] border px-6 py-12 text-center sm:px-12 sm:py-14"
        style={{ borderColor: "rgba(224,145,47,0.35)", background: "rgba(224,145,47,0.06)" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40"
          style={{ background: "radial-gradient(50% 100% at 50% 0%, rgba(224,145,47,0.14) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
            {t.nav.contact}
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-4xl" style={{ color: TEXT }}>
            {CTA_TITLE[cv]}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed" style={{ color: light(0.62) }}>
            {t.contact.ctaSub}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <DevMagnetic>
              <a
                href={DEV_CV_PDF[cv]}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby="cv-tip-contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 focus-visible:ring-offset-2"
                style={{ background: AMBER, color: "#0e0e11", boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {t.contact.downloadCv}
                {/* Hover/focus tooltip: the PDF matches the page language */}
                <span
                  id="cv-tip-contact"
                  role="tooltip"
                  className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border px-3 py-1.5 font-mono text-[11px] font-medium opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{ background: "#131318", borderColor: light(0.18), color: TEXT }}
                >
                  {DEV_CV_HINT[cv]}
                  <span aria-hidden="true" className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45" style={{ background: "#131318" }} />
                </span>
              </a>
            </DevMagnetic>
            <a href={`mailto:${cvLinks.email}`} className={DEV_SECONDARY_CTA} style={{ borderColor: light(0.2), color: TEXT }}>
              <Mail aria-hidden="true" className="h-4 w-4" />
              {t.contact.emailLabel}
            </a>
            <a href={cvLinks.github} target="_blank" rel="noopener noreferrer" className={DEV_SECONDARY_CTA} style={{ borderColor: light(0.2), color: TEXT }}>
              <Github aria-hidden="true" className="h-4 w-4" />
              GitHub
            </a>
            <a href={DEV_LINKEDIN_BY_LANG[cv]} target="_blank" rel="noopener noreferrer" className={DEV_SECONDARY_CTA} style={{ borderColor: light(0.2), color: TEXT }}>
              <Linkedin aria-hidden="true" className="h-4 w-4" />
              {t.contact.linkedinLabel}
            </a>
            <a href={cvLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={DEV_SECONDARY_CTA} style={{ borderColor: light(0.2), color: TEXT }}>
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

      {/* Warm sign-off */}
      <motion.p {...reveal(0.1)} className="mx-auto mt-14 max-w-md text-center text-base font-medium leading-relaxed" style={{ color: light(0.6) }}>
        {CLOSING[cv]} <span aria-hidden="true" style={{ color: AMBER }}>♥</span>
      </motion.p>

      <p className="mt-10 text-center text-xs" style={{ color: light(0.6) }}>
        © {t.name} ·{" "}
        <a href={cvLinks.site} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#f4f4f5]">
          wbdigitalsolutions.com
        </a>
      </p>
    </DevSection>
  );
};

export default DevContact;
