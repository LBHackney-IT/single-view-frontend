import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import App from "./app";
import { config } from "./services";

test("it shows development", () => {
  render(<App />);
  expect(screen.getByText("DEVELOPMENT")).toBeInTheDocument();
});

test("it shows staging", () => {
  config.appEnv = "staging";
  render(<App />);
  expect(screen.getByText("STAGING")).toBeInTheDocument();
});

test("it shows production", () => {
  config.appEnv = "production";
  render(<App />);
  expect(screen.getByText("BETA")).toBeInTheDocument();
});
