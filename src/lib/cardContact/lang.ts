import { CardLang } from '@/content/cardThankYou';

type Lang = CardLang;

// Resolve the visitor's language: explicit form `language` wins, then the
// browser's Accept-Language, then English.
export function resolveLang(bodyLang: unknown, acceptLanguage?: string): Lang {
  const norm = (v: string): Lang | null => {
    const s = v.toLowerCase();
    if (s.startsWith('pt')) return 'pt-BR';
    if (s.startsWith('es')) return 'es';
    if (s.startsWith('it')) return 'it';
    if (s.startsWith('en')) return 'en';
    return null;
  };
  if (typeof bodyLang === 'string') {
    const m = norm(bodyLang);
    if (m) return m;
  }
  if (acceptLanguage) {
    const first = acceptLanguage.split(',')[0]?.split(';')[0]?.trim();
    if (first) {
      const m = norm(first);
      if (m) return m;
    }
  }
  return 'en';
}
