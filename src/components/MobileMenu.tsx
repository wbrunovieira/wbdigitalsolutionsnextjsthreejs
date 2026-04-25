import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const LANGS = [
  { id: "en", display: "EN" },
  { id: "pt-BR", display: "PT" },
  { id: "it", display: "IT" },
  { id: "es", display: "ES" },
];

const MobileMenu: React.FC<{
  isOpen: boolean;
  navData: any[];
  pathname: string;
  setActiveMenu: (name: string | null) => void;
  activeMenu: string | null;
  closeMenu: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}> = ({ isOpen, navData, pathname, closeMenu, language, setLanguage }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeMenu]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 flex flex-col"
            style={{
              background: "linear-gradient(160deg, #1a0826 0%, #350545 60%, #2a0438 100%)",
              borderLeft: "1px solid rgba(121,41,144,0.3)",
            }}
          >
            {/* Top accent line */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #792990, transparent)" }} />

            {/* Close button */}
            <div className="flex justify-end px-6 pt-5">
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
                style={{ color: "#aaa6c3", border: "1px solid rgba(121,41,144,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#792990")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(121,41,144,0.4)")}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col justify-center flex-1 px-8 gap-1">
              {navData.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ delay: 0.1 + index * 0.06, duration: 0.28, ease: "easeOut" }}
                  >
                    <Link
                      href={link.path}
                      onClick={closeMenu}
                      className="group flex items-center gap-4 py-4 border-b border-white/5"
                    >
                      <span
                        className="text-lg font-light tracking-widest lowercase transition-colors duration-200"
                        style={{ color: isActive ? "#ffffff" : "#aaa6c3" }}
                      >
                        {link.name}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active-dot"
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          style={{ background: "#ffb947" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Language selector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.25 }}
              className="px-8 pb-10"
            >
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(170,166,195,0.4)" }}>
                language
              </p>
              <div className="flex gap-2">
                {LANGS.map(lang => {
                  const isSelected = language === lang.id;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => setLanguage(lang.id)}
                      className="flex-1 py-3 text-sm font-mono tracking-widest rounded transition-all duration-200"
                      style={{
                        color: isSelected ? "#1a0826" : "#aaa6c3",
                        background: isSelected ? "#ffb947" : "rgba(255,255,255,0.05)",
                        border: isSelected ? "1px solid #ffb947" : "1px solid rgba(121,41,144,0.3)",
                      }}
                    >
                      {lang.display}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Bottom accent line */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #792990, transparent)" }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileMenu;
