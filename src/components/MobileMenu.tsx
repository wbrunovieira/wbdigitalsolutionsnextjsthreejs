import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const MobileMenu: React.FC<{ 
  isOpen: boolean;
  navData: any[];
  pathname: string;
  setActiveMenu: (name: string | null) => void;
  activeMenu: string | null;
  closeMenu: () => void;  
}> = ({ isOpen, navData, pathname, activeMenu , closeMenu}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-0 w-1/2 bg-primary/95 backdrop-blur-lg rounded"
        >
          <div className="flex flex-col p-4">
            {navData.map((link, index) => {
              
              const isActive = pathname === link.path;

              return (
                <div
                  key={index}
                  className="relative flex justify-end"
                 
                >
                  <Link
                    href={link.path}
                    className={`block py-3 px-4 text-sm ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                         onClick={() => {

                      closeMenu();
                    }}
                  >
                    {link.name}
                  </Link>
                  <AnimatePresence>
            
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu
