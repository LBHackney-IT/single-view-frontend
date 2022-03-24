import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { Card, CardBreak, CardRows } from "../card";
import { CardList } from "./card-list";

test("CardList renders", () => {
  const rows = [
    { value: "value1", label: "Label 1" },
    { value: "value2", label: "Label 2" },
  ];
  const { container } = render(
    <CardList>
      <Card>
        <CardRows rows={rows} />
        <CardBreak />
        <p>Additional content</p>
      </Card>
    </CardList>,
  );
  expect(screen.getByText("value1")).toBeInTheDocument();
  expect(screen.getByText("Label 1:")).toBeInTheDocument();
  expect(screen.getByText("value2")).toBeInTheDocument();
  expect(screen.getByText("Label 2:")).toBeInTheDocument();
  expect(screen.getByText("Additional content")).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
