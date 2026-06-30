"use client";

/**
 * Lightweight 3D accent for the CV hero — a slowly morphing, gently rotating
 * icosahedron in brand purple with a yellow wireframe shell. Pure procedural
 * (no GLTF), pointer-events:none, mobile-guarded for perf. Degrades to nothing
 * on WebGL failure via CanvasErrorBoundary.
 */

import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import CanvasErrorBoundary from "../CanvasErrorBoundary";

const Blob: React.FC = () => {
  const inner = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (inner.current) inner.current.rotation.y += delta * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={inner}>
        <Icosahedron args={[1.35, 12]}>
          <MeshDistortMaterial
            color="#792990"
            emissive="#350545"
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.4}
            distort={0.35}
            speed={1.6}
          />
        </Icosahedron>
        {/* Yellow wireframe shell */}
        <Icosahedron args={[1.55, 1]}>
          <meshBasicMaterial color="#ffb947" wireframe transparent opacity={0.18} />
        </Icosahedron>
      </group>
    </Float>
  );
};

const CVHero3D: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
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
            <hemisphereLight intensity={1.4} groundColor="#1a0826" />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffb947" />
            <pointLight position={[-5, -3, 2]} intensity={1.4} color="#9b3fb5" />
            <Blob />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default CVHero3D;
