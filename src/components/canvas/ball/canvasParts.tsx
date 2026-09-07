import { OrbitControls } from '@react-three/drei';

export const CanvasLights = () => (
    <>
        <ambientLight intensity={0.75} />
        <directionalLight position={[0, 0, 0.1]} />
    </>
);

export const CanvasControls = () => (
    <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
    />
);
