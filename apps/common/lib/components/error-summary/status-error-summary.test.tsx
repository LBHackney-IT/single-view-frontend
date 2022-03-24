import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import locale from "../../locale";
import { StatusErrorSummary } from "./status-error-summary";

test("StatusErrorSummary renders error", () => {
  render(<StatusErrorSummary id="status" code={500} />);
  expect(
    screen.getByText(locale.components.statusErrorSummary.statusTitle(500)),
  ).toBeInTheDocument();
});

test("StatusErrorSummary renders error on 403", () => {
  render(<StatusErrorSummary id="status" code={403} />);
  expect(
    screen.getByText(locale.components.statusErrorSummary.statusTitle(403)),
  ).toBeInTheDocument();
});

test("StatusErrorSummary renders error on 409", () => {
  render(<StatusErrorSummary id="status" code={409} />);
  expect(
    screen.getByText(locale.components.statusErrorSummary.statusTitle(409)),
  ).toBeInTheDocument();
});
