
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeDScene: React.FC = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '100vh' }}
      camera={{ position: [0, 0, 75], fov: 75 }}
    >

      <OrbitControls enableZoom={false} />


      <ambientLight intensity={0.5} />


      <pointLight position={[10, 10, 10]} />


      <mesh>
        <boxGeometry args={[12, 12, 12]} />
        <meshStandardMaterial color="#8AC" />
      </mesh>
    </Canvas>
  );
};

export default ThreeDScene;
