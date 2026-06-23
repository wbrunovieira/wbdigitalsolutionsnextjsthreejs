import { useTranslations } from "@/contexts/TranslationContext";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { AnimatedTextHero } from "./AnimatedTextHero";

const ComputersCanvas = dynamic(() => import("./canvas/ComputersCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const HeroSection: React.FC = () => {
  const currentMessages = useTranslations();

  // PROTOTYPE: on desktop the persistent ScrollComputer3D (in Home) draws the
  // model; the hero box becomes a transparent spacer (pointer-events let the
  // drag reach the fixed canvas behind). Mobile keeps the boxed ComputersCanvas.
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
<section className="relative w-full overflow-hidden bg-modern-gradient min-h-[100svh] pt-28 pb-16 lg:min-h-0 lg:pt-32 lg:pb-0">
  <div className="absolute inset-0 z-0">
    <Image
      src="/img/herobg5-optimized.jpg"
      alt=""
      fill
      priority
      className="object-cover opacity-10 pointer-events-none select-none"
      aria-hidden="true"
    />
  </div>

  {/* Mobile/tablet: the 3D computer becomes a full backdrop filling the lower
      part of the hero (no orphaned box → no void). Desktop draws it via the
      persistent ScrollComputer3D, so this whole layer is hidden at lg+. */}
  <div className="absolute inset-x-0 bottom-0 top-[38%] z-[1] pointer-events-none lg:hidden">
    {/* brand ground-glow that anchors the model */}
    <div
      className="absolute left-1/2 bottom-[8%] -translate-x-1/2 w-[80vw] h-[40vh] rounded-full bg-[#792990]/25 blur-3xl"
      aria-hidden="true"
    />
    {(!mounted || !isDesktop) && <ComputersCanvas />}
  </div>

  {/* Readability scrim over the backdrop (mobile only) */}
  <div
    className="pointer-events-none absolute inset-0 z-[5] lg:hidden bg-gradient-to-b from-[#1a0826]/85 via-[#1a0826]/30 to-transparent"
    aria-hidden="true"
  />

  <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-start justify-between gap-2">

    <div className="lg:w-1/2 w-full flex flex-col items-start text-left gap-4 z-10">
      <AnimatedTextHero
        statement={currentMessages.heroStatement}
        statementSub={currentMessages.heroStatementSub}
        supportText={currentMessages.heroSupportText}
        pills={[currentMessages.heroPill1, currentMessages.heroPill2, currentMessages.heroPill3]}
      />
      <div className="mt-8 mb-[42vh] lg:mb-0">
          <Button
        href="https://wa.me/5511982864581"
        text={currentMessages.contactbutton}
        />
        </div>
    </div>

    {/* Desktop spacer — the persistent ScrollComputer3D renders the model here. */}
    <div className="hidden lg:block lg:w-[600px] h-[500px] overflow-visible pointer-events-none" />

  </div>
</section>
  );
};

export default HeroSection;

