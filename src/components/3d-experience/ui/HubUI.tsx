/**
 * HubUI - Large sidebar menu for the Hub Central
 * Always-visible lateral panel below language selector with prominent action cards
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/stores/navigationStore';
import { useGuidedTourStore } from '@/stores/guidedTourStore';
import { useVisitedExperiencesStore } from '@/stores/visitedExperiencesStore';
import { COLORS } from '../constants';
import { EXPERIENCE_LIST } from '../constants/experiences';
import { useExperienceLanguage } from '../contexts';

// Large SVG icons for prominent buttons
function PlayIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}

function RotateIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6" />
      <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.yellow} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// Prominent action card button
function ActionCard({
  icon,
  label,
  sublabel,
  onClick,
  gradient,
  glowColor,
  accentColor,
  delay = 0,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onClick?: () => void;
  gradient: string;
  glowColor: string;
  accentColor: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        onClick={onClick}
        whileHover={onClick ? { scale: 1.04, x: -6 } : undefined}
        whileTap={onClick ? { scale: 0.97 } : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        style={{
          width: '100%',
          background: gradient,
          border: `1.5px solid ${accentColor}40`,
          borderRadius: '18px',
          padding: '22px 20px',
          color: COLORS.white,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          cursor: onClick ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'left',
          boxShadow: `0 4px 24px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={onClick ? (e) => {
          e.currentTarget.style.boxShadow = `0 8px 40px ${glowColor}, 0 0 25px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`;
          e.currentTarget.style.borderColor = accentColor;
        } : undefined}
        onMouseLeave={onClick ? (e) => {
          e.currentTarget.style.boxShadow = `0 4px 24px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`;
          e.currentTarget.style.borderColor = `${accentColor}40`;
        } : undefined}
      >
        {/* Decorative corner accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60px',
          height: '60px',
          background: `radial-gradient(circle at top left, ${accentColor}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${accentColor}30 0%, ${accentColor}10 100%)`,
          border: `1px solid ${accentColor}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            {label}
          </div>
          {sublabel && (
            <div style={{ fontSize: '13px', opacity: 0.55, fontWeight: 500, marginTop: '4px' }}>
              {sublabel}
            </div>
          )}
          {children}
        </div>

        {/* Arrow indicator for clickable cards */}
        {onClick && (
          <div style={{ opacity: 0.4, flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

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

  const progressPercent = (visitedCount / totalExperiences) * 100;
  const allExplored = visitedCount === totalExperiences;

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
                background: `rgba(53, 5, 69, 0.85)`,
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

      {/* Large sidebar panel - below language selector, right side */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          right: isMobile ? '8px' : '16px',
          top: isMobile ? '52px' : '64px',
          zIndex: 41,
          width: isMobile ? '250px' : '300px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        {/* Panel background */}
        <div
          style={{
            background: `linear-gradient(180deg, ${COLORS.darkPurple}e0 0%, ${COLORS.black}dd 100%)`,
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: `1px solid ${COLORS.purple}30`,
            boxShadow: `0 12px 48px rgba(0, 0, 0, 0.5), 0 0 40px ${COLORS.purple}10`,
            padding: isMobile ? '18px 14px' : '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '12px' : '14px',
          }}
        >
          {/* Panel header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            style={{
              paddingBottom: '10px',
              borderBottom: `1px solid ${COLORS.purple}25`,
              marginBottom: '2px',
            }}
          >
            <div style={{
              fontSize: isMobile ? '11px' : '12px',
              fontWeight: 600,
              color: COLORS.yellow,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              opacity: 0.9,
            }}>
              Hub Central
            </div>
          </motion.div>

          {/* Guided Tour - Primary action */}
          <ActionCard
            icon={<PlayIcon />}
            label={t.guidedTour}
            sublabel={t.hubSubtitle}
            gradient={`linear-gradient(135deg, ${COLORS.purple}cc 0%, ${COLORS.darkPurple}ee 100%)`}
            glowColor={`${COLORS.purple}40`}
            accentColor={COLORS.yellow}
            delay={0.8}
            onClick={() => startTour(false)}
          />

          {/* Rotate */}
          <ActionCard
            icon={<RotateIcon />}
            label={t.rotate}
            sublabel="180°"
            gradient={`linear-gradient(135deg, ${COLORS.purple}20 0%, ${COLORS.darkPurple}cc 100%)`}
            glowColor={`${COLORS.purple}20`}
            accentColor={COLORS.purple}
            delay={0.9}
            onClick={() => setHubOrbitAngle(hubOrbitAngle + Math.PI)}
          />

          {/* Progress */}
          <ActionCard
            icon={<CompassIcon />}
            label={`${visitedCount}/${totalExperiences} ${t.explored}`}
            gradient={`linear-gradient(135deg, ${COLORS.darkPurple}90 0%, ${COLORS.black}cc 100%)`}
            glowColor={`${COLORS.purple}15`}
            accentColor={COLORS.purple}
            delay={1.0}
          >
            {/* Progress bar */}
            <div style={{
              width: '100%',
              height: '6px',
              background: `${COLORS.darkPurple}`,
              borderRadius: '3px',
              overflow: 'hidden',
              marginTop: '10px',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 1.3 }}
                style={{
                  height: '100%',
                  background: allExplored
                    ? COLORS.yellow
                    : `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.yellow})`,
                  borderRadius: '3px',
                  boxShadow: `0 0 12px ${COLORS.yellow}40`,
                }}
              />
            </div>
            {/* Completion badge */}
            {allExplored && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: COLORS.yellow,
                }}
              >
                <CheckIcon />
                100%
              </motion.div>
            )}
          </ActionCard>
        </div>
      </motion.div>
    </>
  );
}

export default HubUI;
