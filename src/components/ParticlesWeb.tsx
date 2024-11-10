import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParticlesWeb: React.FC = () => {
    const particleIcons = ["/tech/google.svg", "/tech/instagram.webp"];

    const particles = useRef<THREE.Group | null>(null);

    useFrame(() => {
        particles.current?.children.forEach(
            (particle: THREE.Object3D, i: number) => {
                const time = Date.now() * 0.001;
                particle.position.y += Math.sin(time + i) * 0.01;
                particle.position.x += Math.cos(time + i) * 0.01;
            }
        );
    });

    return (
        <group ref={particles}>
            {Array.from({ length: 400 }, (_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.random() * 60 - 30,
                        Math.random() * 60 - 30,
                        Math.random() * 60 - 30,
                    ]}
                >
                    <Html>
                        <img
                            src={particleIcons[i % particleIcons.length]}
                            style={{
                                width: "40px",
                                opacity: 0.7,
                                animation: "float 5s ease-in-out infinite",
                            }}
                        />
                    </Html>
                </mesh>
            ))}
        </group>
    );
};

export default ParticlesWeb;
