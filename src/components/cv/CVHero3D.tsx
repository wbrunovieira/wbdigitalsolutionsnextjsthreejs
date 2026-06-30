"use client";

/**
 * Interactive 3D accent for the CV hero — an animated neural-network / node
 * constellation. Purple nodes (a few brighter gold "hub" nodes) float on a
 * Fibonacci sphere, wired to their nearest neighbours by faint lavender edges,
 * with golden "data pulses" streaming along the edges from node to node.
 *
 * Reads as: systems architecture, AI agent graphs (LangGraph) and a network of
 * accounts. Abstract, premium, on-brand.
 *
 * Interaction (canvas stays pointer-events:none — tracked at window level):
 *  - Parallax tilt: the whole graph leans toward the pointer.
 *  - Energy on movement: while the pointer moves, MORE pulses light up and they
 *    travel FASTER, edges/nodes brighten and rotation speeds up; it calms when idle.
 *
 * Pure procedural (no GLTF / no remote HDR). Mobile-guarded, respects
 * prefers-reduced-motion, degrades to nothing on WebGL failure via
 * CanvasErrorBoundary. No per-frame allocations: all buffers/pools are
 * preallocated and mutated in place; manual geometries/materials are disposed.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import CanvasErrorBoundary from "../CanvasErrorBoundary";

/** Brand palette. */
const COLOR_PURPLE = new THREE.Color("#792990");
const COLOR_GOLD = new THREE.Color("#ffb947");
const COLOR_LAVENDER = new THREE.Color("#aaa6c3");

/** Shared, mutable pointer state — written by a window listener, read in useFrame. */
interface PointerState {
  /** Normalized pointer X in [-1, 1]. */
  x: number;
  /** Normalized pointer Y in [-1, 1]. */
  y: number;
  /** Movement energy in [0, 1]; spikes on move, decays each frame. */
  energy: number;
}

interface SceneProps {
  pointer: React.MutableRefObject<PointerState>;
  reducedMotion: boolean;
  isDesktop: boolean;
}

/** A single travelling pulse: which edge, parametric position, and speed. */
interface Pulse {
  edge: number;
  t: number;
  speed: number;
}

interface GraphData {
  nodeGeometry: THREE.BufferGeometry;
  edgeGeometry: THREE.BufferGeometry;
  pulseGeometry: THREE.BufferGeometry;
  /** Flat [x,y,z,...] node positions, reused for pulse interpolation. */
  nodePositions: Float32Array;
  /** Edge list as [aIndex, bIndex] pairs. */
  edges: ReadonlyArray<readonly [number, number]>;
  pulses: Pulse[];
  maxPulses: number;
  basePulses: number;
}

// --- Soft round glow point shaders ---------------------------------------

const nodeVertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uPixelRatio;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (4.0 / -mv.z) * uPixelRatio;
  }
`;

const nodeFragmentShader = /* glsl */ `
  uniform float uBoost;
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.22, 0.0, d);
    vec3 col = vColor * (1.0 + uBoost) + core * 0.5;
    gl_FragColor = vec4(col, alpha);
  }
`;

const pulseVertexShader = /* glsl */ `
  attribute float aSize;
  varying float vSize;
  uniform float uPixelRatio;
  void main() {
    vSize = aSize;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (4.0 / -mv.z) * uPixelRatio;
  }
`;

const pulseFragmentShader = /* glsl */ `
  varying float vSize;
  void main() {
    if (vSize <= 0.0) discard;
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.18, 0.0, d);
    vec3 gold = vec3(1.0, 0.725, 0.278);
    gl_FragColor = vec4(gold + core * 0.6, alpha);
  }
