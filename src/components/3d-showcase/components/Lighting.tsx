import React from 'react';

/**
 * Lighting setup for the 3D office scene
 * Provides ambient, directional and point lights for realistic illumination
 */
const Lighting: React.FC = () => {
  return (
    <>
      {/* Global ambient light for base illumination */}
      <ambientLight intensity={0.8} />
      
      {/* Main directional light with shadows */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0005}
      />
      
      {/* Ceiling light */}
      <pointLight position={[0, 8, 0]} intensity={2} color="#ffffff" />
      
      {/* Accent lights - moved away from door area */}
      <pointLight position={[-5, 5, -5]} intensity={1} color="#ffb947" />
      <pointLight position={[5, 5, -5]} intensity={1} color="#792990" />
    </>
  );
};

export default Lighting;