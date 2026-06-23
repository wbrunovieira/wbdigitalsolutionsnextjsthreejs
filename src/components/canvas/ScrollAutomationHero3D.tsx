"use client";

/**
 * PROTOTYPE — scroll-driven 3D automation hero (desktop only).
 *
 * Same pattern as the /websites ScrollWebsiteHero3D: a single persistent (fixed)
 * canvas, `pointer-events: none`, rendered at z-[1] so it passes BEHIND the
 * (transparent) page content over a fixed gradient backdrop.
 *
 * HERO (scroll ~0): unchanged behaviour — the gear spins, the dodecahedron
 *   "balls" swarm toward the mouse with a moving rect-area light.
 * ON SCROLL: the gear follows KEYFRAMES (descend → recede) and a SUBSET of balls
 *   ("companions") leave the swarm to orbit the gear, while the rest fade out.
 *
 * Mobile keeps the original boxed AnimatedBackgorundAutomation (handled in page).
 * KEYFRAMES are placeholders to iterate on.
 */

import React, { useMemo, useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RectAreaLight,
  Color,
  Vector3,
  InstancedMesh,
  DodecahedronGeometry,
  Object3D,
  MeshPhysicalMaterial,
  InstancedBufferAttribute,
  Group,
} from "three";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import { animate } from "framer-motion";
import CanvasErrorBoundary from "../CanvasErrorBoundary";
import Loader from "../Loader";
import MouseMoveTutorial from "../MouseMoveTutorial";

const NUM_INSTANCES = 40;
const MIN_DISTANCE = 6;
const INTERACTION_DISTANCE = 10;
const INTENSITY_SCALE = 9000;
const MIN_INTENSITY_CLOSE = 10000;

// 1 in EVERY_NTH balls follows the gear on scroll.
const COMPANION_EVERY = 5;

const HERO_ZONE = 0.06;
const HERO_END = 0.16;

// Gear choreography in world space (camera at z = 100). PLACEHOLDERS — tune.
type Keyframe = { pos: [number, number, number]; scale: number };
const KEYFRAMES: Keyframe[] = [
  { pos: [40, 4, 0], scale: 7 },        // hero (right)
  { pos: [8, -10, 22], scale: 9 },      // move in, descend, approach
  { pos: [-24, -24, 6], scale: 7 },     // lower-left
  { pos: [0, -18, -12], scale: 4.5 },   // recede & shrink (clears footer)
];

// Mobile: centered (x≈0), staged lower; depth/scale carry the motion.
const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -16, 8], scale: 6 },       // hero: centered, lower
  { pos: [0, -22, 18], scale: 7 },      // approach + descend
  { pos: [0, -26, 2], scale: 5.5 },     // recede, lower
  { pos: [0, -16, -12], scale: 3.5 },   // recede small (clears footer)
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

type GearPose = { x: number; y: number; z: number; s: number };

interface SharedRefs {
  progress: React.MutableRefObject<number>;
  target: React.MutableRefObject<Vector3>;
  gearPose: React.MutableRefObject<GearPose>;
  kf: Keyframe[]; // pose table for the current variant
}

