'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Branded intro shown on the first load of a session. Dark brand surface with the
 * WB logo + an indeterminate progress bar; fades out once the window has loaded
 * (with a small minimum on-screen time so it never just flickers).
 */
const Preloader = () => {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('wb-preloaded')) {
      setHidden(true);
      return;
    }

    const MIN_MS = 900;
    const start = performance.now();
    let fadeTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      fadeTimer = setTimeout(() => {
        setDone(true);
        try { sessionStorage.setItem('wb-preloaded', '1'); } catch { /* ignore */ }
        hideTimer = setTimeout(() => setHidden(true), 700); // after the fade
      }, wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a0826] transition-opacity duration-700 ease-out ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Image
        src="/svg/logo-white.svg"
        alt=""
        width={245}
        height={91}
        priority
        className="h-auto w-44 animate-pulse rounded-xl sm:w-52"
      />
      <div className="mt-7 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-yellowcustom to-custom-purple animate-[wb-loadbar_1.1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

export default Preloader;
