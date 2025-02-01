"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa"; 

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
}

const BlogPost: React.FC<BlogPostProps> = ({ title, text, images, category, author }) => {
  const sectionsWithImages = images.map((_, index) => Math.floor((index / images.length) * text.length));

  return (
    <article className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      
      {/* Cabeçalho do Post */}
      <header className="mb-12 mt-4">
        <h1 className="text-3xl md:text-5xl font-bold text-primary p-4 break-words">{title}</h1>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <div className="flex gap-2 flex-wrap">
            {category.map((cat, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium text-xs">
                {cat}
              </span>
            ))}
          </div>
          <span className="whitespace-nowrap">Por {author}</span>
        </div>
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
                  priority
                />
              )}
            </div>
          );
        })}
      </div>


      <div className="mt-10 text-center">
        <Link href="/blog">
          <button className="px-6 py-2 bg-yellowcustom text-white font-semibold rounded-lg shadow-md hover:bg-yellowcustom/70 transition duration-300">
            ← Voltar ao Blog
          </button>
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;