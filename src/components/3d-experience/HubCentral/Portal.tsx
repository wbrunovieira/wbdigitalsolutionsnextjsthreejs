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
  const [facingFactor, setFacingFactor] = useState(1);
  const { isMobile, isTransitioning } = useNavigationStore();

  const targetScale = useRef(new Vector3(1, 1, 1));
  const frameCount = useRef(0);
  const lastFacing = useRef(1);

  // Get translated name and description
  const name = translations.experienceNames[experience.id] || experience.name;
  const description = translations.experienceDescriptions[experience.id] || experience.description;

  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Smooth scale transition on hover
      const scale = isHovered ? 1.08 : 1;
      targetScale.current.set(scale, scale, scale);
      groupRef.current.scale.lerp(targetScale.current, 0.1);
    }

    // Calculate facing factor every 6 frames for performance
    frameCount.current++;
    if (frameCount.current % 6 !== 0) return;

    const [px, , pz] = experience.portalPosition;
    const fwdLen = Math.sqrt(px * px + pz * pz);
    if (fwdLen === 0) return;

    // Portal forward direction (faces toward center)
    const fwdX = -px / fwdLen;
    const fwdZ = -pz / fwdLen;

    // Vector from portal to camera
    const dx = camera.position.x - px;
    const dz = camera.position.z - pz;
    const dLen = Math.sqrt(dx * dx + dz * dz);
    if (dLen === 0) return;

    const dot = fwdX * (dx / dLen) + fwdZ * (dz / dLen);
    // Map: dot < -0.1 → 0.06 (nearly hidden), dot > 0.3 → 1 (fully visible)
    const newFactor = Math.max(0.06, Math.min(1, (dot + 0.1) / 0.4));

    // Only update state when change is significant to avoid excessive re-renders
    if (Math.abs(newFactor - lastFacing.current) > 0.04) {
      lastFacing.current = newFactor;
      setFacingFactor(newFactor);
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
        fillOpacity={facingFactor}
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
        fillOpacity={facingFactor}
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
        fillOpacity={facingFactor}
      >
        {name}
      </Text>

      {/* Description tooltip on hover - only when portal faces camera */}
      {(isHovered || isMobile) && facingFactor > 0.5 && (
        <Html
          position={[0, 5, 0]}
          center
          style={{
            pointerEvents: 'none',
            opacity: facingFactor,
            filter: `blur(${Math.round((1 - facingFactor) * 6)}px)`,
            transition: 'opacity 0.3s ease, filter 0.3s ease',
          }}
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
          emissiveIntensity={(isHovered ? 0.6 : isVisited ? 0.4 : 0.2) * facingFactor}
          transparent
          opacity={(isVisited ? 0.7 : 0.5) * facingFactor}
        />
      </mesh>

      {/* Point light for the portal */}
      <pointLight
        position={[0, 1.5, 0.5]}
        intensity={(isHovered ? 0.8 : isVisited ? 0.5 : 0.3) * facingFactor}
        color={isVisited ? VISITED_COLOR : experience.color}
        distance={5}
      />
    </group>
  );
});

export default Portal;
