import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Box, Sphere, Torus, Cone, Text3D, Center, Image, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Tunnel Ring Component
const TunnelRing: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ref.current) {
      // Move ring towards camera
      ref.current.position.z += 0.15;
      
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
        color="#792990"
        emissive="#792990"
        emissiveIntensity={0.5}
        wireframe
      />
    </Torus>
  );
};

// Floating Element Component
interface FloatingElementProps {
  position: [number, number, number];
  type: 'box' | 'sphere' | 'cone';
  color: string;
  speed: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ position, type, color, speed }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ref.current) {
      // Move element towards camera
      ref.current.position.z += speed;
      
      // Rotate element
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.02;
      
      // Reset position when passed camera
      if (ref.current.position.z > 10) {
        ref.current.position.z = -100;
        // Randomize X and Y position
        ref.current.position.x = (Math.random() - 0.5) * 10;
        ref.current.position.y = (Math.random() - 0.5) * 10;
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
      />
    );
    
    switch(type) {
      case 'box':
        return <Box ref={ref} args={[1, 1, 1]} position={position}>{material}</Box>;
      case 'sphere':
        return <Sphere ref={ref} args={[0.5, 32, 32]} position={position}>{material}</Sphere>;
      case 'cone':
        return <Cone ref={ref} args={[0.5, 1, 32]} position={position}>{material}</Cone>;
      default:
        return null;
    }
  };
  
  return <>{renderShape()}</>;
};

// Particle System
const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = -Math.random() * 100;       // z
    }
    
    return positions;
  }, []);
  
  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.1; // Move particles forward
        
        // Reset particle when it passes camera
        if (positions[i + 2] > 10) {
          positions[i + 2] = -100;
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 1] = (Math.random() - 0.5) * 20;
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
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffb947"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Floating WB Logo
const FloatingLogo: React.FC<{ initialZ: number; speed: number }> = ({ initialZ, speed }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ref.current) {
      // Move logo towards camera
      ref.current.position.z += speed;
      
      // Rotate logo
      ref.current.rotation.z += 0.01;
      ref.current.rotation.y += 0.005;
      
      // Reset position when passed camera
      if (ref.current.position.z > 10) {
        ref.current.position.z = -100;
        ref.current.position.x = (Math.random() - 0.5) * 8;
        ref.current.position.y = (Math.random() - 0.5) * 6;
      }
    }
  });
  
  return (
    <group ref={ref} position={[0, 2, initialZ]}>
      <Image 
        url="/svg/logo-white.svg" 
        scale={[2, 0.6]}
        transparent
        opacity={0.9}
      />
    </group>
  );
};

// Fabric-like Logo with wave effect
const FabricLogo: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/svg/logo-white.svg');
  
  useFrame((state) => {
    if (meshRef.current) {
      // Move towards camera very slowly
      meshRef.current.position.z += 0.03;
      
      // Floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 1;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 2;
      
      // Gentle rotation like a flag
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      
      // Manual wave deformation on vertices
      const positions = meshRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Create realistic fabric wave
        const waveZ = Math.sin(x * 1.5 + time * 2) * 0.2 * (1 - Math.abs(x) / 4) +
                     Math.cos(y * 2 + time * 1.5) * 0.15 * (1 - Math.abs(y) / 1.5);
        
        positions.setZ(i, waveZ);
      }
      positions.needsUpdate = true;
      
      // Reset position when passed camera
      if (meshRef.current.position.z > 10) {
        meshRef.current.position.z = -80;
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 1, -50]}>
      <planeGeometry args={[8, 3, 64, 32]} />
      <meshStandardMaterial
        map={texture}
        color="#ffffff"
        emissive="#792990"
        emissiveIntensity={0.2}
        side={THREE.DoubleSide}
        transparent
        opacity={0.95}
        metalness={0.1}
        roughness={0.7}
      />
    </mesh>
  );
};

// Horizontal Moving Sphere
const HorizontalSphere: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ref.current) {
      // Move sphere from right to left
      ref.current.position.x -= 0.2;
      
      // Reset position when it goes too far left
      if (ref.current.position.x < -15) {
        ref.current.position.x = 15;
        ref.current.position.y = (Math.random() - 0.5) * 8;
        ref.current.position.z = -20 - Math.random() * 60;
      }
      
      // Rotate the sphere
      ref.current.rotation.x += 0.02;
      ref.current.rotation.y += 0.01;
    }
  });
  
  return (
    <Sphere ref={ref} args={[0.8, 32, 32]} position={[15, 0, -30]}>
      <meshStandardMaterial
        color="#ffb947"
        emissive="#ffb947"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </Sphere>
  );
};

// Floating Text
const FloatingText: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.position.z += 0.08;
      ref.current.rotation.y += 0.005;
      
      if (ref.current.position.z > 10) {
        ref.current.position.z = -80;
      }
    }
  });
  
  return (
    <group ref={ref} position={position}>
      <Center>
        <Text3D
          font="/img/assets/fonts/optimer_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial
            color="#792990"
            emissive="#792990"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.4}
          />
        </Text3D>
      </Center>
    </group>
  );
};

// Main Tunnel Scene
const TunnelScene: React.FC = () => {
  // Generate tunnel rings
  const tunnelRings = useMemo(() => {
    const rings = [];
    for (let i = 0; i < 20; i++) {
      rings.push(
        <TunnelRing 
          key={`ring-${i}`} 
          position={[0, 0, -i * 5]} 
        />
      );
    }
    return rings;
  }, []);
  
  // Generate floating elements
  const floatingElements = useMemo(() => {
    const elements = [];
    const types: ('box' | 'sphere' | 'cone')[] = ['box', 'sphere', 'cone'];
    const colors = ['#792990', '#ffb947', '#350545'];
    
    for (let i = 0; i < 15; i++) {
      elements.push(
        <FloatingElement
          key={`element-${i}`}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            -10 - Math.random() * 90
          ]}
          type={types[Math.floor(Math.random() * types.length)]}
          color={colors[Math.floor(Math.random() * colors.length)]}
          speed={0.1 + Math.random() * 0.05}
        />
      );
    }
    return elements;
  }, []);
  
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, -20]} intensity={0.5} color="#792990" />
      
      {/* Fog for depth */}
      <fog attach="fog" color="#000000" near={10} far={100} />
      
      {/* Tunnel Rings */}
      {tunnelRings}
      
      {/* Floating Elements */}
      {floatingElements}
      
      {/* Particle Field */}
      <ParticleField />
      
      {/* Horizontal Moving Sphere */}
      <HorizontalSphere />
      
      {/* Floating WB Logos */}
      <FloatingLogo initialZ={-30} speed={0.12} />
      <FloatingLogo initialZ={-60} speed={0.10} />
      <FloatingLogo initialZ={-90} speed={0.14} />
      
      {/* Fabric-like Logo */}
      <FabricLogo />
      
      {/* Floating Text */}
      <FloatingText text="WB DIGITAL" position={[0, 3, -50]} />
      <FloatingText text="INNOVATION" position={[-3, -2, -70]} />
      <FloatingText text="TECHNOLOGY" position={[3, 1, -90]} />
    </Canvas>
  );
};

export default TunnelScene;