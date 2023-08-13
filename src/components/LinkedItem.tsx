import React from "react";
import { Link, Slice } from "gatsby";

const LinkedItem = ({ item }) => {
  if (!item || !item.fragment) return;

  return (
    <span data-tooltip-id={`${item.fragment}_tooltip`}>
      <Link to={`/database/${item.category}/${item.fragment}`} title={item.name}>
        {item.name}
      </Link>
      <Slice alias="ItemTooltip" id={`${item.fragment}_tooltip`} item={item} />
    </span>
  );
};

export default LinkedItem;
