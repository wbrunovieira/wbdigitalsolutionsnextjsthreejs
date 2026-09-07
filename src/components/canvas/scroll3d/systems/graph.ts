import * as THREE from 'three';

// Brand palette (same colours as the website/automation balls).
export const NODE_PALETTE = ['#792990', '#350545', '#aaa6c3'];
export const PULSE_COLOR = '#ffb947';
export const EDGE_COLOR = '#b083d6'; // brighter lilac so the thin connecting lines read on dark

export const NODE_COUNT = 48;
export const PULSE_COUNT = 42;
const RADIUS = 3.8;
const HUB_COUNT = 5;

export type GraphNode = { pos: THREE.Vector3; size: number; spin: number };
export type Pulse = { edge: number; t: number; speed: number; spin: number };

export function buildGraph() {
  // Nodes on a sphere SHELL (Fibonacci sphere) so it reads as a clean network
  // globe instead of a filled blob.
  const nodes: GraphNode[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const r = RADIUS * (0.97 + Math.random() * 0.06);
    nodes.push({
      pos: new THREE.Vector3(
        Math.cos(theta) * ring * r,
        y * r * 0.92,
        Math.sin(theta) * ring * r,
      ),
      size: 0.18 + Math.random() * 0.09,
      spin: 0.3 + Math.random() * 0.6,
    });
  }
  for (let h = 0; h < HUB_COUNT; h++) {
    nodes[Math.floor(Math.random() * NODE_COUNT)].size = 0.34 + Math.random() * 0.1;
  }

  // Connect each node to its k nearest neighbours.
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < NODE_COUNT; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (j !== i) dists.push([j, nodes[i].pos.distanceTo(nodes[j].pos)]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    const k = nodes[i].size > 0.3 ? 5 : 3;
    for (let m = 0; m < k && m < dists.length; m++) {
      const j = dists[m][0];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }
  return { nodes, edges };
}
