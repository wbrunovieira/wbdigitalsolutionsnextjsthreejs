import React from 'react';
import { Box, Image, Text3D, Center } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

interface DeskProps {
  position: [number, number, number];
  service: 'WEBSITES' | 'AUTOMATION' | 'A.I.';
  deskSize?: [number, number, number];
  logoScale?: [number, number];
  textColor?: string;
  textSize?: number;
  children?: React.ReactNode;
}

type BoxArgs = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];

/**
 * Reusable Desk component with physics, logo and 3D text
 */
const Desk: React.FC<DeskProps> = ({ 
  position, 
  service, 
  deskSize = [2, 0.1, 1.2],
  logoScale = [0.6, 0.25],
  textColor = "#792990",
  textSize = 0.3,
  children 
}) => {
  // Adjust desk size for main desk
  const finalDeskSize: BoxArgs = service === 'WEBSITES' ? [3, 0.1, 1.5] : [...deskSize] as BoxArgs;
  const finalLogoScale: [number, number] = service === 'WEBSITES' ? [0.8, 0.3] : logoScale;
  
  // Adjust text color for different services
  const finalTextColor = service === 'AUTOMATION' ? '#ffb947' : textColor;
  const finalTextSize = service === 'A.I.' ? 0.36 : (service === 'AUTOMATION' ? 0.24 : textSize);
  
  return (
    <>
      {/* Desk with Physics */}
      <RigidBody type="fixed" position={position}>
        {/* Desk Top */}
        <Box args={finalDeskSize} position={[0, 0.8, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4a3f36" />
        </Box>
        
        {/* Desk Legs */}
        {service === 'WEBSITES' ? (
          <>
            <Box args={[0.1, 0.8, 0.1]} position={[-1.4, 0.4, -0.6]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[1.4, 0.4, -0.6]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[-1.4, 0.4, 0.6]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[1.4, 0.4, 0.6]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
          </>
        ) : (
          <>
            <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, -0.5]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, -0.5]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, 0.5]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, 0.5]} castShadow>
              <meshStandardMaterial color="#2a2520" />
            </Box>
          </>
        )}
      </RigidBody>
      
      {/* Non-physics elements */}
      <group position={position}>
        {/* WB Logo on Desk */}
        <Image 
          url="/svg/logo-white.svg" 
          position={[0, 0.86, service === 'WEBSITES' ? 0.2 : 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={finalLogoScale}
          transparent
          opacity={0.9}
        />
        
        {/* 3D Text */}
        <Center position={[0, 1.2, 0]}>
          <Text3D
            font="/img/assets/fonts/optimer_regular.typeface.json"
            size={finalTextSize}
            height={service === 'A.I.' ? 0.09 : 0.06}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={service === 'A.I.' ? 0.003 : 0.002}
            bevelOffset={0}
            bevelSegments={5}
            castShadow
            receiveShadow
          >
            {service}
            <meshStandardMaterial 
              color={finalTextColor} 
              emissive={finalTextColor} 
              emissiveIntensity={service === 'A.I.' ? 0.2 : 0.1}
              metalness={0.3}
              roughness={0.4}
            />
          </Text3D>
        </Center>
        
        {/* Additional elements (buttons, etc) */}
        {children}
      </group>
    </>
  );
};

export default Desk;