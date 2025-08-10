import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/contexts/TranslationContext';

interface MouseMoveTutorialProps {
  onInteraction?: () => void;
}

const MouseMoveTutorial: React.FC<MouseMoveTutorialProps> = ({ onInteraction }) => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Always show on load, hide after 12 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  // Hide on mouse movement
  useEffect(() => {
    if (!isVisible) return;
    
    let moveCount = 0;
    const handleMouseMove = () => {
      moveCount++;
      // Hide after user moves mouse 5 times
      if (moveCount > 5) {
        setIsVisible(false);
        onInteraction?.();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
          {/* Mouse cursor with movement animation */}
          <motion.div
            animate={{
              x: [0, 100, 100, -100, -100, 0],
              y: [0, -50, 50, 50, -50, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Mouse icon */}
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
                {/* White background circle */}
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="white"
                  opacity="0.95"
                />
                
                {/* Mouse/cursor icon */}
                <g transform="translate(2, 2)">
                  <path
                    d="M10 2C7.79086 2 6 3.79086 6 6V14C6 16.2091 7.79086 18 10 18C12.2091 18 14 16.2091 14 14V6C14 3.79086 12.2091 2 10 2Z"
                    fill="#792990"
                    stroke="#350545"
                    strokeWidth="0.5"
                  />
                  
                  {/* Mouse wheel */}
                  <rect
                    x="9"
                    y="6"
                    width="2"
                    height="4"
                    rx="1"
                    fill="white"
                    opacity="0.8"
                  />
                </g>
              </svg>

              {/* Motion trails */}
              <motion.div
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-purple-400 blur-xl" />
              </motion.div>

              {/* Particle indicators */}
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#792990', '#350545', '#aaa6c3', '#ffb947', '#792990'][i],
                      transform: `rotate(${angle}deg) translateX(30px)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
          >
            <div className="bg-gradient-to-r from-[#792990] to-[#350545] backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                {t.mouseMoveTutorialText || "Move your mouse to interact with particles"}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  ✨
                </motion.span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MouseMoveTutorial;