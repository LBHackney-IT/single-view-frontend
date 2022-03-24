import React, { useEffect } from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Spinner } from "./spinner";

test("it renders correctly", async () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it accepts a ref", () => {
  const callback = jest.fn();
  const Comp = () => {
    const ref = React.createRef<SVGSVGElement>();

    useEffect(() => {
      if (ref.current) {
        callback(ref.current);
      }
    }, [ref]);
    return <Spinner ref={ref} />;
  };
  render(<Comp />);
  expect(callback).toBeCalledTimes(1);
});
