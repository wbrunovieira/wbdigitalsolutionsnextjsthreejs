'use client';

/**
 * Scroll-driven 3D AI hero.
 *
 * Same pattern as the /websites, /systems and /automation heroes: a single
 * persistent (fixed) canvas, `pointer-events: none`, rendered at z-[1] so it
 * passes BEHIND the (transparent) page content over a fixed gradient backdrop.
 *
 * HERO (scroll ~0): the AI model floats/spins and the dodecahedron "balls"
 *   swarm toward the mouse with a moving rect-area light.
 * ON SCROLL: the model follows KEYFRAMES (descend -> approach -> move away ->
 *   recede), spinning throughout, and a SUBSET of balls ("companions") orbit it
 *   while the rest fade out.
 *
 * Renders on every size; the pose table is picked by viewport width.
 */

import React, { useEffect, useRef } from 'react';
import { RectAreaLight, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import MouseMoveTutorial from '../MouseMoveTutorial';
import ScrollHeroCanvas from './scroll3d/ScrollHeroCanvas';
import { Pose } from './scroll3d/heroRefs';
import { useIsDesktop } from './scroll3d/useIsDesktop';
import { usePointerTarget } from './scroll3d/usePointerTarget';
import { useScrollProgress } from './scroll3d/useScrollProgress';
import AiModel, { AI_MODEL } from './scroll3d/ai/AiModel';
import AiSwarm from './scroll3d/ai/AiSwarm';
import { AiRefs, Keyframe } from './scroll3d/ai/types';

// Model choreography in world space (camera at z = 100).
const KEYFRAMES: Keyframe[] = [
  { pos: [40, 4, 0], scale: 12 },       // hero (right)
  { pos: [6, -8, 28], scale: 16 },      // approach, descend, move in
  { pos: [-26, -20, -18], scale: 10 },  // move away, descend, left
  { pos: [0, -16, -8], scale: 7 },      // recede & shrink (clears footer)
];

// Mobile: centered (x~0), staged lower; depth/scale carry the motion.
const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -16, 8], scale: 7 },       // hero: centered, lower
  { pos: [0, -22, 18], scale: 8 },      // approach + descend
  { pos: [0, -26, 2], scale: 6 },       // recede, lower
  { pos: [0, -16, -12], scale: 4 },     // recede small (clears footer)
];

const ScrollAIHero3D: React.FC = () => {
  const lightRef = useRef<RectAreaLight>(null);
  const progress = useRef(0);
  const target = useRef(new Vector3());
  const pose = useRef<Pose>({ x: 40, y: 4, z: 0, s: 12 });

  const isDesktop = useIsDesktop();

  useEffect(() => {
    useGLTF.preload(AI_MODEL);
  }, []);

  usePointerTarget(target, lightRef, isDesktop);
  useScrollProgress(progress);

  const shared: AiRefs = { progress, target, pose, kf: isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE };

  return (
    <>
      {isDesktop && <MouseMoveTutorial />}
      <ScrollHeroCanvas isDesktop={isDesktop} lightRef={lightRef}>
        <AiSwarm lightRef={lightRef} {...shared} />
        <AiModel {...shared} />
      </ScrollHeroCanvas>
    </>
  );
};

export default ScrollAIHero3D;

useGLTF.preload(AI_MODEL);
