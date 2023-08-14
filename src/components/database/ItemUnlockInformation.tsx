import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";

const ItemUnlockInformation = ({ item }) => {
  return (
    <div className="unlock-information">
      <button data-tooltip-id={`${item.name}_tooltip`} data-tooltip-content={item.unlock}>
        <BsInfoCircleFill /> Unlock information
      </button>
    </div>
  );
};

export default ItemUnlockInformation;
