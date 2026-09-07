import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingValueProps {
  text: string;
  position: [number, number, number];
  color: string;
  speed: number;
}

const SPIRAL_RADIUS = 3;

/** Company value word spiralling towards the camera. */
const FloatingValue: React.FC<FloatingValueProps> = ({ text, position, color, speed }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();

      // Move towards camera
      ref.current.position.z += speed;

      // Spiral motion
      ref.current.position.x = position[0] + Math.cos(time + ref.current.position.z * 0.1) * SPIRAL_RADIUS;
      ref.current.position.y = position[1] + Math.sin(time + ref.current.position.z * 0.1) * SPIRAL_RADIUS;

      ref.current.rotation.y += 0.02;
      ref.current.rotation.x = Math.sin(time) * 0.1;

      if (ref.current.position.z > 10) {
        ref.current.position.z = -120;
      }
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.4}
        color={color}
        fontWeight={700}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.3}
        />
      </Text>
    </group>
  );
};

export default FloatingValue;
