import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeDScene: React.FC = () => {
    const [wWidth, setWWidth] = useState(0);
    const [wHeight, setWHeight] = useState(0);
    const [textVisible, setTextVisible] = useState(false);
    const [effectStarted, setEffectStarted] = useState(false);
    const [expandedCube, setExpandedCube] = useState(false);

    const initialCubeRef = useRef<THREE.Mesh>(null);
    const gridCubesRef = useRef<THREE.Mesh[]>([]);

    const conf = {
        objectWidth: 12,
        objectThickness: 3,
        color: 0x792990,
    };


    const startAnim = () => {
        if (gridCubesRef.current.length === 0) return;

        gridCubesRef.current.forEach((mesh) => {
            mesh.rotation.set(0, 0, 0);
            if (mesh.material instanceof THREE.MeshLambertMaterial || mesh.material instanceof THREE.MeshStandardMaterial) {
                mesh.material.opacity = 1;
                mesh.position.z = 0;
            }

            const delay = Math.random() * 1 + 1;
            const rx = Math.random() * 2 * Math.PI;
            const ry = Math.random() * 2 * Math.PI;
            const rz = Math.random() * 2 * Math.PI;


            gsap.to(mesh.rotation, { x: rx, y: ry, z: rz, duration: 2, delay });
            gsap.to(mesh.position, { z: 80, duration: 2, delay: delay + 0.5, ease: 'power1.out' });
            gsap.to(mesh.material, {
                opacity: 0,
                duration: 2,
                delay: delay + 0.5,
                onUpdate: () => {
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((material) => {
                            material.needsUpdate = true;
                        });
                    } else {
                        mesh.material.needsUpdate = true;
                    }
                },
            });
        });
    };


    const generateCubes = () => {
        const cubes = [];
        const nx = Math.round(wWidth / conf.objectWidth) + 1;
        const ny = Math.round(wHeight / conf.objectWidth) + 1;

        for (let i = 0; i < nx; i++) {
            for (let j = 0; j < ny; j++) {
                const geometry = new THREE.BoxGeometry(conf.objectWidth, conf.objectWidth, conf.objectThickness);
                const material = new THREE.MeshStandardMaterial({
                    color: conf.color,
                    transparent: true,
                    opacity: 1,
                });
                const mesh = new THREE.Mesh(geometry, material);

                const x = -wWidth / 2 + i * conf.objectWidth;
                const y = -wHeight / 2 + j * conf.objectWidth;
                mesh.position.set(x, y, 0);

                cubes.push(mesh);
                gridCubesRef.current.push(mesh);
            }
        }

        return cubes;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWWidth(window.innerWidth);
            setWHeight(window.innerHeight);
        }
    }, []);

    const handleStartEffect = () => {
        setEffectStarted(true);
        setTextVisible(true);


        if (initialCubeRef.current) {
            gsap.to(initialCubeRef.current.rotation, { x: 0, y: 0, z: 0, duration: 0.5 });
            gsap.to(initialCubeRef.current.scale, {
                x: wWidth / 10,
                y: wHeight / 10,
                z: conf.objectThickness,
                duration: 1.5,
                onComplete: () => {
                    setExpandedCube(true);
                    generateCubes();
                    startAnim();
                },
            });
        }
    };

    return (
        <div className="relative w-full h-screen bg-custom-purple">
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-10">


                <div className={`absolute top-0 left-0 w-full h-full ${textVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                    <div className="inner text-white">
                        <h3 className="masthead-brand text-white text-3xl mb-4">Reveal #1</h3>
                        <main role="main" className="inner cover text-white">
                            <h1 className="cover-heading text-4xl font-bold mb-2">Digital Marketing</h1>
                            <p className="lead mb-4">trafego pago e social media</p>
                        </main>
                    </div>
                </div>


                {!effectStarted && (
                    <button
                        onClick={handleStartEffect}
                        className="absolute top-4 left-1/2 bg-primary text-white py-2 px-6 rounded-full z-20"
                        style={{ pointerEvents: 'auto' }}
                    >
                        Iniciar Efeito
                    </button>
                )}


                <Canvas
                    style={{ width: '100%', height: '100%' }}
                    camera={{ position: [0, 0, 75], fov: 75 }}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} />
                    <directionalLight position={[0, 10, 0]} intensity={1} />


                    {!expandedCube ? (
                        <mesh ref={initialCubeRef}>
                            <boxGeometry args={[10, 10, 10]} />
                            <meshStandardMaterial color={conf.color} />
                        </mesh>
                    ) : (
                        gridCubesRef.current.map((mesh, index) => (
                            <primitive key={index} object={mesh} />
                        ))
                    )}

                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>
        </div>
    );
};

export default ThreeDScene;
