import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";



const HamburgerMenu: React.FC<{ isOpen: boolean; toggleMenu: () => void }> = ({ 
  isOpen, 
  toggleMenu 
}) => {
  return (
    <label className="mt-4 cursor-pointer  md:block ml-auto">
      <input 
        type="checkbox" 
        className="hidden" 
        checked={isOpen}
        onChange={toggleMenu}
      />
      <svg 
        viewBox="0 0 32 32"
        className="h-8  transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isOpen ? 'rotate(-45deg)' : 'none'
        }}
      >
        <path 
          className="fill-none stroke-white stroke-[3] stroke-round"
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: isOpen ? '20 300' : '12 63',
            strokeDashoffset: isOpen ? '-32.42' : '0',
            transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        />
        <path 
          className="fill-none stroke-white stroke-[3] stroke-round"
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          d="M7 16 27 16"
        />
      </svg>
    </label>
  );
};

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

export default HamburgerMenu