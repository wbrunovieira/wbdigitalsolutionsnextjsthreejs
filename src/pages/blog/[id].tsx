"use client";
import { useRouter } from "next/router";
import BlogPost from "@/components/BlogPost";
import useBlogTranslation from "@/contexts/useBlogTranslation";
import Link from "next/link";


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
    <div className="bg-modern-gradient min-h-screen py-12 mt-32">
      <div className="mt-10 mb-10 text-center">
        <Link href="/blog">
          <button className="px-6 py-2 bg-yellowcustom text-white font-semibold rounded-lg shadow-md hover:bg-yellowcustom/70 transition duration-300">
            ← Voltar ao Blog
          </button>
        </Link>
      </div>
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