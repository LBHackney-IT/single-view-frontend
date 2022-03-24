import React, { FC, useState } from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Dialog, DialogActions } from "./dialog";

const Component: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Toggle
      </button>
      <Dialog isOpen={isOpen} title="Dialog Title" onDismiss={() => setOpen(false)}>
        {children}
      </Dialog>
    </>
  );
};

test("it renders correctly", async () => {
  const { container } = render(
    <Component>
      <p>Content</p>
    </Component>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);

  const toggle = screen.getByText("Toggle") as HTMLButtonElement;
  userEvent.click(toggle);

  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly with actions", async () => {
  const { container } = render(
    <Component>
      <p>Content</p>
      <DialogActions>
        <button type="button">Confirm</button>
        <a href="/">Cancel</a>
      </DialogActions>
    </Component>,
  );

  const toggle = screen.getByText("Toggle") as HTMLButtonElement;
  userEvent.click(toggle);

  expect(container).toMatchSnapshot();
  await testA11y(container);
});
