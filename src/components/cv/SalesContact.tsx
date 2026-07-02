"use client";

/**
 * Contact / closing CTA section for the sales CV page. Light theme (graphite +
 * amber). Reuses the localized `contact` copy + cvLinks from cv.ts.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, MessageCircle, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks, type CVLang } from "@/content/cv";

const INK = "#1c1c1e";
const AMBER = "#e0912f";
const BG = "#f1f1f3";
const CV_PDF = "#"; // set to /bruno-vieira-sales.pdf once the PDF exists

const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

const SalesContact: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const t = cvContent[toCVLang(language)];

  const reveal = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const secondary =
    "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(28,28,30,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50";

  return (
    <section id="contato" className="relative scroll-mt-24" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <motion.div
          {...reveal()}
          className="relative overflow-hidden rounded-[2rem] border px-8 py-14 text-center sm:px-12"
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
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed" style={{ color: "rgba(28,28,30,0.62)" }}>
              {t.contact.ctaSub}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={CV_PDF}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 focus-visible:ring-offset-2"
                style={{ background: AMBER, color: INK, boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {t.contact.downloadCv}
              </a>
              <a href={`mailto:${cvLinks.email}`} className={secondary} style={{ borderColor: "rgba(28,28,30,0.2)", color: INK }}>
                <Mail aria-hidden="true" className="h-4 w-4" />
                {t.contact.emailLabel}
              </a>
              <a href={cvLinks.linkedin} target="_blank" rel="noopener noreferrer" className={secondary} style={{ borderColor: "rgba(28,28,30,0.2)", color: INK }}>
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                {t.contact.linkedinLabel}
              </a>
              <a href={cvLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={secondary} style={{ borderColor: "rgba(28,28,30,0.2)", color: INK }}>
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        <p className="mt-10 text-center text-xs" style={{ color: "rgba(28,28,30,0.45)" }}>
          © {t.name} ·{" "}
          <a href={cvLinks.site} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#1c1c1e]">
            wbdigitalsolutions.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default SalesContact;
