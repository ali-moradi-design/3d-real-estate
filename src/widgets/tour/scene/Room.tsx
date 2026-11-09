import { memo } from 'react';
import { DoubleSide, MeshStandardMaterial } from 'three';
import type { RoomShape } from '@/entities/unit';
import { getFloorTexture, getSkyTexture } from './floorTexture';

const T = 0.12;

// Shared by every mesh of every room, created once on first use. Room unmounts on
// unit switch, so per-mesh JSX materials would be rebuilt each time.
let materials: {
  wall: MeshStandardMaterial;
  frame: MeshStandardMaterial;
  trim: MeshStandardMaterial;
} | null = null;
function getMaterials() {
  materials ??= {
    wall: new MeshStandardMaterial({ color: '#eee8dc', roughness: 0.95 }),
    frame: new MeshStandardMaterial({ color: '#232826', roughness: 0.5, metalness: 0.4 }),
    trim: new MeshStandardMaterial({ color: '#faf7f1', roughness: 0.8 }),
  };
  return materials;
}

/** The room shell: floor, ceiling, walls with a window opening, trim and the sky behind it. */
export const Room = memo(function Room({ room }: { room: RoomShape }) {
  const { width: W, depth: D, height: H, window: win, rug } = room;
  const floorMap = getFloorTexture(W / 2.4, D / 2.4);
  const sky = getSkyTexture();
  const { wall, frame, trim } = getMaterials();

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
      <mesh
        position={[(-W / 2 + win.x1) / 2, H / 2, backZ]}
        castShadow
        receiveShadow
        material={wall}
      >
        <boxGeometry args={[win.x1 + W / 2, H, T]} />
      </mesh>
      <mesh
        position={[(win.x2 + W / 2) / 2, H / 2, backZ]}
        castShadow
        receiveShadow
        material={wall}
      >
        <boxGeometry args={[W / 2 - win.x2, H, T]} />
      </mesh>
      <mesh position={[winCx, win.sill / 2, backZ]} castShadow receiveShadow material={wall}>
        <boxGeometry args={[winW, win.sill, T]} />
      </mesh>
      <mesh position={[winCx, (win.head + H) / 2, backZ]} castShadow receiveShadow material={wall}>
        <boxGeometry args={[winW, H - win.head, T]} />
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
          material={frame}
        >
          <boxGeometry args={[0.05, winH, 0.06]} />
        </mesh>
      ))}
      {[win.sill, win.head].map((y) => (
        <mesh key={y} position={[winCx, y, -D / 2 - 0.02]} castShadow material={frame}>
          <boxGeometry args={[winW, 0.05, 0.06]} />
        </mesh>
      ))}

      <mesh position={[-W / 2 - T / 2, H / 2, 0]} castShadow receiveShadow material={wall}>
        <boxGeometry args={[T, H, D]} />
      </mesh>
      <mesh position={[W / 2 + T / 2, H / 2, 0]} castShadow receiveShadow material={wall}>
        <boxGeometry args={[T, H, D]} />
      </mesh>
      <mesh position={[0, H / 2, D / 2 + T / 2]} receiveShadow material={wall}>
        <boxGeometry args={[W, H, T]} />
      </mesh>

      {/* Baseboards. */}
      <mesh position={[0, 0.06, -D / 2 + 0.01]} material={trim}>
        <boxGeometry args={[W, 0.12, 0.02]} />
      </mesh>
      <mesh position={[-W / 2 + 0.01, 0.06, 0]} material={trim}>
        <boxGeometry args={[0.02, 0.12, D]} />
      </mesh>
      <mesh position={[W / 2 - 0.01, 0.06, 0]} material={trim}>
        <boxGeometry args={[0.02, 0.12, D]} />
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
});
