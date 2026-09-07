import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { lerp } from '../math';
import { TargetPose } from './keyframes';
import { getWbDecalMaterial } from './wbDecalMaterial';

export const COMPUTER_MODEL = '/models/desktop/scene.gltf';

interface ComputerProps {
  target: React.MutableRefObject<TargetPose>;
  dragRot: React.MutableRefObject<{ x: number; y: number }>;
  dragging: React.MutableRefObject<boolean>;
  inHero: React.MutableRefObject<boolean>;
}

const Computer: React.FC<ComputerProps> = ({ target, dragRot, dragging, inHero }) => {
  const { scene } = useGLTF(COMPUTER_MODEL);
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  // Current (damped) pose, eased toward `target` (computed from scroll in parent).
  const pose = useRef({ x: 4.5, y: -1, z: 0, rx: 0, ry: -0.35, rz: -0.05, s: 1.8 });
  // Ambient-motion amplitude (sway + float), ramped in/out — and held at 0 for
  // reduced-motion users (CLAUDE.md rule 6: every animation needs the gate).
  const swayAmp = useRef(0);
  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!inner.current) return;
    const box = new THREE.Box3().setFromObject(inner.current);
    const center = box.getCenter(new THREE.Vector3());
    inner.current.position.sub(center);

    // Enable real self-shadowing: the tower/monitor cast onto their own desk, and
    // since the shadow light is world-fixed, the shadow sweeps the desk as it spins.
    // Also de-brand: the model ships with GIGABYTE logo planes on the monitor
    // backs — swap their material for the WB wordmark decal (unlit, so it reads
    // like a printed logo regardless of the scene lights).
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
        if (/gigabyte-logo/i.test(m.name)) m.material = getWbDecalMaterial();
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const pr = pose.current;
    const tg = target.current;

    // Ease toward the scroll-derived target. While a section is on screen the
    // target glides upward with the scroll (the model rides the section up); when
    // the section leaves, the target jumps to the next stop and this easing plays
    // the descent into the next section.
    const k = 1 - Math.pow(0.05, delta); // frame-rate-independent damping (smoother ease in/out)
    pr.x = lerp(pr.x, tg.x, k);
    pr.y = lerp(pr.y, tg.y, k);
    pr.z = lerp(pr.z, tg.z, k);
    pr.rx = lerp(pr.rx, tg.rx, k);
    pr.ry = lerp(pr.ry, tg.ry, k);
    pr.rz = lerp(pr.rz, tg.rz, k);
    pr.s = lerp(pr.s, tg.s, k);

    // Drag offset decays once we leave the hero (dragRot carries ONLY user input;
    // a user's in-hero rotation persists until they scroll away).
    if (!inHero.current) {
      const d = 1 - Math.pow(0.02, delta);
      dragRot.current.y = lerp(dragRot.current.y, 0, d);
      dragRot.current.x = lerp(dragRot.current.x, 0, d);
    }

    // Ambient sway: a gentle ADDITIVE oscillation around the front-facing pose,
    // so the lit monitor stays toward the viewer (the old full 360 auto-spin
    // spent half its time showing the unlit backs). It lives in its own channel
    // (never written into dragRot) and its amplitude ramps to 0 while dragging,
    // outside the hero, or under prefers-reduced-motion.
    const ambient = inHero.current && !dragging.current && !reducedMotion.current ? 1 : 0;
    swayAmp.current = lerp(swayAmp.current, ambient, 1 - Math.pow(0.5, delta));
    const sway = Math.sin(state.clock.elapsedTime * 0.35) * 0.22 * swayAmp.current;
    const float = reducedMotion.current ? 0 : Math.sin(state.clock.elapsedTime * 0.7) * 0.06;

    group.current.position.set(pr.x, pr.y + float, pr.z);
    group.current.rotation.set(pr.rx + dragRot.current.x, pr.ry + dragRot.current.y + sway, pr.rz);
    group.current.scale.setScalar(pr.s);
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

export default Computer;
