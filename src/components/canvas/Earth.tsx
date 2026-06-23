import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import CanvasLoader from '../Loader';
import DragTutorial from '../DragTutorial';

const Earth = ({ isMobile }: { isMobile: boolean }) => {
  const earth = useGLTF('/models/planet/scene.gltf');
  const ref = useRef<THREE.Group>(null);

  // On mobile there is no OrbitControls, so spin the model ourselves.
  // (No-op on desktop — OrbitControls.autoRotate drives the spin there.)
  useFrame((_, delta) => {
    if (isMobile && ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <primitive
      ref={ref}
      object={earth.scene}
      scale={isMobile ? 3.4 : 2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EarthCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 500px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div
      className={`relative w-full ${isMobile ? 'h-[360px]' : 'h-full'}`}
      style={isMobile ? { touchAction: 'pan-y' } : undefined}
    >
      {!isMobile && <DragTutorial />}

      <Canvas
        shadows
        // Continuous frames on mobile so the useFrame autoRotate runs (demand mode
        // would freeze it without OrbitControls calling invalidate()).
        frameloop={isMobile ? 'always' : 'demand'}
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: isMobile ? 50 : 45,
          near: 0.1,
          far: 200,
          position: isMobile ? [0, 0, 16] : [-4, 3, 6],
        }}
        style={
          isMobile
            ? { height: '360px', width: '100%', touchAction: 'pan-y', pointerEvents: 'none' }
            : undefined
        }
        // Override R3F's forced touch-action:none on the actual <canvas> AFTER its
        // event manager runs, and make it transparent to touch so the page scrolls.
        onCreated={({ gl }) => {
          if (isMobile) {
            gl.domElement.style.touchAction = 'pan-y';
            gl.domElement.style.pointerEvents = 'none';
          }
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* OrbitControls ONLY on desktop — on mobile it isn't mounted, so it
              attaches no touch listeners and cannot preventDefault scroll. */}
          {!isMobile && (
            <OrbitControls
              autoRotate
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          )}
          <Earth isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
