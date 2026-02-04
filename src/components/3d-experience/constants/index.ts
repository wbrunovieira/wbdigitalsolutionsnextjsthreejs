/**
 * Constants for the 3D Experience Platform
 */

// Experience Types
export type ExperienceType =
  | 'learning'
  | 'product'
  | 'landing'
  | 'virtual-space'
  | 'sales-demo'
  | 'brand'
  | 'micro';

// Colors
export const COLORS = {
  purple: '#792990',
  darkPurple: '#350545',
  yellow: '#ffb947',
  blue: '#4a90e2',
  white: '#ffffff',
  black: '#000000',
  gray: '#2a2a2a',
  darkGray: '#1a1a1a',
} as const;

// Camera positions
export const CAMERA_POSITIONS = {
  hub: {
    position: [0, 8, 15] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 60,
  },
  experiences: {
    learning: {
      position: [5, 3, 5] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
      fov: 60,
    },
    product: {
      position: [6, 2, 6] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
      fov: 60,
    },
    'virtual-space': {
      position: [8, 5, 8] as [number, number, number],
      target: [0, 2, 0] as [number, number, number],
      fov: 60,
    },
    landing: {
      position: [0, 3, 8] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
      fov: 60,
    },
    'sales-demo': {
      position: [0, 4, 10] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
      fov: 60,
    },
    brand: {
      position: [5, 4, 8] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
      fov: 60,
    },
    micro: {
      position: [3, 2, 5] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
      fov: 60,
    },
  },
} as const;

// Transition settings
export const TRANSITION = {
  duration: 1.5,
  ease: 'power2.inOut',
  fadeDuration: 0.3,
} as const;

// Performance settings
export const PERFORMANCE = {
  mobile: {
    dpr: [1, 1.5] as [number, number],
    antialias: false,
    shadows: false,
  },
  desktop: {
    dpr: [1, 2] as [number, number],
    antialias: true,
    shadows: true,
  },
} as const;
