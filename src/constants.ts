export const CATEGORIES = [
  {
    label: "Archetypes",
    fragment: "archetypes",
    groups: ["world"],
    tracker: {
      fields: [
        {
          label: "Name",
          fragment: "name",
          redacted: false,
          extraFields: [
            {
              label: "Description",
              fragment: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "Material",
          fragment: "material",
          redacted: true,
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
      ],
    },
  },
  {
    label: "Traits",
    fragment: "traits",
    groups: ["world"],
    tracker: {
      fields: [
        {
          label: "Name",
          fragment: "name",
          extraFields: [
            {
              label: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
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
          label: "Name",
          fragment: "name",
        },
        {
          label: "Mod",
          fragment: "mod",
          redacted: true,
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
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
          label: "Name",
          fragment: "name",
          extraFields: [
            {
              label: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "Price/material",
          fragment: "price_material",
          redacted: true,
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
      ],
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
          label: "Name",
          fragment: "name",
          extraFields: [
            {
              label: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
      ],
    },
  },
  {
    label: "Relics",
    fragment: "relics",
    groups: ["world"],
    tracker: {
      fields: [
        {
          label: "Name",
          fragment: "name",
          extraFields: [
            {
              label: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
      ],
    },
  },
  {
    label: "Amulets",
    fragment: "amulets",
    groups: ["world"],
    tracker: {
      fields: [
        {
          label: "Name",
          fragment: "name",
          extraFields: [
            {
              label: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
      ],
    },
  },
  {
    label: "Rings",
    fragment: "rings",
    groups: ["world"],
    tracker: {
      fields: [
        {
          label: "Name",
          fragment: "name",
          extraFields: [
            {
              label: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
      ],
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
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
        {
          label: "Description",
          fragment: "description",
        },
      ],
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
          label: "Name",
          fragment: "name",
          extraFields: [
            {
              label: "description",
            },
          ],
        },
        {
          label: "Location",
          fragment: "world",
          redacted: true,
          extraFields: [
            {
              fragment: "location",
              redacted: true,
            },
          ],
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
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
          label: "Name",
          fragment: "name",
        },
        {
          label: "Reward",
          fragment: "material",
          redacted: true,
        },
        {
          label: "How to get",
          fragment: "unlock",
          redacted: true,
        },
      ],
    },
    database: {
      fields: [
        {
          label: "Name",
          fragment: "name",
        },
      ],
    },
  },
];
