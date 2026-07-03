"use client";

/**
 * Projects section for the DEV CV page: a curated selection of shipped work.
 * Content is REUSED from the studio's localized projectsPage items (locale
 * JSONs via useTranslations, data not page identity), so the 14 projects stay
 * maintained in one place; this section features a hand-picked subset and
 * links each case to its full study on wbdigitalsolutions.com.
 *
 * Card design: each project is framed as a small editor window (traffic-light
 * dots + a mono `~/projects/<slug>` path in the title bar), echoing the hero's
 * terminal identity. Cards with a screenshot in /public get an image header
 * under a dark scrim; the two without (ai-agents, financas) degrade to a
 * terminal-style placeholder (dot grid + `$ ./slug` prompt), so nothing ever
 * renders as a broken img. Hover: amber border + soft glow, inset corner
 * ticks (echoing the hero frame), slight lift and a 1.04 image zoom, all
 * transform/opacity-only and gated behind motion-safe / pointer hover.
 */

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";
import { cvContent, type CVLang } from "@/content/cv";
import type { Project, ProjectsPageContent } from "@/components/projects/types";
import { AMBER, BG_DEV_ALT, TEXT, light, toCVLang } from "./devTheme";
import { useDevReveal } from "./useDevReveal";
import { DevSection, DevSectionHeader } from "./DevSection";

/** Hand-picked subset showing breadth: edu platform, CRM, AI, Rust desktop, Go backend, motion-rich web. */
const FEATURED_SLUGS = ["revalida-italia", "wb-crm", "ai-agents", "vetor", "financas", "salto"];
const STUDIO_PROJECTS_URL = "https://www.wbdigitalsolutions.com/projects";

/**
 * Layout: Revalida Italia gets the full-width flagship slot (largest scope in
 * the set: a complete multi-tenant education platform, the strongest proof of
 * end-to-end ownership). Salto also spans full width as the closing card so
 * the 6-item grid resolves cleanly (1 wide + 2x2 + 1 wide) instead of leaving
 * a dangling half-empty last row; only Revalida carries the "featured" badge.
 */
const WIDE_SLUGS = new Set(["revalida-italia", "salto"]);

/** Desaturated editor traffic lights: instantly read as a window, sit quietly in the dark. */
const TRAFFIC_LIGHTS = ["rgba(255,95,86,0.65)", "rgba(255,189,46,0.65)", "rgba(39,201,63,0.55)"];

const COPY: Record<CVLang, { title: string; intro: string; caseStudy: string; live: string }> = {
  "pt-BR": {
    title: "Construído e entregue.",
    intro: "Uma seleção do que saiu das minhas mãos e está em produção. Cada projeto tem um estudo completo no site do estúdio.",
    caseStudy: "Ver case",
    live: "Site no ar",
  },
  en: {
    title: "Built and shipped.",
    intro: "A selection of what left my hands and is running in production. Every project has a full case study on the studio site.",
    caseStudy: "View case",
    live: "Live site",
  },
  it: {
    title: "Costruito e consegnato.",
    intro: "Una selezione di ciò che è uscito dalle mie mani ed è in produzione. Ogni progetto ha un case study completo sul sito dello studio.",
    caseStudy: "Vedi il case",
    live: "Sito online",
  },
  es: {
    title: "Construido y entregado.",
    intro: "Una selección de lo que salió de mis manos y está en producción. Cada proyecto tiene un case study completo en el sitio del estudio.",
    caseStudy: "Ver el case",
    live: "Sitio en línea",
  },
};

type Copy = (typeof COPY)[CVLang];

/** Inset amber corner brackets (top-left + bottom-right, echoing the hero frame); revealed on hover/focus. */
const CornerTicks: React.FC = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 group-focus-within/card:opacity-100"
  >
    <span className="absolute left-2 top-2 h-3 w-px" style={{ background: AMBER }} />
    <span className="absolute left-2 top-2 h-px w-3" style={{ background: AMBER }} />
    <span className="absolute bottom-2 right-2 h-3 w-px" style={{ background: AMBER }} />
    <span className="absolute bottom-2 right-2 h-px w-3" style={{ background: AMBER }} />
  </span>
);

/**
 * Visual header: project screenshot under a dark scrim (subtle transform-only
 * zoom on card hover), or a terminal-flavored placeholder when the item has
 * no image in /public or the image fails to load (no broken img, ever).
 */
