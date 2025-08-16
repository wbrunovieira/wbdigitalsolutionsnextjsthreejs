"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import useBlogTranslation from "@/contexts/useBlogTranslation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHead from "@/components/PageHead";

const blogList = [
  { id: "do-i-need-a-website" },
  { id: "how-emotional-design-can" },
  { id: "digital-can-transform-company" },
  { id: "chatgpt-for-smes" }
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
    <>
      <PageHead pageKey="blog" />
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
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-semibold text-sm uppercase tracking-wide mb-2"
        >
          {pageTranslation?.filterLabel || "Filtrar por categoria:"}
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-2 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
              selectedCategory === null
                ? "bg-yellowcustom text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {pageTranslation?.allCategories || "Todos"}
          </motion.button>
          {[...allCategories].map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-yellowcustom text-white shadow-md scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>


      <motion.div 
        className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16"
        layout
      >
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(({ id, translation }, index) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
              >
                <Link href={`/blog/${id}`} className="group">
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-full"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {translation ? (
                      <>
                        <div className="w-full h-48 relative overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full"
                          >
                            <Image
                              src={translation.thumbnail}
                              alt={translation.title}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-t-lg"
                              priority
                            />
                          </motion.div>
                        </div>

                        <div className="p-4">
                          <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-yellowcustom transition-colors duration-300">
                            {translation.title}
                          </h2>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {translation.category.map((cat: string, index: number) => (
                              <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium text-xs"
                              >
                                {cat}
                              </motion.span>
                            ))}
                          </div>

                          <p className="text-gray-700 text-sm">{translation.summary}</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500">{pageTranslation?.loading || "Carregando..."}</p>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 col-span-3"
            >
              {pageTranslation?.noPosts || "Nenhum post encontrado para esta categoria."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
    </>
  );
};

export default BlogIndexPage;