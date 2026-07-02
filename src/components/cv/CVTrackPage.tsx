"use client";

/**
 * Single-track CV page — one focused page per audience (engineering | sales),
 * each served on its own subdomain:
 *   engineering → brunodev.wbdigitalsolutions.com  (internal route /dev)
 *   sales       → brunov.wbdigitalsolutions.com    (internal route /vendas)
 *
 * No audience toggle: each page is ONE person for ONE recruiter. The other
 * career appears once as a differentiator band that links to the other page.
 * Content comes from the shared `cvContent` (already split by audience).
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
  Code2,
  LineChart,
  MapPin,
  Sparkles,
  GraduationCap,
  Check,
  Download,
  User,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cvContent, cvLinks, type CVLang, type Audience } from "@/content/cv";
import {
  STACK_ICON,
  PROJECT_ICON,
  STAT_ICON,
  LANG_FLAG,
  experienceIcon,
  Briefcase,
  Globe,
} from "./cvIcons";

const LANGS: { code: CVLang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt-BR", label: "PT" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
];

const toCVLang = (lang: string): CVLang =>
  lang === "pt-BR" || lang === "it" || lang === "es" ? lang : "en";

/** The other track's page (used for the differentiator band + header cross-link). */
const OTHER_URL: Record<Audience, string> = {
  engineering: "https://brunov.wbdigitalsolutions.com",
  sales: "https://brunodev.wbdigitalsolutions.com",
};

/** Downloadable résumé per track — set these once the PDFs exist in /public. */
const CV_PDF: Record<Audience, string> = {
  engineering: "#",
  sales: "#",
};

/**
 * Hero portrait. Drop a cut-out PNG (transparent bg) into /public and set the
 * path here; until then a tasteful placeholder renders (nothing breaks).
 */
const PHOTO_SRC = "";

interface CVTrackPageProps {
  track: Audience;
}

