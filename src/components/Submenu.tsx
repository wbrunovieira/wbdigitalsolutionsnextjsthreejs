import { motion } from 'framer-motion';
import Link from 'next/link';

interface SubMenuProps {
  subItems: { name: string; path: string }[];
}

const SubMenu: React.FC<SubMenuProps> = ({ subItems }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1,
        ease: 'easeInOut',
        delay: 0.2, 
        type: 'spring', 
        stiffness: 100 }} 
      className="absolute bg-white shadow-lg mt-2"
    >
      {subItems.map((item, index) => (
        <Link href={item.path} key={index} legacyBehavior>
          <a className="flex whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{item.name}</a>
        </Link>
      ))}
    </motion.div>
  );
};

export default SubMenu;
