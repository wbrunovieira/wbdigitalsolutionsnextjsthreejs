"use client";

/**
 * Scroll-driven procedural NETWORK for the /systems page (desktop only).
 *
 * A 3D constellation of nodes (services / users / integrations) linked by edges,
 * with crystalline "balls" traveling along the connections — the "platform =
 * connected ecosystem" metaphor. The balls reuse the dodecahedron +
 * MeshPhysicalMaterial look from the websites/automation pages (no bloom glow).
 *
 * Consistent in pattern: scroll-driven pose, passes BEHIND the page (z-[1]),
 * brand palette, drag-to-rotate in the hero. KEYFRAMES are placeholders to tune.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import CanvasErrorBoundary from "../CanvasErrorBoundary";

// Brand palette (same colours as the website/automation balls).
const NODE_PALETTE = ["#792990", "#350545", "#aaa6c3"];
const PULSE_COLOR = "#ffb947";
const EDGE_COLOR = "#b083d6"; // brighter lilac so the thin connecting lines read on dark

const NODE_COUNT = 48;
const PULSE_COUNT = 42;
const RADIUS = 3.8;

type Keyframe = { pos: [number, number, number]; rotY: number; scale: number };
const KEYFRAMES: Keyframe[] = [
  { pos: [2.6, -0.2, 0], rotY: 0, scale: 1.15 },        // hero (right)
  { pos: [-2.8, 0.2, 1], rotY: 1.4, scale: 1.25 },      // swing left, turn
  { pos: [2.4, 0.4, 2], rotY: 3.0, scale: 1.4 },        // right, closer
  { pos: [-2.0, 0.6, 0], rotY: 4.4, scale: 1.2 },       // left, angled
  { pos: [0, 1.6, -5], rotY: Math.PI * 2, scale: 0.78 }, // recede up & small (clears footer)
];

const HERO_ZONE = 0.08;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

type GraphNode = { pos: THREE.Vector3; size: number; spin: number };
type Pulse = { edge: number; t: number; speed: number; spin: number };

function buildGraph() {
  // Nodes on a sphere SHELL (Fibonacci sphere) so it reads as a clean network
  // globe instead of a filled blob.
  const nodes: GraphNode[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const r = RADIUS * (0.97 + Math.random() * 0.06);
    nodes.push({
      pos: new THREE.Vector3(
        Math.cos(theta) * ring * r,
        y * r * 0.92,
        Math.sin(theta) * ring * r
      ),
      size: 0.18 + Math.random() * 0.09,
      spin: 0.3 + Math.random() * 0.6,
    });
  }
  for (let h = 0; h < 5; h++) {
    nodes[Math.floor(Math.random() * NODE_COUNT)].size = 0.34 + Math.random() * 0.1;
  }

  // Connect each node to its k nearest neighbours.
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < NODE_COUNT; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (j !== i) dists.push([j, nodes[i].pos.distanceTo(nodes[j].pos)]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    const k = nodes[i].size > 0.3 ? 5 : 3;
    for (let m = 0; m < k && m < dists.length; m++) {
      const j = dists[m][0];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }
  return { nodes, edges };
}

interface NetworkProps {
  progress: React.MutableRefObject<number>;
  dragRot: React.MutableRefObject<{ x: number; y: number }>;
  dragging: React.MutableRefObject<boolean>;
  inHero: React.MutableRefObject<boolean>;
}

const Network: React.FC<NetworkProps> = ({ progress, dragRot, dragging, inHero }) => {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pulsesRef = useRef<THREE.InstancedMesh>(null);
  const pose = useRef({ x: 3.2, y: -0.2, z: 0, ry: 0, s: 1.0 });

  const { nodes, edges } = useMemo(buildGraph, []);
  const pulses = useMemo<Pulse[]>(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.45,
        spin: 0.5 + Math.random() * 0.8,
      })),
    [edges.length]
  );

  // Crystalline dodecahedron balls (same family as the websites/automation pages).
  const ballGeo = useMemo(() => new THREE.DodecahedronGeometry(1), []);
  const nodeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.35,
        metalness: 0.15,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
      }),
    []
  );
  const pulseMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(PULSE_COLOR),
        roughness: 0.25,
        metalness: 0.15,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
      }),
    []
  );

  const lineGeo = useMemo(() => {
    const positions = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], e) => {
      positions.set([nodes[a].pos.x, nodes[a].pos.y, nodes[a].pos.z], e * 6);
      positions.set([nodes[b].pos.x, nodes[b].pos.y, nodes[b].pos.z], e * 6 + 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [nodes, edges]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _a = useMemo(() => new THREE.Vector3(), []);
  const _b = useMemo(() => new THREE.Vector3(), []);

  // Per-node colours from the brand palette.
  useEffect(() => {
    if (!nodesRef.current) return;
    const c = new THREE.Color();
    nodes.forEach((_, i) => {
      c.set(NODE_PALETTE[i % NODE_PALETTE.length]);
      nodesRef.current!.setColorAt(i, c);
    });
    if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = clamp(progress.current, 0, 1);
    const time = state.clock.elapsedTime;

    // Group pose from keyframes.
    const n = KEYFRAMES.length - 1;
    const f = p * n;
    const i = Math.min(Math.floor(f), n - 1);
    const t = f - i;
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    const k = 1 - Math.pow(0.0018, delta);
    const pr = pose.current;
    pr.x = lerp(pr.x, lerp(a.pos[0], b.pos[0], t), k);
    pr.y = lerp(pr.y, lerp(a.pos[1], b.pos[1], t), k);
    pr.z = lerp(pr.z, lerp(a.pos[2], b.pos[2], t), k);
    pr.ry = lerp(pr.ry, lerp(a.rotY, b.rotY, t), k);
    pr.s = lerp(pr.s, lerp(a.scale, b.scale, t), k);

    if (inHero.current) {
      if (!dragging.current) dragRot.current.y += delta * 0.18;
    } else {
      const d = 1 - Math.pow(0.02, delta);
      dragRot.current.y = lerp(dragRot.current.y, 0, d);
      dragRot.current.x = lerp(dragRot.current.x, 0, d);
    }

    group.current.position.set(pr.x, pr.y + Math.sin(time * 0.6) * 0.05, pr.z);
    group.current.rotation.set(dragRot.current.x + 0.12, pr.ry + dragRot.current.y, 0);
    group.current.scale.setScalar(pr.s);

    // Nodes — fixed positions, gentle individual spin.
    if (nodesRef.current) {
      for (let ni = 0; ni < NODE_COUNT; ni++) {
        const nd = nodes[ni];
        dummy.position.copy(nd.pos);
        dummy.scale.setScalar(nd.size);
        dummy.rotation.set(time * nd.spin * 0.5, time * nd.spin, 0);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(ni, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Pulses — travel along edges (livelier as you scroll), spinning.
    if (pulsesRef.current) {
      const speedScale = 0.6 + p * 1.0;
      for (let pi = 0; pi < PULSE_COUNT; pi++) {
        const pulse = pulses[pi];
        pulse.t += pulse.speed * speedScale * delta;
        if (pulse.t >= 1) {
          pulse.t = 0;
          pulse.edge = Math.floor(Math.random() * edges.length);
          pulse.speed = 0.25 + Math.random() * 0.45;
        }
        const [ea, eb] = edges[pulse.edge];
        _a.copy(nodes[ea].pos);
        _b.copy(nodes[eb].pos);
        dummy.position.lerpVectors(_a, _b, pulse.t);
        dummy.scale.setScalar(0.16);
        dummy.rotation.set(time * pulse.spin * 0.6, time * pulse.spin, 0);
        dummy.updateMatrix();
        pulsesRef.current.setMatrixAt(pi, dummy.matrix);
      }
      pulsesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={0.55} toneMapped={false} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodesRef} args={[ballGeo, nodeMat, NODE_COUNT]} />
      <instancedMesh ref={pulsesRef} args={[ballGeo, pulseMat, PULSE_COUNT]} />
    </group>
  );
};

const ScrollSystems3D: React.FC = () => {
  const progress = useRef(0);
  const dragRot = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const inHeroRef = useRef(true);

  const [enabled, setEnabled] = useState(false);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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
      {/* z-[1]: behind the page content (main is z-10), above the gradient backdrop (z-0). */}
      <div className="fixed inset-0 z-[1]" style={{ pointerEvents: "none" }} aria-hidden="true">
        <CanvasErrorBoundary>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 12], fov: 45 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            style={{ background: "transparent", pointerEvents: "none" }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 6]} intensity={1.3} />
            <directionalLight position={[-6, 2, -4]} intensity={0.6} color="#aaa6c3" />
            <pointLight position={[0, 0, 9]} intensity={0.8} />
            <Network progress={progress} dragRot={dragRot} dragging={dragging} inHero={inHeroRef} />
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

export default ScrollSystems3D;
