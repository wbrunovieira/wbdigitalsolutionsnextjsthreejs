import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { animate } from 'framer-motion';
import { clamp, lerp, smoothstep } from '../math';
import { HERO_END, HERO_ZONE } from '../heroRefs';
import { AiRefs } from './types';

export const AI_MODEL = '/models/ai/ai_opt.glb';

const AiModel: React.FC<AiRefs> = ({ progress, pose, kf }) => {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF(AI_MODEL);
  const current = useRef({ x: 40, y: 4, z: 0, s: 12 });

  useEffect(() => {
    const frameNode = scene.children.find((node) => node.name === 'Frame');
    if (frameNode) {
      frameNode.rotation.x = Math.PI / 2;
      animate(frameNode.rotation.x, 0, {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        onUpdate: (value) => {
          frameNode.rotation.x = value;
        },
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    const p = clamp(progress.current, 0, 1);
    const heroInfluence = 1 - smoothstep(HERO_ZONE, HERO_END, p);

    const n = kf.length - 1;
    const f = p * n;
    const i = Math.min(Math.floor(f), n - 1);
    const seg = f - i;
    const a = kf[i];
    const b = kf[i + 1];

    const k = 1 - Math.pow(0.0015, delta);
    const pr = current.current;
    pr.x = lerp(pr.x, lerp(a.pos[0], b.pos[0], seg), k);
    pr.y = lerp(pr.y, lerp(a.pos[1], b.pos[1], seg), k);
    pr.z = lerp(pr.z, lerp(a.pos[2], b.pos[2], seg), k);
    pr.s = lerp(pr.s, lerp(a.scale, b.scale, seg), k);

    const t = state.clock.getElapsedTime();
    const floatY = Math.sin(t) * 1.2 * heroInfluence;
    modelRef.current.position.set(pr.x, pr.y + floatY, pr.z);
    modelRef.current.rotation.z = Math.sin(t * 0.5) * 0.05 * heroInfluence;
    modelRef.current.rotation.y += 0.004 + p * 0.02; // keep spinning, faster on scroll
    modelRef.current.scale.setScalar(pr.s);

    pose.current = { x: pr.x, y: pr.y, z: pr.z, s: pr.s };
  });

  return <primitive ref={modelRef} object={scene} scale={12} position={[40, 4, 0]} />;
};

export default AiModel;
