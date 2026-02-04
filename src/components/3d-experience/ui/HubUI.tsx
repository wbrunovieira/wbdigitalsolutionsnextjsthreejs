/**
 * HubUI - Overlay UI for the Hub Central
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/stores/navigationStore';
import { useGuidedTourStore } from '@/stores/guidedTourStore';
import { useVisitedExperiencesStore } from '@/stores/visitedExperiencesStore';
import { COLORS } from '../constants';
import { EXPERIENCE_LIST } from '../constants/experiences';
import { useExperienceLanguage } from '../contexts';

export function HubUI() {
  const { currentLocation, isMobile, hubOrbitAngle, setHubOrbitAngle } = useNavigationStore();
  const { startTour, isActive: isTourActive } = useGuidedTourStore();
  const { visitedExperiences } = useVisitedExperiencesStore();
  const { t } = useExperienceLanguage();
  const totalExperiences = EXPERIENCE_LIST.length;
  const visitedCount = visitedExperiences.length;
  const [showWelcome, setShowWelcome] = useState(true);

  const isInHub = currentLocation === 'hub';

  // Auto-hide welcome after delay
  useEffect(() => {
    if (isInHub && showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isInHub, showWelcome]);

  // Show welcome when returning to hub
  useEffect(() => {
    if (isInHub) {
      setShowWelcome(true);
    }
  }, [isInHub]);

  if (!isInHub || isTourActive) return null;

  return (
    <>
      {/* Welcome overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: isMobile ? '60px' : '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 40,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: isMobile ? '16px 20px' : '20px 30px',
                borderRadius: '12px',
                border: `1px solid ${COLORS.purple}`,
                boxShadow: `0 0 30px ${COLORS.purple}40`,
              }}
            >
              <h2
                style={{
                  color: COLORS.white,
                  fontSize: isMobile ? '16px' : '24px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: '8px',
                }}
              >
                {t.hubTitle}
              </h2>
              <p
                style={{
                  color: COLORS.white,
                  fontSize: isMobile ? '11px' : '14px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  opacity: 0.8,
                  margin: 0,
                  maxWidth: '400px',
                }}
              >
                {t.hubSubtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation hint at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          position: 'fixed',
          bottom: isMobile ? '100px' : '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        {/* Start tour button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => startTour(false)}
          style={{
            background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.darkPurple} 100%)`,
            border: 'none',
            borderRadius: '8px',
            padding: isMobile ? '10px 16px' : '12px 24px',
            color: COLORS.white,
            fontSize: isMobile ? '12px' : '14px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: `0 4px 20px ${COLORS.purple}40`,
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
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
          </svg>
          {t.guidedTour}
        </motion.button>

        {/* Rotate button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setHubOrbitAngle(hubOrbitAngle + Math.PI)}
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: `1px solid ${COLORS.purple}`,
            borderRadius: '8px',
            padding: isMobile ? '10px 16px' : '12px 24px',
            color: COLORS.white,
            fontSize: isMobile ? '12px' : '14px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(10px)',
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
            <path d="M21.5 2v6h-6" />
            <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
          </svg>
          {t.rotate}
        </motion.button>

        {/* Progress indicator */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            padding: isMobile ? '8px 12px' : '10px 16px',
            borderRadius: '8px',
            color: COLORS.white,
            fontSize: isMobile ? '11px' : '12px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            minWidth: isMobile ? '120px' : '140px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: visitedCount === totalExperiences ? '#4ade80' : COLORS.yellow, fontWeight: 700 }}>
              {visitedCount}/{totalExperiences}
            </span>
            {t.explored}
          </div>
          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(visitedCount / totalExperiences) * 100}%`,
                height: '100%',
                background: visitedCount === totalExperiences
                  ? '#4ade80'
                  : `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.yellow})`,
                borderRadius: '2px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default HubUI;
