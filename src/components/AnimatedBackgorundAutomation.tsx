import React, { useMemo, useEffect, useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  RectAreaLight,
  Color,
  Vector3,
  InstancedMesh,
  SphereGeometry,
  Object3D,
  MeshPhysicalMaterial,
  InstancedBufferAttribute,
  Group,
} from 'three';
import { useGLTF } from '@react-three/drei';
import Loader from './Loader';
import MouseMoveTutorial from './MouseMoveTutorial';

const NUM_INSTANCES_DESKTOP = 55;
const NUM_INSTANCES_MOBILE = 20;
const INTERACTION_DISTANCE = 12;
const INTENSITY_SCALE = 2000;
const MIN_INTENSITY_CLOSE = 600;

const AnimatedBackgroundAutomationComponent: React.FC = () => {
  const lightRef = useRef<RectAreaLight>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="w-full h-96 bg-transparent relative">
      <MouseMoveTutorial />
      <Canvas
        style={{ background: 'transparent' }}
        shadows
        gl={{ alpha: true, preserveDrawingBuffer: false, antialias: !isMobile }}
        camera={{ fov: 50, position: new Vector3(0, 0, 100) }}
      >
        <Suspense fallback={<Loader />}>
          <primitive
            ref={lightRef}
            object={new RectAreaLight(0xffffff, 10, 15, 15)}
            position={[5, 5, 5]}
            intensity={5}
          />
          <ambientLight intensity={0.6} color={0xffffff} />
          <directionalLight position={[10, 10, 10]} intensity={0.6} />
          <AnimatedInstancedMesh lightRef={lightRef} isMobile={isMobile} />
          <FloatingModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

interface AnimatedInstancedMeshProps {
  lightRef: React.RefObject<RectAreaLight>;
  isMobile: boolean;
}

const AnimatedInstancedMesh: React.FC<AnimatedInstancedMeshProps> = ({ lightRef, isMobile }) => {
  const NUM_INSTANCES = isMobile ? NUM_INSTANCES_MOBILE : NUM_INSTANCES_DESKTOP;

  const geometry = useMemo(() => new SphereGeometry(1, 10, 10), []);
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        roughness: 0.25,
        metalness: 0.15,
      }),
    []
  );

  const dummy = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>(null);
  const target = useRef(new Vector3());

  const sizes = useMemo(() => {
    const s = new Float32Array(NUM_INSTANCES);
    for (let i = 0; i < NUM_INSTANCES; i++) s[i] = 0.6 + Math.random() * 2.2;
    return s;
  }, [NUM_INSTANCES]);

  const instances = useMemo(() => {
    const list = [];
    for (let i = 0; i < NUM_INSTANCES; i++) {
      list.push({
        position: new Vector3(
          Math.random() * 60 - 30,
          Math.random() * 40 - 20,
          Math.random() * 20 - 10,
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.18,
          (Math.random() - 0.5) * 0.18,
          (Math.random() - 0.5) * 0.08,
        ),
      });
    }
    return list;
  }, [NUM_INSTANCES]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      target.current.set(x * 50, y * 30, 0);
      if (lightRef.current) lightRef.current.position.copy(target.current);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [lightRef]);

  useEffect(() => {
    if (!meshRef.current) return;

    const colorPalette = [
      new Color('#792990'),
      new Color('#5a1a7a'),
      new Color('#350545'),
      new Color('#aaa6c3'),
      new Color('#c084fc'),
      new Color('#ffb947'),
    ];
    const colors = new Float32Array(NUM_INSTANCES * 3);

    for (let i = 0; i < NUM_INSTANCES; i++) {
      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      dummy.position.copy(instances[i].position);
      dummy.scale.setScalar(sizes[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    geometry.setAttribute('color', new InstancedBufferAttribute(colors, 3));
    geometry.attributes.color.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [geometry, dummy, instances, sizes, NUM_INSTANCES]);

  useFrame(() => {
    if (!meshRef.current || !lightRef.current) return;

    const BOUNDS_X = 32, BOUNDS_Y = 22, BOUNDS_Z = 12;
    const ATTRACTION = 0.008;
    const VLIMIT = 0.22;
    const DAMPING = 0.998;

    let closestDist = Infinity;

    for (let i = 0; i < NUM_INSTANCES; i++) {
      const { position, velocity } = instances[i];

      velocity.x += (target.current.x - position.x) * ATTRACTION;
      velocity.y += (target.current.y - position.y) * ATTRACTION;
      velocity.z += (target.current.z - position.z) * ATTRACTION;

      velocity.clampScalar(-VLIMIT, VLIMIT).multiplyScalar(DAMPING);
      position.add(velocity);

      if (position.x >  BOUNDS_X) { position.x =  BOUNDS_X; velocity.x *= -0.6; }
      if (position.x < -BOUNDS_X) { position.x = -BOUNDS_X; velocity.x *= -0.6; }
      if (position.y >  BOUNDS_Y) { position.y =  BOUNDS_Y; velocity.y *= -0.6; }
      if (position.y < -BOUNDS_Y) { position.y = -BOUNDS_Y; velocity.y *= -0.6; }
      if (position.z >  BOUNDS_Z) { position.z =  BOUNDS_Z; velocity.z *= -0.6; }
      if (position.z < -BOUNDS_Z) { position.z = -BOUNDS_Z; velocity.z *= -0.6; }

      dummy.position.copy(position);
      dummy.scale.setScalar(sizes[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const d = position.distanceTo(target.current);
      if (d < closestDist) closestDist = d;
    }

    const targetIntensity = closestDist < INTERACTION_DISTANCE
      ? MIN_INTENSITY_CLOSE * (1 - closestDist / INTERACTION_DISTANCE) * (INTENSITY_SCALE / MIN_INTENSITY_CLOSE)
      : 0;
    lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * 0.1;

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, NUM_INSTANCES]} />;
};

const FloatingModel: React.FC = () => {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/gear/automation.glb');

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      modelRef.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={7}
      position={[40, 4, 0]}
    />
  );
};

useGLTF.preload('/models/gear/automation.glb');

export default AnimatedBackgroundAutomationComponent;
