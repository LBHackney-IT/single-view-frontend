import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { LinkButton } from "./link-button";

test("it renders correctly", async () => {
  const { container } = render(<LinkButton>Test Button</LinkButton>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders a variant", () => {
  const { container } = render(<LinkButton variant="muted">Test Button</LinkButton>);
  expect(container).toMatchSnapshot();
});

test("it renders a back link", () => {
  const { container } = render(<LinkButton variant="back-link">Test Button</LinkButton>);
  expect(container).toMatchSnapshot();
});
