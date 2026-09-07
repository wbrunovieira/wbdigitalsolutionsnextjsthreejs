import React, { ReactNode, RefObject, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { RectAreaLight, Vector3 } from 'three';
import CanvasErrorBoundary from '../../CanvasErrorBoundary';
import CustomLoader from './CustomLoader';

interface ScrollHeroCanvasProps {
  isDesktop: boolean;
  lightRef: RefObject<RectAreaLight>;
  children: ReactNode;
}

/**
 * The persistent hero canvas shared by the scroll-driven 3D heroes.
 *
 * z-[1]: behind the page content (main is z-10), so the model passes BEHIND the
 * opaque sections as it descends, but above the fixed gradient backdrop (z-0)
 * so it stays visible through the hero.
 */
const ScrollHeroCanvas: React.FC<ScrollHeroCanvasProps> = ({ isDesktop, lightRef, children }) => (
  <div className="fixed inset-0 z-[1]" style={{ pointerEvents: 'none' }} aria-hidden="true">
    <CanvasErrorBoundary>
      <Canvas
        style={{ background: 'transparent', pointerEvents: 'none' }}
        shadows={isDesktop}
        dpr={isDesktop ? [1, 2] : 1}
        gl={{ alpha: true, antialias: isDesktop, preserveDrawingBuffer: false }}
        camera={{ fov: 50, position: new Vector3(0, 0, 100) }}
      >
        <Suspense fallback={<CustomLoader />}>
          <primitive
            ref={lightRef}
            object={new RectAreaLight(0xffffff, 10, 15, 15)}
            position={[5, 5, 5]}
            intensity={5}
          />
          <ambientLight intensity={0.6} color={0xffffff} />
          <directionalLight position={[10, 10, 10]} intensity={0.6} />
          {children}
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  </div>
);

export default ScrollHeroCanvas;
