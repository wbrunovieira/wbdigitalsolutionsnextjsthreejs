import { RefObject, useEffect, useState } from 'react';

const ROOT_MARGIN = '300px';

/**
 * Lazy-mount trigger: flips true once the element gets near the viewport, then
 * stops observing. Keeps ~10 WebGL contexts from being created at page load.
 */
export const useLazyInView = (ref: RefObject<HTMLElement>) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, ref]);

  return inView;
};
