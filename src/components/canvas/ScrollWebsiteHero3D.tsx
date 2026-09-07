'use client';

/**
 * Scroll-driven 3D website hero.
 *
 * Mirrors the home `ScrollComputer3D` pattern: a single persistent (fixed)
 * canvas, `pointer-events: none` so it NEVER blocks the page.
 *
 * HERO (scroll ~0): the MacBook opens, the dodecahedron "balls" swarm toward the
 *   mouse with a moving rect-area light, and the laptop floats + tilts toward
 *   the cursor.
 * ON SCROLL: the laptop follows KEYFRAMES (descend -> approach -> full spin) and
 *   a SUBSET of balls ("companions") leave the swarm to orbit the laptop,
 *   rotating and closing in, while the rest fade out. Reversible on scroll-up.
 *
 * Renders on every size; the pose table is picked by viewport width.
 */

import React, { useEffect, useRef } from 'react';
import { RectAreaLight, Vector3 } from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import MouseMoveTutorial from '../MouseMoveTutorial';
import ScrollHeroCanvas from './scroll3d/ScrollHeroCanvas';
import { Pose } from './scroll3d/heroRefs';
import { useIsDesktop } from './scroll3d/useIsDesktop';
import { usePointerTarget } from './scroll3d/usePointerTarget';
import { useScrollProgress } from './scroll3d/useScrollProgress';
import Laptop, { LAPTOP_MODEL, SCREEN_TEXTURE } from './scroll3d/website/Laptop';
import WebsiteSwarm from './scroll3d/website/WebsiteSwarm';
import { Keyframe, WebsiteRefs } from './scroll3d/website/types';

// Laptop choreography in world space (camera at z = 100).
const KEYFRAMES: Keyframe[] = [
  { pos: [45, -1, 0], rotY: 0, scale: 14 },              // hero (right)
  { pos: [10, -10, 25], rotY: 1.2, scale: 16 },          // move in, descend, turn
  { pos: [-20, -22, 10], rotY: 3.0, scale: 13 },         // lower-left, keep turning
  { pos: [0, -14, -18], rotY: Math.PI * 2, scale: 9 },   // recede back & up, small (clears footer)
];

// Mobile: narrow viewport, keep x~0 (centered); depth/scale carry the motion.
const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -18, 10], rotY: 0.25, scale: 8 },           // hero: full laptop, lower, not clipped
  { pos: [0, -22, 18], rotY: 1.1, scale: 9 },            // approach + descend (gentle)
  { pos: [0, -26, 4], rotY: 2.4, scale: 7.5 },           // pass lower-center, turning, recede
  { pos: [0, -16, -26], rotY: Math.PI * 2, scale: 5 },   // recede small + back up (clears footer)
];

const ScrollWebsiteHero3D: React.FC = () => {
  const lightRef = useRef<RectAreaLight>(null);
  const progress = useRef(0);
  const target = useRef(new Vector3());
  const pointer = useRef({ x: 0, y: 0 });
  const pose = useRef<Pose>({ x: 45, y: -1, z: 0, s: 14 });

  // Render on all sizes; the pose table is picked by width.
  const isDesktop = useIsDesktop();

  // Preload assets.
  useEffect(() => {
    useGLTF.preload(LAPTOP_MODEL);
    useTexture.preload(SCREEN_TEXTURE);
  }, []);

  usePointerTarget(target, lightRef, isDesktop, { pointer });
  useScrollProgress(progress);

  const shared: WebsiteRefs = {
    progress, target, pointer, pose, kf: isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE,
  };

  return (
    <>
      {isDesktop && <MouseMoveTutorial />}
      <ScrollHeroCanvas isDesktop={isDesktop} lightRef={lightRef}>
        <WebsiteSwarm lightRef={lightRef} {...shared} />
        <Laptop {...shared} />
      </ScrollHeroCanvas>
    </>
  );
};

export default ScrollWebsiteHero3D;

useGLTF.preload(LAPTOP_MODEL);
useTexture.preload(SCREEN_TEXTURE);
