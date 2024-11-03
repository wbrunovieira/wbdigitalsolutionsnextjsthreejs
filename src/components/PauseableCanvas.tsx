import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { BaseCanvasProps, useIsVisible } from './BaseCanvas';

export const PauseableCanvas: React.FC<BaseCanvasProps> = ({
  children,
  className = '',
  frameloop = 'demand',
  ...canvasProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);

  return (
    <div ref={containerRef} className={className}>
      {isVisible && (
        <Canvas
          {...canvasProps}
          frameloop={frameloop}
          style={{ 
            visibility: 'visible',
            ...canvasProps.style 
          }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
};
