"use client";

/**
 * Dev philosophy / manifesto pull-quote (independent dark copy of the sales
 * pattern, see devTheme.ts). Rendered twice so the philosophy breathes in two
 * moments of the page:
 *   - "problem" (after the hero): good code starts from the business problem
 *     (the 25-years-of-business edge).
 *   - "people"  (before contact): code is written for humans, the end user
 *     and the next dev (mirrors the sales page's person-centric philosophy).
 * Word-level stagger on the lead + self-drawing amber border, reduced-motion
 * gated, a11y preserved via aria-label.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CVLang } from "@/content/cv";
import { AMBER, BG_DEV, TEXT, light, toCVLang } from "./devTheme";
import { useDevReveal } from "./useDevReveal";
import { DevSection } from "./DevSection";
import DevCodeDeco from "./DevCodeDeco";
import DevBinary from "./DevBinary";

type Variant = "problem" | "people";

/** Corner easter egg per variant: the section's message, in code. */
const DECO: Record<Variant, string> = {
  problem: "if (!problem.understood) return listen();",
  people: "// readable > clever",
};

/** Side binary halo per variant, decoding the section's keyword (repeated). */
const BINARY: Record<Variant, string[]> = {
  // "LISTEN" (x2)
  problem: [
    "01001100 01001001",
    "01010011 01010100",
    "01000101 01001110",
    "01001100 01001001",
    "01010011 01010100",
    "01000101 01001110",
  ],
  // "PEOPLE" (x2)
  people: [
    "01010000 01000101",
    "01001111 01010000",
    "01001100 01000101",
    "01010000 01000101",
    "01001111 01010000",
    "01001100 01000101",
  ],
};

const COPY: Record<Variant, Record<CVLang, { eyebrow: string; lead: string; statement: string }>> = {
  problem: {
    "pt-BR": {
      eyebrow: "Filosofia",
      lead: "Código bom resolve problema de verdade.",
      statement: "Começo pelo problema do negócio e só escrevo a primeira linha quando sei o que ela precisa entregar. Hábito de quem passou 25 anos ouvindo clientes antes de propor soluções.",
    },
    en: {
      eyebrow: "Philosophy",
      lead: "Good code solves a real problem.",
      statement: "I start from the business problem and only write the first line when I know what it must deliver. A habit built over 25 years of listening to clients before proposing solutions.",
    },
    it: {
      eyebrow: "Filosofia",
      lead: "Il buon codice risolve un problema vero.",
      statement: "Parto dal problema di business e scrivo la prima riga solo quando so cosa deve consegnare. Un'abitudine costruita in 25 anni passati ad ascoltare i clienti prima di proporre soluzioni.",
    },
    es: {
      eyebrow: "Filosofía",
      lead: "El buen código resuelve un problema real.",
      statement: "Empiezo por el problema de negocio y solo escribo la primera línea cuando sé qué debe entregar. Un hábito construido en 25 años escuchando a clientes antes de proponer soluciones.",
    },
  },
  people: {
    "pt-BR": {
      eyebrow: "Ofício",
      lead: "Código é para pessoas.",
      statement: "A máquina executa qualquer coisa; quem lê, mantém e usa é gente. Escrevo para o usuário final e para o dev que vem depois de mim.",
    },
    en: {
      eyebrow: "Craft",
      lead: "Code is for people.",
      statement: "A machine will run anything; the ones who read, maintain and use it are people. I write for the end user and for the next dev after me.",
    },
    it: {
      eyebrow: "Mestiere",
      lead: "Il codice è per le persone.",
      statement: "La macchina esegue qualsiasi cosa; chi lo legge, mantiene e usa sono persone. Scrivo per l'utente finale e per il dev che viene dopo di me.",
    },
    es: {
      eyebrow: "Oficio",
      lead: "El código es para personas.",
      statement: "La máquina ejecuta cualquier cosa; quienes lo leen, mantienen y usan son personas. Escribo para el usuario final y para el dev que viene después de mí.",
    },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const DevPhilosophy: React.FC<{ variant: Variant; id: string }> = ({ variant, id }) => {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const copy = COPY[variant][toCVLang(language)];
  const reveal = useDevReveal({ margin: "-80px", duration: 0.7 });
  const words = copy.lead.split(" ");

  return (
    <DevSection id={id} bg={BG_DEV} width="3xl" padding="roomy">
      <DevCodeDeco code={DECO[variant]} />
      <DevBinary rows={BINARY[variant]} className="right-10 top-1/2 hidden -translate-y-1/2 lg:block" />
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
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          {/* Word-level stagger (never per character); screen readers get the
              whole sentence via a visually-hidden span (aria-label is not
              allowed on <p>). */}
          <p
            className="text-3xl font-black leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]"
            style={{ color: TEXT }}
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
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: EASE }}
                    >
                      {w}
                    </motion.span>{" "}
                  </React.Fragment>
                ))}
              </>
            )}
          </p>
          <p className="mt-5 text-xl font-medium leading-relaxed sm:text-2xl" style={{ color: light(0.68) }}>
            {copy.statement}
          </p>
        </div>
      </motion.div>
    </DevSection>
  );
};

export default DevPhilosophy;
