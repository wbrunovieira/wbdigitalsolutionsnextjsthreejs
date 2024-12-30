import { Instance } from '@react-three/drei';
import { useState } from 'react';

/**
 * Cube Component
 *
 * Este componente representa um cubo individual dentro de uma cena 3D.
 * Ele lida com interações de hover e clique, podendo ser estendido para
 * alterar cor ou outros comportamentos conforme necessário.
 *
 * Props:
 * - position: A posição do cubo no espaço 3D.
 * - parent: Referência opcional para o objeto pai contendo as instâncias de cubo.
 * - index: Índice do cubo dentro do objeto pai (caso necessário).
 */
export const Cube = ({ position, parent, index }: any) => {
  // Estado de hover e clique
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Caso precise armazenar alguma referência externa (por ex. meshExplosion)
  const [meshExplosion, setMeshExplosion] = useState<any>(null);

  return (
    <Instance
      receiveShadow
      castShadow
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => setClicked(true)}
    />
  );
};