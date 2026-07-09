'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextProps {
    statement: string;
    statementAccent: string;
    statementSub: string;
    supportText: string;
    pills: string[];
}

export const AnimatedTextHero: React.FC<TextProps> = ({ statement, statementAccent, statementSub, supportText, pills }) => {
    const rootRef      = useRef<HTMLElement>(null);
    const subRef       = useRef<HTMLParagraphElement>(null);
    const supportRef   = useRef<HTMLParagraphElement>(null);
    const pillsRef     = useRef<HTMLDivElement>(null);
    const lineRef      = useRef<HTMLDivElement>(null);

    // Primitive dep: the parent may build `pills` inline; depending on the array
    // identity would tear down and replay the intro on every parent re-render.
    const pillsKey = pills.join('|');

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const words = root.querySelectorAll<HTMLElement>('.hero-word');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1 — statement words rise out of their clip masks, staggered.
        tl.fromTo(words,
            { yPercent: 115, opacity: 0.6 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
            0.1,
        );

        // 2 — sub-statement, accent line (transform-only scaleX draw), support, pills.
        if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
        if (lineRef.current) {
            tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.55 }, 0.95);
            tl.fromTo(lineRef.current,
                { backgroundPosition: '-80px 0' },
                { backgroundPosition: '160px 0', duration: 0.7, ease: 'power1.inOut' },
                1.5,
            );
        }
        if (supportRef.current) tl.fromTo(supportRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.65 }, 1.05);
        if (pillsRef.current) {
            tl.fromTo(pillsRef.current.querySelectorAll('.pill'),
                { opacity: 0, scale: 0.78, y: 8 },
                { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.8)' },
                1.25,
            );
        }

        // Reduced motion: jump the same timeline to its end — one source of truth
        // for final states, no choreography.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) tl.progress(1).pause();

        return () => { tl.kill(); };
    }, [statement, statementAccent, statementSub, supportText, pillsKey]);

    // Each word sits inside its own clip mask so the stagger reveals line by line.
    // 0.24em of compensated bottom padding keeps descenders (y/g/p/j) unclipped.
    const renderWord = (word: string) => (
        <span className="inline-block overflow-hidden pb-[0.24em] -mb-[0.24em] align-bottom">
            <span className="hero-word inline-block will-change-transform">{word}</span>
        </span>
    );

    return (
        <header ref={rootRef} className="relative flex flex-col items-start p-8 text-white">

            {/* Statement — glow on the outer wrapper, per-word clip reveal inside.
                The glow is STATIC (not GSAP-pulsed): animating the drop-shadow made
                the post-reveal repaint LARGER than the first paint, so a hero word
                became a late LCP candidate (~6s in the mobile lab, Perf 96 → 54).
                Painting at full glow size from SSR keeps LCP at first paint. */}
            <div style={{ filter: 'drop-shadow(0 0 26px rgba(255,185,71,0.5))' }}>
                <h1
                    className="font-black leading-[1.04]"
                    style={{
                        fontSize: 'clamp(2.6rem, 6.5vw, 5.25rem)',
                        color: '#ffb947',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {statement.split(' ').map((w, i) => (
                        <React.Fragment key={i}>{renderWord(w)}{' '}</React.Fragment>
                    ))}
                    {renderWord(statementAccent)}
                </h1>
            </div>

            {/* Sub-statement — the promise, one line. */}
            <p
                ref={subRef}
                className="opacity-0 font-light tracking-wide"
                style={{
                    fontSize: 'clamp(1.1rem, 2.6vw, 1.8rem)',
                    color: 'rgba(255,255,255,0.75)',
                    marginTop: '6px',
                    marginBottom: '24px',
                    letterSpacing: '0.04em',
                }}
            >
                {statementSub}
            </p>

            {/* Accent line with shimmer — fixed width, revealed via scaleX (no layout anim). */}
            <div
                ref={lineRef}
                className="h-px mb-5 origin-left"
                style={{
                    width: '80px',
                    transform: 'scaleX(0)',
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
                    maxWidth: '46ch',
                }}
            >
                {supportText}
            </p>

            {/* Service pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-2">
                {pills.map((pill, i) => (
                    <span
                        key={i}
                        className="pill opacity-0 inline-block rounded-full border border-[rgba(170,166,195,0.45)] bg-[rgba(53,5,69,0.65)] px-3.5 py-1.5 text-[clamp(0.7rem,1.3vw,0.8rem)] font-medium tracking-[0.06em] text-white"
                    >
                        {pill}
                    </span>
                ))}
            </div>

        </header>
    );
};
