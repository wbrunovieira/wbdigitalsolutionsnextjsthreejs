"use client";

/**
 * Bottom bar of the DEV hero (extracted from DevHero): the greeting written
 * as a // code comment + welcome whisper, the engineering tagline (sub + big
 * statement), the mono stack chips and the CTAs (Download CV with magnetic
 * hover, GitHub, LinkedIn). Self-contained: reads the locale itself.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks, type CVLang } from "@/content/cv";
import { AMBER, DEV_CV_PDF, DEV_SECONDARY_CTA, TEXT, light, toCVLang } from "./devTheme";
import DevMagnetic from "./DevMagnetic";

/** Soft welcome line under the greeting (dev twin of the sales heroWelcome). */
const WELCOME: Record<CVLang, string> = {
  "pt-BR": "Esta página foi feita com carinho para você conhecer melhor o seu futuro engenheiro. Obrigado pela visita.",
  en: "This page was made with care so you can get to know your future engineer. Thanks for visiting.",
  it: "Questa pagina è stata fatta con cura perché tu possa conoscere meglio il tuo futuro ingegnere. Grazie della visita.",
  es: "Esta página fue hecha con cariño para que conozcas mejor a tu futuro ingeniero. Gracias por la visita.",
};

const DevHeroIntro: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const hero = t.hero.engineering;

  const fade = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: 0.25 } }
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.div
      {...fade}
      className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-10 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-lg">
        {/* Greeting written as a code comment */}
        <p className="font-mono text-sm sm:text-[15px]" style={{ color: light(0.55) }}>
          <span style={{ color: light(0.35) }}>{"// "}</span>
          {t.heroGreeting} <span className="font-bold" style={{ color: TEXT }}>{t.name}</span> 👋
        </p>
        <p className="mt-1.5 max-w-md text-[13px] leading-relaxed" style={{ color: light(0.45) }}>
          {WELCOME[cv]}
        </p>
        <span className="my-5 block h-px w-10" style={{ background: `linear-gradient(90deg, ${AMBER}, transparent)` }} aria-hidden="true" />
        <h1>
          <span className="block text-base font-medium leading-snug sm:text-lg" style={{ color: light(0.5) }}>
            {hero.sub}
          </span>
          <span className="mt-1 block text-2xl font-black leading-[1.14] tracking-[-0.015em] sm:text-[2.15rem]" style={{ color: TEXT }}>
            {hero.title}
          </span>
        </h1>
        {/* Core stack, in mono (the dev twin of the sales pillars) */}
        <div className="mt-4 flex flex-wrap gap-2">
          {hero.pills.map((p) => (
            <span
              key={p}
              className="rounded-md border px-2.5 py-1 font-mono text-xs font-medium"
              style={{ borderColor: light(0.15), color: light(0.72), background: "rgba(244,244,245,0.04)" }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        <DevMagnetic className="col-span-2 flex sm:col-span-1">
          <a
            href={DEV_CV_PDF}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 focus-visible:ring-offset-2 sm:w-auto"
            style={{ background: AMBER, color: "#0e0e11", boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {t.contact.downloadCv}
          </a>
        </DevMagnetic>
        <a
          href={cvLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className={DEV_SECONDARY_CTA}
          style={{ borderColor: light(0.2), color: TEXT }}
        >
          <Github aria-hidden="true" className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={cvLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={DEV_SECONDARY_CTA}
          style={{ borderColor: light(0.2), color: TEXT }}
        >
          <Linkedin aria-hidden="true" className="h-4 w-4" />
          {t.contact.linkedinLabel}
        </a>
      </div>
    </motion.div>
  );
};

export default DevHeroIntro;
