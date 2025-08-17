import React, { useRef, useEffect } from 'react';
import { Text, Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicInfoProps {
  isActive: boolean;
  serviceType: 'websites' | 'automation' | 'ai';
  language?: string;
  position?: [number, number, number];
}

const HolographicInfo: React.FC<HolographicInfoProps> = ({ 
  isActive, 
  serviceType, 
  language = 'en',
  position = [0, 2.5, 0]
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const animationRef = useRef({ 
    opacity: 0, 
    scale: 0.5,
    height: 0,
    glow: 0
  });

  // Get service info based on type and language
  const getServiceInfo = () => {
    switch(serviceType) {
      case 'websites':
        switch(language) {
          case 'pt-BR':
          case 'pt':
            return {
              title: 'DESENVOLVIMENTO WEB',
              lines: [
                '✦ Design Moderno & Responsivo',
                '✦ Animações & Recursos 3D',
                '✦ React, Next.js, TypeScript',
                '✦ Aplicações Completas',
                '✦ Hospedagem AWS'
              ],
              color: '#792990'
            };
          case 'es':
            return {
              title: 'DESARROLLO WEB',
              lines: [
                '✦ Diseño Moderno y Responsivo',
                '✦ Animaciones y Recursos 3D',
                '✦ React, Next.js, TypeScript',
                '✦ Aplicaciones Completas',
                '✦ Alojamiento AWS'
              ],
              color: '#792990'
            };
          case 'it':
            return {
              title: 'SVILUPPO WEB',
              lines: [
                '✦ Design Moderno e Responsivo',
                '✦ Animazioni e Risorse 3D',
                '✦ React, Next.js, TypeScript',
                '✦ Applicazioni Complete',
                '✦ Hosting AWS'
              ],
              color: '#792990'
            };
          default:
            return {
              title: 'WEB DEVELOPMENT',
              lines: [
                '✦ Modern & Responsive Design',
                '✦ Animations & 3D Features',
                '✦ React, Next.js, TypeScript',
                '✦ Complete Applications',
                '✦ AWS Hosting'
              ],
              color: '#792990'
            };
        }
      
      case 'automation':
        switch(language) {
          case 'pt-BR':
          case 'pt':
            return {
              title: 'AUTOMAÇÃO',
              lines: [
                '⚡ Otimização de Fluxos',
                '⚡ Scripts Personalizados',
                '⚡ Integrações de Sistemas',
                '⚡ Eliminação de Erros',
                '⚡ Maior Produtividade'
              ],
              color: '#ffb947'
            };
          case 'es':
            return {
              title: 'AUTOMATIZACIÓN',
              lines: [
                '⚡ Optimización de Flujos',
                '⚡ Scripts Personalizados',
                '⚡ Integraciones de Sistemas',
                '⚡ Eliminación de Errores',
                '⚡ Mayor Productividad'
              ],
              color: '#ffb947'
            };
          case 'it':
            return {
              title: 'AUTOMAZIONE',
              lines: [
                '⚡ Ottimizzazione dei Flussi',
                '⚡ Script Personalizzati',
                '⚡ Integrazioni di Sistema',
                '⚡ Eliminazione degli Errori',
                '⚡ Maggiore Produttività'
              ],
              color: '#ffb947'
            };
          default:
            return {
              title: 'AUTOMATION',
              lines: [
                '⚡ Workflow Optimization',
                '⚡ Custom Scripts',
                '⚡ System Integrations',
                '⚡ Error Elimination',
                '⚡ Increased Productivity'
              ],
              color: '#ffb947'
            };
        }
      
      case 'ai':
        switch(language) {
          case 'pt-BR':
          case 'pt':
            return {
              title: 'INTELIGÊNCIA ARTIFICIAL',
              lines: [
                '🤖 GPT-4, Claude, Gemini',
                '🤖 Treinamento com Seus Dados',
                '🤖 Ciência de Dados',
                '🤖 Machine Learning',
                '🤖 Análise Preditiva'
              ],
              color: '#4a90e2'
            };
          case 'es':
            return {
              title: 'INTELIGENCIA ARTIFICIAL',
              lines: [
                '🤖 GPT-4, Claude, Gemini',
                '🤖 Entrenamiento con Sus Datos',
                '🤖 Ciencia de Datos',
                '🤖 Machine Learning',
                '🤖 Análisis Predictivo'
              ],
              color: '#4a90e2'
            };
          case 'it':
            return {
              title: 'INTELLIGENZA ARTIFICIALE',
              lines: [
                '🤖 GPT-4, Claude, Gemini',
                '🤖 Training con i Tuoi Dati',
                '🤖 Scienza dei Dati',
                '🤖 Machine Learning',
                '🤖 Analisi Predittiva'
              ],
              color: '#4a90e2'
            };
          default:
            return {
              title: 'ARTIFICIAL INTELLIGENCE',
              lines: [
                '🤖 GPT-4, Claude, Gemini',
                '🤖 Training with Your Data',
                '🤖 Data Science',
                '🤖 Machine Learning',
                '🤖 Predictive Analytics'
              ],
              color: '#4a90e2'
            };
        }
    }
  };

  const serviceInfo = getServiceInfo();

  // Animate hologram appearance
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    if (isActive) {
      // Fade in and scale up
      animationRef.current.opacity = THREE.MathUtils.lerp(animationRef.current.opacity, 1, delta * 5);
      animationRef.current.scale = THREE.MathUtils.lerp(animationRef.current.scale, 1, delta * 5);
      animationRef.current.height = THREE.MathUtils.lerp(animationRef.current.height, 1, delta * 5);
      animationRef.current.glow = 0.3 + Math.sin(time * 3) * 0.1;
    } else {
      // Fade out and scale down
      animationRef.current.opacity = THREE.MathUtils.lerp(animationRef.current.opacity, 0, delta * 5);
      animationRef.current.scale = THREE.MathUtils.lerp(animationRef.current.scale, 0.5, delta * 5);
      animationRef.current.height = THREE.MathUtils.lerp(animationRef.current.height, 0, delta * 5);
      animationRef.current.glow = 0;
    }

    // Floating animation when visible
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(time) * 0.05;
    }
  });

  if (!isActive && animationRef.current.opacity < 0.01) {
    return null;
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Holographic frame */}
      <Box 
        args={[4, 2.5 * animationRef.current.height, 0.01]} 
        position={[0, 0, -0.1]}
      >
        <meshStandardMaterial
          color={serviceInfo.color}
          emissive={serviceInfo.color}
          emissiveIntensity={animationRef.current.glow}
          transparent
          opacity={animationRef.current.opacity * 0.1}
        />
      </Box>

      {/* Holographic borders */}
      <Box args={[4.1, 0.05, 0.02]} position={[0, 1.25 * animationRef.current.height, 0]}>
        <meshStandardMaterial
          color={serviceInfo.color}
          emissive={serviceInfo.color}
          emissiveIntensity={animationRef.current.glow * 2}
          transparent
          opacity={animationRef.current.opacity * 0.8}
        />
      </Box>
      <Box args={[4.1, 0.05, 0.02]} position={[0, -1.25 * animationRef.current.height, 0]}>
        <meshStandardMaterial
          color={serviceInfo.color}
          emissive={serviceInfo.color}
          emissiveIntensity={animationRef.current.glow * 2}
          transparent
          opacity={animationRef.current.opacity * 0.8}
        />
      </Box>

      {/* Title */}
      <Text
        position={[0, 0.8 * animationRef.current.height, 0]}
        fontSize={0.35 * animationRef.current.scale}
        color={serviceInfo.color}
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        fillOpacity={animationRef.current.opacity}
      >
        {serviceInfo.title}
        <meshStandardMaterial
          color={serviceInfo.color}
          emissive={serviceInfo.color}
          emissiveIntensity={animationRef.current.glow}
          transparent
          opacity={animationRef.current.opacity}
        />
      </Text>

      {/* Info lines */}
      {serviceInfo.lines.map((line, index) => (
        <Text
          key={index}
          position={[0, (0.3 - index * 0.3) * animationRef.current.height, 0]}
          fontSize={0.2 * animationRef.current.scale}
          color="#ffffff"
          fontWeight={600}
          anchorX="center"
          anchorY="middle"
          fillOpacity={animationRef.current.opacity}
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {line}
          <meshStandardMaterial
            color="#ffffff"
            emissive={serviceInfo.color}
            emissiveIntensity={animationRef.current.glow * 0.3}
            transparent
            opacity={animationRef.current.opacity}
          />
        </Text>
      ))}

      {/* Holographic scanlines */}
      <Box 
        args={[3.8, 0.02, 0.01]} 
        position={[0, Math.sin(Date.now() * 0.001) * animationRef.current.height, 0.05]}
      >
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent
          opacity={animationRef.current.opacity * 0.2}
        />
      </Box>
    </group>
  );
};

export default HolographicInfo;