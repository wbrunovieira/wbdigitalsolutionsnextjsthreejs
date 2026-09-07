import { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Refs {
  sectionRef: RefObject<HTMLDivElement>;
  headingRef: RefObject<HTMLHeadingElement>;
  cardRefs: RefObject<(HTMLDivElement | null)[]>;
}

/** Scroll-triggered reveal for the heading and each example card. */
export const useLLMCardAnimations = ({ sectionRef, headingRef, cardRefs }: Refs) => {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top bottom',
            end: 'top center',
            toggleActions: 'play none none reverse',
          },
        },
      );

      cardRefs.current?.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
};
