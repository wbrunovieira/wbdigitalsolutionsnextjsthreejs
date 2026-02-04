/**
 * Visited Experiences Store - Tracks which 3D experiences the user has visited
 * Persists to localStorage so visits survive page reloads
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ExperienceType } from '@/components/3d-experience/constants';

interface VisitedExperiencesState {
  visitedExperiences: ExperienceType[];
  markVisited: (id: ExperienceType) => void;
}

export const useVisitedExperiencesStore = create<VisitedExperiencesState>()(
  persist(
    (set) => ({
      visitedExperiences: [],

      markVisited: (id) =>
        set((state) => {
          if (state.visitedExperiences.includes(id)) return state;
          return { visitedExperiences: [...state.visitedExperiences, id] };
        }),
    }),
    {
      name: 'visited-experiences',
    }
  )
);
