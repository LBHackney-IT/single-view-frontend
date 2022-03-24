import React from "react";
import { Link, Prompt, Route, Switch } from "react-router-dom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ConfirmationRouter } from "./confirmation-router";

const setupRouter = () => {
  window.history.pushState({}, "", "/test");
  render(
    <ConfirmationRouter>
      <Switch>
        <Route path="/" exact>
          <div>Hello</div>
        </Route>
        <Route path="/test" exact>
          <>
            <Link to="/test">Home</Link>
            <Prompt
              message={(location, action) =>
                JSON.stringify({
                  action,
                  path: "/test",
                  pathname: location.pathname,
                  title: "Whoops",
                  body: "Are you sure?",
                })
              }
            />
            <Link to="/">Link</Link>
          </>
        </Route>
      </Switch>
    </ConfirmationRouter>,
  );
};

test("it renders the confirmation router", () => {
  render(
    <ConfirmationRouter>
      <div>Hello</div>
    </ConfirmationRouter>,
  );

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

test("it shows a dialog when a prompt triggers", () => {
  setupRouter();

  userEvent.click(screen.getByText("Link"));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.queryByText("Hello")).not.toBeInTheDocument();
});

test("it navigates to the destination on confirmation", () => {
  setupRouter();

  userEvent.click(screen.getByText("Link"));

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  userEvent.click(screen.getByText("Yes"));

  expect(screen.getByText("Hello")).toBeInTheDocument();
});

test("it stays on the current page if confirmation is declined", () => {
  setupRouter();

  userEvent.click(screen.getByText("Link"));

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  userEvent.click(screen.getByText("Cancel"));

  expect(screen.queryByText("Hello")).not.toBeInTheDocument();
});

test("it intercepts browser back button and returns to page if cancelled", async () => {
  window.history.pushState({}, "", "/");
  setupRouter();

  window.history.back();

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  userEvent.click(screen.getByText("Close"));

  expect(screen.getByText("Link")).toBeInTheDocument();
});

test("it only prompts if the path changes", () => {
  setupRouter();

  userEvent.click(screen.getByText("Home"));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("it ignores messages that are malformed", () => {
  window.history.pushState({}, "", "/test");
  render(
    <ConfirmationRouter>
      <Switch>
        <Route path="/" exact>
          <div>Hello</div>
        </Route>
        <Route path="/test" exact>
          <>
            <Prompt message={() => "test"} />
            <Link to="/">Link</Link>
          </>
        </Route>
      </Switch>
    </ConfirmationRouter>,
  );
  userEvent.click(screen.getByText("Link"));
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
