import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { FormGroup } from "../form-group";
import { Radio, RadioConditional, RadioDivider, RadioGroup } from "./radios";

test("it passes a11y on single radio", async () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="Radio Test">
      <Radio id="radio">Label</Radio>
    </FormGroup>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it passes a11y on radio group", async () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="Radios Test">
      <RadioGroup>
        <Radio id="radio-1">Label</Radio>
        <Radio id="radio-2">Label2</Radio>
      </RadioGroup>
    </FormGroup>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders a radio", () => {
  const { container } = render(<Radio id="test">Label</Radio>);
  expect(container).toMatchSnapshot();
});

test("it renders a radio with a hint", () => {
  const { container } = render(
    <Radio id="test" hint="A short description">
      Label
    </Radio>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders a group of radios", () => {
  const { container } = render(
    <RadioGroup>
      <Radio id="test">Label</Radio>
      <Radio id="test2">Label2</Radio>
    </RadioGroup>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders a group of radios with a divider", () => {
  const { container } = render(
    <RadioGroup>
      <Radio id="test">Label</Radio>
      <RadioDivider>Or</RadioDivider>
      <Radio id="test2">Label2</Radio>
    </RadioGroup>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders a group of radios with a conditional", () => {
  const { container } = render(
    <RadioGroup>
      <Radio id="test" conditionalId="conditional">
        Label
      </Radio>
      <RadioConditional id="conditional">Hello</RadioConditional>
      <Radio id="test2">Label2</Radio>
    </RadioGroup>,
  );
  expect(container).toMatchSnapshot();
});
