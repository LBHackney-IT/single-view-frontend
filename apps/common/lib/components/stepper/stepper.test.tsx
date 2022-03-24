import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { Step, Stepper } from ".";

const stepperTitle = "Stepper title";
const stepTenureDetails = "Tenure details";
const stepSelectResidents = "Select residents";

test("it renders correctly", async () => {
  const { container } = render(
    <Stepper title={stepperTitle} activeStep={0}>
      <Step>{stepTenureDetails}</Step>
      <Step>{stepSelectResidents}</Step>
    </Stepper>,
  );
  expect(container).toMatchSnapshot();
  expect(screen.queryAllByRole("listitem").length).toBe(2);
  expect(screen.queryAllByRole("listitem")[0].className).toContain("active");
  await testA11y(container);
});

test("it prints a title", () => {
  render(
    <Stepper title={stepperTitle} activeStep={0}>
      <Step>{stepTenureDetails}</Step>
      <Step>{stepSelectResidents}</Step>
    </Stepper>,
  );
  screen.getByText(stepperTitle);
});

test("it does not print title", () => {
  render(
    <Stepper activeStep={0}>
      <Step>{stepTenureDetails}</Step>
      <Step>{stepSelectResidents}</Step>
    </Stepper>,
  );
  expect(screen.queryByText(stepperTitle)).not.toBeInTheDocument();
});

test("it displays a human readable step count", () => {
  render(
    <Stepper>
      <Step>{stepTenureDetails}</Step>
      <Step>{stepSelectResidents}</Step>
    </Stepper>,
  );
  expect(screen.queryByText("0")).not.toBeInTheDocument();
  screen.getByText("1");
  screen.getByText("2");
});
