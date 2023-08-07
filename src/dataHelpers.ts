import data from "./data/data.json";
import { CATEGORIES } from "./constants";

const getUnlocks = () => {
  const unlocks = localStorage.getItem("data");
  return unlocks ? JSON.parse(unlocks) : {};
};

export const calculateWeightType = (weight: number) => {
  if (weight > 75) {
    return "Ultra Heavy";
  } else if (weight > 50) {
    return "Heavy";
  } else if (weight > 25) {
    return "Medium";
  }

  return "Light";
};

export const getAllCategorizedItems = (data, category) => {
  return Object.values(data).flatMap(sCategory => {
    const subCategories = [sCategory.label];
    return sCategory.items.map(item => {
      const newItem = { ...{ ...item, category } };
      const newSubCats = [...subCategories];
      if (item.type) {
        newSubCats.push(item.type);
      } else if (category !== "worldbosses") {
        newItem.type = sCategory.label;
      } else {
        newItem.world = sCategory.label;
      }
      newItem.subCategories = newSubCats;
      if (category === "armor") {
        newItem.armorset = sCategory.label;
      }
      if (category === "weapons") {
        newItem.hasMod = item.mod && item.mod !== "";
      }

      return newItem;
    });
  });
};

export const getAllItems = (trackables: boolean = false) => {
  return trackables
    ? data.filter(item => {
        return typeof item.onlyDB === "undefined" || !item.onlyDB;
      })
    : data;
};

export const getAllLockedItems = () => {
  const allItems = getAllItems();
  return allItems.filter(item => !isUnlocked(item.category, item.id));
};

export const getUnlockedItems = () => {
  const allItems = getAllItems();
  return allItems.filter(item => isUnlocked(item.category, item.id));
};

export const isUnlocked = (categoryFragment: string, id: number): boolean => {
  const unlocks = getUnlocks();
  return unlocks[categoryFragment] && unlocks[categoryFragment][id] && unlocks[categoryFragment][id].unlocked;
};

export const getCategorySettings = categoryFragment => {
  return CATEGORIES.find(category => category.fragment === categoryFragment);
};
