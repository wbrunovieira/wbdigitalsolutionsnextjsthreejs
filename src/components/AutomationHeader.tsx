import React, { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/contexts/TranslationContext';

interface HeaderProps {
    scrollIndicatorHidden: boolean;
}

export const AutomationHeader: React.FC<HeaderProps> = ({ scrollIndicatorHidden }) => {
    const { language } = useLanguage();
    const currentMessages = useTranslations();

    const disciplines = currentMessages.disciplines;
    let disciplineIndex = 0;

    const headerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const disciplineRef = useRef<HTMLSpanElement>(null);

    // NOTE: the per-letter GSAP opacity reveal was removed — it repeatedly stalled
    // (tween interrupted by the 3D hero init) and left the last letters stuck at
    // opacity 0 ("Automação Inteli…"). The title is now always visible and uses a
    // CSS fade-up (see h1 className) that can never leave it invisible.

    useGSAP(() => {
        const timeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.5,
            onRepeat: () => {
                disciplineIndex = (disciplineIndex + 1) % disciplines.length;
                if (disciplineRef.current) {
                    disciplineRef.current.textContent = disciplines[disciplineIndex];
                }
            },
        });

        gsap.set(overlayRef.current, { scaleX: 0, backgroundColor: 'white', zIndex: 20 });
        gsap.set(disciplineRef.current, { opacity: 0 });

        timeline
            .to(overlayRef.current, {
                scaleX: 1,
                transformOrigin: 'left center',
                duration: 1.2,
                yoyo: true,
                ease: 'power2.out'
            })
            .to(
                disciplineRef.current,
                { opacity: 1, duration: 1 },
                '-=1.2'
            )
            .to(
                disciplineRef.current,
                { opacity: 0, duration: 1 },
                "+=1"
            )
            .to(
                overlayRef.current,
                { scaleX: 0, duration: 1, ease: 'power2.in' },
                '-=0.8'
            );

        return () => {
            timeline.kill();
        };
    }, []);

    return (
        <header ref={headerRef} className="relative flex flex-col items-start space-y-4 p-4 text-white mb-8 bg-primary/70 md:bg-transparent ">
              <h1 className="text-xl md:text-4xl motion-safe:animate-[wb-fadeup_0.7s_ease-out_both]" aria-label={currentMessages.headerTitle}>
                  <span aria-hidden="true" ref={nameRef} className="flex flex-wrap space-x-0.5 md:space-x-1">
                    {currentMessages.headerTitle.split("").map((letter: string, index: number) => (
                        <span key={index} className="inline-block">
                            {letter}
                        </span>
                    ))}
                </span>
            </h1>

            <h2 className="relative flex items-center text-2xl md:text-5xl font-semibold">
                <span className="flex flex-col">
                    <span ref={disciplineRef} className="relative text-yellowcustom">
                        <span className="relative z-30">{disciplines[disciplineIndex]}</span>
                    </span>
                    <div
                        ref={overlayRef}
                        className="absolute bg-white z-20 w-full h-[0.1em] top-[0.95em] left-0 mt-2"
                    ></div>
                </span>
            </h2>

            <p className="text-lg text-gray-300 mt-16 max-w-3xl w-1/2 md:mt-4">
                {currentMessages.headerSubtitle}
            </p>
        </header>
    );
};