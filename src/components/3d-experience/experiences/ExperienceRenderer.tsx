/**
 * ExperienceRenderer - Renders the appropriate experience based on current state
 */

import { useNavigationStore } from '@/stores/navigationStore';
import { EXPERIENCES } from '../constants/experiences';
import { ExperiencePlaceholder } from './ExperiencePlaceholder';

export function ExperienceRenderer() {
  const { currentLocation, currentExperience } = useNavigationStore();

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
      return <ExperiencePlaceholder experience={experience} />;

    case 'product':
      // TODO: Phase 4 - ProductShowcase
      return <ExperiencePlaceholder experience={experience} />;

    case 'virtual-space':
      // TODO: Phase 3 - VirtualSpace
      return <ExperiencePlaceholder experience={experience} />;

    case 'landing':
      // TODO: Phase 6+ - InteractiveLanding
      return <ExperiencePlaceholder experience={experience} />;

    case 'sales-demo':
      // TODO: Phase 6+ - SalesDemo
      return <ExperiencePlaceholder experience={experience} />;

    case 'brand':
      // TODO: Phase 6+ - BrandExperience
      return <ExperiencePlaceholder experience={experience} />;

    case 'micro':
      // TODO: Phase 6+ - MicroExperience
      return <ExperiencePlaceholder experience={experience} />;

    default:
      return <ExperiencePlaceholder experience={experience} />;
  }
}

export default ExperienceRenderer;
