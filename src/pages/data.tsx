import React from "react";
import data from "../data/data.json";

const STAT_KEYS = [
  "damage",
  "rps",
  "accuracy",
  "magazine",
  "idealRange",
  "falloffRange",
  "maxAmmo",
  "criticalHitChance",
  "weakSpotDamageBonus",
  "staggerModifier",
  "armor",
  "weight",
  "resistances",
];

const Data = () => {
  const newItems = [];
  data.forEach(item => {
    const newItem = { ...item };
    if (newItem.stats) {
      delete newItem.stats;
    }
    Object.entries(item).forEach(([key, value]) => {
      if (STAT_KEYS.includes(key)) {
        if (!newItem.stats) {
          newItem.stats = {};
        }

        newItem.stats[key] = value;
        delete newItem[key];
      }
    });
    newItems.push(newItem);
  });

  console.log(newItems);

  return <div></div>;
};

export default Data;
