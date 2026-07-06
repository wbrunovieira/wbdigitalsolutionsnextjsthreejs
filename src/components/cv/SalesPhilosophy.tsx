'use client';

/**
 * Sales philosophy / manifesto pull-quote for the sales CV page. Rendered twice
 * (two variants) so the philosophy breathes in two moments of the page:
 *   - "decide"  (after the hero): understanding the problem + genuinely helping.
 *   - "clarity" (before contact): reading the unspoken doubt + clarity + security.
 * Calm editorial contrast to the hero's display type.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import type { CVLang } from '@/content/cv';
import { AMBER, BG_A, INK, ink, toCVLang } from './salesTheme';
import { useReveal } from './useReveal';
import { SalesSection } from './SalesSection';

type Variant = 'decide' | 'clarity';

const COPY: Record<Variant, Record<CVLang, { eyebrow: string; lead: string; statement: string }>> = {
  decide: {
    'pt-BR': {
      eyebrow: 'Filosofia',
      lead: 'Vender é ajudar a decidir.',
      statement: 'Começo entendendo o problema a fundo e só ofereço quando sei que posso ajudar de verdade.',
    },
    en: {
      eyebrow: 'Philosophy',
      lead: 'Selling is helping people decide.',
      statement: 'I start by understanding the problem deeply, and only offer once I know I can genuinely help.',
    },
    it: {
      eyebrow: 'Filosofia',
      lead: 'Vendere è aiutare a decidere.',
      statement: 'Parto dal capire il problema a fondo e propongo solo quando so di poter aiutare davvero.',
    },
    es: {
      eyebrow: 'Filosofía',
      lead: 'Vender es ayudar a decidir.',
      statement: 'Empiezo entendiendo el problema a fondo y solo ofrezco cuando sé que puedo ayudar de verdad.',
    },
  },
  clarity: {
    'pt-BR': {
      eyebrow: 'Confiança',
      lead: 'Vender bem é dar clareza.',
      statement: 'Enxergo a dúvida que o cliente nem sempre diz, esclareço o que ficou no ar, e a decisão fica segura.',
    },
    en: {
      eyebrow: 'Trust',
      lead: 'Selling well means giving clarity.',
      statement: "I spot the doubt the client doesn't always voice, clear up what's left unsaid, and the decision becomes secure.",
    },
    it: {
      eyebrow: 'Fiducia',
      lead: 'Vendere bene è dare chiarezza.',
      statement: 'Colgo il dubbio che il cliente non sempre esprime, chiarisco ciò che resta in sospeso, e la decisione diventa sicura.',
    },
    es: {
      eyebrow: 'Confianza',
      lead: 'Vender bien es dar claridad.',
      statement: 'Detecto la duda que el cliente no siempre expresa, aclaro lo que quedó en el aire, y la decisión se vuelve segura.',
    },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const SalesPhilosophy: React.FC<{ variant: Variant; id: string }> = ({ variant, id }) => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const copy = COPY[variant][toCVLang(language)];
  const reveal = useReveal({ margin: '-80px', duration: 0.7 });
  const words = copy.lead.split(' ');

  return (
    <SalesSection id={id} bg={BG_A} width="3xl" padding="roomy">
      <motion.div {...reveal()}>
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
          {copy.eyebrow}
        </span>
        <div className="relative mt-6 pl-6 sm:pl-8">
          {/* Amber border drawing itself top-down, in sync with the word stagger */}
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-[2px] origin-top"
            style={{ background: AMBER }}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          {/* Word-level stagger (never per character); screen readers get the
              whole sentence via a visually-hidden span (aria-label is not
              allowed on <p>). */}
          <p
            className="text-3xl font-black leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]"
            style={{ color: INK }}
          >
            {reduce ? (
              copy.lead
            ) : (
              <>
                <span className="sr-only">{copy.lead}</span>
                {words.map((w, i) => (
                  <React.Fragment key={i}>
                    <motion.span
                      aria-hidden="true"
                      className="inline-block"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: EASE }}
                    >
                      {w}
                    </motion.span>{' '}
                  </React.Fragment>
                ))}
              </>
            )}
          </p>
          <p className="mt-5 text-xl font-medium leading-relaxed sm:text-2xl" style={{ color: ink(0.68) }}>
            {copy.statement}
          </p>
        </div>
      </motion.div>
    </SalesSection>
  );
};

export default SalesPhilosophy;
