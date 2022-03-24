import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Heading } from "./heading";

test("it renders the heading", async () => {
  const { container } = render(<Heading>Heading</Heading>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders the heading as h2 styles", async () => {
  const { container } = render(<Heading as="h2">Heading</Heading>);
  expect(container).toMatchSnapshot();
});

test("it renders the heading as h2 with h3 styles", async () => {
  const { container } = render(
    <Heading as="h2" variant="h3">
      Heading
    </Heading>,
  );
  expect(container).toMatchSnapshot();
});
