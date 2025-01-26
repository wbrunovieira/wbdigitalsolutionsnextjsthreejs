import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedModel: React.FC = () => {
  const modelRef = useRef<THREE.Group>(null);

  // Carregar o modelo
  const { scene } = useGLTF("/models/gear/automation.gltf");

  useEffect(() => {
    if (modelRef.current) {
      // Animação com base no ScrollTrigger
      gsap.timeline({
        scrollTrigger: {
          trigger: ".trigger-section", // O elemento que aciona o scroll
          start: "top center", // Início da animação
          end: "bottom center", // Fim da animação
          scrub: true, // Vincula animação ao scroll
        },
      })
        .to(modelRef.current.position, { y: -5, duration: 1 }) // Modelo desce
        .to(modelRef.current.position, { y: 0, duration: 1 }); // Retorna ao ponto inicial ao rolar para cima
    }
  }, []);

  return <primitive ref={modelRef} object={scene} scale={2} position={[0, 5, 0]} />;
};

const ThreeScene: React.FC = () => {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full z-0 mt-32">
      {/* Luzes */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      {/* Modelo 3D */}
      <AnimatedModel />
    </Canvas>
  );
};

export default ThreeScene;