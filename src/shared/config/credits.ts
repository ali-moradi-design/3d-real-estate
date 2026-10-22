export interface ModelCredit {
  id: string;
  name: string;
  author: string;
}

/** Keep in sync with CREDITS.md. All models are CC0 from Poly Haven. */
export const modelCredits: readonly ModelCredit[] = [
  { id: 'Ottoman_01', name: 'Ottoman 01', author: 'Caspian Fortune' },
  { id: 'coffee_table_round_01', name: 'Coffee Table Round 01', author: 'Ulan Cabanilla' },
  { id: 'dining_chair_02', name: 'Dining Chair 02', author: 'James Ray Cock' },
  { id: 'dining_table', name: 'Dining Table', author: 'Aron Łyczek' },
  { id: 'mid_century_lounge_chair', name: 'Mid Century Lounge Chair', author: 'Kuutti Siitonen' },
  { id: 'modern_arm_chair_01', name: 'Modern Arm Chair 01', author: 'Vibrant Nordic' },
  { id: 'modern_coffee_table_01', name: 'Modern Coffee Table 01', author: 'Amin' },
  { id: 'modern_wooden_cabinet', name: 'Modern Wooden Cabinet', author: 'Patrik Pangerl' },
  { id: 'side_table_01', name: 'Side Table 01', author: 'James Ray Cock' },
  { id: 'sofa_02', name: 'Sofa 02', author: 'Kirill Sannikov' },
  { id: 'wooden_display_shelves_01', name: 'Wooden Display Shelves 01', author: 'James Ray Cock' },
];
