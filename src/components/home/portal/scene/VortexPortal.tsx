import React, { useRef } from 'react';
import { Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RING_COUNT = 5;

/** Nested wireframe rings spinning to suggest a vortex. */
const VortexPortal: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(RING_COUNT)].map((_, i) => (
        <Torus
          key={i}
          args={[2 + i * 0.5, 0.1, 16, 100]}
          position={[0, 0.5, -2 - i * 0.8]}
        >
          <meshStandardMaterial
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.5 - i * 0.1}
            wireframe
            transparent
            opacity={1 - i * 0.2}
          />
        </Torus>
      ))}
    </group>
  );
};

export default VortexPortal;
