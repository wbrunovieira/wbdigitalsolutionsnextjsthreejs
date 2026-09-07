import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getPortalMessages } from './tunnelMessages';

const ROTATION_MS = 3000;

/** Headline at the end of the tunnel, cycling through the welcome messages. */
const PortalMessage: React.FC<{ language: string }> = ({ language }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = useMemo(() => getPortalMessages(language), [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, [messages.length]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
      groupRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      <Text
        fontSize={0.8}
        color="#ffffff"
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#792990"
      >
        {messages[currentIndex]}
        <meshStandardMaterial color="#ffffff" emissive="#792990" emissiveIntensity={0.3} />
      </Text>
    </group>
  );
};

export default PortalMessage;
