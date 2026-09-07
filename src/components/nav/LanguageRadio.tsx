import React from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import styles from '../Nav.module.css';

const LANG_IDS = ['en', 'pt-BR', 'it', 'es'] as const;

interface LanguageRadioProps {
  language: string;
  setLanguage: (id: string) => void;
  isLoaded: boolean;
}

/** Desktop language picker: a radio group whose ball slides toward the choice. */
const LanguageRadio: React.FC<LanguageRadioProps> = ({ language, setLanguage, isLoaded }) => {
  const m = useTranslations();

  if (!isLoaded) {
    return (
      <div className={`${styles.radioInput} opacity-50`}>
        <span className="text-white text-xs">...</span>
      </div>
    );
  }

  const selectedIdx = LANG_IDS.indexOf(language as typeof LANG_IDS[number]);
  const ballPos = (i: number) => {
    if (i === selectedIdx) return '0 0';
    if (i < selectedIdx) return '0 24px';
    return '0 -24px';
  };

  const labels = [
    { id: 'en', display: 'en', tooltip: m.english },
    { id: 'pt-BR', display: 'pt', tooltip: m.portuguese },
    { id: 'it', display: 'it', tooltip: m.italian },
    { id: 'es', display: 'es', tooltip: m.spanish },
  ];

  return (
    <div className={styles.radioInput}>
      {labels.map((lang, i) => (
        <React.Fragment key={lang.id}>
          <input
            className={`${styles.input} ${styles.radioCustom}`}
            type="radio"
            name="radio"
            id={lang.id}
            onChange={() => setLanguage(lang.id)}
            checked={language === lang.id}
            style={{ backgroundPosition: ballPos(i) }}
            readOnly={false}
          />
          <label
            htmlFor={lang.id}
            className={`${styles.radioCustomLabel} ${lang.id} btn hover:text-gray-300`}
          >{lang.display}
            <span className={styles.tooltipText}>{lang.tooltip}</span>
          </label>
          {i < labels.length - 1 && (
            <span className="w-px h-3 bg-white/20 mx-3 self-center" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageRadio;
