/**
 * ExperiencePlaceholder - Placeholder component for experiences not yet implemented
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { Experience } from '../constants/experiences';
import { ExperienceTranslations } from '../constants/translations';
import { COLORS } from '../constants';

interface ExperiencePlaceholderProps {
  experience: Experience;
  translations: ExperienceTranslations;
}

export function ExperiencePlaceholder({ experience, translations }: ExperiencePlaceholderProps) {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const cubeRef = useRef<Mesh>(null);

  // Get translated texts
  const name = translations.experienceNames[experience.id] || experience.name;
  const description = translations.experienceDescriptions[experience.id] || experience.description;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5;
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.y = time * 0.3;
      cubeRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      cubeRef.current.position.y = 1 + Math.sin(time) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient lighting for experience */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color={experience.color} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color={COLORS.purple} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color={COLORS.darkGray} />
      </mesh>

      {/* Floor ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <ringGeometry args={[8, 10, 64]} />
        <meshStandardMaterial
          color={experience.color}
          emissive={experience.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Central rotating ring */}
      <mesh ref={ringRef} position={[0, 1, 0]}>
        <torusGeometry args={[2.5, 0.1, 16, 64]} />
        <meshStandardMaterial
          color={experience.color}
          emissive={experience.color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Central cube */}
      <mesh ref={cubeRef} position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color={experience.color}
          emissive={experience.color}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Experience icon */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={1}
        anchorX="center"
        anchorY="middle"
      >
        {experience.icon}
      </Text>

      {/* Experience name */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* In development text */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color={experience.color}
        anchorX="center"
        anchorY="middle"
      >
        {translations.inDevelopment}
      </Text>

      {/* Description */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.2}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
        textAlign="center"
      >
        {description}
      </Text>

      {/* Fog */}
      <fog attach="fog" args={[COLORS.darkPurple, 10, 30]} />
    </group>
  );
}

export default ExperiencePlaceholder;
