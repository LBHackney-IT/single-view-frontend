import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import {
  Pagination,
  PaginationButton,
  PaginationControls,
  PaginationSummary,
} from "./pagination";

test("it renders correctly", async () => {
  const { container } = render(
    <Pagination>
      <PaginationSummary>Showing 101—150 of 246 results</PaginationSummary>
      <PaginationControls>
        <PaginationButton variant="previous" href="/2">
          Previous
        </PaginationButton>
        <PaginationButton href="/1">1</PaginationButton>
        <PaginationButton href="/2">2</PaginationButton>
        <PaginationButton href="/3" active>
          3
        </PaginationButton>
        <PaginationButton href="/4">4</PaginationButton>
        <PaginationButton href="/5">5</PaginationButton>
        <PaginationButton variant="next" href="/4">
          Next
        </PaginationButton>
      </PaginationControls>
    </Pagination>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders without a summary", async () => {
  const { container } = render(
    <Pagination>
      <PaginationControls>
        <PaginationButton variant="previous" href="/2">
          Previous
        </PaginationButton>
        <PaginationButton href="/1">1</PaginationButton>
        <PaginationButton href="/2">2</PaginationButton>
        <PaginationButton variant="next" href="/4">
          Next
        </PaginationButton>
      </PaginationControls>
    </Pagination>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders control as buttons", async () => {
  const { container } = render(
    <Pagination>
      <PaginationControls>
        <PaginationButton variant="previous" href="/2">
          Previous
        </PaginationButton>
        <PaginationButton as="button">1</PaginationButton>
        <PaginationButton variant="next" href="/4">
          Next
        </PaginationButton>
      </PaginationControls>
    </Pagination>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
