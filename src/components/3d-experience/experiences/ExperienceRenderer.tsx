/**
 * ExperienceRenderer - Renders the appropriate experience based on current state
 */

import { useNavigationStore } from '@/stores/navigationStore';
import { EXPERIENCES } from '../constants/experiences';
import { ExperiencePlaceholder } from './ExperiencePlaceholder';
import { VirtualSpace } from './VirtualSpace';
import { useExperienceLanguage } from '../contexts';

export function ExperienceRenderer() {
  const { currentLocation, currentExperience } = useNavigationStore();
  const { t } = useExperienceLanguage();

  // Only render when in an experience
  if (currentLocation !== 'experience' || !currentExperience) {
    return null;
  }

  const experience = EXPERIENCES[currentExperience];
  if (!experience) return null;

  // For now, all experiences use the placeholder
  // In future phases, this will switch to the actual experience component
  switch (currentExperience) {
    case 'learning':
      // TODO: Phase 5 - LearningExperience
      return <ExperiencePlaceholder experience={experience} translations={t} />;

    case 'product':
      // TODO: Phase 4 - ProductShowcase
      return <ExperiencePlaceholder experience={experience} translations={t} />;

    case 'virtual-space':
      return <VirtualSpace />;

    case 'landing':
      // TODO: Phase 6+ - InteractiveLanding
      return <ExperiencePlaceholder experience={experience} translations={t} />;

    case 'sales-demo':
      // TODO: Phase 6+ - SalesDemo
      return <ExperiencePlaceholder experience={experience} translations={t} />;

    case 'brand':
      // TODO: Phase 6+ - BrandExperience
      return <ExperiencePlaceholder experience={experience} translations={t} />;

    case 'micro':
      // TODO: Phase 6+ - MicroExperience
      return <ExperiencePlaceholder experience={experience} translations={t} />;

    default:
      return <ExperiencePlaceholder experience={experience} translations={t} />;
  }
}

export default ExperienceRenderer;
