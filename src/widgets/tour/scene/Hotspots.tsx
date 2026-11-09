import { memo, type RefObject } from 'react';
import { Html } from '@react-three/drei';
import type { Object3D } from 'three';
import type { Hotspot } from '@/entities/unit';
import styles from './Hotspots.module.css';

interface Props {
  hotspots: readonly Hotspot[];
  activeId: string | null;
  /** Objects that hide a marker when they are between it and the camera. Keep the array stable. */
  occluders: RefObject<Object3D | null>[];
  onSelect: (id: string) => void;
}

const Z_INDEX_RANGE = [20, 0];

/**
 * Memoized: each Html re-renders its own React root on every render, so the markers
 * re-render only when the hotspots, the active one or the handler change.
 */
export const Hotspots = memo(function Hotspots({ hotspots, activeId, occluders, onSelect }: Props) {
  return (
    <>
      {hotspots.map((h) => (
        <Html
          key={h.id}
          position={h.position as [number, number, number]}
          center
          zIndexRange={Z_INDEX_RANGE}
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
});
