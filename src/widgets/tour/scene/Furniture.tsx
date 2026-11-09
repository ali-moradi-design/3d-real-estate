import { memo, useMemo } from 'react';
import type { Mesh, Object3D } from 'three';
import type { FurnitureItem, ModelId, Unit } from '@/entities/unit';

export function modelUrl(model: ModelId): string {
  return `/models/${model}.glb`;
}

/**
 * The model files of a unit, each once, in a fixed order. Loading them with one
 * useGLTF(urls) call suspends the scene once instead of once per model, and
 * preloading the same list hits the same cache entry.
 */
export function unitModelUrls(unit: Unit): string[] {
  return [...new Set(unit.furniture.map((f) => modelUrl(f.model)))];
}

export const Furniture = memo(function Furniture({
  item,
  source,
}: {
  item: FurnitureItem;
  /** The loaded model scene for item.model. */
  source: Object3D;
}) {
  // The clone shares geometry and materials with the cached model, so it is cheap
  // and nothing has to be disposed when it unmounts.
  const object = useMemo(() => {
    const clone = source.clone(true);
    clone.traverse((child) => {
      const mesh = child as Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [source]);

  return <primitive object={object} position={item.position} rotation-y={item.rotationY ?? 0} />;
});
