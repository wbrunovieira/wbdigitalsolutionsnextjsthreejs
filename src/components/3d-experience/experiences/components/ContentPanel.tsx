/**
 * ContentPanel - Expandable panel that appears above the active station
 * Shows title, description, and decorative option buttons
 */

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group, MathUtils } from 'three';
import { COLORS } from '../../constants';

interface ContentPanelProps {
  position: [number, number, number];
  title: string;
  description: string;
  options: string[];
  color: string;
  rotation: [number, number, number];
  onClose: () => void;
}

export const ContentPanel = memo(function ContentPanel({
  position,
  title,
  description,
  options,
  color,
  rotation,
  onClose,
}: ContentPanelProps) {
  const groupRef = useRef<Group>(null);
  const scaleRef = useRef(0);

  useFrame(() => {
    // Animate scale from 0 to 1
    scaleRef.current = MathUtils.lerp(scaleRef.current, 1, 0.08);
    if (groupRef.current) {
      const s = scaleRef.current;
      groupRef.current.scale.set(s, s, s);
    }
  });

  const panelWidth = 3.5;
  const panelHeight = 3;

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1] + 3.5, position[2]]}
      rotation={rotation}
      scale={[0, 0, 0]}
    >
      {/* Background panel */}
      <mesh onClick={onClose}>
        <boxGeometry args={[panelWidth, panelHeight, 0.08]} />
        <meshStandardMaterial
          color="#0a0a18"
          transparent
          opacity={0.9}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Emissive border frame */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[panelWidth + 0.08, panelHeight + 0.08]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Inner border line */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[panelWidth - 0.1, panelHeight - 0.1]} />
        <meshStandardMaterial
          color="#0a0a18"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 0.9, 0.08]}
        fontSize={0.28}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={panelWidth - 0.5}
        fontWeight={700}
      >
        {title}
      </Text>

      {/* Divider line */}
      <mesh position={[0, 0.6, 0.06]}>
        <planeGeometry args={[panelWidth - 0.8, 0.01]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Description */}
      <Text
        position={[0, 0.15, 0.08]}
        fontSize={0.16}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
        maxWidth={panelWidth - 0.6}
        textAlign="center"
        lineHeight={1.4}
      >
        {description}
      </Text>

      {/* Option buttons (decorative) */}
      {options.map((option, i) => {
        const xOffset = (i - (options.length - 1) / 2) * 1.1;
        return (
          <group key={i} position={[xOffset, -0.8, 0.06]}>
            {/* Button background */}
            <mesh>
              <boxGeometry args={[0.95, 0.35, 0.03]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.15}
                transparent
                opacity={0.25}
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>
            {/* Button text */}
            <Text
              position={[0, 0, 0.04]}
              fontSize={0.13}
              color={COLORS.white}
              anchorX="center"
              anchorY="middle"
            >
              {option}
            </Text>
          </group>
        );
      })}

      {/* Close hint */}
      <Text
        position={[0, -1.2, 0.08]}
        fontSize={0.1}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.4}
      >
        {'click to close'}
      </Text>

      {/* Glow light behind panel */}
      <pointLight
        position={[0, 0, -0.5]}
        intensity={0.3}
        color={color}
        distance={4}
      />
    </group>
  );
});

export default ContentPanel;
