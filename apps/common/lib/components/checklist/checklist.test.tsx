import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { Checklist } from "./checklist";

test("it renders correctly", () => {
  const mockItems = [
    {
      label: "Success",
      success: true,
    },
    {
      label: "Fail",
      success: false,
    },
  ];
  const { container } = render(<Checklist items={mockItems} />);

  expect(screen.getByText("Success")).toBeInTheDocument();
  expect(screen.getByText("Fail")).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
