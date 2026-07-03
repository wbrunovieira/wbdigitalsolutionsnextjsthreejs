"use client";

/**
 * Projects section for the DEV CV page: a curated selection of shipped work.
 * Content is REUSED from the studio's localized projectsPage items (locale
 * JSONs via useTranslations, data not page identity), so the 14 projects stay
 * maintained in one place; this section features a hand-picked subset and
 * links each case to its full study on wbdigitalsolutions.com. The
 * editor-window card lives in DevProjectCard.
 */

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";
import { cvContent, type CVLang } from "@/content/cv";
import type { Project, ProjectsPageContent } from "@/components/projects/types";
import { BG_DEV_ALT, toCVLang } from "./devTheme";
import { useDevReveal } from "./useDevReveal";
import { DevSection, DevSectionHeader } from "./DevSection";
import DevCodeDeco from "./DevCodeDeco";
import DevProjectCard, { WIDE_SLUGS } from "./DevProjectCard";

/** Hand-picked subset showing breadth: edu platform, CRM, AI, Rust desktop, Go backend, motion-rich web. */
const FEATURED_SLUGS = ["revalida-italia", "wb-crm", "ai-agents", "vetor", "financas", "salto"];

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
      <DevCodeDeco code="$ docker compose up -d  # production" />
      <DevSectionHeader eyebrow={t.nav.projects} title={copy.title} intro={copy.intro} />

      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((p, i) => (
          <motion.article
            key={p.slug ?? p.id}
            {...reveal(Math.min(i, 3) * 0.06)}
            className={WIDE_SLUGS.has(p.slug ?? "") ? "sm:col-span-2" : undefined}
          >
            <DevProjectCard
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
