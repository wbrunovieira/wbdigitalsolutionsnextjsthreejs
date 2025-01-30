import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";


import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import { PreloadedCanvas } from "../PreloadedCanvas";

interface isMobileProps {
    isMobile: boolean;
}

const Computers: React.FC<isMobileProps> = ({ isMobile }) => {
    const computer = useGLTF("/models/desktop/scene.gltf");

      useEffect(() => {

    computer.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry.computeBoundingBox();
      }
    });


    const box = new THREE.Box3().setFromObject(computer.scene);
    const center = box.getCenter(new THREE.Vector3());

    // Move a cena para que o pivot fique no (0, 0, 0)
    computer.scene.position.x -= center.x;
    computer.scene.position.y -= center.y;
    computer.scene.position.z -= center.z;

        if (isMobile) {
     
      computer.scene.position.y += 1;
    }

  }, [computer]);

    return (
        <mesh>
            <hemisphereLight intensity={2.5} groundColor="black" />
            <spotLight
                position={[-10, 20, 10]}
                angle={0.12}
                penumbra={1}
                intensity={4}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight intensity={1} />

            <primitive
                object={computer.scene}
                scale={isMobile ? 0.6 : 0.8}
                position={isMobile ? [-2.5, -2, -2.2] : [5, -1.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        setIsMobile(mediaQuery.matches);

        const handleMediaQueryChange = (event: Event) => {
            const mediaQueryEvent = event as MediaQueryListEvent;
            setIsMobile(mediaQueryEvent.matches);
        };

        mediaQuery.addEventListener("change", handleMediaQueryChange);
        setIsClient(true);
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <PreloadedCanvas
            preloadAssets={["/models/desktop/scene.gltf"]}
            shadows
            camera={{ position: [30, 1, 10], fov: 20 }}
            gl={{ preserveDrawingBuffer: true }}
             className="w-full h-full"
         
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    target={[0, 0, 0]}
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </PreloadedCanvas>
    );
};

export default ComputersCanvas;
