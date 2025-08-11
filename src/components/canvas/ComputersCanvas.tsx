import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import CanvasLoader from "../Loader";
import { PreloadedCanvas } from "../PreloadedCanvas";
import DragTutorial from "../DragTutorial";

interface isMobileProps {
    isMobile: boolean;
}

const Computers: React.FC<isMobileProps> = ({ isMobile }) => {
    const computer = useGLTF("/models/desktop/scene.gltf");
    const computerRef = useRef<THREE.Group | null>(null); 

    useEffect(() => {
        if (!computerRef.current) return;

        computerRef.current.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).geometry.computeBoundingBox();
            }
        });

        const box = new THREE.Box3().setFromObject(computerRef.current);
        const center = box.getCenter(new THREE.Vector3());


        computerRef.current.position.x -= center.x;
        computerRef.current.position.y -= center.y;
        computerRef.current.position.z -= center.z;

        if (isMobile) {
            computerRef.current.position.y += 1;
        }
    }, [computer]); 


    useFrame(() => {
        if (isMobile && computerRef.current) {
            computerRef.current.rotation.y += 0.05; 
        }
    });

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
                ref={computerRef}
                object={computer.scene}
                scale={isMobile ? 0.6 : 1.8}
                position={isMobile ? [-2.5, -2, -2.2] : [0, -1.25, -1.5]}
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
        <div className="relative w-full h-full">
            <PreloadedCanvas
                preloadAssets={["/models/desktop/scene.gltf"]}
                shadows
                camera={{ position: [20, 3, 25], fov: 45 }}
                gl={{ preserveDrawingBuffer: true }}
                className={`w-full h-full ${isMobile ? "z-[-1]" : "z-10"}`}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        target={[0, 0, 0]}
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={!isMobile} 
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />
                    <Computers isMobile={isMobile} />
                </Suspense>

                <Preload all />
            </PreloadedCanvas>


            {isMobile && (
                <div className="absolute inset-0 w-full h-full z-10 bg-transparent"></div>
            )}

            {/* Tutorial overlay - always shows on desktop on page load */}
            {!isMobile && (
                <DragTutorial />
            )}
        </div>
    );
};

export default ComputersCanvas;