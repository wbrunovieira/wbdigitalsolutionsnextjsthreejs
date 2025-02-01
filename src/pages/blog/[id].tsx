"use client";
import { useRouter } from "next/router";
import BlogPost from "@/components/BlogPost";
import useBlogTranslation from "@/contexts/useBlogTranslation";


const BlogPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return <p className="text-center text-red-500 mt-10">Post não encontrado!</p>;
  }

  const translation = useBlogTranslation(id);

  if (!translation) {
    return <p className="text-center text-gray-500 mt-10">Carregando...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 mt-32">
      <BlogPost
        title={translation.title}
        text={translation.text}
        images={translation.images}
        category={translation.category}
        author={translation.author}
      />
    </div>
  );
};

export default BlogPage;