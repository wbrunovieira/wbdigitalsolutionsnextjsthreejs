import React from 'react';



const HamburgerMenu: React.FC<{ isOpen: boolean; toggleMenu: () => void }> = ({ 
  isOpen, 
  toggleMenu, 
}) => (
    <label className="mt-4 cursor-pointer  md:block ml-auto">
      <input 
        type="checkbox" 
        className="hidden" 
        checked={isOpen}
        onChange={toggleMenu}
      />
      <svg 
        viewBox="0 0 32 32"
        className="h-8 transition-transform"
        style={{
          transform: isOpen ? 'rotate(-45deg)' : 'none',
        }}
      >
        <path 
          className="fill-none stroke-white stroke-[3] stroke-round"
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: isOpen ? '20 300' : '12 63',
            strokeDashoffset: isOpen ? '-32.42' : '0',
            transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        />
        <path 
          className="fill-none stroke-white stroke-[3] stroke-round"
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          d="M7 16 27 16"
        />
      </svg>
    </label>
  );

export default HamburgerMenu;