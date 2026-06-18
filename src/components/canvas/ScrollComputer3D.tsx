"use client";

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

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import CanvasErrorBoundary from "../CanvasErrorBoundary";

type Keyframe = {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
};

// One stop per section (Hero → Portal → Tags → ToolBox → Carousel).
const KEYFRAMES: Keyframe[] = [
  { pos: [4.5, -1.0, 0], rot: [0, -0.35, -0.05], scale: 1.8 }, // hero (right)
  { pos: [-5.0, -0.5, 1], rot: [0.1, 0.7, 0.05], scale: 1.9 }, // move left, turn
  { pos: [0.5, 0.5, 3], rot: [0.15, -0.25, 0], scale: 2.3 },   // center, closer
  { pos: [5.0, 1.0, -2], rot: [0.25, 1.0, 0.1], scale: 1.6 },  // right-up, angled
  { pos: [0, -0.8, 0.5], rot: [0, Math.PI * 2, 0], scale: 1.95 }, // center, full spin
];

const HERO_ZONE = 0.08;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

interface ComputerProps {
  progress: React.MutableRefObject<number>;
  dragRot: React.MutableRefObject<{ x: number; y: number }>;
  dragging: React.MutableRefObject<boolean>;
  inHero: React.MutableRefObject<boolean>;
}

const Computer: React.FC<ComputerProps> = ({ progress, dragRot, dragging, inHero }) => {
  const { scene } = useGLTF("/models/desktop/scene.gltf");
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  // Current (lerped) base pose driven by scroll.
  const pose = useRef({ x: 4.5, y: -1, z: 0, rx: 0, ry: -0.35, rz: -0.05, s: 1.8 });

  useEffect(() => {
    if (!inner.current) return;
    const box = new THREE.Box3().setFromObject(inner.current);
    const center = box.getCenter(new THREE.Vector3());
    inner.current.position.sub(center);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = clamp(progress.current, 0, 1);

    // Interpolate the keyframe list by progress.
    const n = KEYFRAMES.length - 1;
    const f = p * n;
    const i = Math.min(Math.floor(f), n - 1);
    const t = f - i;
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];

    const k = 1 - Math.pow(0.0015, delta); // frame-rate-independent damping
    const pr = pose.current;
    pr.x = lerp(pr.x, lerp(a.pos[0], b.pos[0], t), k);
    pr.y = lerp(pr.y, lerp(a.pos[1], b.pos[1], t), k);
    pr.z = lerp(pr.z, lerp(a.pos[2], b.pos[2], t), k);
    pr.rx = lerp(pr.rx, lerp(a.rot[0], b.rot[0], t), k);
    pr.ry = lerp(pr.ry, lerp(a.rot[1], b.rot[1], t), k);
    pr.rz = lerp(pr.rz, lerp(a.rot[2], b.rot[2], t), k);
    pr.s = lerp(pr.s, lerp(a.scale, b.scale, t), k);

    // Drag offset: idle auto-spin in hero, decay to 0 once we leave the hero.
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
  const progress = useRef(0);
  const dragRot = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const inHeroRef = useRef(true);

  const [enabled, setEnabled] = useState(false);
  const [inHero, setInHero] = useState(true);

  // Desktop gate.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Scroll progress + hero zone.
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      progress.current = p;
      const next = p < HERO_ZONE;
      inHeroRef.current = next;
      setInHero((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

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
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  }, [onMove]);

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [onMove, onUp]
  );

  if (!enabled) return null;

  return (
    <>
      {/* Canvas layer — behind the page content, never blocks (pointer-events none). */}
      <div className="fixed inset-0 z-[5]" style={{ pointerEvents: "none" }} aria-hidden="true">
        <CanvasErrorBoundary>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [20, 3, 25], fov: 45 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            style={{ background: "transparent", pointerEvents: "none" }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <hemisphereLight intensity={2.5} groundColor="black" />
              <spotLight position={[-10, 20, 10]} angle={0.12} penumbra={1} intensity={4} castShadow />
              <pointLight intensity={1} />
              <Computer progress={progress} dragRot={dragRot} dragging={dragging} inHero={inHeroRef} />
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
            width: "46%",
            height: 540,
            cursor: dragging.current ? "grabbing" : "grab",
            touchAction: "none",
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default ScrollComputer3D;

useGLTF.preload("/models/desktop/scene.gltf");
