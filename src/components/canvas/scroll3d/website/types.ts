import { MutableRefObject } from 'react';
import { HeroRefs } from '../heroRefs';

export type Keyframe = { pos: [number, number, number]; rotY: number; scale: number };

export interface WebsiteRefs extends HeroRefs<Keyframe> {
  /** Normalised pointer (-1..1); the laptop tilts toward it in the hero band. */
  pointer: MutableRefObject<{ x: number; y: number }>;
}
