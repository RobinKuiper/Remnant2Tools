import React from "react";
import { Link } from "gatsby";
import ItemTooltip from "./database/ItemTooltip";

const LinkedItem = ({ item }) => {
  return (
    <span data-tooltip-id={`${item.fragment}_tooltip`}>
      <Link to={`/database/${item.category}/${item.fragment}`} title={item.name}>
        {item.name}
      </Link>
      <ItemTooltip id={`${item.fragment}_tooltip`} item={item} />
    </span>
  );
};

export default LinkedItem;
