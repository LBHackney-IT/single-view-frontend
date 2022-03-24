import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { PhaseBanner } from ".";

test("it renders a default blue variant of the Phase Banner", async () => {
  const { container } = render(
    <PhaseBanner tag="DEV">
      <span>Development Environment</span>
    </PhaseBanner>,
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByText("DEV")).toBeInTheDocument();
  expect(screen.getByText("Development Environment")).toBeInTheDocument();
});

test("it renders a yellow variant of the Phase Banner", async () => {
  const { container } = render(
    <PhaseBanner tag="STAGING" variant="yellow">
      <span>Staging Environment</span>
    </PhaseBanner>,
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByText("STAGING")).toBeInTheDocument();
  expect(screen.getByText("Staging Environment")).toBeInTheDocument();
});

test("it renders a green variant of the Phase Banner", async () => {
  const { container } = render(
    <PhaseBanner tag="BETA" variant="green">
      <span>Production / Beta Environment</span>
    </PhaseBanner>,
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByText("BETA")).toBeInTheDocument();
  expect(screen.getByText("Production / Beta Environment")).toBeInTheDocument();
});

test("it renders a red variant of the Phase Banner", async () => {
  const { container } = render(
    <PhaseBanner tag="TEST" variant="green">
      <span>Test Environment</span>
    </PhaseBanner>,
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByText("TEST")).toBeInTheDocument();
  expect(screen.getByText("Test Environment")).toBeInTheDocument();
});
