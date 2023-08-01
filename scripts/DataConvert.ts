import archetypes from "../src/data/archetypes.json";
import traits from "../src/data/traits.json";
import weapons from "../src/data/weapons.json";
import mods from "../src/data/mods.json";
import mutators from "../src/data/mutators.json";
import relics from "../src/data/relics.json";
import amulets from "../src/data/amulets.json";
import rings from "../src/data/rings.json";
import relicfragments from "../src/data/relicsfragments.json";
import dataCollection from "../src/data/dataCollection.json";
import armor from "../src/data/armor.json";

const currentData = {
  archetypes,
  traits,
  weapons,
  mods,
  mutators,
  relics,
  amulets,
  rings,
  relicfragments,
  armor,
};

const newData = {
  stats: {
    total: 0,
  },
};

let id = dataCollection.stats.total;

Object.keys(currentData).forEach(categoryKey => {
  const category = currentData[categoryKey];
  newData[categoryKey] = {
    stats: {},
    items: {},
  };
  Object.keys(category).forEach(key => {
    const item = category[key];
    let oldId = null;

    // Do we have the item
    if (dataCollection[categoryKey]) {
      Object.values(dataCollection[categoryKey].items).forEach(oldItem => {
        if (item.name.toLowerCase() === oldItem.name.toLowerCase()) {
          oldId = oldItem.id;
        }
      });
    }

    if (item.name !== "") {
      const itemId = oldId ? oldId : id;
      if (!oldId) id++;
      newData.stats.total++;
      item.id = itemId;
      delete item.Unlock;
      newData[categoryKey].items[itemId as number] = item;
    }
  });
  newData[categoryKey].stats = {
    total: Object.keys(newData[categoryKey].items).length,
  };
});

export default newData;
