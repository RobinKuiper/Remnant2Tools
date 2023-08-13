import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import { sorter } from "../dataHelpers";

const POSSIBLE_LINKS = [
  {
    field: "weapon",
    category: "weapons",
    linkedBy: "name",
  },
  {
    field: "mod",
    category: "mods",
    linkedBy: "name",
  },
  {
    field: "trait",
    category: "traits",
    linkedBy: "name",
  },
  {
    field: "archetype",
    category: "archetypes",
    linkedBy: "name",
  },
];

const Data = () => {
  const [items, setItems] = useState<object>();

  useEffect(() => {
    const allItems = [];

    Object.values(data).forEach(category => {
      category.items.forEach(item => allItems.push(item));
    });

    const newCategories = {};
    Object.values(data).forEach(category => {
      if (category.settings.fragment === "armorset") {
        const newItems = category.items.map(item => {
          item.links = {};

          item.links.pieces = allItems.filter(i => i.category === "armor" && i.armorset === item.name).map(i => i.id);
          return item;
        });
        category.items = newItems;
        console.log(newItems);
      }

      newCategories[category.settings.fragment] = category;
    });

    setItems(() => ({ ...newCategories }));
  }, [data]);

  return JSON.stringify(items);
  // return <textarea>{JSON.stringify(items)}</textarea>;
};

export default Data;

// const newSettings = {};
// Object.keys(category.settings).sort((a, b) => a.localeCompare(b)).forEach(key => {
//   newSettings[key] = category.settings[key];
// })
// category.settings = newSettings;
