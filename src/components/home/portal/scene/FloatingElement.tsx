import React, { useRef } from 'react';
import { Box, Sphere, Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingElementProps {
  position: [number, number, number];
  type: 'box' | 'sphere' | 'torus';
  color: string;
  delay: number;
}

/** Floating 3D primitive drifting around the portal. */
const FloatingElement: React.FC<FloatingElementProps> = ({ position, type, color, delay }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.x = time * 0.5 + delay;
      ref.current.rotation.y = time * 0.3 + delay;
      ref.current.position.y = position[1] + Math.sin(time + position[0] + delay) * 0.3;
      ref.current.position.x = position[0] + Math.cos(time * 0.5 + delay) * 0.2;
      ref.current.position.z = position[2] + Math.sin(time * 0.7 + delay) * 0.4;
    }
  });

  const material = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.4}
      metalness={0.8}
      roughness={0.2}
      transparent
      opacity={0.9}
    />
  );

  switch (type) {
    case 'box':
      return <Box ref={ref} args={[0.6, 0.6, 0.6]} position={position}>{material}</Box>;
    case 'sphere':
      return <Sphere ref={ref} args={[0.4, 32, 32]} position={position}>{material}</Sphere>;
    case 'torus':
      return <Torus ref={ref} args={[0.4, 0.15, 16, 100]} position={position}>{material}</Torus>;
  }
};

export default FloatingElement;
