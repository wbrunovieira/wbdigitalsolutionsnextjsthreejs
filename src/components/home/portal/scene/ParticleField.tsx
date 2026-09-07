import React from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  positions: Float32Array;
  colors: Float32Array;
  size: number;
  opacity: number;
}

/** Additive point cloud shared by the portal particle systems. */
const ParticleField = React.forwardRef<THREE.Points, ParticleFieldProps>(
  ({ positions, colors, size, opacity }, ref) => (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </points>
  ),
);

ParticleField.displayName = 'ParticleField';

export default ParticleField;
