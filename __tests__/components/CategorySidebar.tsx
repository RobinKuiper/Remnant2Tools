import React from "react";
import { render, screen } from "@testing-library/react";
import { DataContext } from "../../src/context/DataContext";
import CategorySidebar from "../../src/components/layout/CategorySidebar";

// Mock the DataContext value
const mockDataContextValue = {
  statistics: {
    archetypes: {
      unlocked: 5,
      total: 10,
    },
    traits: {
      unlocked: 3,
      total: 5,
    },
    weapons: {
      unlocked: 8,
      total: 12,
    },
    // Add more mock data as needed
  },
};

describe("CategorySidebar", () => {
  it("renders the main categories and sub-categories correctly", () => {
    render(
      <DataContext.Provider value={mockDataContextValue}>
        <CategorySidebar type="tracker" />
      </DataContext.Provider>,
    );

    // Check if the main categories are rendered
    expect(screen.getByText("Statistics")).toBeInTheDocument();
    expect(screen.getByText("Character")).toBeInTheDocument();
    expect(screen.getByText("Items")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();

    // Check if the sub-categories are rendered
    expect(screen.getByText("Archetypes")).toBeInTheDocument();
    expect(screen.getByText("Traits")).toBeInTheDocument();
    expect(screen.getByText("Weapons")).toBeInTheDocument();
    // Add more assertions for other sub-categories
  });

  it("displays the correct statistics for the tracker type", () => {
    render(
      <DataContext.Provider value={mockDataContextValue}>
        <CategorySidebar type="tracker" />
      </DataContext.Provider>,
    );

    // Check if the statistics are displayed correctly
    expect(screen.getByText("50%")).toBeInTheDocument(); // Archetypes
    expect(screen.getByText("60%")).toBeInTheDocument(); // Traits
    expect(screen.getByText("66%")).toBeInTheDocument(); // Weapons
    // Add more assertions for other statistics
  });
});
