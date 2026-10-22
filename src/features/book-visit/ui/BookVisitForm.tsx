'use client';

import { useState, type FormEvent } from 'react';
import { units, type UnitId } from '@/entities/unit';
import { Button } from '@/shared/ui';
import styles from './BookVisitForm.module.css';

interface Props {
  unitId: UnitId;
  onUnitChange: (id: UnitId) => void;
}

/** A demo form: nothing is sent anywhere. */
export function BookVisitForm({ unitId, onUnitChange }: Props) {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSentTo(String(data.get('name') ?? ''));
    e.currentTarget.reset();
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <label>
        Full name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Preferred residence
        <select value={unitId} onChange={(e) => onUnitChange(e.target.value as UnitId)}>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">Request a visit</Button>
      <p className={styles.status} role="status">
        {sentTo
          ? `Thank you, ${sentTo}. This is a demo, so nothing was sent.`
          : 'This is a demo form. Nothing is sent.'}
      </p>
    </form>
  );
}
