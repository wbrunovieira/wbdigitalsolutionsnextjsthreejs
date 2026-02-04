/**
 * useExperienceNavigation - Hook for managing navigation between experiences
 */

import { useCallback } from 'react';
import { useNavigationStore } from '@/stores/navigationStore';
import { ExperienceType, CAMERA_POSITIONS } from '@/components/3d-experience/constants';
import { EXPERIENCES } from '@/components/3d-experience/constants/experiences';

interface UseExperienceNavigationReturn {
  // State
  currentLocation: 'hub' | 'experience';
  currentExperience: ExperienceType | null;
  isTransitioning: boolean;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];

  // Actions
  navigateToExperience: (experience: ExperienceType) => void;
  navigateToHub: () => void;
  isInHub: boolean;
  isInExperience: boolean;
}

export function useExperienceNavigation(): UseExperienceNavigationReturn {
  const {
    currentLocation,
    currentExperience,
    isTransitioning,
    cameraPosition,
    cameraTarget,
    setLocation,
    setExperience,
    startTransition,
    endTransition,
    setCameraPosition,
    setCameraTarget,
  } = useNavigationStore();

  const navigateToExperience = useCallback(
    (experience: ExperienceType) => {
      if (isTransitioning) return;

      const experienceConfig = EXPERIENCES[experience];
      if (!experienceConfig) return;

      startTransition();

      // Set camera to experience position
      setCameraPosition(experienceConfig.camera.position);
      setCameraTarget(experienceConfig.camera.target);

      // Update location state
      setLocation('experience');
      setExperience(experience);

      // End transition after animation
      setTimeout(() => {
        endTransition();
      }, 1500); // Match TRANSITION.duration from constants
    },
    [
      isTransitioning,
      startTransition,
      setCameraPosition,
      setCameraTarget,
      setLocation,
      setExperience,
      endTransition,
    ]
  );

  const navigateToHub = useCallback(() => {
    if (isTransitioning) return;

    startTransition();

    // Set camera to hub position
    setCameraPosition(CAMERA_POSITIONS.hub.position);
    setCameraTarget(CAMERA_POSITIONS.hub.target);

    // Update location state
    setLocation('hub');
    setExperience(null);

    // End transition after animation
    setTimeout(() => {
      endTransition();
    }, 1500);
  }, [
    isTransitioning,
    startTransition,
    setCameraPosition,
    setCameraTarget,
    setLocation,
    setExperience,
    endTransition,
  ]);

  return {
    currentLocation,
    currentExperience,
    isTransitioning,
    cameraPosition,
    cameraTarget,
    navigateToExperience,
    navigateToHub,
    isInHub: currentLocation === 'hub',
    isInExperience: currentLocation === 'experience',
  };
}

export default useExperienceNavigation;
