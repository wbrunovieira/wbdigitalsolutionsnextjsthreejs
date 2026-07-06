'use client';

/**
 * PROTOTYPE — scroll-driven 3D website hero (desktop only).
 *
 * Mirrors the home `ScrollComputer3D` pattern: a single persistent (fixed)
 * canvas, `pointer-events: none` so it NEVER blocks the page.
 *
 * HERO (scroll ~0): unchanged behaviour — the MacBook opens, the dodecahedron
 *   "balls" swarm toward the mouse with a moving rect-area light, and the laptop
 *   floats + tilts toward the cursor.
 *
 * ON SCROLL: the laptop follows KEYFRAMES (descend → approach → full spin) and a
 *   SUBSET of balls ("companions") leave the swarm to orbit the laptop, rotating
 *   and closing in, while the rest fade out. Reversible on scroll-up.
 *
 * Mobile keeps the original boxed AnimatedBackgroundWebsite (handled in the page).
 * KEYFRAMES are placeholders to iterate on (the "choreography").
 */

import React, { useMemo, useEffect, useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
  Mesh,
  MeshStandardMaterial,
} from 'three';
import { useGLTF, useTexture, Html, useProgress } from '@react-three/drei';
import { animate } from 'framer-motion';
import CanvasErrorBoundary from '../CanvasErrorBoundary';
import Loader from '../Loader';
import MouseMoveTutorial from '../MouseMoveTutorial';

const NUM_INSTANCES = 400;
const MIN_DISTANCE = 4;
const INTERACTION_DISTANCE = 10;
const INTENSITY_SCALE = 3000;
const MIN_INTENSITY_CLOSE = 1000;

// 1 in EVERY_NTH balls becomes a "companion" that follows the laptop on scroll.
const COMPANION_EVERY = 9;

// Hero band: full mouse-swarm/float influence below HERO_ZONE, fading out by HERO_END.
const HERO_ZONE = 0.06;
const HERO_END = 0.16;

// Laptop choreography in world space (camera at z = 100). PLACEHOLDERS — tune.
type Keyframe = { pos: [number, number, number]; rotY: number; scale: number };
const KEYFRAMES: Keyframe[] = [
  { pos: [45, -1, 0], rotY: 0, scale: 14 },              // hero (right)
  { pos: [10, -10, 25], rotY: 1.2, scale: 16 },          // move in, descend, turn
  { pos: [-20, -22, 10], rotY: 3.0, scale: 13 },         // lower-left, keep turning
  { pos: [0, -14, -18], rotY: Math.PI * 2, scale: 9 },   // recede back & up, small (clears footer)
];

// Mobile: narrow viewport → keep x≈0 (centered), depth/scale carry the motion.
const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -18, 10], rotY: 0.25, scale: 8 },           // hero: full laptop, lower, not clipped
  { pos: [0, -22, 18], rotY: 1.1, scale: 9 },            // approach + descend (gentle)
  { pos: [0, -26, 4], rotY: 2.4, scale: 7.5 },           // pass lower-center, turning, recede
  { pos: [0, -16, -26], rotY: Math.PI * 2, scale: 5 },   // recede small + back up (clears footer)
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

type LaptopPose = { x: number; y: number; z: number; s: number };

interface SharedRefs {
  progress: React.MutableRefObject<number>;
  target: React.MutableRefObject<Vector3>; // ball swarm target (world)
  pointer: React.MutableRefObject<{ x: number; y: number }>; // normalised -1..1
  laptopPose: React.MutableRefObject<LaptopPose>;
  kf: Keyframe[]; // pose table for the current variant (desktop/mobile)
}

/* -------------------------------------------------------------------------- */
/* Loader                                                                     */
/* -------------------------------------------------------------------------- */

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
        <div style={{ color: 'white', textAlign: 'center' }}>
          <p>Loading 3D models...</p>
        </div>
      </Html>
    );
  }
  return <Loader />;
};

/* -------------------------------------------------------------------------- */
/* Balls                                                                      */
/* -------------------------------------------------------------------------- */

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