const CVTrackPage: React.FC<CVTrackPageProps> = ({ track }) => {
  const { language, setLanguage } = useLanguage();
  const reduce = useReducedMotion();
  const t = cvContent[toCVLang(language)];
  const hero = t.hero[track];
  const trackLabel = track === "engineering" ? t.toggle.engineering : t.toggle.sales;

  const reveal = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-modern-gradient text-white">
      {/* Depth layers (on-brand) */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div style={{ background: "radial-gradient(60% 60% at 75% 25%, rgba(121,41,144,0.45) 0%, transparent 70%)" }} className="absolute inset-0" />
        <div style={{ background: "radial-gradient(50% 50% at 15% 80%, rgba(255,185,71,0.08) 0%, transparent 60%)" }} className="absolute inset-0" />
        <div style={{ background: "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(26,8,38,0.6) 100%)" }} className="absolute inset-0" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(80% 60% at 50% 30%, black, transparent)",
            WebkitMaskImage: "radial-gradient(80% 60% at 50% 30%, black, transparent)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ===== Top bar ===== */}
        <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-sm font-black text-yellowcustom shadow-inner backdrop-blur-sm transition-colors group-hover:border-yellowcustom/50">
              BV
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-black tracking-tight">{t.name}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">CV · {trackLabel}</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* Cross-link to the other track's page */}
            <a
              href={OTHER_URL[track]}
              className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition-colors hover:border-yellowcustom/50 hover:text-yellowcustom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 sm:inline-flex"
            >
              {t.crossLinkLabel[track]}
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
              {LANGS.map((l) => {
                const active = toCVLang(language) === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    aria-pressed={active}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 ${
                      active ? "bg-yellowcustom text-primary" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ===== Hero ===== */}
        <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-10 pt-6 lg:min-h-[76vh] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            {/* Availability badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t.available}
            </div>

            {/* Name — the anchor */}
            <h1 className="font-black leading-[0.92] tracking-tight text-white" style={{ fontSize: "clamp(2.7rem, 7vw, 5rem)" }}>
              {t.name}
            </h1>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-white/55 sm:text-sm">{t.fullName}</p>

            {/* Role for this track */}
            <p className="mt-5 flex items-center gap-2 text-xl font-bold text-yellowcustom sm:text-2xl">
              {track === "engineering" ? (
                <Code2 aria-hidden="true" className="h-5 w-5 shrink-0" />
              ) : (
                <LineChart aria-hidden="true" className="h-5 w-5 shrink-0" />
              )}
              {hero.sub}
            </p>

            {/* Tagline */}
            <h2 className="mt-3 font-black leading-[0.98] tracking-tight text-white" style={{ fontSize: "clamp(1.7rem, 4.4vw, 3rem)" }}>
              {hero.title}
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">{hero.support}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {hero.pills.map((p) => (
                <span key={p} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                  {p}
                </span>
              ))}
            </div>

            {/* CTAs — per track */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={CV_PDF[track]}
                className="inline-flex items-center gap-2 rounded-full bg-yellowcustom px-6 py-3 text-sm font-bold text-primary shadow-lg shadow-yellowcustom/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffc24d] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {t.contact.downloadCv}
              </a>
              {track === "engineering" ? (
                <a href={cvLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                  <Github aria-hidden="true" className="h-4 w-4" />
                  {t.contact.githubLabel}
                </a>
              ) : (
                <a href={cvLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
              <a href={cvLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                {t.contact.linkedinLabel}
              </a>
            </div>

            <p className="mt-6 flex items-center gap-1.5 text-sm text-white/65">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {t.location}
            </p>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-custom-purple/25 blur-3xl" aria-hidden="true" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-custom-purple/10 shadow-2xl shadow-custom-purple/20">
              {PHOTO_SRC ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={PHOTO_SRC} alt={`${t.name} — ${hero.sub}`} className="h-full w-full object-cover object-top" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/5 text-white/30">
                    <User aria-hidden="true" className="h-10 w-10" />
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/35">foto em breve</span>
                </div>
              )}
              {/* Bottom gradient for text legibility if a photo is added */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/60 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ===== Stats strip ===== */}
        <section className="mx-auto max-w-6xl px-6 pb-6">
          <motion.div
            {...reveal()}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:grid-cols-4"
          >
            {t.stats[track].map((s) => {
              const Icon = STAT_ICON[s.id];
              return (
                <div key={s.id} className="group relative flex flex-col gap-2 bg-primary/20 p-6 backdrop-blur-sm transition-colors hover:bg-custom-purple/15">
                  <Icon aria-hidden="true" className="h-5 w-5 text-yellowcustom/80" />
                  <span className="text-3xl font-black tracking-tight text-white lg:text-4xl">{s.value}</span>
                  <span className="text-xs leading-snug text-white/70">{s.label}</span>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* ===== Summary ===== */}
        <Section index={1} title={t.sections.summary} icon={Sparkles}>
          <p className="max-w-3xl text-lg leading-relaxed text-white/80">{t.summary[track]}</p>
        </Section>

        {/* ===== Cross-track differentiator band ===== */}
        <section className="mx-auto max-w-6xl px-6 py-4">
          <motion.div
            {...reveal()}
            className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-yellowcustom/25 bg-yellowcustom/[0.06] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <p className="max-w-2xl text-base leading-relaxed text-white/85">
              <Sparkles aria-hidden="true" className="mr-2 inline h-4 w-4 text-yellowcustom" />
              {t.crossPitch[track]}
            </p>
            <a
              href={OTHER_URL[track]}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-yellowcustom/40 px-5 py-2.5 text-sm font-semibold text-yellowcustom transition-colors hover:bg-yellowcustom hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 sm:self-auto"
            >
              {t.crossLinkLabel[track]}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </motion.div>
        </section>

        {/* ===== Lead section: Stack (eng) | Commercial track record (sales) ===== */}
        {track === "engineering" ? (
          <Section index={2} title={t.sections.stack} icon={Code2}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.stack.map((g, i) => {
                const Icon = STACK_ICON[g.key];
                return (
                  <motion.div
                    key={g.key}
                    {...reveal(i * 0.06)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-custom-purple/50 hover:bg-white/[0.05]"
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-custom-purple/25 text-yellowcustom transition-colors group-hover:bg-yellowcustom group-hover:text-primary">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">{g.label}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <span key={item} className="rounded-md bg-custom-purple/25 px-2.5 py-1 text-xs text-white/85">{item}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        ) : (
          <Section index={2} title={t.sections.sales} icon={LineChart}>
            <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
              {t.salesHighlights.map((h, i) => (
                <motion.li
                  key={h}
                  {...reveal(i * 0.05)}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/85 transition-colors hover:border-custom-purple/40"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-yellowcustom/20 text-yellowcustom">
                    <Check aria-hidden="true" className="h-3 w-3" />
                  </span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </Section>
        )}

        {/* ===== Selected work ===== */}
        <Section index={3} title={t.sections.projects} icon={Briefcase}>
          <div className="grid gap-5 md:grid-cols-3">
            {t.projects.map((p, i) => {
              const Icon = PROJECT_ICON[p.id];
              return (
                <motion.article
                  key={p.id}
                  {...reveal(i * 0.08)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-custom-purple/50 hover:shadow-2xl hover:shadow-custom-purple/20"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-custom-purple/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <div className="mb-4 flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-custom-purple/25 text-yellowcustom transition-colors group-hover:bg-yellowcustom group-hover:text-primary">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{p.blurb}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-white/80">
                        <Check aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-yellowcustom" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((tt) => (
                      <span key={tt} className="rounded bg-custom-purple/20 px-2 py-0.5 text-[10px] text-white/70">{tt}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Section>

        {/* ===== Experience ===== */}
        <Section index={4} title={t.sections.experience} icon={Briefcase}>
          <div className="relative max-w-3xl pl-10">
            <div
              className="absolute bottom-2 left-[14px] top-2 w-px"
              style={{ background: "linear-gradient(180deg, #ffb947 0%, #792990 60%, transparent 100%)" }}
              aria-hidden="true"
            />
            {t.experience.map((exp, i) => {
              const Icon = experienceIcon(exp.company);
              const bullets = exp.bullets[track];
              return (
                <motion.div key={exp.company + exp.period} {...reveal(i * 0.06)} className="relative mb-10 last:mb-0">
                  <span className="absolute -left-10 top-0 grid h-7 w-7 place-items-center rounded-full border border-yellowcustom/40 bg-primary text-yellowcustom shadow-[0_0_0_4px_rgba(53,5,69,0.9)]">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-yellowcustom">
                    {exp.company} <span className="font-normal text-white/55">· {exp.location}</span>
                  </p>
                  {bullets && bullets.length > 0 ? (
                    <ul className="mt-3 space-y-1.5">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm leading-relaxed text-white/75">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-yellowcustom/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{exp.summary}</p>
                  )}
                  {exp.tags && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/60">{tag}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* ===== Education + Languages ===== */}
        <Section index={5} title={t.sections.education} icon={GraduationCap}>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <ul className="space-y-3">
                {t.education.map((e) => (
                  <li
                    key={e.school}
                    className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-custom-purple/40"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-custom-purple/25 text-yellowcustom">
                        <GraduationCap aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{e.school}</p>
                        <p className="text-sm text-white/60">{e.detail}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-white/55">{e.year}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                <Globe aria-hidden="true" className="h-5 w-5 text-yellowcustom" />
                {t.sections.languages}
              </h3>
              <ul className="space-y-4">
                {t.languages.map((l, i) => (
                  <motion.li key={l.code} {...reveal(i * 0.05)}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-semibold text-white">
                        <span aria-hidden="true" className="text-base">{LANG_FLAG[l.code]}</span>
                        {l.name}
                      </span>
                      <span className="text-xs text-yellowcustom">{l.level}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={reduce ? { width: `${l.proficiency}%` } : { width: 0 }}
                        whileInView={{ width: `${l.proficiency}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #792990, #ffb947)" }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ===== Contact CTA ===== */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            {...reveal()}
            className="relative overflow-hidden rounded-3xl border border-custom-purple/30 bg-custom-purple/10 px-8 py-14 text-center"
          >
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <div style={{ background: "radial-gradient(50% 80% at 50% 0%, rgba(255,185,71,0.12) 0%, transparent 70%)" }} className="absolute inset-0" />
            </div>
            <h2 className="text-3xl font-bold lg:text-4xl">{t.contact.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">{t.contact.ctaSub}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${cvLinks.email}`} className="inline-flex items-center gap-2 rounded-full bg-yellowcustom px-6 py-3 text-sm font-bold text-primary shadow-lg shadow-yellowcustom/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffc24d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
                <Mail aria-hidden="true" className="h-4 w-4" />
                {cvLinks.email}
              </a>
              <a href={cvLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                {t.contact.linkedinLabel}
              </a>
              {track === "engineering" ? (
                <a href={cvLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                  <Github aria-hidden="true" className="h-4 w-4" />
                  {t.contact.githubLabel}
                </a>
              ) : (
                <a href={cvLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  {t.contact.resumeLabel} · {cvLinks.phoneDisplay}
                </a>
              )}
            </div>
          </motion.div>
          <p className="mt-10 text-center text-xs text-white/50">
            © {t.name} · {t.location} ·{" "}
            <a href={cvLinks.site} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-white">
              wbdigitalsolutions.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};

/** Section wrapper with a numbered eyebrow + iconed accent heading. */
const Section: React.FC<{ index: number; title: string; icon: LucideIcon; children: React.ReactNode }> = ({
  index,
  title,
  icon: Icon,
  children,
}) => (
  <section className="mx-auto max-w-6xl px-6 py-12">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="font-mono text-xs font-semibold tracking-[0.25em] text-yellowcustom/80">
          {String(index).padStart(2, "0")}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-yellowcustom/60 to-transparent" aria-hidden="true" />
      </div>
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white lg:text-3xl">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-yellowcustom">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        {title}
      </h2>
    </motion.div>
    {children}
  </section>
);

export default CVTrackPage;
