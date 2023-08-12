import React from "react";
import { styled } from "styled-components";
import { restrainNumber } from "../../helpers";

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
    <Container>
      <button onClick={subLevel} disabled={disabled}>
        -
      </button>
      <input type="number" value={level} onChange={handleChange} disabled={disabled} />
      <button onClick={addLevel} disabled={disabled}>
        +
      </button>
    </Container>
  );
};

export default ItemLevelNew;
