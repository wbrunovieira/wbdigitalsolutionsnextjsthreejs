// src/components/3d-showcase/components/HolographicInfo.tsx

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
  switch (serviceType) {
    case 'websites':
      switch (language) {
        case 'pt-BR':
        case 'pt':
          return {
            title: 'DESENVOLVIMENTO WEB',
            lines: [
              '✦ Visual moderno e profissional',
              '✦ Animações suaves e 3D',
              '✦ Navegação simples e clara',
              '✦ Plataformas completas: e-commerce,',
              '   ensino online e soluções sob medida',
              '✦ Publicação e suporte na nuvem'
            ],
            color: '#792990'
          };
        case 'es':
          return {
            title: 'DESARROLLO WEB',
            lines: [
              '✦ Visual moderno y profesional',
              '✦ Animaciones suaves y 3D ',
              '✦ Navegación simple y clara',
              '✦ Plataformas completas: e-commerce,',
              '   enseñanza online y soluciones a medida',
              '✦ Publicación y soporte en la nube'
            ],
            color: '#792990'
          };
        case 'it':
          return {
            title: 'SVILUPPO WEB',
            lines: [
              '✦ Look moderno e professionale',
              '✦ Animazioni fluide e 3D ',
              '✦ Navigazione semplice e intuitiva',
              '✦ Piattaforme complete: e-commerce,',
              '   e-learning e soluzioni su misura',
              '✦ Pubblicazione e supporto nel cloud'
            ],
            color: '#792990'
          };
        default:
          return {
            title: 'WEB DEVELOPMENT',
            lines: [
              '✦ Modern, professional look',
              '✦ Smooth animations & 3D where it fits',
              '✦ Easy, intuitive navigation',
              '✦ Complete platforms: e-commerce,',
              '   e-learning and custom solutions',
              '✦ Cloud launch and support'
            ],
            color: '#792990'
          };
      }

    case 'automation':
      switch (language) {
        case 'pt-BR':
        case 'pt':
          return {
            title: 'AUTOMAÇÃO',
            lines: [
              '⚡ Menos tarefas repetitivas',
              '⚡ Sistemas conversando entre si',
              '⚡ Rotinas confiáveis, com alertas',
              '⚡ Menos erros e retrabalho',
              '⚡ Mais tempo para o que importa'
            ],
            color: '#ffb947'
          };
        case 'es':
          return {
            title: 'AUTOMATIZACIÓN',
            lines: [
              '⚡ Menos tareas repetitivas',
              '⚡ Sistemas que se comunican entre sí',
              '⚡ Rutinas confiables con alertas',
              '⚡ Menos errores y retrabajo',
              '⚡ Más tiempo para lo que importa'
            ],
            color: '#ffb947'
          };
        case 'it':
          return {
            title: 'AUTOMAZIONE',
            lines: [
              '⚡ Meno attività ripetitive',
              '⚡ Sistemi che parlano tra loro',
              '⚡ Routine affidabili con avvisi',
              '⚡ Meno errori e rilavorazioni',
              '⚡ Più tempo per ciò che conta'
            ],
            color: '#ffb947'
          };
        default:
          return {
            title: 'AUTOMATION',
            lines: [
              '⚡ Fewer repetitive tasks',
              '⚡ Systems that talk to each other',
              '⚡ Reliable routines with alerts',
              '⚡ Fewer errors and rework',
              '⚡ More time for what matters'
            ],
            color: '#ffb947'
          };
      }

    case 'ai':
      switch (language) {
        case 'pt-BR':
        case 'pt':
          return {
            title: 'INTELIGÊNCIA ARTIFICIAL',
            lines: [
              '🤖 Chatbots e assistentes sob medida',
              '🤖 IA que usa seus próprios conteúdos (RAG)',
              '🤖 Organização e leitura de textos',
              '🤖 Previsões e segmentações',
              '🤖 Métricas e melhoria contínua'
            ],
            color: '#4a90e2'
          };
        case 'es':
          return {
            title: 'INTELIGENCIA ARTIFICIAL',
            lines: [
              '🤖 Chatbots y asistentes a medida',
              '🤖 IA con tus propios contenidos (RAG)',
              '🤖 Organización y lectura de textos',
              '🤖 Predicciones y segmentación',
              '🤖 Métricas y mejora continua'
            ],
            color: '#4a90e2'
          };
        case 'it':
          return {
            title: 'INTELLIGENZA ARTIFICIALE',
            lines: [
              '🤖 Chatbot e assistenti su misura',
              '🤖 IA sui tuoi contenuti (RAG)',
              '🤖 Organizzazione e lettura di testi',
              '🤖 Previsioni e segmentazioni',
              '🤖 Metriche e miglioramento continuo'
            ],
            color: '#4a90e2'
          };
        default:
          return {
            title: 'ARTIFICIAL INTELLIGENCE',
            lines: [
              '🤖 Custom chatbots & assistants',
              '🤖 AI over your own content (RAG)',
              '🤖 Text organization & extraction',
              '🤖 Forecasting & segmentation',
              '🤖 Metrics & continuous improvement'
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
        args={[9, 6.4 * animationRef.current.height, 0.01]}
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
      <Box args={[9.2, 0.1, 0.02]} position={[0, 3.2 * animationRef.current.height, 0]}>
        <meshStandardMaterial
          color={serviceInfo.color}
          emissive={serviceInfo.color}
          emissiveIntensity={animationRef.current.glow * 2}
          transparent
          opacity={animationRef.current.opacity * 0.8}
        />
      </Box>
      <Box args={[9.2, 0.1, 0.02]} position={[0, -3.2 * animationRef.current.height, 0]}>
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
        position={[0, 2.0 * animationRef.current.height, 0]}
        fontSize={0.7 * animationRef.current.scale}
        color={serviceInfo.color}
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
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
      {serviceInfo.lines.map((line, index) => {
        // Check if this line is a continuation (starts with spaces)
        const isContinuation = line.startsWith('   ');

        // Calculate y position considering continuation lines
        let yPosition = 0.8;
        let currentY = 0.8;

        for (let i = 0; i < index; i++) {
          if (serviceInfo.lines[i].startsWith('   ')) {
            // Continuation line - small gap from previous
            currentY -= 0.3;
          } else if (i > 0) {
            // Normal line - regular gap
            currentY -= 0.64;
          }

          if (i === index - 1) {
            yPosition = currentY;
          }
        }

        // Apply final position
        if (index === 0) {
          yPosition = 0.8;
        } else if (isContinuation) {
          yPosition = currentY - 0.3; // Small gap for continuation
        } else {
          yPosition = currentY - 0.64; // Regular gap for new item
        }

        return (
          <Text
            key={index}
            position={[-4.0, yPosition * animationRef.current.height, 0]}
            fontSize={0.36 * animationRef.current.scale}
            color="#ffffff"
            fontWeight={600}
            anchorX="left"
            anchorY="middle"
            fillOpacity={animationRef.current.opacity}
            outlineWidth={0.02}
            outlineColor="#000000"
            maxWidth={7.6}
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
        );
      })}

      {/* Holographic scanlines */}
      <Box
        args={[8.6, 0.04, 0.01]} 
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