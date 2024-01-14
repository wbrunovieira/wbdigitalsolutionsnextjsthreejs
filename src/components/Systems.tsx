import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Plane, OrbitControls } from '@react-three/drei';

const Systems: React.FC = () => {
  return (
    <div className='w-full mt-10'>
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <Plane args={[5, 5, 1, 1]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} />

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Systems;