const CustomLoader: React.FC = () => {
  const { progress, errors } = useProgress();
  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    if (progress === 75) {
      const timer = setTimeout(() => setShowFallback(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  if (showFallback || errors.length > 0) {
    return (
      <Html center>
        <div style={{ color: "white", textAlign: "center" }}>
          <p>Loading 3D models...</p>
        </div>
      </Html>
    );
  }
  return <Loader />;
};

type Instance = {
  position: Vector3;
  offset: Vector3;
  velocity: Vector3;
  attraction: number;
  vlimit: number;
  companion: boolean;
  baseAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: number;
};

interface BallsProps extends SharedRefs {
  lightRef: React.RefObject<RectAreaLight>;
}

const AnimatedInstancedMesh: React.FC<BallsProps> = ({ lightRef, progress, target, gearPose }) => {
  const geometry = useMemo(() => new DodecahedronGeometry(3.2), []);
  const material = useMemo(() => new MeshPhysicalMaterial({ vertexColors: true, transparent: true }), []);
  const dummy = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>(null);
  const _dir = useMemo(() => new Vector3(), []);
  const _personalTarget = useMemo(() => new Vector3(), []);
  const _orbit = useMemo(() => new Vector3(), []);

  // Fewer particles on mobile (less clutter + perf).
  const count = useMemo(
    () => (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches ? 18 : NUM_INSTANCES),
    []
  );

  const instances = useMemo<Instance[]>(() => {
    const list: Instance[] = [];
    for (let i = 0; i < count; i++) {
      let position: Vector3;
      let overlapping: boolean;
      let attempt = 0;
      do {
        position = new Vector3(
          Math.random() * 60 - 30,
          Math.random() * 40 - 20,
          Math.random() * 20 - 10
        );
        overlapping = list.some((e) => position.distanceTo(e.position) < MIN_DISTANCE);
        attempt++;
      } while (overlapping && attempt < 500);

      list.push({
        position: position.clone(),
        offset: position.clone(),
        velocity: new Vector3(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
        attraction: 0.01,
        vlimit: 0.2,
        companion: i % COMPANION_EVERY === 0,
        baseAngle: Math.random() * Math.PI * 2,
        orbitRadius: 14 + Math.random() * 12,
        orbitSpeed: 0.4 + Math.random() * 0.5,
        orbitTilt: Math.random() * Math.PI,
      });
    }
    return list;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const palette = [new Color("#792990"), new Color("#350545"), new Color("#aaa6c3"), new Color("#ffb947")];
    const colors = new Float32Array(instances.length * 3);
    for (let i = 0; i < instances.length; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      dummy.position.copy(instances[i].position);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    geometry.setAttribute("color", new InstancedBufferAttribute(colors, 3));
    geometry.attributes.color.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [geometry, dummy, instances]);

  useFrame(() => {
    if (!meshRef.current || !lightRef.current) return;
    const p = clamp(progress.current, 0, 1);
    const heroInfluence = 1 - smoothstep(HERO_ZONE, HERO_END, p);
    const gather = smoothstep(HERO_ZONE, 0.5, p);
    const fade = smoothstep(HERO_ZONE, 0.35, p);
    const gp = gearPose.current;

    let intensityAccum = 0;
    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i];

      _personalTarget.copy(target.current).add(inst.offset);
      _dir.copy(_personalTarget).sub(inst.position).normalize().multiplyScalar(inst.attraction * heroInfluence);
      inst.velocity.add(_dir).clampScalar(-inst.vlimit, inst.vlimit);
      inst.position.add(inst.velocity);

      let scale = 1;
      if (inst.companion && gather > 0.001) {
        const ang = inst.baseAngle + p * Math.PI;
        const r = lerp(inst.orbitRadius, inst.orbitRadius * 0.45, gather);
        _orbit.set(
          gp.x + Math.cos(ang) * r,
          gp.y + Math.sin(ang) * r * 0.6,
          gp.z + Math.sin(ang + inst.orbitTilt) * r * 0.5
        );
        inst.position.lerp(_orbit, gather * 0.12 + 0.02);
      } else if (!inst.companion) {
        scale = 1 - fade;
      }

      dummy.position.copy(inst.position);
      dummy.rotation.x += 0.002;
      dummy.rotation.y += 0.002;
      dummy.scale.setScalar(Math.max(scale, 0.0001));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const d = inst.position.distanceTo(target.current);
      if (d < MIN_DISTANCE) {
        intensityAccum = Math.max(intensityAccum, Math.max(MIN_INTENSITY_CLOSE, (INTENSITY_SCALE * (MIN_DISTANCE - d)) / MIN_DISTANCE));
      } else if (d < INTERACTION_DISTANCE) {
        intensityAccum = Math.max(intensityAccum, (MIN_INTENSITY_CLOSE * (INTERACTION_DISTANCE - d)) / INTERACTION_DISTANCE);
      }
    }

    const targetIntensity = intensityAccum * heroInfluence;
    lightRef.current.intensity = lightRef.current.intensity * 0.9 + targetIntensity * 0.1;
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, instances.length]} />;
};

const FloatingModel: React.FC<SharedRefs> = ({ progress, gearPose, kf }) => {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/gear/automation.glb");
  const pose = useRef({ x: 40, y: 4, z: 0, s: 7 });

  useEffect(() => {
    const frameNode = scene.children.find((node) => node.name === "Frame");
    if (frameNode) {
      frameNode.rotation.x = Math.PI / 2;
      animate(frameNode.rotation.x, 0, {
        type: "spring",
        stiffness: 80,
        damping: 20,
        onUpdate: (value) => {
          frameNode.rotation.x = value;
        },
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    const p = clamp(progress.current, 0, 1);
    const heroInfluence = 1 - smoothstep(HERO_ZONE, HERO_END, p);

    const n = kf.length - 1;
    const f = p * n;
    const i = Math.min(Math.floor(f), n - 1);
    const seg = f - i;
    const a = kf[i];
    const b = kf[i + 1];

    const k = 1 - Math.pow(0.0015, delta);
    const pr = pose.current;
    pr.x = lerp(pr.x, lerp(a.pos[0], b.pos[0], seg), k);
    pr.y = lerp(pr.y, lerp(a.pos[1], b.pos[1], seg), k);
    pr.z = lerp(pr.z, lerp(a.pos[2], b.pos[2], seg), k);
    pr.s = lerp(pr.s, lerp(a.scale, b.scale, seg), k);

    const t = state.clock.getElapsedTime();
    modelRef.current.position.set(pr.x, pr.y, pr.z);
    // Keep the gear's characteristic continuous spin, plus a hero-only z wobble.
    modelRef.current.rotation.z = Math.sin(t * 0.5) * 0.05 * heroInfluence;
    modelRef.current.rotation.y += 0.004 + p * 0.02;
    modelRef.current.scale.setScalar(pr.s);

    gearPose.current = { x: pr.x, y: pr.y, z: pr.z, s: pr.s };
  });

  return <primitive ref={modelRef} object={scene} scale={7} position={[40, 4, 0]} />;
};

const ScrollAutomationHero3D: React.FC = () => {
  const lightRef = useRef<RectAreaLight>(null);
  const progress = useRef(0);
  const target = useRef(new Vector3());
  const gearPose = useRef<GearPose>({ x: 40, y: 4, z: 0, s: 7 });

  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    useGLTF.preload("/models/gear/automation.glb");
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.set(x * 50, y * 30, 0);
      if (lightRef.current) lightRef.current.position.copy(target.current);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const shared: SharedRefs = { progress, target, gearPose, kf: isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE };

  return (
    <>
      {isDesktop && <MouseMoveTutorial />}
      {/* z-[1]: behind the page content (main is z-10), above the gradient backdrop (z-0). */}
      <div className="fixed inset-0 z-[1]" style={{ pointerEvents: "none" }} aria-hidden="true">
        <CanvasErrorBoundary>
          <Canvas
            style={{ background: "transparent", pointerEvents: "none" }}
            shadows={isDesktop}
            dpr={isDesktop ? [1, 2] : 1}
            gl={{ alpha: true, antialias: isDesktop, preserveDrawingBuffer: false }}
            camera={{ fov: 50, position: new Vector3(0, 0, 100) }}
          >
            <Suspense fallback={<CustomLoader />}>
              <primitive
                ref={lightRef}
                object={new RectAreaLight(0xffffff, 10, 15, 15)}
                position={[5, 5, 5]}
                intensity={5}
              />
              <ambientLight intensity={0.6} color={0xffffff} />
              <directionalLight position={[10, 10, 10]} intensity={0.6} />
              <AnimatedInstancedMesh lightRef={lightRef} {...shared} />
              <FloatingModel {...shared} />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>
    </>
  );
};

export default ScrollAutomationHero3D;

useGLTF.preload("/models/gear/automation.glb");
