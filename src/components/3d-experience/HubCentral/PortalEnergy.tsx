/**
 * PortalEnergy - Animated energy effect inside the portal
 */

import { useRef, useMemo, useEffect, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Points,
  AdditiveBlending,
  Color,
  BufferGeometry,
  PointsMaterial as ThreePointsMaterial,
  MeshStandardMaterial,
} from 'three';
import { COLORS } from '../constants';

interface PortalEnergyProps {
  active: boolean;
  color?: string;
  width?: number;
  height?: number;
}

export const PortalEnergy = memo(function PortalEnergy({
  active,
  color = COLORS.purple,
  width = 2,
  height = 3,
}: PortalEnergyProps) {
  const particlesRef = useRef<Points>(null);
  const interiorGeoRef = useRef<BufferGeometry>(null);
  const edgeGeoRef = useRef<BufferGeometry>(null);
  const interiorMatRef = useRef<ThreePointsMaterial>(null);
  const edgeMatRef = useRef<ThreePointsMaterial>(null);
  const surfaceMatRef = useRef<MeshStandardMaterial>(null);

  const archRadius = width / 2;
  const pillarHeight = height - archRadius;

  const colorObj = useMemo(() => new Color(color), [color]);

  // Portal surface particles
  const { positions, randomFactors } = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const rand = Math.random();

      if (rand < 0.4) {
        const angle = Math.random() * Math.PI;
        const r = archRadius * (0.3 + Math.random() * 0.6);
        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = pillarHeight + Math.sin(angle) * r;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      } else {
        positions[i * 3] = (Math.random() - 0.5) * width * 0.8;
        positions[i * 3 + 1] = Math.random() * pillarHeight;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      }

      randomFactors[i] = Math.random();
    }

    return { positions, randomFactors };
  }, [archRadius, pillarHeight, width]);

  // Edge particles
  const edgeParticles = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = i / count;

      if (t < 0.5) {
        const angle = t * 2 * Math.PI;
        positions[i * 3] = Math.cos(angle) * archRadius;
        positions[i * 3 + 1] = pillarHeight + Math.sin(angle) * archRadius;
        positions[i * 3 + 2] = 0;
      } else {
        const pillarT = (t - 0.5) * 2;
        if (pillarT < 0.5) {
          positions[i * 3] = -archRadius;
          positions[i * 3 + 1] = pillarT * 2 * pillarHeight;
          positions[i * 3 + 2] = 0;
        } else {
          positions[i * 3] = archRadius;
          positions[i * 3 + 1] = (pillarT - 0.5) * 2 * pillarHeight;
          positions[i * 3 + 2] = 0;
        }
      }
    }

    return positions;
  }, [archRadius, pillarHeight]);

  // Animate only z-axis with reduced frequency (every other frame)
  const frameCount = useRef(0);
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const speed = active ? 0.03 : 0.01;
      particlesRef.current.rotation.z += speed;

      // Update every other frame to reduce CPU load
      frameCount.current++;
      if (frameCount.current % 2 === 0) {
        const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const time = clock.getElapsedTime();

        for (let i = 0; i < posArr.length / 3; i++) {
          const offset = randomFactors[i] * Math.PI * 2;
          posArr[i * 3 + 2] = Math.sin(time * 2 + offset) * 0.15;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  // Dispose geometries and materials on unmount
  useEffect(() => {
    return () => {
      interiorGeoRef.current?.dispose();
      edgeGeoRef.current?.dispose();
      interiorMatRef.current?.dispose();
      edgeMatRef.current?.dispose();
      surfaceMatRef.current?.dispose();
    };
  }, []);

  return (
    <group>
      {/* Portal surface glow */}
      <mesh position={[0, pillarHeight / 2 + archRadius / 2, 0]}>
        <planeGeometry args={[width * 0.9, height * 0.85]} />
        <meshStandardMaterial
          ref={surfaceMatRef}
          color={colorObj}
          emissive={colorObj}
          emissiveIntensity={active ? 0.4 : 0.15}
          transparent
          opacity={active ? 0.25 : 0.1}
          side={2}
        />
      </mesh>

      {/* Interior particles */}
      <points ref={particlesRef}>
        <bufferGeometry ref={interiorGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={interiorMatRef}
          size={active ? 0.1 : 0.06}
          color={colorObj}
          transparent
          opacity={active ? 0.9 : 0.4}
          blending={AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Edge outline particles */}
      <points>
        <bufferGeometry ref={edgeGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={edgeParticles.length / 3}
            array={edgeParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={edgeMatRef}
          size={0.08}
          color={colorObj}
          transparent
          opacity={active ? 0.8 : 0.3}
          blending={AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
});

export default PortalEnergy;
