import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { PreloadedCanvas } from "../PreloadedCanvas";
import DragTutorial from "../DragTutorial";
import TapTutorial from "../TapTutorial";

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


    // Removido useFrame - agora usa autoRotate do OrbitControls

    return (
        <>
            <fog attach="fog" args={["#0a0a0a", 10, 50]} />
            
            <ambientLight intensity={0.3} />
            <hemisphereLight 
                intensity={0.8} 
                color="#b1e1ff"
                groundColor="#000000" 
            />
            
            <spotLight
                position={[-20, 30, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-mapSize={2048}
                color="#ffffff"
            />
            
            <spotLight
                position={[10, -10, -5]}
                angle={0.3}
                penumbra={0.5}
                intensity={0.5}
                color="#792990"
            />
            
            <pointLight 
                position={[0, 5, -10]} 
                intensity={0.5} 
                color="#ffb947"
            />

            <primitive
                ref={computerRef}
                object={computer.scene}
                scale={isMobile ? 1.2 : 1.8}
                position={isMobile ? [-2.5, -2, -2.2] : [0, -1.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
            
            <mesh position={[0, -5, -2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial 
                    color="#0a0a0a"
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>
            
            <mesh position={[0, 0, -15]}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial 
                    color="#050505"
                    opacity={0.8}
                    transparent
                />
            </mesh>
        </>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [rotationSpeed, setRotationSpeed] = useState(0.5);
    const orbitControlsRef = useRef<any>(null);

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

    const handleTap = (e: React.TouchEvent) => {
        if (isMobile) {
            // Só acelera se foi um toque rápido (não um scroll)
            const touch = e.changedTouches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            // Verifica se o toque foi no canvas (não em outros elementos)
            if (element?.closest('.canvas-container')) {
                // Acelera a rotação temporariamente
                setRotationSpeed(6);
                
                setTimeout(() => {
                    setRotationSpeed(0.5);
                }, 3500); // Volta ao normal após 3.5 segundos
            }
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="relative w-full h-full canvas-container" onTouchEnd={handleTap}>
            <PreloadedCanvas
                preloadAssets={["/models/desktop/scene.gltf"]}
                shadows
                camera={{ position: [20, 5, 30], fov: 35, near: 0.1, far: 100 }}
                gl={{ 
                    preserveDrawingBuffer: true,
                    antialias: true,
                    alpha: true
                }}
                className={`w-full h-full ${isMobile ? "z-[-1]" : "z-10"}`}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        ref={orbitControlsRef}
                        target={[0, 0, 0]}
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={!isMobile}
                        autoRotate={isMobile}
                        autoRotateSpeed={rotationSpeed}
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

            {/* Tutorial overlay - shows on desktop for drag, mobile for tap */}
            {!isMobile && <DragTutorial />}
            {isMobile && <TapTutorial />}
        </div>
    );
};

export default ComputersCanvas;