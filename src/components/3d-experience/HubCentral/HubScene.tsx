/**
 * HubScene - Main scene component for the Hub Central
 */

import { useCallback } from 'react';
import { HubPlatform } from './HubPlatform';
import { HubLighting } from './HubLighting';
import { HubParticles } from './HubParticles';
import { CenterLogo } from './CenterLogo';
import { Portal } from './Portal';
import { EXPERIENCE_LIST } from '../constants/experiences';
import { ExperienceType, COLORS } from '../constants';
import { useExperienceNavigation } from '@/hooks/useExperienceNavigation';
import { useNavigationStore } from '@/stores/navigationStore';
import { useExperienceLanguage } from '../contexts';
import { useVisitedExperiencesStore } from '@/stores/visitedExperiencesStore';

export function HubScene() {
  const { navigateToExperience, isInHub } = useExperienceNavigation();
  const { isMobile } = useNavigationStore();
  const { t } = useExperienceLanguage();
  const { visitedExperiences } = useVisitedExperiencesStore();

  const handleEnterExperience = useCallback(
    (experienceId: ExperienceType) => {
      navigateToExperience(experienceId);
    },
    [navigateToExperience]
  );

  // Don't render if not in hub
  if (!isInHub) return null;

  return (
    <group>
      {/* Lighting */}
      <HubLighting />

      {/* Platform base */}
      <HubPlatform />

      {/* Center logo */}
      <CenterLogo />

      {/* Ambient particles */}
      <HubParticles count={isMobile ? 250 : 500} />

      {/* All 7 portals */}
      {EXPERIENCE_LIST.map((experience, index) => (
        <Portal
          key={experience.id}
          experience={experience}
          onEnter={() => handleEnterExperience(experience.id)}
          translations={t}
          portalNumber={index + 1}
          isVisited={visitedExperiences.includes(experience.id)}
        />
      ))}

      {/* Fog for depth */}
      <fog attach="fog" args={[COLORS.darkPurple, 20, 50]} />
    </group>
  );
}

export default HubScene;
