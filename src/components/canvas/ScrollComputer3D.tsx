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
  { pos: [-12.0, 0.4, 1], rot: [0.05, -0.35, 0], scale: 0.9 }, // portal: far left (edge) + facing front, half size
  { pos: [0, 0, 0], rot: [0.05, -0.35, 0], scale: 1.2 },       // after portal: centered behind text, a bit bigger
  { pos: [5.0, 1.0, -2], rot: [0.25, 1.0, 0.1], scale: 1.6 },  // right-up, angled
  { pos: [0, -4, 0], rot: [0.05, -0.35, 0], scale: 1.0 }, // after apple cards: in the gap between cards and footer
];

const HERO_ZONE = 0.08;

// World units the model rises per scroll pixel while a section is on screen.
// ~0.03 ≈ 1:1 with the page, so the model stays glued to a point in the section
// and rides it upward; when the section leaves, the target jumps to the next stop
// and the damping below plays the descent.
const GLUE = 0.03;

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
  const { scene } = useGLTF("/models/desktop/scene.gltf");
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  // Current (damped) pose, eased toward `target` (computed from scroll in parent).
  const pose = useRef({ x: 4.5, y: -1, z: 0, rx: 0, ry: -0.35, rz: -0.05, s: 1.8 });

  useEffect(() => {
    if (!inner.current) return;
    const box = new THREE.Box3().setFromObject(inner.current);
    const center = box.getCenter(new THREE.Vector3());
    inner.current.position.sub(center);
  }, []);

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
  const progress = useRef(0);
  const dragRot = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const inHeroRef = useRef(true);
  const stopsRef = useRef<HTMLElement[]>([]);
  const target = useRef<TargetPose>({
    x: KEYFRAMES[0].pos[0], y: KEYFRAMES[0].pos[1], z: KEYFRAMES[0].pos[2],
    rx: KEYFRAMES[0].rot[0], ry: KEYFRAMES[0].rot[1], rz: KEYFRAMES[0].rot[2], s: KEYFRAMES[0].scale,
  });

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

  // Scroll → target pose. Anchored to the REAL section positions (data-cpu-stop):
  // the active section is the one currently at the top of the viewport; the model
  // GLUES to a point in it (rides it up via `glueY`) and only when that section
  // fully leaves does the active index advance, so the target jumps to the next
  // stop and the model descends (eased in the Computer's useFrame).
  useEffect(() => {
    if (!enabled) return;

    const readStops = () => {
      stopsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>("[data-cpu-stop]")
      ).sort((a, b) => Number(a.dataset.cpuStop) - Number(b.dataset.cpuStop));
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      const S = window.scrollY;
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? clamp(S / max, 0, 1) : 0;
      progress.current = p;
      const nextHero = p < HERO_ZONE;
      inHeroRef.current = nextHero;
      setInHero((prev) => (prev === nextHero ? prev : nextHero));

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
      i = Math.min(i, KEYFRAMES.length - 1);
      // Last stop parks low (between the cards and the footer) — no glue, so it
      // doesn't ride up and out as you scroll to the bottom.
      const isLast = i === stops.length - 1;
      const glueY = isLast ? 0 : (S - stops[i].offsetTop) * GLUE;
      const kf = KEYFRAMES[i];
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
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
