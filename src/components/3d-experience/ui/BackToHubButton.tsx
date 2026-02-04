/**
 * BackToHubButton - Button to return to the hub from an experience
 */

import { motion } from 'framer-motion';
import { useExperienceNavigation } from '@/hooks/useExperienceNavigation';
import { COLORS } from '@/components/3d-experience/constants';

interface BackToHubButtonProps {
  label?: string;
}

export function BackToHubButton({ label = 'Voltar ao Hub' }: BackToHubButtonProps) {
  const { navigateToHub, isInExperience, isTransitioning } = useExperienceNavigation();

  if (!isInExperience) return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onClick={navigateToHub}
      disabled={isTransitioning}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        border: `1px solid ${COLORS.purple}`,
        borderRadius: '8px',
        color: COLORS.white,
        fontSize: '14px',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontWeight: 500,
        cursor: isTransitioning ? 'not-allowed' : 'pointer',
        opacity: isTransitioning ? 0.5 : 1,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!isTransitioning) {
          e.currentTarget.style.backgroundColor = COLORS.purple;
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </motion.button>
  );
}

export default BackToHubButton;
