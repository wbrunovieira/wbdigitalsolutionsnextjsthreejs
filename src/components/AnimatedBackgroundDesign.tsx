import React, { useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector3, InstancedMesh, DodecahedronGeometry, Object3D, MeshStandardMaterial, InstancedBufferAttribute, PointLight } from 'three';

const NUM_INSTANCES = 800;

const MIN_DISTANCE = 4;
const INTERACTION_DISTANCE = 20;
const INTENSITY_SCALE = 500;
const MIN_INTENSITY_CLOSE = 50;

const AnimatedBackgroundDesignComponent: React.FC = () => {
    return (
        <div className="w-full h-96 bg-transparent">
            <Canvas
                style={{ background: 'transparent' }}
                shadows
                gl={{ alpha: true, preserveDrawingBuffer: false }}
                camera={{
                    fov: 50,
                    position: new Vector3(0, 0, 100),
                }}
            >
                <ambientLight intensity={0.2} color={0xffffff} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={0.3}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                {/* <pointLight position={[-30, 10, 20]} intensity={0.7} color={0xffa500} />
                <pointLight position={[30, -10, 20]} intensity={0.7} color={0x00aaff} /> */}

                <AnimatedInstancedMesh />
            </Canvas>
        </div>
    );
};

const AnimatedInstancedMesh: React.FC = () => {
    const geometry = useMemo(() => new DodecahedronGeometry(1.2), []);
    const material = useMemo(() => new MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.5,
        roughness: 0.5,
        transparent: true,
    }), []);
    const dummy = useMemo(() => new Object3D(), []);
    const meshRef = React.useRef<InstancedMesh>(null);
    const lightRef = React.useRef<PointLight>(null);

    const target = useRef(new Vector3());
    const instances = useMemo(() => generateNonOverlappingPositions(NUM_INSTANCES, MIN_DISTANCE), []);

    function generateNonOverlappingPositions(numInstances: number, minDistance: number) {
        const positions: { position: Vector3; velocity: Vector3; attraction: number; vlimit: number }[] = [];

        for (let i = 0; i < numInstances; i++) {
            let position: Vector3;
            let isOverlapping: boolean;
            let attempt = 0;

            do {
                position = new Vector3(
                    Math.random() * 60 - 30,
                    Math.random() * 40 - 20,
                    Math.random() * 20 - 10
                );

                isOverlapping = positions.some(existingPos => position.distanceTo(existingPos.position) < minDistance);

                attempt++;
            } while (isOverlapping && attempt < 500);

            positions.push({
                position,
                velocity: new Vector3(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
                attraction: 0.01,
                vlimit: 0.2,
            });
        }

        return positions;
    }

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            target.current.set(x * 50, y * 30, 0);


            if (lightRef.current) {
                lightRef.current.position.copy(target.current);
            }
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
        if (meshRef.current && lightRef.current) {
            for (let i = 0; i < NUM_INSTANCES; i++) {
                const instance = instances[i];
                const { position, velocity, attraction, vlimit } = instance;

                const direction = new Vector3().copy(target.current).sub(position).normalize().multiplyScalar(attraction);
                velocity.add(direction).clampScalar(-vlimit, vlimit);
                position.add(velocity);


                for (let j = 0; j < NUM_INSTANCES; j++) {
                    if (i !== j) {
                        const otherInstance = instances[j];
                        const distance = position.distanceTo(otherInstance.position);

                        if (distance < MIN_DISTANCE) {
                            const repulsion = new Vector3().copy(position).sub(otherInstance.position).normalize().multiplyScalar(0.1);
                            velocity.add(repulsion);
                        }
                    }
                }


                dummy.position.copy(position);
                dummy.lookAt(new Vector3().copy(position).add(velocity));
                dummy.rotation.x += 0.01;
                dummy.rotation.y += 0.01;
                dummy.updateMatrix();

                meshRef.current.setMatrixAt(i, dummy.matrix);


                const distanceToMouse = position.distanceTo(target.current);
                let intensity;

                if (distanceToMouse < MIN_DISTANCE) {

                    intensity = Math.max(MIN_INTENSITY_CLOSE, INTENSITY_SCALE * (MIN_DISTANCE - distanceToMouse) / MIN_DISTANCE);
                } else if (distanceToMouse < INTERACTION_DISTANCE) {

                    intensity = MIN_INTENSITY_CLOSE * (INTERACTION_DISTANCE - distanceToMouse) / INTERACTION_DISTANCE;
                } else {

                    intensity = 0;
                }

                lightRef.current.intensity = intensity;
                console.log('distanceToMouse:', distanceToMouse, 'intensity:', lightRef.current.intensity);
            }

            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });


    return (
        <>
            <instancedMesh ref={meshRef} args={[geometry, material, NUM_INSTANCES]} castShadow receiveShadow />
            <pointLight ref={lightRef} intensity={0} distance={100} decay={2} color={0xffcc88} />

        </>
    );
};

export default AnimatedBackgroundDesignComponent;
