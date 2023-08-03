export interface Item {
  name: string;
  id: number;
}

export interface Build {
  headpiece: Item | null;
  chest: Item | null;
  hands: Item | null;
  feet: Item | null;
  mainHand: Item | null;
  melee: Item | null;
  offhand: Item | null;
  relic: Item | null;
  fragments: [Item?, Item?, Item?];
  mutators: [Item?, Item?, Item?];
  mods: [Item?, Item?];
  amulet: Item | null;
  rings: [Item?, Item?, Item?, Item?];
}
