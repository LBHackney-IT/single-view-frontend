import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Center } from "./center";

test("it renders with both vertical and horizontal by default", async () => {
  const { container } = render(
    <Center>
      <div />
    </Center>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders with vertical only", () => {
  const { container } = render(
    <Center horizontally={false}>
      <div />
    </Center>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders with horizontal only", () => {
  const { container } = render(
    <Center vertically={false}>
      <div />
    </Center>,
  );
  expect(container).toMatchSnapshot();
});
