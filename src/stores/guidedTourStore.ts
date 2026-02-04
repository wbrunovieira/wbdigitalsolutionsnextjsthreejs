/**
 * Guided Tour Store - Manages the guided tour state
 */

import { create } from 'zustand';
import { ExperienceType } from '@/components/3d-experience/constants';

export interface GuidedStep {
  id: string;
  title: string;
  description: string;
  location: 'hub' | ExperienceType;
  cameraPosition: [number, number, number];
  cameraTarget?: [number, number, number];
  highlightElement?: string;
  duration?: number; // For automatic mode (ms)
}

interface GuidedTourState {
  // State
  isActive: boolean;
  isAutomatic: boolean;
  currentStepIndex: number;
  steps: GuidedStep[];

  // Actions
  startTour: (automatic?: boolean) => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  setAutomatic: (auto: boolean) => void;
  setSteps: (steps: GuidedStep[]) => void;
}

// Default tour steps - hub-only tour showcasing each portal
const DEFAULT_STEPS: GuidedStep[] = [
  {
    id: 'welcome',
    title: 'tourWelcomeTitle',
    description: 'tourWelcomeDesc',
    location: 'hub',
    cameraPosition: [0, 12, 20],
    cameraTarget: [0, 0, 0],
    duration: 5000,
  },
  {
    id: 'portal-learning',
    title: 'tourPortalLearningTitle',
    description: 'tourPortalLearningDesc',
    location: 'hub',
    cameraPosition: [0, 4, -5],
    cameraTarget: [0, 2, -10],
    duration: 4000,
  },
  {
    id: 'portal-product',
    title: 'tourPortalProductTitle',
    description: 'tourPortalProductDesc',
    location: 'hub',
    cameraPosition: [3.5, 4, -3.5],
    cameraTarget: [7, 2, -7],
    duration: 4000,
  },
  {
    id: 'portal-landing',
    title: 'tourPortalLandingTitle',
    description: 'tourPortalLandingDesc',
    location: 'hub',
    cameraPosition: [5, 4, 0],
    cameraTarget: [10, 2, 0],
    duration: 4000,
  },
  {
    id: 'portal-virtual-space',
    title: 'tourPortalVirtualSpaceTitle',
    description: 'tourPortalVirtualSpaceDesc',
    location: 'hub',
    cameraPosition: [3.5, 4, 3.5],
    cameraTarget: [7, 2, 7],
    duration: 4000,
  },
  {
    id: 'portal-sales-demo',
    title: 'tourPortalSalesDemoTitle',
    description: 'tourPortalSalesDemoDesc',
    location: 'hub',
    cameraPosition: [0, 4, 5],
    cameraTarget: [0, 2, 10],
    duration: 4000,
  },
  {
    id: 'portal-brand',
    title: 'tourPortalBrandTitle',
    description: 'tourPortalBrandDesc',
    location: 'hub',
    cameraPosition: [-3.5, 4, 3.5],
    cameraTarget: [-7, 2, 7],
    duration: 4000,
  },
  {
    id: 'portal-micro',
    title: 'tourPortalMicroTitle',
    description: 'tourPortalMicroDesc',
    location: 'hub',
    cameraPosition: [-5, 4, 0],
    cameraTarget: [-10, 2, 0],
    duration: 4000,
  },
  {
    id: 'conclusion',
    title: 'tourConclusionTitle',
    description: 'tourConclusionDesc',
    location: 'hub',
    cameraPosition: [0, 8, 15],
    cameraTarget: [0, 0, 0],
    duration: 5000,
  },
];

export const useGuidedTourStore = create<GuidedTourState>((set, get) => ({
  isActive: false,
  isAutomatic: false,
  currentStepIndex: 0,
  steps: DEFAULT_STEPS,

  startTour: (automatic = false) =>
    set({
      isActive: true,
      isAutomatic: automatic,
      currentStepIndex: 0,
    }),

  endTour: () =>
    set({
      isActive: false,
      isAutomatic: false,
      currentStepIndex: 0,
    }),

  nextStep: () => {
    const { currentStepIndex, steps, endTour } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      endTour();
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (index) => {
    const { steps } = get();
    if (index >= 0 && index < steps.length) {
      set({ currentStepIndex: index });
    }
  },

  setAutomatic: (auto) => set({ isAutomatic: auto }),

  setSteps: (steps) => set({ steps }),
}));
