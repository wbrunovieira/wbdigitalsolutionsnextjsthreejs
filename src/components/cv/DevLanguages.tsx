'use client';

/**
 * Languages section for the DEV CV page (independent dark copy of the sales
 * pattern, see devTheme.ts). Reuses the localized `languages` data from cv.ts
 * (shared content), rendered with proficiency bars (scaleX, transform-only)
 * plus a "currently learning German" note.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvContent, type CVLang } from '@/content/cv';
import { LANG_FLAG } from './cvIcons';
import { AMBER, BG_DEV, TEXT, light, toCVLang } from './devTheme';
import { useDevReveal } from './useDevReveal';
import { DevSection, DevSectionHeader } from './DevSection';
import DevCodeDeco from './DevCodeDeco';
import DevBinary from './DevBinary';

/** Side binary halo decoding "PT EN IT ES DE" (one language per row). */
const BINARY_LANGS = [
  '01010000 01010100',
  '01000101 01001110',
  '01001001 01010100',
  '01000101 01010011',
  '01000100 01000101',
];

const TITLE: Record<CVLang, string> = {
  'pt-BR': 'Quatro idiomas para trabalhar em qualquer time.',
  en: 'Four languages to work on any team.',
  it: 'Quattro lingue per lavorare in qualsiasi team.',
  es: 'Cuatro idiomas para trabajar en cualquier equipo.',
};

/** "Currently learning" note (German, beginner). */
const LEARNING: Record<CVLang, { label: string; german: string; level: string }> = {
  'pt-BR': { label: 'Aprendendo agora', german: 'Alemão', level: 'iniciante' },
  en: { label: 'Currently learning', german: 'German', level: 'beginner' },
  it: { label: 'Sto imparando', german: 'Tedesco', level: 'base' },
  es: { label: 'Aprendiendo ahora', german: 'Alemán', level: 'principiante' },
};

const DevLanguages: React.FC = () => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const cv = toCVLang(language);
  const t = cvContent[cv];
  const learning = LEARNING[cv];
  const reveal = useDevReveal();

  return (
    <DevSection id="idiomas" bg={BG_DEV} width="3xl">
      <DevCodeDeco code={'const langs = ["pt", "en", "it", "es"]  // next: "de"'} />
      <DevBinary rows={BINARY_LANGS} className="right-12 top-1/2 hidden -translate-y-1/2 lg:block" alpha={0.26} />
      <DevSectionHeader eyebrow={t.nav.languages} title={TITLE[cv]} />

      <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
        {t.languages.map((l, i) => (
          <motion.li key={l.code} {...reveal(i * 0.05)}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-base font-bold" style={{ color: TEXT }}>
                <span aria-hidden="true" className="text-lg">{LANG_FLAG[l.code]}</span>
                {l.name}
              </span>
              <span className="text-xs font-semibold" style={{ color: AMBER }}>{l.level}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: light(0.12) }}>
              {/* Static width + animated scaleX: transform-only (no layout per frame) */}
              <motion.div
                initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full origin-left rounded-full"
                style={{ width: `${l.proficiency}%`, background: `linear-gradient(90deg, ${AMBER}, #b26f1f)` }}
              />
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.p {...reveal(0.3)} className="mt-8 text-sm" style={{ color: light(0.55) }}>
        <span className="font-semibold" style={{ color: TEXT }}>{learning.label}:</span>{' '}
        <span aria-hidden="true" className="text-base">🇩🇪</span> {learning.german}{' '}
        <span style={{ color: light(0.4) }}>({learning.level})</span>
      </motion.p>
    </DevSection>
  );
};

export default DevLanguages;
