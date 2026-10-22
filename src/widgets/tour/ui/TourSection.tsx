'use client';

import { useState } from 'react';
import { getUnit, UnitSummary, type UnitId } from '@/entities/unit';
import { HotspotCard, HotspotList } from '@/features/inspect-hotspot';
import { UnitTabs } from '@/features/switch-unit';
import type { CameraView } from '../scene/CameraRig';
import { TourViewer } from './TourViewer';
import styles from './TourSection.module.css';

interface Props {
  unitId: UnitId;
  onUnitChange: (id: UnitId) => void;
}

export function TourSection({ unitId, onUnitChange }: Props) {
  const unit = getUnit(unitId);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [goal, setGoal] = useState<CameraView | null>(null);

  const index = unit.hotspots.findIndex((h) => h.id === activeId);
  const active = index >= 0 ? (unit.hotspots[index] ?? null) : null;

  const select = (id: string) => {
    const hotspot = unit.hotspots.find((h) => h.id === id);
    if (!hotspot) return;
    setActiveId(id);
    setGoal({ position: hotspot.view.position, target: hotspot.view.target });
  };

  const changeUnit = (id: UnitId) => {
    setActiveId(null);
    setGoal(null);
    onUnitChange(id);
  };

  const reset = () => {
    setActiveId(null);
    setGoal({ position: unit.view.position, target: unit.view.target });
  };

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
          <UnitTabs value={unitId} onChange={changeUnit} panelId="tour-panel" />
        </div>

        <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${unit.id}`}>
          <TourViewer
            unit={unit}
            activeHotspotId={activeId}
            goal={goal}
            onSelectHotspot={select}
            onUserMove={() => setGoal(null)}
          >
            <div className={styles.summary}>
              <UnitSummary unit={unit} />
            </div>
            <div className={styles.card}>
              <HotspotCard
                hotspot={active}
                index={index}
                total={unit.hotspots.length}
                onClose={() => setActiveId(null)}
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
