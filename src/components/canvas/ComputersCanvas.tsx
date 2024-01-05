/* eslint-disable react/no-unknown-property */
import  { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

interface isMobileProps {
  isMobile: boolean;
}

const Computers: React.FC <isMobileProps> = ({ isMobile }) => {


  const computer = useGLTF('/models/desktop/scene.gltf');

  return (
      <mesh>
        <hemisphereLight intensity={2.5} groundColor='black' />
        <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      <primitive
        // eslint-disable-next-line react/no-unknown-property
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.95}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />


      </mesh>
  );
};

const ComputersCanvas = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: Event) => {
      const mediaQueryEvent = event as MediaQueryListEvent;
      setIsMobile(mediaQueryEvent.matches);
  };
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

   
  return (
    <Canvas
      frameloop='demand'
      shadows
      
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};


export default ComputersCanvas;