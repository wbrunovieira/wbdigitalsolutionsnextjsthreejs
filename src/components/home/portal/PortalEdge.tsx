import React, { RefObject } from 'react';

interface EdgeVariant {
  container: string;
  shadows: string[];
  glow: string;
  hairline: string;
  waveWrap: string;
  wave: string;
}

/** Deep shadow edges that make the section read as a hole punched into the page. */
const EDGE_VARIANTS: Record<'top' | 'bottom', EdgeVariant> = {
  top: {
    container: 'absolute inset-x-0 top-0 h-48 z-10 pointer-events-none',
    shadows: [
      'absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent',
      'absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent blur-md',
      'absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent blur-2xl',
    ],
    glow: 'absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80',
    hairline: 'absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent',
    waveWrap: 'absolute bottom-0 left-0 right-0 h-32 overflow-hidden',
    wave: 'absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-purple-900/20 via-transparent to-transparent animate-pulse',
  },
  bottom: {
    container: 'absolute inset-x-0 bottom-0 h-48 z-20 pointer-events-none',
    shadows: [
      'absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent',
      'absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent blur-md',
      'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent blur-2xl',
    ],
    glow: 'absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-80',
    hairline: 'absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent',
    waveWrap: 'absolute top-0 left-0 right-0 h-32 overflow-hidden',
    wave: 'absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-yellow-900/20 via-transparent to-transparent animate-pulse',
  },
};

interface PortalEdgeProps {
  variant: 'top' | 'bottom';
  glowRef: RefObject<HTMLDivElement>;
}

const PortalEdge: React.FC<PortalEdgeProps> = ({ variant, glowRef }) => {
  const edge = EDGE_VARIANTS[variant];

  return (
    <div className={edge.container} aria-hidden="true">
      {edge.shadows.map((shadow) => (
        <div key={shadow} className={shadow} />
      ))}

      {/* Glowing energy line */}
      <div ref={glowRef} className={edge.glow} style={{ filter: 'blur(4px)' }} />
      <div className={edge.hairline} />

      {/* Distortion waves */}
      <div className={edge.waveWrap}>
        <div className={edge.wave} />
      </div>
    </div>
  );
};

export default PortalEdge;
