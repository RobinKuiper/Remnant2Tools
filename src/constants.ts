export const Updates = [
  {
    date: "10-08-2023",
    version: "1.0.2",
    messages: [
      "Added a setting in the settings sidebar to toggle default showing of redacted items",
      "Save build as 'New Build' if no name is given",
      "Weapon specific mods are now not shown in the tracker anymore",
      "Scrolling in sidebars on smaller screens",
      "Added a 404 page",
      "Codebase fixes",
      "Layout fixes",
    ],
  },
  {
    date: "09-08-2023",
    messages: [
      "Added a settings sidebar",
      "Added export/import features to the settings sidebar",
      "A lot of codebase improvements",
      "Fixed a bug where tooltips could render below other elements",
    ],
  },
  {
    date: "07-08-2023",
    messages: [
      "Image improvements in the tracker and database lists",
      "Added default weapon mods to the database",
      "Added more data to weapons and armors",
      "Added more armor (sets)",
      "Added more missing images",
      "Added more relic fragments",
      "Added armor statistics to the builder",
      "Added traits to the builder",
    ],
  },
];
export const ExtraUpdates = [
  {
    date: "06-08-2023",
    messages: ["Data improvements", "List and grid view", "Mobile ready", "Group by filter"],
  },
];

export const VERSION = "SITE_VERSION";
export const LAST_UPDATED = "CURRENT_DATE";
export const SITE_TITLE = "Remnant II Tools";
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
    sortKeys: ["name", "damage", "rps"],
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
          fragment: "damage",
        },
        {
          label: "RPS",
          fragment: "rps",
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
    sortKeys: ["name", "armor", "weight", "type"],
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
          fragment: "armor",
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
  {
    label: "Bosses",
    fragment: "bosses",
    groups: ["world"],
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
