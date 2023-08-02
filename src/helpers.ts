import { CATEGORIES } from "./constants";

export const findCategory = (name: string) => {
  for (const mainCategory of CATEGORIES) {
    for (const category of mainCategory.categories) {
      if (category.label.replace(" ", "").toLowerCase() === name) {
        return category;
      }
    }
  }
};

export const slugify = (str: string) => {
  return str
    .split(" ")
    .join("_")
    .split("-")
    .join("_")
    .split("/")
    .join("_")
    .split("'")
    .join("")
    .split('"')
    .join("")
    .toLowerCase();
};
