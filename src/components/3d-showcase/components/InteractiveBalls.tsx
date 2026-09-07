import React from 'react';
import InteractiveBall from './InteractiveBall';
import { ANIMATION, COLORS } from '../constants';

type Vec3 = [number, number, number];

const BALLS: { position: Vec3; velocity: Vec3; color: string; emissive: string }[] = [
  { position: [-6, 3, 2], velocity: [-3, 0, -4], color: COLORS.purple, emissive: COLORS.darkPurple },
  { position: [6, 4, 3], velocity: [2, 0, -5], color: COLORS.yellow, emissive: COLORS.orange },
  { position: [0, 3.5, 5], velocity: [1, 0, -6], color: COLORS.darkPurple, emissive: COLORS.purple },
];

/** The three physics balls dropped into the room on load. */
const InteractiveBalls: React.FC = () => (
  <>
    {BALLS.map((ball, index) => (
      <InteractiveBall
        key={ball.position.join(',')}
        position={ball.position}
        velocity={ball.velocity}
        color={ball.color}
        emissive={ball.emissive}
        delay={ANIMATION.ballDropDelays[index]}
      />
    ))}
  </>
);

export default InteractiveBalls;
