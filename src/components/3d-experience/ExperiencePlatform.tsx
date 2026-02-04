/**
 * ExperiencePlatform - Main wrapper component for the 3D Experience Platform
 * Orchestrates the hub, experiences, navigation, and UI
 */

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useNavigationStore } from '@/stores/navigationStore';
import { useDeviceType } from '@/hooks/useDeviceType';
import { COLORS, PERFORMANCE, CAMERA_POSITIONS } from './constants';
import { CameraController } from './navigation/CameraController';
import { TransitionOverlay } from './navigation/TransitionOverlay';
import { BackToHubButton } from './ui/BackToHubButton';
import { MobileControls } from './navigation/MobileControls';

interface ExperiencePlatformProps {
  children?: React.ReactNode;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={COLORS.purple} wireframe />
    </mesh>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color={COLORS.purple} />
      <pointLight position={[10, 5, 10]} intensity={0.3} color={COLORS.yellow} />
    </>
  );
}

export function ExperiencePlatform({ children }: ExperiencePlatformProps) {
  const { setIsMobile, setCameraPosition, setCameraTarget } = useNavigationStore();
  const { isMobile, isTablet } = useDeviceType();

  // Sync device type with navigation store
  useEffect(() => {
    setIsMobile(isMobile || isTablet);
  }, [isMobile, isTablet, setIsMobile]);

  // Set initial camera position
  useEffect(() => {
    setCameraPosition(CAMERA_POSITIONS.hub.position);
    setCameraTarget(CAMERA_POSITIONS.hub.target);
  }, [setCameraPosition, setCameraTarget]);

  const performanceSettings = isMobile ? PERFORMANCE.mobile : PERFORMANCE.desktop;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: `linear-gradient(180deg, ${COLORS.darkPurple} 0%, ${COLORS.black} 100%)`,
      }}
    >
      <Canvas
        camera={{
          position: CAMERA_POSITIONS.hub.position,
          fov: CAMERA_POSITIONS.hub.fov,
          near: 0.1,
          far: 1000,
        }}
        dpr={performanceSettings.dpr}
        shadows={performanceSettings.shadows}
        gl={{
          antialias: performanceSettings.antialias,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneLighting />
          <CameraController />

          {/* Placeholder content - will be replaced with Hub and Experiences */}
          {children || <PlaceholderHub />}

          <Preload all />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <TransitionOverlay />
      <BackToHubButton />
      <MobileControls />
    </div>
  );
}

// Temporary placeholder for the Hub
function PlaceholderHub() {
  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial color={COLORS.darkPurple} />
      </mesh>

      {/* Central platform indicator */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[3, 3.5, 0.5, 6]} />
        <meshStandardMaterial
          color={COLORS.purple}
          emissive={COLORS.purple}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Portal position markers (will be replaced with actual portals) */}
      {[
        [0, 0.5, -10],
        [7, 0.5, -7],
        [10, 0.5, 0],
        [7, 0.5, 7],
        [0, 0.5, 10],
        [-7, 0.5, 7],
        [-10, 0.5, 0],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[2, 3, 0.5]} />
          <meshStandardMaterial
            color={COLORS.yellow}
            emissive={COLORS.yellow}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Fog for depth */}
      <fog attach="fog" args={[COLORS.darkPurple, 20, 50]} />
    </group>
  );
}

export default ExperiencePlatform;
