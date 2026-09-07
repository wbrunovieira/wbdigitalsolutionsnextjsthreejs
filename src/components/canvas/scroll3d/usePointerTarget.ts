import { MutableRefObject, RefObject, useEffect } from 'react';
import { RectAreaLight, Vector3 } from 'three';

interface Options {
  /** Normalised pointer (-1..1), for heroes that also tilt their model. */
  pointer?: MutableRefObject<{ x: number; y: number }>;
}

/** Mouse -> swarm target + rect-area light position (desktop only). */
export const usePointerTarget = (
  target: MutableRefObject<Vector3>,
  lightRef: RefObject<RectAreaLight>,
  isDesktop: boolean,
  { pointer }: Options = {},
) => {
  useEffect(() => {
    if (!isDesktop) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.set(x * 50, y * 30, 0);
      if (pointer) pointer.current = { x, y };
      if (lightRef.current) lightRef.current.position.copy(target.current);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isDesktop, target, lightRef, pointer]);
};
