'use client';

/**
 * PROTOTYPE v2 — scroll-driven 3D computer journey (desktop only).
 *
 * Single persistent (fixed) canvas, `pointer-events: none` so it NEVER blocks
 * the page (scroll, clicks, the ToolBox balls all keep working).
 *
 * - SCROLL drives the model's pose (position/rotation/scale) through KEYFRAMES,
 *   bound to scroll progress → reversible on scroll-up.
 * - DRAG works only in the hero via a small invisible hit-zone (pointer-events
 *   auto only there). It adds a free rotation offset on top of the pose, and a
 *   gentle idle auto-spin when not dragging — like the original hero.
 *
 * Mobile keeps the original boxed ComputersCanvas (handled in HeroSection).
 * KEYFRAMES are placeholders to iterate on (the "choreography").
 */

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';
import CanvasErrorBoundary from '../CanvasErrorBoundary';

type Keyframe = {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
};

// One stop per section (Hero → Portal → Tags → ToolBox → Carousel).
const KEYFRAMES: Keyframe[] = [
  { pos: [4.5, -1.0, 0], rot: [0, -0.35, -0.05], scale: 1.8 }, // hero (right)
  { pos: [-12.0, 0.4, 1], rot: [0.05, -0.35, 0], scale: 0.9 }, // portal: far left (edge) + facing front, half size
  { pos: [0, 0, 0], rot: [0.05, -0.35, 0], scale: 1.2 },       // after portal: centered behind text, a bit bigger
  { pos: [5.0, 1.0, -2], rot: [0.25, 1.0, 0.1], scale: 1.6 },  // right-up, angled
  { pos: [0, -4, 0], rot: [0.05, -0.35, 0], scale: 1.0 }, // after apple cards: in the gap between cards and footer
];

// Mobile (≤lg) pose table — narrow viewport, so keep x≈0 and use z (dolly) + scale.
const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -1.6, -1.0], rot: [-0.04, -0.30, -0.06], scale: 1.55 }, // hero: centered, lower
  { pos: [-1.2, 0.2, -3.0], rot: [0.05, -0.45, 0], scale: 1.05 },    // portal: slight left, back
  { pos: [0, 0.0, -1.5], rot: [0.05, -0.30, 0], scale: 1.2 },        // tags: centered behind text
  { pos: [1.0, 0.8, -2.5], rot: [0.22, 0.85, 0.08], scale: 1.15 },   // toolbox: nudged right, angled
  { pos: [0, -3.5, -2.0], rot: [0.05, -0.30, 0], scale: 0.7 },       // final: small, low
];

// World units the model rises per scroll pixel while a section is on screen.
// ~0.03 ≈ 1:1 with the page on desktop; mobile is gentler (taller sections, closer cam).
const GLUE = 0.03;
const GLUE_MOBILE = 0.018;

