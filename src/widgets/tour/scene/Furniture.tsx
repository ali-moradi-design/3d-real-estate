import { useLayoutEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import type { Mesh } from 'three';
import type { FurnitureItem } from '@/entities/unit';

export function modelUrl(model: FurnitureItem['model']): string {
  return `/models/${model}.glb`;
}

export function Furniture({ item }: { item: FurnitureItem }) {
  const { scene } = useGLTF(modelUrl(item.model));
  const object = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    object.traverse((child) => {
      const mesh = child as Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [object]);

  return (
    <primitive object={object} position={item.position} rotation={[0, item.rotationY ?? 0, 0]} />
  );
}
