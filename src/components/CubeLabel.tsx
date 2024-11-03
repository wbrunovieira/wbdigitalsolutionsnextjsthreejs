
import React from 'react';
import { Html } from '@react-three/drei';

interface CubeLabelProps {
  text: string;
}

const CubeLabel: React.FC<CubeLabelProps> = ({ text }) => {
  return (
    <Html
      position={[-0.7, 0.5, 0.5]}
      wrapperClass='text'
      distanceFactor={5}
      className='text-white text-xl'
    >
      {text}
    </Html>
  );
};

export default CubeLabel;
