/**
 * Scroll-spy + click navigation for the dev nav (extracted from DevNav).
 * Tracks the active section via an IntersectionObserver center band, keeps a
 * scrolled flag for the header background, and exposes navigateTo(): activate
 * the clicked item immediately and suppress the spy while the smooth scroll
 * travels (otherwise the pill dances through every section it passes).
 * Suppression clears on arrival, on user interruption (wheel/touch) or via a
 * safety timeout (for targets outside the spy list, like the contact anchor).
 */

import React, { useEffect, useRef, useState } from "react";

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function useDevScrollSpy(sections: readonly { id: string }[]) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(sections[0].id);
  const scrollTarget = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Bottom-of-page guard: the last section may be too short to ever reach
      // the observer's center band, so force-activate it at the end of scroll.
      if (
        !scrollTarget.current &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      ) {
        setActive(sections[sections.length - 1].id);
      }
    };
    const cancelTravel = () => {
      scrollTarget.current = null;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", cancelTravel, { passive: true });
    window.addEventListener("touchstart", cancelTravel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", cancelTravel);
      window.removeEventListener("touchstart", cancelTravel);
    };
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (scrollTarget.current) {
            // Traveling: ignore passing sections; release when we arrive.
            if (e.target.id === scrollTarget.current) scrollTarget.current = null;
            return;
          }
          setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  /** Click navigation: activate immediately and suppress the spy while traveling. */
  const navigateTo = (id: string) => (e: React.MouseEvent) => {
    scrollTo(id)(e);
    if (sections.some((s) => s.id === id)) setActive(id);
    scrollTarget.current = id;
    window.setTimeout(() => {
      if (scrollTarget.current === id) scrollTarget.current = null;
    }, 1500);
  };

  return { scrolled, active, navigateTo };
}
