import { memo, useCallback, useEffect, useRef, type ComponentRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { easing } from 'maath';
import { Vector3 } from 'three';
import type { Vec3 } from '@/entities/unit';

export interface CameraView {
  position: Vec3;
  target: Vec3;
}

interface Props {
  /** The view the unit starts with. The camera snaps to it when it changes. */
  initial: CameraView;
  /** A view to move to. A new object starts a new move. */
  goal: CameraView | null;
  reducedMotion: boolean;
  /** Called when the visitor grabs the camera. */
  onUserMove: () => void;
}

/** Orbit controls limited to the room, plus an eased move to a hotspot view. */
export const CameraRig = memo(function CameraRig({
  initial,
  goal,
  reducedMotion,
  onUserMove,
}: Props) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const get = useThree((s) => s.get);
  const goalPos = useRef(new Vector3());
  const goalTarget = useRef(new Vector3());
  const moving = useRef(false);
  const firstStep = useRef(false);

  // The scene renders on demand, so every camera change asks for a new frame.
  const snap = useCallback(
    (view: CameraView) => {
      const { camera, invalidate } = get();
      camera.position.set(...view.position);
      controls.current?.target.set(...view.target);
      controls.current?.update();
      invalidate();
    },
    [get],
  );

  useEffect(() => {
    snap(initial);
    moving.current = false;
  }, [initial, snap]);

  useEffect(() => {
    if (!goal) {
      moving.current = false;
      return;
    }
    if (reducedMotion) {
      moving.current = false;
      snap(goal);
      return;
    }
    goalPos.current.set(...goal.position);
    goalTarget.current.set(...goal.target);
    moving.current = true;
    firstStep.current = true;
    get().invalidate();
  }, [goal, reducedMotion, snap, get]);

  useFrame((state, dt) => {
    const c = controls.current;
    if (!c || !moving.current) return;
    // Frames are drawn on demand, so the first frame of a move reports the whole idle
    // time as its delta: replace it with one 60 Hz frame, or the camera would jump.
    // Later deltas are capped too, for a frame after a stall or a hidden tab.
    const step = firstStep.current ? 1 / 60 : Math.min(dt, 0.1);
    firstStep.current = false;
    easing.damp3(state.camera.position, goalPos.current, 0.35, step);
    easing.damp3(c.target, goalTarget.current, 0.35, step);
    c.update();
    if (
      state.camera.position.distanceToSquared(goalPos.current) < 1e-4 &&
      c.target.distanceToSquared(goalTarget.current) < 1e-4
    ) {
      moving.current = false;
    } else {
      state.invalidate();
    }
  });

  const handleStart = useCallback(() => {
    moving.current = false;
    onUserMove();
  }, [onUserMove]);

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.5}
      minAzimuthAngle={-Math.PI * 0.42}
      maxAzimuthAngle={Math.PI * 0.42}
      minPolarAngle={Math.PI * 0.2}
      maxPolarAngle={Math.PI * 0.62}
      onStart={handleStart}
    />
  );
});
