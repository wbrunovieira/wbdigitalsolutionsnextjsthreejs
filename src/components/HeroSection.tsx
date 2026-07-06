import { useTranslations } from '@/contexts/TranslationContext';
import { Button } from './Button';
import { AnimatedTextHero } from './AnimatedTextHero';

const HeroSection: React.FC = () => {
  const currentMessages = useTranslations();

  // The persistent ScrollComputer3D (in Home) draws the 3D computer on ALL sizes
  // now (desktop + mobile journey). The hero box is just a transparent spacer so
  // the section reserves room for the model; a scrim keeps the text readable over it.
  return (
    <section className="relative w-full overflow-hidden bg-modern-gradient min-h-[100svh] pt-28 pb-16 lg:min-h-0 lg:pt-32 lg:pb-0">
      {/* Depth layers — pure CSS, on-brand (purple + yellow, no off-brand photo).
          Spotlight behind the 3D computer + faint warm glow behind the title +
          a vignette so the lit center reads in front of darker edges. */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Tech grid plane — faint structural element, masked to fade at edges so it
            reads as a lit wall receding behind the 3D computer (depth, not clutter). */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(190,186,215,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(190,186,215,0.16) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage:
              'radial-gradient(85% 85% at 64% 44%, black 0%, rgba(0,0,0,0.55) 52%, transparent 88%)',
            WebkitMaskImage:
              'radial-gradient(85% 85% at 64% 44%, black 0%, rgba(0,0,0,0.55) 52%, transparent 88%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(62% 70% at 72% 40%, rgba(121,41,144,0.62) 0%, rgba(121,41,144,0.2) 42%, transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(42% 52% at 18% 28%, rgba(255,185,71,0.1) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 42%, transparent 52%, rgba(26,8,38,0.6) 100%)',
          }}
        />
      </div>

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
