"use client";

/**
 * "About me" section for the sales CV page, a human counterpoint that builds
 * rapport. Light theme (graphite + amber). Copy in salesAbout.ts (pt-BR WIP);
 * the eyebrow label reuses the localized nav string.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Clapperboard, Mountain, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { salesAbout, type AboutInterest } from "@/content/salesAbout";

const INK = "#1c1c1e";
const AMBER = "#e0912f";
const BG = "#f7f7f8";

const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

const ICONS: Record<AboutInterest["icon"], LucideIcon> = {
  book: BookOpen,
  film: Clapperboard,
  mountain: Mountain,
};

const SalesAbout: React.FC = () => {
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

  return (
    <section id="sobre" className="relative scroll-mt-24" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <motion.header {...reveal()} className="mb-10">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
            {t.nav.about}
          </span>
          <h2 className="mt-2 text-balance text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl" style={{ color: INK }}>
            Um pouco além do trabalho.
          </h2>
        </motion.header>

        {/* Lead, family & nomadic life */}
        <motion.div {...reveal(0.05)} className="max-w-2xl space-y-4">
          {salesAbout.lead.map((p, i) => (
            <p key={i} className="text-base leading-relaxed sm:text-lg" style={{ color: "rgba(28,28,30,0.72)" }}>
              {p}
            </p>
          ))}
        </motion.div>

        {/* Interests */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {salesAbout.interests.map((it, i) => {
            const Icon = ICONS[it.icon];
            return (
              <motion.div
                key={it.title}
                {...reveal(0.1 + i * 0.06)}
                className="flex flex-col rounded-2xl border p-6"
                style={{ borderColor: "rgba(28,28,30,0.1)", background: "rgba(255,255,255,0.6)" }}
              >
                <span
                  className="mb-4 grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: "rgba(224,145,47,0.12)", color: AMBER }}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-base font-black tracking-[-0.01em]" style={{ color: INK }}>{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(28,28,30,0.66)" }}>{it.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SalesAbout;
