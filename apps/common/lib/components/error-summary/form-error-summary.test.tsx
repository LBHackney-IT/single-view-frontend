import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { FormErrorSummary } from "./form-error-summary";

test("FormErrorSummary renders error", () => {
  render(
    <FormErrorSummary
      id="form"
      errors={{ firstName: "First name cannot be blank" }}
      prefix="form"
    />,
  );
  expect(screen.getByText("First name cannot be blank")).toBeInTheDocument();
});
