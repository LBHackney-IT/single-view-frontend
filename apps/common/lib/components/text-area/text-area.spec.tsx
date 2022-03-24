import React, { ChangeEvent, useState } from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { fireEvent, screen } from "@testing-library/react";

import { FormGroup } from "../form-group";
import { TextArea } from "./text-area";

test("it passes a11y", async () => {
  const { container } = render(
    <FormGroup id="test" name="test" label="TextArea Test">
      <TextArea />
    </FormGroup>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly", () => {
  const { container } = render(<TextArea />);
  expect(container).toMatchSnapshot();
});

test("it renders with character count if maxLength is set", () => {
  render(<TextArea maxLength={500} />);
  expect(screen.getByText("You have 500 characters remaining")).toBeInTheDocument();
});

test("it renders with character count with correct plural", () => {
  render(<TextArea maxLength={2} placeholder="TextArea" />);
  const textArea = screen.getByPlaceholderText("TextArea");

  expect(screen.getByText("You have 2 characters remaining")).toBeInTheDocument();
  fireEvent.change(textArea, { target: { value: "A" } });
  expect(screen.getByText("You have 1 character remaining")).toBeInTheDocument();
  fireEvent.change(textArea, { target: { value: "AB" } });
  expect(screen.getByText("You have 0 characters remaining")).toBeInTheDocument();
  fireEvent.change(textArea, { target: { value: "ABC" } });
  expect(screen.getByText("You have 1 character too many")).toBeInTheDocument();
  fireEvent.change(textArea, { target: { value: "ABCD" } });
  expect(screen.getByText("You have 2 characters too many")).toBeInTheDocument();
});

test("it decreases the character count when text area value increases", () => {
  render(<TextArea maxLength={500} placeholder="TextArea" />);
  const textArea = screen.getByPlaceholderText("TextArea");
  fireEvent.change(textArea, { target: { value: "Some text" } });
  expect(screen.getByText("You have 491 characters remaining")).toBeInTheDocument();
});

test("it renders with character count if component is controlled", () => {
  render(<TextArea maxLength={500} value="Some text" />);
  expect(screen.getByText("You have 491 characters remaining")).toBeInTheDocument();
});

test("it renders with character count with array value", () => {
  render(<TextArea maxLength={500} defaultValue={["Some", "text"]} />);
  expect(screen.getByText("You have 491 characters remaining")).toBeInTheDocument();
});

test("it renders with character count with number value", () => {
  render(<TextArea maxLength={5} defaultValue={1234} />);
  expect(screen.getByText("You have 1 character remaining")).toBeInTheDocument();
});

test("it renders with character count with undefined value", () => {
  render(<TextArea maxLength={5} defaultValue={undefined} />);
  expect(screen.getByText("You have 5 characters remaining")).toBeInTheDocument();
});

test("it supports an onChange handler", () => {
  const onChange = jest.fn<void, ChangeEvent<HTMLTextAreaElement>[]>();
  render(<TextArea placeholder="TextArea" onChange={onChange} />);
  const textArea = screen.getByPlaceholderText("TextArea");
  fireEvent.change(textArea, { target: { value: "Some text" } });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange.mock.calls[0][0].target.value).toContain("Some text");
});

test("it supports an onChange handler with maxLength", () => {
  const onChange = jest.fn<void, ChangeEvent<HTMLTextAreaElement>[]>();
  render(<TextArea maxLength={500} placeholder="TextArea" onChange={onChange} />);
  const textArea = screen.getByPlaceholderText("TextArea");
  fireEvent.change(textArea, { target: { value: "Some text" } });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange.mock.calls[0][0].target.value).toContain("Some text");
});

test("it supports a controlled component", () => {
  const ControlledComponentTest = () => {
    const [value, setValue] = useState("");
    return (
      <>
        <TextArea
          maxLength={10}
          value={value}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(event.currentTarget.value)
          }
          placeholder="TextArea"
        />
        <button type="button" onClick={() => setValue("Hello")}>
          Test button
        </button>
      </>
    );
  };
  render(<ControlledComponentTest />);
  const textArea = screen.getByPlaceholderText("TextArea") as HTMLTextAreaElement;
  fireEvent.change(textArea, { target: { value: "Some text" } });
  expect(textArea.value).toBe("Some text");
  const button = screen.getByText("Test button");
  fireEvent.click(button);
  expect(textArea.value).toBe("Hello");
  expect(screen.getByText("You have 5 characters remaining")).toBeInTheDocument();
});
