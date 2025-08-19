import React from 'react';
import { Box, Image, Text, Text3D, Center } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

interface DeskProps {
  position: [number, number, number];
  service: string;
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
  deskSize = [4, 0.2, 2.4],
  logoScale = [1.2, 0.5],
  textColor = "#792990",
  textSize = 0.3,
  children 
}) => {
  // Check service type based on content (works for any language)
  const isWebsites = service.includes('SITE') || service.includes('WEB');
  const isAutomation = service.includes('AUTOMA');
  const isAI = service.includes('I.A') || service.includes('A.I');
  
  // All desks now have the same large size
  const finalDeskSize: BoxArgs = [6, 0.2, 3];
  const finalLogoScale: [number, number] = [1.6, 0.6];
  
  // Adjust text color for different services
  const finalTextColor = isAutomation ? '#ffb947' : textColor;
  
  // Adjust text size based on text length for better fitting
  const baseSize = service.length > 10 ? 0.35 : (service.length > 8 ? 0.45 : 0.6);
  const finalTextSize = isAI ? baseSize * 1.2 : (isAutomation ? baseSize * 0.8 : baseSize);
  
  return (
    <>
      {/* Desk with Physics */}
      <RigidBody type="fixed" position={position}>
        {/* Desk Top */}
        <Box args={finalDeskSize} position={[0, 0.8, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4a3f36" />
        </Box>
        
        {/* Desk Legs - All desks now have the same size */}
        <Box args={[0.2, 0.8, 0.2]} position={[-2.8, 0.4, -1.2]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.2, 0.8, 0.2]} position={[2.8, 0.4, -1.2]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.2, 0.8, 0.2]} position={[-2.8, 0.4, 1.2]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.2, 0.8, 0.2]} position={[2.8, 0.4, 1.2]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
      </RigidBody>
      
      {/* Non-physics elements */}
      <group position={position}>
        {/* WB Logo on Desk */}
        <Image 
          url="/svg/logo-white.svg" 
          position={[0, 0.91, 0.4]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={finalLogoScale}
          transparent
          opacity={0.9}
        />
        
        {/* 3D Text with Troika (supports special characters) */}
        <group position={[0, 1.3, 0]}>
          <Text
            fontSize={finalTextSize * 1.5}
            color={finalTextColor}
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            maxWidth={4}
            lineHeight={1}
            letterSpacing={0.01}
            textAlign="center"
            outlineWidth={0.08}
            outlineColor="#000000"
            outlineBlur={0.02}
            outlineOpacity={0.8}
            strokeWidth={'2%'}
            strokeColor={finalTextColor}
            strokeOpacity={1}
            fillOpacity={1}
            castShadow
            receiveShadow
          >
            {service}
            <meshStandardMaterial 
              attach="material"
              color={finalTextColor} 
              emissive={finalTextColor} 
              emissiveIntensity={isAI ? 0.4 : 0.2}
              metalness={0.3}
              roughness={0.2}
              side={2}
            />
          </Text>
          
          {/* Multiple shadow layers for depth */}
          <Text
            position={[0.02, -0.02, -0.03]}
            fontSize={finalTextSize * 1.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            maxWidth={4}
            lineHeight={1}
            letterSpacing={0.01}
            textAlign="center"
            fillOpacity={0.4}
          >
            {service}
          </Text>
          
          <Text
            position={[0.04, -0.04, -0.06]}
            fontSize={finalTextSize * 1.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            maxWidth={4}
            lineHeight={1}
            letterSpacing={0.01}
            textAlign="center"
            fillOpacity={0.2}
          >
            {service}
          </Text>
        </group>
        
        {/* Small 3D Text - WB Digital Solutions */}
        <Center position={[-1.4, 0.91, 0.6]}>
          <Text3D
            font="/img/assets/fonts/optimer_regular.typeface.json"
            size={0.16}
            height={0.04}
            curveSegments={8}
            bevelEnabled
            bevelThickness={0.005}
            bevelSize={0.002}
            bevelOffset={0}
            bevelSegments={3}
            castShadow
            receiveShadow
          >
            WB Digital Solutions
            <meshStandardMaterial 
              color="#792990"
              emissive="#792990"
              emissiveIntensity={0.1}
              metalness={0.5}
              roughness={0.3}
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