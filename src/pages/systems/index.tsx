"use client";

import dynamic from "next/dynamic";
import PageHead from "@/components/PageHead";
import SystemsHeader from "@/components/systems/SystemsHeader";

// Persistent scroll-driven 3D computer (desktop only). Self-nullifies on mobile.
const ScrollSystems3D = dynamic(() => import("@/components/canvas/ScrollSystems3D"), { ssr: false });

const SystemsCapabilities = dynamic(() => import("@/components/systems/SystemsCapabilities"), { ssr: false });
const SystemsTechStack = dynamic(() => import("@/components/systems/SystemsTechStack"), { ssr: false });
const SystemsProcess = dynamic(() => import("@/components/systems/SystemsProcess"), { ssr: false });
const SystemsCTA = dynamic(() => import("@/components/systems/SystemsCTA"), { ssr: false });

const Systems: React.FC = () => {
  return (
    <>
      <PageHead pageKey="systems" />
      {/* Gradient backdrop behind the 3D canvas; main is transparent and stacked
          above (z-10) so the computer passes behind the page on scroll. */}
      <div className="fixed inset-0 z-0 bg-modern-gradient pointer-events-none" aria-hidden="true" />
      <ScrollSystems3D />

      <main className="relative z-10 flex flex-col min-h-screen mt-16">
        {/* Hero — header on the left; the persistent 3D computer renders on the right. */}
        <div className="flex w-full items-center px-4 pt-32 md:px-8 lg:min-h-[80vh]">
          <SystemsHeader />
        </div>

        {/* Transparent spacers between sections reveal the computer passing behind. */}
        <div aria-hidden className="h-32 lg:h-52" />
        <SystemsCapabilities />
        <div aria-hidden className="h-32 lg:h-52" />
        <SystemsTechStack />
        <div aria-hidden className="h-32 lg:h-52" />
        <SystemsProcess />
        <div aria-hidden className="h-32 lg:h-52" />
        <SystemsCTA />
      </main>
    </>
  );
};

export default Systems;
