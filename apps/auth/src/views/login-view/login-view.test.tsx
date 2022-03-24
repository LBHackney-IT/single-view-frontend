import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { login } from "@mtfh/common/lib/auth";

import { locale } from "../../services";
import { LoginView } from "./login-view";

jest.mock("@mtfh/common/lib/auth", () => ({
  ...(jest.requireActual("@mtfh/common/lib/auth") as object),
  login: jest.fn(),
}));

test("it calls login on click", () => {
  render(<LoginView />);
  const signin = screen.getByRole("button", { name: locale.signInUsingHackney });
  userEvent.click(signin);
  expect(login).toHaveBeenCalledTimes(1);
});
