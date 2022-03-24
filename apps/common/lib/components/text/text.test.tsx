import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Text } from "./text";

test("it renders correctly", async () => {
  const { container } = render(<Text>Hello World</Text>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders with variants and sizes", async () => {
  const { container } = render(
    <Text size="lg" variant="bold">
      Hello World
    </Text>,
  );
  expect(container).toMatchSnapshot();
});
