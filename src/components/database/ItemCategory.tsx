import "./ItemCategory.scss";
import React from "react";
import { Flex } from "../../style/global";

interface Props {
  item: any;
}

const ItemCategory = ({ item }: Props) => {
  return (
    <div className="item-category-container">
      <Flex alignitems="center">
        <div className="title">{item.name}</div>
      </Flex>
    </div>
  );
};

export default ItemCategory;
