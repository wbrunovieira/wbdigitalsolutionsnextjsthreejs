/**
 * GuidedTourOverlay - Narration overlay for the guided tour
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useGuidedTourStore } from '@/stores/guidedTourStore';
import { useNavigationStore } from '@/stores/navigationStore';
import { COLORS } from '../constants';
import { useExperienceLanguage } from '../contexts';

export function GuidedTourOverlay() {
  const {
    isActive,
    currentStepIndex,
    steps,
    nextStep,
    prevStep,
    endTour,
  } = useGuidedTourStore();
  const { isMobile } = useNavigationStore();
  const { t } = useExperienceLanguage();

  if (!isActive) return null;

  const currentStep = steps[currentStepIndex];
  if (!currentStep) return null;

  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const title = t.tourTexts[currentStep.title] || currentStep.title;
  const description = t.tourTexts[currentStep.description] || currentStep.description;

  return (
    <AnimatePresence>
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed',
          bottom: isMobile ? '20px' : '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: isMobile ? 'calc(100% - 32px)' : '560px',
          maxWidth: '560px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: `1px solid ${COLORS.purple}40`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px ${COLORS.purple}20`,
            overflow: 'hidden',
          }}
        >
          {/* Progress bar */}
          <div
            style={{
              height: '3px',
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.yellow})`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          {/* Content */}
          <div style={{ padding: isMobile ? '16px' : '24px' }}>
            {/* Title */}
            <h3
              style={{
                color: COLORS.white,
                fontSize: isMobile ? '18px' : '22px',
                fontWeight: 700,
                margin: 0,
                marginBottom: '8px',
              }}
            >
              {title}
            </h3>

            {/* Description */}
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: isMobile ? '13px' : '15px',
                margin: 0,
                marginBottom: '20px',
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>

            {/* Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Step counter */}
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '13px',
                }}
              >
                {currentStepIndex + 1} / {steps.length}
              </span>

              {/* Navigation buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Previous */}
                <button
                  onClick={prevStep}
                  disabled={isFirstStep}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    color: isFirstStep ? 'rgba(255, 255, 255, 0.2)' : COLORS.white,
                    fontSize: '13px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    cursor: isFirstStep ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  {t.tourPrev}
                </button>

                {/* Next / End Tour */}
                <button
                  onClick={isLastStep ? endTour : nextStep}
                  style={{
                    background: isLastStep
                      ? `linear-gradient(135deg, ${COLORS.yellow} 0%, #e6a33e 100%)`
                      : `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.darkPurple} 100%)`,
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    color: isLastStep ? '#000' : COLORS.white,
                    fontSize: '13px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: isLastStep
                      ? `0 4px 16px ${COLORS.yellow}40`
                      : `0 4px 16px ${COLORS.purple}40`,
                  }}
                >
                  {isLastStep ? t.tourEnd : t.tourNext}
                  {!isLastStep && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>

                {/* Close button */}
                <button
                  onClick={endTour}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GuidedTourOverlay;
