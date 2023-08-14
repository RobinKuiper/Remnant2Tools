import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import { sorter } from "../dataHelpers";
import { slugify } from "../helpers";

const Data = () => {
  const [items, setItems] = useState<object>();

  useEffect(() => {
    const allItems = [];

    const ids = [];
    const duplicates = [];

    Object.values(data).forEach(category => {
      category.items.forEach(item => {
        if (!ids.includes(item.id)) {
          ids.push(item.id);
        } else {
          duplicates.push(item.id);
        }
      });
    });

    console.log(duplicates);
  }, []);

  return "";

  // //   const newCategories = {};
  // //   Object.values(data).forEach(category => {
  // //     const newItems = category.items.map(item => {
  // //       if (!item.fragment) {
  // //         item.fragment = slugify(item.name);
  // //       }
  // //
  // //       return item;
  // //     });
  // //     category.items = newItems;
  // //     console.log(newItems);
  // //
  // //     newCategories[category.settings.fragment] = category;
  // //   });
  // //
  // //   setItems(() => ({ ...newCategories }));
  // // }, [data]);
  //
  // return JSON.stringify(items);
  // return <textarea>{JSON.stringify(items)}</textarea>;
};

export default Data;

// const newSettings = {};
// Object.keys(category.settings).sort((a, b) => a.localeCompare(b)).forEach(key => {
//   newSettings[key] = category.settings[key];
// })
// category.settings = newSettings;
