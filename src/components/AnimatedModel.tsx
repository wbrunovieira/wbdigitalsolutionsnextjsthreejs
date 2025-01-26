import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const AnimatedModel = () => {
  const modelRef = useRef<THREE.Group>(null);

  // Carregar o modelo GLTF
  const { scene } = useGLTF("/models/gear/automation.gltf");

  useEffect(() => {
    // Configurar animações com GSAP
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });

    timeline.to(modelRef.current!.rotation, {
      y: Math.PI * 2, // Rotação de 360 graus
      duration: 5,
      ease: "power1.inOut",
    });

    timeline.to(
      modelRef.current!.position,
      {
        y: -3, // Movimenta para baixo
        duration: 5,
        ease: "power1.inOut",
      },
      "<"
    );
  }, []);

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={[2, 2, 2]} />
    </group>
  );
};

export const ThreeScene = () => {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        {/* Luzes */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Modelo Animado */}
        <AnimatedModel />

        {/* Controles */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;