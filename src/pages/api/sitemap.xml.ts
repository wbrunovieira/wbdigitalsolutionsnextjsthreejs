import { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://www.wbdigitalsolutions.com';
const LANGUAGES = ['en', 'es', 'it', 'pt-BR'];

// Static pages that exist in the application
const STATIC_PAGES = [
  '',  // Homepage
  'ai',
  'automation',
  'blog',
  'contact',
  'websites',
  'systems',
];

// Blog posts (you can fetch these dynamically from a database in production)
const BLOG_POSTS = [
  'do-i-need-a-website',
  'how-emotional-design-can',
  'digital-can-transform-company',
  'chatgpt-for-smes',
];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  alternates?: Array<{ lang: string; href: string }>;
}

const generateSitemapUrl = (
  path: string,
  changefreq: string = 'weekly',
  priority: number = 0.8,
  includeLanguages: boolean = true
): SitemapUrl[] => {
  const urls: SitemapUrl[] = [];
  const lastmod = new Date().toISOString().split('T')[0];

  if (includeLanguages) {
    // Generate URLs for each language
    LANGUAGES.forEach(lang => {
      const langPath = lang === 'en' ? path : `/${lang}${path}`;
      const url: SitemapUrl = {
        loc: `${SITE_URL}${langPath}`,
        lastmod,
        changefreq,
        priority,
        alternates: LANGUAGES.map(altLang => ({
          lang: altLang,
          href: `${SITE_URL}${altLang === 'en' ? path : `/${altLang}${path}`}`,
        })),
      };
      urls.push(url);
    });
  } else {
    // Single URL without language variations
    urls.push({
      loc: `${SITE_URL}${path}`,
      lastmod,
      changefreq,
      priority,
    });
  }

  return urls;
};

const generateXmlUrl = (url: SitemapUrl): string => {
  let xml = `  <url>\n`;
  xml += `    <loc>${url.loc}</loc>\n`;
  xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xml += `    <priority>${url.priority}</priority>\n`;
  
  // Add hreflang tags for language alternates
  if (url.alternates) {
    url.alternates.forEach(alt => {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>\n`;
    });
    // Add x-default for the main language (English)
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${url.loc.replace(SITE_URL, '').replace(/^\/(es|it|pt-BR)/, '')}"/>\n`;
  }
  
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
    const priority = page === 'blog' ? 0.9 : 0.8;
    urls.push(...generateSitemapUrl(`/${page}`, changefreq, priority));
  });

  // Add blog posts
  BLOG_POSTS.forEach(post => {
    urls.push(...generateSitemapUrl(`/blog/${post}`, 'monthly', 0.7));
  });

  // Generate XML
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