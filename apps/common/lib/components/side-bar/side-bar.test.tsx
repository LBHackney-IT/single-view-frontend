import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { SideBar, SideBarSection } from "./side-bar";

test("it renders correctly on desktop", async () => {
  const { container } = render(
    <SideBar id="sidebar">
      <SideBarSection id="section-1" title="More Details">
        <div>Content</div>
      </SideBarSection>
    </SideBar>,
    { query: "lg" },
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly on mobile", async () => {
  const { container } = render(
    <SideBar id="sidebar">
      <SideBarSection id="section-1" title="More Details">
        <div>Content</div>
      </SideBarSection>
    </SideBar>,
    { query: "base" },
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders a heading on desktop", async () => {
  const { container } = render(
    <SideBar id="sidebar">
      <SideBarSection id="section-1" title="More Details" heading="A Heading">
        <div>Content</div>
      </SideBarSection>
    </SideBar>,
    { query: "lg" },
  );
  expect(screen.getByRole("heading")).toHaveTextContent("A Heading");
  await testA11y(container);
});

test("it does not renders a heading on mobile", async () => {
  const { container } = render(
    <SideBar id="sidebar">
      <SideBarSection id="section-1" title="More Details" heading="A Heading">
        <div>Content</div>
      </SideBarSection>
    </SideBar>,
    { query: "base" },
  );
  expect(screen.queryByText("A Heading")).toBe(null);
  await testA11y(container);
});

test("accepts and ignores a null child", () => {
  const { container } = render(
    <SideBar id="sidebar">
      <SideBarSection id="section-1" title="More Details" heading="A Heading">
        <div>Content</div>
      </SideBarSection>
      {null}
      <SideBarSection id="section-2" title="More Details 2" heading="A Heading 2">
        <div>Content 2</div>
      </SideBarSection>
      {null}
    </SideBar>,
    { query: "base" },
  );
  expect(container).toMatchSnapshot();
});
