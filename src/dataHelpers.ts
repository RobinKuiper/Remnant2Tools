import data from "./data/data.json";
import { CATEGORIES } from "./constants";
import type { Filter } from "./interface/IData";

export const getFieldValue = (object: any, fieldPath: string) => {
  const keys = fieldPath.split(".");
  let value = object;

  for (const key of keys) {
    if (value && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
};

export const setFieldValue = (object: any, fieldPath: string, value: any) => {
  const keys = fieldPath.split(".");
  let currentObject = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (currentObject && key in currentObject) {
      currentObject = currentObject[key];
    } else {
      return object;
    }
  }

  const lastKey = keys[keys.length - 1];
  currentObject[lastKey] = value;
};

const getUnlocks = () => {
  const unlocks = typeof localStorage !== "undefined" && localStorage.getItem("data");
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

export const isUnlocked = (categoryFragment: string, id: number): boolean => {
  const unlocks = getUnlocks();
  return unlocks[categoryFragment] && unlocks[categoryFragment][id] && unlocks[categoryFragment][id].unlocked;
};

export const getCategorySettings = categoryFragment => {
  return CATEGORIES.find(category => category.fragment === categoryFragment);
};

export const filterItems = (items: any[], filters: Filter[], filterUnlocked: boolean = false) => {
  return items.filter(item => {
    let returnValue = true;
    if (filterUnlocked && !isUnlocked(item.category, item.externalId)) {
      return false;
    } else {
      // Go through filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (!returnValue) return;

          Object.entries(filter).forEach(([key, value]) => {
            if (!returnValue) return;

            returnValue = item[key] === value;
          });
        });
      }
    }
    return returnValue;
  });
};

export const searchItems = (items: any[], query: string) => {
  if (query && query.length > 0) {
    return items.filter(item => {
      for (const value of Object.values(item)) {
        if (typeof value === "string" && value.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
      }
    });
  }

  return items;
};

export const sorter = (a: object, b: object, sortBy: string = "name", sortDir: number = 1) => {
  const aValue = getFieldValue(a, sortBy) ?? -1;
  const bValue = getFieldValue(b, sortBy) ?? -1;

  if (typeof aValue === "string") {
    return sortDir === 0 ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
  }

  if (sortDir === 0) {
    return bValue > aValue ? -1 : 1;
  } else {
    return aValue < bValue ? -1 : 1;
  }
};
