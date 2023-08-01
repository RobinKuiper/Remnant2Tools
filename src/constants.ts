export const CATEGORIES = [
  {
    label: "Character",
    fragment: "character",
    tracker: true,
    database: true,
    categories: [
      {
        label: "Archetypes",
        fragment: "archetypes",
        tracker: true,
        database: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
            fields: ["description"],
          },
          {
            label: "world",
            tracker: true,
            database: true,
            redacted: true,
            fields: ["location"],
          },
          {
            label: "location",
            tracker: false,
            database: false,
            redacted: true,
          },
          {
            label: "material",
            tracker: true,
            database: true,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      {
        label: "Traits",
        fragment: "traits",
        tracker: true,
        database: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
            fields: ["description"],
          },
          {
            label: "values",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "world",
            tracker: true,
            database: true,
            redacted: true,
            fields: ["location"],
          },
          {
            label: "location",
            tracker: false,
            database: false,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
    ],
  },
  {
    label: "Items",
    tracker: true,
    database: true,
    categories: [
      {
        label: "Weapons",
        fragment: "weapons",
        tracker: true,
        database: true,
        categorized: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "category",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "mod",
            tracker: true,
            database: true,
            redacted: true,
          },
          {
            label: "world",
            tracker: true,
            database: true,
            redacted: true,
          },
          {
            label: "location",
            tracker: true,
            database: true,
            redacted: true,
          },
          {
            label: "price_material",
            tracker: false,
            database: true,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      {
        label: "Mutators",
        fragment: "mutators",
        tracker: true,
        database: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
            fields: ["description"],
          },
          {
            label: "world",
            tracker: true,
            database: true,
            redacted: true,
            fields: ["location"],
          },
          {
            label: "location",
            tracker: false,
            database: false,
            redacted: true,
          },
          {
            label: "material",
            tracker: true,
            database: true,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      {
        label: "Armor",
        fragment: "armor",
        tracker: true,
        database: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "type",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "value",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "weight",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "stats",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "pieces",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      {
        label: "Rings",
        fragment: "rings",
        tracker: true,
        database: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
            fields: ["description"],
          },
          {
            label: "world",
            tracker: true,
            database: true,
            redacted: true,
            fields: ["location"],
          },
          {
            label: "location",
            tracker: false,
            database: false,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      {
        label: "Amulets",
        fragment: "amulets",
        tracker: true,
        database: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
            fields: ["description"],
          },
          {
            label: "world",
            tracker: true,
            database: true,
            redacted: true,
            fields: ["location"],
          },
          {
            label: "location",
            tracker: false,
            database: false,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      {
        label: "Relics",
        fragment: "relics",
        tracker: true,
        database: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
            fields: ["description"],
          },
          {
            label: "world",
            tracker: true,
            database: true,
            redacted: true,
            fields: ["location"],
          },
          {
            label: "location",
            tracker: false,
            database: false,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      {
        label: "Relic Fragments",
        fragment: "relicfragments",
        tracker: true,
        database: true,
        categorized: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "description",
            tracker: true,
            database: true,
            redacted: false,
          },
        ],
      },
    ],
  },
  {
    label: "Events",
    tracker: true,
    database: true,
    categories: [
      {
        label: "World Bosses",
        fragment: "worldbosses",
        tracker: true,
        database: true,
        categorized: true,
        filters: {},
        attributes: [
          {
            label: "name",
            tracker: true,
            database: true,
            redacted: false,
          },
          {
            label: "material",
            tracker: true,
            database: true,
            redacted: true,
          },
          {
            label: "unlock",
            tracker: true,
            database: true,
            redacted: true,
          },
        ],
      },
      // {
      //     label: "Bosses",
      //     fragment: "bosses",
      //     tracker: true,
      //     database: true,
      //     categorized: true,
      //     filters: {},
      //     attributes: [
      //         {
      //             label: "name",
      //             tracker: true,
      //             database: true,
      //             redacted: false
      //         },
      //         {
      //             label: "material",
      //             tracker: true,
      //             database: true,
      //             redacted: true
      //         },
      //         {
      //             label: "unlock",
      //             tracker: true,
      //             database: true,
      //             redacted: true
      //         }
      //     ]
      // },
    ],
  },
];

// TODO: to helpers
export const findCategory = (name: string) => {
  for (const mainCategory of CATEGORIES) {
    for (const category of mainCategory.categories) {
      if (category.label.replace(" ", "").toLowerCase() === name) {
        return category;
      }
    }
  }
};
