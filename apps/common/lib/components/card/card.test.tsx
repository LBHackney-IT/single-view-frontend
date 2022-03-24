import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { Card } from "./card";
import { CardBreak } from "./card-break";
import { CardRows } from "./card-rows";

test("Card renders", () => {
  const rows = [
    { value: "value1", label: "Label 1" },
    { value: "value2", label: "Label 2" },
  ];
  const { container } = render(
    <Card>
      <CardRows rows={rows} />
      <CardBreak />
      <p>Additional content</p>
    </Card>,
  );
  expect(screen.getByText("value1")).toBeInTheDocument();
  expect(screen.getByText("Label 1:")).toBeInTheDocument();
  expect(screen.getByText("value2")).toBeInTheDocument();
  expect(screen.getByText("Label 2:")).toBeInTheDocument();
  expect(screen.getByText("Additional content")).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
