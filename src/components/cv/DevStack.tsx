'use client';

/**
 * Stack & skills section for the DEV CV page (independent dark copy of the
 * sales skills pattern, see devTheme.ts): grouped mono chips with a capped
 * micro-stagger. Content from devStack.ts (pt-BR WIP).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvContent, type CVLang } from '@/content/cv';
import { devStack } from '@/content/devStack';
import { AMBER, BG_DEV, light, toCVLang } from './devTheme';
import { useDevReveal } from './useDevReveal';
import { DevSection, DevSectionHeader } from './DevSection';
import DevCodeDeco from './DevCodeDeco';

const TITLE: Record<CVLang, string> = {
  'pt-BR': 'Como eu construo.',
  en: 'How I build.',
  it: 'Come costruisco.',
  es: 'Cómo construyo.',
};

const DevStack: React.FC = () => {
  const { language } = useLanguage();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const reveal = useDevReveal();

  return (
    <DevSection id="competencias" bg={BG_DEV}>
      <DevCodeDeco code={'import { web, ai, cloud } from "experience"'} />
      <DevSectionHeader eyebrow={t.nav.skills} title={TITLE[cv]} />

      <div className="grid gap-8 sm:grid-cols-2">
        {devStack[cv].map((g, i) => (
          <motion.div key={g.label} {...reveal(i * 0.06)} className={g.items.length > 8 ? 'sm:col-span-2' : ''}>
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
                  className="rounded-md border px-2.5 py-1 font-mono text-xs font-medium"
                  style={{ borderColor: light(0.15), color: light(0.75), background: 'rgba(244,244,245,0.04)' }}
                >
                  {it}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </DevSection>
  );
};

export default DevStack;
