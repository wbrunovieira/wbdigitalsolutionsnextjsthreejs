"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import useBlogTranslation from "@/contexts/useBlogTranslation";
import Image from "next/image";

const blogList = [
  { id: "do-i-need-a-website" }
];

const BlogIndexPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  const blogTranslations = blogList.map(({ id }) => ({
    id,
    translation: useBlogTranslation(id)
  }));


  const allCategories = new Set<string>();

  blogTranslations.forEach(({ translation }) => {
    if (translation) {
      translation.category.forEach((cat: string) => allCategories.add(cat));
    }
  });


  const filteredPosts = blogTranslations.filter(({ translation }) => {
    if (!translation) return false;
    return selectedCategory ? translation.category.includes(selectedCategory) : true;
  });

  return (
    <div className="relative w-full min-h-screen overflow-hidden mt-32">
      <h1 className="text-center text-4xl font-extrabold text-yellowcustom mb-8 mt-16">
        Blog
      </h1>


      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
            selectedCategory === null
              ? "bg-yellowcustom text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Todos
        </button>
        {[...allCategories].map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              selectedCategory === category
                ? "bg-yellowcustom text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>


      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, translation }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6"
            >
              {translation ? (
                <>

                  <div className="w-full h-48 relative">
                    <Image
                      src={translation.thumbnail}
                      alt={translation.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                      priority
                    />
                  </div>

                  <div className="p-4">

                    <h2 className="text-xl font-bold text-primary mb-2">
                      {translation.title}
                    </h2>


                    <div className="flex flex-wrap gap-2 mb-3">
                      {translation.category.map((cat: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>


                    <p className="text-gray-700 text-sm">{translation.summary}</p>


                    <Link
                      href={`/blog/${id}`}
                      className="mt-4 inline-block text-blue-500 hover:underline font-medium"
                    >
                      {translation.readMore || "Ler mais"}
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Carregando...</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            Nenhum post encontrado para esta categoria.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogIndexPage;