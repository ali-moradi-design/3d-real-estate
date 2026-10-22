import type { UnitId } from '@/entities/unit';
import { BookVisitForm } from '@/features/book-visit';
import styles from './BookVisit.module.css';

interface Props {
  unitId: UnitId;
  onUnitChange: (id: UnitId) => void;
}

export function BookVisit({ unitId, onUnitChange }: Props) {
  return (
    <section className={styles.section} id="book" aria-labelledby="book-title">
      <div className={styles.wrap}>
        <div>
          <p className={styles.eyebrow}>Book a visit</p>
          <h2 id="book-title">See it in person.</h2>
          <p className={styles.lead}>
            Tour the show apartment and meet the team. Visits take about 30 minutes.
          </p>
        </div>
        <BookVisitForm unitId={unitId} onUnitChange={onUnitChange} />
      </div>
    </section>
  );
}
