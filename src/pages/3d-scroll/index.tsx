import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import with no SSR to avoid hydration issues
const ScrollScene = dynamic(() => import('@/components/3d-scroll/ScrollScene'), { 
  ssr: false 
});

const ThreeDScroll: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-purple-950 via-black to-purple-950 overflow-hidden">
      {/* Exit Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/websites">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <span>←</span>
            <span>Exit Scroll Experience</span>
          </button>
        </Link>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2">Scroll Journey</h3>
        <p className="text-sm mb-2">Scroll down to advance through the 3D space!</p>
        <div className="text-xs text-yellow-400">
          <p>↓ Scroll to move forward</p>
          <p>↑ Scroll to move backward</p>
        </div>
      </div>

      {/* 3D Scene */}
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="text-white text-2xl">Loading Scroll Experience...</div>
        </div>
      }>
        <ScrollScene />
      </Suspense>
    </div>
  );
};

export default ThreeDScroll;