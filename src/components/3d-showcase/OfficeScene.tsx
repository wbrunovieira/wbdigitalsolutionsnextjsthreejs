// src/components/3d-showcase/OfficeScene.tsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

// Components
import Lighting from './components/Lighting';
import Room from './components/Room';
import Desk from './components/Desk';
import InteractiveBall from './components/InteractiveBall';
import FloatingParticles from './components/FloatingParticles';
import Button3D from './components/Button3D';
import HolographicInfo from './components/HolographicInfo';

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
  }, [activeButton]);
  
  return (
    <Canvas
      shadows
      camera={{ position: CAMERA.position, fov: CAMERA.fov }}
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
        />
        
        {/* Office Desks with Holographic Info - Better distributed */}
        <Desk position={[0, 0, -5]} service={getServiceName('websites')}>
          <Button3D 
            position={[0, 0.95, 0.5]}
            onClick={() => setActiveButton('websites')}
            isActive={activeButton === 'websites'}
            label={getServiceName('websites')}
          />
          <HolographicInfo
            isActive={activeButton === 'websites'}
            serviceType="websites"
            language={language}
            position={[0, 3.5, 0]}
          />
        </Desk>
        
        <Desk position={[-5, 0, 0]} service={getServiceName('automation')}>
          <Button3D 
            position={[0, 0.95, 0.5]}
            onClick={() => setActiveButton('automation')}
            isActive={activeButton === 'automation'}
            label={getServiceName('automation')}
          />
          <HolographicInfo
            isActive={activeButton === 'automation'}
            serviceType="automation"
            language={language}
            position={[0, 3.5, 0]}
          />
        </Desk>
        
        <Desk position={[5, 0, 0]} service={getServiceName('ai')}>
          <Button3D 
            position={[0, 0.95, 0.5]}
            onClick={() => setActiveButton('ai')}
            isActive={activeButton === 'ai'}
            label={getServiceName('ai')}
          />
          <HolographicInfo
            isActive={activeButton === 'ai'}
            serviceType="ai"
            language={language}
            position={[0, 3.5, 0]}
          />
        </Desk>
      </Physics>
      
      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={30}
      />
    </Canvas>
  );
};

export default OfficeScene;