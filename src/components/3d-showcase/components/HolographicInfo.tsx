import React, { useRef } from 'react';
import { Box, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getServiceInfo, ServiceType } from '../data/serviceInfo';
import HolographicLines from './HolographicLines';

const FADE_SPEED = 5;

interface HolographicInfoProps {
  isActive: boolean;
  serviceType: ServiceType;
  language?: string;
  position?: [number, number, number];
}

/** Holographic service panel that fades in above the active desk. */
const HolographicInfo: React.FC<HolographicInfoProps> = ({
  isActive,
  serviceType,
  language = 'en',
  position = [0, 2.5, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const animationRef = useRef({
    opacity: 0,
    scale: 0.5,
    height: 0,
    glow: 0,
  });

  const serviceInfo = getServiceInfo(serviceType, language);

  // Animate hologram appearance
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const anim = animationRef.current;
    const step = delta * FADE_SPEED;

    if (isActive) {
      // Fade in and scale up
      anim.opacity = THREE.MathUtils.lerp(anim.opacity, 1, step);
      anim.scale = THREE.MathUtils.lerp(anim.scale, 1, step);
      anim.height = THREE.MathUtils.lerp(anim.height, 1, step);
      anim.glow = 0.3 + Math.sin(time * 3) * 0.1;
    } else {
      // Fade out and scale down
      anim.opacity = THREE.MathUtils.lerp(anim.opacity, 0, step);
      anim.scale = THREE.MathUtils.lerp(anim.scale, 0.5, step);
      anim.height = THREE.MathUtils.lerp(anim.height, 0, step);
      anim.glow = 0;
    }

    // Floating animation when visible
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(time) * 0.05;
    }
  });

  if (!isActive && animationRef.current.opacity < 0.01) {
    return null;
  }

  const { opacity, scale, height, glow } = animationRef.current;

  return (
    <group ref={groupRef} position={position}>
      {/* Holographic frame */}
      <Box args={[9, 6.4 * height, 0.01]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color={serviceInfo.color}
          emissive={serviceInfo.color}
          emissiveIntensity={glow}
          transparent
          opacity={opacity * 0.1}
        />
      </Box>

      {/* Holographic borders */}
      {[3.2, -3.2].map((edge) => (
        <Box key={edge} args={[9.2, 0.1, 0.02]} position={[0, edge * height, 0]}>
          <meshStandardMaterial
            color={serviceInfo.color}
            emissive={serviceInfo.color}
            emissiveIntensity={glow * 2}
            transparent
            opacity={opacity * 0.8}
          />
        </Box>
      ))}

      {/* Title */}
      <Text
        position={[0, 2.0 * height, 0]}
        fontSize={0.7 * scale}
        color={serviceInfo.color}
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
        fillOpacity={opacity}
      >
        {serviceInfo.title}
        <meshStandardMaterial
          color={serviceInfo.color}
          emissive={serviceInfo.color}
          emissiveIntensity={glow}
          transparent
          opacity={opacity}
        />
      </Text>

      <HolographicLines
        lines={serviceInfo.lines}
        color={serviceInfo.color}
        opacity={opacity}
        scale={scale}
        height={height}
        glow={glow}
      />

      {/* Holographic scanlines */}
      <Box
        args={[8.6, 0.04, 0.01]}
        position={[0, Math.sin(Date.now() * 0.001) * height, 0.05]}
      >
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity * 0.2}
        />
      </Box>
    </group>
  );
};

export default HolographicInfo;
