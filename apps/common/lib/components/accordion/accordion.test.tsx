import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { Accordion, AccordionItem } from "./accordion";

test("it passes a11y", async () => {
  const { container } = render(
    <Accordion id="test">
      <AccordionItem id="test-1" title="Test">
        Hello
      </AccordionItem>
      <AccordionItem id="test-2" title="Next">
        Hello
      </AccordionItem>
    </Accordion>,
  );

  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly", () => {
  render(
    <Accordion id="test">
      <AccordionItem id="test-1" title="Test">
        Hello
      </AccordionItem>
      <AccordionItem id="test-2" title="Next">
        Hello
      </AccordionItem>
    </Accordion>,
  );

  expect(screen.getAllByRole("button")).toHaveLength(3);
  expect(screen.getByText("Test")).toBeInTheDocument();
});

test("it sets the defaultIndex to be expanded", () => {
  render(
    <Accordion id="test" defaultIndex={1}>
      <AccordionItem id="test-1" title="Test">
        Hello
      </AccordionItem>
      <AccordionItem id="test-2" title="Next">
        Hello
      </AccordionItem>
    </Accordion>,
  );

  const button = screen.getAllByRole("button")[2];
  expect(button?.getAttribute("aria-expanded")).toBe("true");
});
