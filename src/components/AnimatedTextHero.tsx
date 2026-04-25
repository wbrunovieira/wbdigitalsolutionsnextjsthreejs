'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextProps {
    statement: string;
    statementSub: string;
    supportText: string;
    pills: string[];
}

export const AnimatedTextHero: React.FC<TextProps> = ({ statement, statementSub, supportText, pills }) => {
    const statementRef  = useRef<HTMLHeadingElement>(null);
    const subRef        = useRef<HTMLParagraphElement>(null);
    const supportRef    = useRef<HTMLParagraphElement>(null);
    const pillsRef      = useRef<HTMLDivElement>(null);
    const accentRef     = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1 — statement mask reveal (rises from overflow:hidden wrapper)
        if (statementRef.current) {
            tl.fromTo(statementRef.current,
                { y: '105%' },
                { y: '0%', duration: 0.85 },
                0.1
            );
        }

        // 2 — glow pulse on statement after reveal
        if (statementRef.current) {
            tl.fromTo(statementRef.current,
                { filter: 'drop-shadow(0 0 0px rgba(255,185,71,0))' },
                { filter: 'drop-shadow(0 0 28px rgba(255,185,71,0.55))', duration: 0.6, ease: 'power2.inOut' },
                0.8
            );
        }

        // 3 — "no digital" fades in
        if (subRef.current) {
            tl.fromTo(subRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6 },
                0.7
            );
        }

        // 4 — accent line draws
        if (accentRef.current) {
            tl.fromTo(accentRef.current,
                { width: 0 },
                { width: '80px', duration: 0.55 },
                1.0
            );
            // shimmer pass after draw
            tl.fromTo(accentRef.current,
                { backgroundPosition: '-80px 0' },
                { backgroundPosition: '160px 0', duration: 0.7, ease: 'power1.inOut' },
                1.55
            );
        }

        // 5 — support text fades in
        if (supportRef.current) {
            tl.fromTo(supportRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.65 },
                1.1
            );
        }

        // 6 — pills spring stagger
        if (pillsRef.current) {
            const pillEls = pillsRef.current.querySelectorAll('.pill');
            tl.fromTo(pillEls,
                { opacity: 0, scale: 0.78, y: 8 },
                { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.8)' },
                1.3
            );
        }

        return () => { tl.kill(); };
    }, [statement, statementSub, supportText, pills]);

    return (
        <header className="relative flex flex-col items-start p-8 text-white">

            {/* Statement — overflow hidden = mask for reveal */}
            <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <h1
                    ref={statementRef}
                    className="font-black leading-none"
                    style={{
                        fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                        color: '#ffb947',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {statement}
                </h1>
            </div>

            {/* Sub-statement */}
            <p
                ref={subRef}
                className="opacity-0 font-light tracking-wide"
                style={{
                    fontSize: 'clamp(1.1rem, 3vw, 2rem)',
                    color: 'rgba(255,255,255,0.7)',
                    marginTop: '4px',
                    marginBottom: '28px',
                    letterSpacing: '0.04em',
                }}
            >
                {statementSub}
            </p>

            {/* Accent line with shimmer */}
            <div
                ref={accentRef}
                className="h-px mb-5"
                style={{
                    width: 0,
                    background: 'linear-gradient(90deg, transparent, #ffb947 40%, #fff 50%, #ffb947 60%, transparent)',
                    backgroundSize: '240px 100%',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            {/* Support text */}
            <p
                ref={supportRef}
                className="opacity-0 font-light leading-relaxed mb-6"
                style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
                    color: 'rgba(255,255,255,0.65)',
                    maxWidth: '42ch',
                }}
            >
                {supportText}
            </p>

            {/* Service pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-2">
                {pills.map((pill, i) => (
                    <span
                        key={i}
                        className="pill opacity-0"
                        style={{
                            display: 'inline-block',
                            padding: '6px 14px',
                            borderRadius: '999px',
                            fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)',
                            fontWeight: 500,
                            letterSpacing: '0.06em',
                            border: '1px solid rgba(121,41,144,0.6)',
                            background: 'rgba(121,41,144,0.15)',
                            color: 'rgba(255,255,255,0.8)',
                        }}
                    >
                        {pill}
                    </span>
                ))}
            </div>

        </header>
    );
};
