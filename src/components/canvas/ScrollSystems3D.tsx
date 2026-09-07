'use client';

/**
 * Scroll-driven procedural NETWORK for the /systems page.
 *
 * A 3D constellation of nodes (services / users / integrations) linked by edges,
 * with crystalline "balls" traveling along the connections — the "platform =
 * connected ecosystem" metaphor. The balls reuse the dodecahedron +
 * MeshPhysicalMaterial look from the websites/automation pages (no bloom glow).
 *
 * Consistent in pattern: scroll-driven pose, passes BEHIND the page (z-[1]),
 * brand palette, drag-to-rotate in the hero.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import CanvasErrorBoundary from '../CanvasErrorBoundary';
import { clamp } from './scroll3d/math';
import { useHeroDrag } from './scroll3d/useHeroDrag';
import { useIsDesktop } from './scroll3d/useIsDesktop';
import Network, { Keyframe } from './scroll3d/systems/Network';

const KEYFRAMES: Keyframe[] = [
  { pos: [2.6, -0.2, 0], rotY: 0, scale: 1.15 },        // hero (right)
  { pos: [-2.8, 0.2, 1], rotY: 1.4, scale: 1.25 },      // swing left, turn
  { pos: [2.4, 0.4, 2], rotY: 3.0, scale: 1.4 },        // right, closer
  { pos: [-2.0, 0.6, 0], rotY: 4.4, scale: 1.2 },       // left, angled
  { pos: [0, 1.6, -5], rotY: Math.PI * 2, scale: 0.78 }, // recede up & small (clears footer)
];

// Mobile: centered (x~0), staged lower + smaller so the network globe fits the
// narrow viewport with the header on top.
const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -2.5, 0], rotY: 0, scale: 0.6 },           // hero: lower-center globe
  { pos: [0, -3, 1], rotY: 1.4, scale: 0.66 },          // turn
  { pos: [0, -3.4, 2], rotY: 3.0, scale: 0.62 },        // closer
  { pos: [0, -2.8, 0], rotY: 4.4, scale: 0.58 },        // angled
  { pos: [0, 1.4, -5], rotY: Math.PI * 2, scale: 0.42 }, // recede small (clears footer)
];

const HERO_ZONE = 0.08;

const ScrollSystems3D: React.FC = () => {
  const progress = useRef(0);
  const inHeroRef = useRef(true);
  const [inHero, setInHero] = useState(true);

  const isDesktop = useIsDesktop();
  const { dragRot, dragging, onDown } = useHeroDrag();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      progress.current = p;
      const next = p < HERO_ZONE;
      inHeroRef.current = next;
      setInHero((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      {/* z-[1]: behind the page content (main is z-10), above the gradient backdrop (z-0). */}
      <div className="fixed inset-0 z-[1]" style={{ pointerEvents: 'none' }} aria-hidden="true">
        <CanvasErrorBoundary>
          <Canvas
            dpr={isDesktop ? [1, 2] : 1}
            camera={{ position: [0, 0, 12], fov: 45 }}
            gl={{ alpha: true, antialias: isDesktop, powerPreference: 'high-performance' }}
            style={{ background: 'transparent', pointerEvents: 'none' }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 6]} intensity={1.3} />
            <directionalLight position={[-6, 2, -4]} intensity={0.6} color="#aaa6c3" />
            <pointLight position={[0, 0, 9]} intensity={0.8} />
            <Network
              progress={progress}
              dragRot={dragRot}
              dragging={dragging}
              inHero={inHeroRef}
              kf={isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE}
            />
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Hero-only invisible drag zone. */}
      {inHero && (
        <div
          onPointerDown={onDown}
          className="fixed z-[15] hidden lg:block"
          style={{
            top: 150,
            right: 72,
            width: '46%',
            height: 540,
            cursor: dragging.current ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default ScrollSystems3D;
