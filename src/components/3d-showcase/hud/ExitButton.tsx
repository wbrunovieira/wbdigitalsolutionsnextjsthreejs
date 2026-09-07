import React from 'react';
import Link from 'next/link';

const ExitButton: React.FC<{ label: string; isMobile: boolean }> = ({ label, isMobile }) => (
  <div className={`absolute z-50 ${isMobile ? 'top-2 left-2' : 'top-4 left-4'}`}>
    <Link href="/websites">
      <button className={`relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center border border-purple-500/30 overflow-hidden group ${isMobile ? 'p-2' : 'py-3 px-6 gap-3'}`} aria-label={label}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" aria-hidden="true"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`z-10 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        {!isMobile && <span className="text-sm font-semibold tracking-wide z-10">{label}</span>}
      </button>
    </Link>
  </div>
);

export default ExitButton;
