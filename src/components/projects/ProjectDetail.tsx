'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectDetail } from '@/data/projectDetails';
import type { Project, ProjectsPageContent } from './types';

interface ProjectDetailProps {
  project: Project;
  content: ProjectsPageContent;
}

const UI: Record<string, { back: string; confidential: string; overview: string; highlights: string; visit: string }> = {
  en: { back: 'Back to projects', confidential: 'Some details omitted under NDA', overview: 'Overview', highlights: 'Highlights', visit: 'Visit site' },
  es: { back: 'Volver a proyectos', confidential: 'Algunos detalles omitidos por NDA', overview: 'Resumen', highlights: 'Destacados', visit: 'Visitar sitio' },
  it: { back: 'Torna ai progetti', confidential: 'Alcuni dettagli omessi per NDA', overview: 'Panoramica', highlights: 'In evidenza', visit: 'Visita il sito' },
  'pt-BR': { back: 'Voltar aos projetos', confidential: 'Alguns detalhes omitidos por confidencialidade (NDA)', overview: 'Visão geral', highlights: 'Destaques', visit: 'Ver site' },
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, content }) => {
  const { language } = useLanguage();
  const ui = UI[language === 'pt' ? 'pt-BR' : language] ?? UI.en;
  const slides = project.slides ?? [];
  const detail = getProjectDetail(project.slug, language);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 md:pt-40">
        <div className="container mx-auto max-w-5xl">
          <Link
            href="/projects"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-yellowcustom/70 bg-yellowcustom/5 py-2 pl-3 pr-4 text-sm font-semibold text-yellowcustom shadow-[0_0_14px_-3px_rgba(255,185,71,0.45)] backdrop-blur-sm transition-all duration-300 hover:border-yellowcustom hover:bg-yellowcustom/10 hover:text-white hover:shadow-[0_0_26px_0_rgba(255,185,71,0.7)]"
          >
            <span
              aria-hidden
              className="grid h-6 w-6 place-items-center rounded-full bg-yellowcustom/20 text-yellowcustom transition-all duration-300 group-hover:-translate-x-0.5 group-hover:bg-yellowcustom group-hover:text-primary"
            >
              ←
            </span>
            {ui.back}
          </Link>

          {project.subtitle && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-yellowcustom">
              {project.subtitle}
            </p>
          )}

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary md:text-lg">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-custom-purple/40 bg-custom-purple/15 px-3 py-1 text-xs text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Visit live site */}
          {project.liveUrl && (
            <div className="mt-7">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-yellowcustom/60 px-6 py-3 text-sm font-semibold text-yellowcustom transition-colors duration-300 hover:bg-yellowcustom hover:text-primary"
              >
                {ui.visit}
                <span aria-hidden>↗</span>
              </a>
            </div>
          )}

          {/* Confidentiality note */}
          <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-yellowcustom/30 bg-yellowcustom/5 px-4 py-2 text-xs text-secondary">
            <span aria-hidden>🔒</span> {ui.confidential}
          </p>

          {/* Cover */}
          <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-3xl border border-custom-purple/30 shadow-2xl shadow-custom-purple/20">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                quality={90}
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-custom-purple/50 via-primary to-primary">
                <span className="text-8xl">{project.icon ?? '🗂️'}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Numbers */}
      {detail && (
        <section className="border-y border-custom-purple/20 bg-gradient-to-r from-primary via-custom-purple/15 to-primary px-6 py-14">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {detail.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-extrabold text-yellowcustom lg:text-4xl">{s.value}</p>
                  <p className="mt-1 text-xs text-secondary lg:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature areas */}
      {detail && (
        <section className="px-6 pt-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-10 text-2xl font-bold md:text-3xl">{detail.featuresTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {detail.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-custom-purple/25 bg-primary/40 p-5 transition-colors hover:border-custom-purple/60"
                >
                  <div className="text-2xl">{f.icon}</div>
                  <h3 className="mt-3 font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Slides as alternating sections */}
      <section className="px-6 py-20">
        <div className="container mx-auto max-w-5xl space-y-24">
          {slides.map((slide, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Media */}
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-custom-purple/30 shadow-xl">
                  {slide.type === 'video' && slide.videoUrl ? (
                    <video
                      src={slide.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (slide.imageUrl ?? project.imageUrl) ? (
                    <Image
                      src={(slide.imageUrl ?? project.imageUrl) as string}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={85}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-custom-purple/50 via-primary to-primary">
                      <span className="text-6xl">{project.icon ?? '🗂️'}</span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div>
                  <span className="font-mono text-xs text-yellowcustom">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold md:text-3xl">{slide.title}</h2>
                  {slide.description?.split('\n\n').map((para, p) => (
                    <p key={p} className="mt-4 text-sm leading-relaxed text-secondary md:text-base">
                      {para}
                    </p>
                  ))}
                  {slide.features && slide.features.length > 0 && (
                    <ul className="mt-6 space-y-2">
                      {slide.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-sm text-secondary">
                          <span className="mt-1 text-yellowcustom" aria-hidden>
                            ✦
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering highlights */}
      {detail && (
        <section className="px-6 pb-20">
          <div className="container mx-auto max-w-4xl rounded-3xl border border-custom-purple/25 bg-primary/40 p-8 md:p-12">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">{detail.highlightsTitle}</h2>
            <ul className="space-y-4">
              {detail.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-secondary md:text-base">
                  <span className="mt-1 text-yellowcustom" aria-hidden>
                    ✦
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 pb-28">
        <div className="container mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-custom-purple/30 bg-gradient-to-br from-custom-purple/30 via-primary to-primary px-8 py-14 text-center shadow-2xl shadow-custom-purple/20">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">{content.cta.title}</h2>
          <p className="mt-4 max-w-xl text-base text-secondary md:text-lg">{content.cta.subtitle}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellowcustom to-custom-purple px-8 py-3.5 font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform duration-300 hover:scale-105"
          >
            {content.cta.button}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
