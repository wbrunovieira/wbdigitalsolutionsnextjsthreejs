'use client';

/**
 * Commercial skills section for the sales CV page: methodology/skill chips plus
 * a "brands served" band (styled names, not logos, to avoid CSP/trademark
 * issues). Skill groups come localized from salesSkills.ts.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvContent, type CVLang } from '@/content/cv';
import { salesSkills, salesClients } from '@/content/salesSkills';
import { AMBER, BG_A, ink, toCVLang } from './salesTheme';
import { useReveal } from './useReveal';
import { SalesSection, SectionHeader } from './SalesSection';

const TITLE: Record<CVLang, string> = {
  'pt-BR': 'Como eu vendo.',
  en: 'How I sell.',
  it: 'Come vendo.',
  es: 'Cómo vendo.',
};

const CLIENTS_LABEL: Record<CVLang, string> = {
  'pt-BR': 'Alguns clientes conhecidos',
  en: 'Some notable clients',
  it: 'Alcuni clienti noti',
  es: 'Algunos clientes conocidos',
};

const SalesSkills: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const reveal = useReveal();

  return (
    <SalesSection id="competencias" bg={BG_A}>
      <SectionHeader eyebrow={t.nav.skills} title={TITLE[cv]} />

      <div className="grid gap-8 sm:grid-cols-2">
        {salesSkills[cv].map((g, i) => (
          <motion.div key={g.label} {...reveal(i * 0.06)}>
            <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: AMBER }}>{g.label}</h3>
            <div className="flex flex-wrap gap-2">
              {/* Micro-stagger per chip (capped) for texture without delay */}
              {g.items.map((it, j) => (
                <motion.span
                  key={it}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 + Math.min(j, 8) * 0.02, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-full border px-3 py-1 text-sm font-medium"
                  style={{ borderColor: ink(0.14), color: ink(0.8), background: 'rgba(255,255,255,0.6)' }}
                >
                  {it}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Brands served */}
      <motion.div {...reveal(0.2)} className="mt-16 border-t pt-10" style={{ borderColor: ink(0.1) }}>
        <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ink(0.45) }}>
          {CLIENTS_LABEL[cv]}
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {salesClients.map((c) => (
            <span key={c} className="text-lg font-black tracking-tight sm:text-xl" style={{ color: ink(0.32) }}>
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </SalesSection>
  );
};

export default SalesSkills;
