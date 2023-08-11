export interface Mod extends Item {
  description: string;
}

export interface Weapon extends Item {
  mod?: string;
  modDescription?: string;
  description?: string;
}

export interface Item {
  name: string;
  id: number;
  mod?: string;
  modDescription?: string;
  description?: string;
}

export interface Build {
  headpiece: Item | null;
  chest: Item | null;
  hands: Item | null;
  feet: Item | null;
  mainHand: Item | null;
  melee: Weapon | null;
  offhand: Weapon | null;
  relic: Weapon | null;
  fragments: [Item?, Item?, Item?];
  mutators: [Item?, Item?, Item?];
  mods: [Mod?, Mod?, Mod?];
  amulet: Item | null;
  rings: [Item?, Item?, Item?, Item?];
  usedTraitPoints: number;
  traits?: {
    [key: string]: number;
  };
  archetype1: Item | null;
  archetype2: Item | null;
  archetype1_level: number;
  archetype2_level: number;
}
