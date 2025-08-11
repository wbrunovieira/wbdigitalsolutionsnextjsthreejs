'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextProps {
    disciplines: string[];
    name: string;
}

export const AnimatedTextHero: React.FC<TextProps> = ({ disciplines, name }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const disciplineRef = useRef<HTMLSpanElement>(null);
    const disciplineIndexRef = useRef(0); 

    useEffect(() => {

        if (nameRef.current) {
            const letters = nameRef.current.querySelectorAll('span');
            gsap.fromTo(
                letters,
                { opacity: 0 },
                {
                    opacity: 1,
                    stagger: 0.1,
                    duration: 2.3,
                    ease: 'power2.inOut',
                }
            );
        }
    }, [name]);

    useEffect(() => {

        if (disciplineRef.current && overlayRef.current) {
            const timeline = gsap.timeline({
                repeat: -1,
                repeatDelay: 1.5,
                onRepeat: () => {
                    disciplineIndexRef.current = (disciplineIndexRef.current + 1) % disciplines.length;
                    gsap.to(disciplineRef.current, {
                        textContent: disciplines[disciplineIndexRef.current], 
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                },
            });

            gsap.set(overlayRef.current, { scaleX: 0, backgroundColor: 'white', zIndex: 1 });
            gsap.set(disciplineRef.current, { opacity: 0 });

            timeline
                .to(overlayRef.current, {
                    scaleX: 1,
                    transformOrigin: 'left center',
                    duration: 1.2,
                    yoyo: true,
                    ease: 'power2.out',
                })
                .to(disciplineRef.current, { opacity: 1, duration: 1 }, '-=1.2')
                .to(disciplineRef.current, { opacity: 0, duration: 1 }, '+=1')
                .to(overlayRef.current, { scaleX: 0, duration: 1, ease: 'power2.in' }, '-=0.8');

            return () => {
                timeline.kill();
            };
        }
    }, [disciplines]);

    useEffect(() => {

        if (disciplineRef.current) {
            disciplineRef.current.textContent = disciplines[0];
            disciplineIndexRef.current = 0;
        }
    }, [disciplines]);

    return (
        <header ref={headerRef} className="relative flex flex-col items-start space-y-4 p-8 text-white">
            <h1 className="text-4xl md:text-6xl">
                <span aria-hidden="true" ref={nameRef} className="flex space-x-1">
                    {name.split('').map((letter, index) => (
                        <span key={index} className="inline-block opacity-0">
                            {letter}
                        </span>
                    ))}
                </span>
            </h1>

            <h2 className="relative flex items-start md:items-center text-3xl md:text-5xl font-semibold">
                <span className="flex flex-col">
                    <span ref={disciplineRef} className="relative text-yellowcustom overflow-hidden">
                        <span className="relative z-30">{disciplines[0]}</span>
                    </span>
                    <div
                        ref={overlayRef}
                        className="absolute bg-white z-20 w-full h-[0.1em] top-[3.5em] md:top-[2.3em] left-0"
                    ></div>
                </span>
            </h2>
        </header>
    );
};

