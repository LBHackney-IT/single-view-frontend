import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Text } from "../text";
import { List } from "./list";

test("it renders correctly", async () => {
  const { container } = render(
    <List>
      <Text>string1</Text>
      <Text>string2</Text>
      <Text>string3</Text>
    </List>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders with bullets", async () => {
  const { container } = render(
    <List variant="bullets">
      <Text>string1</Text>
      <Text>string2</Text>
      <Text>string3</Text>
    </List>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders with numbers", async () => {
  const { container } = render(
    <List variant="numbers" as="ol">
      <Text>string1</Text>
      <Text>string2</Text>
      <Text>string3</Text>
    </List>,
  );
  expect(container).toMatchSnapshot();
});
