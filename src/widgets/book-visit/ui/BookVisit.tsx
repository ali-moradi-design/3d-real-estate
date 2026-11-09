'use client';

import { useSelectedUnit } from '@/entities/unit';
import { BookVisitForm } from '@/features/book-visit';
import styles from './BookVisit.module.css';

export function BookVisit() {
  const [unitId, setUnitId] = useSelectedUnit();

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
        <BookVisitForm unitId={unitId} onUnitChange={setUnitId} />
      </div>
    </section>
  );
}
