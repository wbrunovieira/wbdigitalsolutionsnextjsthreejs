import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { GLUE, GLUE_MOBILE, KEYFRAMES, KEYFRAMES_MOBILE, TargetPose } from './keyframes';

/**
 * Scroll -> target pose. Anchored to the REAL section positions (data-cpu-stop):
 * the active section is the one currently at the top of the viewport; the model
 * GLUES to a point in it (rides it up via `glueY`) and only when that section
 * fully leaves does the active index advance, so the target jumps to the next
 * stop and the model descends (eased in the Computer's useFrame).
 *
 * Returns whether the hero section is the active one.
 */
export const useSectionStops = (
  isDesktop: boolean,
  target: MutableRefObject<TargetPose>,
  inHeroRef: MutableRefObject<boolean>,
) => {
  const [inHero, setInHero] = useState(true);
  const stopsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const KF = isDesktop ? KEYFRAMES : KEYFRAMES_MOBILE;
    const glueFactor = isDesktop ? GLUE : GLUE_MOBILE;

    const readStops = () => {
      stopsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>('[data-cpu-stop]'),
      ).sort((a, b) => Number(a.dataset.cpuStop) - Number(b.dataset.cpuStop));
    };

    const onScroll = () => {
      const S = window.scrollY;
      if (stopsRef.current.length < 2) readStops();
      const stops = stopsRef.current;
      if (!stops.length) return;

      // Active section = first whose bottom is still below the viewport top.
      let i = stops.length - 1;
      for (let k = 0; k < stops.length; k++) {
        if (S < stops[k].offsetTop + stops[k].offsetHeight) {
          i = k;
          break;
        }
      }
      i = Math.min(i, KF.length - 1);

      // Hero state is section-aware (robust to page height across desktop/mobile).
      const nextHero = i === 0;
      inHeroRef.current = nextHero;
      setInHero((prev) => (prev === nextHero ? prev : nextHero));

      // Last stop parks low (between the cards and the footer) — no glue.
      const isLast = i === stops.length - 1;
      const glueY = isLast ? 0 : (S - stops[i].offsetTop) * glueFactor;
      const kf = KF[i];
      const t = target.current;
      t.x = kf.pos[0];
      t.y = kf.pos[1] + glueY;
      t.z = kf.pos[2];
      t.rx = kf.rot[0];
      t.ry = kf.rot[1];
      t.rz = kf.rot[2];
      t.s = kf.scale;
    };

    const onResize = () => {
      readStops();
      onScroll();
    };

    readStops();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, [isDesktop, target, inHeroRef]);

  return inHero;
};
