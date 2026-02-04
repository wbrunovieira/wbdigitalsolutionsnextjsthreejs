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
import { BackToHubButton, GuidedTourOverlay, HubUI, LanguageSelector } from './ui';
import { MobileControls } from './navigation/MobileControls';
import { HubScene } from './HubCentral';
import { ExperienceRenderer } from './experiences';
import { ExperienceLanguageProvider, useExperienceLanguage } from './contexts';

interface ExperiencePlatformProps {
  children?: React.ReactNode;
}

function LoadingFallback() {
  const { t } = useExperienceLanguage();

  return (
    <group>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={COLORS.purple} wireframe />
      </mesh>
      <ambientLight intensity={0.5} />
    </group>
  );
}

function ExperiencePlatformContent({ children }: ExperiencePlatformProps) {
  const { setIsMobile, setCameraPosition, setCameraTarget, currentLocation } =
    useNavigationStore();
  const { isMobile, isTablet } = useDeviceType();
  const { language, setLanguage, t } = useExperienceLanguage();

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
          <CameraController />

          {/* Hub Central - visible when in hub location */}
          <HubScene />

          {/* Experience scenes - rendered when in an experience */}
          <ExperienceRenderer />

          {/* Additional content - passed as children */}
          {children}

          <Preload all />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <LanguageSelector
        language={language}
        onLanguageChange={setLanguage}
        isMobile={isMobile}
      />
      <TransitionOverlay />
      <BackToHubButton />
      <HubUI />
      <GuidedTourOverlay />
      <MobileControls />

      {/* Location indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            background: 'rgba(0,0,0,0.7)',
            color: COLORS.white,
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          Location: {currentLocation} | Lang: {language}
        </div>
      )}
    </div>
  );
}

export function ExperiencePlatform({ children }: ExperiencePlatformProps) {
  return (
    <ExperienceLanguageProvider>
      <ExperiencePlatformContent>{children}</ExperiencePlatformContent>
    </ExperienceLanguageProvider>
  );
}

export default ExperiencePlatform;
