import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../../src/pages/index";
import * as Gatsby from "gatsby";
import {DataProvider} from "../../src/context/DataContext";

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: `Gatsby Default Starter`,
    },
  },
};

describe("Homepage", () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test("renders the hero banner correctly", () => {
    const { container } = render(
      <DataProvider>
        <Index />
      </DataProvider>,
    );

    const headingElement = screen.getByRole("heading", { name: /Remnant2 Tools/i });
    const paragraphElement = screen.getByText(/Track Your Triumphs and Collectibles/i);

    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });

  test("renders the updates panel correctly", () => {
    render(
      <DataProvider>
        <Index />
      </DataProvider>,
    );

    const updatesHeading = screen.getByRole("heading", { name: /Updates/i });

    expect(updatesHeading).toBeInTheDocument();
  });
});
