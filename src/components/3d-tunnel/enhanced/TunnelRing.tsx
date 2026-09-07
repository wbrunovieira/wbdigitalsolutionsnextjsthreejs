import React, { useRef } from 'react';
import { Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RESET_Z = -100;

/** Wireframe ring pulsing while it flies past the camera, then recycled to the back. */
const TunnelRing: React.FC<{ position: [number, number, number]; delay: number }> = ({ position, delay }) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (ref.current) {
      // Move ring towards camera
      ref.current.position.z += 0.15;

      // Pulsing effect
      const time = state.clock.getElapsedTime();
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 0.5 + Math.sin(time * 2 + delay) * 0.3;
      }

      // Reset position when passed camera
      if (ref.current.position.z > 10) {
        ref.current.position.z = RESET_Z;
      }
    }
  });

  return (
    <Torus ref={ref} args={[5, 0.3, 16, 100]} position={position}>
      <meshStandardMaterial
        ref={materialRef}
        color="#792990"
        emissive="#792990"
        emissiveIntensity={0.5}
        wireframe
      />
    </Torus>
  );
};

export default TunnelRing;
