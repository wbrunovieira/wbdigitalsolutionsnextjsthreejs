"use client";

/**
 * Bottom bar of the sales hero (extracted from SalesHero): personal greeting +
 * welcome whisper, the weighted tagline (lead + pre-split payoff lines), the
 * three value pillars and the CTAs (Download CV with magnetic hover, LinkedIn,
 * WhatsApp). Self-contained: reads the locale itself.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Linkedin, MessageCircle, Package, Target, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks } from "@/content/cv";
import { AMBER, CV_PDF, INK, SECONDARY_CTA, ink, toCVLang } from "./salesTheme";
import Magnetic from "./Magnetic";

const SalesHeroIntro: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const t = cvContent[toCVLang(language)];
  // Lead-in (setup, before the colon); the payoff lines come pre-split from content.
  const taglineLead = t.hero.sales.title.split(":")[0].trim();

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
        <p className="text-sm font-medium sm:text-base" style={{ color: ink(0.55) }}>
          {t.heroGreeting} <span className="font-bold" style={{ color: INK }}>{t.name}</span> 👋
        </p>
        {/* Soft welcome: what this page is + thanks (whisper, below the greeting) */}
        <p className="mt-1.5 max-w-md text-[13px] leading-relaxed" style={{ color: ink(0.45) }}>
          {t.heroWelcome}
        </p>
        <span className="my-5 block h-px w-10" style={{ background: `linear-gradient(90deg, ${AMBER}, transparent)` }} aria-hidden="true" />
        <h1>
          <span className="block text-base font-medium leading-snug sm:text-lg" style={{ color: ink(0.5) }}>
            {taglineLead}:
          </span>
          <span className="mt-1 block text-2xl font-black leading-[1.14] tracking-[-0.015em] sm:text-[2.15rem]" style={{ color: INK }}>
            {t.taglinePayoff.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </span>
        </h1>
        {/* Three value pillars, tied to the tagline (product · need · person) */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {[Package, Target, Handshake].map((Icon, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: ink(0.66) }}>
              <Icon aria-hidden="true" className="h-4 w-4" style={{ color: AMBER }} />
              {t.heroPillars[i]}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        <Magnetic className="col-span-2 flex sm:col-span-1">
          <a
            href={CV_PDF}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 focus-visible:ring-offset-2 sm:w-auto"
            style={{ background: AMBER, color: INK, boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {t.contact.downloadCv}
          </a>
        </Magnetic>
        <a
          href={cvLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={SECONDARY_CTA}
          style={{ borderColor: ink(0.2), color: INK }}
        >
          <Linkedin aria-hidden="true" className="h-4 w-4" />
          {t.contact.linkedinLabel}
        </a>
        <a
          href={cvLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={SECONDARY_CTA}
          style={{ borderColor: ink(0.2), color: INK }}
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default SalesHeroIntro;
