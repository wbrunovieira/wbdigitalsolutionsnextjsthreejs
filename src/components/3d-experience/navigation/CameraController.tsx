/**
 * CameraController - Manages camera transitions and positioning
 */

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useNavigationStore } from '@/stores/navigationStore';
import { TRANSITION } from '@/components/3d-experience/constants';

interface CameraControllerProps {
  enableDamping?: boolean;
  dampingFactor?: number;
}

export function CameraController({
  enableDamping = true,
  dampingFactor = 0.05,
}: CameraControllerProps) {
  const { camera } = useThree();
  const { cameraPosition, cameraTarget, isTransitioning } = useNavigationStore();

  const targetPosition = useRef(new Vector3(...cameraPosition));
  const targetLookAt = useRef(new Vector3(...cameraTarget));
  const currentLookAt = useRef(new Vector3(...cameraTarget));

  // Update targets when navigation store changes
  useEffect(() => {
    targetPosition.current.set(...cameraPosition);
    targetLookAt.current.set(...cameraTarget);
  }, [cameraPosition, cameraTarget]);

  useFrame(() => {
    if (!enableDamping) {
      camera.position.copy(targetPosition.current);
      camera.lookAt(targetLookAt.current);
      return;
    }

    // Smooth camera movement
    const lerpFactor = isTransitioning
      ? dampingFactor * 2 // Faster during transitions
      : dampingFactor;

    camera.position.lerp(targetPosition.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default CameraController;
