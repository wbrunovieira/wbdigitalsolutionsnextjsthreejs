'use client';

/**
 * One project card of the DEV projects section (extracted from DevProjects).
 * Each project is framed as a small editor window (traffic-light dots + a
 * mono `~/projects/<slug>` path in the title bar), echoing the hero's
 * terminal identity. Cards with a screenshot in /public get an image header
 * under a dark scrim; items without one degrade to a terminal-style
 * placeholder (dot grid + `$ ./slug` prompt), so nothing ever renders as a
 * broken img. Hover: amber border + soft glow, inset corner ticks, slight
 * lift and a 1.04 image zoom, all transform/opacity-only and motion-safe.
 */

import React from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';
import type { Project } from '@/components/projects/types';
import { AMBER, TEXT, light } from './devTheme';
import DevProjectCardMedia from './DevProjectCardMedia';

export const STUDIO_PROJECTS_URL = 'https://www.wbdigitalsolutions.com/projects';

/**
 * Layout: Revalida Italia gets the full-width flagship slot (largest scope in
 * the set); Salto also spans full width as the closing card so the 6-item
 * grid resolves cleanly (1 wide + 2x2 + 1 wide).
 */
export const WIDE_SLUGS = new Set(['revalida-italia', 'salto']);

export interface ProjectCardCopy {
  caseStudy: string;
  live: string;
}

/** Desaturated editor traffic lights: instantly read as a window. */
const TRAFFIC_LIGHTS = ['rgba(255,95,86,0.65)', 'rgba(255,189,46,0.65)', 'rgba(39,201,63,0.55)'];

/** Inset amber corner brackets (echoing the hero frame); revealed on hover/focus. */
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

const DevProjectCard: React.FC<{
  project: Project;
  copy: ProjectCardCopy;
  /** Localized "Featured" label; set only on the flagship card. */
  flagshipLabel?: string;
}> = ({ project: p, copy, flagshipLabel }) => {
  const wide = WIDE_SLUGS.has(p.slug ?? '');
  const maxChips = wide ? 8 : 6;

  return (
    <div
      className="group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(244,244,245,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[rgba(224,145,47,0.45)] hover:shadow-[0_18px_50px_-18px_rgba(224,145,47,0.3)] focus-within:border-[rgba(224,145,47,0.45)] motion-safe:hover:-translate-y-1"
      style={{ background: 'rgba(244,244,245,0.03)' }}
    >
      <CornerTicks />

      {/* Editor title bar: traffic lights + mono repo path (decorative) */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-b px-4 py-2.5"
        style={{ borderColor: light(0.08), background: 'rgba(244,244,245,0.02)' }}
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
            style={{ color: AMBER, borderColor: 'rgba(224,145,47,0.35)', background: 'rgba(224,145,47,0.08)' }}
          >
            {flagshipLabel}
          </span>
        ) : (
          <span className="hidden shrink-0 font-mono text-[10px] sm:block" style={{ color: light(0.3) }}>
            {'# '}{p.category}
          </span>
        )}
      </div>

      <DevProjectCardMedia project={p} wide={wide} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className={`font-black tracking-[-0.01em] ${wide ? 'text-xl' : 'text-lg'}`} style={{ color: TEXT }}>
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
              style={{ borderColor: light(0.13), color: light(0.68), background: 'rgba(244,244,245,0.03)' }}
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

export default DevProjectCard;
