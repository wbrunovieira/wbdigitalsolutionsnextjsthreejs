/**
 * Hotspot - Interactive clickable point in 3D space
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh, Group, Vector3 } from 'three';
import { useNavigationStore } from '@/stores/navigationStore';
import { COLORS } from '@/components/3d-experience/constants';

interface HotspotProps {
  id: string;
  position: [number, number, number];
  label?: string;
  description?: string;
  color?: string;
  size?: number;
  onClick?: () => void;
  pulseSpeed?: number;
  showLabel?: boolean;
}

export function Hotspot({
  id,
  position,
  label,
  description,
  color = COLORS.yellow,
  size = 0.3,
  onClick,
  pulseSpeed = 2,
  showLabel = true,
}: HotspotProps) {
  const groupRef = useRef<Group>(null);
  const innerRef = useRef<Mesh>(null);
  const outerRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { setHoveredHotspot, hoveredHotspot, isMobile } = useNavigationStore();

  // Pulse animation
  useFrame(({ clock }) => {
    if (outerRef.current) {
      const pulse = Math.sin(clock.elapsedTime * pulseSpeed) * 0.1 + 1;
      outerRef.current.scale.setScalar(pulse);
    }

    // Hover scale
    if (innerRef.current) {
      const targetScale = isHovered ? 1.2 : 1;
      innerRef.current.scale.lerp(
        new Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const handlePointerEnter = () => {
    setIsHovered(true);
    setHoveredHotspot(id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setHoveredHotspot(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Inner solid sphere */}
      <mesh
        ref={innerRef}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* Outer pulsing ring */}
      <mesh ref={outerRef}>
        <ringGeometry args={[size * 1.2, size * 1.5, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={2} // DoubleSide
        />
      </mesh>

      {/* Label */}
      {showLabel && label && (isHovered || isMobile) && (
        <Html
          position={[0, size * 2, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: `1px solid ${color}`,
              boxShadow: `0 0 20px ${color}40`,
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: description ? '4px' : 0 }}>
              {label}
            </div>
            {description && (
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{description}</div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

export default Hotspot;
