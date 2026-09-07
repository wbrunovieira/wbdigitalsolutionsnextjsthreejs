/** JSON-LD schema shapes accepted by <SchemaMarkup />. */

export interface OrganizationSchema {
  type: 'Organization';
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
  // Stable @id so other nodes (e.g. Person.worksFor) can reference this
  // Organization across separate JSON-LD blocks (consumers merge by @id).
  id?: string;
  founder?: { id: string; name: string };
  contactPoint?: {
    telephone: string;
    contactType: string;
    areaServed: string[];
    availableLanguage: string[];
  };
}

export interface PersonSchema {
  type: 'Person';
  id: string;
  name: string;
  url: string;
  jobTitle?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  // References the Organization node by @id (entity graph link).
  worksForId?: string;
}

export interface CollectionPageSchema {
  type: 'CollectionPage';
  name: string;
  description?: string;
  url: string;
  items: Array<{ name?: string; url: string }>;
}

export interface WebSiteSchema {
  type: 'WebSite';
  name: string;
  url: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

export interface ServiceSchema {
  type: 'Service';
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed?: string[];
  availableLanguage?: string[];
}

export interface BlogPostingSchema {
  type: 'BlogPosting';
  headline: string;
  description: string;
  image?: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: {
      url: string;
    };
  };
  mainEntityOfPage?: {
    id: string;
  };
}

export interface BreadcrumbSchema {
  type: 'BreadcrumbList';
  itemListElement: Array<{
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface FAQSchema {
  type: 'FAQPage';
  mainEntity: Array<{
    name: string;
    acceptedAnswer: {
      text: string;
    };
  }>;
}

export interface LocalBusinessSchema {
  type: 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  image?: string[];
}

export type SchemaType =
  | OrganizationSchema
  | PersonSchema
  | CollectionPageSchema
  | WebSiteSchema
  | ServiceSchema
  | BlogPostingSchema
  | BreadcrumbSchema
  | FAQSchema
  | LocalBusinessSchema;
