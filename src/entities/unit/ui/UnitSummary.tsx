import { formatPrice } from '../model/units';
import type { Unit } from '../model/types';
import styles from './UnitSummary.module.css';

export function UnitSummary({ unit }: { unit: Unit }) {
  return (
    <aside className={styles.summary} aria-label={`${unit.name} summary`}>
      <small>
        {unit.name.toUpperCase()} · FLOOR {unit.floor}
      </small>
      <strong>{formatPrice(unit.price)}</strong>
      <span>
        {unit.areaM2} m² · {unit.bedrooms} bed · {unit.bathrooms} bath
      </span>
      <span>{unit.available}</span>
    </aside>
  );
}
