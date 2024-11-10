"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const progress = scrollY / maxScroll;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full h-screen">
            <Canvas>
                <ScrollCamera pathPoints={pathPoints} scrollProgress={scrollProgress} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Road />
                <Billboard />
            </Canvas>
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
            cameraRef.current.position.lerpVectors(currentPoint, nextPoint, index % 1);
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={50} />;
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

const Billboard: React.FC = () => {
    const { scene } = useLoader(GLTFLoader, "/models/BillBoard.glb");

    return <primitive object={scene} position={[-3, -0.4, -1]} scale={0.6} />;
};

export default PathNavigator;
