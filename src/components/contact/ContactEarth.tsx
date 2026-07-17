'use client';
import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const EarthCanvas = dynamic(() => import('../canvas/Earth'), { ssr: false, loading: () => <div className="w-full h-full" /> });

// The 3D globe for the contact page, with its organic drift. Extracted from
// Contact.tsx (#323) — fully self-contained, no props.
const ContactEarth: React.FC = () => {
  // Earth drifts organically (and nudges behind the form on the little scroll we
  // have). We move the CANVAS WRAPPER via CSS transform so the 3D scene — spin
  // (autoRotate) + user drag (OrbitControls) — stays fully intact. Desktop only.
  const earthWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const tick = () => {
      const el = earthWrapRef.current;
      if (el) {
        if (window.innerWidth < 768) {
          el.style.transform = '';
        } else {
          const t = performance.now() / 1000;
          // Map the page's (small) scroll range to a LARGE travel so it has impact.
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const p = clamp(window.scrollY / maxScroll, 0, 1);
          const ease = p * p * (3 - 2 * p); // smoothstep
          // Quasi-random organic drift (incommensurate sine frequencies).
          const driftX = Math.sin(t * 0.5) * 32 + Math.sin(t * 0.23 + 1.3) * 20;
          const driftY = Math.cos(t * 0.42) * 24 + Math.sin(t * 0.17 + 0.6) * 15;
          // On scroll it sweeps far left + down and recedes (scale), drifting
          // behind the form for a clear, impactful motion.
          const sx = -ease * 760;
          const sy = ease * 130;
          const scale = 1 - ease * 0.18;
          el.style.transform = `translate3d(${(driftX + sx).toFixed(1)}px, ${(driftY + sy).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={earthWrapRef}
      className="relative z-0 flex-1 flex justify-center items-center will-change-transform
                 h-[320px] -mb-[180px] order-first pointer-events-none
                 md:order-none md:h-auto md:mb-0 md:min-h-[500px] md:pointer-events-auto"
      style={{ overflow: 'visible' }}
    >
      {/* Brand scrim (mobile) — fades the globe into the page so it reads as an
          intentional backdrop the frosted form sits over, not a lone planet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] md:hidden bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,8,38,0.45)_55%,#1a0826_100%)]"
      />
      <EarthCanvas />
    </div>
  );
};

export default ContactEarth;
