import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, Text, Image, Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface TunnelSceneEnhancedProps {
  language?: string;
}

// Enhanced Tunnel Ring with pulsing effect
const TunnelRing: React.FC<{ position: [number, number, number]; delay: number }> = ({ position, delay }) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Move ring towards camera
      ref.current.position.z += 0.15;
      
      // Pulsing effect
      const time = state.clock.getElapsedTime();
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 0.5 + Math.sin(time * 2 + delay) * 0.3;
      }
      
      // Reset position when passed camera
      if (ref.current.position.z > 10) {
        ref.current.position.z = -100;
      }
    }
  });
  
  return (
    <Torus
      ref={ref}
      args={[5, 0.3, 16, 100]}
      position={position}
    >
      <meshStandardMaterial
        ref={materialRef}
        color="#792990"
        emissive="#792990"
        emissiveIntensity={0.5}
        wireframe
      />
    </Torus>
  );
};

// Holographic Message Display
interface HolographicMessageProps {
  position: [number, number, number];
  language: string;
  serviceType: 'websites' | 'automation' | 'ai';
  delay: number;
}

const HolographicMessage: React.FC<HolographicMessageProps> = ({ position, language, serviceType, delay }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(0);
  
  const getMessage = () => {
    switch(serviceType) {
      case 'websites':
        switch(language) {
          case 'pt-BR':
          case 'pt':
            return {
              title: 'SITES MODERNOS',
              subtitle: 'Experiências Digitais Únicas',
              features: ['React & Next.js', '3D & Animações', 'AWS Cloud'],
              color: '#792990'
            };
          case 'es':
            return {
              title: 'SITIOS MODERNOS',
              subtitle: 'Experiencias Digitales Únicas',
              features: ['React y Next.js', '3D y Animaciones', 'AWS Cloud'],
              color: '#792990'
            };
          case 'it':
            return {
              title: 'SITI MODERNI',
              subtitle: 'Esperienze Digitali Uniche',
              features: ['React e Next.js', '3D e Animazioni', 'AWS Cloud'],
              color: '#792990'
            };
          default:
            return {
              title: 'MODERN WEBSITES',
              subtitle: 'Unique Digital Experiences',
              features: ['React & Next.js', '3D & Animations', 'AWS Cloud'],
              color: '#792990'
            };
        }
      case 'automation':
        switch(language) {
          case 'pt-BR':
          case 'pt':
            return {
              title: 'AUTOMAÇÃO INTELIGENTE',
              subtitle: 'Eficiência Sem Limites',
              features: ['Zero Erros', 'Integração Total', '24/7 Operação'],
              color: '#ffb947'
            };
          case 'es':
            return {
              title: 'AUTOMATIZACIÓN INTELIGENTE',
              subtitle: 'Eficiencia Sin Límites',
              features: ['Cero Errores', 'Integración Total', '24/7 Operación'],
              color: '#ffb947'
            };
          case 'it':
            return {
              title: 'AUTOMAZIONE INTELLIGENTE',
              subtitle: 'Efficienza Senza Limiti',
              features: ['Zero Errori', 'Integrazione Totale', '24/7 Operazione'],
              color: '#ffb947'
            };
          default:
            return {
              title: 'SMART AUTOMATION',
              subtitle: 'Limitless Efficiency',
              features: ['Zero Errors', 'Full Integration', '24/7 Operation'],
              color: '#ffb947'
            };
        }
      case 'ai':
        switch(language) {
          case 'pt-BR':
          case 'pt':
            return {
              title: 'INTELIGÊNCIA ARTIFICIAL',
              subtitle: 'O Futuro é Agora',
              features: ['Machine Learning', 'Análise Preditiva', 'IA Personalizada'],
              color: '#4a90e2'
            };
          case 'es':
            return {
              title: 'INTELIGENCIA ARTIFICIAL',
              subtitle: 'El Futuro es Ahora',
              features: ['Machine Learning', 'Análisis Predictivo', 'IA Personalizada'],
              color: '#4a90e2'
            };
          case 'it':
            return {
              title: 'INTELLIGENZA ARTIFICIALE',
              subtitle: 'Il Futuro è Ora',
              features: ['Machine Learning', 'Analisi Predittiva', 'IA Personalizzata'],
              color: '#4a90e2'
            };
          default:
            return {
              title: 'ARTIFICIAL INTELLIGENCE',
              subtitle: 'The Future is Now',
              features: ['Machine Learning', 'Predictive Analytics', 'Custom AI'],
              color: '#4a90e2'
            };
        }
    }
  };
  
  const message = getMessage();
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Move towards camera
      groupRef.current.position.z += 0.08;
      
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(time + delay) * 0.3;
      groupRef.current.rotation.y = Math.sin(time * 0.5 + delay) * 0.1;
      
      // Fade in/out based on distance
      const distance = Math.abs(groupRef.current.position.z);
      if (distance < 30) {
        setOpacity(Math.min(1, (30 - distance) / 10));
      } else if (distance > 70) {
        setOpacity(Math.max(0, (100 - distance) / 30));
      } else {
        setOpacity(1);
      }
      
      // Reset position
      if (groupRef.current.position.z > 10) {
        groupRef.current.position.z = -150;
        groupRef.current.position.x = position[0] + (Math.random() - 0.5) * 4;
      }
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {/* Holographic Frame */}
      <Box args={[6, 3, 0.01]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color={message.color}
          emissive={message.color}
          emissiveIntensity={0.2}
          transparent
          opacity={opacity * 0.1}
        />
      </Box>
      
      {/* Title */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.5}
        color={message.color}
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {message.title}
        <meshStandardMaterial
          color={message.color}
          emissive={message.color}
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </Text>
      
      {/* Subtitle */}
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.25}
        color="#ffffff"
        fontWeight={600}
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity * 0.8}
      >
        {message.subtitle}
      </Text>
      
      {/* Features */}
      {message.features.map((feature, index) => (
        <Text
          key={index}
          position={[0, -0.3 - index * 0.3, 0]}
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={opacity * 0.7}
        >
          ▸ {feature}
        </Text>
      ))}
    </group>
  );
};

