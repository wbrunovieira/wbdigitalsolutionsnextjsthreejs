import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Floating 3D Elements with GSAP influence
const FloatingElement: React.FC<{ 
  position: [number, number, number]; 
  type: 'box' | 'sphere' | 'torus';
  color: string;
  delay: number;
}> = ({ position, type, color, delay }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.x = time * 0.5 + delay;
      ref.current.rotation.y = time * 0.3 + delay;
      ref.current.position.y = position[1] + Math.sin(time + position[0] + delay) * 0.3;
      ref.current.position.x = position[0] + Math.cos(time * 0.5 + delay) * 0.2;
      ref.current.position.z = position[2] + Math.sin(time * 0.7 + delay) * 0.4;
    }
  });
  
  const renderShape = () => {
    const material = (
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    );
    
    switch(type) {
      case 'box':
        return <Box ref={ref} args={[0.6, 0.6, 0.6]} position={position}>{material}</Box>;
      case 'sphere':
        return <Sphere ref={ref} args={[0.4, 32, 32]} position={position}>{material}</Sphere>;
      case 'torus':
        return <Torus ref={ref} args={[0.4, 0.15, 16, 100]} position={position}>{material}</Torus>;
    }
  };
  
  return <>{renderShape()}</>;
};

// Vortex Portal Effect
const VortexPortal: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.z = time * 0.3;
    }
  });
  
  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <Torus
          key={i}
          args={[2 + i * 0.5, 0.1, 16, 100]}
          position={[0, 0.5, -2 - i * 0.8]}
        >
          <meshStandardMaterial
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.5 - i * 0.1}
            wireframe
            transparent
            opacity={1 - i * 0.2}
          />
        </Torus>
      ))}
    </group>
  );
};

