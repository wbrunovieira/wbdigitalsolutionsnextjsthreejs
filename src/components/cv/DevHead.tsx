import React from 'react';
import Head from 'next/head';
import type { CVLang } from '@/content/cv';
import { BASE, OG_IMG, OG_LOCALE, SEO, SLUG } from '@/content/devCvSeo';

/** All head tags for the DEV CV page (it bypasses Layout/PageHead entirely). */
const DevHead: React.FC<{ lang: CVLang }> = ({ lang }) => {
  const seo = SEO[lang];
  const canonical = `${BASE}${SLUG[lang]}`;

  return (
    <Head>
      {/* CV pages bypass Layout/PageHead, so the full viewport meta must be
          set here; Next's default lacks initial-scale and Safari renders
          the page zoomed-out without it. */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* SSR-inline background: kills the WB purple flash (global.css paints
          html #350545 + a body gradient and can land AFTER this style in
          the cascade, hence the !important). */}
      <style dangerouslySetInnerHTML={{ __html: 'html,body{background:#0e0e11!important}' }} />
      <link rel="icon" type="image/svg+xml" href="/favicon-dev.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-dev-32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-dev.png" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />
      {/* hreflang matrix: every locale URL lists all versions + x-default */}
      {(Object.keys(SLUG) as CVLang[]).map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${BASE}${SLUG[l]}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={BASE} />
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${BASE}${OG_IMG[lang]}`} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {(Object.keys(OG_LOCALE) as CVLang[])
        .filter((l) => l !== lang)
        .map((l) => (
          <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
        ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${BASE}${OG_IMG[lang]}`} />
    </Head>
  );
};

export default DevHead;
