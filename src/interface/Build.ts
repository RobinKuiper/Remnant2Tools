export interface Item {
  name: string;
  id: number;
  externalId: number;
  links?: any;
  description?: string;
}

export interface Weapon {
  externalId: number | null;
  mod: number | null;
  mutator: number | null;
}

export interface Archetype {
  externalId: number | null;
  trait: number | null;
  level: number;
}

export interface Relic {
  externalId: number | null;
  fragment1: number | null;
  fragment2: number | null;
  fragment3: number | null;
}

export interface Build {
  name: string;
  id: number;
  headpiece: number | null;
  chest: number | null;
  hands: number | null;
  feet: number | null;
  mainHand: Weapon;
  melee: Weapon;
  offhand: Weapon;
  relic: Relic;
  amulet: number | null;
  ring1: number | null;
  ring2: number | null;
  ring3: number | null;
  ring4: number | null;
  archetype1: Archetype;
  archetype2: Archetype;
  usedTraitPoints: number;
  traitLevels: {
    [key: number]: number;
  };
}
