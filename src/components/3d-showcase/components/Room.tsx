import React from 'react';
import { Box, Image } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

/**
 * Room component containing walls, floor and window
 * All elements have physics colliders for ball interaction
 */
const Room: React.FC = () => {
  return (
    <>
      {/* Premium Minimalist Floor with physics */}
      <RigidBody type="fixed">
        <Box args={[20, 0.1, 20]} position={[0, -0.05, 0]} receiveShadow>
          <meshStandardMaterial 
            color="#3a3a3a"
            metalness={0.2}
            roughness={0.3}
            envMapIntensity={0.5}
          />
        </Box>
      </RigidBody>
      
      {/* Polished concrete overlay effect */}
      <Box args={[20, 0.01, 20]} position={[0, 0.01, 0]} receiveShadow>
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
        {/* Logo base (raised platform) */}
        <Box args={[6, 0.02, 2.5]} position={[0, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#454545"
            metalness={0.3}
            roughness={0.2}
          />
        </Box>
        
        {/* Logo image on raised platform */}
        <Image 
          url="/svg/logo-white.svg" 
          position={[0, 0.011, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[5, 2]}
          transparent
          opacity={0.2}
        />
      </group>
      
      {/* Spotlights under desks (glowing circles) */}
      {/* Center desk spotlight */}
      <mesh position={[0, 0.012, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2, 32]} />
        <meshStandardMaterial
          color="#792990"
          emissive="#792990"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>
      
      {/* Left desk spotlight */}
      <mesh position={[-5, 0.012, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.6, 32]} />
        <meshStandardMaterial
          color="#ffb947"
          emissive="#ffb947"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>
      
      {/* Right desk spotlight */}
      <mesh position={[5, 0.012, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.6, 32]} />
        <meshStandardMaterial
          color="#4a90e2"
          emissive="#4a90e2"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>
      
      {/* Back Wall */}
      <RigidBody type="fixed">
        <Box args={[20, 10, 0.5]} position={[0, 5, -10]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Left Wall with Window */}
      {/* Lower wall section */}
      <RigidBody type="fixed">
        <Box args={[0.5, 3, 20]} position={[-10, 1.5, 0]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Upper wall section */}
      <RigidBody type="fixed">
        <Box args={[0.5, 3, 20]} position={[-10, 8.5, 0]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Left side of window */}
      <RigidBody type="fixed">
        <Box args={[0.5, 4, 6]} position={[-10, 5, -7]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Right side of window */}
      <RigidBody type="fixed">
        <Box args={[0.5, 4, 6]} position={[-10, 5, 7]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Window Glass */}
      <Box args={[0.1, 4, 8]} position={[-10, 5, 0]} castShadow>
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.1}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </Box>
      
      {/* Window Frame */}
      <Box args={[0.2, 0.1, 8]} position={[-10, 3, 0]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.2, 0.1, 8]} position={[-10, 7, 0]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.2, 4, 0.1]} position={[-10, 5, -4]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.2, 4, 0.1]} position={[-10, 5, 4]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Right Wall */}
      <RigidBody type="fixed">
        <Box args={[0.5, 10, 20]} position={[10, 5, 0]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Front walls with entrance */}
      <RigidBody type="fixed">
        <Box args={[7, 10, 0.5]} position={[-6.5, 5, 10]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed">
        <Box args={[7, 10, 0.5]} position={[6.5, 5, 10]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed">
        <Box args={[6, 3, 0.5]} position={[0, 8.5, 10]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Logo on the wall */}
      <Box args={[4, 1, 0.1]} position={[0, 6, -9.9]} castShadow>
        <meshStandardMaterial color="#792990" emissive="#792990" emissiveIntensity={0.2} />
      </Box>
      
      {/* Decorative Elements */}
      <Box args={[0.3, 2, 0.3]} position={[-8, 1, -8]} castShadow>
        <meshStandardMaterial color="#792990" />
      </Box>
      <Box args={[0.3, 1.5, 0.3]} position={[8, 0.75, -8]} castShadow>
        <meshStandardMaterial color="#ffb947" />
      </Box>
      <Box args={[0.3, 1.8, 0.3]} position={[-8, 0.9, 8]} castShadow>
        <meshStandardMaterial color="#350545" />
      </Box>
    </>
  );
};

export default Room;