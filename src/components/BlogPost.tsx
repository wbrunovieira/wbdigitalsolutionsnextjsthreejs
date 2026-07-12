'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaQuoteLeft, FaArrowLeft } from 'react-icons/fa';
import BlogShare from './BlogShare';

interface Quote {
  text: string;
  author: string;
}

interface BlogPostProps {
  title: string;
  text: { title: string; content: string[]; quotes?: Quote[] }[];
  images: string[];
  category: string[];
  author: string;
  datePublished?: string;
  dateModified?: string;
  language?: string;
  // Optional explicit section index per image (same order as `images`). When
  // omitted, images are auto-distributed evenly across the sections.
  imageSections?: number[];
}

// URL locale -> Intl tag + localized labels (date + back button).
const PT = { tag: 'pt-BR', updated: 'Atualizado em', published: 'Publicado em', back: 'Voltar ao Blog' };
const LOCALE: Record<string, { tag: string; updated: string; published: string; back: string }> = {
  en: { tag: 'en-US', updated: 'Updated', published: 'Published', back: 'Back to Blog' },
  pt: PT,
  ptbr: PT,
  'pt-BR': PT,
  it: { tag: 'it-IT', updated: 'Aggiornato a', published: 'Pubblicato a', back: 'Torna al Blog' },
  es: { tag: 'es-ES', updated: 'Actualizado en', published: 'Publicado en', back: 'Volver al Blog' },
};

const BlogPost: React.FC<BlogPostProps> = ({
  title, text, images, category, author, datePublished, dateModified, language, imageSections,
}) => {
  const sectionsWithImages =
    imageSections && imageSections.length === images.length
      ? imageSections
      : images.map((_, index) => Math.floor((index / images.length) * text.length));

  const loc = LOCALE[language ?? 'en'] ?? LOCALE.en;
  const fmt = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString(loc.tag, { year: 'numeric', month: 'long' }) : '';
  const dateLine = dateModified
    ? `${loc.updated} ${fmt(dateModified)}`
    : datePublished ? `${loc.published} ${fmt(datePublished)}` : '';

  return (
    <article className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-xl shadow-primary/5 sm:p-10 lg:p-14">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {category.map((cat, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#792990]/15 bg-[#792990]/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#792990]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-yellowcustom" aria-hidden="true" />
              {cat}
            </span>
          ))}
        </div>
        <h1 className="text-balance text-[2rem] font-extrabold leading-[1.08] tracking-tight text-primary sm:text-[2.6rem] md:text-[3rem]">
          {title}
        </h1>
        <p className="mt-5 text-sm text-gray-500">
          <span className="font-semibold text-gray-700">{author}</span>
          {dateLine && <span className="text-gray-400"> · {dateLine}</span>}
        </p>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-yellowcustom/60 via-gray-200 to-transparent" aria-hidden="true" />
      </header>

      <div>
        {text.map((section, index) => {
          const imageIndex = sectionsWithImages.indexOf(index);
          const image = imageIndex !== -1 ? images[imageIndex] : null;

          return (
            <section key={index} className="mt-12 first:mt-0">
              {section.title && (
                <>
                  <span className="mb-3 block h-[3px] w-9 rounded-full bg-yellowcustom" aria-hidden="true" />
                  <h2 className="text-[1.6rem] font-bold leading-snug tracking-tight text-primary md:text-[2rem]">
                    {section.title}
                  </h2>
                </>
              )}

              {section.content.map((paragraph, pIndex) => (
                <React.Fragment key={pIndex}>
                  <p
                    className="mt-5 text-[1.06rem] leading-[1.85] text-gray-700 [&_a]:font-medium [&_strong]:font-semibold [&_strong]:text-primary"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />

                  {section.quotes && section.quotes[pIndex] && (
                    <figure className="my-8 rounded-2xl bg-[#792990]/[0.05] p-6 sm:p-8">
                      <FaQuoteLeft className="text-3xl text-yellowcustom" aria-hidden="true" />
                      <blockquote className="mt-3 text-lg italic leading-relaxed text-primary/90 md:text-xl">
                        {section.quotes[pIndex].text}
                      </blockquote>
                      <figcaption className="mt-3 text-sm font-semibold text-gray-500">
                        — {section.quotes[pIndex].author}
                      </figcaption>
                    </figure>
                  )}
                </React.Fragment>
              ))}

              {image && (
                <Image
                  src={image}
                  alt={`Imagem relacionada ao post ${title}`}
                  width={1600}
                  height={893}
                  className="mt-10 w-full rounded-2xl shadow-lg ring-1 ring-black/5"
                  // The article caps at ~768px wide, so cap the served variant to
                  // that instead of the default 100vw. Shrinks the LCP image's
                  // preload/download (esp. on desktop) without visible quality loss.
                  sizes="(max-width: 768px) 100vw, 768px"
                  // Only the first in-content image is eager (LCP candidate);
                  // the rest lazy-load so below-the-fold images don't inflate LCP.
                  priority={imageIndex === 0}
                  loading={imageIndex === 0 ? undefined : 'lazy'}
                />
              )}
            </section>
          );
        })}
      </div>

      <BlogShare title={title} language={language} />

      <div className="mt-12 border-t border-gray-100 pt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-yellowcustom px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-yellowcustom/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
        >
          <FaArrowLeft aria-hidden="true" /> {loc.back}
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
