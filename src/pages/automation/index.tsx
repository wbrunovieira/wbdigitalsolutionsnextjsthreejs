import React from "react";
import dynamic from "next/dynamic";

// Carregar o ThreeScene dinamicamente para evitar SSR
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });

const ScrollModelPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Modelo 3D no topo */}
      <ThreeScene />

      {/* Conteúdo HTML */}
      <div className="relative z-10">
        <section className="h-screen flex items-center justify-center bg-blue-500 text-white">
          <h1 className="text-5xl font-bold">Bem-vindo ao Blog</h1>
        </section>

        <section className="trigger-section h-screen flex items-center justify-center bg-yellow-500">
          <h2 className="text-4xl font-bold">Aqui o modelo começa a descer</h2>
        </section>

        <section className="h-screen flex items-center justify-center bg-green-500">
          <h2 className="text-4xl font-bold">Continue Descendo!</h2>
        </section>
      </div>
    </div>
  );
};

export default ScrollModelPage;