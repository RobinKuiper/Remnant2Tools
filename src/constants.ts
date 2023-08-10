export const VERSION = "SITE_VERSION";
export const LAST_UPDATED = "CURRENT_DATE";
export const SITE_TITLE = "Remnant II Tools";
export const CATEGORIES = [
  {
    label: "Archetypes",
    fragment: "archetypes",
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
    categoryIsCheckable: true,
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
    label: "World Bosses",
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
    fragment: "bosses",
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
