import React, { useRef } from 'react';
import { Float, RoundedBox, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ACCENT, BRAND_PURPLE } from './heroTheme';
import { ShowcaseProject } from './heroContent';

const W = 2.6;
const H = 3.4;
const D = 0.22;
const halfH = H / 2;
const faceZ = D / 2 + 0.06;

interface CardProps {
  project: ShowcaseProject;
  position: [number, number, number];
  rotationY: number;
  isHovered: boolean;
  dimmed: boolean;
  ctaLabel: string;
  onHover: (id: string | null) => void;
  onClick: () => void;
}

const ProjectCard3D: React.FC<CardProps> = ({
  project,
  position,
  rotationY,
  isHovered,
  dimmed,
  ctaLabel,
  onHover,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const liftTarget = position[1] + (isHovered ? 0.3 : 0);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, liftTarget, 0.1);
    const scaleTarget = isHovered ? 1.06 : 1;
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, scaleTarget, 0.12);
    groupRef.current.scale.setScalar(s);
  });

  const cardOpacity = dimmed ? 0.35 : 1;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(project.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
        {/* Glass / obsidian card — solid so the back never shows through */}
        <RoundedBox args={[W, H, D]} radius={0.14} smoothness={6}>
          <meshPhysicalMaterial
            color="#1a0726"
            metalness={0.55}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.12}
            emissive={BRAND_PURPLE}
            emissiveIntensity={isHovered ? 0.5 : dimmed ? 0.1 : 0.24}
            envMapIntensity={1.4}
          />
        </RoundedBox>

        {/* Amber rim (blooms) */}
        <RoundedBox args={[W, H, D]} radius={0.14} smoothness={6} scale={[1.012, 1.01, 1.0]}>
          <meshBasicMaterial
            color={ACCENT}
            toneMapped={false}
            transparent
            opacity={(isHovered ? 0.9 : 0.45) * cardOpacity}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </RoundedBox>

        {/* Header accent bar */}
        <mesh position={[0, halfH * 0.88, faceZ]}>
          <boxGeometry args={[W * 0.26, 0.05, 0.02]} />
          <meshBasicMaterial color={ACCENT} toneMapped={false} transparent opacity={cardOpacity} depthWrite={false} />
        </mesh>

        {/* Icon chip ring + fill */}
        <mesh position={[0, halfH * 0.42, faceZ]}>
          <ringGeometry args={[0.46, 0.54, 48]} />
          <meshBasicMaterial
            color={ACCENT}
            toneMapped={false}
            transparent
            opacity={(isHovered ? 0.95 : 0.6) * cardOpacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, halfH * 0.42, faceZ - 0.01]}>
          <circleGeometry args={[0.5, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.1 * cardOpacity} depthWrite={false} />
        </mesh>

        {/* Icon */}
        <Text position={[0, halfH * 0.42, faceZ + 0.05]} fontSize={0.46} anchorX="center" anchorY="middle">
          {project.icon}
        </Text>

        {/* Title — anchored from the top so a two-line title grows downward
            (away from the icon) instead of expanding into it. */}
        <Text
          position={[0, halfH * 0.056, faceZ + 0.05]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          textAlign="center"
          maxWidth={W * 0.68}
          lineHeight={1.18}
          fillOpacity={cardOpacity}
        >
          {project.title}
        </Text>

        {/* Divider */}
        <mesh position={[0, -halfH * 0.32, faceZ]}>
          <boxGeometry args={[W * 0.46, 0.012, 0.01]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.4 * cardOpacity} depthWrite={false} />
        </mesh>

        {/* Category label */}
        <Text
          position={[0, -halfH * 0.44, faceZ + 0.05]}
          fontSize={0.11}
          color={ACCENT}
          anchorX="center"
          anchorY="middle"
          letterSpacing={project.descriptor ? 0.08 : 0.2}
          maxWidth={W * 0.86}
          fillOpacity={cardOpacity}
        >
          {project.descriptor ?? project.category.toUpperCase()}
        </Text>

        {/* CTA */}
        <Text
          position={[0, -halfH * 0.68, faceZ + 0.05]}
          fontSize={0.135}
          color={isHovered ? '#ffb947' : '#aaa6c3'}
          anchorX="center"
          anchorY="middle"
          fillOpacity={cardOpacity}
        >
          {`${ctaLabel}  →`}
        </Text>

        {isHovered && <pointLight position={[0, 0, 1.6]} intensity={3} color={ACCENT} distance={6} />}
      </Float>
    </group>
  );
};

export default ProjectCard3D;
