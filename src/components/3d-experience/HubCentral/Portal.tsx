/**
 * Portal - Individual portal for accessing experiences
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { PortalArch } from './PortalArch';
import { PortalEnergy } from './PortalEnergy';
import { Experience } from '../constants/experiences';
import { COLORS } from '../constants';
import { useNavigationStore } from '@/stores/navigationStore';

interface PortalProps {
  experience: Experience;
  onEnter: () => void;
}

export function Portal({ experience, onEnter }: PortalProps) {
  const groupRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile, isTransitioning } = useNavigationStore();

  const targetScale = useRef(new Vector3(1, 1, 1));

  useFrame(() => {
    if (groupRef.current) {
      // Smooth scale transition on hover
      const scale = isHovered ? 1.08 : 1;
      targetScale.current.set(scale, scale, scale);
      groupRef.current.scale.lerp(targetScale.current, 0.1);
    }
  });

  const handlePointerEnter = () => {
    if (!isTransitioning) {
      setIsHovered(true);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = () => {
    if (!isTransitioning) {
      onEnter();
    }
  };

  return (
    <group
      ref={groupRef}
      position={experience.portalPosition}
      rotation={experience.portalRotation}
    >
      {/* Portal structure */}
      <PortalArch color={experience.color} />

      {/* Energy effect */}
      <PortalEnergy active={isHovered} color={experience.color} />

      {/* Invisible click area */}
      <mesh
        visible={false}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <planeGeometry args={[2.5, 3.5]} />
      </mesh>

      {/* Icon */}
      <Text
        position={[0, 2, 0.2]}
        fontSize={0.6}
        anchorX="center"
        anchorY="middle"
      >
        {experience.icon}
      </Text>

      {/* Experience name */}
      <Text
        position={[0, -0.4, 0.3]}
        fontSize={0.28}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {experience.name}
      </Text>

      {/* Description tooltip on hover */}
      {(isHovered || isMobile) && (
        <Html
          position={[0, 3.8, 0]}
          center
          distanceFactor={15}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              color: COLORS.white,
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: `1px solid ${experience.color}`,
              boxShadow: `0 0 20px ${experience.color}40`,
              maxWidth: '200px',
              textAlign: 'center',
              whiteSpace: 'normal',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: experience.color }}>
              {experience.name}
            </div>
            <div style={{ opacity: 0.9 }}>{experience.description}</div>
          </div>
        </Html>
      )}

      {/* Ground indicator */}
      <mesh position={[0, 0.02, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial
          color={experience.color}
          emissive={experience.color}
          emissiveIntensity={isHovered ? 0.6 : 0.2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Point light for the portal */}
      <pointLight
        position={[0, 1.5, 0.5]}
        intensity={isHovered ? 0.8 : 0.3}
        color={experience.color}
        distance={5}
      />
    </group>
  );
}

export default Portal;
