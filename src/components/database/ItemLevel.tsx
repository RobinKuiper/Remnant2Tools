import React from "react";

const restrainNumber = (value: number, max: number, subtract: boolean = false) => {
  if (subtract) {
    return value - 1 < max ? max : value - 1;
  }
  return value + 1 > max ? max : value + 1;
};
const ItemLevel = ({ level, setLevel, maxLevel }) => {
  const addLevel = () => {
    setLevel(prevState => (prevState ? restrainNumber(prevState, maxLevel) : 1));
  };
  const subLevel = () => {
    setLevel(prevState => (prevState ? restrainNumber(prevState, 1, true) : 1));
  };
  const handleChange = e => {
    const value = parseInt(e.target.value);
    setLevel(value);
  };

  return (
    <div className="item-level-container">
      <button onClick={subLevel}>-</button>
      <input type="number" value={level} onChange={handleChange} />
      <button onClick={addLevel}>+</button>
    </div>
  );
};

export default ItemLevel;
