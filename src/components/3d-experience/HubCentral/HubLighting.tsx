/**
 * HubLighting - Lighting setup for the Hub Central
 */

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointLight } from 'three';
import { COLORS } from '../constants';
import { useNavigationStore } from '@/stores/navigationStore';

export const HubLighting = memo(function HubLighting() {
  const purpleLight1Ref = useRef<PointLight>(null);
  const purpleLight2Ref = useRef<PointLight>(null);
  const yellowLightRef = useRef<PointLight>(null);
  const { isMobile } = useNavigationStore();

  // Subtle light animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (purpleLight1Ref.current) {
      purpleLight1Ref.current.intensity = 0.5 + Math.sin(time * 0.5) * 0.1;
    }
    if (purpleLight2Ref.current) {
      purpleLight2Ref.current.intensity = 0.5 + Math.sin(time * 0.7) * 0.1;
    }
    if (yellowLightRef.current) {
      yellowLightRef.current.intensity = 0.5 + Math.sin(time * 0.6) * 0.1;
    }
  });

  return (
    <>
      {/* Ambient base light */}
      <ambientLight intensity={isMobile ? 0.4 : 0.3} />

      {/* Main top light - shadows only on desktop */}
      <pointLight
        position={[0, 15, 0]}
        intensity={1.5}
        color="#ffffff"
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? undefined : [1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      {/* Directional fill light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#ffffff"
      />

      {/* Colored accent lights for portals */}
      <pointLight
        ref={purpleLight1Ref}
        position={[0, 2, -10]}
        intensity={0.5}
        color={COLORS.purple}
        distance={15}
      />
      <pointLight
        ref={yellowLightRef}
        position={[10, 2, 0]}
        intensity={0.5}
        color={COLORS.yellow}
        distance={15}
      />
      <pointLight
        position={[0, 2, 10]}
        intensity={0.5}
        color={COLORS.blue}
        distance={15}
      />
      <pointLight
        ref={purpleLight2Ref}
        position={[-10, 2, 0]}
        intensity={0.5}
        color={COLORS.purple}
        distance={15}
      />

      {/* Rim lights - desktop only */}
      {!isMobile && (
        <>
          <pointLight
            position={[7, 2, -7]}
            intensity={0.3}
            color={COLORS.yellow}
            distance={12}
          />
          <pointLight
            position={[-7, 2, 7]}
            intensity={0.3}
            color={COLORS.blue}
            distance={12}
          />
        </>
      )}
    </>
  );
});

export default HubLighting;
