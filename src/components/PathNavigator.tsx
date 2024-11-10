"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


const PathNavigator: React.FC = () => {
    const pathPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, -5),
        new THREE.Vector3(10, 0, -10),
        new THREE.Vector3(15, 0, -15),
    ];

    const [scrollProgress, setScrollProgress] = useState(0);
    const [isFixed, setIsFixed] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const progress = scrollY / maxScroll;
            setScrollProgress(progress);

            const footerOffset = document.body.scrollHeight - window.innerHeight - 500;
            if (scrollY >= footerOffset) {
                setIsFixed(false);
            } else {
                setIsFixed(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative min-h-[400vh] w-full">
            s<div className={`w-full h-screen ${isFixed ? "fixed" : "relative"} top-0 left-0 pointer-events-none`}>
                <Canvas shadows>
                    <ScrollCamera pathPoints={pathPoints} scrollProgress={scrollProgress} />
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        intensity={1}
                        position={[5, 10, 5]}
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />
                    <Road scrollProgress={scrollProgress} />
                    <Billboard scrollProgress={scrollProgress} />
                    <DigitalBillboard scrollProgress={scrollProgress} />
                    <DigitalBillboard2 scrollProgress={scrollProgress} />
                    <DigitalBillboard3 scrollProgress={scrollProgress} />
                    <DigitalBillboard4 scrollProgress={scrollProgress} />

                    <FloatingParticles count={50} />
                </Canvas>
            </div>
        </div>
    );
};

interface ScrollCameraProps {
    pathPoints: THREE.Vector3[];
    scrollProgress: number;
}

const FloatingParticles: React.FC<{ count?: number }> = ({ count = 100 }) => {

    const mesh = useRef<THREE.Points<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | null>(null);
    const particlesPosition = new Float32Array(count * 3);


    for (let i = 0; i < count; i++) {
        particlesPosition[i * 3] = (Math.random() - 0.5) * 50; // X
        particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 50; // Y
        particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 150; // Z
    }

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (mesh.current) {

            for (let i = 0; i < count; i++) {
                const baseX = particlesPosition[i * 3];
                const baseY = particlesPosition[i * 3 + 1];
                const baseZ = particlesPosition[i * 3 + 2];

                mesh.current.geometry.attributes.position.setXYZ(
                    i,
                    baseX + Math.sin(elapsedTime + i) * 0.5,
                    baseY + Math.sin(elapsedTime * 0.8 + i) * 0.5,
                    baseZ + Math.sin(elapsedTime * 0.6 + i) * 0.5
                );
            }
            mesh.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={particlesPosition}
                    count={particlesPosition.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.2} color="#ffffff" />
        </points>
    );
};

const ScrollCamera: React.FC<ScrollCameraProps> = ({ pathPoints, scrollProgress }) => {
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    useFrame(() => {
        if (!cameraRef.current) return;

        const pathLength = pathPoints.length - 1;
        const index = scrollProgress * pathLength;
        const currentPoint = pathPoints[Math.floor(index)];
        const nextPoint = pathPoints[Math.ceil(index)];

        if (currentPoint && nextPoint) {
            const positionWithDistance = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, index % 1);
            positionWithDistance.y += 15;
            positionWithDistance.z += 26;

            const targetPosition = new THREE.Vector3(0, -1, 0);
            cameraRef.current.lookAt(targetPosition);
        }
    });

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 10, 30]} fov={50} />;
};

const Road: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const texture = useLoader(THREE.TextureLoader, "/textures/road.png");

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 7);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;


    const positionY = THREE.MathUtils.lerp(-0.5, -1.5, scrollProgress * 18.6);
    const positionZ = THREE.MathUtils.lerp(-7, -20, scrollProgress * 4.5);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, positionY, positionZ]} receiveShadow>
            <planeGeometry args={[60, 100]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};



const Billboard: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const { scene } = useLoader(GLTFLoader, "/models/BillBoard.glb");


    const billboardRotationY = THREE.MathUtils.lerp(Math.PI * 2, 0, scrollProgress * 0.5);


    const scale = THREE.MathUtils.lerp(1, 1.5, scrollProgress * 4);

    return (
        <group position={[0, 1, -20]} rotation={[0, billboardRotationY, 0]} scale={[scale, scale, scale]} castShadow>
            <group scale={3.8}>
                <primitive object={scene} />
            </group>
            <Html
                position={[0.50, 2.92, 0.20]}
                transform
                rotation={[0, Math.PI / 2, 0]}
                scale={scale}
                zIndexRange={[0, 1]}
                style={{
                    backfaceVisibility: "hidden",
                }}
            >
                <iframe
                    width="310"
                    height="130"
                    src="https://www.youtube.com/embed/P6t-OHgAXG8"
                    title="WB Sites Apresentação"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{
                        border: "none",
                        objectFit: "cover",
                        backfaceVisibility: "hidden",
                    }}
                ></iframe>
            </Html>
        </group>
    );
};



