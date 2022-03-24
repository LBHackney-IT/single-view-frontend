import React, { useEffect } from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Link } from "./link";

test("it renders correctly", async () => {
  const { container } = render(<Link href="http://localhost">Test Link</Link>);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders a variant", () => {
  const { container } = render(
    <Link href="http://localhost" variant="muted">
      Test Link
    </Link>,
  );
  expect(container).toMatchSnapshot();
});

test("it renders a back link", () => {
  const { container } = render(
    <Link href="http://localhost" variant="back-link">
      Test Link
    </Link>,
  );
  expect(container).toMatchSnapshot();
});

test("it adds the correct attributes for external links", () => {
  const { container } = render(
    <Link href="http://localhost" isExternal>
      Test Link
    </Link>,
  );
  expect(container).toMatchSnapshot();
});

test("it accepts a ref", () => {
  const callback = jest.fn();
  const Comp = () => {
    const ref = React.createRef<HTMLAnchorElement>();

    useEffect(() => {
      if (ref.current) {
        callback(ref.current);
      }
    }, [ref]);
    return (
      <Link ref={ref} href="http://localhost">
        Test Link
      </Link>
    );
  };
  render(<Comp />);
  expect(callback).toBeCalledTimes(1);
});
