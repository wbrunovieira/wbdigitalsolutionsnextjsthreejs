'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';

import Lighting from './components/Lighting';
import Room from './components/Room';
import FloatingParticles from './components/FloatingParticles';
import InteractiveBalls from './components/InteractiveBalls';
import ServiceDesks from './components/ServiceDesks';

import { CAMERA, PHYSICS } from './constants';
import { useOfficeState } from './useOfficeState';

interface OfficeSceneProps {
  language?: string;
}

/** Camera target: on mobile the side desks are framed individually. */
const orbitTarget = (isMobile: boolean, activeButton: string): [number, number, number] => {
  if (isMobile && activeButton === 'automation') return [-5, 3, 0];
  if (isMobile && activeButton === 'ai') return [5, 3, 0];
  return [0, 2, 0];
};

/**
 * Main 3D Office Scene Component
 * Orchestrates all sub-components for the interactive 3D environment
 */
const OfficeScene: React.FC<OfficeSceneProps> = ({ language = 'en' }) => {
  const isMobile = useIsMobileViewport();
  const { activeButton, setActiveButton, displayedCode, showPointers } = useOfficeState();

  return (
    <Canvas
      shadows
      camera={{
        position: isMobile ? [0, 8, 12] : CAMERA.position,
        fov: isMobile ? 60 : CAMERA.fov,
      }}
    >
      <Lighting />

      {/* Floating Particles Outside the Room */}
      <FloatingParticles />

      <Physics gravity={PHYSICS.gravity}>
        <InteractiveBalls />

        <Room
          language={language}
          displayedCode={displayedCode}
          activeButton={activeButton}
          isMobile={isMobile}
        />

        <ServiceDesks
          language={language}
          activeButton={activeButton}
          onSelect={setActiveButton}
          showPointers={showPointers}
        />
      </Physics>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={isMobile ? 5 : 2}
        maxDistance={isMobile ? 25 : 30}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
        enableDamping={true}
        dampingFactor={0.05}
        target={orbitTarget(isMobile, activeButton)}
      />
    </Canvas>
  );
};

export default OfficeScene;
