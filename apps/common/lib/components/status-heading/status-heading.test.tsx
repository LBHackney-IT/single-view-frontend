import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { StatusHeading } from "./status-heading";

test("it renders base variant title and icon correctly", () => {
  const { container } = render(<StatusHeading title="base status title" />);

  expect(screen.getByText("base status title")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("it renders success variant title and icon correctly", () => {
  const { container } = render(
    <StatusHeading variant="success" title="success status title" />,
  );

  expect(screen.getByText("success status title")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("it renders warning variant title and icon correctly", () => {
  const { container } = render(
    <StatusHeading variant="warning" title="warning status title" />,
  );

  expect(screen.getByText("warning status title")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
