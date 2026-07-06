/**
 * Pure URL builders for locale-aware SEO head tags (canonical, hreflang,
 * og:locale). Framework-free so they stay unit-testable.
 *
 * URL scheme (built-in Next i18n): default locale (en) lives at the root,
 * other locales are prefixed (/pt, /it, /es). hreflang values come from
 * HREFLANG_BY_URL_LOCALE (the /pt URLs advertise pt-BR content).
 */

import {
  URL_LOCALES,
  DEFAULT_URL_LOCALE,
  HREFLANG_BY_URL_LOCALE,
  type UrlLocale,
} from '@/lib/i18n';

export const SITE_BASE_URL = 'https://www.wbdigitalsolutions.com';

/** Open Graph territory locales per URL locale. */
export const OG_LOCALE_BY_URL_LOCALE: Record<UrlLocale, string> = {
  en: 'en_US',
  pt: 'pt_BR',
  it: 'it_IT',
  es: 'es_ES',
};

const isUrlLocale = (value: string): value is UrlLocale =>
  (URL_LOCALES as readonly string[]).includes(value);

/** Pages that have their own localized og card set (og-<key>[-<locale>].jpg). */
const OG_CARD_KEYS = new Set([
  'home',
  'websites',
  'systems',
  'ai',
  'automation',
  'projects',
  'contact',
  'blog',
  'newsletter',
]);

/** Localized default social image: the page's own card when it has one,
    else the home card, always in the URL's language. */
export function defaultOgImage(pageKey: string | undefined, routerLocale: string | undefined): string {
  const locale = routerLocale && isUrlLocale(routerLocale) ? routerLocale : DEFAULT_URL_LOCALE;
  const key = pageKey && OG_CARD_KEYS.has(pageKey) ? pageKey : 'home';
  const suffix = locale === DEFAULT_URL_LOCALE ? '' : `-${locale}`;
  return `${SITE_BASE_URL}/img/og-${key}${suffix}.jpg`;
}

/** Normalize a router.asPath to a clean path: no query string, no hash. */
export function stripQueryAndHash(asPath: string): string {
  return asPath.split(/[?#]/)[0] || '/';
}

/** Coerce router.locale (possibly undefined) to a known URL locale. */
export function normalizeUrlLocale(locale: string | undefined): UrlLocale {
  return locale && isUrlLocale(locale) ? locale : DEFAULT_URL_LOCALE;
}

/**
 * Absolute URL of `asPath` in a given locale. The default locale is
 * unprefixed; others get a /<locale> prefix. The root path collapses so
 * prefixed homes have no trailing slash ('/pt', never '/pt/').
 */
export function localeUrl(locale: UrlLocale, asPath: string): string {
  const prefix = locale === DEFAULT_URL_LOCALE ? '' : `/${locale}`;
  const path = stripQueryAndHash(asPath);
  const url = `${SITE_BASE_URL}${prefix}${path === '/' ? '' : path}`;
  return url === SITE_BASE_URL ? `${SITE_BASE_URL}/` : url;
}

export interface SeoUrls {
  canonicalUrl: string;
  hreflangs: { hrefLang: string; href: string }[];
  ogLocale: string;
  ogLocaleAlternates: string[];
}

/** Everything PageHead needs for locale-aware URLs, from router state. */
export function buildSeoUrls(
  routerLocale: string | undefined,
  asPath: string,
): SeoUrls {
  const locale = normalizeUrlLocale(routerLocale);
  return {
    // Canonical is always the SELF locale URL (never cross-locale).
    canonicalUrl: localeUrl(locale, asPath),
    // Full alternate matrix: one entry per locale + x-default -> en root.
    hreflangs: [
      ...URL_LOCALES.map((l) => ({
        hrefLang: HREFLANG_BY_URL_LOCALE[l],
        href: localeUrl(l, asPath),
      })),
      { hrefLang: 'x-default', href: localeUrl(DEFAULT_URL_LOCALE, asPath) },
    ],
    ogLocale: OG_LOCALE_BY_URL_LOCALE[locale],
    ogLocaleAlternates: URL_LOCALES.filter((l) => l !== locale).map(
      (l) => OG_LOCALE_BY_URL_LOCALE[l],
    ),
  };
}
