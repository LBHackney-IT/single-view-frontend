import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { FormGroup, Input } from "..";

test("it renders correctly", () => {
  render(
    <FormGroup id="test" name="test" label="Test Label">
      <Input placeholder="Test Value" />
    </FormGroup>,
  );

  expect(screen.getByText("Test Label")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Test Value")).toBeInTheDocument();
});

test("it shows the hint if defined", () => {
  render(
    <FormGroup id="test" name="test" label="Test Label" hint="Test Hint">
      <Input placeholder="Test Value" />
    </FormGroup>,
  );

  expect(screen.getByText("Test Hint")).toBeInTheDocument();
});

test("it shows the error if defined", () => {
  render(
    <FormGroup id="test" name="test" label="Test Label" error="Error">
      <Input placeholder="Test Value" />
    </FormGroup>,
  );

  expect(screen.getByText("Error")).toBeInTheDocument();
});

test("it adds an astreix to the label if required", () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="Test Label" required>
      <Input placeholder="Test Value" />
    </FormGroup>,
  );
  expect(screen.getByText(/Test Label/).textContent).toBe("Test Label*");
  expect(container).toMatchSnapshot();
});
