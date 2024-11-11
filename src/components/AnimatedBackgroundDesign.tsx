"use client";

import React, { useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector3, InstancedMesh, DodecahedronGeometry, Object3D, MeshBasicMaterial, InstancedBufferAttribute } from 'three';


const NUM_INSTANCES = 10;
const MIN_DISTANCE = 10;

const AnimatedBackgroundDesignComponent: React.FC = () => {
    return (
        <div className="w-full h-96 bg-primary">
            <Canvas
                shadows
                gl={{ alpha: false, preserveDrawingBuffer: false }}
                camera={{
                    fov: 50,
                    position: new Vector3(0, 0, 100),
                }}
                onCreated={({ gl, scene }) => {
                    gl.setClearColor(new Color('#121212'));
                    scene.background = new Color('#121212');
                }}
            >
                <ambientLight intensity={0.3} color={0xffffff} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <pointLight position={[-30, 10, 20]} intensity={0.7} color={0xffa500} />
                <pointLight position={[30, -10, 20]} intensity={0.7} color={0x00aaff} />



                <AnimatedInstancedMesh />
            </Canvas>
        </div>
    );
};

const AnimatedInstancedMesh: React.FC = () => {
    const geometry = useMemo(() => new DodecahedronGeometry(5), []);
    const material = useMemo(() => new MeshBasicMaterial({ vertexColors: true }), []);
    const dummy = useMemo(() => new Object3D(), []);
    const meshRef = React.useRef<InstancedMesh>(null);


    const target = useRef(new Vector3());
    const instances = useMemo(() => generateNonOverlappingPositions(NUM_INSTANCES, MIN_DISTANCE), []);

    function generateNonOverlappingPositions(numInstances: number, minDistance: number) {
        const positions: { position: Vector3; velocity: Vector3; attraction: number; vlimit: number }[] = [];
        const maxAttempts = 500; // Limite de tentativas para evitar loops infinitos

        for (let i = 0; i < numInstances; i++) {
            let position: Vector3;
            let isOverlapping: boolean;
            let attempt = 0;

            do {
                // Tentamos colocar os objetos dentro de uma faixa maior, usando incremento para distribuir melhor
                position = new Vector3(
                    Math.random() * 60 - 30, // Alcance horizontal maior
                    Math.random() * 40 - 20, // Alcance vertical maior
                    Math.random() * 20 - 10  // Alcance de profundidade maior
                );

                // Verifica se a posição respeita a distância mínima para todos os pontos existentes
                isOverlapping = positions.some(existingPos => position.distanceTo(existingPos.position) < minDistance);

                if (isOverlapping) {
                    // Caso esteja sobreposto, aumenta levemente a posição em uma direção para tentar evitar sobreposição
                    position.add(new Vector3(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5));
                }

                attempt++;
            } while (isOverlapping && attempt < maxAttempts);

            // Após determinar a posição, adicionamos a instância na lista final
            positions.push({
                position,
                velocity: new Vector3(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
                attraction: 0.005,
                vlimit: 0.1,
            });
        }

        return positions;
    }



    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            target.current.set(x * 50, y * 30, 0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        if (meshRef.current) {
            const colorPalette = [
                new Color('#792990'),
                new Color('#350545'),
                new Color('#aaa6c3'),
                new Color('#ffb947'),
            ];

            const colors = new Float32Array(NUM_INSTANCES * 3);

            for (let i = 0; i < NUM_INSTANCES; i++) {
                const selectedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                colors[i * 3 + 0] = selectedColor.r;
                colors[i * 3 + 1] = selectedColor.g;
                colors[i * 3 + 2] = selectedColor.b;

                const { position } = instances[i];
                dummy.position.copy(position);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }

            geometry.setAttribute('color', new InstancedBufferAttribute(colors, 3));
            geometry.attributes.color.needsUpdate = true;
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [geometry, dummy, instances]);

    useFrame(() => {
        if (meshRef.current) {
            for (let i = 0; i < NUM_INSTANCES; i++) {
                const instance = instances[i];
                const { position, velocity, attraction, vlimit } = instance;


                const direction = new Vector3().copy(target.current).sub(position).normalize().multiplyScalar(attraction);
                velocity.add(direction).clampScalar(-vlimit, vlimit);


                for (let j = 0; j < NUM_INSTANCES; j++) {
                    if (i !== j) {
                        const otherInstance = instances[j];
                        const distance = position.distanceTo(otherInstance.position);

                        if (distance < MIN_DISTANCE) {

                            const repulsion = new Vector3().copy(position).sub(otherInstance.position).normalize().multiplyScalar(0.05);
                            velocity.add(repulsion);
                        }
                    }
                }


                position.add(velocity);

                dummy.position.copy(position);
                dummy.lookAt(new Vector3().copy(position).add(velocity));


                dummy.rotation.x += 0.01;
                dummy.rotation.y += 0.01;
                dummy.updateMatrix();

                meshRef.current.setMatrixAt(i, dummy.matrix);
            }


            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });



    return (
        <instancedMesh ref={meshRef} args={[geometry, material, NUM_INSTANCES]} castShadow receiveShadow />
    );
};

export default AnimatedBackgroundDesignComponent;
