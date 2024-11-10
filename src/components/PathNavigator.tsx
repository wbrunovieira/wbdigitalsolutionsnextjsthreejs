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
                <Canvas>
                    <ScrollCamera pathPoints={pathPoints} scrollProgress={scrollProgress} />
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <Road />
                    <Billboard scrollProgress={scrollProgress} />
                    <DigitalBillboard scrollProgress={scrollProgress} />
                    <DigitalBillboard2 scrollProgress={scrollProgress} />
                    <DigitalBillboard3 scrollProgress={scrollProgress} />
                    <DigitalBillboard4 scrollProgress={scrollProgress} />
                </Canvas>
            </div>
        </div>
    );
};

interface ScrollCameraProps {
    pathPoints: THREE.Vector3[];
    scrollProgress: number;
}

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
            positionWithDistance.z += 26;
            cameraRef.current.position.copy(positionWithDistance);
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, 20]} fov={50} />;
};

const Road: React.FC = () => {
    const texture = useLoader(THREE.TextureLoader, "/textures/road.png");

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 7);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -7]}>
            <planeGeometry args={[20, 100]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

const Billboard: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const { scene } = useLoader(GLTFLoader, "/models/BillBoard.glb");


    const billboardRotationY = THREE.MathUtils.lerp(Math.PI * 2, 0, scrollProgress * 0.5);
    return (
        <group position={[0, -0.15, -8]} rotation={[0, billboardRotationY, 0]}>
            <group scale={3.8}>
                <primitive object={scene} />
            </group>
            <Html
                position={[0.50, 2.92, 0.20]}
                transform
                rotation={[0, Math.PI / 2, 0]}
                scale={1}
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

    return (
        <group position={[-5, 0, 5]}>
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

    return (
        <group position={[10, 0, -5]}>
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

    return (
        <group position={[10, 5, -5]}>
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

    const messageIndex = Math.floor(scrollProgress * messages.length) % messages.length;

    return (
        <group position={[-20, 3, 2]}>
            <Html
                position={[10, 1.5, 0.01]}
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
