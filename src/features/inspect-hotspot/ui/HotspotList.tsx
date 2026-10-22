import type { Hotspot } from '@/entities/unit';
import styles from './HotspotList.module.css';

interface Props {
  hotspots: readonly Hotspot[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

/** Keyboard- and screen-reader-friendly list of the same hotspots as the 3D markers. */
export function HotspotList({ hotspots, activeId, onSelect }: Props) {
  return (
    <ul className={styles.list} aria-label="Points of interest">
      {hotspots.map((h) => (
        <li key={h.id}>
          <button
            type="button"
            className={styles.item}
            aria-pressed={h.id === activeId}
            onClick={() => onSelect(h.id)}
          >
            {h.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
