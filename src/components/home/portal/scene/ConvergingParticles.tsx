import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';

const COUNT = 150;
const PULL_STRENGTH = 0.02;
const CENTER_RADIUS = 0.5;

/** Spawns a particle at the screen edge with a velocity aimed at the portal center. */
const spawnParticle = (positions: Float32Array, velocities: Float32Array, i: number) => {
  const angle = Math.random() * Math.PI * 2;
  const radius = 5 + Math.random() * 3;

  positions[i] = Math.cos(angle) * radius;
  positions[i + 1] = (Math.random() - 0.5) * 8;
  positions[i + 2] = Math.sin(angle) * radius;

  velocities[i] = -positions[i] * PULL_STRENGTH;
  velocities[i + 1] = 0;
  velocities[i + 2] = -positions[i + 2] * PULL_STRENGTH;
};

/** Particles continuously pulled into the portal and respawned at the edges. */
const ConvergingParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array>();

  const particles = React.useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      spawnParticle(positions, velocities, i * 3);

      // Purple to yellow gradient
      const t = i / COUNT;
      const color = new THREE.Color();
      if (t < 0.5) {
        color.lerpColors(new THREE.Color('#792990'), new THREE.Color('#ffb947'), t * 2);
      } else {
        color.lerpColors(new THREE.Color('#ffb947'), new THREE.Color('#350545'), (t - 0.5) * 2);
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    velocitiesRef.current = velocities;
    return { positions, colors };
  }, []);

  useFrame(() => {
    if (ref.current && velocitiesRef.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const velocities = velocitiesRef.current;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        const distance = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2);
        if (distance < CENTER_RADIUS) {
          spawnParticle(positions, velocities, i);
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <ParticleField ref={ref} positions={particles.positions} colors={particles.colors} size={0.06} opacity={0.8} />;
};

export default ConvergingParticles;
