import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;

  button {
    font-size: 1.3em;
  }

  input {
    width: 30px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;

    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const restrainNumber = (value: number, max: number, subtract: boolean = false) => {
  if (subtract) {
    return (value - 1 < max ? max : value - 1)
  }
  
  return (value + 1 > max ? max : value + 1)
}

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
    <Container>
      <button onClick={subLevel}>-</button>
      <input type="number" value={level} onChange={handleChange} />
      <button onClick={addLevel}>+</button>
    </Container>
  );
};

export default ItemLevel;
