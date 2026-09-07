import React from 'react';
import { Text } from '@react-three/drei';

const FIRST_LINE_Y = 0.8;
const ITEM_GAP = 0.64;
const CONTINUATION_GAP = 0.3;

/** A line starting with spaces is the wrapped tail of the previous bullet. */
const isContinuation = (line: string) => line.startsWith('   ');

/** Stacks the bullets, giving wrapped tails a tighter gap than new bullets. */
const lineOffsets = (lines: string[]) => {
  let y = FIRST_LINE_Y;
  return lines.map((line, index) => {
    if (index === 0) {
      y = FIRST_LINE_Y;
    } else {
      y -= isContinuation(line) ? CONTINUATION_GAP : ITEM_GAP;
    }
    return y;
  });
};

interface HolographicLinesProps {
  lines: string[];
  color: string;
  opacity: number;
  scale: number;
  height: number;
  glow: number;
}

const HolographicLines: React.FC<HolographicLinesProps> = ({ lines, color, opacity, scale, height, glow }) => {
  const offsets = lineOffsets(lines);

  return (
    <>
      {lines.map((line, index) => (
        <Text
          key={line}
          position={[-4.0, offsets[index] * height, 0]}
          fontSize={0.36 * scale}
          color="#ffffff"
          fontWeight={600}
          anchorX="left"
          anchorY="middle"
          fillOpacity={opacity}
          outlineWidth={0.02}
          outlineColor="#000000"
          maxWidth={7.6}
        >
          {line}
          <meshStandardMaterial
            color="#ffffff"
            emissive={color}
            emissiveIntensity={glow * 0.3}
            transparent
            opacity={opacity}
          />
        </Text>
      ))}
    </>
  );
};

export default HolographicLines;
