import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/contexts/TranslationContext';

interface DragTutorialProps {
  onInteraction?: () => void;
}

const DragTutorial: React.FC<DragTutorialProps> = ({ onInteraction }) => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Always show on load, hide after 15 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Hide on any interaction
  useEffect(() => {
    if (!isVisible) return;
    
    const handleInteraction = () => {
      setIsVisible(false);
      onInteraction?.();
    };

    // Listen for click or touch events
    const handleClick = () => handleInteraction();
    
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('touchstart', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [isVisible, onInteraction]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
        >
          {/* Hand cursor animation */}
          <motion.div
            animate={{
              x: [-50, 50, -50],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Hand icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
              >
                {/* White background circle for better visibility */}
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="white"
                  opacity="0.95"
                />
                
                {/* Cursor/pointer icon */}
                <g transform="translate(2, 2)">
                  <path
                    d="M7 2L7 17L11.5 12.5L14.5 19L16.5 18L13.5 11.5L19 11.5L7 2Z"
                    fill="#792990"
                    stroke="#350545"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                  
                  {/* Subtle shadow */}
                  <path
                    d="M7 2L7 17L11.5 12.5L14.5 19L16.5 18L13.5 11.5L19 11.5L7 2Z"
                    fill="rgba(0,0,0,0.2)"
                    transform="translate(0.5, 0.5)"
                  />
                </g>
                
                {/* Click indicator dots */}
                <circle cx="12" cy="12" r="1" fill="#792990" opacity="0.6">
                  <animate 
                    attributeName="r" 
                    values="1;2;1" 
                    dur="2s" 
                    repeatCount="indefinite"
                  />
                  <animate 
                    attributeName="opacity" 
                    values="0.6;0.2;0.6" 
                    dur="2s" 
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Double arrow indicator below */}
              <motion.div
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  x: [-3, 3, -3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                  <path
                    d="M5 10L10 5M5 10L10 15M35 10L30 5M35 10L30 15M10 10H30"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
          >
            <div className="bg-gradient-to-r from-[#792990] to-[#350545] backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline">
                  <path
                    d="M12 2L15 9L22 10L17 15L18 22L12 18L6 22L7 15L2 10L9 9L12 2Z"
                    fill="currentColor"
                    opacity="0.8"
                  />
                </svg>
                {t.dragTutorialText || "Click and drag to interact"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline">
                  <path
                    d="M12 2L15 9L22 10L17 15L18 22L12 18L6 22L7 15L2 10L9 9L12 2Z"
                    fill="currentColor"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DragTutorial;