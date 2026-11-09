'use client';

import { useCallback, useState } from 'react';
import { getUnit, UnitSummary, useSelectedUnit, type UnitId } from '@/entities/unit';
import { HotspotCard, HotspotList } from '@/features/inspect-hotspot';
import { UnitTabs } from '@/features/switch-unit';
import type { CameraView } from '../scene/CameraRig';
import { TourViewer } from './TourViewer';
import styles from './TourSection.module.css';

interface TourState {
  /** The unit this state belongs to. A state of another unit counts as empty. */
  unitId: UnitId;
  activeId: string | null;
  goal: CameraView | null;
}

export function TourSection() {
  const [unitId, setUnitId] = useSelectedUnit();
  const unit = getUnit(unitId);
  const [state, setState] = useState<TourState>({ unitId, activeId: null, goal: null });

  // The unit can also change from the booking form, so the selection is tied to its unit
  // instead of being reset by the tabs only.
  const current = state.unitId === unitId ? state : null;
  const activeId = current?.activeId ?? null;
  const goal = current?.goal ?? null;

  const index = unit.hotspots.findIndex((h) => h.id === activeId);
  const active = index >= 0 ? (unit.hotspots[index] ?? null) : null;

  const select = useCallback(
    (id: string) => {
      const hotspot = unit.hotspots.find((h) => h.id === id);
      if (!hotspot) return;
      // A new object starts a new camera move, even for the hotspot already selected.
      setState({ unitId: unit.id, activeId: id, goal: { ...hotspot.view } });
    },
    [unit, setState],
  );

  const reset = useCallback(() => {
    setState({ unitId: unit.id, activeId: null, goal: { ...unit.view } });
  }, [unit, setState]);

  const close = useCallback(() => {
    setState((s) => (s.activeId === null ? s : { ...s, activeId: null }));
  }, [setState]);

  // Called on every drag start: keep the same state object when there is no move to stop.
  const stopMove = useCallback(() => {
    setState((s) => (s.goal === null ? s : { ...s, goal: null }));
  }, [setState]);

  return (
    <section className={styles.section} id="tour" aria-labelledby="tour-title">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Interactive tour</p>
            <h2 id="tour-title">Step inside.</h2>
            <p className={styles.lead}>
              Drag to look around. Select a hotspot to see materials, sizes and prices.
            </p>
          </div>
          <UnitTabs value={unitId} onChange={setUnitId} panelId="tour-panel" />
        </div>

        <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${unit.id}`}>
          <TourViewer
            unit={unit}
            activeHotspotId={activeId}
            goal={goal}
            onSelectHotspot={select}
            onUserMove={stopMove}
          >
            <div className={styles.summary}>
              <UnitSummary unit={unit} />
            </div>
            <div className={styles.card}>
              <HotspotCard
                hotspot={active}
                index={index}
                total={unit.hotspots.length}
                onClose={close}
              />
            </div>
            <div className={styles.hud}>
              <span>Drag to look around</span>
              <button type="button" onClick={reset}>
                Reset view
              </button>
            </div>
          </TourViewer>
          <HotspotList hotspots={unit.hotspots} activeId={activeId} onSelect={select} />
        </div>
      </div>
    </section>
  );
}