const AnimatedInstancedMesh: React.FC<BallsProps> = ({ lightRef, progress, target, laptopPose }) => {
  const geometry = useMemo(() => new DodecahedronGeometry(0.85), []);
  const material = useMemo(
    () => new MeshPhysicalMaterial({ vertexColors: true, transparent: true }),
    [],
  );
  const dummy = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>(null);
  const _dir = useMemo(() => new Vector3(), []);
  const _personalTarget = useMemo(() => new Vector3(), []);
  const _orbit = useMemo(() => new Vector3(), []);

  // Fewer particles on mobile (less clutter on a small screen + perf).
  const count = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches ? 140 : NUM_INSTANCES),
    [],
  );

  const instances = useMemo<Instance[]>(() => {
    const list: Instance[] = [];
    for (let i = 0; i < count; i++) {
      let position: Vector3;
      let overlapping: boolean;
      let attempt = 0;
      do {
        // Ellipsoid distribution (not a box) so the cloud reads organic, not square.
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const rad = Math.cbrt(Math.random()); // uniform within the volume
        const sp = Math.sin(phi);
        position = new Vector3(
          Math.cos(theta) * sp * rad * 34,
          Math.sin(theta) * sp * rad * 22,
          Math.cos(phi) * rad * 12,
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
        orbitRadius: 12 + Math.random() * 10,
        orbitSpeed: 0.4 + Math.random() * 0.5,
        orbitTilt: Math.random() * Math.PI,
      });
    }
    return list;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const palette = [
      new Color('#792990'),
      new Color('#350545'),
      new Color('#aaa6c3'),
      new Color('#ffb947'),
    ];
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
    geometry.setAttribute('color', new InstancedBufferAttribute(colors, 3));
    geometry.attributes.color.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [geometry, dummy, instances]);

  useFrame((state) => {
    if (!meshRef.current || !lightRef.current) return;
    const p = clamp(progress.current, 0, 1);
    const heroInfluence = 1 - smoothstep(HERO_ZONE, HERO_END, p);
    const gather = smoothstep(HERO_ZONE, 0.5, p); // companions pull toward laptop
    const fade = smoothstep(HERO_ZONE, 0.35, p); // non-companions shrink away
    const t = state.clock.getElapsedTime();
    const lp = laptopPose.current;

    let intensityAccum = 0;
    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i];

      // Swarm physics toward the mouse — only meaningful in the hero band.
      _personalTarget.copy(target.current).add(inst.offset);
      _dir.copy(_personalTarget).sub(inst.position).normalize().multiplyScalar(inst.attraction * heroInfluence);
      inst.velocity.add(_dir).clampScalar(-inst.vlimit, inst.vlimit);
      inst.position.add(inst.velocity);

      let scale = 1;
      if (inst.companion && gather > 0.001) {
        // Orbit the laptop, closing in as we scroll.
        const ang = inst.baseAngle + t * inst.orbitSpeed + p * Math.PI;
        const r = lerp(inst.orbitRadius, inst.orbitRadius * 0.4, gather);
        _orbit.set(
          lp.x + Math.cos(ang) * r,
          lp.y + Math.sin(ang) * r * 0.6,
          lp.z + Math.sin(ang + inst.orbitTilt) * r * 0.5,
        );
        inst.position.lerp(_orbit, gather * 0.12 + 0.02);
      } else if (!inst.companion) {
        scale = 1 - fade; // the rest of the swarm fades out on scroll
      }

      dummy.position.copy(inst.position);
      dummy.rotation.x += 0.002;
      dummy.rotation.y += 0.002;
      dummy.scale.setScalar(Math.max(scale, 0.0001));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const d = inst.position.distanceTo(target.current);
      if (d < MIN_DISTANCE) {
        intensityAccum = Math.max(
          intensityAccum,
          Math.max(MIN_INTENSITY_CLOSE, (INTENSITY_SCALE * (MIN_DISTANCE - d)) / MIN_DISTANCE),
        );
      } else if (d < INTERACTION_DISTANCE) {
        intensityAccum = Math.max(intensityAccum, (MIN_INTENSITY_CLOSE * (INTERACTION_DISTANCE - d)) / INTERACTION_DISTANCE);
      }
    }

    // Light follows the mouse in the hero, calms down as we scroll away.
    const targetIntensity = intensityAccum * heroInfluence;
    lightRef.current.intensity = lightRef.current.intensity * 0.9 + targetIntensity * 0.1;
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, instances.length]} />;
};

/* -------------------------------------------------------------------------- */
/* Laptop                                                                     */
/* -------------------------------------------------------------------------- */

