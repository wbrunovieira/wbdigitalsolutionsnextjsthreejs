/**
 * HubParticles - Ambient particles around the Hub
 */

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, Color, AdditiveBlending } from 'three';

interface HubParticlesProps {
  count?: number;
}

export const HubParticles = memo(function HubParticles({ count = 500 }: HubParticlesProps) {
  const particlesRef = useRef<Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical distribution around the hub
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Varied colors (purple to yellow spectrum)
      const color = new Color();
      const hue = 0.75 + Math.random() * 0.15; // Purple range
      if (Math.random() > 0.7) {
        color.setHSL(0.12, 0.9, 0.6); // Yellow accent
      } else {
        color.setHSL(hue, 0.8, 0.6);
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varied sizes
      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
});

export default HubParticles;
