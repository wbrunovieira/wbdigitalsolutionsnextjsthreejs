"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PageHead from "@/components/PageHead";
import SystemsHeader from "@/components/systems/SystemsHeader";
import { makeI18nStaticProps } from "@/lib/i18n";

// Per-locale prerender with SSR-correct messages (built-in Next i18n).
export const getStaticProps = makeI18nStaticProps();

// Persistent scroll-driven 3D network (now desktop AND mobile), mounted on the
// first user gesture so it never blocks initial load / the lab perf trace.
const ScrollSystems3D = dynamic(() => import("@/components/canvas/ScrollSystems3D"), { ssr: false });

// ssr:false sections get a height-reserving placeholder (avoids cold-load CLS).
const SystemsCapabilities = dynamic(() => import("@/components/systems/SystemsCapabilities"), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const SystemsTechStack = dynamic(() => import("@/components/systems/SystemsTechStack"), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const SystemsProcess = dynamic(() => import("@/components/systems/SystemsProcess"), { ssr: false, loading: () => <div className="min-h-[80vh] w-full" /> });
const SystemsCTA = dynamic(() => import("@/components/systems/SystemsCTA"), { ssr: false, loading: () => <div className="min-h-[60vh] w-full" /> });

const Systems: React.FC = () => {
  // Defer the 3D hero to the first user gesture (perf).
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const events = ["scroll", "pointermove", "touchstart", "keydown"];
    const mount = () => {
      setShow3D(true);
      events.forEach((e) => window.removeEventListener(e, mount));
      clearTimeout(fallback);
    };
    events.forEach((e) => window.addEventListener(e, mount, { once: true, passive: true }));
    const fallback = window.setTimeout(mount, 4000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, mount));
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <PageHead pageKey="systems" />
      {/* Gradient backdrop behind the 3D canvas; main is transparent and stacked
          above (z-10) so the network passes behind the page on scroll. */}
      <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
      {show3D && <ScrollSystems3D />}

      <main className="relative z-10 flex flex-col min-h-screen mt-16">
        {/* Hero — header on top; the persistent 3D network draws in the lower part
            on mobile (its keyframe is centered-lower), to the side on desktop. */}
        <div className="relative flex w-full items-start lg:items-center px-4 md:px-8 pt-28 lg:pt-0 min-h-[100svh] lg:min-h-[80vh]">
          {/* top scrim for legibility over the network (mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[48%] bg-gradient-to-b from-[#1a0826] via-[#1a0826]/80 to-transparent lg:hidden"
          />
          <div className="relative z-10 w-full">
            <SystemsHeader />
          </div>
        </div>

        {/* Transparent spacers between sections reveal the network passing behind. */}
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <SystemsCapabilities />
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <SystemsTechStack />
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <SystemsProcess />
        <div aria-hidden className="h-[55vh] lg:h-52" />
        <SystemsCTA />
      </main>
    </>
  );
};

export default Systems;
