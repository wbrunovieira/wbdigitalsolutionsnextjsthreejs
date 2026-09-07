import React, { useRef, useState } from 'react';
import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import Dust from './Dust';
import ProjectCard3D from './ProjectCard3D';
import Rig from './Rig';
import { ACCENT, BRAND_PURPLE } from './heroTheme';
import { ProjectCategory, ShowcaseProject } from './heroContent';

const RADIUS = 3.4;
const SCROLL_DELAY_MS = 550;

interface StageProps {
  projects: ShowcaseProject[];
  ctaLabel: string;
  onSelect: (category: ProjectCategory) => void;
  targetRotation: React.MutableRefObject<number>;
  dragging: React.MutableRefObject<boolean>;
  didDrag: React.MutableRefObject<boolean>;
}

/** The 3D stage: lighting, the rotating card ring, reflective floor and post-processing. */
const HeroStage: React.FC<StageProps> = ({ projects, ctaLabel, onSelect, targetRotation, dragging, didDrag }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const ringRef = useRef<THREE.Group>(null);
  const n = projects.length;

  useFrame(() => {
    // Slow idle spin, paused while dragging or hovering.
    if (!dragging.current && hovered === null) targetRotation.current += 0.0016;
    if (ringRef.current) {
      ringRef.current.rotation.y = THREE.MathUtils.lerp(
        ringRef.current.rotation.y,
        targetRotation.current,
        0.08,
      );
    }
  });

  // Rotate the clicked card to the front (shortest path), then filter.
  const bringToFront = (base: number, category: ProjectCategory) => {
    if (didDrag.current) return; // it was a drag, not a tap
    let desired = -base;
    desired += Math.round((targetRotation.current - desired) / (Math.PI * 2)) * Math.PI * 2;
    targetRotation.current = desired;
    onSelect(category);
    // Reveal the filtered projects of this type below.
    setTimeout(() => {
      document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, SCROLL_DELAY_MS);
  };

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 6]} intensity={1.2} />

      <Environment frames={1} resolution={256}>
        <Lightformer intensity={2} color="#ffffff" position={[0, 5, -5]} scale={[12, 5, 1]} />
        <Lightformer intensity={3} color={ACCENT} position={[6, 1, 3]} scale={[7, 7, 1]} />
        <Lightformer intensity={2.6} color={BRAND_PURPLE} position={[-7, 1, 3]} scale={[7, 7, 1]} />
        <Lightformer intensity={1.4} color="#ffffff" position={[0, -3, 4]} scale={[12, 2, 1]} />
      </Environment>

      {/* Rotating carousel ring */}
      <group ref={ringRef}>
        {projects.map((p, i) => {
          const base = (i / n) * Math.PI * 2;
          const position: [number, number, number] = [
            Math.sin(base) * RADIUS,
            0,
            Math.cos(base) * RADIUS,
          ];
          return (
            <ProjectCard3D
              key={p.id}
              project={p}
              position={position}
              rotationY={base}
              isHovered={hovered === p.id}
              dimmed={hovered !== null && hovered !== p.id}
              ctaLabel={ctaLabel}
              onHover={setHovered}
              onClick={() => bringToFront(base, p.category)}
            />
          );
        })}
      </group>

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
        <planeGeometry args={[70, 70]} />
        <MeshReflectorMaterial
          blur={[320, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={28}
          roughness={0.9}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          color="#0c0414"
          metalness={0.6}
          mirror={0.45}
        />
      </mesh>
      <ContactShadows position={[0, -2.38, 0]} opacity={0.55} scale={30} blur={2.6} far={6} color="#000000" />

      <Dust />
      <Rig dragging={dragging} />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.6} intensity={1.1} radius={0.7} />
        <DepthOfField target={[0, 0, RADIUS]} focalLength={0.025} bokehScale={2.4} height={480} />
        <Vignette eskil={false} offset={0.3} darkness={0.72} />
      </EffectComposer>
    </>
  );
};

export default HeroStage;
