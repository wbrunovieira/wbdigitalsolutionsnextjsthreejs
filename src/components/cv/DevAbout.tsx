"use client";

/**
 * "About me" section for the DEV CV page (independent dark copy of the sales
 * pattern, see devTheme.ts). The human side is deliberately the SAME content
 * as the sales page (family, nomadic life, reading, culture, sport), reused
 * from salesAbout.ts (shared localized content), plus two dev-flavored cards:
 * the traveling remote setup (hardware verified on the actual machine) and
 * the daily study discipline.
 */

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clapperboard, Mountain, Monitor, Flame, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, type CVLang } from "@/content/cv";
import { salesAbout, type AboutInterest } from "@/content/salesAbout";
import { AMBER, BG_DEV_ALT, TEXT, light, toCVLang } from "./devTheme";
import { useDevReveal } from "./useDevReveal";
import { DevSection, DevSectionHeader } from "./DevSection";
import DevCodeDeco from "./DevCodeDeco";

const TITLE: Record<CVLang, string> = {
  "pt-BR": "Por trás do terminal.",
  en: "Behind the terminal.",
  it: "Dietro il terminale.",
  es: "Detrás de la terminal.",
};

/** Corner easter egg, localized (the poetic spread deserves the visitor's language). */
const DECO: Record<CVLang, string> = {
  "pt-BR": 'weekend.push("jiu-jitsu", "parapente", ...tudoQueMeFazBem)',
  en: 'weekend.push("jiu-jitsu", "paragliding", ...everythingThatDoesMeGood)',
  it: 'weekend.push("jiu-jitsu", "parapendio", ...tuttoQuelloCheMiFaBene)',
  es: 'weekend.push("jiu-jitsu", "parapente", ...todoLoQueMeHaceBien)',
};

const ICONS: Record<AboutInterest["icon"], LucideIcon> = {
  book: BookOpen,
  film: Clapperboard,
  mountain: Mountain,
};

/** Shared card treatment for interests and dev extras (icon + title + text). */
const AboutCard: React.FC<{ icon: LucideIcon; title: string; text: string }> = ({ icon: Icon, title, text }) => (
  <div
    className="flex flex-col rounded-2xl border border-[rgba(244,244,245,0.1)] p-6 transition-all duration-300 hover:border-[rgba(224,145,47,0.4)] motion-safe:hover:-translate-y-0.5"
    style={{ background: "rgba(244,244,245,0.04)" }}
  >
    <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(224,145,47,0.12)", color: AMBER }}>
      <Icon aria-hidden="true" className="h-5 w-5" />
    </span>
    <h3 className="text-base font-black tracking-[-0.01em]" style={{ color: TEXT }}>{title}</h3>
    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: light(0.66) }}>{text}</p>
  </div>
);

/** Dev-flavored extras: the traveling office + the daily study habit. */
const DEV_EXTRAS: Record<CVLang, { icon: LucideIcon; title: string; text: string }[]> = {
  "pt-BR": [
    {
      icon: Monitor,
      title: "Setup remoto",
      text: "MacBook Pro M3 Max com 48 GB de RAM, dois monitores (um ultrawide), teclado mecânico, mouse anatômico, headset e cadeira gamer pelo conforto. De reserva: um Mac mini com Ubuntu e um laptop Windows. A bancada desmonta e vira uma mala fina: o escritório viaja comigo.",
    },
    {
      icon: Flame,
      title: "Disciplina de estudo",
      text: "Estudo todos os dias: o importante é consistência. Foi assim na virada de carreira e continua assim, do alemão ao que a IA lança de novo.",
    },
  ],
  en: [
    {
      icon: Monitor,
      title: "Remote setup",
      text: "MacBook Pro M3 Max with 48 GB of RAM, two monitors (one ultrawide), mechanical keyboard, ergonomic mouse, headset and a gamer chair for comfort. On standby: a Mac mini running Ubuntu and a Windows laptop. The desk folds into a slim case: the office travels with me.",
    },
    {
      icon: Flame,
      title: "Study discipline",
      text: "I study every single day: consistency is what matters. That's how the career change happened and how it continues, from German to whatever AI ships next.",
    },
  ],
  it: [
    {
      icon: Monitor,
      title: "Setup remoto",
      text: "MacBook Pro M3 Max con 48 GB di RAM, due monitor (uno ultrawide), tastiera meccanica, mouse ergonomico, cuffie e una sedia gamer per il comfort. Di riserva: un Mac mini con Ubuntu e un laptop Windows. La scrivania si smonta e diventa una valigia sottile: l'ufficio viaggia con me.",
    },
    {
      icon: Flame,
      title: "Disciplina di studio",
      text: "Studio ogni giorno: quello che conta è la costanza. Così è nata la seconda carriera e così continua, dal tedesco alle novità dell'IA.",
    },
  ],
  es: [
    {
      icon: Monitor,
      title: "Setup remoto",
      text: "MacBook Pro M3 Max con 48 GB de RAM, dos monitores (uno ultrawide), teclado mecánico, mouse ergonómico, headset y una silla gamer por comodidad. De reserva: un Mac mini con Ubuntu y un laptop Windows. El escritorio se desmonta y se convierte en una maleta delgada: la oficina viaja conmigo.",
    },
    {
      icon: Flame,
      title: "Disciplina de estudio",
      text: "Estudio todos los días: lo importante es la constancia. Así fue el cambio de carrera y así sigue, del alemán a lo nuevo de IA.",
    },
  ],
};

const DevAbout: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const about = salesAbout[cv];
  const extras = DEV_EXTRAS[cv];
  const reveal = useDevReveal();

  return (
    <DevSection id="sobre" bg={BG_DEV_ALT}>
      <DevCodeDeco code={DECO[cv]} />
      <DevSectionHeader eyebrow={t.nav.about} title={TITLE[cv]} className="mb-10" />

      {/* Lead: family & nomadic life (same human story as the sales page) */}
      <motion.div {...reveal(0.05)} className="max-w-2xl space-y-4">
        {about.lead.map((p, i) => (
          <p key={i} className="text-base leading-relaxed sm:text-lg" style={{ color: light(0.72) }}>
            {p}
          </p>
        ))}
      </motion.div>

      {/* Interests + dev extras */}
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {about.interests.map((it, i) => (
          <motion.div key={it.title} {...reveal(0.1 + i * 0.06)}>
            <AboutCard icon={ICONS[it.icon]} title={it.title} text={it.text} />
          </motion.div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {extras.map((it, i) => (
          <motion.div key={it.title} {...reveal(0.25 + i * 0.06)}>
            <AboutCard icon={it.icon} title={it.title} text={it.text} />
          </motion.div>
        ))}
      </div>
    </DevSection>
  );
};

export default DevAbout;
