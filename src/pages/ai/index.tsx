import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, SpotLight } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three-stdlib';
import { Cursor } from './Cursor';

import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
} from '@react-three/postprocessing';
import { Cubes } from './Cubes';
// import { Risers } from './Risers';

extend({ RoundedBoxGeometry });


const Ai: React.FC = () => {
 const groupPosition: [number, number, number] = [0, 0, 0];
  const groupRotation: [number, number, number] = [-1, 0, -4];
  
  // Propriedades do SpotLight, também garantindo o array de 3 elementos
  const spotSettings = {
    position: [0, 5.5, 0] as [number, number, number],
    angle: 1.8,
    penumbra: 10,
    decay: 0.12,
    intensity: 100,
    color: '#160020',
    distance: 490,
  };

  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0 }}
      className="h-screen w-screen fixed top-0 left-0  bg-red-500"
      shadows
      camera={{
        fov: 65,
        position: [0, 0, 15],
        near: 0.1,
        far: 1000,
      }}
      gl={{ antialias: false }}
    >
      {/* Cor de fundo da cena */}
      <color attach="background" args={['#00001c']} />

      {/* Fog da cena */}
      <fog attach="fog" args={['#792990', 0.1, 19]} />

      {/* Luz ambiente */}
      <ambientLight
        intensity={Math.PI / 22222.2}
        color={0xff0000}
        castShadow
      />

      {/* Eixo visual para referência */}
      <axesHelper args={[100]} />

      {/* Cursor personalizado */}
      <Cursor />

      {/* SpotLight com props específicas */}
      <SpotLight {...spotSettings} />

      {/* Grupo com Cubes */}
      <group
        position={groupPosition}
        rotation={groupRotation}
      >
        <Cubes
          gap={0.1}
          stride={4}
          displacement={3}
          intensity={1}
        />
      </group>

      {/* Luzes adicionais */}
      <pointLight intensity={200} color={0x160020} distance={100} />
      <pointLight intensity={200} color={0x7766ff} distance={100} />

      {/* Efeitos de pós-processamento */}
      <EffectComposer multisampling={8}>
        <ToneMapping adaptive resolution={1024} />
        <Bloom
          mipmapBlur
          luminanceThreshold={1}
          levels={7}
          intensity={1}
        />
        {/* Removemos a prop "strength", pois não existe em Vignette */}
        <Vignette darkness={0.5} offset={0.1} eskil={false} />
      </EffectComposer>

      {/* Controles de órbita da cena */}
      <OrbitControls />
    </Canvas>
  );
}

export default Ai;