import React from "react";
import * as Gatsby from "gatsby";
import { render, screen } from "@testing-library/react";
import Index from "../../src/pages/tracker/index";
import { DataProvider } from "../../src/context/DataContext";

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: `Gatsby Default Starter`,
    },
  },
};

describe("Statistics", () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders loading state initially", () => {
    render(<Index />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders unlockable statistics after loading", () => {
    const { getByText } = render(
      <DataProvider>
        <Index />
      </DataProvider>,
    );

    // Assert that the unlockable statistics are rendered correctly
    const text = getByText("Relic Fragments");
    expect(text.textContent).toBe("Relic Fragments");
  });

  test("renders worlds with secrets if there are any", () => {
    const { getByText } = render(
      <DataProvider>
        <Index />
      </DataProvider>,
    );

    // Assert that the worlds with secrets are rendered correctly
    const text = getByText("Yaesha");
    expect(text.textContent).toBe("Yaesha");
  });
});
