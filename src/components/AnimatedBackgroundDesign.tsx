import React, { useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RectAreaLight, Color, Vector3, InstancedMesh, DodecahedronGeometry, Object3D, MeshPhysicalMaterial, InstancedBufferAttribute, Group, Mesh, MeshStandardMaterial } from 'three';
import { useGLTF, } from '@react-three/drei';

const NUM_INSTANCES = 800;
const MIN_DISTANCE = 4;
const INTERACTION_DISTANCE = 10;
const INTENSITY_SCALE = 3000;
const MIN_INTENSITY_CLOSE = 1000;

const AnimatedBackgroundDesignComponent: React.FC = () => {
    const lightRef = useRef<RectAreaLight>(null);

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

                <primitive
                    ref={lightRef}
                    object={new RectAreaLight(0xffffff, 10, 15, 15)}
                    position={[5, 5, 5]}
                    intensity={5}
                />
                <ambientLight intensity={0.2} color={0xffffff} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={0.3}
                />


                <AnimatedInstancedMesh lightRef={lightRef} />

                <FloatingModel />
            </Canvas>
        </div>
    );
};

interface AnimatedInstancedMeshProps {
    lightRef: React.RefObject<RectAreaLight>;
}

const AnimatedInstancedMesh: React.FC<AnimatedInstancedMeshProps> = ({ lightRef }) => {
    const geometry = useMemo(() => new DodecahedronGeometry(1.2), []);
    const material = useMemo(() => new MeshPhysicalMaterial({
        vertexColors: true,
        transparent: true,
    }), []);

    const dummy = useMemo(() => new Object3D(), []);
    const meshRef = useRef<InstancedMesh>(null);
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
    }, [lightRef]);

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

                const lerp = (start: number, end: number, alpha: number): number => {
                    return start * (1 - alpha) + end * alpha;
                };

                const distanceToMouse = position.distanceTo(target.current);
                let targetIntensity;

                if (distanceToMouse < MIN_DISTANCE) {
                    targetIntensity = Math.max(MIN_INTENSITY_CLOSE, INTENSITY_SCALE * (MIN_DISTANCE - distanceToMouse) / MIN_DISTANCE);
                } else if (distanceToMouse < INTERACTION_DISTANCE) {
                    targetIntensity = MIN_INTENSITY_CLOSE * (INTERACTION_DISTANCE - distanceToMouse) / INTERACTION_DISTANCE;
                } else {
                    targetIntensity = 0;
                }

                lightRef.current.intensity = lerp(lightRef.current.intensity, targetIntensity, 0.1);
            }

            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return <instancedMesh ref={meshRef} args={[geometry, material, NUM_INSTANCES]} />;
};




const FloatingModel: React.FC = () => {
    const modelRef = useRef<Group>(null);
    const { scene } = useGLTF("/models/macbook-pro.glb");
    scene.traverse((node) => {
        if (node instanceof Mesh) {
            node.material = new MeshStandardMaterial({
                color: new Color(0xA9A9A9),
                metalness: 0.5,
                roughness: 0.5,
            });
        }
    });


    useFrame(({ clock }) => {
        if (modelRef.current) {

            modelRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5 - 1;
            modelRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={20}
            position={[65, -1, 0]}
        />
    );
};




export default AnimatedBackgroundDesignComponent;
