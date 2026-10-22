import type { RefObject } from 'react';
import { Html } from '@react-three/drei';
import type { Object3D } from 'three';
import type { Hotspot } from '@/entities/unit';
import styles from './Hotspots.module.css';

interface Props {
  hotspots: readonly Hotspot[];
  activeId: string | null;
  /** Objects that hide a marker when they are between it and the camera. */
  occluders: RefObject<Object3D | null>[];
  onSelect: (id: string) => void;
}

export function Hotspots({ hotspots, activeId, occluders, onSelect }: Props) {
  return (
    <>
      {hotspots.map((h) => (
        <Html
          key={h.id}
          position={[...h.position]}
          center
          zIndexRange={[20, 0]}
          occlude={occluders as RefObject<Object3D>[]}
        >
          <button
            type="button"
            className={styles.marker}
            data-active={h.id === activeId}
            aria-label={`Inspect: ${h.label}`}
            aria-pressed={h.id === activeId}
            onClick={() => onSelect(h.id)}
          >
            <span aria-hidden="true">+</span>
          </button>
        </Html>
      ))}
    </>
  );
}
