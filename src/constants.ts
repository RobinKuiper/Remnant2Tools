export const CATEGORIES = [
  {
    label: "Archetypes",
    fragment: "archetypes",
    hasLevels: false,
    groups: ["world"],
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
    groups: ["world"],
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
    groups: ["type", "world", "hasMod"],
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
        {
          label: "Mod",
          fragment: "mod",
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
      ],
    },
  },
  {
    label: "Mods",
    fragment: "mods",
    groups: ["world"],
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
    groups: ["world"],
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
    groups: ["world"],
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
    groups: ["world"],
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
    groups: ["world"],
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
    groups: ["type"],
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
    groups: ["armorset", "type"],
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
          label: "Type",
          fragment: "type",
        },
        {
          label: "Armor Amount",
          fragment: "value",
        },
        {
          label: "Weight",
          fragment: "weight",
        },
        {
          label: "Resistances",
          fragment: "stats",
        },
      ],
    },
  },
  {
    label: "World Bosses",
    fragment: "worldbosses",
    groups: ["world"],
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
];
