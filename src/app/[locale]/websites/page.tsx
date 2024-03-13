import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Mesh } from 'three';

const Websites: React.FC = () => {
  return (
    <>
      <section className='bg-[#350545] h-screen'>
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 100,
            position: [1, 1, 6],
          }}
        >
          <Scene />
        </Canvas>
      </section>
    </>
  );
};

const Scene = () => {
  const cubeRef = useRef<Mesh>(null);

  return (
    <>
      <OrbitControls />
      <mesh position-x={1} ref={cubeRef}>
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
        <boxGeometry />
        <meshStandardMaterial color='orange' />
        <Html
          position={[-0.7, 0.5, 0.5]}
          wrapperClass='text'
          distanceFactor={5}
          className='text-white text-xlg'
        >
          WB Sites
        </Html>
      </mesh>
      <mesh position-x={-1}>
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
        <boxGeometry />
        <meshStandardMaterial color='purple' />
      </mesh>
    </>
  );
};

export default Websites;
