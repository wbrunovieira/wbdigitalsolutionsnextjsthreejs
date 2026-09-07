import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BlogTranslation } from '@/contexts/useBlogTranslation';

interface BlogCardProps {
  id: string;
  translation: BlogTranslation | null;
  index: number;
  loadingLabel: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, translation, index, loadingLabel }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{
      duration: 0.4,
      delay: index * 0.1,
      ease: 'easeInOut',
    }}
  >
    <Link href={`/blog/${id}`} className="group">
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-full"
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeOut' },
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
                {translation.category.map((cat: string, catIndex: number) => (
                  <motion.span
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.05 }}
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
          <p className="text-gray-500">{loadingLabel}</p>
        )}
      </motion.div>
    </Link>
  </motion.div>
);

export default BlogCard;
