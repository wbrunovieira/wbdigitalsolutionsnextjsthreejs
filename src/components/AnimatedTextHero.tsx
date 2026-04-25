'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextProps {
    disciplines: string[];
    name: string;
}

// Renders text, wrapping *word* in yellow
function HighlightedTitle({ text }: { text: string }) {
    const parts = text.split(/(\*[^*]+\*)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('*') && part.endsWith('*')) {
                    return (
                        <span key={i} style={{ color: '#ffb947' }}>
                            {part.slice(1, -1)}
                        </span>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
}

export const AnimatedTextHero: React.FC<TextProps> = ({ disciplines, name }) => {
    const eyebrowRef    = useRef<HTMLParagraphElement>(null);
    const titleRef      = useRef<HTMLHeadingElement>(null);
    const accentLineRef = useRef<HTMLDivElement>(null);
    const linesRef      = useRef<HTMLDivElement>(null);
    const separatorRef  = useRef<HTMLDivElement>(null);
    const closingRef    = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (eyebrowRef.current)
            tl.fromTo(eyebrowRef.current,
                { opacity: 0, y: -8 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);

        if (titleRef.current)
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.3);

        if (accentLineRef.current)
            tl.fromTo(accentLineRef.current,
                { width: 0 },
                { width: '72px', duration: 0.6, ease: 'power2.out' }, 1.0);

        if (linesRef.current) {
            const lines = linesRef.current.querySelectorAll('.discipline-line');
            gsap.killTweensOf(lines);
            tl.fromTo(lines,
                { opacity: 0, x: -12 },
                { opacity: 1, x: 0, stagger: 0.22, duration: 0.7, ease: 'power2.out' }, 1.3);
        }

        if (separatorRef.current)
            tl.fromTo(separatorRef.current,
                { width: 0, opacity: 0 },
                { width: '100%', opacity: 1, duration: 0.5, ease: 'power2.out' }, 2.2);

        if (closingRef.current)
            tl.fromTo(closingRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 2.6);

        return () => { tl.kill(); };
    }, [name, disciplines]);

    const keywordLines = disciplines.filter(d => d.includes('|'));
    const closingLine  = disciplines.find(d => !d.includes('|')) ?? '';

    return (
        <header className="relative flex flex-col items-start p-8 text-white">

            {/* Eyebrow */}
            <p ref={eyebrowRef} className="opacity-0 text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4 font-mono"
               style={{ color: '#792990' }}>
                digital solutions
            </p>

            {/* Title — uniform weight, only *word* highlighted in yellow */}
            <h1 ref={titleRef} className="opacity-0 font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
                <HighlightedTitle text={name} />
            </h1>

            {/* Accent line */}
            <div ref={accentLineRef} className="h-px mb-6"
                 style={{ width: 0, background: 'linear-gradient(90deg, #ffb947, transparent)' }} />

            {/* Discipline lines — max-content keyword column so it never wraps */}
            <div ref={linesRef} className="flex flex-col gap-3 mb-5">
                {keywordLines.map((line, index) => {
                    const [keyword, benefit] = line.split('|');
                    return (
                        <div key={index} className="discipline-line opacity-0"
                             style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', alignItems: 'baseline', gap: '0 16px' }}>
                            <span style={{ color: '#ffb947', fontWeight: 700, fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', whiteSpace: 'nowrap' }}>
                                {keyword}
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300, fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}>
                                {benefit}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Separator + closing payoff */}
            {closingLine && (
                <>
                    <div ref={separatorRef} className="h-px mb-4 opacity-0"
                         style={{ width: 0, background: 'linear-gradient(90deg, rgba(121,41,144,0.5), transparent)' }} />
                    <p ref={closingRef} className="opacity-0 font-light leading-snug"
                       style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}>
                        {closingLine}
                    </p>
                </>
            )}

        </header>
    );
};
