import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type PhilosophySection = 'mission' | 'vision' | 'values';

const SECTION_ORDER: PhilosophySection[] = ['mission', 'vision', 'values'];
const SECTION_INTERVAL_MS = 5000;
const TRANSITION_MS = 600;
const SPRING_STRENGTH = 8;

export interface PhilosophyAnimation {
  position: number;
  opacity: number;
  scale: number;
  rotation: number;
}

/**
 * Rotates the philosophy screen between mission/vision/values and drives the
 * slide-out / slide-in spring values used by the content group.
 */
export const usePhilosophyRotation = () => {
  const [currentSection, setCurrentSection] = useState<PhilosophySection>('mission');
  const [animationPhase, setAnimationPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');
  const animationRef = useRef<PhilosophyAnimation>({
    position: 0,
    opacity: 1,
    scale: 1,
    rotation: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase('exiting');

      setTimeout(() => {
        setCurrentSection((prev) => SECTION_ORDER[(SECTION_ORDER.indexOf(prev) + 1) % SECTION_ORDER.length]);
        setAnimationPhase('entering');

        setTimeout(() => setAnimationPhase('visible'), TRANSITION_MS);
      }, TRANSITION_MS);
    }, SECTION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const animation = animationRef.current;
    const step = delta * SPRING_STRENGTH;

    if (animationPhase === 'exiting') {
      // Slide out to the left with scale down and fade
      animation.position = THREE.MathUtils.lerp(animation.position, -2, step);
      animation.opacity = THREE.MathUtils.lerp(animation.opacity, 0, step);
      animation.scale = THREE.MathUtils.lerp(animation.scale, 0.7, step);
      animation.rotation = THREE.MathUtils.lerp(animation.rotation, -0.3, step);
    } else if (animationPhase === 'entering') {
      // Start from the right, slide in with scale up
      if (animation.position > 1.5) {
        animation.position = 2;
      }
      animation.position = THREE.MathUtils.lerp(animation.position, 0, step);
      animation.opacity = THREE.MathUtils.lerp(animation.opacity, 1, step);
      animation.scale = THREE.MathUtils.lerp(animation.scale, 1, step);
      animation.rotation = THREE.MathUtils.lerp(animation.rotation, 0, step);
    } else {
      // Visible state - subtle floating animation
      animation.position = Math.sin(time * 0.5) * 0.05;
      animation.opacity = 1;
      animation.scale = 1 + Math.sin(time * 0.8) * 0.02;
      animation.rotation = 0;
    }
  });

  return { currentSection, animationRef };
};
