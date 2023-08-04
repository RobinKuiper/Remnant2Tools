import data from "./data/data.json";
import { slugify } from "./helpers";

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

export const getAllItems = () => {
  return Object.values(data).flatMap(mainCategory => {
    const category = mainCategory.settings.fragment;
    const items = mainCategory.data.map(item => ({ ...item, category }));
    return mainCategory.settings.categorized ? getAllCategorizedItems(items, category) : items;
  });
};

export const getAllCategorizedItems = (data, category) => {
  return Object.values(data).flatMap(sCategory => {
    const subCategory = slugify(sCategory.label);
    return sCategory.items.map(item => ({ ...item, category, subCategory }));
  });
};

export const getAllLockedItems = (unlocks: Record<string, Record<string, boolean>>) => {
  const allItems = getAllItems();
  return allItems.filter(item => {
    const categoryUnlocks = unlocks[item.category];
    return !categoryUnlocks || !categoryUnlocks[item.id];
  });
};
