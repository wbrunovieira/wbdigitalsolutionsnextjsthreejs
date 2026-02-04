/**
 * Navigation Store - Manages navigation state for the 3D Experience Platform
 */

import { create } from 'zustand';
import { ExperienceType } from '@/components/3d-experience/constants';

interface NavigationState {
  // Location
  currentLocation: 'hub' | 'experience';
  currentExperience: ExperienceType | null;

  // Transition state
  isTransitioning: boolean;

  // Camera
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  hubOrbitAngle: number;

  // Hotspots
  hoveredHotspot: string | null;

  // Device
  isMobile: boolean;

  // Actions
  setLocation: (location: 'hub' | 'experience') => void;
  setExperience: (exp: ExperienceType | null) => void;
  startTransition: () => void;
  endTransition: () => void;
  setHoveredHotspot: (id: string | null) => void;
  setCameraPosition: (pos: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setHubOrbitAngle: (angle: number) => void;
  setIsMobile: (isMobile: boolean) => void;
  reset: () => void;
}

const initialState = {
  currentLocation: 'hub' as const,
  currentExperience: null,
  isTransitioning: false,
  cameraPosition: [0, 8, 15] as [number, number, number],
  cameraTarget: [0, 0, 0] as [number, number, number],
  hubOrbitAngle: 0,
  hoveredHotspot: null,
  isMobile: false,
};

export const useNavigationStore = create<NavigationState>((set) => ({
  ...initialState,

  setLocation: (location) => set({ currentLocation: location }),

  setExperience: (exp) => set({ currentExperience: exp }),

  startTransition: () => set({ isTransitioning: true }),

  endTransition: () => set({ isTransitioning: false }),

  setHoveredHotspot: (id) => set({ hoveredHotspot: id }),

  setCameraPosition: (pos) => set({ cameraPosition: pos }),

  setCameraTarget: (target) => set({ cameraTarget: target }),

  setHubOrbitAngle: (angle) => set({ hubOrbitAngle: angle }),

  setIsMobile: (isMobile) => set({ isMobile }),

  reset: () => set(initialState),
}));
