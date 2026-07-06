/**
 * Shared CV iconography data. Slimmed after CVTrackPage's removal: only the
 * language-flag map survives (used by both Languages sections; an emoji map is
 * page-agnostic data, like cv.ts content).
 */

/** Flag emoji per language code for the proficiency rows. */
export const LANG_FLAG: Record<'pt' | 'en' | 'it' | 'es', string> = {
  pt: '🇧🇷',
  en: '🇬🇧',
  it: '🇮🇹',
  es: '🇪🇸',
};
