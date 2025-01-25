import React from "react";

interface BlogPostProps {
  title: string;
  text: string;
  images: string[]; // Array de URLs das imagens
  category: string;
  author: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, text, images, category, author }) => {
  // Função para inserir imagens entre parágrafos
  const renderTextWithImages = () => {
    const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
    return paragraphs.map((paragraph, index) => (
      <div key={index} className="my-6">
        <p className="text-gray-700 text-lg leading-relaxed">{paragraph}</p>
        {/* Adiciona uma imagem após cada 2º parágrafo */}
        {images[index] && index % 2 === 1 && (
          <img
            src={images[index]}
            alt={`Imagem relacionada ao post ${title}`}
            className="mt-4 w-full rounded-lg shadow-md"
          />
        )}
      </div>
    ));
  };

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
            {category}
          </span>
          <span>Por {author}</span>
        </div>
      </header>
      <div>{renderTextWithImages()}</div>
    </article>
  );
};

export default BlogPost;