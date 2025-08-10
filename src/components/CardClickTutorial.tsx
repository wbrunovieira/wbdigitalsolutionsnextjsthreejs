import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/contexts/TranslationContext';
import { FaHandPointer } from 'react-icons/fa';

interface CardClickTutorialProps {
  onInteraction?: () => void;
}

const CardClickTutorial: React.FC<CardClickTutorialProps> = ({ onInteraction }) => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Always show on load, hide after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Hide on any click
  useEffect(() => {
    if (!isVisible) return;
    
    const handleClick = () => {
      setIsVisible(false);
      onInteraction?.();
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
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
          {/* Animated pointer */}
          <motion.div
            animate={{
              x: [-150, -50, 50, 150, -150],
              y: [0, -20, 20, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Pointer cursor */}
            <motion.div
              animate={{ scale: [1, 0.95, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="relative">
                {/* White background circle */}
                <div className="absolute inset-0 bg-white rounded-full opacity-95 shadow-2xl" />
                
                {/* Hand pointer icon */}
                <div className="relative p-6">
                  <FaHandPointer 
                    size={48}
                    className="text-[#792990] transform rotate-[-10deg]"
                  />
                </div>

                {/* Click effect circles */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#792990] rounded-full"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ 
                    scale: [0.8, 1.3, 1.5],
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 border-2 border-[#792990] rounded-full"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ 
                    scale: [0.8, 1.3, 1.5],
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5
                  }}
                />
              </div>

              {/* Click indicator text */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold whitespace-nowrap"
              >
                Click!
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2"
          >
            <div className="bg-gradient-to-r from-[#792990] to-[#350545] backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  👆
                </motion.span>
                {t.cardClickTutorialText || "Click on each card to explore our services"}
                <motion.span
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                >
                  💡
                </motion.span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardClickTutorial;