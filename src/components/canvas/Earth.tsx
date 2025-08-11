import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';
import DragTutorial from '../DragTutorial';

const Earth = ({ isMobile }: { isMobile: boolean }) => {
  const earth = useGLTF('/models/planet/scene.gltf');

  return (
    <primitive 
      object={earth.scene} 
      scale={isMobile ? 3 : 2.5} 
      position-y={0} 
      rotation-y={0} 
    />
  );
};
const EarthCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className={`relative w-full ${isMobile ? 'h-[500px]' : 'h-full'} ${isMobile ? 'overflow-visible' : ''}`}>
      {/* Drag tutorial - only shows on desktop */}
      {!isMobile && (
        <DragTutorial />
      )}
      
      <Canvas
        shadows
        frameloop='demand'
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: isMobile ? 60 : 45,
          near: 0.1,
          far: 200,
          position: isMobile ? [-4, 3, 15] : [-4, 3, 6],
        }}
        style={isMobile ? { height: '500px', width: '100%' } : undefined}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth isMobile={isMobile} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;