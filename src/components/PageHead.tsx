"use client";

import { useTranslations } from "@/contexts/TranslationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SchemaMarkup from "./SchemaMarkup";
import { 
  getOrganizationSchema, 
  getWebSiteSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getBlogPostSchema,
  getLocalBusinessSchema
} from "@/utils/schemaHelpers";

interface PageHeadProps {
  pageKey?: string;
  dynamicTitle?: string;
  customTitle?: string;
  blogPost?: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    images?: string[];
  };
}

const PageHead: React.FC<PageHeadProps> = ({ 
  pageKey, 
  dynamicTitle,
  customTitle,
  blogPost 
}) => {
  const t = useTranslations();
  const { language } = useLanguage();
  const router = useRouter();

  // Determine the title based on priority: customTitle > dynamicTitle > pageKey > default
  let title = "";
  
  if (customTitle) {
    title = customTitle;
  } else if (dynamicTitle) {
    title = dynamicTitle;
  } else if (pageKey) {
    // Look for specific page title translation
    const titleKey = `metaTitle_${pageKey}`;
    title = (t as any)[titleKey] || t.metaTitle || "WB Digital Solutions";
  } else {
    title = t.metaTitle || "WB Digital Solutions";
  }

  // Get description based on page
  const descriptionKey = pageKey ? `metaDescription_${pageKey}` : "metaDescription";
  const description = (t as any)[descriptionKey] || t.metaDescription || "";

  // Get keywords based on page
  const keywordsKey = pageKey ? `metaKeywords_${pageKey}` : "metaKeywords";
  const keywords = (t as any)[keywordsKey] || t.metaKeywords || "";

  // Track page view when title is set
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag && title) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        (window as any).gtag('event', 'page_view', {
          page_title: title,
          page_location: window.location.href,
          page_path: router.asPath,
          send_to: 'G-PZ3WX1KF35'
        });
      }, 0);
    }
  }, [title, router.asPath]);

  // Build the canonical URL
  const baseUrl = "https://www.wbdigitalsolutions.com";
  const canonicalUrl = `${baseUrl}${router.asPath}`;

  // Generate schemas based on page type
  const schemas = [];
  
  // Add Organization schema on homepage
  if (!pageKey || pageKey === 'home') {
    schemas.push(getOrganizationSchema(language));
    schemas.push(getWebSiteSchema(language));
    schemas.push(getLocalBusinessSchema(language));
  }

  // Add Service schema for service pages
  if (pageKey === 'websites') {
    schemas.push(getServiceSchema('Web Development', 'Web Development', language));
  } else if (pageKey === 'automation') {
    schemas.push(getServiceSchema('Digital Automation', 'Digital Automation', language));
  } else if (pageKey === 'ai') {
    schemas.push(getServiceSchema('Artificial Intelligence', 'Artificial Intelligence', language));
  } else if (pageKey === 'systems') {
    schemas.push(getServiceSchema('Custom Systems', 'Custom Systems', language));
  }

  // Add BlogPosting schema for blog posts
  if (blogPost) {
    schemas.push(getBlogPostSchema(
      blogPost.title,
      blogPost.description,
      blogPost.author,
      blogPost.datePublished,
      canonicalUrl,
      blogPost.images
    ));
  }

  // Add Breadcrumb schema for all pages except homepage
  if (pageKey && pageKey !== 'home') {
    const breadcrumbItems = [
      { name: 'Home', url: baseUrl }
    ];
    
    if (pageKey === 'blog') {
      breadcrumbItems.push({ name: 'Blog', url: `${baseUrl}/blog` });
    } else if (blogPost) {
      breadcrumbItems.push(
        { name: 'Blog', url: `${baseUrl}/blog` },
        { name: blogPost.title, url: canonicalUrl }
      );
    } else if (pageKey === 'contact') {
      breadcrumbItems.push({ name: 'Contact', url: `${baseUrl}/contact` });
    } else if (pageKey === 'websites') {
      breadcrumbItems.push({ name: 'Websites', url: `${baseUrl}/websites` });
    } else if (pageKey === 'automation') {
      breadcrumbItems.push({ name: 'Automation', url: `${baseUrl}/automation` });
    } else if (pageKey === 'ai') {
      breadcrumbItems.push({ name: 'AI', url: `${baseUrl}/ai` });
    }
    
    schemas.push(getBreadcrumbSchema(breadcrumbItems, language));
  }

  return (
    <>
      <SchemaMarkup schemas={schemas} />
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
      <meta property="og:image" content="https://www.wbdigitalsolutions.com/svg/logo.svg" />
      <meta property="og:locale" content={language === "pt-BR" ? "pt_BR" : language} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wbdigitalsolutions" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.wbdigitalsolutions.com/svg/logo.svg" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/img/favicon.png" />

      {/* Language alternates for SEO - Dynamic based on current language */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${router.pathname}`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}/es${router.pathname}`} />
      <link rel="alternate" hrefLang="it" href={`${baseUrl}/it${router.pathname}`} />
      <link rel="alternate" hrefLang="pt-BR" href={`${baseUrl}/pt-BR${router.pathname}`} />
      <link rel="alternate" hrefLang="pt" href={`${baseUrl}/pt-BR${router.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${router.pathname}`} />
      </Head>
    </>
  );
};

export default PageHead;