`;

/** Build the deterministic node/edge graph + pulse pool once. */
function buildGraph(isDesktop: boolean): GraphData {
  const nodeCount = isDesktop ? 22 : 12;
  const neighbors = isDesktop ? 3 : 2;
  const maxPulses = isDesktop ? 12 : 4;
  const basePulses = isDesktop ? 6 : 2;
  const radius = 1.7;

  // Deterministic Fibonacci-sphere distribution.
  const positions = new Float32Array(nodeCount * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2; // 1 → -1
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }

  // Edges: connect each node to its `neighbors` nearest, deduped.
  const edgeSet = new Set<string>();
  const edges: Array<[number, number]> = [];
  const degree = new Array<number>(nodeCount).fill(0);
  const dist: Array<{ j: number; d: number }> = [];
  for (let i = 0; i < nodeCount; i++) {
    dist.length = 0;
    for (let j = 0; j < nodeCount; j++) {
      if (j === i) continue;
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      dist.push({ j, d: dx * dx + dy * dy + dz * dz });
    }
    dist.sort((a, b) => a.d - b.d);
    for (let k = 0; k < neighbors && k < dist.length; k++) {
      const j = dist[k].j;
      const key = i < j ? `${i}_${j}` : `${j}_${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edges.push([i, j]);
      degree[i]++;
      degree[j]++;
    }
  }

  // Hub nodes: the most-connected handful get a larger, gold-tinted glow.
  const hubCount = isDesktop ? 4 : 2;
  const byDegree = Array.from({ length: nodeCount }, (_, i) => i).sort(
    (a, b) => degree[b] - degree[a],
  );
  const isHub = new Set(byDegree.slice(0, hubCount));

  const sizes = new Float32Array(nodeCount);
  const colors = new Float32Array(nodeCount * 3);
  const hubColor = COLOR_GOLD.clone().lerp(COLOR_PURPLE, 0.25);
  for (let i = 0; i < nodeCount; i++) {
    const hub = isHub.has(i);
    sizes[i] = hub ? 34 : 18;
    const c = hub ? hubColor : COLOR_PURPLE;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  nodeGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  nodeGeometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

  // Edge line segments.
  const edgePositions = new Float32Array(edges.length * 2 * 3);
  for (let e = 0; e < edges.length; e++) {
    const [a, b] = edges[e];
    edgePositions[e * 6] = positions[a * 3];
    edgePositions[e * 6 + 1] = positions[a * 3 + 1];
    edgePositions[e * 6 + 2] = positions[a * 3 + 2];
    edgePositions[e * 6 + 3] = positions[b * 3];
    edgePositions[e * 6 + 4] = positions[b * 3 + 1];
    edgePositions[e * 6 + 5] = positions[b * 3 + 2];
  }
  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));

  // Pulse pool — preallocated buffers, mutated in place each frame.
  const pulsePositions = new Float32Array(maxPulses * 3);
  const pulseSizes = new Float32Array(maxPulses);
  const pulseGeometry = new THREE.BufferGeometry();
  pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
  pulseGeometry.setAttribute("aSize", new THREE.BufferAttribute(pulseSizes, 1));

  const pulses: Pulse[] = [];
  for (let i = 0; i < maxPulses; i++) {
    pulses.push({
      edge: Math.floor(Math.random() * Math.max(1, edges.length)),
      t: Math.random(),
      speed: 0.22 + Math.random() * 0.28,
    });
  }

  return {
    nodeGeometry,
    edgeGeometry,
    pulseGeometry,
    nodePositions: positions,
    edges,
    pulses,
    maxPulses,
    basePulses,
  };
}

const PULSE_SIZE = 22;

