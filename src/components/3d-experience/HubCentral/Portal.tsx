/**
 * Portal - Individual portal for accessing experiences
 */

import { useRef, useState, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { PortalArch } from './PortalArch';
import { PortalEnergy } from './PortalEnergy';
import { Experience } from '../constants/experiences';
import { ExperienceTranslations } from '../constants/translations';
import { COLORS } from '../constants';
import { useNavigationStore } from '@/stores/navigationStore';

const VISITED_COLOR = '#4ade80';

interface PortalProps {
  experience: Experience;
  onEnter: () => void;
  translations: ExperienceTranslations;
  portalNumber: number;
  isVisited: boolean;
}

export const Portal = memo(function Portal({ experience, onEnter, translations, portalNumber, isVisited }: PortalProps) {
  const groupRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile, isTransitioning } = useNavigationStore();

  const targetScale = useRef(new Vector3(1, 1, 1));

  // Get translated name and description
  const name = translations.experienceNames[experience.id] || experience.name;
  const description = translations.experienceDescriptions[experience.id] || experience.description;

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

      {/* Portal number */}
      <Text
        position={[0, 4.2, 0.2]}
        fontSize={0.6}
        color={isVisited ? VISITED_COLOR : experience.color}
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {isVisited
          ? `✓ ${String(portalNumber).padStart(2, '0')}`
          : String(portalNumber).padStart(2, '0')}
      </Text>

      {/* Icon */}
      <Text
        position={[0, 2.2, 0.2]}
        fontSize={1.8}
        anchorX="center"
        anchorY="middle"
      >
        {experience.icon}
      </Text>

      {/* Experience name */}
      <Text
        position={[0, 0.3, 0.3]}
        fontSize={0.84}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {name}
      </Text>

      {/* Description tooltip on hover */}
      {(isHovered || isMobile) && (
        <Html
          position={[0, 5, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              color: COLORS.white,
              padding: '20px 28px',
              borderRadius: '12px',
              fontSize: '20px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: `2px solid ${experience.color}`,
              boxShadow: `0 0 30px ${experience.color}50`,
              maxWidth: '360px',
              textAlign: 'center',
              whiteSpace: 'normal',
            }}
          >
            {isVisited && (
              <div style={{
                display: 'inline-block',
                background: VISITED_COLOR,
                color: '#000',
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '8px',
              }}>
                ✓ {translations.explored}
              </div>
            )}
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '24px', color: isVisited ? VISITED_COLOR : experience.color }}>
              {name}
            </div>
            <div style={{ opacity: 0.9 }}>{description}</div>
          </div>
        </Html>
      )}

      {/* Ground indicator */}
      <mesh position={[0, 0.02, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial
          color={isVisited ? VISITED_COLOR : experience.color}
          emissive={isVisited ? VISITED_COLOR : experience.color}
          emissiveIntensity={isHovered ? 0.6 : isVisited ? 0.4 : 0.2}
          transparent
          opacity={isVisited ? 0.7 : 0.5}
        />
      </mesh>

      {/* Point light for the portal */}
      <pointLight
        position={[0, 1.5, 0.5]}
        intensity={isHovered ? 0.8 : isVisited ? 0.5 : 0.3}
        color={isVisited ? VISITED_COLOR : experience.color}
        distance={5}
      />
    </group>
  );
});

export default Portal;
