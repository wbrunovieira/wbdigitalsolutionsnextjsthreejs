import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const MobileMenu: React.FC<{ 
  isOpen: boolean;
  navData: any[];
  pathname: string;
  setActiveMenu: (name: string | null) => void;
  activeMenu: string | null;
}> = ({ isOpen, navData, pathname, setActiveMenu, activeMenu }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 w-full bg-black/95 backdrop-blur-lg"
        >
          <div className="flex flex-col p-4">
            {navData.map((link, index) => {
              const isSubMenuActive = activeMenu === link.name;
              const isActive = pathname === link.path;

              return (
                <div
                  key={index}
                  className="relative"
                  onClick={() => setActiveMenu(isSubMenuActive ? null : link.name)}
                >
                  <Link
                    href={link.path}
                    className={`block py-3 px-4 text-sm ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <AnimatePresence>
                    {isSubMenuActive && link.subItems.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-6"
                      >
                        {link.subItems.map((subItem: any, subIndex: number) => (
                          <Link
                            key={subIndex}
                            href={subItem.path}
                            className="block py-2 text-sm text-slate-400 hover:text-white"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
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
