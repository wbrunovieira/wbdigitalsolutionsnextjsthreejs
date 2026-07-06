/**
 * URL-locale plumbing for the site-wide i18n migration (built-in Next i18n).
 *
 * URL locales are short (/pt, /it, /es; root = en) while the app language
 * codes keep the legacy values used across contexts and content Records
 * ("pt-BR" etc.), so everything meets at these two maps.
 *
 * `makeI18nStaticProps()` is the one-liner every static page adds so Next
 * prerenders it PER LOCALE with the right messages available during SSR
 * (pages without getStaticProps are only prerendered for the default locale,
 * and the old client-side message loading left crawlers seeing EN only).
 */

import type { GetStaticProps } from 'next';
import type { MessageFormat } from '@/types/messages';

export const URL_LOCALES = ['en', 'pt', 'it', 'es'] as const;
export type UrlLocale = (typeof URL_LOCALES)[number];

export const DEFAULT_URL_LOCALE: UrlLocale = 'en';

const URL_TO_APP: Record<UrlLocale, string> = {
  en: 'en',
  pt: 'pt-BR',
  it: 'it',
  es: 'es',
};

const APP_TO_URL: Record<string, UrlLocale> = {
  en: 'en',
  'pt-BR': 'pt',
  pt: 'pt',
  it: 'it',
  es: 'es',
};

/** hreflang values per URL locale (pt URL advertises pt-BR content). */
export const HREFLANG_BY_URL_LOCALE: Record<UrlLocale, string> = {
  en: 'en',
  pt: 'pt-BR',
  it: 'it',
  es: 'es',
};

const LOCALE_FILE: Record<UrlLocale, string> = {
  en: 'en',
  pt: 'ptbr',
  it: 'it',
  es: 'es',
};

export const toAppLang = (urlLocale: string | undefined): string =>
  URL_TO_APP[(urlLocale as UrlLocale) ?? DEFAULT_URL_LOCALE] ?? 'en';

export const toUrlLocale = (appLang: string): UrlLocale =>
  APP_TO_URL[appLang] ?? DEFAULT_URL_LOCALE;

export type I18nPageProps = {
  i18n: { messages: MessageFormat; appLang: string };
};

/** Server-side message loading for a URL locale (getStaticProps context). */
export async function loadMessages(urlLocale: string | undefined): Promise<MessageFormat> {
  const file = LOCALE_FILE[(urlLocale as UrlLocale) ?? DEFAULT_URL_LOCALE] ?? 'en';
  return (await import(`@/locales/${file}.json`)).default as MessageFormat;
}

/**
 * Standard getStaticProps for pages with no data needs of their own:
 * `export const getStaticProps = makeI18nStaticProps();`
 * Pages with existing props should instead spread `await i18nProps(locale)`
 * into their own props object.
 */
export async function i18nProps(urlLocale: string | undefined): Promise<I18nPageProps> {
  return { i18n: { messages: await loadMessages(urlLocale), appLang: toAppLang(urlLocale) } };
}

export function makeI18nStaticProps(): GetStaticProps<I18nPageProps> {
  return async ({ locale }) => ({ props: await i18nProps(locale) });
}
