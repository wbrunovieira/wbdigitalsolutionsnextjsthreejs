export type Keyframe = {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
};

export type TargetPose = { x: number; y: number; z: number; rx: number; ry: number; rz: number; s: number };

// One stop per section (Hero -> Portal -> Tags -> ToolBox -> Carousel).
export const KEYFRAMES: Keyframe[] = [
  { pos: [4.5, -1.0, 0], rot: [0, -0.35, -0.05], scale: 1.8 }, // hero (right)
  { pos: [-12.0, 0.4, 1], rot: [0.05, -0.35, 0], scale: 0.9 }, // portal: far left (edge) + facing front, half size
  { pos: [0, 0, 0], rot: [0.05, -0.35, 0], scale: 1.2 },       // after portal: centered behind text, a bit bigger
  { pos: [5.0, 1.0, -2], rot: [0.25, 1.0, 0.1], scale: 1.6 },  // right-up, angled
  { pos: [0, -4, 0], rot: [0.05, -0.35, 0], scale: 1.0 }, // apple cards: parked low in the gap
  { pos: [0, -9, 0], rot: [0.05, -0.35, 0], scale: 0.85 }, // newsletter: sink further down so it clears the card
];

// Mobile (<=lg) pose table — narrow viewport, so keep x~0 and use z (dolly) + scale.
export const KEYFRAMES_MOBILE: Keyframe[] = [
  { pos: [0, -1.6, -1.0], rot: [-0.04, -0.30, -0.06], scale: 1.55 }, // hero: centered, lower
  { pos: [-1.2, 0.2, -3.0], rot: [0.05, -0.45, 0], scale: 1.05 },    // portal: slight left, back
  { pos: [0, 0.0, -1.5], rot: [0.05, -0.30, 0], scale: 1.2 },        // tags: centered behind text
  { pos: [1.0, 0.8, -2.5], rot: [0.22, 0.85, 0.08], scale: 1.15 },   // toolbox: nudged right, angled
  { pos: [0, -3.5, -2.0], rot: [0.05, -0.30, 0], scale: 0.7 },       // apple cards: small, low
  { pos: [0, -7.5, -2.0], rot: [0.05, -0.30, 0], scale: 0.55 },      // newsletter: sink further down
];

// World units the model rises per scroll pixel while a section is on screen.
// ~0.03 ~ 1:1 with the page on desktop; mobile is gentler (taller sections, closer cam).
export const GLUE = 0.03;
export const GLUE_MOBILE = 0.018;

export const CAMERA_DESKTOP = { position: [20, 3, 25] as [number, number, number], fov: 45 };
export const CAMERA_MOBILE = { position: [20, 4, 26] as [number, number, number], fov: 40 };
