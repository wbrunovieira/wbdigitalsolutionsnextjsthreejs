import {
  getBlogPostSchema,
  getBreadcrumbSchema,
  getCollectionPageSchema,
  getLocalBusinessSchema,
  getOrganizationSchema,
  getPersonSchema,
  getServiceSchema,
  getWebSiteSchema,
} from '@/utils/schemaHelpers';
import { SITE_BASE_URL } from '@/lib/seoUrls';
import { SchemaType } from '@/types/schema';
import { BlogPostMeta, CollectionMeta } from './pageHeadTypes';

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
  'privacy-policy': 'Privacy Policy',
};

interface SchemaContext {
  pageKey?: string;
  language: string;
  canonicalUrl: string;
  blogPost?: BlogPostMeta;
  collection?: CollectionMeta;
}

/** Assembles the JSON-LD blocks this page should emit. */
export const buildPageSchemas = ({
  pageKey, language, canonicalUrl, blogPost, collection,
}: SchemaContext): SchemaType[] => {
  const baseUrl = SITE_BASE_URL;
  const schemas: SchemaType[] = [];

  // Organization + founder Person + WebSite + LocalBusiness on the homepage
  if (!pageKey || pageKey === 'home') {
    schemas.push(getOrganizationSchema(language), getWebSiteSchema(language));
    schemas.push(getLocalBusinessSchema(language));
    schemas.push(getPersonSchema(language));
  }

  // CollectionPage + ItemList for listing pages (blog, projects)
  if (collection) {
    schemas.push(getCollectionPageSchema(
      collection.name, collection.description, collection.url, collection.items,
    ));
  }

  const serviceName = pageKey ? SERVICE_NAME_BY_PAGE[pageKey] : undefined;
  if (serviceName) {
    schemas.push(getServiceSchema(serviceName, serviceName, language));
  }

  if (blogPost) {
    schemas.push(getBlogPostSchema(
      blogPost.title, blogPost.description, blogPost.author,
      blogPost.datePublished, canonicalUrl, blogPost.images, blogPost.dateModified,
    ));
  }

  // Breadcrumbs everywhere except the homepage
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

  return schemas;
};
