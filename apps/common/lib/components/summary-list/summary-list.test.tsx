import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Link } from "../link";
import { SummaryList, SummaryListItem } from "./summary-list";

test("it renders correctly", async () => {
  const { container } = render(
    <SummaryList>
      <SummaryListItem title="Person">Test</SummaryListItem>
    </SummaryList>,
  );

  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly with fallback", () => {
  const { container } = render(
    <SummaryList>
      <SummaryListItem title="Email" />
      <SummaryListItem title="Mobile"> </SummaryListItem>
      <SummaryListItem title="Phone">{null}</SummaryListItem>
      <SummaryListItem title="Address">{undefined}</SummaryListItem>
    </SummaryList>,
  );

  expect(container).toMatchSnapshot();
});

test("it renders correctly with single action", async () => {
  const { container } = render(
    <SummaryList>
      <SummaryListItem title="First Name" actions={<Link href="/">Edit</Link>}>
        John
      </SummaryListItem>
      <SummaryListItem title="Last Name">Smith</SummaryListItem>
    </SummaryList>,
  );

  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly with multiple action", async () => {
  const { container } = render(
    <SummaryList>
      <SummaryListItem
        title="First Name"
        actions={[
          <Link key="edit" href="/edit">
            Edit
          </Link>,
          <Link key="remove" href="/remove">
            Remove
          </Link>,
        ]}
      >
        John
      </SummaryListItem>
      <SummaryListItem title="Last Name">Smith</SummaryListItem>
    </SummaryList>,
  );

  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly with columns", () => {
  const { container } = render(
    <SummaryList overrides={[1 / 2, 1 / 4, 1 / 2]}>
      <SummaryListItem
        title="First Name"
        actions={[
          <Link key="edit" href="/edit">
            Edit
          </Link>,
          <Link key="remove" href="/remove">
            Remove
          </Link>,
        ]}
      >
        John
      </SummaryListItem>
      <SummaryListItem title="Last Name">Smith</SummaryListItem>
      <SummaryListItem title="Gender">M</SummaryListItem>
    </SummaryList>,
  );

  expect(container).toMatchSnapshot();
});
