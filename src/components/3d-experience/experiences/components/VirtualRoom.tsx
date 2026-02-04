/**
 * VirtualRoom - Simplified room environment for the Virtual Space experience
 * Adapted from the OfficeScene Room without physics
 */

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';
import { COLORS } from '../../constants';

interface VirtualRoomProps {
  mainContentTitle: string;
  mainContentSubtitle: string;
  resourcesTitle: string;
  resourceItems: string[];
  isMobile: boolean;
}

export const VirtualRoom = memo(function VirtualRoom({
  mainContentTitle,
  mainContentSubtitle,
  resourcesTitle,
  resourceItems,
  isMobile,
}: VirtualRoomProps) {
  const ledRef = useRef<Mesh>(null);
  const scanlineRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // LED pulsing animation
    if (ledRef.current) {
      const material = ledRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.3;
    }

    // Scanline effect on back wall screen
    if (scanlineRef.current) {
      scanlineRef.current.position.y = 2.5 + ((time * 0.5) % 3) - 1.5;
    }
  });

  const wallThickness = 0.15;
  const roomWidth = 14;
  const roomDepth = 12;
  const roomHeight = 6;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          color={COLORS.darkGray}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Floor polished overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[roomWidth - 1, roomDepth - 1]} />
        <meshStandardMaterial
          color="#1e1e2e"
          metalness={0.8}
          roughness={0.15}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Central luminous ring on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2.5, 3, 64]} />
        <meshStandardMaterial
          color={COLORS.purple}
          emissive={COLORS.purple}
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Station spot indicators on floor */}
      {[
        { pos: [0, 0.02, -5] as [number, number, number], color: COLORS.purple },
        { pos: [-5, 0.02, 0] as [number, number, number], color: COLORS.yellow },
        { pos: [5, 0.02, 0] as [number, number, number], color: COLORS.blue },
      ].map((spot, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={spot.pos}>
          <ringGeometry args={[0.8, 1.2, 32]} />
          <meshStandardMaterial
            color={spot.color}
            emissive={spot.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Back wall */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
        <boxGeometry args={[roomWidth, roomHeight, wallThickness]} />
        <meshStandardMaterial color="#1a1028" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Back wall screen - "Knowledge Module" */}
      <group position={[0, 3.5, -roomDepth / 2 + 0.1]}>
        {/* Screen frame */}
        <mesh>
          <boxGeometry args={[6, 3, 0.08]} />
          <meshStandardMaterial
            color="#0a0a12"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Screen content area */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[5.6, 2.6]} />
          <meshStandardMaterial
            color="#110820"
            emissive={COLORS.purple}
            emissiveIntensity={0.08}
          />
        </mesh>
        {/* Screen title */}
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.35}
          color={COLORS.white}
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
        >
          {mainContentTitle}
        </Text>
        <Text
          position={[0, -0.1, 0.1]}
          fontSize={0.18}
          color={COLORS.yellow}
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
        >
          {mainContentSubtitle}
        </Text>
        {/* Scanline effect */}
        <mesh ref={scanlineRef} position={[0, 0, 0.06]}>
          <planeGeometry args={[5.6, 0.03]} />
          <meshStandardMaterial
            color={COLORS.purple}
            emissive={COLORS.purple}
            emissiveIntensity={0.6}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* LED indicator */}
        <mesh ref={ledRef} position={[2.5, 1.2, 0.05]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={COLORS.yellow}
            emissive={COLORS.yellow}
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Screen border glow */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[5.8, 2.8]} />
          <meshStandardMaterial
            color={COLORS.purple}
            emissive={COLORS.purple}
            emissiveIntensity={0.15}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>

      {/* Left wall with window */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, roomHeight, roomDepth]} />
        <meshStandardMaterial color="#1a1028" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Window cutout (transparent panel) */}
      <mesh position={[-roomWidth / 2 + 0.1, 3.5, 0]}>
        <planeGeometry args={[0.01, 2.5]} />
        <meshStandardMaterial
          color={COLORS.blue}
          emissive={COLORS.blue}
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
        />
      </mesh>
      {/* Window light beam */}
      {!isMobile && (
        <spotLight
          position={[-roomWidth / 2, 4, 0]}
          angle={0.6}
          penumbra={0.8}
          intensity={0.4}
          color={COLORS.blue}
          target-position={[0, 0, 0]}
        />
      )}

      {/* Right wall with resource display */}
      <mesh position={[roomWidth / 2, roomHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, roomHeight, roomDepth]} />
        <meshStandardMaterial color="#1a1028" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Resource display panel */}
      <group position={[roomWidth / 2 - 0.1, 3, -1]}>
        {/* Panel background */}
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial
            color="#0a0a12"
            emissive={COLORS.purple}
            emissiveIntensity={0.05}
          />
        </mesh>
        {/* Title */}
        <Text
          position={[-0.05, 1, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.25}
          color={COLORS.yellow}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
        >
          {resourcesTitle}
        </Text>
        {/* Resource items list */}
        {resourceItems.map((item, i) => (
          <Text
            key={i}
            position={[-0.05, 0.3 - i * 0.45, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            fontSize={0.18}
            color={COLORS.white}
            anchorX="center"
            anchorY="middle"
          >
            {`• ${item}`}
          </Text>
        ))}
      </group>

      {/* No front wall — open view for camera at [8,5,8] */}

      {/* Ceiling (subtle) */}
      <mesh position={[0, roomHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          color="#0a0a12"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
});

// Need this import for the material type assertion
import * as THREE from 'three';

export default VirtualRoom;
