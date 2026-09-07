import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import EnhancedParticleField from './enhanced/EnhancedParticleField';
import FloatingValue from './enhanced/FloatingValue';
import HolographicMessage from './enhanced/HolographicMessage';
import PortalMessage from './enhanced/PortalMessage';
import TunnelRing from './enhanced/TunnelRing';
import { getCompanyValues } from './enhanced/tunnelMessages';

interface TunnelSceneEnhancedProps {
  language?: string;
  isMobile?: boolean;
}

const VALUE_COLORS = ['#792990', '#ffb947', '#4a90e2', '#792990'];

const TunnelSceneEnhanced: React.FC<TunnelSceneEnhancedProps> = ({ language = 'en', isMobile = false }) => {
  // Generate tunnel rings - fewer for mobile
  const tunnelRings = useMemo(() => {
    const ringCount = isMobile ? 15 : 25;
    return [...Array(ringCount)].map((_, i) => (
      <TunnelRing key={`ring-${i}`} position={[0, 0, -i * 4]} delay={i * 0.2} />
    ));
  }, [isMobile]);

  const values = getCompanyValues(language);

  return (
    <Canvas
      camera={{
        position: [0, 0, isMobile ? 8 : 5],
        fov: isMobile ? 80 : 75,
      }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? 'low-power' : 'high-performance',
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, -30]} intensity={1} color="#792990" />
      <pointLight position={[10, 10, -50]} intensity={0.8} color="#ffb947" />
      <pointLight position={[-10, -10, -70]} intensity={0.8} color="#4a90e2" />

      {/* Fog for depth */}
      <fog attach="fog" color="#0a0015" near={20} far={120} />

      {tunnelRings}

      <EnhancedParticleField isMobile={isMobile} />

      <PortalMessage language={language} />

      {/* Holographic Messages - Adjusted for mobile */}
      <HolographicMessage
        position={[isMobile ? 4 : 7, 2, -40]}
        language={language}
        serviceType="websites"
        delay={0}
        isMobile={isMobile}
      />
      <HolographicMessage
        position={[isMobile ? -4 : -7, -1, -70]}
        language={language}
        serviceType="automation"
        delay={2}
        isMobile={isMobile}
      />
      {!isMobile && (
        <>
          <HolographicMessage position={[8, -2, -100]} language={language} serviceType="ai" delay={4} />
          <HolographicMessage position={[-6, 3, -130]} language={language} serviceType="websites" delay={6} />
        </>
      )}

      {/* Floating Company Values */}
      {values.map((value, index) => (
        <FloatingValue
          key={value}
          text={value}
          position={[0, 0, -30 - index * 30]}
          color={VALUE_COLORS[index]}
          speed={0.1 + index * 0.02}
        />
      ))}

      {/* WB Logo at the end */}
      <group position={[0, 0, -80]}>
        <Image url="/svg/logo-white.svg" scale={[4, 1.2]} transparent opacity={0.9} />
      </group>
    </Canvas>
  );
};

export default TunnelSceneEnhanced;
