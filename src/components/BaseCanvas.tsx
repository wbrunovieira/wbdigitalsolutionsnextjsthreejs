'use client';

import React, { useEffect, useState } from 'react';
import type { CanvasProps } from '@react-three/fiber';


// Interface base para props do Canvas
export interface BaseCanvasProps {
  children: React.ReactNode;
  className?: string;
  frameloop?: 'always' | 'demand' | 'never';
  shadows?: boolean;
  camera?: CanvasProps['camera'];
  gl?: CanvasProps['gl'];
  style?: React.CSSProperties;
}

export const useIsVisible = (ref: React.RefObject<HTMLDivElement>) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!ref.current) return;

      // Debounced on purpose: fast scroll can flip intersection several
      // times in a row, and mounting/unmounting the <Canvas> that quickly
      // races R3F's own internal event-connect effect (null addEventListener).
      let debounceTimer: ReturnType<typeof setTimeout> | null = null;

      const observer = new IntersectionObserver(([entry]) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          setIsVisible(entry.isIntersecting);
        }, 150);
      }, {
        threshold: 0.1,
        rootMargin: '100px',
      });

      observer.observe(ref.current);

      return () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        observer.disconnect();
      };
    }, [ref]);

    return isVisible;
  };
  