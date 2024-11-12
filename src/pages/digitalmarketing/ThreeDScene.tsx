// components/3DRevealEffect/ThreeDScene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeDScene: React.FC = () => {
    return (
        <Canvas
            style={{ width: '100%', height: '100vh' }} // Ajusta o tamanho do canvas
            camera={{ position: [0, 0, 75], fov: 75 }} // Configura a posição e o FOV da câmera
        >
            {/* Controles de órbita para permitir interação com a câmera */}
            <OrbitControls enableZoom={false} />

            {/* Luz ambiente para iluminar uniformemente */}
            <ambientLight intensity={0.5} />

            {/* Luz pontual para adicionar profundidade */}
            <pointLight position={[10, 10, 10]} />

            {/* Objeto de teste: Cubo */}
            <mesh>
                <boxGeometry args={[12, 12, 12]} />
                <meshStandardMaterial color="#8AC" />
            </mesh>
        </Canvas>
    );
};

export default ThreeDScene;
