import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { SimplePagination, SimplePaginationButton } from "./simple-pagination";

test("it renders the nav with buttons", async () => {
  const { container } = render(
    <SimplePagination>
      <SimplePaginationButton href="/prev" variant="previous">
        Prev
      </SimplePaginationButton>
      <SimplePaginationButton href="/next" variant="next">
        Next
      </SimplePaginationButton>
    </SimplePagination>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders the nav with buttons and titles", () => {
  const { container } = render(
    <SimplePagination>
      <SimplePaginationButton href="/prev" variant="previous" title="1 of 3">
        Prev
      </SimplePaginationButton>
      <SimplePaginationButton href="/next" variant="next" title="3 of 3">
        Next
      </SimplePaginationButton>
    </SimplePagination>,
  );
  expect(container).toMatchSnapshot();
});
