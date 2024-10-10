import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Mesh } from 'three';

const SceneContent = () => {
  const cubeRef = useRef<Mesh>(null);

  return (
    <>
      <OrbitControls />

      {/* Chão */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      {/* Parede da direita */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 0, 0]}>
        <boxGeometry args={[10, 2, 0.5]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      {/* Parede de trás */}
      <mesh position={[0, 0, 5]}>
        <boxGeometry args={[10, 2, 0.5]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      {/* Parede da esquerda */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 0, 0]}>
        <boxGeometry args={[10, 2, 0.5]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      {/* Cubo com luzes e HTML */}
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

        <Html position={[-0.7, 0.5, 0.5]} wrapperClass='text' distanceFactor={5} className='text-white text-xlg'>
          Intêligencia
        </Html>
      </mesh>

      {/* Outro Cubo */}
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

const Scene = () => {
  
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Canvas>
      <SceneContent />
    </Canvas>
  );
};

export default Scene;
