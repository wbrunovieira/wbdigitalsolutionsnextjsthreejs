import React, { useRef } from 'react';

const DRAG_SENSITIVITY = 0.006;
const DRAG_THRESHOLD_PX = 2;

/**
 * Pointer drag state shared between the DOM handlers and the R3F ring:
 * refs so dragging never triggers a React re-render mid-frame.
 */
export const useCarouselDrag = () => {
  const targetRotation = useRef(0);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const lastX = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    didDrag.current = false;
    lastX.current = e.clientX;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    targetRotation.current += dx * DRAG_SENSITIVITY;
    if (Math.abs(dx) > DRAG_THRESHOLD_PX) didDrag.current = true;
  };

  const endDrag = () => {
    dragging.current = false;
  };

  return { targetRotation, dragging, didDrag, onPointerDown, onPointerMove, endDrag };
};
