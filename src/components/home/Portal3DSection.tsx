import React, { useRef, useContext } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Floating 3D Elements
const FloatingElement: React.FC<{ 
  position: [number, number, number]; 
  type: 'box' | 'sphere' | 'torus';
  color: string;
}> = ({ position, type, color }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.x = time * 0.5;
      ref.current.rotation.y = time * 0.3;
      ref.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
      ref.current.position.x = position[0] + Math.cos(time * 0.5) * 0.1;
    }
  });
  
  const renderShape = () => {
    const material = (
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    );
    
    switch(type) {
      case 'box':
        return <Box ref={ref} args={[0.5, 0.5, 0.5]} position={position}>{material}</Box>;
      case 'sphere':
        return <Sphere ref={ref} args={[0.3, 32, 32]} position={position}>{material}</Sphere>;
      case 'torus':
        return <Torus ref={ref} args={[0.3, 0.1, 16, 100]} position={position}>{material}</Torus>;
    }
  };
  
  return <>{renderShape()}</>;
};

// Floating Text
const FloatingText3D: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.position.z = position[2] + Math.sin(time * 0.5) * 0.3;
      ref.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }
  });
  
  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.4}
      color="#792990"
      fontWeight={900}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {text}
      <meshStandardMaterial
        color="#792990"
        emissive="#792990"
        emissiveIntensity={0.5}
        metalness={0.5}
        roughness={0.3}
      />
    </Text>
  );
};

// Portal Ring
const PortalRing: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.z = time * 0.2;
    }
  });
  
  return (
    <Torus
      ref={ref}
      args={[3, 0.2, 16, 100]}
      position={[0, 0, -2]}
    >
      <meshStandardMaterial
        color="#792990"
        emissive="#792990"
        emissiveIntensity={0.5}
        wireframe
      />
    </Torus>
  );
};

// Particle System
const ParticleSystem: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = React.useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.y = time * 0.1;
      ref.current.position.z = Math.sin(time * 0.3) * 0.5;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffb947"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main Portal Section Component
const Portal3DSection: React.FC = () => {
  const t = useTranslations();
  const { language } = useLanguage();
  
  // Get translated content
  const getContent = () => {
    switch(language) {
      case 'pt-BR':
      case 'pt':
        return {
          title: 'Entre em Nossos Mundos Digitais',
          subtitle: 'Experimente uma forma única e imersiva de conhecer nossos serviços',
          description: 'Desenvolvemos experiências 3D interativas que transformam a maneira como você visualiza soluções digitais',
          showcaseBtn: '🏢 Escritório Virtual 3D',
          showcaseDesc: 'Explore nosso escritório interativo',
          tunnelBtn: '🌀 Túnel Digital',
          tunnelDesc: 'Viaje pelo espaço tecnológico'
        };
      case 'es':
        return {
          title: 'Entra en Nuestros Mundos Digitales',
          subtitle: 'Experimenta una forma única e inmersiva de conocer nuestros servicios',
          description: 'Desarrollamos experiencias 3D interactivas que transforman la forma en que visualizas soluciones digitales',
          showcaseBtn: '🏢 Oficina Virtual 3D',
          showcaseDesc: 'Explora nuestra oficina interactiva',
          tunnelBtn: '🌀 Túnel Digital',
          tunnelDesc: 'Viaja por el espacio tecnológico'
        };
      case 'it':
        return {
          title: 'Entra nei Nostri Mondi Digitali',
          subtitle: 'Sperimenta un modo unico e immersivo per conoscere i nostri servizi',
          description: 'Sviluppiamo esperienze 3D interattive che trasformano il modo in cui visualizzi le soluzioni digitali',
          showcaseBtn: '🏢 Ufficio Virtuale 3D',
          showcaseDesc: 'Esplora il nostro ufficio interattivo',
          tunnelBtn: '🌀 Tunnel Digitale',
          tunnelDesc: 'Viaggia nello spazio tecnologico'
        };
      default:
        return {
          title: 'Enter Our Digital Worlds',
          subtitle: 'Experience a unique and immersive way to discover our services',
          description: 'We develop interactive 3D experiences that transform how you visualize digital solutions',
          showcaseBtn: '🏢 3D Virtual Office',
          showcaseDesc: 'Explore our interactive office',
          tunnelBtn: '🌀 Digital Tunnel',
          tunnelDesc: 'Travel through tech space'
        };
    }
  };
  
  const content = getContent();
  
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-black overflow-hidden mt-32">
      {/* Portal Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 via-purple-800/30 to-purple-600/20 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-800/30 to-blue-600/20 animate-pulse animation-delay-1000" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-r from-yellow-600/20 via-yellow-800/30 to-yellow-600/20 animate-pulse animation-delay-2000" />
        </div>
      </div>
      
      {/* 3D Canvas Portal */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[5, 5, 0]} intensity={0.5} color="#792990" />
          <pointLight position={[-5, -5, 0]} intensity={0.5} color="#ffb947" />
          
          {/* Portal Ring */}
          <PortalRing />
          
          {/* Floating Elements */}
          <FloatingElement position={[-2, 1, 0]} type="box" color="#792990" />
          <FloatingElement position={[2, -1, 0]} type="sphere" color="#ffb947" />
          <FloatingElement position={[0, 2, -1]} type="torus" color="#4a90e2" />
          <FloatingElement position={[-1.5, -1.5, 1]} type="box" color="#350545" />
          <FloatingElement position={[1.5, 1.5, -0.5]} type="sphere" color="#792990" />
          
          {/* Floating Text */}
          <FloatingText3D text="3D" position={[-3, 0, 0]} />
          <FloatingText3D text="WB" position={[3, 0, 0]} />
          
          {/* Particle System */}
          <ParticleSystem />
          
          <fog attach="fog" color="#000000" near={5} far={15} />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
            {content.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            {content.subtitle}
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>
        
        {/* Portal Buttons */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* 3D Showcase Button */}
          <Link href="/3d-showcase">
            <div className="group relative bg-gradient-to-br from-purple-900/50 to-purple-600/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {content.showcaseBtn}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {content.showcaseDesc}
                </p>
                
                <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300">
                  <span className="mr-2">Entrar</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            </div>
          </Link>
          
          {/* Digital Tunnel Button */}
          <Link href="/3d-tunnel">
            <div className="group relative bg-gradient-to-br from-blue-900/50 to-blue-600/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {content.tunnelBtn}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {content.tunnelDesc}
                </p>
                
                <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300">
                  <span className="mr-2">Entrar</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            </div>
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Portal3DSection;