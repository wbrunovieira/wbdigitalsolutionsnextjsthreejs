import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BaseCanvasProps, useIsVisible } from './BaseCanvas';

// Browsers typically support 8-16 concurrent WebGL contexts.
// Cap at 8 to prevent THREE.WebGLRenderer: Context Lost errors.
const MAX_WEBGL_CONTEXTS = 8;
let activeContexts = 0;
const waitQueue: Array<() => void> = [];

const acquireContext = (onAcquired: () => void): (() => void) => {
  if (activeContexts < MAX_WEBGL_CONTEXTS) {
    activeContexts++;
    onAcquired();
    return () => releaseContext();
  }
  waitQueue.push(onAcquired);
  return () => {
    const idx = waitQueue.indexOf(onAcquired);
    if (idx !== -1) waitQueue.splice(idx, 1);
  };
};

const releaseContext = () => {
  activeContexts--;
  const next = waitQueue.shift();
  if (next) {
    activeContexts++;
    next();
  }
};

export const PauseableCanvas: React.FC<BaseCanvasProps> = ({
  children,
  className = '',
  frameloop = 'demand',
  ...canvasProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);
  const [hasSlot, setHasSlot] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setHasSlot(false);
      return;
    }
    const cancel = acquireContext(() => setHasSlot(true));
    return () => {
      cancel();
      setHasSlot(prev => {
        if (prev) releaseContext();
        return false;
      });
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className={className}>
      {hasSlot && (
        <Canvas
          {...canvasProps}
          frameloop={frameloop}
          style={{
            visibility: 'visible',
            ...canvasProps.style,
          }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
};
