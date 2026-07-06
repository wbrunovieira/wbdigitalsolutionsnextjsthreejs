'use client';

/**
 * Mobile hamburger overlay for the DEV nav (extracted from DevNav): dark
 * full-screen animated menu with the nav links + Contato CTA. Also home of
 * the BV Monogram disc (shared by the header and this overlay's top bar).
 */

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { cvLinks, type CVLang } from '@/content/cv';
import { AMBER, BG_DEV, TEXT, light } from './devTheme';

/** Localized aria labels for the hamburger open/close buttons. */
export const MENU_ARIA: Record<CVLang, { open: string; close: string }> = {
  'pt-BR': { open: 'Abrir menu', close: 'Fechar menu' },
  en: { open: 'Open menu', close: 'Close menu' },
  it: { open: 'Apri il menu', close: 'Chiudi il menu' },
  es: { open: 'Abrir menú', close: 'Cerrar menú' },
};

/** Asymmetric 3-line burger glyph (widths swap on the parent's hover). */
export const BurgerLines: React.FC<{ color: string }> = ({ color }) => (
  <span className="flex w-5 flex-col items-end gap-[5px]" aria-hidden="true">
    <span className="h-[2px] w-5 rounded-full transition-all duration-300 motion-safe:group-hover:w-3" style={{ background: color }} />
    <span className="h-[2px] w-3.5 rounded-full transition-all duration-300 motion-safe:group-hover:w-5" style={{ background: color }} />
    <span className="h-[2px] w-5 rounded-full transition-all duration-300 motion-safe:group-hover:w-2.5" style={{ background: color }} />
  </span>
);

/** BV monogram disc (used in the header and the mobile-menu top bar). */
export const Monogram: React.FC = () => (
  <span
    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black"
    style={{ background: BG_DEV, color: TEXT, boxShadow: `inset 0 0 0 2px ${AMBER}` }}
    aria-hidden="true"
  >
    BV
  </span>
);

const DevNavMobile: React.FC<{
  open: boolean;
  name: string;
  closeLabel: string;
  items: { id: string; label: string; activeAs?: string }[];
  active: string;
  navigateTo: (id: string, activeAs?: string) => (e: React.MouseEvent) => void;
  onClose: () => void;
}> = ({ open, name, closeLabel, items, active, navigateTo, onClose }) => {
  const reduce = useReducedMotion();

  // Circle reveal expanding from the hamburger's corner (fade under
  // reduced motion). clip-path animates on the compositor, no layout work.
  const reveal = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25 },
      }
    : {
        initial: { clipPath: 'circle(0% at calc(100% - 44px) 44px)' },
        animate: { clipPath: 'circle(150% at calc(100% - 44px) 44px)' },
        exit: { clipPath: 'circle(0% at calc(100% - 44px) 44px)' },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col xl:hidden"
          {...reveal}
          style={{ background: 'rgba(14,14,17,0.99)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="flex items-center gap-3">
              <Monogram />
              <span className="text-base font-black" style={{ color: TEXT }}>{name}</span>
            </span>
            <motion.button
              onClick={onClose}
              aria-label={closeLabel}
              className="grid h-10 w-10 place-items-center rounded-full border"
              style={{ borderColor: light(0.14) }}
              initial={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              <X className="h-5 w-5" style={{ color: TEXT }} aria-hidden="true" />
            </motion.button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {items.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  navigateTo(item.id, item.activeAs)(e);
                  onClose();
                }}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : 0.12 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group/item flex items-baseline gap-3 py-2"
              >
                {/* Mono index in amber: the dev twin keeps the terminal accent */}
                <span className="w-6 shrink-0 font-mono text-xs font-semibold" style={{ color: AMBER }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-3xl font-black tracking-[-0.02em] transition-transform duration-300 group-hover/item:translate-x-1"
                  style={{ color: active === item.id && !item.activeAs ? AMBER : TEXT }}
                >
                  {item.label}
                </span>
              </motion.a>
            ))}
          </nav>
          <motion.div
            className="px-6 pb-10"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.3 }}
          >
            {/* Same CTA as the desktop header: straight to WhatsApp, inverted
                pill with the green living only in the icon. */}
            <a
              href={cvLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold"
              style={{ background: '#f4f4f5', color: '#0e0e11', boxShadow: '0 10px 24px rgba(244,244,245,0.14)' }}
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" style={{ color: '#1faa53' }} />
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevNavMobile;