const FloatingModel: React.FC<SharedRefs> = ({ progress, pointer, laptopPose, kf }) => {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/macbook-pro.glb');
  const screenTexture = useTexture('/models/screen.png');
  screenTexture.flipY = false;

  // Lerped base pose driven by scroll.
  const pose = useRef({ x: 45, y: -1, z: 0, ry: 0, s: 14 });

  useMemo(() => {
    scene.traverse((node) => {
      if (node instanceof Mesh) {
        if (node.name === 'Screen') {
          node.material = new MeshStandardMaterial({ map: screenTexture, metalness: 0.2, roughness: 0.9 });
        } else {
          node.material = new MeshStandardMaterial({ color: new Color(0xa9a9a9), metalness: 0.3, roughness: 0.5 });
        }
      }
    });
  }, [scene, screenTexture]);

  // Open the lid on mount.
  useEffect(() => {
    const frameNode = scene.children.find((node) => node.name === 'Frame');
    if (frameNode) {
      frameNode.rotation.x = Math.PI / 2;
      animate(frameNode.rotation.x, 0, {
        type: 'spring',
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

    // Interpolate the keyframe list by progress.
    const n = kf.length - 1;
    const f = p * n;
    const i = Math.min(Math.floor(f), n - 1);
    const seg = f - i;
    const a = kf[i];
    const b = kf[i + 1];

    const k = 1 - Math.pow(0.0015, delta); // frame-rate-independent damping
    const pr = pose.current;
    pr.x = lerp(pr.x, lerp(a.pos[0], b.pos[0], seg), k);
    pr.y = lerp(pr.y, lerp(a.pos[1], b.pos[1], seg), k);
    pr.z = lerp(pr.z, lerp(a.pos[2], b.pos[2], seg), k);
    pr.ry = lerp(pr.ry, lerp(a.rotY, b.rotY, seg), k);
    pr.s = lerp(pr.s, lerp(a.scale, b.scale, seg), k);

    const t = state.clock.getElapsedTime();
    const floatY = Math.sin(t) * 1.5 * heroInfluence;
    const wobbleZ = Math.sin(t * 0.5) * 0.05 * heroInfluence;
    const tiltY = pointer.current.x * 0.3 * heroInfluence;
    const tiltX = -pointer.current.y * 0.15 * heroInfluence;

    modelRef.current.position.set(pr.x, pr.y + floatY, pr.z);
    modelRef.current.rotation.set(tiltX, pr.ry + tiltY, wobbleZ);
    modelRef.current.scale.setScalar(pr.s);

    // Publish a stable center (no float jitter) for the companion balls to orbit.
    laptopPose.current = { x: pr.x, y: pr.y, z: pr.z, s: pr.s };
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
};

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

const ScrollWebsiteHero3D: React.FC = () => {
  const lightRef = useRef<RectAreaLight>(null);
  const progress = useRef(0);
  const target = useRef(new Vector3());
  const pointer = useRef({ x: 0, y: 0 });
  const laptopPose = useRef<LaptopPose>({ x: 45, y: -1, z: 0, s: 14 });

  // Render on all sizes now; pick the pose table by width. Read synchronously on
  // first render (ssr:false) so the variant is right immediately.
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Preload assets.
  useEffect(() => {
    useGLTF.preload('/models/macbook-pro.glb');
    useTexture.preload('/models/screen.png');
  }, []);

  // Mouse → swarm target + light position + normalised pointer (desktop only).
  useEffect(() => {
    if (!isDesktop) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current = { x, y };
      target.current.set(x * 50, y * 30, 0);
      if (lightRef.current) lightRef.current.position.copy(target.current);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isDesktop]);

  // Scroll progress over the whole page.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const shared: SharedRefs = { progress, target, pointer, laptopPose, kf: isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE };

  return (
    <>
      {isDesktop && <MouseMoveTutorial />}
      {/* z-[1]: behind the page content (main is z-10) so the laptop passes
          BEHIND the opaque sections as it descends, but above the fixed
          gradient backdrop (z-0) so it stays visible through the hero. */}
      <div className="fixed inset-0 z-[1]" style={{ pointerEvents: 'none' }} aria-hidden="true">
        <CanvasErrorBoundary>
          <Canvas
            style={{ background: 'transparent', pointerEvents: 'none' }}
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

export default ScrollWebsiteHero3D;

useGLTF.preload('/models/macbook-pro.glb');
useTexture.preload('/models/screen.png');
