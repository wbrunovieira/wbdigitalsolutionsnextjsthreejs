/**
 * ContentStation - Interactive cylindrical station for the Virtual Space
 * Replaces Desk from OfficeScene with a simpler, click-based interaction
 */

import { useRef, useState, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { COLORS } from '../../constants';

interface ContentStationProps {
  position: [number, number, number];
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
}

export const ContentStation = memo(function ContentStation({
  position,
  title,
  subtitle,
  icon,
  color,
  isActive,
  onClick,
  isMobile,
}: ContentStationProps) {
  const groupRef = useRef<Group>(null);
  const iconRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Floating icon bobbing animation
    if (iconRef.current) {
      iconRef.current.position.y = 2 + Math.sin(time * 1.5) * 0.15;
    }

    // Ring pulse when active
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      if (isActive) {
        mat.emissiveIntensity = 0.6 + Math.sin(time * 3) * 0.2;
        mat.opacity = 0.8 + Math.sin(time * 3) * 0.1;
      } else if (isHovered) {
        mat.emissiveIntensity = 0.5;
        mat.opacity = 0.7;
      } else {
        mat.emissiveIntensity = 0.25;
        mat.opacity = 0.4;
      }
    }
  });

  const handlePointerEnter = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Cylindrical base */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.8, 32]} />
        <meshStandardMaterial
          color={COLORS.darkGray}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 0.81, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.4 : 0.15}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Luminous ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[1, 1.4, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Floating icon */}
      <group ref={iconRef} position={[0, 2, 0]}>
        <Text
          fontSize={isMobile ? 0.7 : 0.9}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </group>

      {/* Title */}
      <Text
        position={[0, 1.3, 0]}
        fontSize={isMobile ? 0.22 : 0.28}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
      >
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 1, 0]}
        fontSize={isMobile ? 0.14 : 0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
      >
        {subtitle}
      </Text>

      {/* Invisible hitbox for click/hover */}
      <mesh
        visible={false}
        onClick={onClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <cylinderGeometry args={[1.5, 1.5, 3, 16]} />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0, 2.5, 0]}
        intensity={isActive ? 0.6 : isHovered ? 0.4 : 0.2}
        color={color}
        distance={5}
      />
    </group>
  );
});

import * as THREE from 'three';

export default ContentStation;
