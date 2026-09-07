import React from 'react';
import { useFrame } from '@react-three/fiber';

/** Parallax camera rig that follows the pointer, held still while dragging the ring. */
const Rig: React.FC<{ dragging: React.MutableRefObject<boolean> }> = ({ dragging }) => {
  useFrame((state) => {
    // Hold horizontal while dragging the ring so the two don't fight.
    const targetX = dragging.current ? state.camera.position.x : state.pointer.x * 0.5;
    const targetY = 0.4 + state.pointer.y * 0.18;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, -0.1, 0);
  });
  return null;
};

export default Rig;
