import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Redacted from "../../src/components/database/Redacted";

describe("Redacted component", () => {
  it("should render the redacted value by default", () => {
    const { getByText } = render(<Redacted value="Sensitive Data" />);
    const redactedValue = getByText("Sensitive Data");
    expect(redactedValue).toBeInTheDocument();
    expect(redactedValue).toHaveClass("redacted");
  });

  it("should toggle the redacted value on click", () => {
    const { getByText } = render(<Redacted value="Sensitive Data" />);
    const redactedValue = getByText("Sensitive Data");
    fireEvent.click(redactedValue);
    expect(redactedValue).not.toHaveClass("redacted");
    fireEvent.click(redactedValue);
    expect(redactedValue).toHaveClass("redacted");
  });

  it("should show the value if defaultShow prop is true", () => {
    const { getByText } = render(<Redacted value="Sensitive Data" defaultShow={true} />);
    const redactedValue = getByText("Sensitive Data");
    expect(redactedValue).not.toHaveClass("redacted");
  });
});
