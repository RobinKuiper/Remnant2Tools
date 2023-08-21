import "./ItemLevel.scss";
import React from "react";
import { restrainNumber } from "../../helpers";

const ItemLevelNew = ({ level, callback, maxLevel, minLevel = 1, disabled = false }) => {
  const addLevel = () => {
    callback(restrainNumber(level ?? minLevel, maxLevel));
  };

  const subLevel = () => {
    callback(restrainNumber(level ?? minLevel, minLevel, true));
  };

  const handleChange = e => {
    const value = parseInt(e.target.value);

    if (value > maxLevel || value < minLevel) {
      return;
    }
    callback(value);
  };

  return (
    <div className="item-level-container">
      <button onClick={subLevel} disabled={disabled}>
        -
      </button>
      <input type="number" value={level} onChange={handleChange} disabled={disabled} />
      <button onClick={addLevel} disabled={disabled}>
        +
      </button>
    </div>
  );
};

export default ItemLevelNew;