const NeuralGraph: React.FC<SceneProps> = ({ pointer, reducedMotion, isDesktop }) => {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);

  const graph = useMemo(() => buildGraph(isDesktop), [isDesktop]);

  const nodeUniforms = useMemo(
    () => ({ uPixelRatio: { value: 1 }, uBoost: { value: 0 } }),
    [],
  );
  const pulseUniforms = useMemo(() => ({ uPixelRatio: { value: 1 } }), []);

  const nodeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nodeVertexShader,
        fragmentShader: nodeFragmentShader,
        uniforms: nodeUniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      }),
    [nodeUniforms],
  );

  const pulseMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: pulseVertexShader,
        fragmentShader: pulseFragmentShader,
        uniforms: pulseUniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      }),
    [pulseUniforms],
  );

  // Dispose every manual GPU resource on unmount / breakpoint change.
  useEffect(() => {
    const { nodeGeometry, edgeGeometry, pulseGeometry } = graph;
    return () => {
      nodeGeometry.dispose();
      edgeGeometry.dispose();
      pulseGeometry.dispose();
    };
  }, [graph]);
  useEffect(() => () => nodeMaterial.dispose(), [nodeMaterial]);
  useEffect(() => () => pulseMaterial.dispose(), [pulseMaterial]);

  const baseSpin = reducedMotion ? 0 : 0.12;

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const p = pointer.current;

    // Energy decays toward 0; window listener spikes it on movement.
    p.energy = Math.max(0, p.energy - delta * 1.6);
    const energy = reducedMotion ? 0 : p.energy;

    // Parallax tilt toward the pointer.
    if (tilt.current) {
      const amp = reducedMotion ? 0.12 : 0.3;
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, p.y * amp, 0.05);
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, p.x * amp, 0.05);
    }

    // Idle spin, accelerated by energy.
    if (spin.current) {
      spin.current.rotation.y += delta * baseSpin * (1 + energy * 2);
    }

    // Brighten nodes + edges with energy; keep pixel ratio uniforms current.
    const pr = state.gl.getPixelRatio();
    nodeUniforms.uPixelRatio.value = pr;
    nodeUniforms.uBoost.value = energy * 0.7;
    pulseUniforms.uPixelRatio.value = pr;
    if (edgeMat.current) edgeMat.current.opacity = 0.16 + energy * 0.24;

    // Advance pulses along their edges (no allocations).
    const { pulses, edges, nodePositions: np, pulseGeometry, maxPulses, basePulses } = graph;
    const edgeCount = edges.length;
    if (edgeCount > 0) {
      const posAttr = pulseGeometry.getAttribute("position") as THREE.BufferAttribute;
      const sizeAttr = pulseGeometry.getAttribute("aSize") as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const sizeArr = sizeAttr.array as Float32Array;

      const speedMul = reducedMotion ? 0.12 : 1 + energy * 2.2;
      const activeCount = reducedMotion
        ? basePulses
        : Math.min(maxPulses, basePulses + Math.round(energy * (maxPulses - basePulses)));

      for (let i = 0; i < maxPulses; i++) {
        const pl = pulses[i];
        pl.t += delta * pl.speed * speedMul;
        if (pl.t >= 1) {
          pl.t -= Math.floor(pl.t);
          pl.edge = Math.floor(Math.random() * edgeCount);
          pl.speed = 0.22 + Math.random() * 0.28;
        }
        const edge = edges[pl.edge];
        const ai = edge[0] * 3;
        const bi = edge[1] * 3;
        const t = pl.t;
        posArr[i * 3] = np[ai] + (np[bi] - np[ai]) * t;
        posArr[i * 3 + 1] = np[ai + 1] + (np[bi + 1] - np[ai + 1]) * t;
        posArr[i * 3 + 2] = np[ai + 2] + (np[bi + 2] - np[ai + 2]) * t;
        sizeArr[i] = i < activeCount ? PULSE_SIZE : 0;
      }
      posAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={tilt}>
      <Float
        speed={reducedMotion ? 0 : 1}
        rotationIntensity={reducedMotion ? 0 : 0.25}
        floatIntensity={reducedMotion ? 0 : 0.6}
      >
        <group ref={spin}>
          {/* Edges */}
          <lineSegments geometry={graph.edgeGeometry}>
            <lineBasicMaterial
              ref={edgeMat}
              color={COLOR_LAVENDER}
              transparent
              opacity={0.16}
              depthWrite={false}
            />
          </lineSegments>

          {/* Nodes */}
          <points geometry={graph.nodeGeometry} material={nodeMaterial} />

          {/* Golden data pulses */}
          <points geometry={graph.pulseGeometry} material={pulseMaterial} />
        </group>
      </Float>
    </group>
  );
};

const CVHero3D: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointer = useRef<PointerState>({ x: 0, y: 0, energy: 0 });

  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyDesktop = () => setIsDesktop(desktopMq.matches);
    const applyMotion = () => setReducedMotion(motionMq.matches);
    applyDesktop();
    applyMotion();
    desktopMq.addEventListener("change", applyDesktop);
    motionMq.addEventListener("change", applyMotion);
    return () => {
      desktopMq.removeEventListener("change", applyDesktop);
      motionMq.removeEventListener("change", applyMotion);
    };
  }, []);

  // Window-level pointer tracking — keeps the canvas pointer-events:none.
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      const prev = pointer.current;
      const d = Math.hypot(x - prev.x, y - prev.y);
      prev.x = x;
      prev.y = y;
      prev.energy = Math.min(1, prev.energy + d * 4);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <CanvasErrorBoundary>
        <Canvas
          dpr={isDesktop ? [1, 2] : 1}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: isDesktop, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <NeuralGraph pointer={pointer} reducedMotion={reducedMotion} isDesktop={isDesktop} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default CVHero3D;
