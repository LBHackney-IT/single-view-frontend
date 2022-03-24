import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { FormGroup } from "../form-group";
import { Checkbox, CheckboxConditional, CheckboxGroup } from "./checkboxes";

test("it passes a11y on single checkbox", async () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="Checkbox Test">
      <Checkbox id="radio">Label</Checkbox>
    </FormGroup>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it passes a11y on checkbox group", async () => {
  const { container } = render(
    <FormGroup id="test" label="Checkbox Test">
      <CheckboxGroup>
        <Checkbox id="checkbox-1" name="test-1">
          Label
        </Checkbox>
        <Checkbox id="checkbox-2" name="test-2">
          Label2
        </Checkbox>
      </CheckboxGroup>
    </FormGroup>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders a checkbox", () => {
  const { container } = render(<Checkbox id="test">Label</Checkbox>);
  expect(container).toMatchSnapshot();
});

test("it renders a checkbox with a hint", () => {
  const { container } = render(
    <Checkbox id="test" hint="A short description">
      Label
    </Checkbox>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders a group of checkboxes", () => {
  const { container } = render(
    <CheckboxGroup>
      <Checkbox id="test">Label</Checkbox>
      <Checkbox id="test2">Label2</Checkbox>
    </CheckboxGroup>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders a group of checkboxes with a conditional", () => {
  const { container } = render(
    <CheckboxGroup>
      <Checkbox id="test" conditionalId="conditional">
        Label
      </Checkbox>
      <CheckboxConditional id="conditional">Hello</CheckboxConditional>
      <Checkbox id="test2">Label2</Checkbox>
    </CheckboxGroup>,
  );
  expect(container).toMatchSnapshot();
});
