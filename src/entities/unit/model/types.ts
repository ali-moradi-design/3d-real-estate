export type UnitId = 'loft' | 'two-bed';

export type Vec3 = readonly [number, number, number];

export interface HotspotFact {
  label: string;
  value: string;
}

export interface Hotspot {
  id: string;
  label: string;
  /** Marker position in the room, meters. */
  position: Vec3;
  /** Where the camera moves when the hotspot is selected. */
  view: { position: Vec3; target: Vec3 };
  title: string;
  text: string;
  facts: readonly HotspotFact[];
}

export type ModelId =
  | 'Ottoman_01'
  | 'coffee_table_round_01'
  | 'dining_chair_02'
  | 'dining_table'
  | 'mid_century_lounge_chair'
  | 'modern_arm_chair_01'
  | 'modern_coffee_table_01'
  | 'modern_wooden_cabinet'
  | 'side_table_01'
  | 'sofa_02'
  | 'wooden_display_shelves_01';

export interface FurnitureItem {
  model: ModelId;
  position: Vec3;
  /** Rotation around the vertical axis, radians. Models face +z at 0. */
  rotationY?: number;
}

export interface RoomShape {
  width: number;
  depth: number;
  height: number;
  /** Window opening on the back wall: horizontal range and sill/head heights. */
  window: { x1: number; x2: number; sill: number; head: number };
  rug: { position: Vec3; size: readonly [number, number] };
}

export interface Unit {
  id: UnitId;
  name: string;
  shortName: string;
  floor: number;
  areaM2: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  available: string;
  room: RoomShape;
  furniture: readonly FurnitureItem[];
  hotspots: readonly Hotspot[];
  /** Initial camera for the unit. */
  view: { position: Vec3; target: Vec3 };
  poster: string;
  posterAlt: string;
}
