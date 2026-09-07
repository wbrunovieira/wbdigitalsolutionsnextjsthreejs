import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SPREAD = 30;
const DEPTH = 150;

/** Gradient star field streaming through the tunnel. */
const EnhancedParticleField: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = isMobile ? 300 : 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 2] = -Math.random() * DEPTH;

      // Gradient colors
      const color = new THREE.Color();
      color.setHSL(0.8 + Math.random() * 0.2, 0.8, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    // Particle count is fixed at mount: the field is never rebuilt on resize.
    return { positions, colors };
  }, []);

  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.15;

        if (positions[i + 2] > 10) {
          positions[i + 2] = -DEPTH;
          positions[i] = (Math.random() - 0.5) * SPREAD;
          positions[i + 1] = (Math.random() - 0.5) * SPREAD;
        }
      }

      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.z += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
};

export default EnhancedParticleField;
