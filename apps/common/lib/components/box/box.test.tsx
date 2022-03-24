import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { Box } from "./box";

test("it renders base variant correctly", () => {
  render(<Box>content</Box>);

  expect(screen.getByText("content")).toBeInTheDocument();

  const box = screen.getByText("content");
  expect(box).not.toHaveClass("mtfh-box--success");
  expect(box).not.toHaveClass("mtfh-box--success");
});

test("it renders success variant correctly", () => {
  render(<Box variant="success">content</Box>);

  const box = screen.getByText("content");
  expect(box).toBeInTheDocument();
  expect(box).toHaveClass("mtfh-box--success");
});

test("it renders warning variant correctly", () => {
  render(<Box variant="warning">content</Box>);

  const box = screen.getByText("content");
  expect(box).toBeInTheDocument();
  expect(box).toHaveClass("mtfh-box--warning");
});
