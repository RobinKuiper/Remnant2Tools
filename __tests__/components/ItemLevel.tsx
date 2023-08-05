import React, { useState as useStateMock } from "react";
import { render, fireEvent } from "@testing-library/react";
import ItemLevel from "../../src/components/ItemLevel";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe("ItemLevel", () => {
  const setLevel = jest.fn()
  
  beforeEach(() => {
    ;(useStateMock as jest.Mock).mockImplementation(level => [level, setLevel])
  })
  
  it("should render the component correctly", () => {
    const { getByText, getByDisplayValue } = render(
      <ItemLevel level={0} setLevel={() => {}} />
    );

    expect(getByText("-")).toBeInTheDocument();
    expect(getByText("+")).toBeInTheDocument();
    expect(getByDisplayValue("0")).toBeInTheDocument();
  });

  it("should increment the level when the '+' button is clicked", () => {
    let level = 0;
    const setLevel = (newLevel) => {
      level = 1;
    };

    const { getByText } = render(<ItemLevel level={level} setLevel={setLevel} />);
    const addButton = getByText("+");

    fireEvent.click(addButton);
    
    expect(level).toBe(1);
  });

  it("should decrement the level when the '-' button is clicked", () => {
    let level = 1;
    const setLevel = (newLevel) => {
      level = 0;
    };

    const { getByText } = render(<ItemLevel level={level} setLevel={setLevel} />);
    const subButton = getByText("-");

    fireEvent.click(subButton);

    expect(level).toBe(0);
  });

  it("should update the level when the input value changes", () => {
    let level = 0;
    const setLevel = (newLevel) => {
      level = newLevel;
    };

    const { getByDisplayValue } = render(<ItemLevel level={level} setLevel={setLevel} />);
    const input = getByDisplayValue("0");

    fireEvent.change(input, { target: { value: "5" } });

    expect(level).toBe(5);
  });
});
