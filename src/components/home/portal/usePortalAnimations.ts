import { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface PortalRefs {
  sectionRef: RefObject<HTMLElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  subtitleRef: RefObject<HTMLParagraphElement>;
  cardsRef: RefObject<HTMLDivElement>;
  portalBgRef: RefObject<HTMLDivElement>;
  topGlowRef: RefObject<HTMLDivElement>;
  bottomGlowRef: RefObject<HTMLDivElement>;
}

/** GSAP timeline for the portal section: ambient loops plus scroll-triggered reveals. */
export const usePortalAnimations = ({
  sectionRef, titleRef, subtitleRef, cardsRef, portalBgRef, topGlowRef, bottomGlowRef,
}: PortalRefs) => {
  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // Portal background animation
    gsap.to(portalBgRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });

    // Pulsating energy borders
    const glowTimeline = gsap.timeline({ repeat: -1 });
    glowTimeline
      .to([topGlowRef.current, bottomGlowRef.current], {
        opacity: 0.3,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to([topGlowRef.current, bottomGlowRef.current], {
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut',
      });

    // Energy flow animation
    gsap.to(topGlowRef.current, {
      backgroundPosition: '200% 0',
      duration: 3,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(bottomGlowRef.current, {
      backgroundPosition: '-200% 0',
      duration: 3,
      repeat: -1,
      ease: 'none',
    });

    // Title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // Cards stagger animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.portal-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.9, rotateY: -30 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }

    // Portal vortex effect on scroll
    gsap.to(portalBgRef.current, {
      scale: 1.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });
  }, { scope: sectionRef }); // Scope animations to this component
};
