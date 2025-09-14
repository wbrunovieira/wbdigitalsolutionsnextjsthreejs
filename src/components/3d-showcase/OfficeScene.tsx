// src/components/3d-showcase/OfficeScene.tsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';

// Components
import Lighting from './components/Lighting';
import Room from './components/Room';
import Desk from './components/Desk';
import InteractiveBall from './components/InteractiveBall';
import FloatingParticles from './components/FloatingParticles';
import Button3D from './components/Button3D';
import HolographicInfo from './components/HolographicInfo';
import PointerHand from './components/PointerHand';

// Data & Constants
import { codeSnippets, ServiceType } from './data/codeSnippets';
import { CAMERA, PHYSICS, COLORS, ANIMATION } from './constants';

interface OfficeSceneProps {
  language?: string;
}

/**
 * Main 3D Office Scene Component
 * Orchestrates all sub-components for the interactive 3D environment
 */
const OfficeScene: React.FC<OfficeSceneProps> = ({ language = 'en' }) => {
  const [activeButton, setActiveButton] = useState<ServiceType>('websites');
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showPointers, setShowPointers] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get translated service names
  const getServiceName = (service: string) => {
    switch(language) {
      case 'pt-BR':
      case 'pt':
        return {
          websites: 'SITES',
          automation: 'AUTOMAÇÃO',
          ai: 'I.A.'
        }[service.toLowerCase()] || service;
      case 'es':
        return {
          websites: 'SITIOS WEB',
          automation: 'AUTOMATIZACIÓN',
          ai: 'I.A.'
        }[service.toLowerCase()] || service;
      case 'it':
        return {
          websites: 'SITI WEB',
          automation: 'AUTOMAZIONE',
          ai: 'I.A.'
        }[service.toLowerCase()] || service;
      default:
        return {
          websites: 'WEBSITES',
          automation: 'AUTOMATION',
          ai: 'A.I.'
        }[service.toLowerCase()] || service;
    }
  };
  
  // Typewriter effect for code display
  useEffect(() => {
    const targetCode = codeSnippets[activeButton];
    if (currentCharIndex < targetCode.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(targetCode.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, ANIMATION.typewriterSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, activeButton]);
  
  // Reset animation when button changes
  useEffect(() => {
    setDisplayedCode('');
    setCurrentCharIndex(0);
    // Hide pointers after first interaction
    if (!hasInteracted && activeButton !== 'websites') {
      setHasInteracted(true);
      setShowPointers(false);
    }
  }, [activeButton, hasInteracted]);

  // Hide pointers after 10 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPointers(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for navigation events from mobile buttons
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveButton(event.detail as ServiceType);
    };

    window.addEventListener('navigateToDesk', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigateToDesk', handleNavigate as EventListener);
    };
  }, []);
  
  return (
    <Canvas
      shadows
      camera={{
        position: isMobile ? [0, 8, 12] : CAMERA.position,
        fov: isMobile ? 60 : CAMERA.fov
      }}
    >
      {/* Scene Lighting */}
      <Lighting />
      
      {/* Floating Particles Outside the Room */}
      <FloatingParticles />
      
      {/* Physics World */}
      <Physics gravity={PHYSICS.gravity}>
        {/* Interactive Balls - Three different colored balls */}
        <InteractiveBall 
          position={[-6, 3, 2]}
          velocity={[-3, 0, -4]}
          color={COLORS.purple}
          emissive={COLORS.darkPurple}
          delay={ANIMATION.ballDropDelays[0]}
        />
        <InteractiveBall 
          position={[6, 4, 3]}
          velocity={[2, 0, -5]}
          color={COLORS.yellow}
          emissive={COLORS.orange}
          delay={ANIMATION.ballDropDelays[1]}
        />
        <InteractiveBall 
          position={[0, 3.5, 5]}
          velocity={[1, 0, -6]}
          color={COLORS.darkPurple}
          emissive={COLORS.purple}
          delay={ANIMATION.ballDropDelays[2]}
        />
        
        {/* Room Structure with Code Display */}
        <Room
          language={language}
          displayedCode={displayedCode}
          activeButton={activeButton}
          isMobile={isMobile}
        />
        
        {/* Office Desks with Holographic Info - Better distributed */}
        <Desk position={[0, 0, -5]} service={getServiceName('websites')}>
          <Button3D 
            position={[2.5, 0.95, 1]}
            onClick={() => setActiveButton('websites')}
            isActive={activeButton === 'websites'}
            label={getServiceName('websites')}
            scale={3.5}
          />
          <HolographicInfo
            isActive={activeButton === 'websites'}
            serviceType="websites"
            language={language}
            position={[0, 5.5, 0]}
          />
        </Desk>
        
        <Desk position={[-5, 0, 0]} service={getServiceName('automation')}>
          <Button3D
            position={[2.5, 0.95, 1]}
            onClick={() => setActiveButton('automation')}
            isActive={activeButton === 'automation'}
            label={getServiceName('automation')}
            scale={3.5}
          />
          <HolographicInfo
            isActive={activeButton === 'automation'}
            serviceType="automation"
            language={language}
            position={[0, 5.5, 0]}
          />
          {/* Pointer hand for Automation button */}
          <PointerHand
            position={[2.5, 3, 1]}
            rotation={[0, 0, 0]}
            isVisible={showPointers}
            delay={500}
            language={language}
          />
        </Desk>

        <Desk position={[5, 0, 0]} service={getServiceName('ai')}>
          <Button3D
            position={[2.5, 0.95, 1]}
            onClick={() => setActiveButton('ai')}
            isActive={activeButton === 'ai'}
            label={getServiceName('ai')}
            scale={3.5}
          />
          <HolographicInfo
            isActive={activeButton === 'ai'}
            serviceType="ai"
            language={language}
            position={[0, 5.5, 0]}
          />
          {/* Pointer hand for AI button */}
          <PointerHand
            position={[2.5, 3, 1]}
            rotation={[0, 0, 0]}
            isVisible={showPointers}
            delay={1000}
            language={language}
          />
        </Desk>
      </Physics>
      
      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={isMobile ? 5 : 2}
        maxDistance={isMobile ? 25 : 30}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        }}
        enableDamping={true}
        dampingFactor={0.05}
        target={isMobile && activeButton === 'automation' ? [-5, 3, 0] :
                isMobile && activeButton === 'ai' ? [5, 3, 0] :
                [0, 2, 0]}
      />
    </Canvas>
  );
};

export default OfficeScene;