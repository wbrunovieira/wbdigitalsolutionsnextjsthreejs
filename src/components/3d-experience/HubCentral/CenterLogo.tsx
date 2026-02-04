/**
 * CenterLogo - WB Logo in the center of the Hub
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { COLORS } from '../constants';

export function CenterLogo() {
  const groupRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      // Floating motion
      groupRef.current.position.y = 1 + Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
    }

    if (glowRef.current) {
      // Pulsing glow
      const scale = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
      glowRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {/* WB Text Logo */}
      <Text
        fontSize={1.5}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
      >
        WB
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color={COLORS.purple}
        anchorX="center"
        anchorY="middle"
      >
        DIGITAL SOLUTIONS
      </Text>

      {/* Glow ring below */}
      <mesh
        ref={glowRef}
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.5, 2.5, 64]} />
        <meshStandardMaterial
          color={COLORS.purple}
          emissive={COLORS.purple}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow circle */}
      <mesh
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial
          color={COLORS.purple}
          emissive={COLORS.purple}
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

export default CenterLogo;
