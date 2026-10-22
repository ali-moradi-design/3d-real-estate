'use client';

import type { KeyboardEvent } from 'react';
import { units, type UnitId } from '@/entities/unit';
import styles from './UnitTabs.module.css';

interface Props {
  value: UnitId;
  onChange: (id: UnitId) => void;
  panelId: string;
}

export function UnitTabs({ value, onChange, panelId }: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = units[(index + (e.key === 'ArrowRight' ? 1 : units.length - 1)) % units.length];
    if (!next) return;
    onChange(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div className={styles.tabs} role="tablist" aria-label="Residence">
      {units.map((u, i) => (
        <button
          key={u.id}
          id={`tab-${u.id}`}
          type="button"
          role="tab"
          aria-selected={u.id === value}
          aria-controls={panelId}
          tabIndex={u.id === value ? 0 : -1}
          className={styles.tab}
          onClick={() => onChange(u.id)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          {u.name}
        </button>
      ))}
    </div>
  );
}
