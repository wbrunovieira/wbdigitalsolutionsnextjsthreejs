import { NextApiRequest, NextApiResponse } from 'next';
import { PROJECT_DETAILS } from '@/data/projectDetails';

const SITE_URL = 'https://www.wbdigitalsolutions.com';

// URL locales served by Next.js built-in i18n routing.
// The default locale (en) lives at the unprefixed root; the others are
// path-prefixed (/pt, /it, /es). hreflang uses the full language tags
// (pt-BR for /pt), matching public/sitemap-brunodev.xml.
const URL_LOCALES = [
  { prefix: '', hreflang: 'en' },
  { prefix: '/pt', hreflang: 'pt-BR' },
  { prefix: '/it', hreflang: 'it' },
  { prefix: '/es', hreflang: 'es' },
] as const;

// Static pages that exist in the application
const STATIC_PAGES = [
  '',  // Homepage
  'ai',
  'automation',
  'projects',
  'blog',
  'contact',
  'websites',
  'systems',
];

// Project detail pages (/projects/[slug]) — kept in sync with projectDetails.ts
const PROJECT_SLUGS = Object.keys(PROJECT_DETAILS);

// Blog posts (you can fetch these dynamically from a database in production)
const BLOG_POSTS = [
  'do-i-need-a-website',
  'how-emotional-design-can',
  'digital-can-transform-company',
  'chatgpt-for-smes',
  'increase-pme-sales',
];

interface HreflangAlternate {
  hreflang: string;
  href: string;
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  alternates: HreflangAlternate[];
}

// Every page now exists at 4 URLs (en unprefixed + /pt + /it + /es), so we
// emit one <url> entry per locale, each carrying the full set of xhtml:link
// hreflang alternates plus x-default pointing at the en URL.
const buildAlternates = (path: string): HreflangAlternate[] => {
  const alternates: HreflangAlternate[] = URL_LOCALES.map(locale => ({
    hreflang: locale.hreflang,
    href: `${SITE_URL}${locale.prefix}${path}`,
  }));
  alternates.push({ hreflang: 'x-default', href: `${SITE_URL}${path}` });
  return alternates;
};

const generateSitemapUrl = (
  path: string,
  changefreq: string = 'weekly',
  priority: number = 0.8
): SitemapUrl[] => {
  const lastmod = new Date().toISOString().split('T')[0];
  const alternates = buildAlternates(path);
  return URL_LOCALES.map(locale => ({
    loc: `${SITE_URL}${locale.prefix}${path}`,
    lastmod,
    changefreq,
    priority,
    alternates,
  }));
};

const generateXmlUrl = (url: SitemapUrl): string => {
  let xml = `  <url>\n`;
  xml += `    <loc>${url.loc}</loc>\n`;
  xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xml += `    <priority>${url.priority}</priority>\n`;
  url.alternates.forEach(alt => {
    xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>\n`;
  });
  xml += `  </url>\n`;
  return xml;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const urls: SitemapUrl[] = [];

  // Add homepage with highest priority
  urls.push(...generateSitemapUrl('', 'daily', 1.0));

  // Add static pages
  STATIC_PAGES.slice(1).forEach(page => {
    const changefreq = page === 'blog' ? 'daily' : page === 'contact' ? 'monthly' : 'weekly';
    const priority = page === 'blog' ? 0.9 : page === 'projects' ? 0.9 : 0.8;
    urls.push(...generateSitemapUrl(`/${page}`, changefreq, priority));
  });

  // Add project detail pages
  PROJECT_SLUGS.forEach(slug => {
    urls.push(...generateSitemapUrl(`/projects/${slug}`, 'monthly', 0.7));
  });

  // Add blog posts
  BLOG_POSTS.forEach(post => {
    urls.push(...generateSitemapUrl(`/blog/${post}`, 'monthly', 0.7));
  });

  // Generate XML (xhtml namespace required for the hreflang alternates)
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  urls.forEach(url => {
    xml += generateXmlUrl(url);
  });

  xml += '</urlset>';

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  res.status(200).send(xml);
}
