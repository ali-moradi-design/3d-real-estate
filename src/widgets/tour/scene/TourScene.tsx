import {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import { PCFShadowMap, type Group, type Object3D } from 'three';
import { units, type Unit, type UnitId } from '@/entities/unit';
import { CameraRig, type CameraView } from './CameraRig';
import { Furniture, modelUrl, unitModelUrls } from './Furniture';
import { Hotspots } from './Hotspots';
import { Room } from './Room';

export interface TourSceneProps {
  unit: Unit;
  activeHotspotId: string | null;
  goal: CameraView | null;
  reducedMotion: boolean;
  lite: boolean;
  onSelectHotspot: (id: string) => void;
  onUserMove: () => void;
  onReady: (unitId: UnitId) => void;
}

// Stable Canvas options, so the root is not reconfigured on every render.
// The scene is static: frames are drawn on demand and the shadow map is
// redrawn only when the room changes (see ShadowUpdate), not on every camera move.
const SHADOWS = { enabled: true, type: PCFShadowMap, autoUpdate: false } as const;
const CAMERA = { fov: 58, near: 0.1, far: 60 } as const;
const DPR_LITE: [number, number] = [1, 1.25];
const DPR_FULL: [number, number] = [1, 2];
const GL_LITE = { antialias: false, powerPreference: 'high-performance' } as const;
const GL_FULL = { antialias: true, powerPreference: 'high-performance' } as const;

/** Fires once the first frames of a unit are drawn, so the poster can fade out. */
function ReadySignal({ unitId, onReady }: { unitId: UnitId; onReady: (id: UnitId) => void }) {
  const frames = useRef(0);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => invalidate(), [invalidate]);
  useFrame(() => {
    if (frames.current >= 3) return;
    frames.current += 1;
    if (frames.current === 3) onReady(unitId);
    else invalidate();
  });
  return null;
}

/** Redraws the shadow map once the unit's room and furniture are mounted. */
function ShadowUpdate({ lite }: { lite: boolean }) {
  const get = useThree((s) => s.get);
  useLayoutEffect(() => {
    const { gl, invalidate } = get();
    gl.shadowMap.needsUpdate = true;
    invalidate();
  }, [get, lite]);
  return null;
}

/** Loads the models of the other units in idle time, so switching units is instant. */
function preloadAllModels() {
  units.forEach((u) => useGLTF.preload(unitModelUrls(u)));
}

function whenIdle(task: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(task, { timeout: 4000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(task, 1500);
  return () => clearTimeout(id);
}

const Lights = memo(function Lights({ unit, lite }: { unit: Unit; lite: boolean }) {
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
      {/* Memoized together with Lights: Environment redraws its cube map whenever it re-renders. */}
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
});

/** Room shell and furniture of one unit. Re-renders only when the unit changes. */
const UnitModel = memo(function UnitModel({
  unit,
  sceneRef,
}: {
  unit: Unit;
  sceneRef: RefObject<Group | null>;
}) {
  const urls = useMemo(() => unitModelUrls(unit), [unit]);
  const models = useGLTF(urls);
  const byUrl = useMemo(
    () => new Map(urls.map((url, i) => [url, models[i]?.scene])),
    [urls, models],
  );

  return (
    <group ref={sceneRef}>
      <Room room={unit.room} />
      {unit.furniture.map((item, i) => {
        const source = byUrl.get(modelUrl(item.model));
        return source ? <Furniture key={`${item.model}-${i}`} item={item} source={source} /> : null;
      })}
    </group>
  );
});

function TourScene({
  unit,
  activeHotspotId,
  goal,
  reducedMotion,
  lite,
  onSelectHotspot,
  onUserMove,
  onReady,
}: TourSceneProps) {
  const sceneRef = useRef<Group>(null);
  // A stable array: Html re-runs its occlusion setup whenever this changes.
  const occluders = useMemo<RefObject<Object3D | null>[]>(() => [sceneRef], []);
  // Only the first unit's view is used to create the camera; CameraRig moves it afterwards.
  const [camera] = useState(() => ({ ...CAMERA, position: [...unit.view.position] as const }));
  const [firstReady, setFirstReady] = useState(false);

  const handleReady = useCallback(
    (id: UnitId) => {
      setFirstReady(true);
      onReady(id);
    },
    [onReady],
  );

  // Preload the other units only after the first one is on screen, so they do not compete.
  useEffect(() => (firstReady ? whenIdle(preloadAllModels) : undefined), [firstReady]);

  return (
    <Canvas
      shadows={SHADOWS}
      frameloop="demand"
      dpr={lite ? DPR_LITE : DPR_FULL}
      camera={camera}
      gl={lite ? GL_LITE : GL_FULL}
    >
      <color attach="background" args={['#16231f']} />
      {/* Outside Suspense: lights never suspend, so model loads do not re-render them. */}
      <Lights unit={unit} lite={lite} />
      <Suspense fallback={null}>
        {/* Keys are unique among siblings and remount the unit's content when it changes. */}
        <UnitModel key={`model-${unit.id}`} unit={unit} sceneRef={sceneRef} />
        <Hotspots
          key={`hotspots-${unit.id}`}
          hotspots={unit.hotspots}
          activeId={activeHotspotId}
          occluders={occluders}
          onSelect={onSelectHotspot}
        />
        <ShadowUpdate key={`shadow-${unit.id}`} lite={lite} />
        <ReadySignal key={`ready-${unit.id}`} unitId={unit.id} onReady={handleReady} />
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

export default memo(TourScene);
