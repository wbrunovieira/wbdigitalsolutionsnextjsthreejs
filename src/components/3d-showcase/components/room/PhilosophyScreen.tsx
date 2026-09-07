import React, { useRef } from 'react';
import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getPhilosophyTexts } from '../../data/philosophyTexts';
import PhilosophyContent from './PhilosophyContent';
import { usePhilosophyRotation } from './usePhilosophyRotation';

const LED_COLOR = '#792990';

const emissive = (mesh: THREE.Mesh | null, intensity: number) => {
  if (mesh) {
    (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
  }
};

/** Digital screen on the right wall cycling through mission, vision and values. */
const PhilosophyScreen: React.FC<{ language: string }> = ({ language }) => {
  const ledTopRef = useRef<THREE.Mesh>(null);
  const ledBottomRef = useRef<THREE.Mesh>(null);
  const screenGlowRef = useRef<THREE.Mesh>(null);
  const scanlineRef = useRef<THREE.Mesh>(null);

  const { currentSection, animationRef } = usePhilosophyRotation();
  const texts = getPhilosophyTexts(language);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Pulsing LED borders
    const ledIntensity = 0.3 + Math.sin(time * 2) * 0.15;
    emissive(ledTopRef.current, ledIntensity);
    emissive(ledBottomRef.current, ledIntensity);

    // Screen glow effect
    emissive(screenGlowRef.current, 0.05 + Math.sin(time * 1.5) * 0.02);

    // Scanline effect
    if (scanlineRef.current) {
      scanlineRef.current.position.y = ((time * 0.5) % 4) - 2;
    }
  });

  return (
    <group position={[14.45, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Screen Frame */}
      <Box args={[8, 4.5, 0.3]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Screen Glass */}
      <Box args={[7.6, 4.1, 0.05]} position={[0, 0, 0.16]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} transparent opacity={0.95} />
      </Box>

      {/* Screen Glow Effect */}
      <Box ref={screenGlowRef} args={[7.4, 3.9, 0.01]} position={[0, 0, 0.17]}>
        <meshStandardMaterial color="#1a1a1a" emissive={LED_COLOR} emissiveIntensity={0.08} />
      </Box>

      {/* LED Border Lights */}
      <Box ref={ledTopRef} args={[7.8, 0.05, 0.05]} position={[0, 2.1, 0.15]}>
        <meshStandardMaterial color={LED_COLOR} emissive={LED_COLOR} emissiveIntensity={0.3} />
      </Box>
      <Box ref={ledBottomRef} args={[7.8, 0.05, 0.05]} position={[0, -2.1, 0.15]}>
        <meshStandardMaterial color={LED_COLOR} emissive={LED_COLOR} emissiveIntensity={0.3} />
      </Box>

      {/* Side LED strips */}
      <Box args={[0.05, 4.3, 0.05]} position={[3.85, 0, 0.15]}>
        <meshStandardMaterial color={LED_COLOR} emissive={LED_COLOR} emissiveIntensity={0.2} />
      </Box>
      <Box args={[0.05, 4.3, 0.05]} position={[-3.85, 0, 0.15]}>
        <meshStandardMaterial color={LED_COLOR} emissive={LED_COLOR} emissiveIntensity={0.2} />
      </Box>

      {/* Holographic Scanline Effect - Very subtle */}
      <Box ref={scanlineRef} args={[7.4, 0.02, 0.01]} position={[0, 0, 0.185]}>
        <meshStandardMaterial
          color={LED_COLOR}
          emissive={LED_COLOR}
          emissiveIntensity={0.1}
          transparent
          opacity={0.03}
        />
      </Box>

      {/* Animated Content Display */}
      <group
        position-x={animationRef.current.position}
        scale={animationRef.current.scale}
        rotation-z={animationRef.current.rotation}
      >
        <PhilosophyContent section={currentSection} texts={texts} opacity={animationRef.current.opacity} />
      </group>
    </group>
  );
};

export default PhilosophyScreen;
