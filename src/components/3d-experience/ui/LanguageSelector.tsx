/**
 * LanguageSelector - Language switcher for the 3D Experience Platform
 */

import { motion } from 'framer-motion';
import { COLORS } from '../constants';
import { SupportedLanguage, SUPPORTED_LANGUAGES, getLanguageLabel } from '../constants/translations';

interface LanguageSelectorProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isMobile?: boolean;
}

export function LanguageSelector({
  language,
  onLanguageChange,
  isMobile = false,
}: LanguageSelectorProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: isMobile ? '8px' : '16px',
        right: isMobile ? '8px' : '16px',
        zIndex: 50,
        display: 'flex',
        gap: '8px',
      }}
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <motion.button
          key={lang}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLanguageChange(lang)}
          style={{
            padding: isMobile ? '6px 10px' : '8px 14px',
            borderRadius: '8px',
            border: 'none',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: 600,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: language === lang
              ? `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.darkPurple} 100%)`
              : 'rgba(0, 0, 0, 0.5)',
            color: language === lang ? COLORS.white : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            boxShadow: language === lang
              ? `0 4px 15px ${COLORS.purple}40`
              : 'none',
          }}
        >
          {isMobile ? getLanguageLabel(lang, true) : getLanguageLabel(lang)}
        </motion.button>
      ))}
    </div>
  );
}

export default LanguageSelector;
