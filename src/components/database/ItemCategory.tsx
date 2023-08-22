import "./ItemCategory.scss";
import React from "react";

interface Props {
  item: any;
}

const ItemCategory = ({ item }: Props) => {
  return (
    <div className="item-category-container">
      <div className="title">{item.name}</div>
    </div>
  );
};

export default ItemCategory;
