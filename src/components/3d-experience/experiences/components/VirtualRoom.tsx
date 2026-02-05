/**
 * VirtualRoom - Realistic dark tech office environment
 * Decorative only: floor, walls, ceiling, furniture, lighting accents
 */

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import { COLORS } from '../../constants';

interface VirtualRoomProps {
  isMobile: boolean;
}

export const VirtualRoom = memo(function VirtualRoom({ isMobile }: VirtualRoomProps) {
  const neonRef1 = useRef<Mesh>(null);
  const neonRef2 = useRef<Mesh>(null);
  const neonRef3 = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Subtle neon pulse
    [neonRef1, neonRef2, neonRef3].forEach((ref, i) => {
      if (ref.current) {
        const mat = ref.current.material as MeshStandardMaterial;
        mat.emissiveIntensity = 0.6 + Math.sin(time * 1.2 + i * 0.8) * 0.2;
      }
    });
  });

  const roomWidth = 14;
  const roomDepth = 12;
  const roomHeight = 6;
  const wallColor = '#12101e';

  return (
    <group>
      {/* === FLOOR === */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#0f0f18" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Floor polished center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[roomWidth - 2, roomDepth - 2]} />
        <meshStandardMaterial color="#141422" metalness={0.85} roughness={0.12} transparent opacity={0.7} />
      </mesh>

      {/* === WALLS === */}
      {/* Back wall */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
        <boxGeometry args={[roomWidth, roomHeight, 0.15]} />
        <meshStandardMaterial color={wallColor} metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, 0]}>
        <boxGeometry args={[0.15, roomHeight, roomDepth]} />
        <meshStandardMaterial color={wallColor} metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Right wall */}
      <mesh position={[roomWidth / 2, roomHeight / 2, 0]}>
        <boxGeometry args={[0.15, roomHeight, roomDepth]} />
        <meshStandardMaterial color={wallColor} metalness={0.2} roughness={0.8} />
      </mesh>

      {/* === CEILING === */}
      <mesh position={[0, roomHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#0a0a10" />
      </mesh>
      {/* Ceiling light panels */}
      {[[-3, 0], [3, 0]].map(([x, z], i) => (
        <group key={i} position={[x, roomHeight - 0.02, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2, 4]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.15}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* === NEON ACCENT STRIPS === */}
      {/* Back wall base */}
      <mesh ref={neonRef1} position={[0, 0.04, -roomDepth / 2 + 0.1]}>
        <boxGeometry args={[roomWidth - 0.5, 0.04, 0.04]} />
        <meshStandardMaterial color={COLORS.purple} emissive={COLORS.purple} emissiveIntensity={0.6} />
      </mesh>
      {/* Left wall base */}
      <mesh ref={neonRef2} position={[-roomWidth / 2 + 0.1, 0.04, 0]}>
        <boxGeometry args={[0.04, 0.04, roomDepth - 0.5]} />
        <meshStandardMaterial color={COLORS.purple} emissive={COLORS.purple} emissiveIntensity={0.6} />
      </mesh>
      {/* Right wall base */}
      <mesh ref={neonRef3} position={[roomWidth / 2 - 0.1, 0.04, 0]}>
        <boxGeometry args={[0.04, 0.04, roomDepth - 0.5]} />
        <meshStandardMaterial color={COLORS.purple} emissive={COLORS.purple} emissiveIntensity={0.6} />
      </mesh>

      {/* === CONFERENCE TABLE (center) === */}
      <group position={[0, 0, 1]}>
        {/* Table top */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[3, 0.06, 1.4]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.25} />
        </mesh>
        {/* Table legs */}
        {[[-1.3, -0.55], [-1.3, 0.55], [1.3, -0.55], [1.3, 0.55]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.35, z]}>
            <boxGeometry args={[0.06, 0.7, 0.06]} />
            <meshStandardMaterial color="#111120" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* === CHAIRS (4 around table) === */}
      {[
        { pos: [-0.8, 0, 2] as [number, number, number], rot: 0 },
        { pos: [0.8, 0, 2] as [number, number, number], rot: 0 },
        { pos: [-0.8, 0, 0] as [number, number, number], rot: Math.PI },
        { pos: [0.8, 0, 0] as [number, number, number], rot: Math.PI },
      ].map((chair, i) => (
        <group key={i} position={chair.pos} rotation={[0, chair.rot, 0]}>
          {/* Seat */}
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[0.45, 0.05, 0.45]} />
            <meshStandardMaterial color="#1e1e30" metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.65, -0.2]}>
            <boxGeometry args={[0.42, 0.4, 0.04]} />
            <meshStandardMaterial color="#1e1e30" metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Legs */}
          {[[-0.18, -0.18], [-0.18, 0.18], [0.18, -0.18], [0.18, 0.18]].map(([lx, lz], li) => (
            <mesh key={li} position={[lx, 0.2, lz]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
        </group>
      ))}

      {/* === PLANTS (2 in back corners) === */}
      {[[-5.5, 0, -4.5], [5.5, 0, -4.5]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Pot */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.22, 0.18, 0.5, 12]} />
            <meshStandardMaterial color="#2a2035" metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Foliage */}
          <mesh position={[0, 0.75, 0]}>
            <dodecahedronGeometry args={[0.4, 1]} />
            <meshStandardMaterial color="#1a4a2a" emissive="#1a4a2a" emissiveIntensity={0.05} />
          </mesh>
          <mesh position={[0.15, 0.95, 0.1]}>
            <dodecahedronGeometry args={[0.25, 1]} />
            <meshStandardMaterial color="#1d5530" emissive="#1d5530" emissiveIntensity={0.05} />
          </mesh>
        </group>
      ))}

      {/* === DECORATIVE WALL ELEMENTS === */}
      {/* Back wall - subtle WB logo placeholder / brand strip */}
      <mesh position={[0, 5.2, -roomDepth / 2 + 0.09]}>
        <planeGeometry args={[4, 0.04]} />
        <meshStandardMaterial color={COLORS.yellow} emissive={COLORS.yellow} emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      {/* Left wall - decorative vertical strip */}
      <mesh position={[-roomWidth / 2 + 0.09, 3, -4]}>
        <planeGeometry args={[0.03, 2]} />
        <meshStandardMaterial color={COLORS.purple} emissive={COLORS.purple} emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>

      {/* Right wall - decorative vertical strip */}
      <mesh position={[roomWidth / 2 - 0.09, 3, -4]}>
        <planeGeometry args={[0.03, 2]} />
        <meshStandardMaterial color={COLORS.blue} emissive={COLORS.blue} emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>
    </group>
  );
});

export default VirtualRoom;
