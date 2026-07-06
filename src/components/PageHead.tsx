'use client';

import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SchemaMarkup from './SchemaMarkup';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getBlogPostSchema,
  getLocalBusinessSchema,
} from '@/utils/schemaHelpers';
import { SITE_BASE_URL, buildSeoUrls, defaultOgImage } from '@/lib/seoUrls';

/** JSON-LD Service schema name per service page key. */
const SERVICE_NAME_BY_PAGE: Record<string, string> = {
  websites: 'Web Development', automation: 'Digital Automation',
  ai: 'Artificial Intelligence', systems: 'Custom Systems',
  experience: '3D Experience Platform',
};

/** Breadcrumb label per page key (URL segment equals the page key). */
const BREADCRUMB_LABEL_BY_PAGE: Record<string, string> = {
  contact: 'Contact', websites: 'Websites', automation: 'Automation',
  ai: 'AI', systems: 'Systems', experience: '3D Experience',
};

interface PageHeadProps {
  pageKey?: string;
  dynamicTitle?: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  blogPost?: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    images?: string[];
  };
}

const PageHead: React.FC<PageHeadProps> = ({
  pageKey,
  dynamicTitle,
  customTitle,
  customDescription,
  customImage,
  blogPost,
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

  // Get description based on page
  const descriptionKey = pageKey ? `metaDescription_${pageKey}` : 'metaDescription';
  const description = customDescription || metaString(descriptionKey) || t.metaDescription || '';

  // Get keywords based on page
  const keywordsKey = pageKey ? `metaKeywords_${pageKey}` : 'metaKeywords';
  const keywords = metaString(keywordsKey) || t.metaKeywords || '';

  // Track page view when title is set
  useEffect(() => {
    // window.gtag is typed by the global Window augmentation in CookieConsent.tsx.
    if (typeof window !== 'undefined' && window.gtag && title) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.gtag?.('event', 'page_view', {
          page_title: title,
          page_location: window.location.href,
          page_path: router.asPath,
          send_to: 'G-PZ3WX1KF35',
        });
      }, 0);
    }
  }, [title, router.asPath]);

  // Locale-aware URLs: canonical is the SELF locale URL (router.asPath has
  // no locale prefix under built-in i18n, so the prefix is added here).
  const baseUrl = SITE_BASE_URL;
  const { canonicalUrl, hreflangs, ogLocale, ogLocaleAlternates } =
    buildSeoUrls(router.locale ?? router.defaultLocale, router.asPath);

  // Explicit social image when provided (e.g. project screenshots), else the
  // page's own localized card (og-<pageKey>[-<locale>].jpg, home as fallback).
  // NOTE: og/twitter images must be raster (JPG/PNG) — social platforms do
  // not render SVG, so the brand SVG logo would show no preview.
  const ogImage = customImage
    ? (customImage.startsWith('http') ? customImage : `${baseUrl}${customImage}`)
    : defaultOgImage(pageKey, router.locale ?? router.defaultLocale);

  // Generate schemas based on page type
  const schemas = [];
  
  // Add Organization schema on homepage
  if (!pageKey || pageKey === 'home') {
    schemas.push(getOrganizationSchema(language), getWebSiteSchema(language));
    schemas.push(getLocalBusinessSchema(language));
  }

  // Add Service schema for service pages
  const serviceName = pageKey ? SERVICE_NAME_BY_PAGE[pageKey] : undefined;
  if (serviceName) {
    schemas.push(getServiceSchema(serviceName, serviceName, language));
  }

  // Add BlogPosting schema for blog posts
  if (blogPost) {
    schemas.push(getBlogPostSchema(
      blogPost.title, blogPost.description, blogPost.author,
      blogPost.datePublished, canonicalUrl, blogPost.images,
    ));
  }

  // Add Breadcrumb schema for all pages except homepage
  if (pageKey && pageKey !== 'home') {
    const breadcrumbItems = [{ name: 'Home', url: baseUrl }];

    if (pageKey === 'blog') {
      breadcrumbItems.push({ name: 'Blog', url: `${baseUrl}/blog` });
    } else if (blogPost) {
      breadcrumbItems.push(
        { name: 'Blog', url: `${baseUrl}/blog` },
        { name: blogPost.title, url: canonicalUrl },
      );
    } else if (BREADCRUMB_LABEL_BY_PAGE[pageKey]) {
      breadcrumbItems.push({
        name: BREADCRUMB_LABEL_BY_PAGE[pageKey],
        url: `${baseUrl}/${pageKey}`,
      });
    }

    schemas.push(getBreadcrumbSchema(breadcrumbItems, language));
  }

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Head>
      {/* Core Meta Tags */}
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Bruno Vieira" />
      <meta name="copyright" content="WB Digital Solutions" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={ogLocale} />
      {ogLocaleAlternates.map((altLocale) => (
        <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wbdigitalsolutions" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/img/favicon.png" />

      {/* Full hreflang matrix: every page exists per locale (built-in Next
          i18n), so each alternate points at that locale's URL for the same
          path; x-default points at the unprefixed en URL. */}
      {hreflangs.map(({ hrefLang, href }) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}
      </Head>
    </>
  );
};

export default PageHead;