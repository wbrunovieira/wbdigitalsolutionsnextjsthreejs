/**
 * PortalArch - The structural arch of a portal
 */

import { useMemo, memo } from 'react';
import { MeshStandardMaterial, Color } from 'three';
import { COLORS } from '../constants';

interface PortalArchProps {
  color?: string;
  height?: number;
  width?: number;
}

export const PortalArch = memo(function PortalArch({
  color = COLORS.purple,
  height = 3,
  width = 2,
}: PortalArchProps) {
  const archRadius = width / 2;
  const pillarHeight = height - archRadius;

  // Shared materials (avoid creating duplicates per mesh)
  const grayMaterial = useMemo(
    () => new MeshStandardMaterial({ color: COLORS.gray, metalness: 0.9, roughness: 0.1 }),
    []
  );

  const glowMaterial = useMemo(
    () => new MeshStandardMaterial({
      color: new Color(color),
      emissive: new Color(color),
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9,
    }),
    [color]
  );

  const glowStripMaterial = useMemo(
    () => new MeshStandardMaterial({
      color: new Color(color),
      emissive: new Color(color),
      emissiveIntensity: 0.5,
    }),
    [color]
  );

  const baseMaterial = useMemo(
    () => new MeshStandardMaterial({ color: COLORS.gray, metalness: 0.8, roughness: 0.2 }),
    []
  );

  return (
    <group>
      {/* Top arch - outer structure */}
      <mesh position={[0, pillarHeight, 0]} rotation={[0, 0, Math.PI / 2]} material={grayMaterial}>
        <torusGeometry args={[archRadius, 0.12, 16, 32, Math.PI]} />
      </mesh>

      {/* Top arch - inner glow */}
      <mesh position={[0, pillarHeight, 0]} rotation={[0, 0, Math.PI / 2]} material={glowMaterial}>
        <torusGeometry args={[archRadius, 0.06, 16, 32, Math.PI]} />
      </mesh>

      {/* Left pillar */}
      <mesh position={[-archRadius, pillarHeight / 2, 0]} material={grayMaterial}>
        <boxGeometry args={[0.2, pillarHeight, 0.2]} />
      </mesh>

      {/* Left pillar glow strip */}
      <mesh position={[-archRadius, pillarHeight / 2, 0.11]} material={glowStripMaterial}>
        <boxGeometry args={[0.05, pillarHeight - 0.2, 0.02]} />
      </mesh>

      {/* Right pillar */}
      <mesh position={[archRadius, pillarHeight / 2, 0]} material={grayMaterial}>
        <boxGeometry args={[0.2, pillarHeight, 0.2]} />
      </mesh>

      {/* Right pillar glow strip */}
      <mesh position={[archRadius, pillarHeight / 2, 0.11]} material={glowStripMaterial}>
        <boxGeometry args={[0.05, pillarHeight - 0.2, 0.02]} />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, 0, 0]} material={baseMaterial}>
        <boxGeometry args={[width + 0.6, 0.1, 0.6]} />
      </mesh>

      {/* Base glow */}
      <mesh position={[0, 0.06, 0.2]} material={glowStripMaterial}>
        <boxGeometry args={[width + 0.2, 0.02, 0.02]} />
      </mesh>
    </group>
  );
});

export default PortalArch;
