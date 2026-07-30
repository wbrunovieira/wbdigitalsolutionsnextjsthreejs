'use client';

/**
 * "Building now" section for the DEV CV page: a single, honest showcase of a
 * product in ACTIVE development (not shipped, no real users). Deliberately
 * distinct from the shipped Projects grid: an editor-window card with an
 * "in development" badge, the product + its differentiator, and two clearly
 * separated lists (what already runs vs what is only designed). Independent
 * Dev* file — never shared with the Sales page.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CircleDashed } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { devBuilding } from '@/content/devBuilding';
import { AMBER, BG_DEV, TEXT, light, toCVLang } from './devTheme';
import { DevSection, DevSectionHeader } from './DevSection';
import DevCodeDeco from './DevCodeDeco';
import { useDevReveal } from './useDevReveal';

/** Desaturated editor traffic lights: instantly read as a window (mirrors DevProjectCard). */
const TRAFFIC_LIGHTS = ['rgba(255,95,86,0.65)', 'rgba(255,189,46,0.65)', 'rgba(39,201,63,0.55)'];

const DevBuilding: React.FC = () => {
  const { language } = useLanguage();
  const c = devBuilding[toCVLang(language)];
  const reveal = useDevReveal();

  return (
    <DevSection id="construindo" bg={BG_DEV}>
      <DevCodeDeco code="$ go test ./... && caddy run  # dev" />
      <DevSectionHeader eyebrow={c.eyebrow} title={c.sectionTitle} intro={c.sectionIntro} />

      <motion.article {...reveal(0)}>
        <div
          className="relative flex flex-col overflow-hidden rounded-xl border"
          style={{ borderColor: 'rgba(224,145,47,0.35)', background: 'rgba(244,244,245,0.03)' }}
        >
          {/* Editor title bar: traffic lights + repo path + in-development badge */}
          <div
            className="flex items-center gap-3 border-b px-4 py-2.5"
            style={{ borderColor: light(0.08), background: 'rgba(244,244,245,0.02)' }}
          >
            <span aria-hidden="true" className="flex shrink-0 gap-1.5">
              {TRAFFIC_LIGHTS.map((cc) => (
                <span key={cc} className="h-2.5 w-2.5 rounded-full" style={{ background: cc }} />
              ))}
            </span>
            <span className="min-w-0 flex-1 truncate font-mono text-[11px]" style={{ color: light(0.4) }}>
              ~/projects/treino-aliado
            </span>
            <span
              className="inline-flex shrink-0 items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: AMBER, borderColor: 'rgba(224,145,47,0.4)', background: 'rgba(224,145,47,0.1)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
              {c.badge}
            </span>
          </div>

          <div className="flex flex-col p-5 sm:p-7">
            <h3 className="text-2xl font-black tracking-[-0.01em]" style={{ color: TEXT }}>
              {c.name}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-relaxed" style={{ color: AMBER }}>
              {c.tagline}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: light(0.7) }}>
              {c.description}
            </p>
            <p className="mt-2 text-xs font-medium" style={{ color: light(0.45) }}>
              {c.note}
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.14em]" style={{ color: light(0.85) }}>
                  {c.builtTitle}
                </h4>
                <ul className="space-y-2.5">
                  {c.built.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: light(0.72) }}>
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#27c93f' }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.14em]" style={{ color: light(0.85) }}>
                  {c.roadmapTitle}
                </h4>
                <ul className="space-y-2.5">
                  {c.roadmap.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: light(0.55) }}>
                      <CircleDashed aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: light(0.4) }} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5 border-t pt-5" style={{ borderColor: light(0.08) }}>
              {c.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium"
                  style={{ borderColor: light(0.13), color: light(0.68), background: 'rgba(244,244,245,0.03)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </DevSection>
  );
};

export default DevBuilding;
