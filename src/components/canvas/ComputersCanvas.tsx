import { Suspense, useState, useEffect } from "react";


import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import { PreloadedCanvas } from "../PreloadedCanvas";

interface isMobileProps {
    isMobile: boolean;
}

const Computers: React.FC<isMobileProps> = ({ isMobile }) => {
    const computer = useGLTF("/models/desktop/scene.gltf");

    return (
        <mesh>
            <hemisphereLight intensity={2.5} groundColor="black" />
            <spotLight
                position={[-10, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={4}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight intensity={1} />

            <primitive
                object={computer.scene}
                scale={isMobile ? 0.50 : 0.75}
                position={isMobile ? [-2.5, -1, -2.2] : [2, -1.25, -1.5]}
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
            camera={{ position: [20, 3, 10], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-screen"
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
        </PreloadedCanvas>
    );
};

export default ComputersCanvas;
