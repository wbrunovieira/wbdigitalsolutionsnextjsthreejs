/**
 * TransitionOverlay - Fade overlay during scene transitions
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/stores/navigationStore';
import { COLORS, TRANSITION } from '@/components/3d-experience/constants';

interface TransitionOverlayProps {
  color?: string;
}

export function TransitionOverlay({ color = COLORS.darkPurple }: TransitionOverlayProps) {
  const { isTransitioning } = useNavigationStore();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShowOverlay(true);
      // Hide overlay after fade duration
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, TRANSITION.fadeDuration * 1000 + 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION.fadeDuration }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: color,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default TransitionOverlay;
