"use client";

/**
 * Mobile hamburger overlay for the sales nav (extracted from SalesNav):
 * full-screen animated menu with the nav links + Contato CTA. Also home of
 * the BV Monogram disc (shared by the header and this overlay's top bar).
 */

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { AMBER, CONTACT_ID, INK, ink } from "./salesTheme";

/** BV monogram disc (used in the header and the mobile-menu top bar). */
export const Monogram: React.FC = () => (
  <span
    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black"
    style={{ background: INK, color: "#ffffff", boxShadow: `inset 0 0 0 2px ${AMBER}` }}
    aria-hidden="true"
  >
    BV
  </span>
);

const SalesNavMobile: React.FC<{
  open: boolean;
  name: string;
  closeLabel: string;
  contactLabel: string;
  items: { id: string; label: string }[];
  active: string;
  navigateTo: (id: string) => (e: React.MouseEvent) => void;
  onClose: () => void;
}> = ({ open, name, closeLabel, contactLabel, items, active, navigateTo, onClose }) => {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: "rgba(247,247,248,0.98)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="flex items-center gap-3">
              <Monogram />
              <span className="text-base font-black" style={{ color: INK }}>{name}</span>
            </span>
            <button
              onClick={onClose}
              aria-label={closeLabel}
              className="grid h-10 w-10 place-items-center rounded-full border"
              style={{ borderColor: ink(0.14) }}
            >
              <X className="h-5 w-5" style={{ color: INK }} aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {items.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  navigateTo(item.id)(e);
                  onClose();
                }}
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: reduce ? 0 : 0.06 + i * 0.04 }}
                className="py-2 text-3xl font-black tracking-[-0.02em]"
                style={{ color: active === item.id ? AMBER : INK }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
          <div className="px-6 pb-10">
            <a
              href={`#${CONTACT_ID}`}
              onClick={(e) => {
                navigateTo(CONTACT_ID)(e);
                onClose();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold"
              style={{ background: AMBER, color: INK, boxShadow: "0 10px 24px rgba(224,145,47,0.32)" }}
            >
              {contactLabel}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SalesNavMobile;
