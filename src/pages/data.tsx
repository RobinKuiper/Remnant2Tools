import React, {useEffect, useState} from "react";
import data from "../data/data.json";
import { slugify } from "../helpers";

const Data = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const newItems = [];
    data.forEach(item => {
      const newItem = { ...item };

      newItem.fragment = slugify(newItem.name);

      if (newItem.category === "mods") {
        const weapon = data.find(i => i.category === "weapons" && i.mod === newItem.name);

        if (weapon) {
          newItem.weapon = weapon.name;
        }
      }

      newItems.push(newItem);
    });

    setItems(newItems);
  }, [])
  
  return (
    <div>
      <textarea>{JSON.stringify(items)}</textarea>
    </div>
  );
};

export default Data;
