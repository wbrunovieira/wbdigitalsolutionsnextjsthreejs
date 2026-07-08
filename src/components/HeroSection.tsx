import { useTranslations } from '@/contexts/TranslationContext';
import HeroBackdrop from './HeroBackdrop';
import { Button } from './Button';
import { AnimatedTextHero } from './AnimatedTextHero';

const HeroSection: React.FC = () => {
  const currentMessages = useTranslations();

  // The persistent ScrollComputer3D (in Home) draws the 3D computer on ALL sizes
  // (desktop + mobile journey). The hero box is just a transparent spacer so
  // the section reserves room for the model; a scrim keeps the text readable over it.
  return (
    <section className="relative w-full overflow-hidden bg-modern-gradient min-h-[100svh] pt-28 pb-16 lg:min-h-0 lg:pt-32 lg:pb-0">
      <HeroBackdrop />

      {/* Readability scrim over the persistent 3D model (canvas z-5 → scrim z-6 →
          text z-10). Strong top + soft bottom on mobile (model sits behind the
          text there); light top-only on desktop (model is off to the side). */}
      <div
        className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-b from-[#1a0826]/85 via-[#1a0826]/25 to-[#1a0826]/55 lg:from-[#1a0826]/40 lg:via-transparent lg:to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-start justify-between gap-2">
        <div className="lg:w-1/2 w-full flex flex-col items-start text-left gap-4 z-10">
          <AnimatedTextHero
            statement={currentMessages.heroStatement}
            statementAccent={currentMessages.heroStatementAccent}
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

        {/* Spacer — the persistent ScrollComputer3D renders the model here (all sizes). */}
        <div className="lg:w-[600px] lg:h-[500px] h-[45vh] w-full overflow-visible pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
