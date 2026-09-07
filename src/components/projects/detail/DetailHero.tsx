import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '../types';
import { DetailUI } from './detailUI';

const DetailHero: React.FC<{ project: Project; ui: DetailUI }> = ({ project, ui }) => (
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

      {project.liveUrl && (
        <div className="mt-7">
          {/* Dofollow on purpose: this editorial portfolio link passes link
              equity to the client's site (helps their Google ranking). Keep
              `noopener` for security; drop `noreferrer` so their analytics can
              attribute the referral traffic back to this portfolio. */}
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

      <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-yellowcustom/30 bg-yellowcustom/5 px-4 py-2 text-xs text-secondary">
        <span aria-hidden>🔒</span> {ui.confidential}
      </p>

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
            <span className="text-8xl" aria-hidden>{project.icon ?? '🗂️'}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      </div>
    </div>
  </section>
);

export default DetailHero;
