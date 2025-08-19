import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

interface BallProps {
  position: [number, number, number];
  velocity: [number, number, number];
  color: string;
  emissive: string;
  delay?: number;
}

/**
 * Interactive physics-enabled ball component
 */
const InteractiveBall: React.FC<BallProps> = ({ 
  position, 
  velocity, 
  color, 
  emissive, 
  delay = 0 
}) => {
  const ballRef = useRef<THREE.Mesh>(null);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  useFrame(() => {
    if (ballRef.current && isActive) {
      // Add subtle rotation for visual interest
      ballRef.current.rotation.x += 0.01;
      ballRef.current.rotation.y += 0.01;
    }
  });

  if (!isActive) return null;

  return (
    <RigidBody 
      colliders="ball" 
      restitution={0.35} 
      friction={0.15}
      position={position}
      mass={0.8}
      linearDamping={0.3}
      angularDamping={0.2}
      linearVelocity={velocity}
    >
      <Sphere 
        ref={ballRef}
        args={[0.3, 32, 32]} 
        castShadow
        receiveShadow
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={emissive}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </RigidBody>
  );
};

export default InteractiveBall;