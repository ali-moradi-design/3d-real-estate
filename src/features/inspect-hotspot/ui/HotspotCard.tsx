import type { Hotspot } from '@/entities/unit';
import styles from './HotspotCard.module.css';

interface Props {
  hotspot: Hotspot | null;
  index: number;
  total: number;
  onClose: () => void;
}

export function HotspotCard({ hotspot, index, total, onClose }: Props) {
  return (
    <section
      className={styles.card}
      aria-live="polite"
      aria-label="Hotspot details"
      data-open={!!hotspot}
    >
      {hotspot ? (
        <>
          <small>
            HOTSPOT {index + 1} OF {total}
          </small>
          <h3>{hotspot.title}</h3>
          <p>{hotspot.text}</p>
          <dl>
            {hotspot.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </>
      ) : (
        <p className={styles.hint}>Select a + marker to see materials, sizes and prices.</p>
      )}
    </section>
  );
}
