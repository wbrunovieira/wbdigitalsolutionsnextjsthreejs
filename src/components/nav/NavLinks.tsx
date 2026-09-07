import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../Nav.module.css';
import { NavItem } from './useNavData';

interface NavLinksProps {
  navData: NavItem[];
  pathname: string;
  setActiveMenu: (name: string | null) => void;
}

const isActivePath = (pathname: string, path: string) =>
  pathname === path || (path !== '/' && pathname.startsWith(`${path}/`));

const NavLinks: React.FC<NavLinksProps> = ({ navData, pathname, setActiveMenu }) => (
  <div className="hidden lg:flex flex-1 justify-center w-full mt-4">
    {navData.map((link) => {
      const isActive = isActivePath(pathname, link.path);

      return (
        <div
          className={`hidden lg:flex relative ${styles.link}`}
          onMouseEnter={() => setActiveMenu(link.name)}
          onMouseLeave={() => setActiveMenu(null)}
          key={link.path}
        >
          <Link
            href={link.path}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex p-3 text-xs mt-2 tracking-widest no-underline font-light lowercase whitespace-nowrap cursor-pointer transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-slate-300/90 hover:text-white'
            }`}
          >
            <span className="relative z-10">{link.name}</span>
            {isActive && (
              // Single shared indicator: Framer animates it sliding from the
              // previously-active item to this one (shared layout transition
              // via layoutId).
              <motion.span
                layoutId="nav-active-indicator"
                className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-yellowcustom"
                style={{ boxShadow: '0 0 10px 1px rgba(255,185,71,0.7)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </Link>
        </div>
      );
    })}
  </div>
);

export default NavLinks;
