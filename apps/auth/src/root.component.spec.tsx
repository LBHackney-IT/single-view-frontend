import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";

import { $auth, isAuthorised } from "@mtfh/common/lib/auth";

import Root from "./root.component";
import { locale } from "./services";

jest.mock("@mtfh/common/lib/auth", () => ({
  $auth: { getValue: jest.fn() },
  isAuthorised: jest.fn().mockReturnValueOnce(true),
}));

describe("Root component", () => {
  const $authGetValueMock = $auth.getValue as jest.Mock;
  const isAuthorisedMock = isAuthorised as jest.Mock;

  describe("with no token saved", () => {
    it("should show the LoginButton", () => {
      $authGetValueMock.mockReturnValue({
        token: undefined,
      });

      render(<Root />);
      expect(screen.getByText(locale.signInUsingHackney)).toBeInTheDocument();
    });
  });

  describe("with a token saved with authorised groups", () => {
    it(`should call mockHistoryPush to /search`, async () => {
      $authGetValueMock.mockReturnValue({ token: "token" });
      isAuthorisedMock.mockReturnValue(true);

      render(<Root />);
      await waitFor(() => expect(window.location.pathname).toBe("/search"));
    });
  });

  describe("with a token saved with unauthorised groups", () => {
    it(`should show a "you don't have permission" message`, () => {
      $authGetValueMock.mockReturnValue({ token: "token" });
      isAuthorisedMock.mockReturnValue(false);

      render(<Root />);

      expect(screen.getByText(locale.unauthorisedToViewService)).toBeInTheDocument();
    });
  });
});
