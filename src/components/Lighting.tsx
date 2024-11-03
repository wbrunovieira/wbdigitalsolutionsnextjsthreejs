

import React from 'react';

const Lighting: React.FC = () => {
  return (
    <>
      <hemisphereLight intensity={2.5} groundColor='black' />
      <spotLight
        position={[-10, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={4}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
    </>
  );
};

export default Lighting;
