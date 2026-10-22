import { useEffect, useRef, type ComponentRef } from 'react';
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
export function CameraRig({ initial, goal, reducedMotion, onUserMove }: Props) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const camera = useThree((s) => s.camera);
  const goalPos = useRef(new Vector3());
  const goalTarget = useRef(new Vector3());
  const moving = useRef(false);

  const snap = (view: CameraView) => {
    camera.position.set(...view.position);
    controls.current?.target.set(...view.target);
    controls.current?.update();
  };

  useEffect(() => {
    snap(initial);
    moving.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  useEffect(() => {
    if (!goal) {
      moving.current = false;
      return;
    }
    if (reducedMotion) {
      snap(goal);
      return;
    }
    goalPos.current.set(...goal.position);
    goalTarget.current.set(...goal.target);
    moving.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, reducedMotion]);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c || !moving.current) return;
    easing.damp3(camera.position, goalPos.current, 0.35, dt);
    easing.damp3(c.target, goalTarget.current, 0.35, dt);
    c.update();
    if (
      camera.position.distanceToSquared(goalPos.current) < 1e-4 &&
      c.target.distanceToSquared(goalTarget.current) < 1e-4
    ) {
      moving.current = false;
    }
  });

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
      onStart={() => {
        moving.current = false;
        onUserMove();
      }}
    />
  );
}