// Energy Particles
const EnergyParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = React.useMemo(() => {
    const count = 70;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 * 3;
      const radius = 0.5 + (i / count) * 3;
      const height = (Math.random() - 0.5) * 6;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 2;
      
      // Gradient colors
      const color = new THREE.Color();
      color.setHSL(0.8 + (i / count) * 0.2, 0.9, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.y = time * 0.2;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const angle = time + (i / 3) * 0.1;
        const radius = 0.5 + ((i / 3) / (positions.length / 3)) * 3;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 2] = Math.sin(angle) * radius - 2;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Converging Particles - Being pulled into the portal
const ConvergingParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array>();
  
  const particles = React.useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Start particles at edges of screen
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 3;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Velocity towards center
      velocities[i * 3] = -positions[i * 3] * 0.02;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = -positions[i * 3 + 2] * 0.02;
      
      // Purple to yellow gradient
      const t = i / count;
      const color = new THREE.Color();
      if (t < 0.5) {
        color.lerpColors(new THREE.Color('#792990'), new THREE.Color('#ffb947'), t * 2);
      } else {
        color.lerpColors(new THREE.Color('#ffb947'), new THREE.Color('#350545'), (t - 0.5) * 2);
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    velocitiesRef.current = velocities;
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (ref.current && velocitiesRef.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const velocities = velocitiesRef.current;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Move towards center
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Check if reached center, reset to edge
        const distance = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2);
        if (distance < 0.5) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 5 + Math.random() * 3;
          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = (Math.random() - 0.5) * 8;
          positions[i + 2] = Math.sin(angle) * radius;
          
          // Update velocity
          velocities[i] = -positions[i] * 0.02;
          velocities[i + 1] = 0;
          velocities[i + 2] = -positions[i + 2] * 0.02;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main Portal Section with GSAP
const Portal3DSectionGSAP: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const portalBgRef = useRef<HTMLDivElement>(null);
  const topGlowRef = useRef<HTMLDivElement>(null);
  const bottomGlowRef = useRef<HTMLDivElement>(null);
  
  // Try to get language from localStorage and listen for changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // The key is "language" not "preferredLanguage"
      const storedLang = localStorage.getItem('language') || 'en';
      setLanguage(storedLang);
      
      // Listen for storage changes (when language changes in other components)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'language' && e.newValue) {
          setLanguage(e.newValue);
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      // Also check periodically for changes (for same-tab updates)
      const interval = setInterval(() => {
        const currentLang = localStorage.getItem('language') || 'en';
        if (currentLang !== language) {
          setLanguage(currentLang);
        }
      }, 1000);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [language]);
  
  // GSAP Animations with useGSAP hook
  useGSAP(() => {
    if (typeof window === 'undefined') return;
    
    // Portal background animation
    gsap.to(portalBgRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
    // Pulsating energy borders
    const glowTimeline = gsap.timeline({ repeat: -1 });
    glowTimeline
      .to([topGlowRef.current, bottomGlowRef.current], {
        opacity: 0.3,
        duration: 2,
        ease: "power2.inOut"
      })
      .to([topGlowRef.current, bottomGlowRef.current], {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut"
      });
    
    // Energy flow animation
    gsap.to(topGlowRef.current, {
      backgroundPosition: "200% 0",
      duration: 3,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(bottomGlowRef.current, {
      backgroundPosition: "-200% 0",
      duration: 3,
      repeat: -1,
      ease: "none"
    });
    
    // Title animation
    gsap.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Cards stagger animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.portal-card');
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotateY: -30
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Portal vortex effect on scroll
    gsap.to(portalBgRef.current, {
      scale: 1.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
  }, { scope: sectionRef }); // Scope animations to this component
  
  // Get translated content
  const getContent = () => {
    // Handle both 'pt' and 'pt-BR'
    const lang = language === 'pt-BR' ? 'pt' : language;
    
    switch(lang) {
      case 'pt':
        return {
          title: 'Portal para o Futuro Digital',
          subtitle: 'Mergulhe em experiências 3D revolucionárias',
          description: 'Tecnologia de ponta que transforma sua visão em realidade digital imersiva',
          showcaseBtn: 'Escritório Virtual 3D',
          showcaseDesc: 'Explore nosso espaço interativo com hologramas e animações',
          tunnelBtn: 'Túnel Hiperespacial',
          tunnelDesc: 'Viaje através de dimensões tecnológicas infinitas',
          enterText: 'ENTRAR',
          featuresTitle: 'Experiências Únicas'
        };
      case 'es':
        return {
          title: 'Portal al Futuro Digital',
          subtitle: 'Sumérgete en experiencias 3D revolucionarias',
          description: 'Tecnología de vanguardia que transforma tu visión en realidad digital inmersiva',
          showcaseBtn: 'Oficina Virtual 3D',
          showcaseDesc: 'Explora nuestro espacio interactivo con hologramas y animaciones',
          tunnelBtn: 'Túnel Hiperespacial',
          tunnelDesc: 'Viaja a través de dimensiones tecnológicas infinitas',
          enterText: 'ENTRAR',
          featuresTitle: 'Experiencias Únicas'
        };
      case 'it':
        return {
          title: 'Portale verso il Futuro Digitale',
          subtitle: 'Immergiti in esperienze 3D rivoluzionarie',
          description: 'Tecnologia all\'avanguardia che trasforma la tua visione in realtà digitale immersiva',
          showcaseBtn: 'Ufficio Virtuale 3D',
          showcaseDesc: 'Esplora il nostro spazio interattivo con ologrammi e animazioni',
          tunnelBtn: 'Tunnel Iperspaziale',
          tunnelDesc: 'Viaggia attraverso dimensioni tecnologiche infinite',
          enterText: 'ENTRA',
          featuresTitle: 'Esperienze Uniche'
        };
      default:
        return {
          title: 'Portal to the Digital Future',
          subtitle: 'Dive into revolutionary 3D experiences',
          description: 'Cutting-edge technology that transforms your vision into immersive digital reality',
          showcaseBtn: '3D Virtual Office',
          showcaseDesc: 'Explore our interactive space with holograms and animations',
          tunnelBtn: 'Hyperspace Tunnel',
          tunnelDesc: 'Travel through infinite technological dimensions',
          enterText: 'ENTER',
          featuresTitle: 'Unique Experiences'
        };
    }
  };
  
  const content = getContent();
  
  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Deep Shadow Edges with Warping Effect - Creating hole effect */}
      <div className="absolute inset-x-0 top-0 h-48 z-10 pointer-events-none">
        {/* Multiple shadow layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent blur-2xl" />
        
        {/* Glowing energy line */}
        <div ref={topGlowRef} className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80" 
             style={{ filter: 'blur(4px)' }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        
        {/* Distortion waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-purple-900/20 via-transparent to-transparent animate-pulse" />
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-48 z-20 pointer-events-none">
        {/* Multiple shadow layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent blur-md" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent blur-2xl" />
        
        {/* Glowing energy line */}
        <div ref={bottomGlowRef} className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-80" 
             style={{ filter: 'blur(4px)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        

        
        {/* Distortion waves */}
        <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-yellow-900/20 via-transparent to-transparent animate-pulse" />
        </div>
      </div>
      
      {/* Warping Distortion Effect - SVG Filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="portal-warp">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="30" />
          </filter>
        </defs>
      </svg>
      
      {/* Inner Shadow for depth */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 60px 120px -10px rgba(0, 0, 0, 0.9),
            inset 0 -60px 120px -10px rgba(0, 0, 0, 0.9),
            inset 0 30px 60px -5px rgba(121, 41, 144, 0.3),
            inset 0 -30px 60px -5px rgba(255, 185, 71, 0.3)
          `
        }}
      />
      
      {/* Animated Portal Background - More subtle and in the back */}
      <div className="absolute inset-0">
        <div ref={portalBgRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-900/20 via-transparent to-purple-900/20" />
          <div className="absolute inset-20 rounded-full bg-gradient-to-r from-purple-600/15 via-transparent to-purple-600/15" />
          <div className="absolute inset-40 rounded-full bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10" />
        </div>
      </div>
      
      {/* 3D Canvas Portal */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[5, 5, 0]} intensity={0.8} color="#792990" />
          <pointLight position={[-5, -5, 0]} intensity={0.8} color="#ffb947" />
          <pointLight position={[0, -5, 3]} intensity={0.6} color="#350545" />
          
          {/* Vortex Portal */}
          <VortexPortal />
          
          {/* Floating Elements - Torus and Sphere */}
          <FloatingElement position={[0, 2.5, -1]} type="torus" color="#792990" delay={2} />
          <FloatingElement position={[2.5, -1.5, 0.5]} type="sphere" color="#ffb947" delay={1} />
          
          {/* Energy Particles */}
          <EnergyParticles />
          
          {/* Converging Particles */}
          <ConvergingParticles />
          
          <fog attach="fog" color="#000000" near={3} far={12} />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        {/* Title Section */}
        <div className="text-center mb-16 max-w-4xl" style={{ marginTop: '-400px', position: 'relative', zIndex: 30 }}>
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 5s ease infinite'
            }}
          >
            {content.title}
          </h2>
          <p ref={subtitleRef} className="text-xl md:text-3xl text-gray-300 mb-4 font-light">
            {content.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>
        
        {/* Portal Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-5xl w-full" style={{ perspective: '1000px' }}>
          {/* 3D Showcase Card */}
          <Link href="/3d-showcase">
            <div className="portal-card group relative bg-gradient-to-br from-purple-900/20 to-purple-600/10 backdrop-blur-md rounded-3xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 cursor-pointer transform-gpu hover:shadow-[0_0_50px_rgba(147,51,234,0.5)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  🏢
                </div>
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {content.showcaseBtn}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-6">
                  {content.showcaseDesc}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold text-lg group-hover:text-purple-300">
                    {content.enterText}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 flex items-center justify-center transition-all duration-300 group-hover:translate-x-2">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500" />
            </div>
          </Link>
          
          {/* Digital Tunnel Card */}
          <Link href="/3d-tunnel">
            <div className="portal-card group relative bg-gradient-to-br from-yellow-900/20 to-yellow-600/10 backdrop-blur-md rounded-3xl p-8 border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-500 cursor-pointer transform-gpu hover:shadow-[0_0_50px_rgba(255,185,71,0.5)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-180">
                  🌀
                </div>
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                  {content.tunnelBtn}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-6">
                  {content.tunnelDesc}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-bold text-lg group-hover:text-yellow-300">
                    {content.enterText}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/40 flex items-center justify-center transition-all duration-300 group-hover:translate-x-2">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500" />
            </div>
          </Link>
        </div>
      </div>
      
      {/* CSS for gradient and float animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0) rotate(45deg) scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-20px) rotate(225deg) scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes float-medium {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg) scale(1.3);
            opacity: 0.7;
          }
        }
        
        @keyframes float-fast {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-40px) scale(1.4);
            opacity: 0.9;
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Portal3DSectionGSAP;