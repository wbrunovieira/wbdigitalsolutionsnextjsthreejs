import * as THREE from 'three';

// De-brand decal (WB wordmark over the model's GIGABYTE logo planes). Lazy
// module-level singleton, intentionally NEVER disposed: the swap mutates drei's
// process-wide GLTF cache, so the material must outlive any single mount —
// disposing it on unmount would leave the cached meshes pointing at a dead
// material (black planes on remount or for any other consumer of this model).
let wbDecalMaterial: THREE.MeshBasicMaterial | null = null;

export const getWbDecalMaterial = () => {
  if (!wbDecalMaterial) {
    const texture = new THREE.TextureLoader().load('/models/desktop/textures/wb-logo.png', (t) => {
      t.flipY = false; // glTF UV convention
      t.colorSpace = THREE.SRGBColorSpace;
    });
    wbDecalMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  }
  return wbDecalMaterial;
};
