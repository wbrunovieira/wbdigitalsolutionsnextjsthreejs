import { useEffect, useState } from 'react';
import { codeSnippets, ServiceType } from './data/codeSnippets';
import { ANIMATION } from './constants';

const POINTER_TIMEOUT_MS = 10000;

/**
 * Drives the office scene: which desk is active, the typewriter code display
 * and when the onboarding pointer hands fade out.
 */
export const useOfficeState = () => {
  const [activeButton, setActiveButton] = useState<ServiceType>('websites');
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showPointers, setShowPointers] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Typewriter effect for code display
  useEffect(() => {
    const targetCode = codeSnippets[activeButton];
    if (currentCharIndex < targetCode.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(targetCode.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, ANIMATION.typewriterSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, activeButton]);

  // Reset animation when button changes
  useEffect(() => {
    setDisplayedCode('');
    setCurrentCharIndex(0);
    // Hide pointers after first interaction
    if (!hasInteracted && activeButton !== 'websites') {
      setHasInteracted(true);
      setShowPointers(false);
    }
  }, [activeButton, hasInteracted]);

  // Hide pointers after 10 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPointers(false);
    }, POINTER_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  // Listen for navigation events from the mobile desk shortcuts
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveButton(event.detail as ServiceType);
    };

    window.addEventListener('navigateToDesk', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigateToDesk', handleNavigate as EventListener);
    };
  }, []);

  return { activeButton, setActiveButton, displayedCode, showPointers };
};
