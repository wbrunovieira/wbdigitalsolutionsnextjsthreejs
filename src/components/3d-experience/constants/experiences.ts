/**
 * Experience definitions and configurations
 */

import { ExperienceType, COLORS, CAMERA_POSITIONS } from './index';

export interface Experience {
  id: ExperienceType;
  name: string;
  description: string;
  icon: string;
  color: string;
  portalPosition: [number, number, number];
  portalRotation: [number, number, number];
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  };
}

export const EXPERIENCES: Record<ExperienceType, Experience> = {
  learning: {
    id: 'learning',
    name: 'Learning',
    description: 'Conhecimento estruturado em camadas interativas',
    icon: '📚',
    color: COLORS.purple,
    portalPosition: [0, 0.2, -10],
    portalRotation: [0, 0, 0],
    camera: CAMERA_POSITIONS.experiences.learning,
  },
  product: {
    id: 'product',
    name: 'Product',
    description: 'Produto 3D explorável com hotspots',
    icon: '🎯',
    color: COLORS.yellow,
    portalPosition: [7, 0.2, -7],
    portalRotation: [0, -Math.PI / 4, 0],
    camera: CAMERA_POSITIONS.experiences.product,
  },
  landing: {
    id: 'landing',
    name: 'Landing',
    description: 'Página interativa em 3D',
    icon: '🚀',
    color: COLORS.blue,
    portalPosition: [10, 0.2, 0],
    portalRotation: [0, -Math.PI / 2, 0],
    camera: CAMERA_POSITIONS.experiences.landing,
  },
  'virtual-space': {
    id: 'virtual-space',
    name: 'Virtual Space',
    description: 'Sala navegável com conteúdos distribuídos',
    icon: '🏢',
    color: COLORS.purple,
    portalPosition: [7, 0.2, 7],
    portalRotation: [0, (-Math.PI * 3) / 4, 0],
    camera: CAMERA_POSITIONS.experiences['virtual-space'],
  },
  'sales-demo': {
    id: 'sales-demo',
    name: 'Sales Demo',
    description: 'Demo interativa para times de venda',
    icon: '💼',
    color: COLORS.yellow,
    portalPosition: [0, 0.2, 10],
    portalRotation: [0, Math.PI, 0],
    camera: CAMERA_POSITIONS.experiences['sales-demo'],
  },
  brand: {
    id: 'brand',
    name: 'Brand',
    description: 'Storytelling visual imersivo',
    icon: '✨',
    color: COLORS.blue,
    portalPosition: [-7, 0.2, 7],
    portalRotation: [0, (Math.PI * 3) / 4, 0],
    camera: CAMERA_POSITIONS.experiences.brand,
  },
  micro: {
    id: 'micro',
    name: 'Micro',
    description: 'Micro experiência de impacto',
    icon: '⚡',
    color: COLORS.purple,
    portalPosition: [-10, 0.2, 0],
    portalRotation: [0, Math.PI / 2, 0],
    camera: CAMERA_POSITIONS.experiences.micro,
  },
};

export const EXPERIENCE_LIST = Object.values(EXPERIENCES);
