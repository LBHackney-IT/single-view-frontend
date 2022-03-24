import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import locale from "../../locale";
import { ConflictErrorSummary } from "./conflict-error-summary";

test("ConflictErrorSummary renders error", () => {
  render(<ConflictErrorSummary id="conflict" fieldLocale={{ test: "Test" }} />);
  expect(
    screen.getByText(locale.components.conflictErrorSummary.changesNotSaved),
  ).toBeInTheDocument();
});

test("ConflictErrorSummary shows conflicting field summary", () => {
  render(
    <ConflictErrorSummary
      id="conflict"
      fieldLocale={{ test: "Test" }}
      updatedFields={{ test: "This is a test" }}
    />,
  );
  expect(screen.getByText("This is a test")).toBeInTheDocument();
});

test("ConflictErrorSummary renders the key of no fieldLocale is available", () => {
  render(
    <ConflictErrorSummary
      id="conflict"
      fieldLocale={{ tests: "Test" }}
      updatedFields={{ test: "This is a test" }}
    />,
  );
  expect(screen.getByText("test:")).toBeInTheDocument();
});

test("ConflictErrorSummary can transform the field output", () => {
  render(
    <ConflictErrorSummary
      id="conflict"
      fieldLocale={{ test: "Test" }}
      updatedFields={{ test: "This is a test" }}
      fieldTransforms={{ test: (value: string) => value.toUpperCase() }}
    />,
  );
  expect(screen.getByText("THIS IS A TEST")).toBeInTheDocument();
});
