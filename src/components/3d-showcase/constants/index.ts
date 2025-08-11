/**
 * Constants for the 3D showcase environment
 */

// Colors
export const COLORS = {
  purple: '#792990',
  darkPurple: '#350545',
  yellow: '#ffb947',
  orange: '#ff8800',
  white: '#ffffff',
  black: '#000000',
  darkGray: '#1a1a1a',
  gray: '#2a2a2a',
  wallPurple: '#3d2f50',
  deskBrown: '#4a3f36',
  deskLegBrown: '#2a2520',
  codeGreen: '#00ff00',
  codeBackground: '#1e1e1e',
  codeComment: '#888',
} as const;

// Physics settings
export const PHYSICS = {
  gravity: [0, -9.81, 0] as [number, number, number],
  ball: {
    restitution: 0.35,
    friction: 0.15,
    mass: 0.8,
    linearDamping: 0.3,
    angularDamping: 0.2,
    radius: 0.3,
  },
} as const;

// Camera settings
export const CAMERA = {
  position: [8, 5, 8] as [number, number, number],
  fov: 60,
} as const;

// Lighting settings
export const LIGHTING = {
  ambient: {
    intensity: 0.8,
  },
  directional: {
    position: [5, 10, 5] as [number, number, number],
    intensity: 2,
    shadowMapSize: [2048, 2048] as [number, number],
  },
  points: [
    { position: [0, 8, 0], intensity: 2, color: COLORS.white },
    { position: [-5, 5, 5], intensity: 1, color: COLORS.yellow },
    { position: [5, 5, 5], intensity: 1, color: COLORS.purple },
  ],
} as const;

// Animation settings
export const ANIMATION = {
  typewriterSpeed: 30, // milliseconds per character
  ballDropDelays: [0, 500, 1000], // milliseconds
  particleRotationSpeed: 0.0003,
  particleFloatSpeed: 0.5,
} as const;

// Dimensions
export const DIMENSIONS = {
  room: {
    width: 20,
    height: 10,
    depth: 20,
  },
  window: {
    width: 8,
    height: 4,
  },
  monitor: {
    frame: [4, 2.5, 0.1] as [number, number, number],
    screen: [3.8, 2.3, 0.02] as [number, number, number],
  },
} as const;