import React from 'react';
import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage: string;
  ogLocale: string;
  ogLocaleAlternates: string[];
  hreflangs: { hrefLang: string; href: string }[];
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title, description, keywords, canonicalUrl, ogImage, ogLocale, ogLocaleAlternates, hreflangs,
}) => (
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
);

export default MetaTags;
