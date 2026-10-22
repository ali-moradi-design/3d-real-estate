'use client';

import { useState } from 'react';
import type { UnitId } from '@/entities/unit';
import { TourSection } from '@/widgets/tour';

export function HomePage() {
  const [unitId, setUnitId] = useState<UnitId>('loft');

  return (
    <main>
      <TourSection unitId={unitId} onUnitChange={setUnitId} />
    </main>
  );
}
