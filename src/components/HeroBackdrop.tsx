import React from 'react';

/**
 * Hero depth layers — pure CSS, on-brand (purple + yellow, no off-brand photo).
 * Tech grid plane + violet spotlight + faint warm glow + vignette. Static by
 * design: the hero already has the 3D model, particles and the text intro, so
 * the backdrop stays quiet.
 */
const HeroBackdrop: React.FC = () => (
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
        {/* Violet spotlight behind the 3D computer. */}
        <div
            className="absolute inset-0"
            style={{
                background:
                    'radial-gradient(62% 70% at 72% 40%, rgba(121,41,144,0.62) 0%, rgba(121,41,144,0.2) 42%, transparent 72%)',
            }}
        />
        {/* Faint warm glow behind the title. */}
        <div
            className="absolute inset-0"
            style={{
                background:
                    'radial-gradient(42% 52% at 18% 28%, rgba(255,185,71,0.1) 0%, transparent 60%)',
            }}
        />
        {/* Vignette so the lit center reads in front of darker edges. */}
        <div
            className="absolute inset-0"
            style={{
                background:
                    'radial-gradient(120% 120% at 50% 42%, transparent 52%, rgba(26,8,38,0.6) 100%)',
            }}
        />
    </div>
);

export default HeroBackdrop;
