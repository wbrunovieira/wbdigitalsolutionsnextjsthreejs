import { useRouter } from "next/router";
import BlogPost from "@/components/BlogPost";
import React from "react";

const blogData = {
  "ai-journey": {
    title: "A Jornada da Inteligência Artificial",
    text: `
      A inteligência artificial (IA) está mudando o mundo como o conhecemos.
      Desde carros autônomos até diagnósticos médicos avançados, suas aplicações são inúmeras.
      No entanto, muitos ainda questionam o impacto ético e social dessa tecnologia.
      
      A história da IA remonta à década de 1950, quando os primeiros algoritmos começaram a surgir.
      Desde então, passamos por várias "primaveras" e "invernos" da IA, com períodos de entusiasmo e decepção.
      
      Hoje, vivemos uma nova era de aprendizado de máquina e redes neurais profundas.
      Mas o futuro da IA vai muito além do que podemos imaginar atualmente.
    `,
    images: [
      "https://via.placeholder.com/800x400?text=Carro+Autonomo",
      "https://via.placeholder.com/800x400?text=Diagnostico+Medico",
      "https://via.placeholder.com/800x400?text=Redes+Neurais",
    ],
    category: "Tecnologia",
    author: "Bruno Silva",
  },
  "future-tech": {
    title: "O Futuro da Tecnologia",
    text: `
      Explorando como as tecnologias emergentes estão moldando nosso futuro.
      Desde a IA até a biotecnologia, essas inovações prometem resolver problemas globais
      enquanto apresentam novos desafios éticos e práticos.
      
      Estamos apenas no começo de uma transformação digital que remodelará
      nossa sociedade nos próximos anos.
    `,
    images: [
      "https://via.placeholder.com/800x400?text=Transformacao+Digital",
      "https://via.placeholder.com/800x400?text=Biotecnologia",
    ],
    category: "Inovação",
    author: "Ana Souza",
  },
};

const BlogPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

type BlogKeys = keyof typeof blogData; // 'ai-journey' | 'future-tech'
const blog = blogData[id as BlogKeys];

if (!blog) {
  return <p className="text-center text-red-500 mt-10">Post não encontrado!</p>;
}

  return (
    <div className="bg-gray-50 min-h-screen py-12 mt-32">
      <BlogPost
        title={blog.title}
        text={blog.text}
        images={blog.images}
        category={blog.category}
        author={blog.author}
      />
    </div>
  );
};

export default BlogPage;