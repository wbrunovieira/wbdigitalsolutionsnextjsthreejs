import React from "react";
import Link from "next/link";

const blogList = [
  {
    id: "ai-journey",
    title: "A Jornada da Inteligência Artificial",
    category: "Tecnologia",
    author: "Bruno Silva",
    summary: "A inteligência artificial (IA) está mudando o mundo como o conhecemos.",
    thumbnail: "https://via.placeholder.com/400x200?text=Inteligencia+Artificial",
  },
  {
    id: "future-tech",
    title: "O Futuro da Tecnologia",
    category: "Inovação",
    author: "Ana Souza",
    summary: "Explorando como as tecnologias emergentes estão moldando nosso futuro.",
    thumbnail: "https://via.placeholder.com/400x200?text=Futuro+da+Tecnologia",
  },
];

const HomePage: React.FC = () => {
  return (
      <div className="relative w-full h-screen overflow-hidden mt-32">
      <h1 className="text-center text-4xl font-extrabold text-yellowcustom mb-12">
        Bem-vindo ao Blog 
      </h1>
      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogList.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{blog.category}</p>
              <p className="text-gray-700">{blog.summary}</p>
              <Link
                href={`/blog/${blog.id}`}
                className="mt-4 inline-block text-blue-500 hover:underline font-medium"
              >
                Ler mais
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;