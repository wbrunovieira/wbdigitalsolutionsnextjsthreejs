import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Color,
  DodecahedronGeometry,
  InstancedBufferAttribute,
  InstancedMesh,
  MeshPhysicalMaterial,
  Object3D,
  RectAreaLight,
  Vector3,
} from 'three';
import { clamp, lerp, smoothstep } from '../math';
import { HERO_END, HERO_ZONE } from '../heroRefs';
import { AutomationRefs } from './types';

const NUM_INSTANCES = 40;
const MOBILE_INSTANCES = 18;
const MIN_DISTANCE = 6;
const INTERACTION_DISTANCE = 10;
const INTENSITY_SCALE = 9000;
const MIN_INTENSITY_CLOSE = 10000;

// 1 in EVERY_NTH balls follows the gear on scroll.
const COMPANION_EVERY = 5;

type Instance = {
  position: Vector3;
  offset: Vector3;
  velocity: Vector3;
  attraction: number;
  vlimit: number;
  companion: boolean;
  baseAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: number;
};

interface BallsProps extends AutomationRefs {
  lightRef: React.RefObject<RectAreaLight>;
}

const AutomationSwarm: React.FC<BallsProps> = ({ lightRef, progress, target, pose }) => {
  const geometry = useMemo(() => new DodecahedronGeometry(3.2), []);
  const material = useMemo(() => new MeshPhysicalMaterial({ vertexColors: true, transparent: true }), []);
  const dummy = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>(null);
  const _dir = useMemo(() => new Vector3(), []);
  const _personalTarget = useMemo(() => new Vector3(), []);
  const _orbit = useMemo(() => new Vector3(), []);

  // Fewer particles on mobile (less clutter + perf).
  const count = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches ? MOBILE_INSTANCES : NUM_INSTANCES),
    [],
  );

  const instances = useMemo<Instance[]>(() => {
    const list: Instance[] = [];
    for (let i = 0; i < count; i++) {
      let position: Vector3;
      let overlapping: boolean;
      let attempt = 0;
      do {
        position = new Vector3(
          Math.random() * 60 - 30,
          Math.random() * 40 - 20,
          Math.random() * 20 - 10,
        );
        overlapping = list.some((e) => position.distanceTo(e.position) < MIN_DISTANCE);
        attempt++;
      } while (overlapping && attempt < 500);

      list.push({
        position: position.clone(),
        offset: position.clone(),
        velocity: new Vector3(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
        attraction: 0.01,
        vlimit: 0.2,
        companion: i % COMPANION_EVERY === 0,
        baseAngle: Math.random() * Math.PI * 2,
        orbitRadius: 14 + Math.random() * 12,
        orbitSpeed: 0.4 + Math.random() * 0.5,
        orbitTilt: Math.random() * Math.PI,
      });
    }
    return list;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const palette = [new Color('#792990'), new Color('#350545'), new Color('#aaa6c3'), new Color('#ffb947')];
    const colors = new Float32Array(instances.length * 3);
    for (let i = 0; i < instances.length; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      dummy.position.copy(instances[i].position);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    geometry.setAttribute('color', new InstancedBufferAttribute(colors, 3));
    geometry.attributes.color.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [geometry, dummy, instances]);

  useFrame(() => {
    if (!meshRef.current || !lightRef.current) return;
    const p = clamp(progress.current, 0, 1);
    const heroInfluence = 1 - smoothstep(HERO_ZONE, HERO_END, p);
    const gather = smoothstep(HERO_ZONE, 0.5, p);
    const fade = smoothstep(HERO_ZONE, 0.35, p);
    const gp = pose.current;

    let intensityAccum = 0;
    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i];

      _personalTarget.copy(target.current).add(inst.offset);
      _dir.copy(_personalTarget).sub(inst.position).normalize().multiplyScalar(inst.attraction * heroInfluence);
      inst.velocity.add(_dir).clampScalar(-inst.vlimit, inst.vlimit);
      inst.position.add(inst.velocity);

      let scale = 1;
      if (inst.companion && gather > 0.001) {
        const ang = inst.baseAngle + p * Math.PI;
        const r = lerp(inst.orbitRadius, inst.orbitRadius * 0.45, gather);
        _orbit.set(
          gp.x + Math.cos(ang) * r,
          gp.y + Math.sin(ang) * r * 0.6,
          gp.z + Math.sin(ang + inst.orbitTilt) * r * 0.5,
        );
        inst.position.lerp(_orbit, gather * 0.12 + 0.02);
      } else if (!inst.companion) {
        scale = 1 - fade;
      }

      dummy.position.copy(inst.position);
      dummy.rotation.x += 0.002;
      dummy.rotation.y += 0.002;
      dummy.scale.setScalar(Math.max(scale, 0.0001));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const d = inst.position.distanceTo(target.current);
      if (d < MIN_DISTANCE) {
        intensityAccum = Math.max(intensityAccum, Math.max(MIN_INTENSITY_CLOSE, (INTENSITY_SCALE * (MIN_DISTANCE - d)) / MIN_DISTANCE));
      } else if (d < INTERACTION_DISTANCE) {
        intensityAccum = Math.max(intensityAccum, (MIN_INTENSITY_CLOSE * (INTERACTION_DISTANCE - d)) / INTERACTION_DISTANCE);
      }
    }

    const targetIntensity = intensityAccum * heroInfluence;
    lightRef.current.intensity = lightRef.current.intensity * 0.9 + targetIntensity * 0.1;
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, instances.length]} />;
};

export default AutomationSwarm;
