'use client';

/**
 * Scroll-driven 3D automation hero.
 *
 * Same pattern as the /websites ScrollWebsiteHero3D: a single persistent (fixed)
 * canvas, `pointer-events: none`, rendered at z-[1] so it passes BEHIND the
 * (transparent) page content over a fixed gradient backdrop.
 *
 * HERO (scroll ~0): the gear spins and the dodecahedron "balls" swarm toward the
 *   mouse with a moving rect-area light.
 * ON SCROLL: the gear follows KEYFRAMES (descend -> recede) and a SUBSET of balls
 *   ("companions") leave the swarm to orbit the gear, while the rest fade out.
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
import AutomationGear, { GEAR_MODEL } from './scroll3d/automation/AutomationGear';
import AutomationSwarm from './scroll3d/automation/AutomationSwarm';
import { AutomationRefs, Keyframe } from './scroll3d/automation/types';

// Gear choreography in world space (camera at z = 100).
const KEYFRAMES: Keyframe[] = [
  { pos: [40, 4, 0], scale: 7 },        // hero (right)
  { pos: [8, -10, 22], scale: 9 },      // move in, descend, approach
  { pos: [-24, -24, 6], scale: 7 },     // lower-left
  { pos: [0, -18, -12], scale: 4.5 },   // recede & shrink (clears footer)
];

// Mobile: centered (x~0), staged lower; depth/scale carry the motion.
const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -16, 8], scale: 6 },       // hero: centered, lower
  { pos: [0, -22, 18], scale: 7 },      // approach + descend
  { pos: [0, -26, 2], scale: 5.5 },     // recede, lower
  { pos: [0, -16, -12], scale: 3.5 },   // recede small (clears footer)
];

const ScrollAutomationHero3D: React.FC = () => {
  const lightRef = useRef<RectAreaLight>(null);
  const progress = useRef(0);
  const target = useRef(new Vector3());
  const pose = useRef<Pose>({ x: 40, y: 4, z: 0, s: 7 });

  const isDesktop = useIsDesktop();

  useEffect(() => {
    useGLTF.preload(GEAR_MODEL);
  }, []);

  usePointerTarget(target, lightRef, isDesktop);
  useScrollProgress(progress);

  const shared: AutomationRefs = { progress, target, pose, kf: isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE };

  return (
    <>
      {isDesktop && <MouseMoveTutorial />}
      <ScrollHeroCanvas isDesktop={isDesktop} lightRef={lightRef}>
        <AutomationSwarm lightRef={lightRef} {...shared} />
        <AutomationGear {...shared} />
      </ScrollHeroCanvas>
    </>
  );
};

export default ScrollAutomationHero3D;

useGLTF.preload(GEAR_MODEL);
