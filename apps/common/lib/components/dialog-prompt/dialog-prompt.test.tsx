import React from "react";
import { Link } from "react-router-dom";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DialogPrompt } from "./dialog-prompt";

test("it issues a prompt when navigating", () => {
  render(
    <>
      <Link to="/test">Link</Link>
      <DialogPrompt title="Error" />
    </>,
  );

  userEvent.click(screen.getByRole("link"));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("it intercepts onbeforeunload", () => {
  render(<DialogPrompt title="Error" />);
  const event: BeforeUnloadEvent = new Event("beforeunload");
  const returnValue = jest.fn();
  Object.defineProperty(event, "returnValue", {
    set: returnValue,
    get: () => true,
  });

  window.dispatchEvent(event);

  expect(returnValue).toBeCalledWith("");
});

test("it skips confirmation if needed", () => {
  render(
    <>
      <Link to="/test">Link</Link>
      <DialogPrompt title="Error" skipConfirmation={() => true} />
    </>,
  );
  userEvent.click(screen.getByRole("link"));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
