import React from 'react';
import { Canvas } from '@react-three/fiber';
import ConvergingParticles from './scene/ConvergingParticles';
import EnergyParticles from './scene/EnergyParticles';
import FloatingElement from './scene/FloatingElement';
import VortexPortal from './scene/VortexPortal';

/** The 3D layer of the portal section: vortex rings, floating shapes and particles. */
const PortalScene: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[5, 5, 0]} intensity={0.8} color="#792990" />
      <pointLight position={[-5, -5, 0]} intensity={0.8} color="#ffb947" />
      <pointLight position={[0, -5, 3]} intensity={0.6} color="#350545" />

      <VortexPortal />

      <FloatingElement position={[0, 2.5, -1]} type="torus" color="#792990" delay={2} />
      <FloatingElement position={[2.5, -1.5, 0.5]} type="sphere" color="#ffb947" delay={1} />

      <EnergyParticles />
      <ConvergingParticles />

      <fog attach="fog" color="#000000" near={3} far={12} />
    </Canvas>
  </div>
);

export default PortalScene;
