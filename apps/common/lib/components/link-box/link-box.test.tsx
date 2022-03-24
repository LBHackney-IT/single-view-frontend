import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Link } from "../link";
import { LinkBox, LinkOverlay } from "./link-box";

test("it renders correctly", async () => {
  const { container } = render(
    <LinkBox>
      <LinkOverlay>
        <Link href="https://localhost">Link</Link>
      </LinkOverlay>
    </LinkBox>,
  );

  expect(container).toMatchSnapshot();
  await testA11y(container);
});
