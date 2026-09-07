import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Color, Group, Mesh, MeshStandardMaterial } from 'three';
import { animate } from 'framer-motion';
import { clamp, lerp, smoothstep } from '../math';
import { HERO_END, HERO_ZONE } from '../heroRefs';
import { WebsiteRefs } from './types';

export const LAPTOP_MODEL = '/models/macbook-pro.glb';
export const SCREEN_TEXTURE = '/models/screen.png';

const Laptop: React.FC<WebsiteRefs> = ({ progress, pointer, pose, kf }) => {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF(LAPTOP_MODEL);
  const screenTexture = useTexture(SCREEN_TEXTURE);
  screenTexture.flipY = false;

  // Lerped base pose driven by scroll.
  const current = useRef({ x: 45, y: -1, z: 0, ry: 0, s: 14 });

  useMemo(() => {
    scene.traverse((node) => {
      if (node instanceof Mesh) {
        if (node.name === 'Screen') {
          node.material = new MeshStandardMaterial({ map: screenTexture, metalness: 0.2, roughness: 0.9 });
        } else {
          node.material = new MeshStandardMaterial({ color: new Color(0xa9a9a9), metalness: 0.3, roughness: 0.5 });
        }
      }
    });
  }, [scene, screenTexture]);

  // Open the lid on mount.
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

    // Interpolate the keyframe list by progress.
    const n = kf.length - 1;
    const f = p * n;
    const i = Math.min(Math.floor(f), n - 1);
    const seg = f - i;
    const a = kf[i];
    const b = kf[i + 1];

    const k = 1 - Math.pow(0.0015, delta); // frame-rate-independent damping
    const pr = current.current;
    pr.x = lerp(pr.x, lerp(a.pos[0], b.pos[0], seg), k);
    pr.y = lerp(pr.y, lerp(a.pos[1], b.pos[1], seg), k);
    pr.z = lerp(pr.z, lerp(a.pos[2], b.pos[2], seg), k);
    pr.ry = lerp(pr.ry, lerp(a.rotY, b.rotY, seg), k);
    pr.s = lerp(pr.s, lerp(a.scale, b.scale, seg), k);

    const t = state.clock.getElapsedTime();
    const floatY = Math.sin(t) * 1.5 * heroInfluence;
    const wobbleZ = Math.sin(t * 0.5) * 0.05 * heroInfluence;
    const tiltY = pointer.current.x * 0.3 * heroInfluence;
    const tiltX = -pointer.current.y * 0.15 * heroInfluence;

    modelRef.current.position.set(pr.x, pr.y + floatY, pr.z);
    modelRef.current.rotation.set(tiltX, pr.ry + tiltY, wobbleZ);
    modelRef.current.scale.setScalar(pr.s);

    // Publish a stable center (no float jitter) for the companion balls to orbit.
    pose.current = { x: pr.x, y: pr.y, z: pr.z, s: pr.s };
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
};

export default Laptop;