const DigitalBillboard: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const messages = [
        "Welcome to Our Virtual Tour!",
        "Enjoy 50% Off on All Items!",

    ];

    const messageIndex = Math.floor(scrollProgress * messages.length) % messages.length;
    const rotationY = THREE.MathUtils.lerp(Math.PI * 2, 0, scrollProgress * 0.05);
    return (
        <group position={[-5, 0, 5]} rotation={[0, rotationY, 0]} castShadow receiveShadow>
            <mesh position={[0, 1.5, 0.01]} receiveShadow castShadow>
                <planeGeometry args={[6, 2]} />
                <meshStandardMaterial color="#350545" />
            </mesh>
            <Html
                position={[0, 1.5, 0.01]}
                transform
                distanceFactor={3.5}
                style={{
                    width: '600px',
                    height: '200px',
                    backgroundColor: '#350545',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                    borderRadius: '8px',
                    padding: '55px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    border: '8px solid #ffffff',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                }}
            >
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    {messages[messageIndex]}
                </div>
            </Html>
        </group>
    );
};

const DigitalBillboard2: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const messages = [
        "Welcome to Our Virtual Tour!",
        "Enjoy 50% Off on All Items!",
    ];

    const messageIndex = Math.floor(scrollProgress * messages.length) % messages.length;


    const rotationY = THREE.MathUtils.lerp(Math.PI * 2, 0, scrollProgress * 0.2);


    const positionZ = THREE.MathUtils.lerp(-5, 0, scrollProgress * 6);

    return (
        <group position={[10, 0, positionZ]} rotation={[0, rotationY, 0]} castShadow receiveShadow>
            <Html
                position={[0, 1.5, 0.01]}
                transform
                distanceFactor={3.5}
                style={{
                    width: '600px',
                    height: '200px',
                    backgroundColor: '#350545',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                    borderRadius: '8px',
                    padding: '55px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    border: '8px solid #ffffff',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                }}
            >
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    {messages[messageIndex]}
                </div>
            </Html>
        </group>
    );
};


const DigitalBillboard3: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const messages = [
        "Welcome to Our Virtual Tour!",
        "Enjoy 50% Off on All Items!",
    ];

    const messageIndex = Math.floor(scrollProgress * messages.length) % messages.length;


    const positionZ = THREE.MathUtils.lerp(-5, 0, scrollProgress * 8);

    return (
        <group position={[10, 5, positionZ]} castShadow receiveShadow>
            <Html
                position={[0, 1.5, 0.01]}
                transform
                distanceFactor={3.5}
                style={{
                    width: '600px',
                    height: '200px',
                    backgroundColor: '#350545',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                    borderRadius: '8px',
                    padding: '55px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    border: '8px solid #ffffff',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                }}
            >
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    {messages[messageIndex]}
                </div>
            </Html>
        </group>
    );
};

const DigitalBillboard4: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const messages = [
        "Welcome to Our Virtual Tour!",
        "Enjoy 50% Off on All Items!",
    ];

    const messageIndex = Math.floor(scrollProgress * messages.length * 1.5) % messages.length;


    const rotationY = THREE.MathUtils.lerp(0, Math.PI * 2, scrollProgress * 0.08);
    const positionZ = THREE.MathUtils.lerp(2, -10, scrollProgress * 5.5);
    const positionX = THREE.MathUtils.lerp(-20, -30, scrollProgress * 2.5);

    return (
        <group position={[positionX, 3, positionZ]} rotation={[0, rotationY, 0]} castShadow receiveShadow>
            <Html
                position={[2, 1.5, 0.01]}
                transform
                distanceFactor={0}
                style={{
                    width: '600px',
                    height: '200px',
                    backgroundColor: '#350545',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                    borderRadius: '8px',
                    padding: '55px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    border: '8px solid #ffffff',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                }}
            >
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    {messages[messageIndex]}
                </div>
            </Html>
        </group>
    );
};







export default PathNavigator;
