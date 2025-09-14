import React, { useRef, useEffect } from 'react';
import { Html, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FaHandPointDown } from 'react-icons/fa';

interface PointerHandProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  isVisible?: boolean;
  delay?: number;
  language?: string;
}

const PointerHand: React.FC<PointerHandProps> = ({
  position,
  rotation = [0, 0, 0],
  isVisible = true,
  delay = 0,
  language = 'en'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Group>(null);
  const [show, setShow] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0);

  // Get translated text
  const getText = () => {
    switch(language) {
      case 'pt-BR':
      case 'pt':
        return 'Aperte o Botão';
      case 'es':
        return 'Presiona el Botón';
      case 'it':
        return 'Premi il Pulsante';
      default:
        return 'Press the Button';
    }
  };

  // Delay the appearance of the hand
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, delay]);

  // Animate the hand movement and opacity
  useFrame((state, delta) => {
    if (handRef.current && show) {
      const time = state.clock.getElapsedTime();

      // Vertical bounce animation
      handRef.current.position.y = Math.sin(time * 3) * 0.2;

      // Pulse scale animation
      const scale = 1.2 + Math.sin(time * 4) * 0.1;
      handRef.current.scale.set(scale, scale, scale);
    }

    // Fade in/out animation
    const targetOpacity = show ? 1 : 0;
    setOpacity(THREE.MathUtils.lerp(opacity, targetOpacity, delta * 5));

    // Glow effect animation
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material.transparent) {
            material.opacity = opacity * 0.3;
          }
        }
      });
    }
  });

  if (!show && opacity < 0.01) return null;

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <group ref={handRef}>
        {/* HTML Icon */}
        <Html
          center
          distanceFactor={8}
          style={{
            opacity: opacity,
            transition: 'none',
            pointerEvents: 'none'
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              fontSize: '192px',
              color: '#ffb947',
              filter: `drop-shadow(0 0 20px rgba(255, 185, 71, 0.8))`,
              animation: 'pulse 1s infinite'
            }}>
              <FaHandPointDown />
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ffb947',
              textShadow: '0 0 10px rgba(255, 185, 71, 0.8)',
              whiteSpace: 'nowrap',
              letterSpacing: '1px',
              animation: 'pulse 1s infinite'
            }}>
              {getText()}
            </div>
          </div>
          <style jsx>{`
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
                filter: drop-shadow(0 0 20px rgba(255, 185, 71, 0.8));
              }
              50% {
                transform: scale(1.1);
                filter: drop-shadow(0 0 30px rgba(255, 185, 71, 1));
              }
            }
          `}</style>
        </Html>

        {/* Glow effect sphere */}
        <Sphere args={[0.6, 16, 16]} position={[0, -0.5, 0]}>
          <meshStandardMaterial
            color="#ffb947"
            emissive="#ffb947"
            emissiveIntensity={0.6}
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Click indicator rings */}
        <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.5, 32]} />
          <meshStandardMaterial
            color="#ffb947"
            emissive="#ffb947"
            emissiveIntensity={0.6}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.65, 32]} />
          <meshStandardMaterial
            color="#ffb947"
            emissive="#ffb947"
            emissiveIntensity={0.4}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.8, 32]} />
          <meshStandardMaterial
            color="#ffb947"
            emissive="#ffb947"
            emissiveIntensity={0.2}
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};

export default PointerHand;