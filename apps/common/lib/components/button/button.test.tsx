import React, { useEffect } from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { Button } from "./button";

test("it renders correctly", async () => {
  const { container } = render(<Button>Test Button</Button>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it shows a loading state", async () => {
  const { container } = render(<Button isLoading>Test Button</Button>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it shows a loading state with custom text", () => {
  render(
    <Button isLoading loadingText="Processing">
      Test Button
    </Button>,
  );
  expect(screen.getByText("Processing")).toBeInTheDocument();
});

test("it renders the correct variant", async () => {
  const { container } = render(<Button variant="secondary">Test Link</Button>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it can render as a link", async () => {
  const { container } = render(
    <Button as="a" href="/">
      Test Link
    </Button>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it can render an 'add' variant", async () => {
  const { container } = render(<Button variant="add">Add icon variant</Button>);
  expect(container).toMatchSnapshot();
});

test("it can render an 'add' variant (without icon if loading)", async () => {
  const { container } = render(
    <Button isLoading variant="add">
      Add icon variant
    </Button>,
  );
  expect(container).toMatchSnapshot();
});

test("it can render a 'chevron' variant", async () => {
  const { container } = render(<Button variant="chevron">Chevron icon variant</Button>);
  expect(container).toMatchSnapshot();
});

test("it accepts a ref", () => {
  const callback = jest.fn();
  const Comp = () => {
    const ref = React.createRef<HTMLButtonElement>();

    useEffect(() => {
      if (ref.current) {
        callback(ref.current);
      }
    }, [ref]);
    return <Button ref={ref}>Test Button</Button>;
  };
  render(<Comp />);
  expect(callback).toBeCalledTimes(1);
});
