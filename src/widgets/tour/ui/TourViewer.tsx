'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMediaQuery } from '@/shared/lib';
import type { Unit } from '@/entities/unit';
import type { CameraView } from '../scene/CameraRig';
import styles from './TourViewer.module.css';

// The 3D scene is loaded on the client only, after the first paint and near the viewport.
const TourScene = dynamic(() => import('../scene/TourScene'), { ssr: false });

interface Props {
  unit: Unit;
  activeHotspotId: string | null;
  goal: CameraView | null;
  onSelectHotspot: (id: string) => void;
  onUserMove: () => void;
  children?: ReactNode;
}

export function TourViewer({
  unit,
  activeHotspotId,
  goal,
  onSelectHotspot,
  onUserMove,
  children,
}: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [readyUnit, setReadyUnit] = useState<string | null>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const lite = useMediaQuery('(max-width: 760px), (pointer: coarse)');

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoad(true);
          loader.disconnect();
        }
      },
      { rootMargin: '600px' },
    );
    const visibility = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting));
    loader.observe(el);
    visibility.observe(el);
    return () => {
      loader.disconnect();
      visibility.disconnect();
    };
  }, []);

  const ready = readyUnit === unit.id;

  return (
    <div className={styles.frame} ref={frame} data-ready={ready}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.poster}
        src={unit.poster}
        alt={unit.posterAlt}
        width={1600}
        height={900}
      />
      {load ? (
        <div className={styles.canvas} data-testid="tour-canvas">
          <TourScene
            unit={unit}
            activeHotspotId={activeHotspotId}
            goal={goal}
            paused={!inView}
            reducedMotion={reducedMotion}
            lite={lite}
            onSelectHotspot={onSelectHotspot}
            onUserMove={onUserMove}
            onReady={() => setReadyUnit(unit.id)}
          />
        </div>
      ) : null}
      <div className={styles.overlay}>{children}</div>
    </div>
  );
}
