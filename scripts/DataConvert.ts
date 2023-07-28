import archetypes from "../src/data/archetypes.json";
import traits from "../src/data/traits.json";
import weapons from "../src/data/weapons.json";
import mods from "../src/data/mods.json";
import mutators from "../src/data/mutators.json";
import relics from "../src/data/relics.json";
import amulets from "../src/data/amulets.json";
import rings from "../src/data/rings.json";

const currentData = {
  archetypes,
  traits,
  weapons,
  mods,
  mutators,
  relics,
  amulets,
  rings,
};

const newData = {
  stats: {
    total: 0,
  },
};

let id = 0;

const ALLOWED_KEYS = ["name", "description", "biome", "location", "material", "unlock"];

Object.keys(currentData).forEach(categoryKey => {
  const category = currentData[categoryKey];
  newData[categoryKey] = {
    stats: {},
    items: {},
  };
  Object.keys(category).forEach(key => {
    const item = category[key];

    if (item.name !== "") {
      id++;
      newData.stats.total++;
      item.id = id;
      newData[categoryKey].items[id as number] = item;
    }
  });
  newData[categoryKey].stats = {
    total: Object.keys(newData[categoryKey].items).length,
  };
});

export default newData;
