import { useRef } from 'react'; 
import { useFrame, useThree } from '@react-three/fiber'; 
import * as THREE from 'three';

export const Cursor = () => {
  const ref = useRef<THREE.PointLight | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const { camera } = useThree();

  useFrame(({ pointer }) => {
    // Se ref.current não é nulo, atualiza a posição do pointLight
    if (ref.current) {
      const vector = new THREE.Vector3(pointer.x, pointer.y, 0);
      vector.unproject(camera);
      ref.current.position.copy(vector);
    }
  });

  return (
    <pointLight
      ref={ref}
      castShadow
      intensity={939}
      color={'pink'}
      distance={100}
      decay={0.2}
    >
      <mesh ref={sphereRef} receiveShadow castShadow>
        <sphereGeometry args={[0.0029, 32, 32]} />
        <meshLambertMaterial
          color={0x000}
          fog
          emissive={'#000113'}
          emissiveIntensity={332}
        />
      </mesh>
    </pointLight>
  );
};