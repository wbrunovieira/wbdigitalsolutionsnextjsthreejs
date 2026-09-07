import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { clamp, lerp } from '../math';
import {
  buildGraph,
  EDGE_COLOR,
  NODE_COUNT,
  NODE_PALETTE,
  PULSE_COLOR,
  PULSE_COUNT,
  Pulse,
} from './graph';

export type Keyframe = { pos: [number, number, number]; rotY: number; scale: number };

interface NetworkProps {
  progress: React.MutableRefObject<number>;
  dragRot: React.MutableRefObject<{ x: number; y: number }>;
  dragging: React.MutableRefObject<boolean>;
  inHero: React.MutableRefObject<boolean>;
  kf: Keyframe[]; // pose table for the current variant
}

const Network: React.FC<NetworkProps> = ({ progress, dragRot, dragging, inHero, kf }) => {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pulsesRef = useRef<THREE.InstancedMesh>(null);
  const pose = useRef({ x: 3.2, y: -0.2, z: 0, ry: 0, s: 1.0 });

  const { nodes, edges } = useMemo(buildGraph, []);
  const pulses = useMemo<Pulse[]>(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.45,
        spin: 0.5 + Math.random() * 0.8,
      })),
    [edges.length],
  );

  // Crystalline dodecahedron balls (same family as the websites/automation pages).
  const ballGeo = useMemo(() => new THREE.DodecahedronGeometry(1), []);
  const nodeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.35,
        metalness: 0.15,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
      }),
    [],
  );
  const pulseMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(PULSE_COLOR),
        roughness: 0.25,
        metalness: 0.15,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
      }),
    [],
  );

  const lineGeo = useMemo(() => {
    const positions = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], e) => {
      positions.set([nodes[a].pos.x, nodes[a].pos.y, nodes[a].pos.z], e * 6);
      positions.set([nodes[b].pos.x, nodes[b].pos.y, nodes[b].pos.z], e * 6 + 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [nodes, edges]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _a = useMemo(() => new THREE.Vector3(), []);
  const _b = useMemo(() => new THREE.Vector3(), []);

  // Per-node colours from the brand palette.
  useEffect(() => {
    if (!nodesRef.current) return;
    const c = new THREE.Color();
    nodes.forEach((_, i) => {
      c.set(NODE_PALETTE[i % NODE_PALETTE.length]);
      nodesRef.current!.setColorAt(i, c);
    });
    if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = clamp(progress.current, 0, 1);
    const time = state.clock.elapsedTime;

    // Group pose from keyframes.
    const n = kf.length - 1;
    const f = p * n;
    const i = Math.min(Math.floor(f), n - 1);
    const t = f - i;
    const a = kf[i];
    const b = kf[i + 1];
    const k = 1 - Math.pow(0.0018, delta);
    const pr = pose.current;
    pr.x = lerp(pr.x, lerp(a.pos[0], b.pos[0], t), k);
    pr.y = lerp(pr.y, lerp(a.pos[1], b.pos[1], t), k);
    pr.z = lerp(pr.z, lerp(a.pos[2], b.pos[2], t), k);
    pr.ry = lerp(pr.ry, lerp(a.rotY, b.rotY, t), k);
    pr.s = lerp(pr.s, lerp(a.scale, b.scale, t), k);

    if (inHero.current) {
      if (!dragging.current) dragRot.current.y += delta * 0.18;
    } else {
      const d = 1 - Math.pow(0.02, delta);
      dragRot.current.y = lerp(dragRot.current.y, 0, d);
      dragRot.current.x = lerp(dragRot.current.x, 0, d);
    }

    group.current.position.set(pr.x, pr.y + Math.sin(time * 0.6) * 0.05, pr.z);
    group.current.rotation.set(dragRot.current.x + 0.12, pr.ry + dragRot.current.y, 0);
    group.current.scale.setScalar(pr.s);

    // Nodes — fixed positions, gentle individual spin.
    if (nodesRef.current) {
      for (let ni = 0; ni < NODE_COUNT; ni++) {
        const nd = nodes[ni];
        dummy.position.copy(nd.pos);
        dummy.scale.setScalar(nd.size);
        dummy.rotation.set(time * nd.spin * 0.5, time * nd.spin, 0);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(ni, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Pulses — travel along edges (livelier as you scroll), spinning.
    if (pulsesRef.current) {
      const speedScale = 0.6 + p * 1.0;
      for (let pi = 0; pi < PULSE_COUNT; pi++) {
        const pulse = pulses[pi];
        pulse.t += pulse.speed * speedScale * delta;
        if (pulse.t >= 1) {
          pulse.t = 0;
          pulse.edge = Math.floor(Math.random() * edges.length);
          pulse.speed = 0.25 + Math.random() * 0.45;
        }
        const [ea, eb] = edges[pulse.edge];
        _a.copy(nodes[ea].pos);
        _b.copy(nodes[eb].pos);
        dummy.position.lerpVectors(_a, _b, pulse.t);
        dummy.scale.setScalar(0.16);
        dummy.rotation.set(time * pulse.spin * 0.6, time * pulse.spin, 0);
        dummy.updateMatrix();
        pulsesRef.current.setMatrixAt(pi, dummy.matrix);
      }
      pulsesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={0.55} toneMapped={false} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodesRef} args={[ballGeo, nodeMat, NODE_COUNT]} />
      <instancedMesh ref={pulsesRef} args={[ballGeo, pulseMat, PULSE_COUNT]} />
    </group>
  );
};

export default Network;
