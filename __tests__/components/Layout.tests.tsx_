import React from "react";
import { render } from "@testing-library/react";
import Layout from "../../src/components/layout/Layout";
import * as Gatsby from "gatsby";

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: `Gatsby Default Starter`,
    },
  },
};

describe("Layout component", () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("renders social links correctly", () => {
    const { getByTitle } = render(<Layout />);

    expect(getByTitle("Discord profile for Robin Kuiper")).toBeInTheDocument();
    expect(getByTitle("LinkedIn profile for Robin Kuiper")).toBeInTheDocument();
    expect(getByTitle("Gitlab profile for Robin Kuiper")).toBeInTheDocument();
  });

  it("renders footer text correctly", () => {
    const { getByText } = render(<Layout />);

    expect(getByText("Robin Kuiper")).toBeInTheDocument();
  });
});
