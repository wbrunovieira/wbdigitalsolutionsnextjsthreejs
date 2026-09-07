import React, { useCallback, useRef } from 'react';
import { clamp } from './math';

const YAW_PER_PX = 0.008;
const PITCH_PER_PX = 0.005;
const PITCH_LIMIT = 0.6;

/** Free rotation the user adds on top of the scroll pose, via the hero hit-zone. */
export const useHeroDrag = () => {
  const dragRot = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    dragRot.current.y += dx * YAW_PER_PX;
    dragRot.current.x = clamp(dragRot.current.x + dy * PITCH_PER_PX, -PITCH_LIMIT, PITCH_LIMIT);
  }, []);

  const onUp = useCallback(() => {
    dragging.current = false;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  }, [onMove]);

  const onDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [onMove, onUp],
  );

  return { dragRot, dragging, onDown };
};