const CAMERA_DESKTOP = { position: [20, 3, 25] as [number, number, number], fov: 45 };
const CAMERA_MOBILE = { position: [20, 4, 26] as [number, number, number], fov: 40 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

type TargetPose = { x: number; y: number; z: number; rx: number; ry: number; rz: number; s: number };

interface ComputerProps {
  target: React.MutableRefObject<TargetPose>;
  dragRot: React.MutableRefObject<{ x: number; y: number }>;
  dragging: React.MutableRefObject<boolean>;
  inHero: React.MutableRefObject<boolean>;
}

const Computer: React.FC<ComputerProps> = ({ target, dragRot, dragging, inHero }) => {
  const { scene } = useGLTF('/models/desktop/scene.gltf');
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  // Current (damped) pose, eased toward `target` (computed from scroll in parent).
  const pose = useRef({ x: 4.5, y: -1, z: 0, rx: 0, ry: -0.35, rz: -0.05, s: 1.8 });

  useEffect(() => {
    if (!inner.current) return;
    const box = new THREE.Box3().setFromObject(inner.current);
    const center = box.getCenter(new THREE.Vector3());
    inner.current.position.sub(center);
    // Enable real self-shadowing: the tower/monitor cast onto their own desk, and
    // since the shadow light is world-fixed, the shadow sweeps the desk as it spins.
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const pr = pose.current;
    const tg = target.current;

    // Ease toward the scroll-derived target. While a section is on screen the
    // target glides upward with the scroll (the model rides the section up); when
    // the section leaves, the target jumps to the next stop and this easing plays
    // the descent into the next section.
    const k = 1 - Math.pow(0.05, delta); // frame-rate-independent damping (smoother ease in/out)
    pr.x = lerp(pr.x, tg.x, k);
    pr.y = lerp(pr.y, tg.y, k);
    pr.z = lerp(pr.z, tg.z, k);
    pr.rx = lerp(pr.rx, tg.rx, k);
    pr.ry = lerp(pr.ry, tg.ry, k);
    pr.rz = lerp(pr.rz, tg.rz, k);
    pr.s = lerp(pr.s, tg.s, k);

    // Idle auto-spin in hero; drag offset decays once we leave the hero.
    if (inHero.current) {
      if (!dragging.current) dragRot.current.y += delta * 0.25;
    } else {
      const d = 1 - Math.pow(0.02, delta);
      dragRot.current.y = lerp(dragRot.current.y, 0, d);
      dragRot.current.x = lerp(dragRot.current.x, 0, d);
    }

    group.current.position.set(pr.x, pr.y + Math.sin(state.clock.elapsedTime * 0.7) * 0.06, pr.z);
    group.current.rotation.set(pr.rx + dragRot.current.x, pr.ry + dragRot.current.y, pr.rz);
    group.current.scale.setScalar(pr.s);
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

const ScrollComputer3D: React.FC = () => {
  const dragRot = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const inHeroRef = useRef(true);
  const stopsRef = useRef<HTMLElement[]>([]);
  const target = useRef<TargetPose>({
    x: KEYFRAMES[0].pos[0], y: KEYFRAMES[0].pos[1], z: KEYFRAMES[0].pos[2],
    rx: KEYFRAMES[0].rot[0], ry: KEYFRAMES[0].rot[1], rz: KEYFRAMES[0].rot[2], s: KEYFRAMES[0].scale,
  });

  // Read synchronously on first render (component is ssr:false) so the Canvas gets
  // the right camera immediately — no desktop-cam flash on phones.
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true,
  );
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Scroll → target pose. Anchored to the REAL section positions (data-cpu-stop):
  // the active section is the one currently at the top of the viewport; the model
  // GLUES to a point in it (rides it up via `glueY`) and only when that section
  // fully leaves does the active index advance, so the target jumps to the next
  // stop and the model descends (eased in the Computer's useFrame).
  useEffect(() => {
    const KF = isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE;
    const glueFactor = isDesktop ? GLUE : GLUE_MOBILE;

    const readStops = () => {
      stopsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>('[data-cpu-stop]'),
      ).sort((a, b) => Number(a.dataset.cpuStop) - Number(b.dataset.cpuStop));
    };

    const onScroll = () => {
      const S = window.scrollY;
      if (stopsRef.current.length < 2) readStops();
      const stops = stopsRef.current;
      if (!stops.length) return;

      // Active section = first whose bottom is still below the viewport top.
      let i = stops.length - 1;
      for (let k = 0; k < stops.length; k++) {
        if (S < stops[k].offsetTop + stops[k].offsetHeight) {
          i = k;
          break;
        }
      }
      i = Math.min(i, KF.length - 1);

      // Hero state is section-aware (robust to page height across desktop/mobile).
      const nextHero = i === 0;
      inHeroRef.current = nextHero;
      setInHero((prev) => (prev === nextHero ? prev : nextHero));

      // Last stop parks low (between the cards and the footer) — no glue.
      const isLast = i === stops.length - 1;
      const glueY = isLast ? 0 : (S - stops[i].offsetTop) * glueFactor;
      const kf = KF[i];
      const t = target.current;
      t.x = kf.pos[0];
      t.y = kf.pos[1] + glueY;
      t.z = kf.pos[2];
      t.rx = kf.rot[0];
      t.ry = kf.rot[1];
      t.rz = kf.rot[2];
      t.s = kf.scale;
    };

    const onResize = () => {
      readStops();
      onScroll();
    };

    readStops();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, [isDesktop]);

  const onMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    dragRot.current.y += dx * 0.008;
    dragRot.current.x = clamp(dragRot.current.x + dy * 0.005, -0.6, 0.6);
  }, []);

  const onUp = useCallback(() => {
    dragging.current = false;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  }, [onMove]);

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [onMove, onUp],
  );

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
              {/* Lower ambient on desktop so the cast shadow has contrast (high fill washes shadows out). */}
              <hemisphereLight intensity={isDesktop ? 1.8 : 2.5} groundColor="black" />
              {/* Key/fill spot — no longer the shadow caster (its narrow cone barely covers the model). */}
              <spotLight position={[-10, 20, 10]} angle={0.12} penumbra={1} intensity={isDesktop ? 4 : 2} />
              {isDesktop && <pointLight intensity={1} />}
              {/* World-fixed shadow key: the model spins under it, so its shadow rakes across the desk. */}
              {isDesktop && (
                <directionalLight
                  position={[7, 13, 6]}
                  intensity={1.5}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                  shadow-bias={-0.0004}
                  shadow-camera-near={1}
                  shadow-camera-far={45}
                  shadow-camera-left={-12}
                  shadow-camera-right={12}
                  shadow-camera-top={12}
                  shadow-camera-bottom={-12}
                />
              )}
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

export default ScrollComputer3D;

useGLTF.preload('/models/desktop/scene.gltf');
