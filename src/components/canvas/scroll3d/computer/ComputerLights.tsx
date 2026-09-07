import React from 'react';

/** Scene lighting for the home computer. The shadow key is world-fixed so the
 *  model's shadow rakes across the desk as it spins. */
const ComputerLights: React.FC<{ isDesktop: boolean }> = ({ isDesktop }) => (
  <>
    {/* Lower ambient on desktop so the cast shadow has contrast (high fill washes shadows out). */}
    <hemisphereLight intensity={isDesktop ? 1.8 : 2.5} groundColor="black" />
    {/* Key/fill spot — no longer the shadow caster (its narrow cone barely covers the model). */}
    <spotLight position={[-10, 20, 10]} angle={0.12} penumbra={1} intensity={isDesktop ? 4 : 2} />
    {isDesktop && <pointLight intensity={1} />}
    {isDesktop && (
      <directionalLight
        position={[7, 13, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={45}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
    )}
  </>
);

export default ComputerLights;
