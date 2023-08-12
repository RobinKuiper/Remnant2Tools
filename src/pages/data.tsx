import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import { CATEGORIES } from "../constants";

const Data = () => {
  const [items, setItems] = useState<object>();

  useEffect(() => {
    const newItems = {};
    data.forEach(item => {
      const newItem = item;

      if (!newItems[item.category]) {
        newItems[item.category] = {
          settings: CATEGORIES.find(c => c.fragment === item.category),
          items: [],
        };
      }

      newItems[item.category].items.push(newItem);
    });

    console.log(newItems);
    setItems(() => ({ ...newItems }));
  }, [data]);

  return JSON.stringify(items);
  return <textarea>{JSON.stringify(items)}</textarea>;
};

export default Data;

// if (newItem.weapon && newItem.weapon !== "") {
//   newItem.weapon = newItems.find(weapon => weapon.category === "weapons" && weapon.name === newItem.weapon);
// } else if (newItem.mod && newItem.mod !== "") {
//   newItem.mod = newItems.find(mod => mod.category === "mods" && mod.name === newItem.mod);
// } else if (newItem.trait && newItem.trait !== "") {
//   newItem.trait = newItems.find(trait => trait.category === "traits" && trait.name === newItem.trait);
// } else if (newItem.archetype && newItem.archetype !== "") {
//   newItem.archetype = newItems.find(archetype => archetype.category === "archetypes" && archetype.name === newItem.archetype);
// } else if (newItem.category === "armorset") {
//   newItem.pieces = newItems.filter(armor => armor.category === "armor" && armor.armorset === newItem.name);
// }
