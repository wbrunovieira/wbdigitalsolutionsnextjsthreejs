'use client'

import React, { useEffect, useState, useRef } from 'react';


// Interface base para props do Canvas
export interface BaseCanvasProps {
  children: React.ReactNode;
  className?: string;
  frameloop?: 'always' | 'demand' | 'never';
  shadows?: boolean;
  camera?: any;
  gl?: any;
  style?: React.CSSProperties;
}

export const useIsVisible = (ref: React.RefObject<HTMLDivElement>) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      if (!ref.current) return;
  
      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, {
        threshold: 0.1,
        rootMargin: '100px'
      });
  
      observer.observe(ref.current);
  
      return () => {
        observer.disconnect();
      };
    }, [ref]);
  
    return isVisible;
  };
  