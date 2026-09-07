'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cvLinks, type CVLang } from '@/content/cv';
import { INK, ink } from './salesTheme';
import { BurgerLines } from './SalesNavMobile';

const LANGS: { code: CVLang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt-BR', label: 'PT' },
  { code: 'it', label: 'IT' },
  { code: 'es', label: 'ES' },
];

interface SalesNavActionsProps {
  lang: CVLang;
  setLanguage: (code: string) => void;
  menuOpen: boolean;
  openLabel: string;
  onOpenMenu: () => void;
}

/** WhatsApp CTA + language switcher + burger button. Sales CV only. */
const SalesNavActions: React.FC<SalesNavActionsProps> = ({
  lang, setLanguage, menuOpen, openLabel, onOpenMenu,
}) => (
  <div className="flex items-center gap-3">
    {/* Header CTA goes straight to WhatsApp: inverted pill (graphite on the
        light theme) + the green lives only in the icon. */}
    <a
      href={cvLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/60 sm:inline-flex"
      style={{ background: INK, color: '#f7f7f8', boxShadow: '0 6px 16px rgba(28,28,30,0.28)' }}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" style={{ color: '#25D366' }} />
      WhatsApp
    </a>
    <div
      className="flex items-center gap-1 rounded-full border bg-white/70 p-1 shadow-[0_2px_20px_rgba(28,28,30,0.06)] backdrop-blur-sm"
      style={{ borderColor: ink(0.12) }}
    >
      {LANGS.map((l) => {
        const isActive = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLanguage(l.code)}
            aria-pressed={isActive}
            className="relative rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0912f]/50"
          >
            {isActive && (
              <motion.span
                layoutId="cv-lang-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: INK }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10" style={{ color: isActive ? '#ffffff' : ink(0.6) }}>{l.label}</span>
          </button>
        );
      })}
    </div>
    {/* Custom burger: asymmetric lines that swap widths on hover */}
    <button
      onClick={onOpenMenu}
      aria-label={openLabel}
      aria-expanded={menuOpen}
      className="group grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors xl:hidden"
      style={{ borderColor: ink(0.14), background: 'rgba(255,255,255,0.7)' }}
    >
      <BurgerLines color={INK} />
    </button>
  </div>
);

export default SalesNavActions;
