'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa'; 

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
}

// URL locale -> Intl tag + localized "Updated on" label for the visible date.
const PT = { tag: 'pt-BR', updated: 'Atualizado em', published: 'Publicado em' };
const DATE_LOCALE: Record<string, { tag: string; updated: string; published: string }> = {
  en: { tag: 'en-US', updated: 'Updated', published: 'Published' },
  pt: PT,
  ptbr: PT,
  'pt-BR': PT,
  it: { tag: 'it-IT', updated: 'Aggiornato a', published: 'Pubblicato a' },
  es: { tag: 'es-ES', updated: 'Actualizado en', published: 'Publicado en' },
};

const BlogPost: React.FC<BlogPostProps> = ({
  title, text, images, category, author, datePublished, dateModified, language,
}) => {
  const sectionsWithImages = images.map((_, index) => Math.floor((index / images.length) * text.length));

  const loc = DATE_LOCALE[language ?? 'en'] ?? DATE_LOCALE.en;
  const fmt = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString(loc.tag, { year: 'numeric', month: 'long' }) : '';
  const dateLine = dateModified
    ? `${loc.updated} ${fmt(dateModified)}`
    : datePublished ? `${loc.published} ${fmt(datePublished)}` : '';

  return (
    <article className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      
      {/* Cabeçalho do Post */}
      <header className="mb-12 mt-4">
        <h1 className="text-3xl md:text-5xl font-bold text-primary p-4 break-words">{title}</h1>
        <div className="flex gap-2 flex-wrap mt-3 px-4">
          {category.map((cat, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium text-xs">
              {cat}
            </span>
          ))}
        </div>
        <p className="mt-3 px-4 text-sm text-gray-500">
          <span className="font-medium text-gray-700">{author}</span>
          {dateLine && <span className="text-gray-400"> · {dateLine}</span>}
        </p>
      </header>


      <div className="mt-4">
        {text.map((section, index) => {
          const imageIndex = sectionsWithImages.indexOf(index);
          const image = imageIndex !== -1 ? images[imageIndex] : null;

          return (
            <div key={index} className="my-12">
              {section.title && (
                <h2 className="text-2xl md:text-4xl font-semibold text-primary mt-6">{section.title}</h2>
              )}


              {section.content.map((paragraph, pIndex) => (
                <React.Fragment key={pIndex}>
                  <p
                    className="text-gray-700 text-lg leading-relaxed mt-4 break-words"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>


                  {section.quotes && section.quotes[pIndex] && (
                    <div className="border border-gray-200 rounded-lg p-8 mt-6">

                      <blockquote className="border-l-4 border-yellowcustom pl-4 italic text-gray-600 mt-6 flex items-start gap-3">
                        <FaQuoteLeft className="text-yellowcustom text-4xl mt-1" />
                        <div>
                          <p className="text-lg">“{section.quotes[pIndex].text}”</p>
                          <span className="block mt-2 font-semibold text-gray-500">
                            - {section.quotes[pIndex].author}
                          </span>
                        </div>
                      </blockquote>
                      </div>
                  )}
                </React.Fragment>
              ))}


              {image && (
                <Image
                  src={image}
                  alt={`Imagem relacionada ao post ${title}`}
                  width={800}
                  height={400}
                  className="mt-8 w-full rounded shadow-lg"
                  // Only the first in-content image is eager (LCP candidate);
                  // the rest lazy-load so below-the-fold images don't inflate LCP.
                  priority={imageIndex === 0}
                  loading={imageIndex === 0 ? undefined : 'lazy'}
                />
              )}
            </div>
          );
        })}
      </div>


      <div className="mt-10 text-center">
        <Link href="/blog">
          <button className="px-6 py-2 bg-yellowcustom text-primary font-semibold rounded-lg shadow-md hover:bg-yellowcustom/70 transition duration-300">
            ← Voltar ao Blog
          </button>
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;