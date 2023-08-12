import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SettingProvider, SettingContext } from "../../src/context/SettingContext";

describe("SettingContext", () => {
  it("should toggle dark mode when toggleDarkMode is called", () => {
    const { getByTestId } = render(
      <SettingProvider>
        <SettingContext.Consumer>
          {context => (
            <div>
              <div data-testid="darkMode">{context.darkMode.toString()}</div>
              <button onClick={context.toggleDarkMode} data-testid="toggleDarkModeButton">
                Toggle Dark Mode
              </button>
            </div>
          )}
        </SettingContext.Consumer>
      </SettingProvider>,
    );

    const darkModeElement = getByTestId("darkMode");
    const toggleDarkModeButton = getByTestId("toggleDarkModeButton");

    expect(darkModeElement.textContent).toBe("true");

    fireEvent.click(toggleDarkModeButton);

    expect(darkModeElement.textContent).toBe("false");

    fireEvent.click(toggleDarkModeButton);

    expect(darkModeElement.textContent).toBe("true");
  });

  it("should toggle hide unlocked when toggleHideUnlocked is called", () => {
    const { getByTestId } = render(
      <SettingProvider>
        <SettingContext.Consumer>
          {context => (
            <div>
              <div data-testid="hideUnlocked">{context.hideUnlocked.toString()}</div>
              <button onClick={context.toggleHideUnlocked} data-testid="toggleHideUnlockedButton">
                Toggle Hide Unlocked
              </button>
            </div>
          )}
        </SettingContext.Consumer>
      </SettingProvider>,
    );

    const hideUnlockedElement = getByTestId("hideUnlocked");
    const toggleHideUnlockedButton = getByTestId("toggleHideUnlockedButton");

    expect(hideUnlockedElement.textContent).toBe("false");

    fireEvent.click(toggleHideUnlockedButton);

    expect(hideUnlockedElement.textContent).toBe("true");

    fireEvent.click(toggleHideUnlockedButton);

    expect(hideUnlockedElement.textContent).toBe("false");
  });
});
