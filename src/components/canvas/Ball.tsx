import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import {
    Decal,
    Float,
    OrbitControls,
    Preload,
    useTexture,
} from '@react-three/drei';

import CanvasLoader from '../Loader';

type BallProps = {
    imgUrl: string;
};

type BallCanvasProps = {
    icon: string;
};

const Ball = ({ imgUrl }: BallProps) => {
    const [decal] = useTexture([imgUrl]);

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[0, 0, 0.1]} />
            <mesh castShadow receiveShadow scale={2.75}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color='#fff8eb'
                    polygonOffsetFactor={-1}
                    flatShading
                />
                <Decal
                    position={[0, 0, 1]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    map={decal}
                />
            </mesh>
        </Float>
    );
};

const BallCanvas = ({ icon }: BallCanvasProps) => {
    return (
        <Canvas
            frameloop='demand'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls enableZoom={false} />
                <Ball imgUrl={icon} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default BallCanvas;
