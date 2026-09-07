'use client';

import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/router';
import SchemaMarkup from './SchemaMarkup';
import MetaTags from './head/MetaTags';
import { buildPageSchemas } from './head/buildPageSchemas';
import { PageHeadProps } from './head/pageHeadTypes';
import { usePageViewTracking } from './head/usePageViewTracking';
import { SITE_BASE_URL, buildSeoUrls, defaultOgImage } from '@/lib/seoUrls';

const PageHead: React.FC<PageHeadProps> = ({
  pageKey,
  dynamicTitle,
  customTitle,
  customDescription,
  customImage,
  canonicalPath,
  blogPost,
  collection,
}) => {
  const t = useTranslations();
  const { language } = useLanguage();
  const router = useRouter();

  // Typed lookup for dynamic meta keys (metaTitle_<pageKey> etc.) on the
  // locale messages; non-string/missing values fall through like before.
  const metaString = (key: string): string | undefined => {
    const value = (t as Record<string, unknown>)[key];
    return typeof value === 'string' ? value : undefined;
  };

  // Title priority: customTitle > dynamicTitle > localized pageKey > default
  const title =
    customTitle ||
    dynamicTitle ||
    (pageKey && metaString(`metaTitle_${pageKey}`)) ||
    t.metaTitle ||
    'WB Digital Solutions';

  const descriptionKey = pageKey ? `metaDescription_${pageKey}` : 'metaDescription';
  const description = customDescription || metaString(descriptionKey) || t.metaDescription || '';

  const keywordsKey = pageKey ? `metaKeywords_${pageKey}` : 'metaKeywords';
  const keywords = metaString(keywordsKey) || t.metaKeywords || '';

  usePageViewTracking(title, router.asPath);

  // Locale-aware URLs: canonical is the SELF locale URL (router.asPath has
  // no locale prefix under built-in i18n, so the prefix is added here).
  const { canonicalUrl, hreflangs, ogLocale, ogLocaleAlternates } =
    buildSeoUrls(router.locale ?? router.defaultLocale, canonicalPath ?? router.asPath);

  // Explicit social image when provided (e.g. project screenshots), else the
  // page's own localized card (og-<pageKey>[-<locale>].jpg, home as fallback).
  // NOTE: og/twitter images must be raster (JPG/PNG) — social platforms do
  // not render SVG, so the brand SVG logo would show no preview.
  const ogImage = customImage
    ? (customImage.startsWith('http') ? customImage : `${SITE_BASE_URL}${customImage}`)
    : defaultOgImage(pageKey, router.locale ?? router.defaultLocale);

  const schemas = buildPageSchemas({ pageKey, language, canonicalUrl, blogPost, collection });

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <MetaTags
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        ogLocale={ogLocale}
        ogLocaleAlternates={ogLocaleAlternates}
        hreflangs={hreflangs}
      />
    </>
  );
};

export default PageHead;
