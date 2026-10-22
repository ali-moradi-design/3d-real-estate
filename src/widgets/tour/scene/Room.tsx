import { useMemo } from 'react';
import { DoubleSide } from 'three';
import type { RoomShape } from '@/entities/unit';
import { createFloorTexture, createSkyTexture } from './floorTexture';

const WALL = '#eee8dc';
const T = 0.12;

/** The room shell: floor, ceiling, walls with a window opening, trim and the sky behind it. */
export function Room({ room }: { room: RoomShape }) {
  const { width: W, depth: D, height: H, window: win, rug } = room;
  const floorMap = useMemo(() => createFloorTexture(W / 2.4, D / 2.4), [W, D]);
  const sky = useMemo(() => createSkyTexture(), []);

  const wallMat = <meshStandardMaterial color={WALL} roughness={0.95} />;
  const backZ = -D / 2 - T / 2;
  const winW = win.x2 - win.x1;
  const winH = win.head - win.sill;
  const winCx = (win.x1 + win.x2) / 2;
  const mullions = Math.max(2, Math.round(winW / 1.2));

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial map={floorMap} roughness={0.55} metalness={0.02} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#f7f4ee" roughness={1} />
      </mesh>

      {/* Back wall, built around the window opening so the sun enters through it. */}
      <mesh position={[(-W / 2 + win.x1) / 2, H / 2, backZ]} castShadow receiveShadow>
        <boxGeometry args={[win.x1 + W / 2, H, T]} />
        {wallMat}
      </mesh>
      <mesh position={[(win.x2 + W / 2) / 2, H / 2, backZ]} castShadow receiveShadow>
        <boxGeometry args={[W / 2 - win.x2, H, T]} />
        {wallMat}
      </mesh>
      <mesh position={[winCx, win.sill / 2, backZ]} castShadow receiveShadow>
        <boxGeometry args={[winW, win.sill, T]} />
        {wallMat}
      </mesh>
      <mesh position={[winCx, (win.head + H) / 2, backZ]} castShadow receiveShadow>
        <boxGeometry args={[winW, H - win.head, T]} />
        {wallMat}
      </mesh>

      {/* Sky pane and window frame. */}
      <mesh position={[winCx, (win.sill + win.head) / 2, -D / 2 - 0.4]}>
        <planeGeometry args={[winW + 0.2, winH + 0.2]} />
        <meshBasicMaterial map={sky} toneMapped={false} side={DoubleSide} />
      </mesh>
      {Array.from({ length: mullions + 1 }, (_, i) => (
        <mesh
          key={i}
          position={[win.x1 + (winW / mullions) * i, (win.sill + win.head) / 2, -D / 2 - 0.02]}
          castShadow
        >
          <boxGeometry args={[0.05, winH, 0.06]} />
          <meshStandardMaterial color="#232826" roughness={0.5} metalness={0.4} />
        </mesh>
      ))}
      {[win.sill, win.head].map((y) => (
        <mesh key={y} position={[winCx, y, -D / 2 - 0.02]} castShadow>
          <boxGeometry args={[winW, 0.05, 0.06]} />
          <meshStandardMaterial color="#232826" roughness={0.5} metalness={0.4} />
        </mesh>
      ))}

      <mesh position={[-W / 2 - T / 2, H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[T, H, D]} />
        {wallMat}
      </mesh>
      <mesh position={[W / 2 + T / 2, H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[T, H, D]} />
        {wallMat}
      </mesh>
      <mesh position={[0, H / 2, D / 2 + T / 2]} receiveShadow>
        <boxGeometry args={[W, H, T]} />
        {wallMat}
      </mesh>

      {/* Baseboards. */}
      <mesh position={[0, 0.06, -D / 2 + 0.01]}>
        <boxGeometry args={[W, 0.12, 0.02]} />
        <meshStandardMaterial color="#faf7f1" roughness={0.8} />
      </mesh>
      <mesh position={[-W / 2 + 0.01, 0.06, 0]}>
        <boxGeometry args={[0.02, 0.12, D]} />
        <meshStandardMaterial color="#faf7f1" roughness={0.8} />
      </mesh>
      <mesh position={[W / 2 - 0.01, 0.06, 0]}>
        <boxGeometry args={[0.02, 0.12, D]} />
        <meshStandardMaterial color="#faf7f1" roughness={0.8} />
      </mesh>

      {/* Rug. */}
      <mesh position={rug.position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[rug.size[0], rug.size[1]]} />
        <meshStandardMaterial color="#d8cdb8" roughness={1} />
      </mesh>

      {/* Ceiling light panels. */}
      {[-W / 4, W / 4].map((x) => (
        <mesh key={x} position={[x, H - 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.4, 0.5]} />
          <meshBasicMaterial color="#fff6e6" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
