import React from 'react';
import { Box, Text } from '@react-three/drei';

export type CodeTopic = 'websites' | 'automation' | 'ai';

const CODE_FILENAMES: Record<CodeTopic, string> = {
  websites: 'website.jsx',
  automation: 'automation.py',
  ai: 'ai-integration.js',
};

const ACCENT_COLOR = '#ffb947';
const CODE_COLOR = '#00ff00';

const CORNER_ACCENTS: [number, number][] = [
  [-4.05, 2.55],
  [4.05, 2.55],
  [-4.05, -2.55],
  [4.05, -2.55],
];

const CornerAccent: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <Box args={[0.3, 0.3, 0.16]} position={[x, y, -0.05]} castShadow>
    <meshStandardMaterial
      color={ACCENT_COLOR}
      metalness={0.8}
      roughness={0.2}
      emissive={ACCENT_COLOR}
      emissiveIntensity={0.3}
    />
  </Box>
);

interface CodeWallScreenProps {
  displayedCode: string;
  activeButton: CodeTopic;
}

/** Digital screen on the back wall that types out the code snippet of the active topic. */
const CodeWallScreen: React.FC<CodeWallScreenProps> = ({ displayedCode, activeButton }) => (
  <group position={[0, 5, -14.75]}>
    {/* Outer Frame - Decorative Border */}
    <Box args={[8.4, 5.4, 0.15]} position={[0, 0, -0.05]} castShadow receiveShadow>
      <meshStandardMaterial
        color="#792990"
        metalness={0.9}
        roughness={0.1}
        emissive="#792990"
        emissiveIntensity={0.1}
      />
    </Box>

    {/* Inner Frame Border - Silver/Chrome */}
    <Box args={[8.2, 5.2, 0.12]} position={[0, 0, -0.02]} castShadow receiveShadow>
      <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
    </Box>

    {/* Screen Frame */}
    <Box args={[8, 5, 0.1]} position={[0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
    </Box>

    {/* Screen Glass */}
    <Box args={[7.6, 4.6, 0.02]} position={[0, 0, 0.06]} castShadow>
      <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
    </Box>

    {CORNER_ACCENTS.map(([x, y]) => (
      <CornerAccent key={`${x},${y}`} x={x} y={y} />
    ))}

    {/* Code Text Display */}
    <Text
      position={[-3.7, 2.2, 0.08]}
      fontSize={0.16}
      color={CODE_COLOR}
      fontWeight={400}
      anchorX="left"
      anchorY="top"
      maxWidth={7.2}
      textAlign="left"
      lineHeight={1.2}
      outlineWidth={0}
    >
      {`// ${CODE_FILENAMES[activeButton]}\n\n${displayedCode}`}
      <meshStandardMaterial color={CODE_COLOR} emissive={CODE_COLOR} emissiveIntensity={0.2} />
    </Text>

    {/* Cursor blink */}
    <Text
      position={[-3.6 + displayedCode.length * 0.02, 1.8, 0.08]}
      fontSize={0.2}
      color={CODE_COLOR}
      fontWeight={700}
    >
      |
      <meshStandardMaterial color={CODE_COLOR} emissive={CODE_COLOR} emissiveIntensity={0.5} />
    </Text>
  </group>
);

export default CodeWallScreen;
