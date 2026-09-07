import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/** True while the viewport is at or below the mobile breakpoint. */
export const useIsMobileViewport = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
