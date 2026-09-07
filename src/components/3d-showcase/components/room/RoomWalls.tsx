import React from 'react';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

type Vec3 = [number, number, number];

const WALL_COLOR = '#3d2f50';
const FRAME_COLOR = '#1a1a1a';

/** Solid wall slab with a fixed physics collider so the ball can bounce off it. */
const WallSlab: React.FC<{ args: Vec3; position: Vec3 }> = ({ args, position }) => (
  <RigidBody type="fixed">
    <Box args={args} position={position} receiveShadow castShadow>
      <meshStandardMaterial color={WALL_COLOR} />
    </Box>
  </RigidBody>
);

const WindowFrameBar: React.FC<{ args: Vec3; position: Vec3 }> = ({ args, position }) => (
  <Box args={args} position={position} castShadow>
    <meshStandardMaterial color={FRAME_COLOR} metalness={0.8} roughness={0.2} />
  </Box>
);

const WINDOW_FRAME_BARS: { args: Vec3; position: Vec3 }[] = [
  { args: [0.2, 0.1, 8], position: [-15, 3, 0] },
  { args: [0.2, 0.1, 8], position: [-15, 7, 0] },
  { args: [0.2, 4, 0.1], position: [-15, 5, -4] },
  { args: [0.2, 4, 0.1], position: [-15, 5, 4] },
];

/** Room shell: back wall, left wall with window, right wall and the optional front walls. */
const RoomWalls: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
  <>
    <WallSlab args={[30, 10, 0.5]} position={[0, 5, -15]} />

    {/* Left wall split around the window opening */}
    <WallSlab args={[0.5, 3, 30]} position={[-15, 1.5, 0]} />
    <WallSlab args={[0.5, 3, 30]} position={[-15, 8.5, 0]} />
    <WallSlab args={[0.5, 4, 11]} position={[-15, 5, -9.5]} />
    <WallSlab args={[0.5, 4, 11]} position={[-15, 5, 9.5]} />

    {/* Window Glass */}
    <Box args={[0.1, 4, 8]} position={[-15, 5, 0]} castShadow>
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.1}
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={1}
      />
    </Box>

    {WINDOW_FRAME_BARS.map((bar) => (
      <WindowFrameBar key={bar.position.join(',')} {...bar} />
    ))}

    <WallSlab args={[0.5, 10, 30]} position={[15, 5, 0]} />

    {/* Front walls with entrance - Hidden on mobile for better view */}
    {!isMobile && (
      <>
        <WallSlab args={[10.5, 10, 0.5]} position={[-9.75, 5, 15]} />
        <WallSlab args={[10.5, 10, 0.5]} position={[9.75, 5, 15]} />
        <WallSlab args={[9, 3, 0.5]} position={[0, 8.5, 15]} />
      </>
    )}
  </>
);

export default RoomWalls;
