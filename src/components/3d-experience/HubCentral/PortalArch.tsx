/**
 * PortalArch - The structural arch of a portal
 */

import { COLORS } from '../constants';

interface PortalArchProps {
  color?: string;
  height?: number;
  width?: number;
}

export function PortalArch({
  color = COLORS.purple,
  height = 3,
  width = 2,
}: PortalArchProps) {
  const archRadius = width / 2;
  const pillarHeight = height - archRadius;

  return (
    <group>
      {/* Top arch - outer structure */}
      <mesh position={[0, pillarHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[archRadius, 0.12, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color={COLORS.gray}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Top arch - inner glow */}
      <mesh position={[0, pillarHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[archRadius, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Left pillar */}
      <mesh position={[-archRadius, pillarHeight / 2, 0]}>
        <boxGeometry args={[0.2, pillarHeight, 0.2]} />
        <meshStandardMaterial
          color={COLORS.gray}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Left pillar glow strip */}
      <mesh position={[-archRadius, pillarHeight / 2, 0.11]}>
        <boxGeometry args={[0.05, pillarHeight - 0.2, 0.02]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Right pillar */}
      <mesh position={[archRadius, pillarHeight / 2, 0]}>
        <boxGeometry args={[0.2, pillarHeight, 0.2]} />
        <meshStandardMaterial
          color={COLORS.gray}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Right pillar glow strip */}
      <mesh position={[archRadius, pillarHeight / 2, 0.11]}>
        <boxGeometry args={[0.05, pillarHeight - 0.2, 0.02]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.6, 0.1, 0.6]} />
        <meshStandardMaterial
          color={COLORS.gray}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Base glow */}
      <mesh position={[0, 0.06, 0.2]}>
        <boxGeometry args={[width + 0.2, 0.02, 0.02]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export default PortalArch;
