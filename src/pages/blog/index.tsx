"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import useBlogTranslation from "@/contexts/useBlogTranslation";


const blogList = [
  { id: "ai-journey" },
  
];

const BlogIndexPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full h-screen overflow-hidden mt-32">
      <h1 className="text-center text-4xl font-extrabold text-yellowcustom mb-12 mt-16">
        Blog
      </h1>
      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogList.map(({ id }) => {
          const translation = useBlogTranslation(id);
          
          return (
            <div
              key={id}
              className="bg-white rounded shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {translation ? (
                <>
                  <img
                    src={translation.thumbnail}
                    alt={translation.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-primary">{translation.title}</h2>
                    <p className="text-sm text-gray-500 mb-3">{translation.category}</p>
                    <p className="text-gray-700">{translation.summary}</p>
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
          );
        })}
      </div>
    </div>
  );
};

export default BlogIndexPage;