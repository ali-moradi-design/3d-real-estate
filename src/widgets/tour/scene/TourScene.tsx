import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import type { Group } from 'three';
import type { Unit } from '@/entities/unit';
import { CameraRig, type CameraView } from './CameraRig';
import { Furniture } from './Furniture';
import { Hotspots } from './Hotspots';
import { Room } from './Room';

export interface TourSceneProps {
  unit: Unit;
  activeHotspotId: string | null;
  goal: CameraView | null;
  paused: boolean;
  reducedMotion: boolean;
  lite: boolean;
  onSelectHotspot: (id: string) => void;
  onUserMove: () => void;
  onReady: () => void;
}

/** Fires once the first frames are drawn, so the poster can fade out. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 3) onReady();
  });
  return null;
}

function Lights({ unit, lite }: { unit: Unit; lite: boolean }) {
  const { width: W, depth: D, height: H, window: win } = unit.room;
  const winCx = (win.x1 + win.x2) / 2;
  return (
    <>
      <hemisphereLight args={['#fff6e6', '#cdbfa8', 1.05]} />
      {/* Sun enters through the window opening in the back wall. */}
      <directionalLight
        position={[winCx + 2, 5, -D / 2 - 7]}
        intensity={3.2}
        color="#fff1d6"
        castShadow
        shadow-mapSize={lite ? [1024, 1024] : [2048, 2048]}
        shadow-camera-left={-W}
        shadow-camera-right={W}
        shadow-camera-top={H + 3}
        shadow-camera-bottom={-H}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-bias={-0.0005}
        shadow-radius={5}
      />
      <pointLight position={[-W / 4, H - 0.3, 0]} intensity={10} distance={10} color="#ffe9c8" />
      <pointLight position={[W / 4, H - 0.3, 0]} intensity={10} distance={10} color="#ffe9c8" />
      <Environment resolution={128} frames={1} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={3} position={[0, 2, -8]} scale={[10, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={1.2}
          position={[0, H, 0]}
          scale={[6, 4, 1]}
          rotation-x={Math.PI / 2}
        />
      </Environment>
    </>
  );
}

export default function TourScene({
  unit,
  activeHotspotId,
  goal,
  paused,
  reducedMotion,
  lite,
  onSelectHotspot,
  onUserMove,
  onReady,
}: TourSceneProps) {
  const sceneRef = useRef<Group>(null);

  return (
    <Canvas
      shadows="percentage"
      frameloop={paused ? 'never' : 'always'}
      dpr={lite ? [1, 1.25] : [1, 2]}
      camera={{ fov: 58, near: 0.1, far: 60, position: [...unit.view.position] }}
      gl={{ antialias: !lite, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#16231f']} />
      <Suspense fallback={null}>
        <Lights unit={unit} lite={lite} />
        <group ref={sceneRef} key={unit.id}>
          <Room room={unit.room} />
          {unit.furniture.map((item, i) => (
            <Furniture key={`${item.model}-${i}`} item={item} />
          ))}
        </group>
        <Hotspots
          key={`hotspots-${unit.id}`}
          hotspots={unit.hotspots}
          activeId={activeHotspotId}
          occluders={[sceneRef]}
          onSelect={onSelectHotspot}
        />
        <ReadySignal key={unit.id} onReady={onReady} />
      </Suspense>
      <CameraRig
        initial={unit.view}
        goal={goal}
        reducedMotion={reducedMotion}
        onUserMove={onUserMove}
      />
    </Canvas>
  );
}
