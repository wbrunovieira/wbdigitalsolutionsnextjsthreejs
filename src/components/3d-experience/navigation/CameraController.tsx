/**
 * CameraController - Manages camera transitions and positioning
 */

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useNavigationStore } from '@/stores/navigationStore';

const HUB_RADIUS = 15;
const HUB_HEIGHT = 8;

interface CameraControllerProps {
  enableDamping?: boolean;
  dampingFactor?: number;
}

export function CameraController({
  enableDamping = true,
  dampingFactor = 0.05,
}: CameraControllerProps) {
  const { camera } = useThree();
  const {
    cameraPosition,
    cameraTarget,
    isTransitioning,
    currentLocation,
    hubOrbitAngle,
  } = useNavigationStore();

  const targetPosition = useRef(new Vector3(...cameraPosition));
  const targetLookAt = useRef(new Vector3(...cameraTarget));
  const currentLookAt = useRef(new Vector3(...cameraTarget));

  // Update targets when navigation store changes
  useEffect(() => {
    if (currentLocation === 'hub') {
      // Calculate orbital position from angle
      const x = HUB_RADIUS * Math.sin(hubOrbitAngle);
      const z = HUB_RADIUS * Math.cos(hubOrbitAngle);
      targetPosition.current.set(x, HUB_HEIGHT, z);
      targetLookAt.current.set(0, 0, 0);
    } else {
      targetPosition.current.set(...cameraPosition);
      targetLookAt.current.set(...cameraTarget);
    }
  }, [cameraPosition, cameraTarget, currentLocation, hubOrbitAngle]);

  useFrame(() => {
    if (!enableDamping) {
      camera.position.copy(targetPosition.current);
      camera.lookAt(targetLookAt.current);
      return;
    }

    // Smooth camera movement
    const lerpFactor = isTransitioning
      ? dampingFactor * 2
      : dampingFactor;

    camera.position.lerp(targetPosition.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default CameraController;
