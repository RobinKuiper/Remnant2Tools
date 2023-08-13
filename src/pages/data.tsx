import React, { useEffect, useState } from "react";
import data from "../data/data.json";

const Data = () => {
  const [items, setItems] = useState<object>();
  const numberRegex = /-?\d+(\.\d+)?/g;
  const symbolRegex = /[a-zA-Z%]+$/;

  useEffect(() => {
    const newItems = [];
    data.traits.items.forEach(item => {
      const { valueText } = item;
      if (valueText) {
        const matches = valueText.match(numberRegex);
        if (matches && matches.length >= 2) {
          const symbolMatches = valueText.match(symbolRegex);
          const [min, max] = matches;
          item.values = {
            min: parseFloat(min),
            max: parseFloat(max),
          };
          if (symbolMatches && symbolMatches.length) {
            item.unitSymbol = symbolMatches[0];
          }
        }
      }
      newItems.push(item);
    });

    data.traits.items = newItems;
    setItems(() => ({ ...data }));
  }, [data]);

  return JSON.stringify(items);
  // return <textarea>{JSON.stringify(items)}</textarea>;
};

export default Data;
