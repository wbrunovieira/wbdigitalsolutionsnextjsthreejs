import React, { useState } from 'react';
import { Box } from '@react-three/drei';
import { COLORS } from '../constants';

interface Button3DProps {
  position: [number, number, number];
  onClick: () => void;
  isActive: boolean;
  label: string;
  scale?: number;
}

/**
 * Interactive 3D button component for desk interactions
 */
const Button3D: React.FC<Button3DProps> = ({ position, onClick, isActive, label, scale = 1 }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position} scale={scale}>
      {/* Button Base */}
      <Box 
        args={[0.3, 0.1, 0.3]} 
        position={[0, isActive ? 0.05 : 0, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <meshStandardMaterial 
          color={isActive ? COLORS.yellow : (hovered ? '#9747ff' : COLORS.purple)}
          emissive={isActive ? COLORS.yellow : COLORS.purple}
          emissiveIntensity={isActive ? 0.3 : 0.1}
        />
      </Box>
      
      {/* Button Top (pressable part) */}
      <Box 
        args={[0.25, 0.05, 0.25]} 
        position={[0, isActive ? 0.12 : 0.08, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color={isActive ? '#ffd700' : '#a855f7'}
          metalness={0.5}
          roughness={0.3}
        />
      </Box>
    </group>
  );
};

export default Button3D;