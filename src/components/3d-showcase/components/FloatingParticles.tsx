import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS, ANIMATION } from '../constants';

/**
 * Floating particles component that creates magical atmosphere
 */
const FloatingParticles: React.FC = () => {
  const ref = useRef<THREE.Group>(null);
  
  // Generate particle spheres
  const particles = useMemo(() => {
    const temp = [];
    const count = 200;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 15 + Math.random() * 15;
      const height = Math.random() * 15;
      
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
      const y = height;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 3;
      
      const size = Math.random() * 0.15 + 0.05;
      
      temp.push({ position: [x, y, z], size });
    }
    
    return temp;
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += ANIMATION.particleRotationSpeed;
      ref.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.002;
      });
    }
  });
  
  return (
    <group ref={ref}>
      {particles.map((particle, i) => (
        <Sphere
          key={i}
          args={[particle.size, 8, 8]}
          position={particle.position as [number, number, number]}
        >
          <meshStandardMaterial
            color={COLORS.purple}
            emissive={COLORS.purple}
            emissiveIntensity={1.5}
            transparent
            opacity={0.7}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default FloatingParticles;