// Interactive Portal Message
interface PortalMessageProps {
  language: string;
}

const PortalMessage: React.FC<PortalMessageProps> = ({ language }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const messages = useMemo(() => {
    switch(language) {
      case 'pt-BR':
      case 'pt':
        return [
          'BEM-VINDO AO FUTURO',
          'TRANSFORMANDO IDEIAS',
          'EM REALIDADE DIGITAL',
          'INOVAÇÃO CONSTANTE'
        ];
      case 'es':
        return [
          'BIENVENIDO AL FUTURO',
          'TRANSFORMANDO IDEAS',
          'EN REALIDAD DIGITAL',
          'INNOVACIÓN CONSTANTE'
        ];
      case 'it':
        return [
          'BENVENUTO NEL FUTURO',
          'TRASFORMANDO IDEE',
          'IN REALTÀ DIGITALE',
          'INNOVAZIONE COSTANTE'
        ];
      default:
        return [
          'WELCOME TO THE FUTURE',
          'TRANSFORMING IDEAS',
          'INTO DIGITAL REALITY',
          'CONSTANT INNOVATION'
        ];
    }
  }, [language]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
      groupRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      <Text
        fontSize={0.8}
        color="#ffffff"
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#792990"
      >
        {messages[currentIndex]}
        <meshStandardMaterial
          color="#ffffff"
          emissive="#792990"
          emissiveIntensity={0.3}
        />
      </Text>
    </group>
  );
};

// Floating Company Values
interface FloatingValueProps {
  text: string;
  position: [number, number, number];
  color: string;
  speed: number;
}

