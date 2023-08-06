import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Item from "../../src/components/Item";
import { DataContext, DataProvider } from "../../src/context/DataContext";

describe("Item", () => {
  const item = {
    id: 1,
    name: "Item 1",
    // Add other properties as needed
  };

  const category = {
      fragment: "categoryFragment",
      hasLevels: true,
      tracker: {
        fields: [
          {
            fragment: "name",
            redacted: false,
            extraFields: [],
          },
          // Add other fields as needed
        ],
      },

      database: {
        fields: [
          {
            fragment: "name",
            redacted: false,
            extraFields: [],
          },
          // Add other fields as needed
        ],
      },
  };

  const images = {
    // Add image data as needed
  };

  it("renders the item name", () => {
    render(
      <DataProvider>
        <Item item={item} category={category} images={images} viewAsList={true} />
      </DataProvider>,
    );
    const itemName = screen.getByText("Item 1");
    expect(itemName).toBeInTheDocument();
  });

  it("renders the checkbox when type is 'tracker'", () => {
    const { container } = render(
      <DataProvider>
        <Item item={item} category={category} type="tracker" images={images} viewAsList={true} />
      </DataProvider>,
    );
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it("renders the no checkbox when type is not 'tracker'", () => {
    const { container } = render(
      <DataProvider>
        <Item item={item} category={category} type="database" images={images} viewAsList={true} />
      </DataProvider>,
    );
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeNull();
  });

  it("calls toggleUnlock when checkbox is clicked", () => {
    const toggleUnlock = jest.fn(),
      unlocks = {};
    const { container } = render(<Item item={item} category={category} type="tracker" images={images} viewAsList={true} />, {
      wrapper: ({ children }) => (
        <DataContext.Provider value={{ toggleUnlock, unlocks }}>{children}</DataContext.Provider>
      ),
    });
    const checkbox = container.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);
    expect(toggleUnlock).toHaveBeenCalledWith(category.fragment, item.id);
  });

  it("renders no level changer when type is not 'tracker'", () => {
    const { container } = render(
      <DataProvider>
        <Item item={item} category={category} type="database" images={images} viewAsList={true} />
      </DataProvider>,
    );
    const numberBox = container.querySelector('input[type="number"]');
    expect(numberBox).toBeNull();
  });

  it("renders the level changer when type is 'tracker' and hasLevels is true", () => {
    const { container } = render(
      <DataProvider>
        <Item item={item} category={category} type="tracker" images={images} viewAsList={true} />
      </DataProvider>,
    );
    const numberBox = container.querySelector('input[type="number"]');
    expect(numberBox).toBeInTheDocument();
  });

  test("calls handleChange function when checkbox is clicked", () => {
    const item = { id: 1, name: "Item 1" },
      category = {: { fragment: "categoryFragment", tracker: { fields: [] } } },
      images = [],
      toggleUnlock = jest.fn(),
      unlocks = {};

    render(<Item item={item} category={category} type="tracker" images={images} viewAsList={true} />, {
      wrapper: ({ children }) => (
        <DataContext.Provider value={{ toggleUnlock, unlocks }}>{children}</DataContext.Provider>
      ),
    });

    const checkboxInput = screen.getByRole("checkbox");
    fireEvent.click(checkboxInput);

    expect(toggleUnlock).toHaveBeenCalledWith(category.fragment, item.id);
  });
});
