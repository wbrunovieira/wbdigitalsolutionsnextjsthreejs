import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "@/components/Scene";

const Websites: React.FC = () => {
    return (
        <section className="bg-[#350545] h-screen">
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 100,
                    position: [1, 1, 6],
                }}
            >
                <Scene />
            </Canvas>
        </section>
    );
};

export default Websites;
