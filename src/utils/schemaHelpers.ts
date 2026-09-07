import { getDescription, getFounderJobTitle, getServiceDescription } from '@/content/schemaCopy';
import {
  OrganizationSchema,
  PersonSchema,
  CollectionPageSchema,
  WebSiteSchema,
  ServiceSchema,
  BlogPostingSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
} from '@/types/schema';

const SITE_URL = 'https://www.wbdigitalsolutions.com';
// Raster on purpose: Google rejects SVG for Organization/publisher logo.
const LOGO_URL = `${SITE_URL}/img/logo.png`;
const COMPANY_NAME = 'WB Digital Solutions';

// Stable entity-graph anchors: the Organization and its founder are referenced
// by @id across separate JSON-LD blocks so consumers (Google, LLMs) merge them
// into one linked entity.
const ORG_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#founder`;
const FOUNDER_NAME = 'Walter Bruno Prado Vieira';

/** Schema.org requires absolute URLs; post JSONs store site-relative paths. */
const toAbsoluteUrl = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

export const getOrganizationSchema = (language: string): OrganizationSchema => ({
  type: 'Organization',
  name: COMPANY_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description: getDescription(language, 'organization'),
  // The year the company itself started, as the sales CV timeline states in all
  // four locales. NOT Bruno's career start (1987) - that belongs to the Person.
  foundingDate: '2023',
  id: ORG_ID,
  founder: { id: FOUNDER_ID, name: FOUNDER_NAME },
  // Must match the profiles the site itself links to (see Footer.tsx): these
  // are what Google uses to tie the entity to its social accounts. The old
  // dot-less handles pointed at accounts that do not exist.
  sameAs: [
    'https://www.linkedin.com/company/wb-digital-solutions',
    'https://www.instagram.com/wb.digitalsolutions/',
    'https://www.facebook.com/wb.digitalsolutions',
    'https://www.youtube.com/@wbdigitalsolutions',
    'https://www.tiktok.com/@wb.digitalsolutions',
  ],
  contactPoint: {
    telephone: '+55-11-5026-4203',
    contactType: 'customer service',
    areaServed: ['BR', 'US', 'ES', 'IT'],
    availableLanguage: ['Portuguese', 'English', 'Spanish', 'Italian'],
  },
});

// Founder entity (Bruno). sameAs corroborates authority via his personal
// profiles and the two CV subdomains; worksFor links back to the Organization.
export const getPersonSchema = (language: string): PersonSchema => ({
  type: 'Person',
  id: FOUNDER_ID,
  name: FOUNDER_NAME,
  url: SITE_URL,
  jobTitle: getFounderJobTitle(language),
  worksForId: ORG_ID,
  sameAs: [
    'https://www.linkedin.com/in/walter-bruno-vieira',
    'https://github.com/wbrunovieira',
    'https://brunodev.wbdigitalsolutions.com',
    'https://brunov.wbdigitalsolutions.com',
  ],
  knowsAbout: [
    'Web Development', 'Artificial Intelligence', 'AI Agents', 'RAG',
    'TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'Python', 'Go',
    'Rust', 'Three.js', 'WebGL', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes',
    'Automation', 'Software Architecture',
  ],
});

export const getCollectionPageSchema = (
  name: string,
  description: string | undefined,
  url: string,
  items: Array<{ name?: string; url: string }>,
): CollectionPageSchema => ({
  type: 'CollectionPage',
  name,
  description,
  url,
  items,
});

// `_language` is unused (no localized content here) but kept for signature
// parity with the other schema getters; callers pass the active language.
export const getWebSiteSchema = (_language: string): WebSiteSchema => ({
  type: 'WebSite',
  name: COMPANY_NAME,
  url: SITE_URL,
  potentialAction: {
    target: `${SITE_URL}/search?q={search_term_string}`,
    queryInput: 'required name=search_term_string',
  },
});

export const getLocalBusinessSchema = (language: string): LocalBusinessSchema => ({
  type: 'LocalBusiness',
  name: COMPANY_NAME,
  description: getDescription(language, 'business'),
  url: SITE_URL,
  telephone: '+55-11-5026-4203',
  email: 'bruno@wbdigitalsolutions.com',
  address: {
    addressCountry: 'BR',
    addressRegion: 'SP',
    addressLocality: 'São Paulo',
  },
  priceRange: '$$',
  image: [`${SITE_URL}/img/og-home.jpg`, LOGO_URL],
});

export const getServiceSchema = (
  serviceName: string, 
  serviceType: string, 
  language: string,
): ServiceSchema => ({
  type: 'Service',
  name: serviceName,
  description: getServiceDescription(language, serviceType),
  provider: {
    name: COMPANY_NAME,
    url: SITE_URL,
  },
  serviceType: serviceType,
  areaServed: ['BR', 'US', 'ES', 'IT'],
  availableLanguage: ['Portuguese', 'English', 'Spanish', 'Italian'],
});

export const getBlogPostSchema = (
  title: string,
  description: string,
  author: string,
  datePublished: string,
  url: string,
  images?: string[],
  dateModified?: string,
): BlogPostingSchema => ({
  type: 'BlogPosting',
  headline: title,
  description: description,
  image: images?.length ? images.map(toAbsoluteUrl) : [`${SITE_URL}/img/blog-default.jpg`],
  datePublished: datePublished,
  // Use the post's real dateModified when provided; fall back to the publish
  // date. (Previously new Date() made every post look "updated" on each build.)
  dateModified: dateModified || datePublished,
  author: {
    name: author || 'WB Digital Solutions Team',
    url: SITE_URL,
  },
  publisher: {
    name: COMPANY_NAME,
    logo: {
      url: LOGO_URL,
    },
  },
  mainEntityOfPage: {
    id: url,
  },
});

// `_language` is unused (item names arrive already localized) but kept for
// signature parity with the other schema getters.
export const getBreadcrumbSchema = (
  items: Array<{ name: string; url?: string }>,
  _language: string,
): BreadcrumbSchema => ({
  type: 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
