/**
 * MobileControls - Touch-friendly navigation controls for mobile devices
 */

import { motion } from 'framer-motion';
import { useNavigationStore } from '@/stores/navigationStore';
import { useExperienceNavigation } from '@/hooks/useExperienceNavigation';
import { COLORS } from '../constants';
import { useExperienceLanguage } from '../contexts';

interface MobileControlsProps {
  showNavigation?: boolean;
}

export function MobileControls({ showNavigation = true }: MobileControlsProps) {
  const { isMobile } = useNavigationStore();
  const { navigateToHub, isInExperience, isTransitioning } = useExperienceNavigation();
  const { t } = useExperienceLanguage();

  if (!isMobile) return null;

  const buttonStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    border: `2px solid ${COLORS.purple}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.white,
    fontSize: '20px',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    touchAction: 'manipulation',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        gap: '16px',
        padding: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '30px',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Back to Hub button */}
      {showNavigation && isInExperience && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={navigateToHub}
          disabled={isTransitioning}
          style={{
            ...buttonStyle,
            opacity: isTransitioning ? 0.5 : 1,
          }}
          aria-label={t.backToHub}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </motion.button>
      )}

      {/* Info/Help button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        style={buttonStyle}
        aria-label={t.help}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </motion.button>

      {/* Fullscreen toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }}
        style={buttonStyle}
        aria-label={t.fullscreen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

export default MobileControls;
