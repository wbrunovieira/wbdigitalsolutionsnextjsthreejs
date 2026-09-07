import React, { useRef, useState } from 'react';
import { Box, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getServiceMessage, ServiceType } from './tunnelMessages';

interface HolographicMessageProps {
  position: [number, number, number];
  language: string;
  serviceType: ServiceType;
  delay: number;
  isMobile?: boolean;
}

/** Floating holographic service panel travelling down the tunnel. */
const HolographicMessage: React.FC<HolographicMessageProps> = ({
  position, language, serviceType, delay, isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(0);

  const message = getServiceMessage(serviceType, language);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // Move towards camera
      groupRef.current.position.z += 0.08;

      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(time + delay) * 0.3;
      groupRef.current.rotation.y = Math.sin(time * 0.5 + delay) * 0.1;

      // Fade in/out based on distance
      const distance = Math.abs(groupRef.current.position.z);
      if (distance < 30) {
        setOpacity(Math.min(1, (30 - distance) / 10));
      } else if (distance > 70) {
        setOpacity(Math.max(0, (100 - distance) / 30));
      } else {
        setOpacity(1);
      }

      // Reset position
      if (groupRef.current.position.z > 10) {
        groupRef.current.position.z = -150;
        groupRef.current.position.x = position[0] + (Math.random() - 0.5) * 4;
      }
    }
  });

  const scale = isMobile ? 0.7 : 1;

  return (
    <group ref={groupRef} position={position}>
      {/* Holographic Frame */}
      <Box args={[6 * scale, 3 * scale, 0.01]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color={message.color}
          emissive={message.color}
          emissiveIntensity={0.2}
          transparent
          opacity={opacity * 0.1}
        />
      </Box>

      <Text
        position={[0, 1 * scale, 0]}
        fontSize={0.5 * scale}
        color={message.color}
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {message.title}
        <meshStandardMaterial
          color={message.color}
          emissive={message.color}
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </Text>

      <Text
        position={[0, 0.3 * scale, 0]}
        fontSize={0.25 * scale}
        color="#ffffff"
        fontWeight={600}
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity * 0.8}
      >
        {message.subtitle}
      </Text>

      {message.features.map((feature, index) => (
        <Text
          key={feature}
          position={[0, (-0.3 - index * 0.3) * scale, 0]}
          fontSize={0.18 * scale}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={opacity * 0.7}
        >
          ▸ {feature}
        </Text>
      ))}
    </group>
  );
};

export default HolographicMessage;
