import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Details } from "./details";

const mockTitle = "Title of details";
const mockChildContent = <div>content</div>;

test("it renders correctly", () => {
  render(<Details title={mockTitle}>{mockChildContent}</Details>);

  expect(screen.getByTestId("mtfh-details")).not.toHaveAttribute("open");
  expect(screen.getByText(mockTitle)).toBeInTheDocument();
  expect(screen.getByText("content")).toBeInTheDocument();
});

test("it renders with content expanded", () => {
  render(<Details title={mockTitle}>{mockChildContent}</Details>);

  const title = screen.getByText(mockTitle) as HTMLSpanElement;
  userEvent.click(title);

  expect(screen.getByTestId("mtfh-details")).toHaveAttribute("open");
  expect(screen.getByText(mockTitle)).toBeInTheDocument();
  expect(screen.getByText("content")).toBeInTheDocument();
});
