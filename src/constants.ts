export const VERSION = "SITE_VERSION";
export const LAST_UPDATED = "CURRENT_DATE";
export const SITE_TITLE = "Remnant II Tools";
export const CATEGORIES = [
  {
    label: "Archetypes",
    fragment: "archetypes",
    singular: "Archetype",
    hasLevels: false,
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Traits",
    singular: "Trait",
    fragment: "traits",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Values",
          fragment: "values",
        },
      ],
    },
  },
  {
    label: "Weapons",
    singular: "Weapon",
    fragment: "weapons",
    groups: [
      {
        label: "Type",
        fragment: "type",
      },
      {
        label: "World",
        fragment: "world",
      },
      {
        label: "Has Mod",
        fragment: "hasMod",
      },
    ],
    sortKeys: [
      {
        label: "Name",
        fragment: "name",
      },
      {
        label: "Damage",
        fragment: "stats.damage",
      },
      {
        label: "RPS",
        fragment: "stats.rps",
      },
    ],
    categorized: true,
    defaultGroup: "type",
    hasLevels: true,
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Mod",
          fragment: "mod",
        },
        {
          label: "Damage",
          fragment: "stats.damage",
        },
        {
          label: "RPS",
          fragment: "stats.rps",
        },
      ],
    },
  },
  {
    label: "Mods",
    singular: "Mod",
    fragment: "mods",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Mutators",
    singular: "Mutator",
    fragment: "mutators",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    hasLevels: true,
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Relics",
    singular: "Relic",
    fragment: "relics",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Amulets",
    singular: "Amulet",
    fragment: "amulets",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Rings",
    singular: "Ring",
    fragment: "rings",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Relic Fragments",
    singular: "Relic Fragment",
    fragment: "relicfragments",
    groups: [
      {
        label: "Type",
        fragment: "type",
      },
    ],
    categorized: true,
    defaultGroup: "type",
    hasLevels: true,
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Armor",
    singular: "Armor",
    fragment: "armor",
    groups: [
      {
        label: "Armorset",
        fragment: "armorset",
      },
      {
        label: "Type",
        fragment: "type",
      },
    ],
    sortKeys: [
      {
        label: "Name",
        fragment: "name",
      },
      {
        label: "Type",
        fragment: "type",
      },
      {
        label: "Armor",
        fragment: "stats.armor",
      },
      {
        label: "Weight",
        fragment: "stats.weight",
      },
    ],
    categorized: true,
    defaultGroup: "armorset",
    categoryHasValues: true,
    categoryIsCheckable: false,
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Armor",
          fragment: "stats.armor",
        },
        {
          label: "Weight",
          fragment: "stats.weight",
        },
      ],
    },
  },
  {
    label: "Armor Sets",
    singular: "Armor Set",
    fragment: "armorset",
    groups: [],
    onlyDB: true,
    database: {
      fields: [
        {
          label: "Armor",
          fragment: "stats.armor",
        },
        {
          label: "Weight",
          fragment: "stats.weight",
        },
      ],
    },
    linkedBy: [
      {
        label: "Pieces",
        category: "armor",
        link: ["name", "armorset"],
      },
    ],
  },
  {
    label: "World Bosses",
    singular: "World Boss",
    fragment: "worldbosses",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
    ],
    categorized: true,
    defaultGroup: "world",
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
  {
    label: "Bosses",
    singular: "Boss",
    fragment: "bosses",
    groups: [
      {
        label: "World",
        fragment: "world",
      },
      {
        label: "Type",
        fragment: "type",
      },
      {
        label: "Race",
        fragment: "race",
      },
    ],
    categorized: true,
    defaultGroup: "world",
    tracker: {
      fields: [
        {
          label: "World",
          fragment: "world",
        },
        {
          label: "Location",
          fragment: "location",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [],
    },
  },
];
export const MAX_TRAIT_POINTS = 65;
