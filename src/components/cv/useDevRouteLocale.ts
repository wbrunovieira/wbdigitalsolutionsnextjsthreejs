import { useEffect, useMemo } from 'react';
import type { CVLang } from '@/content/cv';
import { SLUG } from '@/content/devCvSeo';

const URL_RECHECK_TRIES = 10;
const URL_RECHECK_MS = 100;

/**
 * Pins the DEV CV page to the locale in its URL:
 * - persists it for the main site's "continue in your language" hint,
 * - re-asserts the locale path Next's client router keeps erasing,
 * - and returns the LanguageContext value the CV components consume.
 */
export const useDevRouteLocale = (lang: CVLang) => {
  // Write localStorage directly: the global setLanguage now NAVIGATES
  // (router.push with a locale), and on this subdomain router.locale is always
  // the internal 'en', so calling it fired on every non-en page and looped the
  // UI (rapid language flicker).
  useEffect(() => {
    try {
      localStorage.setItem('language', lang);
    } catch {
      /* storage unavailable (private mode) */
    }
  }, [lang]);

  // Built-in Next i18n treats the subdomain's locale prefix (/pt /it /es) as a
  // locale and, since the client router can't see the edge host-rewrite, it
  // reconciles the URL back to '/' on hydration, erasing the locale. Re-assert
  // the intended URL with a raw replaceState (no router nav, so it can't
  // re-trigger the reconciliation); a short re-check window beats Next's async
  // pass, then stops. The root locale (SLUG '') is already correct.
  useEffect(() => {
    const want = SLUG[lang];
    if (!want) return;
    if (window.location.pathname.startsWith('/dev')) return; // internal www/localhost path
    let tries = 0;
    let id = 0;
    const restore = () => {
      if (window.location.pathname !== want) {
        window.history.replaceState(window.history.state, '', want + window.location.search + window.location.hash);
      }
      if (++tries < URL_RECHECK_TRIES) id = window.setTimeout(restore, URL_RECHECK_MS);
    };
    id = window.setTimeout(restore, 0);
    return () => window.clearTimeout(id);
  }, [lang]);

  // Switching languages navigates to the sibling URL with a full load so the
  // subdomain host-rewrites resolve.
  return useMemo(
    () => ({
      language: lang as string,
      isLoaded: true,
      setLanguage: (l: string) => {
        try {
          localStorage.setItem('language', l);
        } catch {
          /* storage unavailable (private mode) */
        }
        const base = window.location.pathname.startsWith('/dev') ? '/dev' : '';
        window.location.assign(base + SLUG[(l as CVLang) ?? 'en'] || '/');
      },
    }),
    // Deps intentionally limited to lang: the provider value must stay stable
    // across globalLang identity changes.
    [lang],
  );
};
