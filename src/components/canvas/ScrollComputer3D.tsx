'use client';

/**
 * Scroll-driven 3D computer journey.
 *
 * Single persistent (fixed) canvas, `pointer-events: none` so it NEVER blocks
 * the page (scroll, clicks, the ToolBox balls all keep working).
 *
 * - SCROLL drives the model's pose (position/rotation/scale) through KEYFRAMES,
 *   bound to scroll progress -> reversible on scroll-up.
 * - DRAG works only in the hero via a small invisible hit-zone (pointer-events
 *   auto only there). It adds a free rotation offset on top of the pose, and a
 *   gentle idle auto-spin when not dragging — like the original hero.
 *
 * Renders on every size; the camera and pose table are picked by viewport width.
 */

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';
import CanvasErrorBoundary from '../CanvasErrorBoundary';
import DragTutorial from '@/components/DragTutorial';
import { useIsDesktop } from './scroll3d/useIsDesktop';
import Computer, { COMPUTER_MODEL } from './scroll3d/computer/Computer';
import ComputerLights from './scroll3d/computer/ComputerLights';
import { CAMERA_DESKTOP, CAMERA_MOBILE, KEYFRAMES, TargetPose } from './scroll3d/computer/keyframes';
import { useHeroDrag } from './scroll3d/useHeroDrag';
import { useSectionStops } from './scroll3d/computer/useSectionStops';

/** Hero-only drag hit-zone, shared by the pointer target and the tutorial overlay. */
const HERO_ZONE_BOX = { top: 150, right: 72, width: '46%', height: 540 } as const;

const ScrollComputer3D: React.FC = () => {
  const inHeroRef = useRef(true);
  const target = useRef<TargetPose>({
    x: KEYFRAMES[0].pos[0], y: KEYFRAMES[0].pos[1], z: KEYFRAMES[0].pos[2],
    rx: KEYFRAMES[0].rot[0], ry: KEYFRAMES[0].rot[1], rz: KEYFRAMES[0].rot[2], s: KEYFRAMES[0].scale,
  });

  // Read synchronously on first render (component is ssr:false) so the Canvas gets
  // the right camera immediately — no desktop-cam flash on phones.
  const isDesktop = useIsDesktop();
  const inHero = useSectionStops(isDesktop, target, inHeroRef);
  const { dragRot, dragging, onDown } = useHeroDrag();

  return (
    <>
      {/* Canvas layer — behind the page content, never blocks (pointer-events none). */}
      <div className="fixed inset-0 z-[5]" style={{ pointerEvents: 'none' }} aria-hidden="true">
        <CanvasErrorBoundary>
          <Canvas
            shadows={isDesktop}
            dpr={isDesktop ? [1, 2] : 1}
            camera={isDesktop ? CAMERA_DESKTOP : CAMERA_MOBILE}
            gl={{ alpha: true, antialias: isDesktop, powerPreference: 'high-performance' }}
            style={{ background: 'transparent', pointerEvents: 'none' }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <ComputerLights isDesktop={isDesktop} />
              <Computer target={target} dragRot={dragRot} dragging={dragging} inHero={inHeroRef} />
              <Preload all />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Hero-only invisible drag zone — ABOVE the hero content (z-10) so the drag
          reaches it, below the nav (z-20). Unmounted outside the hero. */}
      {inHero && (
        <div
          onPointerDown={onDown}
          className="fixed z-[15] hidden lg:block"
          style={{
            ...HERO_ZONE_BOX,
            cursor: dragging.current ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
          aria-hidden="true"
        />
      )}

      {/* Desktop drag hint over the hero model: pointer-events-none so it never
          blocks the drag zone; auto-hides after 15s. */}
      {inHero && (
        <div className="fixed z-[16] hidden lg:block pointer-events-none" style={HERO_ZONE_BOX}>
          <DragTutorial />
        </div>
      )}
    </>
  );
};

export default ScrollComputer3D;

useGLTF.preload(COMPUTER_MODEL);
