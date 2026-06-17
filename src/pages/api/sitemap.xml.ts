import { NextApiRequest, NextApiResponse } from 'next';
import { PROJECT_DETAILS } from '@/data/projectDetails';

const SITE_URL = 'https://www.wbdigitalsolutions.com';

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
  'experience',
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

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

// The site serves every language from a single URL (client-side i18n), so we
// emit ONE canonical URL per page — no /es, /it, /pt-BR variants (those routes
// don't exist → 404) and no hreflang (which requires distinct per-language URLs).
const generateSitemapUrl = (
  path: string,
  changefreq: string = 'weekly',
  priority: number = 0.8
): SitemapUrl[] => {
  const lastmod = new Date().toISOString().split('T')[0];
  return [
    {
      loc: `${SITE_URL}${path}`,
      lastmod,
      changefreq,
      priority,
    },
  ];
};

const generateXmlUrl = (url: SitemapUrl): string => {
  let xml = `  <url>\n`;
  xml += `    <loc>${url.loc}</loc>\n`;
  xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xml += `    <priority>${url.priority}</priority>\n`;
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

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += generateXmlUrl(url);
  });
  
  xml += '</urlset>';

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  res.status(200).send(xml);
}