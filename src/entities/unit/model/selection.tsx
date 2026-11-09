'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { UnitId } from './types';

type Selection = readonly [UnitId, (id: UnitId) => void];

const SelectedUnitContext = createContext<Selection | null>(null);

/**
 * Holds the chosen residence, shared by the tour and the booking form.
 * Page sections passed as children stay server-rendered and do not re-render
 * when the selection changes.
 */
export function SelectedUnitProvider({
  initial = 'loft',
  children,
}: {
  initial?: UnitId;
  children: ReactNode;
}) {
  const [unitId, setUnitId] = useState<UnitId>(initial);
  const selection = useMemo(() => [unitId, setUnitId] as const, [unitId]);
  return <SelectedUnitContext value={selection}>{children}</SelectedUnitContext>;
}

export function useSelectedUnit(): Selection {
  const selection = useContext(SelectedUnitContext);
  if (!selection) throw new Error('useSelectedUnit must be used inside SelectedUnitProvider');
  return selection;
}
