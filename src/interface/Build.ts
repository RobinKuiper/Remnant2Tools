export interface Mod extends Item {
  description: string;
}

export interface Weapon extends Item {
  mod?: string;
  modDescription?: string;
}

export interface Item {
  name: string;
  id: number;
  externalId: number;
  links?: any;
  description?: string;
}

export interface Trait extends Item {
  fragment: string;
}

export interface Archetype extends Item {
  externalId: number;
  name: string;
  links: {
    trait: Trait;
  };
  level: number;
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
  traits: {
    [key: string]: number;
  };
  archetype1: Archetype | null;
  archetype2: Archetype | null;
}
