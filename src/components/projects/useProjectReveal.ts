'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Staggered fade/rise reveal for the direct children of the returned ref.
 *
 * Runs on mount and whenever `deps` change (e.g. the active filter). It uses
 * `fromTo` with an explicit visible end-state and a one-shot ScrollTrigger, so
 * cards always end up visible — even when the filter changes while the grid is
 * already on screen or is scrolled to programmatically (which previously left
 * the last card stuck at opacity 0).
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !ref.current) return;
      const children = ref.current.children;
      if (!children.length) return;

      // No ScrollTrigger: animate immediately on mount / filter change so a
      // card can never get stuck hidden (e.g. after a programmatic scroll).
      gsap.fromTo(
        children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'opacity,transform',
        }
      );
    },
    { scope: ref, dependencies: deps }
  );

  return ref;
}
