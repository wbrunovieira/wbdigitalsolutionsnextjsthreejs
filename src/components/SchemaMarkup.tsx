import Head from 'next/head';

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

type SchemaType =
  | OrganizationSchema
  | PersonSchema
  | CollectionPageSchema
  | WebSiteSchema
  | ServiceSchema
  | BlogPostingSchema
  | BreadcrumbSchema
  | FAQSchema
  | LocalBusinessSchema;

interface SchemaMarkupProps {
  schemas: SchemaType[];
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schemas }) => {
  const generateSchema = (schema: SchemaType) => {
    const baseSchema = {
      '@context': 'https://schema.org',
    };

    switch (schema.type) {
      case 'Organization':
        return {
          ...baseSchema,
          '@type': 'Organization',
          '@id': schema.id,
          name: schema.name,
          url: schema.url,
          logo: schema.logo,
          description: schema.description,
          sameAs: schema.sameAs,
          founder: schema.founder ? {
            '@type': 'Person',
            '@id': schema.founder.id,
            name: schema.founder.name,
          } : undefined,
          contactPoint: schema.contactPoint ? {
            '@type': 'ContactPoint',
            telephone: schema.contactPoint.telephone,
            contactType: schema.contactPoint.contactType,
            areaServed: schema.contactPoint.areaServed,
            availableLanguage: schema.contactPoint.availableLanguage,
          } : undefined,
        };

      case 'Person':
        return {
          ...baseSchema,
          '@type': 'Person',
          '@id': schema.id,
          name: schema.name,
          url: schema.url,
          jobTitle: schema.jobTitle,
          sameAs: schema.sameAs,
          knowsAbout: schema.knowsAbout,
          worksFor: schema.worksForId ? {
            '@type': 'Organization',
            '@id': schema.worksForId,
          } : undefined,
        };

      case 'CollectionPage':
        return {
          ...baseSchema,
          '@type': 'CollectionPage',
          name: schema.name,
          description: schema.description,
          url: schema.url,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: schema.items.length,
            itemListElement: schema.items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: item.url,
              name: item.name,
            })),
          },
        };

      case 'WebSite':
        return {
          ...baseSchema,
          '@type': 'WebSite',
          name: schema.name,
          url: schema.url,
          potentialAction: schema.potentialAction ? {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: schema.potentialAction.target,
            },
            'query-input': schema.potentialAction.queryInput,
          } : undefined,
        };

      case 'Service':
        return {
          ...baseSchema,
          '@type': 'Service',
          name: schema.name,
          description: schema.description,
          provider: {
            '@type': 'Organization',
            name: schema.provider.name,
            url: schema.provider.url,
          },
          serviceType: schema.serviceType,
          areaServed: schema.areaServed,
          availableLanguage: schema.availableLanguage,
        };

      case 'BlogPosting':
        return {
          ...baseSchema,
          '@type': 'BlogPosting',
          headline: schema.headline,
          description: schema.description,
          image: schema.image,
          datePublished: schema.datePublished,
          dateModified: schema.dateModified || schema.datePublished,
          author: {
            '@type': 'Person',
            name: schema.author.name,
            url: schema.author.url,
          },
          publisher: {
            '@type': 'Organization',
            name: schema.publisher.name,
            logo: {
              '@type': 'ImageObject',
              url: schema.publisher.logo.url,
            },
          },
          mainEntityOfPage: schema.mainEntityOfPage ? {
            '@type': 'WebPage',
            '@id': schema.mainEntityOfPage.id,
          } : undefined,
        };

      case 'BreadcrumbList':
        return {
          ...baseSchema,
          '@type': 'BreadcrumbList',
          itemListElement: schema.itemListElement.map(item => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            item: item.item,
          })),
        };

      case 'FAQPage':
        return {
          ...baseSchema,
          '@type': 'FAQPage',
          mainEntity: schema.mainEntity.map(qa => ({
            '@type': 'Question',
            name: qa.name,
            acceptedAnswer: {
              '@type': 'Answer',
              text: qa.acceptedAnswer.text,
            },
          })),
        };

      case 'LocalBusiness':
        return {
          ...baseSchema,
          '@type': 'LocalBusiness',
          name: schema.name,
          description: schema.description,
          url: schema.url,
          telephone: schema.telephone,
          email: schema.email,
          image: schema.image,
          address: schema.address ? {
            '@type': 'PostalAddress',
            streetAddress: schema.address.streetAddress,
            addressLocality: schema.address.addressLocality,
            addressRegion: schema.address.addressRegion,
            postalCode: schema.address.postalCode,
            addressCountry: schema.address.addressCountry,
          } : undefined,
          geo: schema.geo ? {
            '@type': 'GeoCoordinates',
            latitude: schema.geo.latitude,
            longitude: schema.geo.longitude,
          } : undefined,
          openingHours: schema.openingHours,
          priceRange: schema.priceRange,
        };

      default:
        return baseSchema;
    }
  };

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape `<` so a literal "</script>" in any schema string can never
            // break out of the JSON-LD block (defense-in-depth; content is
            // author-controlled today, but this is the generic XSS sink).
            __html: JSON.stringify(generateSchema(schema)).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </Head>
  );
};

export default SchemaMarkup;