
import React, { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface HeaderProps {
    scrollIndicatorHidden: boolean;
}

const config = {
    name: 'Designing',
    disciplines: ['Motion', 'Experience', 'Accessibility'],
};

export const DesignHeader: React.FC<HeaderProps> = ({ scrollIndicatorHidden }) => {
    const disciplines = config.disciplines;
    let disciplineIndex = 0;

    const headerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const disciplineRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {

        if (nameRef.current) {
            const letters = nameRef.current.querySelectorAll('span');
            gsap.to(letters, {
                opacity: 1,
                stagger: 0.1,
                duration: 1.3,
                ease: 'power2.inOut',
            });
        }
    }, []);

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
                ease: 'power2.out',
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
        <header ref={headerRef} className="relative flex flex-col items-start space-y-4 p-8 text-white">
            <h1 className="text-6xl">
                <span aria-hidden="true" ref={nameRef} className="flex space-x-1">
                    {config.name.split("").map((letter, index) => (
                        <span key={index} className="inline-block opacity-0">
                            {letter}
                        </span>
                    ))}
                </span>
            </h1>

            <h2 className="relative flex items-center text-5xl font-semibold">
                <span className="flex flex-col">
                    <span ref={disciplineRef} className="relative text-yellowcustom overflow-hidden">
                        <span className="relative z-30">{disciplines[disciplineIndex]}</span>
                    </span>
                    <div
                        ref={overlayRef}
                        className="absolute bg-white z-20 w-full h-[0.1em] top-[0.95em] left-0"

                    ></div>
                </span>
            </h2>
        </header>
    );
};
