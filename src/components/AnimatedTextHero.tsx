'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextProps {
    disciplines: string[];
    name: string;
}

export const AnimatedTextHero: React.FC<TextProps> = ({ disciplines, name }) => {
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const accentLineRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (eyebrowRef.current) {
            tl.fromTo(eyebrowRef.current,
                { opacity: 0, y: -8 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                0
            );
        }

        if (nameRef.current) {
            const letters = nameRef.current.querySelectorAll('span');
            gsap.killTweensOf(letters);
            tl.fromTo(letters,
                { opacity: 0 },
                { opacity: 1, stagger: 0.08, duration: 1.8, ease: 'power2.inOut' },
                0.3
            );
        }

        if (accentLineRef.current) {
            tl.fromTo(accentLineRef.current,
                { width: 0 },
                { width: '80px', duration: 0.7, ease: 'power2.out' },
                1.2
            );
        }

        if (linesRef.current) {
            const lines = linesRef.current.querySelectorAll('.discipline-line');
            gsap.killTweensOf(lines);
            tl.fromTo(lines,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, stagger: 0.28, duration: 0.8, ease: 'power2.out' },
                1.5
            );
        }

        return () => { tl.kill(); };
    }, [name, disciplines]);

    return (
        <header className="relative flex flex-col items-start p-8 text-white">

            {/* Eyebrow */}
            <p
                ref={eyebrowRef}
                className="opacity-0 text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4 font-mono"
                style={{ color: '#792990' }}
            >
                digital solutions
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span ref={nameRef} className="flex flex-wrap gap-x-2">
                    {name.split(' ').map((word, wi) => (
                        <span key={wi} className="inline-flex">
                            {word.split('').map((letter, li) => (
                                <span key={li} className="inline-block opacity-0">{letter}</span>
                            ))}
                        </span>
                    ))}
                </span>
            </h1>

            {/* Accent line */}
            <div
                ref={accentLineRef}
                className="h-px mb-6"
                style={{
                    width: 0,
                    background: 'linear-gradient(90deg, #ffb947, transparent)',
                }}
            />

            {/* Sentence block with left border */}
            <div ref={linesRef} className="relative pl-4">
                <div
                    className="absolute left-0 top-1 bottom-1 w-px"
                    style={{ background: 'linear-gradient(to bottom, #ffb94760, transparent)' }}
                />
                {disciplines.map((line, index) => {
                    const isLast = index === disciplines.length - 1;
                    return (
                        <p
                            key={index}
                            className="discipline-line opacity-0 leading-snug"
                            style={{
                                fontSize: isLast ? 'clamp(1.1rem, 2.5vw, 1.6rem)' : 'clamp(0.9rem, 2vw, 1.25rem)',
                                fontWeight: isLast ? 700 : 300,
                                color: isLast ? '#ffb947' : 'rgba(255,255,255,0.75)',
                                marginBottom: isLast ? 0 : '2px',
                            }}
                        >
                            {line}
                        </p>
                    );
                })}
            </div>

        </header>
    );
};
