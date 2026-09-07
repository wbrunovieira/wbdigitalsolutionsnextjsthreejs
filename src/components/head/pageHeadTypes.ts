export interface BlogPostMeta {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  images?: string[];
}

export interface CollectionMeta {
  name: string;
  description?: string;
  url: string;
  items: Array<{ name?: string; url: string }>;
}

export interface PageHeadProps {
  pageKey?: string;
  dynamicTitle?: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  // Explicit unprefixed path for canonical/hreflang. Dynamic routes ([slug])
  // can't rely on router.asPath during SSR prerender, so they pass it straight.
  canonicalPath?: string;
  blogPost?: BlogPostMeta;
  // Index pages (blog, projects) pass their listing so a CollectionPage +
  // ItemList schema enumerates the collection. URLs must be absolute.
  collection?: CollectionMeta;
}
