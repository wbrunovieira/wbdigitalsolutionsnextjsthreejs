import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

// Components
import Lighting from './components/Lighting';
import Room from './components/Room';
import Desk from './components/Desk';
import Monitor from './components/Monitor';
import InteractiveBall from './components/InteractiveBall';
import FloatingParticles from './components/FloatingParticles';
import Button3D from './components/Button3D';

// Data & Constants
import { codeSnippets, ServiceType } from './data/codeSnippets';
import { CAMERA, PHYSICS, COLORS, ANIMATION } from './constants';

/**
 * Main 3D Office Scene Component
 * Orchestrates all sub-components for the interactive 3D environment
 */
const OfficeScene: React.FC = () => {
  const [activeButton, setActiveButton] = useState<ServiceType>('websites');
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
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
        
        {/* Room Structure */}
        <Room />
        
        {/* Office Desks */}
        <Desk position={[0, 0, -3]} service="WEBSITES">
          <Button3D 
            position={[0.5, 0.85, 0.3]}
            onClick={() => setActiveButton('websites')}
            isActive={activeButton === 'websites'}
            label="WEBSITES"
          />
        </Desk>
        
        <Desk position={[-5, 0, 2]} service="AUTOMATION">
          <Button3D 
            position={[0.4, 0.85, 0.2]}
            onClick={() => setActiveButton('automation')}
            isActive={activeButton === 'automation'}
            label="AUTOMATION"
          />
        </Desk>
        
        <Desk position={[5, 0, 2]} service="A.I.">
          <Button3D 
            position={[0.4, 0.85, 0.2]}
            onClick={() => setActiveButton('ai')}
            isActive={activeButton === 'ai'}
            label="A.I."
          />
        </Desk>
      </Physics>
      
      {/* Large Monitor on Back Wall */}
      <Monitor 
        position={[0, 3, -9.8]}
        displayedCode={displayedCode}
        activeButton={activeButton}
      />
      
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