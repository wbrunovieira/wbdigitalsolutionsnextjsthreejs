"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import useBlogTranslation from "@/contexts/useBlogTranslation";
import Image from "next/image";

const blogList = [
  { id: "do-i-need-a-website" },
  { id: "how-emotional-design-can" },
  { id: "digital-can-transform-company" }
];

const BlogIndexPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  const pageTranslation = useBlogTranslation("blog-index");

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

      <div className="text-center mb-8 p-2">
        <h1 className="text-5xl font-extrabold text-yellowcustom mt-16">
          {pageTranslation?.title || "Explore Nossos Artigos"}
        </h1>
        <p className="text-white mt-2 text-lg">
          {pageTranslation?.subtitle || "Descubra insights valiosos sobre tecnologia, marketing digital e experiência do usuário."}
        </p>
      </div>


      <div className="flex flex-col items-center mb-8 p-4">
        <p className="text-white font-semibold text-sm uppercase tracking-wide mb-2">
          {pageTranslation?.filterLabel || "Filtrar por categoria:"}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-2 py-1 text-xs font-medium rounded-lg transition ${
              selectedCategory === null
                ? "bg-yellowcustom text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {pageTranslation?.allCategories || "Todos"}
          </button>
          {[...allCategories].map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition ${
                selectedCategory === category
                  ? "bg-yellowcustom text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, translation }) => (
            <Link href={`/blog/${id}`} key={id} className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer">
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

                      <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-yellowcustom transition-colors duration-300">
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
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">{pageTranslation?.loading || "Carregando..."}</p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            {pageTranslation?.noPosts || "Nenhum post encontrado para esta categoria."}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogIndexPage;