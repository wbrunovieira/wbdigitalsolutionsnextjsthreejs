import { MutableRefObject, useEffect } from 'react';
import { clamp } from './math';

/** Writes page scroll progress (0..1) into a ref, without re-rendering. */
export const useScrollProgress = (progress: MutableRefObject<number>) => {
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [progress]);
};
