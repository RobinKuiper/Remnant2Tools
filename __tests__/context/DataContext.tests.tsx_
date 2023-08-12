import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { DataContext, DataProvider } from "../../src/context/DataContext";

describe("DataContext", () => {
  test("toggleUnlock should update unlocks state and call updateStatistics", () => {
    const { getByText } = render(
      <DataProvider>
        <DataContext.Consumer>
          {({ unlocks, toggleUnlock }) => (
            <div>
              <span>{unlocks.weapons && unlocks.weapons[1]?.unlocked ? "Unlocked" : "Locked"}</span>
              <button onClick={() => toggleUnlock("weapons", 1)}>Toggle Unlock</button>
            </div>
          )}
        </DataContext.Consumer>
      </DataProvider>,
    );

    const unlockButton = getByText("Toggle Unlock");
    const unlockStatus = getByText("Locked");

    fireEvent.click(unlockButton);

    expect(unlockStatus.textContent).toBe("Unlocked");
  });

  test("updateLevel should update unlocks state with the specified level", () => {
    const { getByText } = render(
      <DataProvider>
        <DataContext.Consumer>
          {({ unlocks, updateLevel }) => (
            <div>
              <span>{(unlocks.weapons && unlocks.weapons[1]?.level) || 0}</span>
              <button onClick={() => updateLevel("weapons", 1, 2)}>Update Level</button>
            </div>
          )}
        </DataContext.Consumer>
      </DataProvider>,
    );

    const updateButton = getByText("Update Level");
    const levelSpan = getByText("0");

    fireEvent.click(updateButton);

    expect(levelSpan.textContent).toBe("2");
  });
});
