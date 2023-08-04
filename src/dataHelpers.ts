import data from "./data/data.json";
import { WEIGHT_RANGES } from "./constants";

export const calculateWeightType = (weight: number) => {
  let wType = "Light";
  Object.entries(WEIGHT_RANGES).forEach(([maxWeight, type]) => {
    const mWeight = parseInt(maxWeight);
    if (weight > mWeight) {
      wType = type;
    }
  });
  return wType;
};

export const getAllItems = () => {
  let allItems = [];
  Object.values(data).forEach(mainCategory => {
    if (mainCategory.settings.categorized) {
      mainCategory.data.forEach(subCategory => {
        allItems = [
          ...allItems,
          ...subCategory.items.map(item => ({ ...item, category: mainCategory.settings.fragment })),
        ];
      });
    } else {
      allItems = [
        ...allItems,
        ...mainCategory.data.map(item => ({ ...item, category: mainCategory.settings.fragment })),
      ];
    }
  });
  return allItems;
};

export const getAllLockedItems = unlocks => {
  return getAllItems().filter(item => !unlocks[item.category] || !unlocks[item.category][item.id]);
};
