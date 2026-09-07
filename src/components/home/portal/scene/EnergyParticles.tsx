import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';

const COUNT = 70;

/** Spiral of particles orbiting the portal mouth. */
const EnergyParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);

  const particles = React.useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2 * 3;
      const radius = 0.5 + (i / COUNT) * 3;
      const height = (Math.random() - 0.5) * 6;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 2;

      // Gradient colors
      const color = new THREE.Color();
      color.setHSL(0.8 + (i / COUNT) * 0.2, 0.9, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.y = time * 0.2;

      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const angle = time + (i / 3) * 0.1;
        const radius = 0.5 + ((i / 3) / (positions.length / 3)) * 3;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 2] = Math.sin(angle) * radius - 2;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <ParticleField ref={ref} positions={particles.positions} colors={particles.colors} size={0.08} opacity={0.9} />;
};

export default EnergyParticles;
