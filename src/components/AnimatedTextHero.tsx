'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextProps {
    disciplines: string[];
    name: string;
}

const SEGMENT_STYLES = [
    { fontWeight: 300, color: 'rgba(255,255,255,0.55)', scale: 0.65 }, // Criamos
    { fontWeight: 700, color: '#ffffff',                scale: 1     }, // Sites, IA e Automação
    { fontWeight: 300, color: 'rgba(255,255,255,0.55)', scale: 0.65 }, // que Geram
    { fontWeight: 800, color: '#ffb947',                scale: 1     }, // Resultados
];

export const AnimatedTextHero: React.FC<TextProps> = ({ disciplines, name }) => {
    const eyebrowRef   = useRef<HTMLParagraphElement>(null);
    const titleRef     = useRef<HTMLHeadingElement>(null);
    const accentLineRef = useRef<HTMLDivElement>(null);
    const linesRef     = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);
    const closingRef   = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (eyebrowRef.current) {
            tl.fromTo(eyebrowRef.current,
                { opacity: 0, y: -8 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
        }

        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.3);
        }

        if (accentLineRef.current) {
            tl.fromTo(accentLineRef.current,
                { width: 0 },
                { width: '72px', duration: 0.6, ease: 'power2.out' }, 1.0);
        }

        if (linesRef.current) {
            const lines = linesRef.current.querySelectorAll('.discipline-line');
            gsap.killTweensOf(lines);
            tl.fromTo(lines,
                { opacity: 0, x: -12 },
                { opacity: 1, x: 0, stagger: 0.22, duration: 0.7, ease: 'power2.out' }, 1.3);
        }

        if (separatorRef.current) {
            tl.fromTo(separatorRef.current,
                { width: 0, opacity: 0 },
                { width: '100%', opacity: 1, duration: 0.5, ease: 'power2.out' }, 2.2);
        }

        if (closingRef.current) {
            tl.fromTo(closingRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 2.6);
        }

        return () => { tl.kill(); };
    }, [name, disciplines]);

    const isSegmented  = name.includes('§');
    const segments     = isSegmented ? name.split('§') : null;
    const keywordLines = disciplines.filter(d => d.includes('|'));
    const closingLine  = disciplines.find(d => !d.includes('|')) ?? '';

    return (
        <header className="relative flex flex-col items-start p-8 text-white">

            {/* Eyebrow */}
            <p ref={eyebrowRef} className="opacity-0 text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4 font-mono"
               style={{ color: '#792990' }}>
                digital solutions
            </p>

            {/* Title */}
            <h1 ref={titleRef} className="mb-4 leading-tight opacity-0"
                style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)' }}>

                {isSegmented && segments ? (
                    <>
                        {/* Row 1 */}
                        <span style={{ display: 'block' }}>
                            <span style={{ fontWeight: SEGMENT_STYLES[0].fontWeight, color: SEGMENT_STYLES[0].color, fontSize: `${SEGMENT_STYLES[0].scale}em` }}>
                                {segments[0]}
                            </span>
                            <span style={{ fontWeight: SEGMENT_STYLES[1].fontWeight, color: SEGMENT_STYLES[1].color, fontSize: `${SEGMENT_STYLES[1].scale}em` }}>
                                {segments[1]}
                            </span>
                        </span>
                        {/* Row 2 */}
                        <span style={{ display: 'block', marginTop: '4px' }}>
                            <span style={{ fontWeight: SEGMENT_STYLES[2].fontWeight, color: SEGMENT_STYLES[2].color, fontSize: `${SEGMENT_STYLES[2].scale}em` }}>
                                {segments[2]}
                            </span>
                            <span style={{ fontWeight: SEGMENT_STYLES[3].fontWeight, color: SEGMENT_STYLES[3].color, fontSize: `${SEGMENT_STYLES[3].scale}em` }}>
                                {segments[3]}
                            </span>
                        </span>
                    </>
                ) : (
                    <span>{name}</span>
                )}
            </h1>

            {/* Accent line */}
            <div ref={accentLineRef} className="h-px mb-6"
                 style={{ width: 0, background: 'linear-gradient(90deg, #ffb947, transparent)' }} />

            {/* Keyword lines — CSS grid for reliable two-column layout */}
            <div ref={linesRef} className="flex flex-col gap-3 mb-5">
                {keywordLines.map((line, index) => {
                    const [keyword, benefit] = line.split('|');
                    return (
                        <div key={index} className="discipline-line opacity-0"
                             style={{ display: 'grid', gridTemplateColumns: '7rem 1fr', alignItems: 'baseline', gap: '0 12px' }}>
                            <span style={{ color: '#ffb947', fontWeight: 700, fontSize: 'clamp(1rem, 2.2vw, 1.35rem)' }}>
                                {keyword}
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300, fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}>
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
