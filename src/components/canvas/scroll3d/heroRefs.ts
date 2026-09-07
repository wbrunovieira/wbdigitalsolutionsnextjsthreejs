import { MutableRefObject } from 'react';
import { Vector3 } from 'three';

/** Scroll band where the mouse-driven hero behaviour fades into the choreography. */
export const HERO_ZONE = 0.06;
export const HERO_END = 0.16;

export type Pose = { x: number; y: number; z: number; s: number };

/** Refs shared between a hero's swarm and its model, written from useFrame. */
export interface HeroRefs<K> {
  progress: MutableRefObject<number>;
  target: MutableRefObject<Vector3>;
  pose: MutableRefObject<Pose>;
  kf: K[]; // pose table for the current variant
}