const FloatingValue: React.FC<FloatingValueProps> = ({ text, position, color, speed }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Move towards camera
      ref.current.position.z += speed;
      
      // Spiral motion
      const radius = 3;
      ref.current.position.x = position[0] + Math.cos(time + ref.current.position.z * 0.1) * radius;
      ref.current.position.y = position[1] + Math.sin(time + ref.current.position.z * 0.1) * radius;
      
      // Rotation
      ref.current.rotation.y += 0.02;
      ref.current.rotation.x = Math.sin(time) * 0.1;
      
      // Reset
      if (ref.current.position.z > 10) {
        ref.current.position.z = -120;
      }
    }
  });
  
  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.4}
        color={color}
        fontWeight={700}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.3}
        />
      </Text>
    </group>
  );
};

// Enhanced Particle Field with gradient colors
const EnhancedParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = -Math.random() * 150;
      
      // Gradient colors
      const color = new THREE.Color();
      color.setHSL(0.8 + Math.random() * 0.2, 0.8, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.15;
        
        if (positions[i + 2] > 10) {
          positions[i + 2] = -150;
          positions[i] = (Math.random() - 0.5) * 30;
          positions[i + 1] = (Math.random() - 0.5) * 30;
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.z += 0.0005;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main Enhanced Tunnel Scene
const TunnelSceneEnhanced: React.FC<TunnelSceneEnhancedProps> = ({ language = 'en' }) => {
  // Generate tunnel rings
  const tunnelRings = useMemo(() => {
    const rings = [];
    for (let i = 0; i < 25; i++) {
      rings.push(
        <TunnelRing 
          key={`ring-${i}`} 
          position={[0, 0, -i * 4]} 
          delay={i * 0.2}
        />
      );
    }
    return rings;
  }, []);
  
  // Company values based on language
  const getValues = () => {
    switch(language) {
      case 'pt-BR':
      case 'pt':
        return ['INOVAÇÃO', 'QUALIDADE', 'PARCERIA', 'RESULTADOS'];
      case 'es':
        return ['INNOVACIÓN', 'CALIDAD', 'ASOCIACIÓN', 'RESULTADOS'];
      case 'it':
        return ['INNOVAZIONE', 'QUALITÀ', 'PARTNERSHIP', 'RISULTATI'];
      default:
        return ['INNOVATION', 'QUALITY', 'PARTNERSHIP', 'RESULTS'];
    }
  };
  
  const values = getValues();
  
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, -30]} intensity={1} color="#792990" />
      <pointLight position={[10, 10, -50]} intensity={0.8} color="#ffb947" />
      <pointLight position={[-10, -10, -70]} intensity={0.8} color="#4a90e2" />
      
      {/* Fog for depth */}
      <fog attach="fog" color="#0a0015" near={20} far={120} />
      
      {/* Tunnel Rings */}
      {tunnelRings}
      
      {/* Enhanced Particle Field */}
      <EnhancedParticleField />
      
      {/* Portal Message */}
      <PortalMessage language={language} />
      
      {/* Holographic Messages */}
      <HolographicMessage 
        position={[7, 2, -40]} 
        language={language} 
        serviceType="websites"
        delay={0}
      />
      <HolographicMessage 
        position={[-7, -1, -70]} 
        language={language} 
        serviceType="automation"
        delay={2}
      />
      <HolographicMessage 
        position={[8, -2, -100]} 
        language={language} 
        serviceType="ai"
        delay={4}
      />
      <HolographicMessage 
        position={[-6, 3, -130]} 
        language={language} 
        serviceType="websites"
        delay={6}
      />
      
      {/* Floating Company Values */}
      {values.map((value, index) => (
        <FloatingValue
          key={value}
          text={value}
          position={[0, 0, -30 - index * 30]}
          color={['#792990', '#ffb947', '#4a90e2', '#792990'][index]}
          speed={0.1 + index * 0.02}
        />
      ))}
      
      {/* WB Logo at the end */}
      <group position={[0, 0, -80]}>
        <Image 
          url="/svg/logo-white.svg" 
          scale={[4, 1.2]}
          transparent
          opacity={0.9}
        />
      </group>
    </Canvas>
  );
};

export default TunnelSceneEnhanced;