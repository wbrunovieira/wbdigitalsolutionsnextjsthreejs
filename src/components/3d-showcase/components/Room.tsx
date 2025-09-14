import React, { useRef, useState, useEffect } from 'react';
import { Box, Image, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RoomProps {
  language?: string;
  displayedCode?: string;
  activeButton?: 'websites' | 'automation' | 'ai';
  isMobile?: boolean;
}

/**
 * Room component containing walls, floor and window
 * All elements have physics colliders for ball interaction
 */
const Room: React.FC<RoomProps> = ({ language = 'en', displayedCode = '', activeButton = 'websites', isMobile = false }) => {
  const ledTopRef = useRef<THREE.Mesh>(null);
  const ledBottomRef = useRef<THREE.Mesh>(null);
  const screenGlowRef = useRef<THREE.Mesh>(null);
  const scanlineRef = useRef<THREE.Mesh>(null);
  
  // State for rotating between sections
  const [currentSection, setCurrentSection] = useState<'mission' | 'vision' | 'values'>('mission');
  const [animationPhase, setAnimationPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');
  const animationRef = useRef({ 
    position: 0, 
    opacity: 1, 
    scale: 1,
    rotation: 0 
  });
  
  // Rotate between sections every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Start exit animation
      setAnimationPhase('exiting');
      
      setTimeout(() => {
        // Change content
        setCurrentSection(prev => {
          if (prev === 'mission') return 'vision';
          if (prev === 'vision') return 'values';
          return 'mission';
        });
        setAnimationPhase('entering');
        
        // Return to visible state
        setTimeout(() => {
          setAnimationPhase('visible');
        }, 600);
      }, 600);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animate LED borders, screen glow, scanline and text transitions
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Pulsing LED borders
    if (ledTopRef.current && ledBottomRef.current) {
      const intensity = 0.3 + Math.sin(time * 2) * 0.15;
      (ledTopRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
      (ledBottomRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
    
    // Screen glow effect
    if (screenGlowRef.current) {
      const glowIntensity = 0.05 + Math.sin(time * 1.5) * 0.02;
      (screenGlowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;
    }
    
    // Scanline effect
    if (scanlineRef.current) {
      const scanPosition = ((time * 0.5) % 4) - 2;
      scanlineRef.current.position.y = scanPosition;
    }
    
    // Smooth text animation transitions
    const springStrength = 8;
    
    if (animationPhase === 'exiting') {
      // Slide out to the left with scale down and fade
      animationRef.current.position = THREE.MathUtils.lerp(animationRef.current.position, -2, delta * springStrength);
      animationRef.current.opacity = THREE.MathUtils.lerp(animationRef.current.opacity, 0, delta * springStrength);
      animationRef.current.scale = THREE.MathUtils.lerp(animationRef.current.scale, 0.7, delta * springStrength);
      animationRef.current.rotation = THREE.MathUtils.lerp(animationRef.current.rotation, -0.3, delta * springStrength);
    } else if (animationPhase === 'entering') {
      // Start from right, slide in with scale up
      if (animationRef.current.position > 1.5) {
        animationRef.current.position = 2;
      }
      animationRef.current.position = THREE.MathUtils.lerp(animationRef.current.position, 0, delta * springStrength);
      animationRef.current.opacity = THREE.MathUtils.lerp(animationRef.current.opacity, 1, delta * springStrength);
      animationRef.current.scale = THREE.MathUtils.lerp(animationRef.current.scale, 1, delta * springStrength);
      animationRef.current.rotation = THREE.MathUtils.lerp(animationRef.current.rotation, 0, delta * springStrength);
    } else {
      // Visible state - subtle floating animation
      animationRef.current.position = Math.sin(time * 0.5) * 0.05;
      animationRef.current.opacity = 1;
      animationRef.current.scale = 1 + Math.sin(time * 0.8) * 0.02;
      animationRef.current.rotation = 0;
    }
  });
  
  // Company philosophy texts
const getPhilosophyText = () => {
  switch(language) {
    case 'pt-BR':
    case 'pt':
      return {
        mission: 'NOSSA MISSÃO',
        missionText: 'Dar vida a ideias, criando soluções digitais que realmente ajudam pessoas e negócios.',
        vision: 'NOSSA VISÃO',
        visionText: 'Ser reconhecida pela forma como unimos tecnologia e criatividade para transformar realidades.',
        values: 'NOSSOS VALORES',
        value1: '• Inovar sempre com propósito',
        value2: '• Qualidade em cada detalhe',
        value3: '• Parceria de confiança',
        value4: '• Impacto que pode ser medido'
      };
    case 'es':
      return {
        mission: 'NUESTRA MISIÓN',
        missionText: 'Dar vida a las ideas, creando soluciones digitales que realmente ayuden a las personas y negocios.',
        vision: 'NUESTRA VISIÓN',
        visionText: 'Ser reconocida por la forma en que unimos tecnología y creatividad para transformar realidades.',
        values: 'NUESTROS VALORES',
        value1: '• Innovar siempre con propósito',
        value2: '• Calidad en cada detalle',
        value3: '• Alianza de confianza',
        value4: '• Impacto que se puede medir'
      };
    case 'it':
      return {
        mission: 'LA NOSTRA MISSIONE',
        missionText: 'Dare vita alle idee, creando soluzioni digitali che realmente aiutino persone e imprese.',
        vision: 'LA NOSTRA VISIONE',
        visionText: 'Essere riconosciuta per il modo in cui uniamo tecnologia e creatività per trasformare le realtà.',
        values: 'I NOSTRI VALORI',
        value1: '• Innovare sempre con uno scopo',
        value2: '• Qualità in ogni dettaglio',
        value3: '• Partnership di fiducia',
        value4: '• Impatto che può essere misurato'
      };
    default:
      return {
        mission: 'OUR MISSION',
        missionText: 'Bring ideas to life by creating digital solutions that truly help people and businesses.',
        vision: 'OUR VISION',
        visionText: 'To be recognized for the way we unite technology and creativity to transform realities.',
        values: 'OUR VALUES',
        value1: '• Innovate always with purpose',
        value2: '• Quality in every detail',
        value3: '• Trusted partnership',
        value4: '• Impact that can be measured'
      };
  }
};

  const texts = getPhilosophyText();

  return (
    <>
      {/* Premium Minimalist Floor with physics */}
      <RigidBody type="fixed">
        <Box args={[30, 0.1, 30]} position={[0, -0.05, 0]} receiveShadow>
          <meshStandardMaterial 
            color="#3a3a3a"
            metalness={0.2}
            roughness={0.3}
            envMapIntensity={0.5}
          />
        </Box>
      </RigidBody>
      
      {/* Polished concrete overlay effect */}
      <Box args={[30, 0.01, 30]} position={[0, 0.01, 0]} receiveShadow>
        <meshStandardMaterial 
          color="#404040"
          metalness={0.4}
          roughness={0.15}
          transparent
          opacity={0.5}
        />
      </Box>
      
      {/* WB Logo - Embossed effect center */}
      <group position={[0, 0.02, 0]}>
        {/* Logo base (raised platform) */}
        <Box args={[6, 0.02, 2.5]} position={[0, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#454545"
            metalness={0.3}
            roughness={0.2}
          />
        </Box>
        
        {/* Logo image on raised platform */}
        <Image 
          url="/svg/logo-white.svg" 
          position={[0, 0.011, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[5, 2]}
          transparent
          opacity={0.2}
        />
      </group>
      
      {/* Spotlights under desks (glowing circles) - Updated positions */}
      {/* Center desk spotlight (Websites) */}
      <mesh position={[0, 0.012, -7]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3.2, 32]} />
        <meshStandardMaterial
          color="#792990"
          emissive="#792990"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>
      
      {/* Left desk spotlight (Automation) */}
      <mesh position={[-7, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3.2, 32]} />
        <meshStandardMaterial
          color="#ffb947"
          emissive="#ffb947"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>
      
      {/* Right desk spotlight (AI) */}
      <mesh position={[7, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3.2, 32]} />
        <meshStandardMaterial
          color="#4a90e2"
          emissive="#4a90e2"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>
      
      {/* Back Wall */}
      <RigidBody type="fixed">
        <Box args={[30, 10, 0.5]} position={[0, 5, -15]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Code Display on Back Wall - Digital Screen Style */}
      <group position={[0, 5, -14.75]}>
        {/* Outer Frame - Decorative Border */}
        <Box args={[8.4, 5.4, 0.15]} position={[0, 0, -0.05]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#792990"
            metalness={0.9}
            roughness={0.1}
            emissive="#792990"
            emissiveIntensity={0.1}
          />
        </Box>
        
        {/* Inner Frame Border - Silver/Chrome */}
        <Box args={[8.2, 5.2, 0.12]} position={[0, 0, -0.02]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#c0c0c0"
            metalness={0.95}
            roughness={0.05}
          />
        </Box>
        
        {/* Screen Frame */}
        <Box args={[8, 5, 0.1]} position={[0, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        
        {/* Screen Glass */}
        <Box args={[7.6, 4.6, 0.02]} position={[0, 0, 0.06]} castShadow>
          <meshStandardMaterial 
            color="#0a0a0a"
            metalness={0.3}
            roughness={0.7}
          />
        </Box>
        
        {/* Corner Accents */}
        {/* Top Left */}
        <Box args={[0.3, 0.3, 0.16]} position={[-4.05, 2.55, -0.05]} castShadow>
          <meshStandardMaterial 
            color="#ffb947"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffb947"
            emissiveIntensity={0.3}
          />
        </Box>
        {/* Top Right */}
        <Box args={[0.3, 0.3, 0.16]} position={[4.05, 2.55, -0.05]} castShadow>
          <meshStandardMaterial 
            color="#ffb947"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffb947"
            emissiveIntensity={0.3}
          />
        </Box>
        {/* Bottom Left */}
        <Box args={[0.3, 0.3, 0.16]} position={[-4.05, -2.55, -0.05]} castShadow>
          <meshStandardMaterial 
            color="#ffb947"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffb947"
            emissiveIntensity={0.3}
          />
        </Box>
        {/* Bottom Right */}
        <Box args={[0.3, 0.3, 0.16]} position={[4.05, -2.55, -0.05]} castShadow>
          <meshStandardMaterial 
            color="#ffb947"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffb947"
            emissiveIntensity={0.3}
          />
        </Box>
        
        {/* Code Text Display */}
        <Text
          position={[-3.7, 2.2, 0.08]}
          fontSize={0.16}
          color="#00ff00"
          fontWeight={400}
          anchorX="left"
          anchorY="top"
          maxWidth={7.2}
          textAlign="left"
          lineHeight={1.2}
          outlineWidth={0}
        >
          {`// ${activeButton === 'websites' ? 'website.jsx' : activeButton === 'automation' ? 'automation.py' : 'ai-integration.js'}\n\n${displayedCode}`}
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.2}
          />
        </Text>
        
        {/* Cursor blink */}
        <Text
          position={[-3.6 + (displayedCode.length * 0.02), 1.8, 0.08]}
          fontSize={0.2}
          color="#00ff00"
          fontWeight={700}
        >
          |
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.5}
          />
        </Text>
      </group>
      
      {/* Left Wall with Window */}
      {/* Lower wall section */}
      <RigidBody type="fixed">
        <Box args={[0.5, 3, 30]} position={[-15, 1.5, 0]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Upper wall section */}
      <RigidBody type="fixed">
        <Box args={[0.5, 3, 30]} position={[-15, 8.5, 0]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Left side of window */}
      <RigidBody type="fixed">
        <Box args={[0.5, 4, 11]} position={[-15, 5, -9.5]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Right side of window */}
      <RigidBody type="fixed">
        <Box args={[0.5, 4, 11]} position={[-15, 5, 9.5]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Window Glass */}
      <Box args={[0.1, 4, 8]} position={[-15, 5, 0]} castShadow>
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.1}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </Box>
      
      {/* Window Frame */}
      <Box args={[0.2, 0.1, 8]} position={[-15, 3, 0]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.2, 0.1, 8]} position={[-15, 7, 0]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.2, 4, 0.1]} position={[-15, 5, -4]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.2, 4, 0.1]} position={[-15, 5, 4]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Right Wall */}
      <RigidBody type="fixed">
        <Box args={[0.5, 10, 30]} position={[15, 5, 0]} receiveShadow castShadow>
          <meshStandardMaterial color="#3d2f50" />
        </Box>
      </RigidBody>
      
      {/* Philosophy Display on Right Wall - Digital Screen Style */}
      <group position={[14.45, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Screen Frame */}
        <Box args={[8, 4.5, 0.3]} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        
        {/* Screen Glass */}
        <Box args={[7.6, 4.1, 0.05]} position={[0, 0, 0.16]}>
          <meshStandardMaterial 
            color="#0a0a0a"
            metalness={0.3}
            roughness={0.7}
            transparent
            opacity={0.95}
          />
        </Box>
        
        {/* Screen Glow Effect */}
        <Box ref={screenGlowRef} args={[7.4, 3.9, 0.01]} position={[0, 0, 0.17]}>
          <meshStandardMaterial 
            color="#1a1a1a"
            emissive="#792990"
            emissiveIntensity={0.08}
          />
        </Box>
        
        {/* LED Border Lights */}
        <Box ref={ledTopRef} args={[7.8, 0.05, 0.05]} position={[0, 2.1, 0.15]}>
          <meshStandardMaterial 
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.3}
          />
        </Box>
        <Box ref={ledBottomRef} args={[7.8, 0.05, 0.05]} position={[0, -2.1, 0.15]}>
          <meshStandardMaterial 
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.3}
          />
        </Box>
        
        {/* Side LED strips */}
        <Box args={[0.05, 4.3, 0.05]} position={[3.85, 0, 0.15]}>
          <meshStandardMaterial 
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.2}
          />
        </Box>
        <Box args={[0.05, 4.3, 0.05]} position={[-3.85, 0, 0.15]}>
          <meshStandardMaterial 
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Holographic Scanline Effect - Very subtle */}
        <Box ref={scanlineRef} args={[7.4, 0.02, 0.01]} position={[0, 0, 0.185]}>
          <meshStandardMaterial
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.1}
            transparent
            opacity={0.03}
          />
        </Box>
        
        {/* Animated Content Display */}
        <group 
          position-x={animationRef.current.position}
          scale={animationRef.current.scale}
          rotation-z={animationRef.current.rotation}
        >
          {/* Mission Section */}
          {currentSection === 'mission' && (
            <group>
              <Text
                position={[0, 1.0, 0.2]}
                fontSize={0.6}
                color="#ffb947"
                fontWeight={900}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.mission}
                <meshStandardMaterial
                  color="#ffb947"
                  emissive="#ffb947"
                  emissiveIntensity={0.3 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
              <Text
                position={[0, -0.2, 0.2]}
                fontSize={0.35}
                color="#ffffff"
                fontWeight={600}
                anchorX="center"
                anchorY="middle"
                maxWidth={6.5}
                textAlign="center"
                outlineWidth={0.02}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.missionText}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.05 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
            </group>
          )}
          
          {/* Vision Section */}
          {currentSection === 'vision' && (
            <group>
              <Text
                position={[0, 1.0, 0.2]}
                fontSize={0.6}
                color="#792990"
                fontWeight={900}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.vision}
                <meshStandardMaterial
                  color="#792990"
                  emissive="#792990"
                  emissiveIntensity={0.3 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
              <Text
                position={[0, -0.2, 0.2]}
                fontSize={0.35}
                color="#ffffff"
                fontWeight={600}
                anchorX="center"
                anchorY="middle"
                maxWidth={6.5}
                textAlign="center"
                outlineWidth={0.02}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.visionText}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.05 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
            </group>
          )}
          
          {/* Values Section */}
          {currentSection === 'values' && (
            <group>
              <Text
                position={[0, 1.2, 0.2]}
                fontSize={0.6}
                color="#4a90e2"
                fontWeight={900}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.values}
                <meshStandardMaterial
                  color="#4a90e2"
                  emissive="#4a90e2"
                  emissiveIntensity={0.3 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
              <Text
                position={[0, 0.4, 0.2]}
                fontSize={0.28}
                color="#ffffff"
                fontWeight={600}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.value1}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.05 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
              <Text
                position={[0, -0.05, 0.2]}
                fontSize={0.28}
                color="#ffffff"
                fontWeight={600}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.value2}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.05 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
              <Text
                position={[0, -0.5, 0.2]}
                fontSize={0.28}
                color="#ffffff"
                fontWeight={600}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.value3}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.05 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
              <Text
                position={[0, -0.95, 0.2]}
                fontSize={0.28}
                color="#ffffff"
                fontWeight={600}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="#000000"
                fillOpacity={animationRef.current.opacity}
              >
                {texts.value4}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.05 * animationRef.current.opacity}
                  transparent
                  opacity={animationRef.current.opacity}
                />
              </Text>
            </group>
          )}
        </group>
      </group>
      
      {/* Front walls with entrance - Hidden on mobile for better view */}
      {!isMobile && (
        <>
          <RigidBody type="fixed">
            <Box args={[10.5, 10, 0.5]} position={[-9.75, 5, 15]} receiveShadow castShadow>
              <meshStandardMaterial color="#3d2f50" />
            </Box>
          </RigidBody>
          <RigidBody type="fixed">
            <Box args={[10.5, 10, 0.5]} position={[9.75, 5, 15]} receiveShadow castShadow>
              <meshStandardMaterial color="#3d2f50" />
            </Box>
          </RigidBody>
          <RigidBody type="fixed">
            <Box args={[9, 3, 0.5]} position={[0, 8.5, 15]} receiveShadow castShadow>
              <meshStandardMaterial color="#3d2f50" />
            </Box>
          </RigidBody>
        </>
      )}
      
    </>
  );
};

export default Room;