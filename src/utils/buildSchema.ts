import { SchemaType } from '@/types/schema';

/** Maps one typed schema entry to its JSON-LD object. */
export const generateSchema = (schema: SchemaType) => {
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
        foundingDate: schema.foundingDate,
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
