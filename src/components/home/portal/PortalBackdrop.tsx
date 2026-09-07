import React, { RefObject } from 'react';

const INNER_SHADOW = `
  inset 0 60px 120px -10px rgba(0, 0, 0, 0.9),
  inset 0 -60px 120px -10px rgba(0, 0, 0, 0.9),
  inset 0 30px 60px -5px rgba(121, 41, 144, 0.3),
  inset 0 -30px 60px -5px rgba(255, 185, 71, 0.3)
`;

/** Warp filter, inner shadow and the slowly rotating radial rings behind the 3D canvas. */
const PortalBackdrop: React.FC<{ portalBgRef: RefObject<HTMLDivElement> }> = ({ portalBgRef }) => (
  <>
    {/* Warping Distortion Effect - SVG Filter */}
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="portal-warp">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="30" />
        </filter>
      </defs>
    </svg>

    {/* Inner Shadow for depth */}
    <div className="absolute inset-0 z-10 pointer-events-none" style={{ boxShadow: INNER_SHADOW }} />

    {/* Animated Portal Background - More subtle and in the back */}
    <div className="absolute inset-0" aria-hidden="true">
      <div
        ref={portalBgRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-30"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-900/20 via-transparent to-purple-900/20" />
        <div className="absolute inset-20 rounded-full bg-gradient-to-r from-purple-600/15 via-transparent to-purple-600/15" />
        <div className="absolute inset-40 rounded-full bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10" />
      </div>
    </div>
  </>
);

export default PortalBackdrop;
