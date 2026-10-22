import type { Unit, UnitId } from './types';

export const units: readonly Unit[] = [
  {
    id: 'loft',
    name: 'Unit A · Loft',
    shortName: 'Loft',
    floor: 5,
    areaM2: 54,
    bedrooms: 1,
    bathrooms: 1,
    price: 286000,
    available: 'Handover Q3 2027',
    room: {
      width: 7.2,
      depth: 5.4,
      height: 2.9,
      window: { x1: -2.4, x2: 2.4, sill: 0.35, head: 2.55 },
      rug: { position: [0, 0.006, -0.5], size: [3.6, 2.6] },
    },
    view: { position: [0.4, 1.65, 2.55], target: [0, 0.9, -1.4] },
    furniture: [
      { model: 'sofa_02', position: [-0.2, 0, -1.75] },
      { model: 'modern_coffee_table_01', position: [-0.2, 0, -0.55], rotationY: Math.PI / 2 },
      { model: 'mid_century_lounge_chair', position: [1.85, 0, -0.9], rotationY: -1.15 },
      { model: 'modern_arm_chair_01', position: [-2.3, 0, -0.9], rotationY: 1.15 },
      { model: 'side_table_01', position: [1.15, 0, -2.05] },
      { model: 'wooden_display_shelves_01', position: [-3.38, 0, -1.7], rotationY: Math.PI / 2 },
      { model: 'wooden_display_shelves_01', position: [-3.38, 0, -0.5], rotationY: Math.PI / 2 },
      { model: 'Ottoman_01', position: [1.9, 0, 0.55], rotationY: -0.5 },
    ],
    hotspots: [
      {
        id: 'floor',
        label: 'Oak flooring',
        position: [-1.0, 0.05, 0.7],
        view: { position: [0.2, 1.55, 2.5], target: [-0.6, 0.1, 0.2] },
        title: 'Smoked oak flooring',
        text: 'Wide engineered planks with a matte finish and underfloor heating in every room.',
        facts: [
          { label: 'Material', value: 'Oak, 14 mm' },
          { label: 'Area', value: '54 m²' },
          { label: 'Upgrade', value: '+ $2,400' },
        ],
      },
      {
        id: 'window',
        label: 'Panoramic window',
        position: [1.6, 1.9, -2.62],
        view: { position: [0, 1.5, 0.6], target: [0, 1.5, -2.7] },
        title: 'Floor-to-ceiling window',
        text: 'Triple glazing with a low-iron pane. Morning light fills the whole living area.',
        facts: [
          { label: 'Size', value: '4.8 × 2.2 m' },
          { label: 'Glazing', value: 'Triple, low-E' },
          { label: 'Outlook', value: 'Harbor' },
        ],
      },
      {
        id: 'living',
        label: 'Living area',
        position: [-0.2, 0.95, -1.75],
        view: { position: [-1.1, 1.5, 2.2], target: [0.3, 0.6, -1.4] },
        title: 'Open living area',
        text: 'A 28 m² living space with built-in shelving. Furniture is shown for scale only.',
        facts: [
          { label: 'Living area', value: '28 m²' },
          { label: 'Ceiling', value: '2.9 m' },
          { label: 'Storage', value: 'Built-in shelves' },
        ],
      },
    ],
    poster: '/images/loft.jpg',
    posterAlt: 'Living area of the loft with a sofa, lounge chair and a large window',
  },
  {
    id: 'two-bed',
    name: 'Unit B · Two-bedroom',
    shortName: 'Two-bedroom',
    floor: 3,
    areaM2: 86,
    bedrooms: 2,
    bathrooms: 1,
    price: 412000,
    available: 'Handover Q3 2027',
    room: {
      width: 8.4,
      depth: 5.8,
      height: 2.9,
      window: { x1: -0.4, x2: 3.9, sill: 0.35, head: 2.55 },
      rug: { position: [-2.5, 0.006, -0.2], size: [3.0, 2.6] },
    },
    view: { position: [-0.3, 1.65, 2.65], target: [0.5, 0.9, -1.5] },
    furniture: [
      { model: 'dining_table', position: [1.6, 0, -0.9] },
      { model: 'dining_chair_02', position: [0.9, 0, -1.75] },
      { model: 'dining_chair_02', position: [2.3, 0, -1.75] },
      { model: 'dining_chair_02', position: [0.9, 0, -0.05], rotationY: Math.PI },
      { model: 'dining_chair_02', position: [2.3, 0, -0.05], rotationY: Math.PI },
      { model: 'modern_wooden_cabinet', position: [-2.6, 0, -2.58] },
      { model: 'sofa_02', position: [-3.5, 0, -0.2], rotationY: Math.PI / 2 },
      { model: 'coffee_table_round_01', position: [-2.2, 0, -0.2] },
      { model: 'modern_arm_chair_01', position: [-2.3, 0, 1.2], rotationY: Math.PI - 0.5 },
    ],
    hotspots: [
      {
        id: 'floor',
        label: 'Oak flooring',
        position: [-0.4, 0.05, 0.9],
        view: { position: [-1.2, 1.45, 2.5], target: [-0.2, 0.1, 0.3] },
        title: 'Smoked oak flooring',
        text: 'Wide engineered planks with a matte finish and underfloor heating throughout.',
        facts: [
          { label: 'Material', value: 'Oak, 14 mm' },
          { label: 'Area', value: '86 m²' },
          { label: 'Upgrade', value: '+ $3,800' },
        ],
      },
      {
        id: 'dining',
        label: 'Dining area',
        position: [1.6, 0.95, -0.9],
        view: { position: [0.6, 1.5, 2.2], target: [1.6, 0.6, -0.9] },
        title: 'Dining and kitchen zone',
        text: 'Seats up to eight beside the open kitchen. Furniture is shown for scale only.',
        facts: [
          { label: 'Zone', value: '24 m²' },
          { label: 'Seats', value: 'Up to 8' },
          { label: 'Kitchen', value: 'Open plan' },
        ],
      },
      {
        id: 'window',
        label: 'Corner window',
        position: [3.3, 1.9, -2.82],
        view: { position: [1.2, 1.5, 1.2], target: [1.8, 1.5, -2.9] },
        title: 'Wide corner window',
        text: 'A 4.3 m glazed wall facing the courtyard garden, with a deep sill for plants.',
        facts: [
          { label: 'Size', value: '4.3 × 2.2 m' },
          { label: 'Glazing', value: 'Triple, low-E' },
          { label: 'Outlook', value: 'Courtyard' },
        ],
      },
    ],
    poster: '/images/two-bed.jpg',
    posterAlt: 'Dining area of the two-bedroom unit with a table, chairs and a corner window',
  },
] as const;

export function getUnit(id: UnitId): Unit {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unknown unit: ${id}`);
  return unit;
}

export function formatPrice(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}
