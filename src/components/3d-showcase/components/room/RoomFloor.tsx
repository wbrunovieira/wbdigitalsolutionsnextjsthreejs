import React from 'react';
import { Box, Image } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

/** Glowing ring that marks a desk position on the floor. */
const DeskSpotlight: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => (
  <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[2.5, 3.2, 32]} />
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.3}
      transparent
      opacity={0.4}
      side={2}
    />
  </mesh>
);

const DESK_SPOTLIGHTS: { position: [number, number, number]; color: string }[] = [
  { position: [0, 0.012, -7], color: '#792990' }, // Center desk (Websites)
  { position: [-7, 0.012, 0], color: '#ffb947' }, // Left desk (Automation)
  { position: [7, 0.012, 0], color: '#4a90e2' }, // Right desk (AI)
];

/** Premium minimalist floor: physics slab, polished overlay, embossed logo and desk spotlights. */
const RoomFloor: React.FC = () => (
  <>
    <RigidBody type="fixed">
      <Box args={[30, 0.1, 30]} position={[0, -0.05, 0]} receiveShadow>
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.2}
          roughness={0.3}
          envMapIntensity={0.5}
        />
      </Box>
    </RigidBody>

    {/* Polished concrete overlay effect */}
    <Box args={[30, 0.01, 30]} position={[0, 0.01, 0]} receiveShadow>
      <meshStandardMaterial
        color="#404040"
        metalness={0.4}
        roughness={0.15}
        transparent
        opacity={0.5}
      />
    </Box>

    {/* WB Logo - Embossed effect center */}
    <group position={[0, 0.02, 0]}>
      <Box args={[6, 0.02, 2.5]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#454545" metalness={0.3} roughness={0.2} />
      </Box>

      <Image
        url="/svg/logo-white.svg"
        position={[0, 0.011, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[5, 2]}
        transparent
        opacity={0.2}
      />
    </group>

    {DESK_SPOTLIGHTS.map((spotlight) => (
      <DeskSpotlight key={spotlight.color} {...spotlight} />
    ))}
  </>
);

export default RoomFloor;
