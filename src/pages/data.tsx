import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import { sorter } from "../dataHelpers";
import { slugify } from "../helpers";

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
      const newItems = category.items.map(item => {
        if (!item.fragment) {
          item.fragment = slugify(item.name);
        }

        return item;
      });
      category.items = newItems;
      console.log(newItems);

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