const CardMedia: React.FC<{ project: Project; wide: boolean }> = ({ project, wide }) => {
  const [broken, setBroken] = useState(false);
  const hasImage = Boolean(project.imageUrl) && !broken;

  return (
    <div
      className={`relative overflow-hidden border-b ${wide ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/9]"}`}
      style={{ borderColor: light(0.08), background: "#101014" }}
    >
      {hasImage ? (
        <>
          <Image
            src={project.imageUrl as string}
            alt={project.title}
            fill
            sizes={wide ? "(min-width: 640px) 848px, 100vw" : "(min-width: 640px) 424px, 100vw"}
            className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover/card:scale-[1.04]"
            onError={() => setBroken(true)}
          />
          {/* Dark scrim melting the image into the card body */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(19,19,24,0.05) 30%, rgba(19,19,24,0.35) 72%, rgba(19,19,24,0.85) 100%)" }}
          />
          {/* Static diagonal sheen: premium glass feel without a cursor-chasing gimmick */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(115deg, rgba(244,244,245,0.07) 0%, transparent 38%)" }}
          />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `radial-gradient(${light(0.9)} 1px, transparent 1px)`, backgroundSize: "22px 22px", opacity: 0.05 }}
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(55% 65% at 50% 42%, rgba(224,145,47,0.08), transparent 70%)" }} />
          {project.icon && <span className="relative text-4xl">{project.icon}</span>}
          <p className="relative font-mono text-xs sm:text-sm" style={{ color: light(0.45) }}>
            <span style={{ color: AMBER }}>$</span> ./{project.slug ?? project.id}
            <span
              className="ml-1.5 inline-block h-[1em] w-[0.55em] translate-y-[0.2em] motion-safe:animate-pulse"
              style={{ background: "rgba(224,145,47,0.8)" }}
            />
          </p>
        </div>
      )}
    </div>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  copy: Copy;
  /** Localized "Featured" label; set only on the flagship card. */
  flagshipLabel?: string;
}> = ({ project: p, copy, flagshipLabel }) => {
  const wide = WIDE_SLUGS.has(p.slug ?? "");
  const maxChips = wide ? 8 : 6;

  return (
    <div
      className="group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(244,244,245,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[rgba(224,145,47,0.45)] hover:shadow-[0_18px_50px_-18px_rgba(224,145,47,0.3)] focus-within:border-[rgba(224,145,47,0.45)] motion-safe:hover:-translate-y-1"
      style={{ background: "rgba(244,244,245,0.03)" }}
    >
      <CornerTicks />

      {/* Editor title bar: traffic lights + mono repo path (decorative, duplicates the title below) */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-b px-4 py-2.5"
        style={{ borderColor: light(0.08), background: "rgba(244,244,245,0.02)" }}
      >
        <span className="flex shrink-0 gap-1.5">
          {TRAFFIC_LIGHTS.map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[11px]" style={{ color: light(0.4) }}>
          ~/projects/{p.slug ?? p.id}
        </span>
        {flagshipLabel ? (
          <span
            className="shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: AMBER, borderColor: "rgba(224,145,47,0.35)", background: "rgba(224,145,47,0.08)" }}
          >
            {flagshipLabel}
          </span>
        ) : (
          <span className="hidden shrink-0 font-mono text-[10px] sm:block" style={{ color: light(0.3) }}>
            {"# "}{p.category}
          </span>
        )}
      </div>

      <CardMedia project={p} wide={wide} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className={`font-black tracking-[-0.01em] ${wide ? "text-xl" : "text-lg"}`} style={{ color: TEXT }}>
          {p.title}
        </h3>
        {p.subtitle && (
          <p className="mt-0.5 text-sm font-semibold" style={{ color: light(0.55) }}>{p.subtitle}</p>
        )}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed" style={{ color: light(0.7) }}>
          {p.description}
        </p>

        {/* Tech chips as tiny mono code tokens */}
        <div className="mb-5 mt-4 flex flex-wrap gap-1.5">
          {p.technologies.slice(0, maxChips).map((tech) => (
            <span
              key={tech}
              className="rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium"
              style={{ borderColor: light(0.13), color: light(0.68), background: "rgba(244,244,245,0.03)" }}
            >
              {tech}
            </span>
          ))}
          {p.technologies.length > maxChips && (
            <span className="px-1 py-0.5 font-mono text-[11px]" style={{ color: light(0.45) }}>
              +{p.technologies.length - maxChips}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4" style={{ borderColor: light(0.08) }}>
          <a
            href={`${STUDIO_PROJECTS_URL}/${p.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1 rounded-sm text-sm font-bold transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50"
            style={{ color: AMBER }}
          >
            {copy.caseStudy}
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-hover/link:translate-x-0.5"
            />
          </a>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold transition-colors hover:text-[#f4f4f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50"
              style={{ color: light(0.6) }}
            >
              <Globe aria-hidden="true" className="h-4 w-4" />
              {copy.live}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const DevProjects: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const copy = COPY[cv];
  const reveal = useDevReveal();

  const content = useTranslations().projectsPage as ProjectsPageContent;
  const bySlug = new Map((content?.items ?? []).map((p) => [p.slug, p]));
  const featured = FEATURED_SLUGS.map((s) => bySlug.get(s)).filter(Boolean) as Project[];

  return (
    <DevSection id="projetos" bg={BG_DEV_ALT}>
      <DevSectionHeader eyebrow={t.nav.projects} title={copy.title} intro={copy.intro} />

      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((p, i) => (
          <motion.article
            key={p.slug ?? p.id}
            {...reveal(Math.min(i, 3) * 0.06)}
            className={WIDE_SLUGS.has(p.slug ?? "") ? "sm:col-span-2" : undefined}
          >
            <ProjectCard
              project={p}
              copy={copy}
              flagshipLabel={p.slug === "revalida-italia" ? content?.featuredLabel : undefined}
            />
          </motion.article>
        ))}
      </div>

    </DevSection>
  );
};

export default DevProjects;
