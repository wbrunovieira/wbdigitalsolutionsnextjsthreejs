import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere, Torus, Cone, Text3D, Center, Image } from '@react-three/drei';
import { useScroll, ScrollControls, Scroll } from '@react-three/drei';
import * as THREE from 'three';

// Floating Element that moves based on scroll
const ScrollElement: React.FC<{
  position: [number, number, number];
  type: 'box' | 'sphere' | 'cone' | 'torus';
  color: string;
  scrollOffset: number;
}> = ({ position, type, color, scrollOffset }) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  useFrame(() => {
    if (ref.current && scroll) {
      const scrollProgress = scroll.offset;
      
      // Move element based on scroll
      ref.current.position.z = position[2] + scrollProgress * 50 - scrollOffset * 10;
      
      // Rotate based on scroll
      ref.current.rotation.x = scrollProgress * Math.PI * 2;
      ref.current.rotation.y = scrollProgress * Math.PI;
      
      // Scale based on distance
      const distance = Math.abs(ref.current.position.z);
      const scale = Math.max(0.1, 1 - distance * 0.02);
      ref.current.scale.setScalar(scale);
      
      // Fade based on distance
      if (ref.current.children[0]) {
        const mesh = ref.current.children[0] as THREE.Mesh;
        if (mesh.material && 'opacity' in mesh.material) {
          (mesh.material as any).opacity = Math.max(0, 1 - distance * 0.01);
        }
      }
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
        opacity={1}
      />
    );
    
    switch(type) {
      case 'box':
        return <Box args={[1, 1, 1]}>{material}</Box>;
      case 'sphere':
        return <Sphere args={[0.5, 32, 32]}>{material}</Sphere>;
      case 'cone':
        return <Cone args={[0.5, 1, 32]}>{material}</Cone>;
      case 'torus':
        return <Torus args={[0.5, 0.2, 16, 100]}>{material}</Torus>;
      default:
        return null;
    }
  };
  
  return (
    <group ref={ref} position={position}>
      {renderShape()}
    </group>
  );
};

// Text that appears at different scroll positions
const ScrollText: React.FC<{
  text: string;
  position: [number, number, number];
  scrollTrigger: number;
  color: string;
}> = ({ text, position, scrollTrigger, color }) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  useFrame(() => {
    if (ref.current && scroll) {
      const scrollProgress = scroll.offset;
      
      // Appear/disappear based on scroll position
      const distance = Math.abs(scrollProgress - scrollTrigger);
      const opacity = Math.max(0, 1 - distance * 4);
      
      // Move with scroll
      ref.current.position.z = position[2] + (scrollProgress - scrollTrigger) * 20;
      
      // Scale based on visibility
      ref.current.scale.setScalar(opacity);
      
      // Floating animation
      ref.current.position.y = position[1] + Math.sin(scrollProgress * 10) * 0.2;
    }
  });
  
  return (
    <group ref={ref} position={position}>
      <Center>
        <Text3D
          font="/img/assets/fonts/optimer_regular.typeface.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.4}
          />
        </Text3D>
      </Center>
    </group>
  );
};

// WB Logo that scales with scroll
const ScrollLogo: React.FC<{ scrollTrigger: number }> = ({ scrollTrigger }) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  useFrame(() => {
    if (ref.current && scroll) {
      const scrollProgress = scroll.offset;
      
      // Calculate distance from trigger point
      const distance = Math.abs(scrollProgress - scrollTrigger);
      
      // Scale based on scroll
      const scale = Math.max(0.1, Math.min(3, 1 + (1 - distance) * 2));
      ref.current.scale.setScalar(scale);
      
      // Rotate continuously
      ref.current.rotation.z = scrollProgress * Math.PI * 2;
      
      // Position based on scroll
      ref.current.position.z = -5 + (scrollProgress - scrollTrigger) * 10;
      
      // Opacity based on distance
      const opacity = Math.max(0, 1 - distance * 2);
      if (ref.current.children[0]) {
        const image = ref.current.children[0] as any;
        if (image.material) {
          image.material.opacity = opacity;
        }
      }
    }
  });
  
  return (
    <group ref={ref} position={[0, 0, -5]}>
      <Image 
        url="/svg/logo-white.svg" 
        scale={[2, 0.6]}
        transparent
        opacity={1}
      />
    </group>
  );
};

// Main scene content
const SceneContent: React.FC = () => {
  const { camera } = useThree();
  const scroll = useScroll();
  
  useFrame(() => {
    if (scroll) {
      // Camera moves forward as you scroll
      camera.position.z = 5 - scroll.offset * 30;
    }
  });
  
  // Generate elements
  const elements = useMemo(() => {
    const items = [];
    const types: ('box' | 'sphere' | 'cone' | 'torus')[] = ['box', 'sphere', 'cone', 'torus'];
    const colors = ['#792990', '#ffb947', '#350545'];
    
    for (let i = 0; i < 20; i++) {
      items.push(
        <ScrollElement
          key={`element-${i}`}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            -i * 3
          ]}
          type={types[Math.floor(Math.random() * types.length)]}
          color={colors[Math.floor(Math.random() * colors.length)]}
          scrollOffset={i * 0.05}
        />
      );
    }
    return items;
  }, []);
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, -10]} intensity={0.5} color="#792990" />
      
      {/* Fog for depth */}
      <fog attach="fog" color="#000000" near={5} far={50} />
      
      {/* Elements */}
      {elements}
      
      {/* Text at different scroll positions */}
      <ScrollText 
        text="WELCOME" 
        position={[0, 3, -5]} 
        scrollTrigger={0.1} 
        color="#792990"
      />
      <ScrollText 
        text="INNOVATION" 
        position={[0, 2, -10]} 
        scrollTrigger={0.3} 
        color="#ffb947"
      />
      <ScrollText 
        text="TECHNOLOGY" 
        position={[0, 1, -15]} 
        scrollTrigger={0.5} 
        color="#792990"
      />
      <ScrollText 
        text="FUTURE" 
        position={[0, 0, -20]} 
        scrollTrigger={0.7} 
        color="#ffb947"
      />
      <ScrollText 
        text="WB DIGITAL" 
        position={[0, -1, -25]} 
        scrollTrigger={0.9} 
        color="#792990"
      />
      
      {/* Logos at different points */}
      <ScrollLogo scrollTrigger={0.2} />
      <ScrollLogo scrollTrigger={0.6} />
      <ScrollLogo scrollTrigger={0.95} />
    </>
  );
};

// Main Scroll Scene Component
const ScrollScene: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        <ScrollControls pages={3} damping={0.25}>
          <SceneContent />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default ScrollScene;