import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";

import { Input } from "../input";
import { Radio, RadioGroup } from "../radios";
import { DateField, Field, InlineField } from "./field";

test("field renders correctly", async () => {
  const onSubmit = jest.fn();
  render(
    <Formik initialValues={{ text: "" }} onSubmit={onSubmit}>
      <Form>
        <Field id="test" name="text" label="Text">
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>
    </Formik>,
  );

  const input = screen.getByLabelText("Text") as HTMLInputElement;
  userEvent.type(input, "Hello");
  userEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      { text: "Hello" },
      expect.objectContaining({
        resetForm: expect.any(Function),
        setErrors: expect.any(Function),
        setFieldError: expect.any(Function),
        setFieldTouched: expect.any(Function),
        setFieldValue: expect.any(Function),
        setStatus: expect.any(Function),
        setSubmitting: expect.any(Function),
        setTouched: expect.any(Function),
        setValues: expect.any(Function),
      }),
    );
  });
});

test("field renders correctly as radios", async () => {
  const onSubmit = jest.fn();
  render(
    <Formik initialValues={{ choice: "" }} onSubmit={onSubmit}>
      <Form>
        <Field id="test" name="choice" label="Choices" type="radio">
          <RadioGroup>
            <Radio id="choice-1" value="1">
              Choice 1
            </Radio>
            <Radio id="choice-2" value="2">
              Choice 2
            </Radio>
          </RadioGroup>
        </Field>
        <button type="submit">Submit</button>
      </Form>
    </Formik>,
  );

  const input = screen.getByLabelText("Choice 2") as HTMLInputElement;
  userEvent.click(input);
  userEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      { choice: "2" },
      expect.objectContaining({
        resetForm: expect.any(Function),
        setErrors: expect.any(Function),
        setFieldError: expect.any(Function),
        setFieldTouched: expect.any(Function),
        setFieldValue: expect.any(Function),
        setStatus: expect.any(Function),
        setSubmitting: expect.any(Function),
        setTouched: expect.any(Function),
        setValues: expect.any(Function),
      }),
    );
  });
});

test("inline field renders correctly", async () => {
  const onSubmit = jest.fn();
  render(
    <Formik initialValues={{ text: "" }} onSubmit={onSubmit}>
      <Form>
        <label htmlFor="text">Text</label>
        <InlineField name="text">
          <Input id="text" />
        </InlineField>
        <button type="submit">Submit</button>
      </Form>
    </Formik>,
  );

  const input = screen.getByLabelText("Text") as HTMLInputElement;
  userEvent.type(input, "Hello");
  userEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      { text: "Hello" },
      expect.objectContaining({
        resetForm: expect.any(Function),
        setErrors: expect.any(Function),
        setFieldError: expect.any(Function),
        setFieldTouched: expect.any(Function),
        setFieldValue: expect.any(Function),
        setStatus: expect.any(Function),
        setSubmitting: expect.any(Function),
        setTouched: expect.any(Function),
        setValues: expect.any(Function),
      }),
    );
  });
});

test("date field renders correctly", async () => {
  const onSubmit = jest.fn();
  render(
    <Formik initialValues={{ day: "", month: "", year: "" }} onSubmit={onSubmit}>
      <Form>
        <DateField
          id="date"
          label="Date of Birth"
          dayProps={{ name: "day" }}
          monthProps={{ name: "month" }}
          yearProps={{ name: "year" }}
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>,
  );

  const day = screen.getByLabelText("Day");
  const month = screen.getByLabelText("Month");
  const year = screen.getByLabelText("Year");

  userEvent.type(day, "1");
  userEvent.type(month, "12");
  userEvent.type(year, "1998");

  userEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      { day: "01", month: "12", year: "1998" },
      expect.objectContaining({
        resetForm: expect.any(Function),
        setErrors: expect.any(Function),
        setFieldError: expect.any(Function),
        setFieldTouched: expect.any(Function),
        setFieldValue: expect.any(Function),
        setStatus: expect.any(Function),
        setSubmitting: expect.any(Function),
        setTouched: expect.any(Function),
        setValues: expect.any(Function),
      }),
    );
  });
});
