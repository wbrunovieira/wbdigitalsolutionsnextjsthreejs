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
<section className="w-full pt-32 bg-modern-gradient relative overflow-hidden">
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

  <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start justify-between gap-2">
    
    
    <div className="md:w-1/2 w-full flex flex-col items-start md:items-start text-left  gap-4 z-10">
      <AnimatedTextHero
        statement={currentMessages.heroStatement}
        statementSub={currentMessages.heroStatementSub}
        supportText={currentMessages.heroSupportText}
        pills={[currentMessages.heroPill1, currentMessages.heroPill2, currentMessages.heroPill3]}
      />
      <div className="mt-8">
        
          <Button 
        href="https://wa.me/5511982864581"
        text={currentMessages.contactbutton} 
        />
        </div>
    </div>
    
 

       <div className={`w-full md:w-[600px] h-[500px] overflow-visible ${mounted && isDesktop ? "pointer-events-none" : ""}`}>
        {/* Desktop: empty spacer — the persistent ScrollComputer3D renders the model.
            Mobile (or pre-mount): the original boxed canvas. */}
        {(!mounted || !isDesktop) && <ComputersCanvas />}
       </div>

    
  </div>
</section>
  );
};

export default HeroSection;

