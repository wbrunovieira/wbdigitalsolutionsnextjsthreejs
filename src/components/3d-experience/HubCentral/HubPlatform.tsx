/**
 * HubPlatform - Hexagonal platform base for the Hub
 */

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, Color } from 'three';
import { COLORS } from '../constants';

interface HubPlatformProps {
  radius?: number;
}

// Shared grid material (created once, reused by all grid meshes)
const gridMaterial = new MeshStandardMaterial({
  color: new Color(COLORS.purple),
  emissive: new Color(COLORS.purple),
  emissiveIntensity: 0.2,
  transparent: true,
  opacity: 0.3,
});

const edgeMaterial = new MeshStandardMaterial({
  color: new Color(COLORS.purple),
  emissive: new Color(COLORS.purple),
  emissiveIntensity: 0.3,
  transparent: true,
  opacity: 0.5,
});

export function HubPlatform({ radius = 12 }: HubPlatformProps) {
  const ringRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.01;
      ringRef.current.scale.set(scale, 1, scale);
    }
  });

  return (
    <group>
      {/* Main hexagonal platform */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[radius, radius, 0.3, 6]} />
        <meshStandardMaterial
          color={COLORS.darkGray}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Outer luminous ring */}
      <mesh ref={ringRef} position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.5, radius, 6]} />
        <meshStandardMaterial
          color={COLORS.purple}
          emissive={COLORS.purple}
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner ring */}
      <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 3.5, 64]} />
        <meshStandardMaterial
          color={COLORS.purple}
          emissive={COLORS.purple}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Grid pattern on the floor */}
      <HexGrid radius={radius} />

      {/* Edge glow lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * (radius - 0.3);
        const z = Math.sin(angle) * (radius - 0.3);
        const nextAngle = ((i + 1) * Math.PI) / 3;
        const nextX = Math.cos(nextAngle) * (radius - 0.3);
        const nextZ = Math.sin(nextAngle) * (radius - 0.3);

        return (
          <mesh
            key={i}
            position={[(x + nextX) / 2, 0.2, (z + nextZ) / 2]}
            rotation={[0, -angle - Math.PI / 6, 0]}
            material={edgeMaterial}
          >
            <boxGeometry args={[radius * 0.95, 0.05, 0.1]} />
          </mesh>
        );
      })}
    </group>
  );
}

// Hexagonal grid pattern component — shared material for all lines
const HexGrid = memo(function HexGrid({ radius }: { radius: number }) {
  const gridLines = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const spacing = 2;

    // Radial lines from center
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      lines.push({
        start: [0, 0.16, 0],
        end: [
          Math.cos(angle) * (radius - 2),
          0.16,
          Math.sin(angle) * (radius - 2),
        ],
      });
    }

    // Concentric hexagons
    for (let r = 3; r < radius - 1; r += spacing) {
      for (let i = 0; i < 6; i++) {
        const angle1 = (i * Math.PI) / 3;
        const angle2 = ((i + 1) * Math.PI) / 3;
        lines.push({
          start: [Math.cos(angle1) * r, 0.16, Math.sin(angle1) * r],
          end: [Math.cos(angle2) * r, 0.16, Math.sin(angle2) * r],
        });
      }
    }

    return lines;
  }, [radius]);

  return (
    <group>
      {gridLines.map((line, i) => {
        const midX = (line.start[0] + line.end[0]) / 2;
        const midZ = (line.start[2] + line.end[2]) / 2;
        const dx = line.end[0] - line.start[0];
        const dz = line.end[2] - line.start[2];
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);

        return (
          <mesh
            key={i}
            position={[midX, 0.16, midZ]}
            rotation={[0, -angle, 0]}
            material={gridMaterial}
          >
            <boxGeometry args={[length, 0.02, 0.03]} />
          </mesh>
        );
      })}
    </group>
  );
});

export default HubPlatform;
