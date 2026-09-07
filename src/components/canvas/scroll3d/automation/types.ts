import { HeroRefs } from '../heroRefs';

export type Keyframe = { pos: [number, number, number]; scale: number };

export type AutomationRefs = HeroRefs<Keyframe>;
