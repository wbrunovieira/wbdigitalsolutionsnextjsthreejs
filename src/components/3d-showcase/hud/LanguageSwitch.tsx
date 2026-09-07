import React from 'react';

const LANGS: { code: string; label: string; matches: (current: string) => boolean }[] = [
  { code: 'en', label: 'EN', matches: (c) => c === 'en' },
  { code: 'pt-BR', label: 'PT', matches: (c) => c === 'pt-BR' || c === 'pt' },
  { code: 'es', label: 'ES', matches: (c) => c === 'es' },
  { code: 'it', label: 'IT', matches: (c) => c === 'it' },
];

interface LanguageSwitchProps {
  language: string;
  setLanguage: (code: string) => void;
  isMobile: boolean;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ language, setLanguage, isMobile }) => (
  <div className={`absolute z-50 flex gap-1 ${isMobile ? 'top-2 right-2' : 'top-4 left-1/2 transform -translate-x-1/2'}`}>
    {LANGS.map(({ code, label, matches }) => (
      <button
        key={code}
        onClick={() => setLanguage(code)}
        aria-pressed={matches(language)}
        className={`${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'} rounded ${matches(language) ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default LanguageSwitch;
