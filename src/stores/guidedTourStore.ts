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

// Default tour steps (can be customized)
const DEFAULT_STEPS: GuidedStep[] = [
  {
    id: 'intro-welcome',
    title: 'Bem-vindo',
    description:
      'Este é o Hub de Experiências 3D. Cada portal representa uma forma diferente de apresentar conteúdo.',
    location: 'hub',
    cameraPosition: [0, 12, 20],
    cameraTarget: [0, 0, 0],
    duration: 5000,
  },
  {
    id: 'intro-hub',
    title: 'O Hub Central',
    description:
      'O ponto de partida. De aqui, seu cliente pode explorar diferentes experiências.',
    location: 'hub',
    cameraPosition: [0, 8, 15],
    cameraTarget: [0, 0, 0],
    duration: 4000,
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
