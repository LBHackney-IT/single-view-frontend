import React, { useState } from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FormGroup } from "../form-group";
import { NumberInput } from "./number-input";

const type = (value: string) => {
  const input = screen.getByRole("spinbutton") as HTMLInputElement;
  userEvent.type(input, value);
  return input;
};

test("it passes a11y on single radio", async () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="NumberInput Test">
      <NumberInput />
    </FormGroup>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly", () => {
  const { container } = render(<NumberInput />);
  expect(container).toMatchSnapshot();
});

test("it only accepts numbers", () => {
  render(<NumberInput />);
  const input = type("123wa4dv5ggg6");
  expect(input.value).toBe("123456");
});

test("it wont allow characters beyond the maxLength", () => {
  render(<NumberInput maxLength={3} />);
  const input = type("123456");
  expect(input.value).toBe("123");
});

test("it formats min on blur", () => {
  render(<NumberInput min={25} />);
  const input = type("1");
  expect(input.value).toBe("1");
  fireEvent.blur(input);
  expect(input.value).toBe("25");
});

test("it does not format an empty value", () => {
  render(<NumberInput min={25} />);
  const input = screen.getByRole("spinbutton") as HTMLInputElement;
  fireEvent.blur(input);
  expect(input.value).toBe("");
});

test("it formats max on blur", () => {
  render(<NumberInput min={25} max={50} />);
  const input = type("60");
  expect(input.value).toBe("60");
  fireEvent.blur(input);
  expect(input.value).toBe("50");
});

test("it pads the number with 0 on blur", () => {
  render(<NumberInput padStart={4} />);
  const input = type("60");
  expect(input.value).toBe("60");
  fireEvent.blur(input);
  expect(input.value).toBe("0060");
});

test("it can be controlled", () => {
  const Controlled = () => {
    const [value, setValue] = useState("100");
    const [didBlur, setBlur] = useState(false);
    return (
      <>
        <NumberInput
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onBlur={() => setBlur(!didBlur)}
          max={200}
        />
        <pre data-testid="output">{value}</pre>
        <pre data-testid="blur">{didBlur ? "true" : "false"}</pre>
      </>
    );
  };
  render(<Controlled />);
  const output = screen.getByTestId("output");
  expect(output).toHaveTextContent("100");
  const input = type("3425");
  fireEvent.blur(input);
  const blur = screen.getByTestId("blur");
  expect(blur).toHaveTextContent("true");
});
