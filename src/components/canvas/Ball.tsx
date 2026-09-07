import { Suspense, useMemo, useRef, useState } from 'react';
import { Preload } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import CanvasLoader from '../Loader';
import { PauseableCanvas } from '../PauseableCanvas';
import Ball from './ball/Ball';
import { CanvasControls, CanvasLights } from './ball/canvasParts';
import { useLazyInView } from './ball/useLazyInView';

type BallCanvasProps = {
    icon: string;
    fallbackIcon?: string;
    skipIfError?: boolean;
    width?: number;
    height?: number;
};

const BallCanvas = ({
    icon,
    fallbackIcon,
    skipIfError = false,
    width = 112,
    height = 112,
}: BallCanvasProps) => {
    const [hasError, setHasError] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const floatDuration = useMemo(() => 2.2 + Math.random() * 1.2, []);
    const inView = useLazyInView(containerRef);

    const adjustedWidth = isMobile ? width / 2 : width;
    const adjustedHeight = isMobile ? height / 2 : height;

    if (hasError && skipIfError) {
        return null;
    }

    return (
        <motion.div
            ref={containerRef}
            animate={isDragging ? { y: 0 } : { y: [0, -8, 0] }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
            style={{ display: 'inline-block', width: `${adjustedWidth}px`, height: `${adjustedHeight}px` }}
        >
            {!inView ? (
                // Plain <img> on purpose: decorative placeholder shown before the 3D canvas mounts
                <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9 }}
                />
            ) : (
            <PauseableCanvas
                frameloop="demand"
                gl={{
                    preserveDrawingBuffer: false,
                    powerPreference: 'low-power',
                    antialias: true,
                    pixelRatio: isMobile ? Math.min(window.devicePixelRatio, 2) : typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
                }}
                className="w-full h-28"
                style={{
                    width: `${adjustedWidth}px`,
                    height: `${adjustedHeight}px`,
                    display: 'block',
                }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <CanvasControls />
                    <CanvasLights />
                    <Ball
                        imgUrl={icon}
                        fallbackUrl={fallbackIcon}
                        onError={() => setHasError(true)}
                    />
                </Suspense>
                <Preload all />
            </PauseableCanvas>
            )}
        </motion.div>
    );
};

export default BallCanvas;
